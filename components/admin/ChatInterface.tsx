'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { Session, DisplayMessage, SystemMessage, AnyMessage, MemoryEntry, Plugin, ChatMessage, CommandContext } from '@/lib/admin/types'
import { createSession, saveSession, loadSessions } from '@/lib/admin/sessions'
import { COMMANDS, parseCommand, findCommand } from '@/lib/admin/commands'
import { AGENTS, getAgent } from '@/lib/admin/agents'
import { SKILLS, buildSkillSystemPrompt } from '@/lib/admin/skills'
import { loadMemories, saveMemories, injectMemories } from '@/lib/admin/memory'
import { loadPlugins, savePlugins, togglePlugin, resetPlugins } from '@/lib/admin/plugins'
import { getModelInfo, MODELS, resolveModel } from '@/lib/admin/models'

// ── Minimal inline markdown renderer ──────────────────────────────────────────
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function sanitizeUrl(value: string): string {
  try {
    const url = new URL(value, window.location.origin)
    if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:') {
      return escapeHtml(url.href)
    }
  } catch {
    // Fall through to a harmless anchor.
  }

  return '#'
}

function renderMd(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => (
      `<a href="${sanitizeUrl(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
    ))
    .replace(/\n/g, '<br/>')
}

export default function ChatInterface() {
  const [session, setSession] = useState<Session>(() => createSession())
  const [displayMessages, setDisplayMessages] = useState<AnyMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showMemory, setShowMemory] = useState(false)
  const [showAgents, setShowAgents] = useState(false)
  const [showPlugins, setShowPlugins] = useState(false)
  const [showSessions, setShowSessions] = useState(false)
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashFilter, setSlashFilter] = useState('')
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark')
  const [accentColor, setAccentColorState] = useState('#7c3aed')
  const [memories, setMemoriesState] = useState<MemoryEntry[]>([])
  const [plugins, setPlugins] = useState<Plugin[]>([])
  const [savedSessions, setSavedSessions] = useState<Session[]>([])
  const [newMemoryText, setNewMemoryText] = useState('')
  const [newMemoryTags, setNewMemoryTags] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Hydrate from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin_theme') as 'light' | 'dark' | null
    if (savedTheme) setThemeState(savedTheme)
    const savedAccent = localStorage.getItem('admin_accent')
    if (savedAccent) setAccentColorState(savedAccent)
    setMemoriesState(loadMemories())
    setPlugins(loadPlugins())
    setSavedSessions(loadSessions())
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-admin-theme', theme)
    localStorage.setItem('admin_theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.style.setProperty('--admin-accent', accentColor)
    localStorage.setItem('admin_accent', accentColor)
  }, [accentColor])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayMessages])

  function setTheme(t: 'light' | 'dark') { setThemeState(t) }
  function setAccentColor(c: string) { setAccentColorState(c) }
  function setMemories(m: MemoryEntry[]) {
    setMemoriesState(m)
    saveMemories(m)
  }

  // ── postToApi: send messages to Claude and return the full response ────────
  const postToApi = useCallback(async (
    msgs: ChatMessage[],
    opts?: { systemPrompt?: string; model?: string }
  ): Promise<string> => {
    const agent = session.agent ? getAgent(session.agent) : null
    const skillPrompt = buildSkillSystemPrompt(session.activeSkills)
    const systemParts = [agent?.systemPrompt, skillPrompt, opts?.systemPrompt].filter(Boolean)
    const systemPrompt = systemParts.join('\n\n') || undefined

    const res = await fetch('/api/admin/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: msgs,
        model: opts?.model ?? session.model,
        systemPrompt,
      }),
    })

    if (!res.ok) throw new Error(await res.text())

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let full = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      full += decoder.decode(value, { stream: true })
    }

    const sentinelIdx = full.indexOf('\x00')
    if (sentinelIdx >= 0) {
      const jsonStr = full.slice(sentinelIdx + 1)
      full = full.slice(0, sentinelIdx)
      try {
        const sentinel = JSON.parse(jsonStr)
        if (sentinel.__usage) {
          setSession(s => ({
            ...s,
            tokenUsage: {
              input: s.tokenUsage.input + (sentinel.__usage.input_tokens ?? 0),
              output: s.tokenUsage.output + (sentinel.__usage.output_tokens ?? 0),
            },
          }))
        }
      } catch { /* ignore */ }
    }

    return full
  }, [session.agent, session.activeSkills, session.model])

  // Cancel any in-flight stream when the component unmounts
  useEffect(() => () => { abortRef.current?.abort() }, [])

  // ── Stream a message with live token display ──────────────────────────────
  async function sendMessage(text: string) {
    const userMsg: ChatMessage = { role: 'user', content: text }
    const newMessages: ChatMessage[] = [...session.messages, userMsg]

    const userDisplay: DisplayMessage = {
      id: crypto.randomUUID(), role: 'user', content: text,
      timestamp: new Date().toISOString(),
    }
    const assistantDisplay: DisplayMessage = {
      id: crypto.randomUUID(), role: 'assistant', content: '',
      timestamp: new Date().toISOString(), streaming: true,
    }

    setDisplayMessages(prev => [...prev, userDisplay, assistantDisplay])
    setIsStreaming(true)

    const agent = session.agent ? getAgent(session.agent) : null
    const skillPrompt = buildSkillSystemPrompt(session.activeSkills)
    const systemParts = [agent?.systemPrompt, skillPrompt].filter(Boolean)
    const systemPrompt = systemParts.join('\n\n') || undefined

    abortRef.current?.abort()
    const abort = new AbortController()
    abortRef.current = abort

    const messagesWithMem = session.activeSkills.includes('claude-mem')
      ? injectMemories(newMessages, memories)
      : newMessages

    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesWithMem, model: session.model, systemPrompt }),
        signal: abort.signal,
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const sentinelIdx = buffer.indexOf('\x00')
        if (sentinelIdx >= 0) {
          assistantText += buffer.slice(0, sentinelIdx)
          const jsonStr = buffer.slice(sentinelIdx + 1)
          buffer = ''
          try {
            const sentinel = JSON.parse(jsonStr)
            if (sentinel.__usage) {
              setSession(s => ({
                ...s,
                tokenUsage: {
                  input: s.tokenUsage.input + (sentinel.__usage.input_tokens ?? 0),
                  output: s.tokenUsage.output + (sentinel.__usage.output_tokens ?? 0),
                },
              }))
            }
            if (sentinel.__error) throw new Error(sentinel.__error as string)
          } catch (sentinelErr) {
            if (sentinelErr instanceof SyntaxError) { /* ignore bad JSON */ } else { throw sentinelErr }
          }
        } else {
          assistantText += buffer
          buffer = ''
        }

        const currentText = assistantText
        setDisplayMessages(prev =>
          prev.map(m => m.id === assistantDisplay.id ? { ...m, content: currentText } : m)
        )
      }

      const finalMessages: ChatMessage[] = [
        ...newMessages,
        { role: 'assistant', content: assistantText },
      ]

      setDisplayMessages(prev =>
        prev.map(m => m.id === assistantDisplay.id
          ? { ...m, content: assistantText, streaming: false }
          : m
        )
      )

      setSession(s => {
        const updated = { ...s, messages: finalMessages }
        saveSession(updated)
        return updated
      })
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error'
      setDisplayMessages(prev =>
        prev.map(m => m.id === assistantDisplay.id
          ? { ...m, content: `Error: ${errMsg}`, streaming: false }
          : m
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }

  // ── Command context ───────────────────────────────────────────────────────
  const commandContext: CommandContext = {
    session,
    setSession,
    postToApi,
    setShowSettings,
    setShowMemory,
    setShowAgents,
    setShowPlugins,
    memories,
    setMemories,
    theme,
    setTheme,
    accentColor,
    setAccentColor,
  }

  // ── Handle submit ─────────────────────────────────────────────────────────
  async function handleSend() {
    const text = input.trim()
    if (!text || isStreaming) return
    setInput('')
    setShowSlashMenu(false)

    const parsed = parseCommand(text)
    if (parsed) {
      const cmd = findCommand(parsed.name)
      if (!cmd) {
        const sysMsg: SystemMessage = {
          id: crypto.randomUUID(), type: 'error',
          content: `Unknown command \`/${parsed.name}\`. Type \`/SKILLS\` for help.`,
          timestamp: new Date().toISOString(),
        }
        setDisplayMessages(prev => [...prev, sysMsg])
        return
      }
      try {
        const result = await cmd.handler(parsed.args, commandContext)
        const sysMsg: SystemMessage = {
          id: crypto.randomUUID(),
          type: result.type === 'error' ? 'error' : 'system',
          content: result.type === 'panel' ? `Panel: ${result.panel}` : (result as { content: string }).content,
          timestamp: new Date().toISOString(),
        }
        setDisplayMessages(prev => [...prev, sysMsg])
      } catch (err) {
        const sysMsg: SystemMessage = {
          id: crypto.randomUUID(), type: 'error',
          content: err instanceof Error ? err.message : 'Command failed.',
          timestamp: new Date().toISOString(),
        }
        setDisplayMessages(prev => [...prev, sysMsg])
      }
      return
    }

    await sendMessage(text)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (showSlashMenu) {
        const filtered = COMMANDS.filter(c =>
          c.name.toLowerCase().startsWith(slashFilter.toLowerCase())
        )
        if (filtered.length > 0) {
          setInput('/' + filtered[0].name + ' ')
          setShowSlashMenu(false)
          return
        }
      }
      handleSend()
    }
    if (e.key === 'Escape') setShowSlashMenu(false)
    if (e.key === 'Tab' && showSlashMenu) {
      e.preventDefault()
      const filtered = COMMANDS.filter(c =>
        c.name.toLowerCase().startsWith(slashFilter.toLowerCase())
      )
      if (filtered.length > 0) {
        setInput('/' + filtered[0].name + ' ')
        setShowSlashMenu(false)
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value
    setInput(val)
    if (val.startsWith('/') && !val.includes(' ')) {
      setSlashFilter(val.slice(1))
      setShowSlashMenu(true)
    } else {
      setShowSlashMenu(false)
    }
  }

  const filteredCommands = COMMANDS.filter(c =>
    c.name.toLowerCase().startsWith(slashFilter.toLowerCase())
  ).slice(0, 8)

  // ── Colors ────────────────────────────────────────────────────────────────
  const isDark = theme === 'dark'
  const bg = isDark ? '#0d0d14' : '#f8f9fc'
  const surface = isDark ? '#1a1a2e' : '#ffffff'
  const border = isDark ? '#2a2a4a' : '#e2e8f0'
  const text = isDark ? '#e2e8f0' : '#1a202c'
  const muted = isDark ? '#64748b' : '#94a3b8'

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', height: '100%', background: bg, color: text }}>
      {/* Sidebar */}
      {showSessions && (
        <aside style={{
          width: 260, borderRight: `1px solid ${border}`, display: 'flex',
          flexDirection: 'column', overflow: 'hidden', background: surface,
        }}>
          <div style={{ padding: '1rem', borderBottom: `1px solid ${border}`, display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>Sessions</span>
            <button onClick={() => {
              const s = createSession()
              setSession(s)
              setDisplayMessages([])
              setSavedSessions(loadSessions())
            }} style={{ ...btnStyle(accentColor), fontSize: 12, padding: '3px 8px' }}>New</button>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {savedSessions.map(s => (
              <div
                key={s.id}
                onClick={() => { setSession(s); setDisplayMessages([]) }}
                style={{
                  padding: '0.6rem 1rem', cursor: 'pointer', fontSize: 13,
                  borderBottom: `1px solid ${border}`,
                  background: s.id === session.id ? (isDark ? '#2a2a4a' : '#f0f4ff') : 'transparent',
                  color: text,
                }}
              >
                <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                <div style={{ color: muted, fontSize: 11 }}>{new Date(s.updatedAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          padding: '0.75rem 1rem', borderBottom: `1px solid ${border}`,
          display: 'flex', alignItems: 'center', gap: 8, background: surface, flexShrink: 0,
        }}>
          <button onClick={() => setShowSessions(v => !v)} title="Sessions" style={iconBtn(isDark)}>☰</button>
          <span style={{ fontWeight: 700, fontSize: 15, flex: 1, color: accentColor }}>Admin Chat</span>

          {/* Agent pills */}
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={() => setSession(s => ({ ...s, agent: null }))}
              style={{
                ...pillStyle, background: !session.agent ? accentColor : (isDark ? '#2a2a4a' : '#e2e8f0'),
                color: !session.agent ? '#fff' : text,
              }}
            >Default</button>
            {AGENTS.map(a => (
              <button
                key={a.key}
                title={a.role}
                onClick={() => setSession(s => ({ ...s, agent: s.agent === a.key ? null : a.key }))}
                style={{
                  ...pillStyle,
                  background: session.agent === a.key ? accentColor : (isDark ? '#2a2a4a' : '#e2e8f0'),
                  color: session.agent === a.key ? '#fff' : text,
                }}
              >{a.avatar} {a.name}</button>
            ))}
          </div>

          {/* Model selector */}
          <select
            value={session.model}
            onChange={e => setSession(s => ({ ...s, model: e.target.value }))}
            style={{
              background: isDark ? '#2a2a4a' : '#f0f4ff', border: `1px solid ${border}`,
              borderRadius: 6, color: text, padding: '3px 6px', fontSize: 12, cursor: 'pointer',
            }}
          >
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.displayName}</option>)}
          </select>

          <button onClick={() => setShowSettings(true)} title="Settings" style={iconBtn(isDark)}>⚙️</button>
        </header>

        {/* Active skills bar */}
        {session.activeSkills.length > 0 && (
          <div style={{ padding: '4px 1rem', borderBottom: `1px solid ${border}`, display: 'flex', gap: 4, flexWrap: 'wrap', background: isDark ? '#0d0d20' : '#f0f4ff' }}>
            {session.activeSkills.map(key => {
              const skill = SKILLS.find(s => s.key === key)
              return skill ? (
                <span key={key} style={{ fontSize: 11, background: accentColor + '33', color: accentColor, borderRadius: 4, padding: '2px 6px' }}>
                  ⚡ {skill.name}
                </span>
              ) : null
            })}
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayMessages.length === 0 && (
            <div style={{ textAlign: 'center', color: muted, marginTop: '4rem', fontSize: 14 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>✨</div>
              <div>Start a conversation or type <code style={{ background: isDark ? '#2a2a4a' : '#e2e8f0', padding: '2px 5px', borderRadius: 4 }}>/SKILLS</code> for available commands.</div>
            </div>
          )}

          {displayMessages.map(msg => {
            if ('type' in msg) {
              // System message
              return (
                <div key={msg.id} style={{
                  padding: '0.5rem 0.75rem', borderRadius: 8, fontSize: 13,
                  background: msg.type === 'error'
                    ? (isDark ? '#2d1515' : '#fff0f0')
                    : (isDark ? '#1a2a1a' : '#f0fff0'),
                  color: msg.type === 'error' ? '#f87171' : (isDark ? '#86efac' : '#15803d'),
                  borderLeft: `3px solid ${msg.type === 'error' ? '#f87171' : '#4ade80'}`,
                  whiteSpace: 'pre-wrap',
                }}>
                  <span dangerouslySetInnerHTML={{ __html: renderMd(msg.content) }} />
                </div>
              )
            }

            const isUser = msg.role === 'user'
            return (
              <div key={msg.id} style={{
                display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '80%', padding: '0.6rem 0.9rem', borderRadius: 12,
                  background: isUser ? accentColor : (isDark ? '#1a1a2e' : '#f0f4ff'),
                  color: isUser ? '#fff' : text,
                  border: isUser ? 'none' : `1px solid ${border}`,
                  fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap',
                }}>
                  {!isUser && (
                    <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>
                      {session.agent ? getAgent(session.agent)?.name ?? 'Assistant' : 'Assistant'}
                      {(msg as DisplayMessage).streaming && <span style={{ color: accentColor }}> ●</span>}
                    </div>
                  )}
                  <span dangerouslySetInnerHTML={{ __html: renderMd(msg.content) }} />
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '0.75rem 1rem', borderTop: `1px solid ${border}`, background: surface, flexShrink: 0, position: 'relative' }}>
          {showSlashMenu && filteredCommands.length > 0 && (
            <div style={{
              position: 'absolute', bottom: '100%', left: '1rem', right: '1rem',
              background: surface, border: `1px solid ${border}`, borderRadius: 8,
              overflow: 'hidden', boxShadow: '0 -4px 16px rgba(0,0,0,0.3)', zIndex: 100,
            }}>
              {filteredCommands.map(cmd => (
                <div
                  key={cmd.name}
                  onMouseDown={e => { e.preventDefault(); setInput('/' + cmd.name + ' '); setShowSlashMenu(false); inputRef.current?.focus() }}
                  style={{
                    padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: 13,
                    borderBottom: `1px solid ${border}`, display: 'flex', gap: 8, alignItems: 'baseline',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = isDark ? '#2a2a4a' : '#f0f4ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <code style={{ color: accentColor, fontWeight: 700, minWidth: 140 }}>/{cmd.name}{cmd.args ? ` ${cmd.args}` : ''}</code>
                  <span style={{ color: muted }}>{cmd.description}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Message or /command…"
              rows={1}
              disabled={isStreaming}
              style={{
                flex: 1, background: isDark ? '#0d0d14' : '#f8f9fc',
                border: `1px solid ${border}`, borderRadius: 8,
                color: text, padding: '0.6rem 0.75rem', fontSize: 14,
                outline: 'none', resize: 'none', lineHeight: 1.5,
                maxHeight: 160, overflow: 'auto',
              }}
            />
            <button
              onClick={handleSend}
              disabled={isStreaming || !input.trim()}
              style={{
                ...btnStyle(accentColor), padding: '0.6rem 1rem', fontSize: 14,
                opacity: isStreaming || !input.trim() ? 0.5 : 1,
              }}
            >
              {isStreaming ? '…' : '↑'}
            </button>
          </div>
          <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>
            Enter to send · Shift+Enter for newline · Type / for commands
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Modal onClose={() => setShowSettings(false)} title="Settings" isDark={isDark} border={border} surface={surface} text={text}>
          <label style={labelStyle}>Model</label>
          <select value={session.model} onChange={e => setSession(s => ({ ...s, model: e.target.value }))} style={selectStyle(isDark, border, text)}>
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.displayName} — {m.id}</option>)}
          </select>

          <label style={labelStyle}>Theme</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['dark', 'light'] as const).map(t => (
              <button key={t} onClick={() => setTheme(t)} style={{ ...btnStyle(accentColor), opacity: theme === t ? 1 : 0.4 }}>{t}</button>
            ))}
          </div>

          <label style={labelStyle}>Accent Color</label>
          <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{ height: 36, width: '100%', borderRadius: 8, cursor: 'pointer', border: 'none' }} />

          <label style={labelStyle}>Active Skills</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {SKILLS.map(skill => (
              <button
                key={skill.key}
                onClick={() => setSession(s => ({
                  ...s,
                  activeSkills: s.activeSkills.includes(skill.key)
                    ? s.activeSkills.filter(k => k !== skill.key)
                    : [...s.activeSkills, skill.key],
                }))}
                style={{
                  ...pillStyle,
                  background: session.activeSkills.includes(skill.key) ? accentColor : (isDark ? '#2a2a4a' : '#e2e8f0'),
                  color: session.activeSkills.includes(skill.key) ? '#fff' : text,
                  fontSize: 12,
                }}
              >{skill.name}</button>
            ))}
          </div>

          <button onClick={async () => { await fetch('/api/admin/auth', { method: 'DELETE' }); window.location.href = '/admin/login' }} style={{ ...btnStyle('#dc2626'), marginTop: 8 }}>Sign out</button>
        </Modal>
      )}

      {/* Memory Panel */}
      {showMemory && (
        <Modal onClose={() => setShowMemory(false)} title="🧠 Memory" isDark={isDark} border={border} surface={surface} text={text}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={newMemoryText}
              onChange={e => setNewMemoryText(e.target.value)}
              placeholder="New memory…"
              style={{ flex: 1, ...inputStyle(isDark, border, text) }}
            />
            <input
              value={newMemoryTags}
              onChange={e => setNewMemoryTags(e.target.value)}
              placeholder="tags, comma, sep"
              style={{ width: 140, ...inputStyle(isDark, border, text) }}
            />
            <button onClick={() => {
              if (!newMemoryText.trim()) return
              const tags = newMemoryTags.split(',').map(t => t.trim()).filter(Boolean)
              const entry = { id: crypto.randomUUID(), content: newMemoryText.trim(), tags, timestamp: new Date().toISOString() }
              const updated = [entry, ...memories]
              setMemories(updated)
              setNewMemoryText('')
              setNewMemoryTags('')
            }} style={btnStyle(accentColor)}>Add</button>
          </div>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflowY: 'auto' }}>
            {memories.length === 0 && <span style={{ color: '#64748b', fontSize: 13 }}>No memories yet.</span>}
            {memories.map(m => (
              <div key={m.id} style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: isDark ? '#0d0d14' : '#f8f9fc', border: `1px solid ${border}`, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ color: '#94a3b8', fontSize: 11 }}>{new Date(m.timestamp).toLocaleDateString()} {m.tags.length > 0 && `[${m.tags.join(', ')}]`}</span>
                  <button onClick={() => setMemories(memories.filter(x => x.id !== m.id))} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: 14 }}>×</button>
                </div>
                <div style={{ marginTop: 2 }}>{m.content}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Agents Panel */}
      {showAgents && (
        <Modal onClose={() => setShowAgents(false)} title="🤖 Agents" isDark={isDark} border={border} surface={surface} text={text}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              onClick={() => { setSession(s => ({ ...s, agent: null })); setShowAgents(false) }}
              style={{
                ...agentCardStyle(isDark, border),
                background: !session.agent ? accentColor + '22' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 22 }}>🤖</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Default</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>No specialized persona</div>
              </div>
            </div>
            {AGENTS.map(a => (
              <div
                key={a.key}
                onClick={() => { setSession(s => ({ ...s, agent: a.key })); setShowAgents(false) }}
                style={{
                  ...agentCardStyle(isDark, border),
                  background: session.agent === a.key ? accentColor + '22' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 22 }}>{a.avatar}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{a.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Plugins Panel */}
      {showPlugins && (
        <Modal onClose={() => setShowPlugins(false)} title="🔌 Plugins" isDark={isDark} border={border} surface={surface} text={text}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {plugins.map(p => (
              <div key={p.key} style={{ ...agentCardStyle(isDark, border), justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name} <span style={{ color: '#64748b', fontSize: 11 }}>v{p.version}</span></div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{p.description}</div>
                </div>
                <button
                  onClick={() => {
                    const updated = togglePlugin(p.key, plugins)
                    setPlugins(updated)
                    savePlugins(updated)
                  }}
                  style={{
                    ...pillStyle, minWidth: 60,
                    background: p.active ? accentColor : (isDark ? '#2a2a4a' : '#e2e8f0'),
                    color: p.active ? '#fff' : text,
                  }}
                >{p.active ? 'On' : 'Off'}</button>
              </div>
            ))}
            <button onClick={() => { setPlugins(resetPlugins()) }} style={{ ...btnStyle('#64748b'), marginTop: 4, fontSize: 12 }}>Reset to defaults</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── Reusable styled components ────────────────────────────────────────────────

function Modal({ children, onClose, title, isDark, border, surface, text }: {
  children: React.ReactNode
  onClose: () => void
  title: string
  isDark: boolean
  border: string
  surface: string
  text: string
}) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: surface, border: `1px solid ${border}`, borderRadius: 12,
          padding: '1.25rem', width: 480, maxWidth: '95vw', maxHeight: '80vh',
          overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem',
          color: text,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

const btnStyle = (color: string) => ({
  background: color, color: '#fff', border: 'none', borderRadius: 8,
  padding: '0.5rem 1rem', fontSize: 13, fontWeight: 600, cursor: 'pointer',
})

const pillStyle: React.CSSProperties = {
  border: 'none', borderRadius: 20, padding: '3px 10px', fontSize: 12,
  fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.15s',
}

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1,
}

const iconBtn = (isDark: boolean) => ({
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: 16, color: isDark ? '#94a3b8' : '#64748b',
  padding: '4px 6px', borderRadius: 6,
})

const agentCardStyle = (isDark: boolean, border: string): React.CSSProperties => ({
  padding: '0.6rem 0.75rem', borderRadius: 8, border: `1px solid ${border}`,
  display: 'flex', gap: 10, alignItems: 'center',
})

const inputStyle = (isDark: boolean, border: string, text: string) => ({
  background: isDark ? '#0d0d14' : '#f8f9fc',
  border: `1px solid ${border}`, borderRadius: 8,
  color: text, padding: '0.5rem 0.75rem', fontSize: 13, outline: 'none',
})

const selectStyle = (isDark: boolean, border: string, text: string) => ({
  background: isDark ? '#0d0d14' : '#f8f9fc',
  border: `1px solid ${border}`, borderRadius: 8,
  color: text, padding: '0.5rem 0.75rem', fontSize: 13,
  width: '100%',
})
