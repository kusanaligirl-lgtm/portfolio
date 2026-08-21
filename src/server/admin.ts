import { createServerFn } from '@tanstack/react-start'
import { createHash } from 'node:crypto'
import { getCookie, setCookie, deleteCookie } from '@tanstack/react-start/server'
import { readStore } from './store'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'kusana2026'
const COOKIE = 'kusana_admin'
const COOKIE_HASH = createHash('sha256').update(ADMIN_TOKEN).digest('hex')

function isAuthed(): boolean {
  try {
    return getCookie(COOKIE) === COOKIE_HASH
  } catch {
    return false
  }
}

export const adminLogin = createServerFn({ method: 'POST' })
  .validator((data: unknown) => ({
    password: String((data as Record<string, unknown>)?.password ?? ''),
  }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_TOKEN) return { ok: false as const }
    setCookie(COOKIE, COOKIE_HASH, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return { ok: true as const }
  })

export const adminLogout = createServerFn({ method: 'POST' }).handler(async () => {
  deleteCookie(COOKIE, { path: '/' })
  return { ok: true as const }
})

export const adminData = createServerFn({ method: 'GET' }).handler(async () => {
  if (!isAuthed()) return null
  const store = readStore()
  return {
    entries: store.entries.slice().reverse(),
    contacts: store.contacts.slice().reverse(),
    visits: store.visits,
  }
})