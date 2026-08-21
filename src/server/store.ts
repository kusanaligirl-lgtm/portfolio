import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

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

const seedEntries: GuestbookEntry[] = [
  { id: 'seed-1', name: 'budy', message: 'The reminder bot saved my thesis schedule. Respect.', date: '2026-08-12' },
  { id: 'seed-2', name: 'sari', message: 'app_koki told me to cook rendang with what I had. 10/10 would vibe again.', date: '2026-08-09' },
  { id: 'seed-3', name: 'anonym', message: 'This notebook aesthetic is dangerously clean.', date: '2026-08-01' },
]

const empty = (): Store => ({ entries: [...seedEntries], contacts: [], visits: 0, repos: null })

// In-memory cache for ultra-fast response & serverless safety
let memoryStore: Store = empty()

function getStoragePath(): string {
  try {
    const isServerless = Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME)
    if (isServerless) {
      return join(tmpdir(), 'portfolio-store.json')
    }
    const localDir = join(process.cwd(), '.data')
    mkdirSync(localDir, { recursive: true })
    return join(localDir, 'store.json')
  } catch {
    return join(tmpdir(), 'portfolio-store.json')
  }
}

export function readStore(): Store {
  try {
    const file = getStoragePath()
    if (existsSync(file)) {
      const data = JSON.parse(readFileSync(file, 'utf8')) as Store
      if (data && Array.isArray(data.entries)) {
        memoryStore = data
        return data
      }
    }
  } catch (err) {
    console.warn('Could not read from file storage, using memory store:', err)
  }
  return memoryStore
}

export function writeStore(store: Store): void {
  memoryStore = store
  try {
    const file = getStoragePath()
    const tmp = `${file}.tmp`
    writeFileSync(tmp, JSON.stringify(store, null, 2), 'utf8')
    renameSync(tmp, file)
  } catch (err) {
    console.warn('File storage write skipped, stored in runtime memory:', err)
  }
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}