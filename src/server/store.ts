import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'node:fs'
import { join } from 'node:path'

export type GuestbookEntry = {
  id: string
  name: string
  message: string
  date: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  date: string
}

export type RepoSnapshot = {
  repos: unknown[]
  fetchedAt: number
}

export type Store = {
  entries: GuestbookEntry[]
  contacts: ContactMessage[]
  visits: number
  repos: RepoSnapshot | null
}

const DATA_DIR = join(process.cwd(), '.data')
const FILE = join(DATA_DIR, 'store.json')

const seedEntries: GuestbookEntry[] = [
  { id: 'seed-1', name: 'budy', message: 'The reminder bot saved my thesis schedule. Respect.', date: '2026-08-12' },
  { id: 'seed-2', name: 'sari', message: 'app_koki told me to cook rendang with what I had. 10/10 would vibe again.', date: '2026-08-09' },
  { id: 'seed-3', name: 'anonym', message: 'This notebook aesthetic is dangerously clean.', date: '2026-08-01' },
]

const empty = (): Store => ({ entries: seedEntries, contacts: [], visits: 0, repos: null })

export function readStore(): Store {
  try {
    if (!existsSync(FILE)) return empty()
    return JSON.parse(readFileSync(FILE, 'utf8')) as Store
  } catch {
    return empty()
  }
}

export function writeStore(store: Store): void {
  mkdirSync(DATA_DIR, { recursive: true })
  const tmp = `${FILE}.tmp`
  writeFileSync(tmp, JSON.stringify(store, null, 2), 'utf8')
  renameSync(tmp, FILE)
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}