import type { Plugin } from './types'

const STORAGE_KEY = 'admin_plugins'

export const DEFAULT_PLUGINS: Plugin[] = [
  {
    key: 'ruflo-core',
    name: 'Ruflo Core',
    description: 'Core runtime: plugin loading, lifecycle hooks, and event bus.',
    active: true,
    version: '1.0.0',
  },
  {
    key: 'ruflo-swarm',
    name: 'Ruflo Swarm',
    description: 'Run the same prompt through all 5 agent personas and aggregate responses.',
    active: false,
    version: '1.0.0',
  },
  {
    key: 'ruflo-autopilot',
    name: 'Ruflo Autopilot',
    description: 'Autonomous loop: Claude plans, executes, and verifies steps without intervention.',
    active: false,
    version: '1.0.0',
  },
  {
    key: 'ruflo-federation',
    name: 'Ruflo Federation',
    description: 'Automatically route queries to the most appropriate agent based on content.',
    active: false,
    version: '1.0.0',
  },
]

export function loadPlugins(): Plugin[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PLUGINS
    const saved: Plugin[] = JSON.parse(raw)
    // merge with defaults to add new plugins
    return DEFAULT_PLUGINS.map(def => saved.find(s => s.key === def.key) ?? def)
  } catch {
    return DEFAULT_PLUGINS
  }
}

export function savePlugins(plugins: Plugin[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plugins))
}

export function togglePlugin(key: string, plugins: Plugin[]): Plugin[] {
  return plugins.map(p => (p.key === key ? { ...p, active: !p.active } : p))
}

export function resetPlugins(): Plugin[] {
  savePlugins(DEFAULT_PLUGINS)
  return DEFAULT_PLUGINS
}
