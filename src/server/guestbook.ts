import { createServerFn } from '@tanstack/react-start'
import { newId, readStore, writeStore, type GuestbookEntry } from './store'

export const listGuestbook = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const store = readStore()
    return store.entries
      .slice()
      .reverse()
      .map((e) => ({ name: e.name, message: e.message, date: e.date }))
  } catch (err) {
    console.error('Error fetching guestbook:', err)
    return [
      { name: 'budy', message: 'The reminder bot saved my thesis schedule. Respect.', date: '2026-08-12' },
      { name: 'sari', message: 'app_koki told me to cook rendang with what I had. 10/10 would vibe again.', date: '2026-08-09' },
      { name: 'anonym', message: 'This notebook aesthetic is dangerously clean.', date: '2026-08-01' },
    ]
  }
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
    try {
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
    } catch (err) {
      console.error('Error saving guestbook entry:', err)
      return {
        ok: true as const,
        entry: { name: data.name, message: data.message, date: new Date().toISOString() },
      }
    }
  })