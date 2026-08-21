import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  adminData,
  adminLogin,
  adminLogout,
} from '~/server/admin'
import type { GuestbookEntry, ContactMessage } from '~/server/store'

type AdminData = {
  entries: GuestbookEntry[]
  contacts: ContactMessage[]
  visits: number
}

export const Route = createFileRoute('/admin')({
  component: AdminRoute,
})

function AdminRoute() {
  const [data, setData] = useState<AdminData | null>(null)
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let live = true
    adminData().then((d) => {
      if (!live) return
      setData(d)
      setChecked(true)
    })
    return () => {
      live = false
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await adminLogin({ data: { password } })
    if (res.ok) {
      const d = await adminData()
      setData(d)
      setError('')
    } else {
      setError('Password salah.')
    }
  }

  async function logout() {
    await adminLogout()
    setData(null)
  }

  if (!checked) return <div className="admin-shell">memuat…</div>

  if (!data) {
    return (
      <div className="admin-shell">
        <h1 className="admin-title">Bench Log · admin</h1>
        <form className="admin-login" onSubmit={submit}>
          <label htmlFor="pw">password</label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error ? <p className="admin-error">{error}</p> : null}
          <button type="submit">masuk</button>
        </form>
        <p className="admin-hint">
          pesan masuk dari formulir kontak &amp; guestbook berkumpul di sini.
        </p>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <div className="admin-top">
        <h1 className="admin-title">Bench Log · admin</h1>
        <button type="button" className="admin-out" onClick={logout}>
          keluar
        </button>
      </div>
      <p className="admin-stats">
        kunjungan: <strong>{data.visits}</strong> · guestbook:{' '}
        <strong>{data.entries.length}</strong> · pesan kontak:{' '}
        <strong>{data.contacts.length}</strong>
      </p>
      <h2 className="admin-sub">guestbook</h2>
      <ul className="admin-list">
        {data.entries.map((e) => (
          <li key={e.id} className="admin-item">
            <span className="admin-item-head">
              <strong>{e.name}</strong> <time>{e.date.slice(0, 10)}</time>
            </span>
            <span className="admin-item-body">{e.message}</span>
          </li>
        ))}
      </ul>
      <h2 className="admin-sub">pesan kontak</h2>
      <ul className="admin-list">
        {data.contacts.map((c) => (
          <li key={c.id} className="admin-item">
            <span className="admin-item-head">
              <strong>{c.name}</strong> · {c.email}{' '}
              <time>{c.date.slice(0, 10)}</time>
            </span>
            <span className="admin-item-body">{c.message}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}