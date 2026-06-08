import type { CommandDef, CommandContext, CommandResult, Session } from './types'
import { resolveModel, getModelInfo, calcCost, MODELS } from './models'
import { loadSessions, saveSession, findSession, cloneSession, createSession } from './sessions'
import { AGENTS } from './agents'
import { SKILLS } from './skills'

export const COMMANDS: CommandDef[] = [
  {
    name: 'CLEAR',
    description: 'Clear conversation history and reset context.',
    handler(_args, ctx) {
      ctx.setSession(s => ({ ...s, messages: [], tokenUsage: { input: 0, output: 0 } }))
      return { type: 'system', content: 'Conversation cleared.' }
    },
  },
  {
    name: 'COST',
    description: 'Show token usage and estimated cost for the current session.',
    handler(_args, ctx) {
      const { tokenUsage, model } = ctx.session
      const info = getModelInfo(model)
      const cost = calcCost(tokenUsage, model)
      return {
        type: 'system',
        content: `**Token Usage — ${info.displayName}**\n| | Tokens | Cost |\n|---|---|---|\n| Input | ${tokenUsage.input.toLocaleString()} | $${((tokenUsage.input / 1_000_000) * info.inputPricePerM).toFixed(4)} |\n| Output | ${tokenUsage.output.toLocaleString()} | $${((tokenUsage.output / 1_000_000) * info.outputPricePerM).toFixed(4)} |\n| **Total** | ${(tokenUsage.input + tokenUsage.output).toLocaleString()} | **$${cost.toFixed(4)}** |`,
      }
    },
  },
  {
    name: 'COMPACT',
    args: '[instructions]',
    description: 'Compress the conversation into a summary, keeping essential context.',
    async handler(args, ctx) {
      if (ctx.session.messages.length === 0) {
        return { type: 'error', content: 'No messages to compact.' }
      }
      const instruction = args || 'Preserve all key decisions, code snippets, and important context.'
      const summaryPrompt = `Summarize this conversation concisely. ${instruction}\n\nRespond with ONLY the summary text, no preamble.`
      try {
        const summary = await ctx.postToApi(ctx.session.messages, { systemPrompt: summaryPrompt })
        ctx.setSession(s => ({
          ...s,
          messages: [{ role: 'assistant', content: `[Compacted summary]\n${summary}` }],
          tokenUsage: { input: 0, output: 0 },
        }))
        return { type: 'system', content: 'History compacted into a summary.' }
      } catch {
        return { type: 'error', content: 'Failed to compact history.' }
      }
    },
  },
  {
    name: 'RESUME',
    args: '[session]',
    description: 'Reopen a previous conversation by ID or name.',
    handler(args, ctx) {
      const sessions = loadSessions()
      if (!args) {
        if (sessions.length === 0) return { type: 'system', content: 'No saved sessions.' }
        const list = sessions
          .slice(0, 10)
          .map((s, i) => `${i + 1}. **${s.name}** (${s.id.slice(0, 8)}) — ${new Date(s.updatedAt).toLocaleDateString()}`)
          .join('\n')
        return { type: 'system', content: `**Saved sessions:**\n${list}\n\nUse \`/RESUME <name or id>\` to load one.` }
      }
      const found = findSession(args)
      if (!found) return { type: 'error', content: `No session found matching "${args}".` }
      ctx.setSession(found)
      return { type: 'system', content: `Resumed session: **${found.name}**` }
    },
  },
  {
    name: 'BRANCH',
    args: '[name]',
    description: 'Create a new branch from the current conversation.',
    handler(args, ctx) {
      const branch = cloneSession(ctx.session, args || undefined)
      saveSession(branch)
      ctx.setSession(branch)
      return { type: 'system', content: `Created branch: **${branch.name}** (${branch.id.slice(0, 8)})` }
    },
  },
  {
    name: 'REWIND',
    description: 'Remove the last user + assistant message pair.',
    handler(_args, ctx) {
      const msgs = ctx.session.messages
      const lastAssistant = [...msgs].reverse().findIndex(m => m.role === 'assistant')
      if (lastAssistant === -1) return { type: 'error', content: 'Nothing to rewind.' }
      const cutIdx = msgs.length - 1 - lastAssistant
      const lastUser = [...msgs.slice(0, cutIdx)].reverse().findIndex(m => m.role === 'user')
      const startIdx = lastUser === -1 ? cutIdx : cutIdx - 1 - lastUser
      ctx.setSession(s => ({ ...s, messages: s.messages.slice(0, startIdx) }))
      return { type: 'system', content: 'Last exchange rewound.' }
    },
  },
  {
    name: 'RENAME',
    args: '[name]',
    description: 'Rename the current session. Omit name to auto-generate one.',
    async handler(args, ctx) {
      if (args) {
        ctx.setSession(s => {
          const updated = { ...s, name: args }
          saveSession(updated)
          return updated
        })
        return { type: 'system', content: `Session renamed to: **${args}**` }
      }
      // auto-generate from conversation
      if (ctx.session.messages.length === 0) {
        return { type: 'error', content: 'No messages to generate a name from.' }
      }
      try {
        const name = await ctx.postToApi(ctx.session.messages, {
          systemPrompt: 'Generate a short (3-5 word) title for this conversation. Respond with ONLY the title, no punctuation, no quotes.',
        })
        const trimmed = name.trim().replace(/["'.]+/g, '').slice(0, 60)
        ctx.setSession(s => {
          const updated = { ...s, name: trimmed }
          saveSession(updated)
          return updated
        })
        return { type: 'system', content: `Session renamed to: **${trimmed}**` }
      } catch {
        return { type: 'error', content: 'Failed to generate name.' }
      }
    },
  },
  {
    name: 'EXPORT',
    args: '[filename]',
    description: 'Export the conversation as a plain text file.',
    handler(args, ctx) {
      const { session } = ctx
      if (session.messages.length === 0) return { type: 'error', content: 'No messages to export.' }
      const lines = [
        `Session: ${session.name}`,
        `Date: ${new Date(session.createdAt).toLocaleString()}`,
        `Model: ${session.model}`,
        '',
        ...session.messages.map(m => `${m.role === 'user' ? 'You' : 'Assistant'}:\n${m.content}\n`),
      ]
      const text = lines.join('\n')
      const blob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = args || `chat-${session.id.slice(0, 8)}.txt`
      a.click()
      URL.revokeObjectURL(url)
      return { type: 'system', content: `Exported as **${a.download}**` }
    },
  },
  {
    name: 'MODEL',
    args: '[model]',
    description: 'Switch to another model (sonnet, opus, haiku).',
    handler(args, ctx) {
      if (!args) {
        const list = MODELS.map(m => `• **${m.alias[0]}** — ${m.displayName} ($${m.inputPricePerM}/$${m.outputPricePerM} per M tokens)`).join('\n')
        return { type: 'system', content: `**Available models:**\n${list}\n\nCurrent: **${ctx.session.model}**` }
      }
      const model = resolveModel(args)
      if (!model) return { type: 'error', content: `Unknown model "${args}". Use: sonnet, opus, haiku.` }
      ctx.setSession(s => {
        const updated = { ...s, model: model.id }
        saveSession(updated)
        return updated
      })
      return { type: 'system', content: `Switched to **${model.displayName}** (${model.id})` }
    },
  },
  {
    name: 'USAGE',
    description: 'Show token usage statistics for this session.',
    handler(_args, ctx) {
      const { tokenUsage, model } = ctx.session
      const info = getModelInfo(model)
      const cost = calcCost(tokenUsage, model)
      return {
        type: 'system',
        content: `**Usage — ${info.displayName}**\nInput tokens: ${tokenUsage.input.toLocaleString()}\nOutput tokens: ${tokenUsage.output.toLocaleString()}\nTotal tokens: ${(tokenUsage.input + tokenUsage.output).toLocaleString()}\nEstimated cost: $${cost.toFixed(4)}`,
      }
    },
  },
  {
    name: 'EXTRA-USAGE',
    description: 'Enable extra usage when standard limits are reached.',
    handler() {
      return {
        type: 'system',
        content: `**Extra Usage**\nTo increase API limits, ensure your own \`ANTHROPIC_API_KEY\` is set in the environment.\nVisit [console.anthropic.com](https://console.anthropic.com) to manage your API usage and billing limits.`,
      }
    },
  },
  {
    name: 'INIT',
    description: 'Initialize or view the project CLAUDE.md guide.',
    handler() {
      return {
        type: 'system',
        content: `**CLAUDE.md**\nThe project CLAUDE.md file lives at the root of the repository. It contains behavioral guidelines for AI assistants working on this project.\n\nTo create or edit it, run:\n\`\`\`\nnano CLAUDE.md\n\`\`\`\nor use the \`/MEMORY\` command to manage persistent context within sessions.`,
      }
    },
  },
  {
    name: 'MEMORY',
    description: 'View and edit persistent memory notes.',
    handler(_args, ctx) {
      ctx.setShowMemory(true)
      return { type: 'system', content: 'Memory panel opened.' }
    },
  },
  {
    name: 'ADD-DIR',
    args: '<path>',
    description: 'Add a working directory (not supported in web context).',
    handler() {
      return { type: 'info', content: '`/ADD-DIR` is not supported in the web interface. Use the Claude Code CLI for filesystem access.' }
    },
  },
  {
    name: 'DIFF',
    description: 'Open a diff viewer for uncommitted changes (not supported in web context).',
    handler() {
      return { type: 'info', content: '`/DIFF` is not supported in the web interface. Use the Claude Code CLI or run `git diff` in your terminal.' }
    },
  },
  {
    name: 'SECURITY-REVIEW',
    description: 'Check pending changes for security issues (runs Nyx agent).',
    async handler(_args, ctx) {
      try {
        const result = await ctx.postToApi(ctx.session.messages, {
          systemPrompt: `You are Nyx, a security engineer. Review the conversation for any code, configurations, or practices that could introduce security vulnerabilities.
Check for: SQL injection, XSS, CSRF, exposed secrets, insecure auth, missing input validation, insecure dependencies.
Output findings organized by severity: [CRITICAL] [HIGH] [MEDIUM] [LOW].
If no issues found, explicitly state that.`,
          model: ctx.session.model,
        })
        return { type: 'system', content: `**Security Review (Nyx)**\n\n${result}` }
      } catch {
        return { type: 'error', content: 'Security review failed.' }
      }
    },
  },
  {
    name: 'PLAN',
    args: '[description]',
    description: 'Enter planning mode with an optional task description.',
    async handler(args, ctx) {
      const planPrompt = args || 'the current task'
      try {
        const plan = await ctx.postToApi(
          args ? [{ role: 'user', content: `Create a detailed implementation plan for: ${planPrompt}` }] : ctx.session.messages,
          {
            systemPrompt: `You are in planning mode. Output a structured markdown plan for: ${planPrompt}

Use this format:
## Context
## Goals
## Steps
1. Step with file path and what to change
## Risks
## Verification`,
          }
        )
        return { type: 'system', content: `**Plan: ${planPrompt}**\n\n${plan}` }
      } catch {
        return { type: 'error', content: 'Planning failed.' }
      }
    },
  },
  {
    name: 'PERMISSIONS',
    description: 'Manage allow, ask, and deny rules for tool access.',
    handler() {
      return {
        type: 'system',
        content: `**Permissions**\nTool access permissions are managed in \`.claude/settings.json\` at the project root.\nUse the Claude Code CLI (\`/permissions\`) for interactive permission management.`,
      }
    },
  },
  {
    name: 'AGENTS',
    description: 'Manage agent and sub-agent configurations.',
    handler(_args, ctx) {
      ctx.setShowAgents(true)
      const list = AGENTS.map(a => `${a.avatar} **${a.name}** — ${a.role}`).join('\n')
      return { type: 'system', content: `**Available Agents:**\n${list}\n\nAgent panel opened.` }
    },
  },
  {
    name: 'SKILLS',
    description: 'List all available skills, built-in and custom.',
    handler() {
      const list = SKILLS.map(s => `• **/${s.key}** — ${s.name}: ${s.description}`).join('\n')
      return { type: 'system', content: `**Available Skills:**\n${list}` }
    },
  },
  {
    name: 'PLUGIN',
    description: 'Manage Claude Code plugins.',
    handler(_args, ctx) {
      ctx.setShowPlugins(true)
      return { type: 'system', content: 'Plugin panel opened.' }
    },
  },
  {
    name: 'RELOAD-PLUGINS',
    description: 'Reload active plugins without restarting.',
    handler() {
      return { type: 'system', content: 'Plugins reloaded. (In the web interface, plugins are re-initialized on page load.)' }
    },
  },
  {
    name: 'MCP',
    description: 'Manage MCP server connections and OAuth authentication.',
    handler() {
      return {
        type: 'system',
        content: `**MCP Servers**\nMCP (Model Context Protocol) server connections are managed in the Claude Code CLI.\nConfigure servers in \`~/.claude/settings.json\` → \`"mcpServers"\`.\nUse the Claude Code CLI (\`/mcp\`) for interactive MCP management.`,
      }
    },
  },
  {
    name: 'CONFIG',
    description: 'Open settings for theme, model, output style, and preferences.',
    handler(_args, ctx) {
      ctx.setShowSettings(true)
      return { type: 'system', content: 'Settings opened.' }
    },
  },
  {
    name: 'THEME',
    description: 'Toggle between light and dark color themes.',
    handler(_args, ctx) {
      const next = ctx.theme === 'dark' ? 'light' : 'dark'
      ctx.setTheme(next)
      return { type: 'system', content: `Theme switched to **${next}**.` }
    },
  },
  {
    name: 'COLOR',
    args: '[color]',
    description: 'Set the accent color for the current session (hex or CSS color).',
    handler(args, ctx) {
      if (!args) return { type: 'error', content: 'Usage: /COLOR #ff6b6b' }
      ctx.setAccentColor(args)
      return { type: 'system', content: `Accent color set to **${args}**.` }
    },
  },
]

// Also register skill activator commands
for (const skill of SKILLS) {
  COMMANDS.push({
    name: skill.key.toUpperCase(),
    description: `Activate skill: ${skill.name} — ${skill.description}`,
    handler(_args, ctx) {
      const already = ctx.session.activeSkills.includes(skill.key)
      if (already) {
        ctx.setSession(s => ({ ...s, activeSkills: s.activeSkills.filter(k => k !== skill.key) }))
        return { type: 'system', content: `Skill **${skill.name}** deactivated.` }
      }
      ctx.setSession(s => ({ ...s, activeSkills: [...s.activeSkills, skill.key] }))
      return { type: 'system', content: `Skill **${skill.name}** activated. ${skill.description}` }
    },
  })
}

export function parseCommand(input: string): { name: string; args: string } | null {
  if (!input.startsWith('/')) return null
  const rest = input.slice(1)
  const spaceIdx = rest.indexOf(' ')
  const name = (spaceIdx === -1 ? rest : rest.slice(0, spaceIdx)).toUpperCase()
  const args = spaceIdx === -1 ? '' : rest.slice(spaceIdx + 1).trim()
  if (!name) return null
  return { name, args }
}

export function findCommand(name: string): CommandDef | null {
  return COMMANDS.find(c => c.name === name.toUpperCase()) ?? null
}
