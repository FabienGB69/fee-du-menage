export interface ModelInfo {
  id: string
  displayName: string
  alias: string[]
  inputPricePerM: number
  outputPricePerM: number
}

export const MODELS: ModelInfo[] = [
  {
    id: 'claude-sonnet-4-6',
    displayName: 'Claude Sonnet',
    alias: ['sonnet', 'sonnet-4-6', 'default'],
    inputPricePerM: 3.0,
    outputPricePerM: 15.0,
  },
  {
    id: 'claude-opus-4-8',
    displayName: 'Claude Opus',
    alias: ['opus', 'opus-4-8'],
    inputPricePerM: 15.0,
    outputPricePerM: 75.0,
  },
  {
    id: 'claude-haiku-4-5-20251001',
    displayName: 'Claude Haiku',
    alias: ['haiku', 'haiku-4-5'],
    inputPricePerM: 0.25,
    outputPricePerM: 1.25,
  },
]

export const DEFAULT_MODEL = 'claude-sonnet-4-6'

export function resolveModel(alias: string): ModelInfo | null {
  const lower = alias.toLowerCase().trim()
  return MODELS.find(m => m.alias.includes(lower) || m.id === lower) ?? null
}

export function getModelInfo(id: string): ModelInfo {
  return MODELS.find(m => m.id === id) ?? MODELS[0]
}

export function calcCost(usage: { input: number; output: number }, modelId: string): number {
  const info = getModelInfo(modelId)
  return (usage.input / 1_000_000) * info.inputPricePerM + (usage.output / 1_000_000) * info.outputPricePerM
}
