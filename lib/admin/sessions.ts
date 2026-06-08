import { z } from 'zod'
import type { Session } from './types'
import { DEFAULT_MODEL } from './models'

const STORAGE_KEY = 'admin_sessions'

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
})

const sessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  agent: z.string().nullable(),
  activeSkills: z.array(z.string()),
  messages: z.array(chatMessageSchema),
  tokenUsage: z.object({ input: z.number(), output: z.number() }),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const sessionsSchema = z.array(sessionSchema)

export function createSession(partial?: Partial<Session>): Session {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    name: 'New conversation',
    model: DEFAULT_MODEL,
    agent: null,
    activeSkills: [],
    messages: [],
    tokenUsage: { input: 0, output: 0 },
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}

export function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = sessionsSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : []
  } catch {
    return []
  }
}

export function saveSession(session: Session): void {
  const sessions = loadSessions()
  const idx = sessions.findIndex(s => s.id === session.id)
  const updated = { ...session, updatedAt: new Date().toISOString() }
  if (idx >= 0) {
    sessions[idx] = updated
  } else {
    sessions.unshift(updated)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

export function deleteSession(id: string): void {
  const sessions = loadSessions().filter(s => s.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

export function findSession(query: string): Session | null {
  const sessions = loadSessions()
  // exact ID match first
  const byId = sessions.find(s => s.id === query)
  if (byId) return byId
  // fuzzy name match
  const lower = query.toLowerCase()
  return sessions.find(s => s.name.toLowerCase().includes(lower)) ?? null
}

export function cloneSession(session: Session, name?: string): Session {
  return {
    ...session,
    id: crypto.randomUUID(),
    name: name ?? `${session.name} (branch)`,
    tokenUsage: { input: 0, output: 0 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
