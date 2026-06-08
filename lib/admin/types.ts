export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface DisplayMessage extends ChatMessage {
  id: string
  timestamp: string
  streaming?: boolean
}

export interface SystemMessage {
  id: string
  type: 'system' | 'error' | 'info'
  content: string
  timestamp: string
}

export type AnyMessage = DisplayMessage | SystemMessage

export interface TokenUsage {
  input: number
  output: number
}

export interface Session {
  id: string
  name: string
  model: string
  agent: string | null
  activeSkills: string[]
  messages: ChatMessage[]
  tokenUsage: TokenUsage
  createdAt: string
  updatedAt: string
}

export interface MemoryEntry {
  id: string
  content: string
  tags: string[]
  timestamp: string
}

export interface Plugin {
  key: string
  name: string
  description: string
  active: boolean
  version: string
}

export interface AgentDef {
  key: string
  name: string
  role: string
  avatar: string
  systemPrompt: string
}

export interface SkillDef {
  key: string
  name: string
  description: string
  systemModifier: string
  onActivate?: (ctx: CommandContext) => void
}

export interface CommandDef {
  name: string
  args?: string
  description: string
  handler: (args: string, ctx: CommandContext) => Promise<CommandResult> | CommandResult
}

export type CommandResult =
  | { type: 'system'; content: string }
  | { type: 'error'; content: string }
  | { type: 'info'; content: string }
  | { type: 'panel'; panel: 'settings' | 'usage' | 'skills' | 'memory' | 'agents' | 'plugins' }

export interface CommandContext {
  session: Session
  setSession: (s: Session | ((prev: Session) => Session)) => void
  postToApi: (messages: ChatMessage[], opts?: { systemPrompt?: string; model?: string }) => Promise<string>
  setShowSettings: (v: boolean) => void
  setShowMemory: (v: boolean) => void
  setShowAgents: (v: boolean) => void
  setShowPlugins: (v: boolean) => void
  memories: MemoryEntry[]
  setMemories: (m: MemoryEntry[]) => void
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
  accentColor: string
  setAccentColor: (c: string) => void
}

export interface ChatRequestBody {
  messages: ChatMessage[]
  model: string
  systemPrompt?: string
  maxTokens?: number
}

export interface StreamUsageSentinel {
  __usage: { input_tokens: number; output_tokens: number }
}
