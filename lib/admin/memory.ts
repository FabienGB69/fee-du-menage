import type { MemoryEntry, ChatMessage } from './types'

const STORAGE_KEY = 'admin_memories'

export function loadMemories(): MemoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveMemories(entries: MemoryEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function addMemory(content: string, tags: string[] = []): MemoryEntry {
  const entry: MemoryEntry = {
    id: crypto.randomUUID(),
    content,
    tags,
    timestamp: new Date().toISOString(),
  }
  const entries = loadMemories()
  entries.unshift(entry)
  saveMemories(entries)
  return entry
}

export function deleteMemory(id: string): void {
  saveMemories(loadMemories().filter(e => e.id !== id))
}

export function searchMemories(query: string, entries: MemoryEntry[]): MemoryEntry[] {
  if (!query.trim()) return entries
  const lower = query.toLowerCase()
  return entries.filter(
    e =>
      e.content.toLowerCase().includes(lower) ||
      e.tags.some(t => t.toLowerCase().includes(lower))
  )
}

export function injectMemories(messages: ChatMessage[], entries: MemoryEntry[]): ChatMessage[] {
  if (entries.length === 0) return messages
  const top = entries.slice(0, 5)
  const memText = top.map(e => `- ${e.content}${e.tags.length ? ` [${e.tags.join(', ')}]` : ''}`).join('\n')
  const injected: ChatMessage = {
    role: 'user',
    content: `[Memory context]\n${memText}\n[End memory context]`,
  }
  return [injected, ...messages]
}

// MemPalace: organize memories into "rooms" (topic groups)
export interface MemPalaceRoom {
  name: string
  entries: MemoryEntry[]
}

export function buildMemPalace(entries: MemoryEntry[]): MemPalaceRoom[] {
  const rooms = new Map<string, MemoryEntry[]>()
  for (const entry of entries) {
    const room = entry.tags[0] ?? 'General'
    if (!rooms.has(room)) rooms.set(room, [])
    rooms.get(room)!.push(entry)
  }
  return Array.from(rooms.entries()).map(([name, roomEntries]) => ({ name, entries: roomEntries }))
}
