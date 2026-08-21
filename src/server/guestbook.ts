import { createServerFn } from '@tanstack/react-start'
import { newId, readStore, writeStore, type GuestbookEntry } from './store'

export const listGuestbook = createServerFn({ method: 'GET' }).handler(async () => {
  const store = readStore()
  return store.entries
    .slice()
    .reverse()
    .map((e) => ({ name: e.name, message: e.message, date: e.date }))
})

export const postGuestbook = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    const d = (data ?? {}) as Record<string, unknown>
    return {
      name: String(d.name ?? '').trim().slice(0, 40),
      message: String(d.message ?? '').trim().slice(0, 400),
    }
  })
  .handler(async ({ data }) => {
    if (!data.name || !data.message) {
      return { ok: false as const, error: 'Name and note are required.' }
    }
    const store = readStore()
    const entry: GuestbookEntry = {
      id: newId(),
      name: data.name,
      message: data.message,
      date: new Date().toISOString(),
    }
    store.entries.push(entry)
    writeStore(store)
    return {
      ok: true as const,
      entry: { name: entry.name, message: entry.message, date: entry.date },
    }
  })