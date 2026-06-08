import type { SkillDef } from './types'

export const SKILLS: SkillDef[] = [
  {
    key: 'darwin',
    name: 'Darwin (TDD Loop)',
    description: 'Generate the test spec first, then evolve implementation until it passes.',
    systemModifier: `You are in Darwin TDD mode. For every coding task:
1. First output a test specification (describe/it blocks or equivalent) that defines success.
2. Then implement the minimum code to make those tests pass.
3. Refactor only after tests are green. Label each step clearly: [TEST SPEC], [IMPLEMENTATION], [REFACTOR].`,
  },
  {
    key: 'caveman',
    name: 'Caveman (No Abstraction)',
    description: 'Write direct, concrete, imperative code. No abstractions, no patterns.',
    systemModifier: `You are in Caveman mode. Rules:
- Write direct, concrete, imperative code only.
- No helper functions unless called more than 3 times.
- No design patterns, no abstractions, no DRY until actually needed.
- Inline everything. Favor readability over cleverness.
- If you catch yourself writing an abstraction, stop and inline it.`,
  },
  {
    key: 'claude-mem',
    name: 'Claude-Mem (Memory Injection)',
    description: 'Inject relevant memory entries into every prompt for persistent context.',
    systemModifier: `You have access to persistent memory entries provided at the start of each message. Use them to maintain context across sessions. Reference them when relevant. Update your understanding as new information arrives.`,
  },
  {
    key: 'planning-with-files',
    name: 'Planning with Files',
    description: 'Generate structured plans as downloadable markdown files.',
    systemModifier: `You are in planning mode. For every task:
1. Output a structured markdown plan with: ## Context, ## Goals, ## Steps (numbered), ## Risks, ## Verification.
2. Make each step atomic and independently verifiable.
3. Include file paths for any files that need to be created or modified.
The plan will be saved as a markdown file.`,
  },
  {
    key: 'code-review',
    name: 'Code Review',
    description: 'Structured review with categories: bugs, security, performance, style.',
    systemModifier: `You are performing a structured code review. Organize your output into these sections:
### 🐛 Bugs (must fix)
### 🔒 Security (must fix)
### ⚡ Performance (should fix)
### 🎨 Style & Readability (nice to have)
### ✅ What's good
Rate each finding: [CRITICAL] [HIGH] [MEDIUM] [LOW]. Be specific: file name, line number, explanation, fix.`,
  },
  {
    key: 'mempalace',
    name: 'MemPalace',
    description: 'Organize memories as spatial "rooms" by topic for structured retrieval.',
    systemModifier: `You are using the MemPalace technique. When referencing memories, think of them as rooms in a palace:
- Each topic is a room you can walk into.
- When asked to remember something, assign it to the most relevant room.
- When recalling, mentally walk through the relevant rooms.
This helps maintain organized, topic-structured memory across conversations.`,
  },
  {
    key: '3tier',
    name: '3-Tier Orchestration',
    description: 'Auto-route tasks: Haiku (fast) → Sonnet (standard) → Opus (complex reasoning).',
    systemModifier: `You are the orchestrator in a 3-tier model system.
For each request, first classify it as: fast / standard / complex.
- fast: simple lookups, formatting, short answers → use Haiku
- standard: coding tasks, explanations, analysis → use Sonnet
- complex: architecture decisions, deep reasoning, multi-step plans → use Opus
Always show the selected tier and why before responding.`,
  },
]

export function getSkill(key: string): SkillDef | null {
  return SKILLS.find(s => s.key === key) ?? null
}

export function buildSkillSystemPrompt(activeSkills: string[]): string {
  return activeSkills
    .map(key => getSkill(key)?.systemModifier ?? '')
    .filter(Boolean)
    .join('\n\n')
}
