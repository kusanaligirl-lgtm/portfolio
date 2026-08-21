import { createServerFn } from '@tanstack/react-start'
import { newId, readStore, writeStore, type ContactMessage } from './store'

export const postContact = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    const d = (data ?? {}) as Record<string, unknown>
    return {
      name: String(d.name ?? '').trim().slice(0, 60),
      email: String(d.email ?? '').trim().slice(0, 120),
      message: String(d.message ?? '').trim().slice(0, 800),
    }
  })
  .handler(async ({ data }) => {
    try {
      if (!data.name || !data.email || !data.message) {
        return { ok: false as const, error: 'All fields are required.' }
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return { ok: false as const, error: 'Please enter a valid email address.' }
      }
      const store = readStore()
      const msg: ContactMessage = {
        id: newId(),
        name: data.name,
        email: data.email,
        message: data.message,
        date: new Date().toISOString(),
      }
      store.contacts.push(msg)
      writeStore(store)
      return { ok: true as const }
    } catch (err) {
      console.error('Error saving contact message:', err)
      return { ok: true as const }
    }
  })