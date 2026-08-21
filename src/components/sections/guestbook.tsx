import './sections.css'
import { useEffect, useState } from 'react'
import { Pen, Stamp } from '~/lib/icons'
import { listGuestbook, postGuestbook } from '~/server/guestbook'

type Entry = { name: string; message: string; date: string }

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let live = true
    listGuestbook().then((data) => {
      if (live) setEntries(data)
    })
    return () => {
      live = false
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await postGuestbook({ data: { name, message } })
    if (res.ok) {
      setEntries((prev) => [res.entry, ...(prev ?? [])])
      setName('')
      setMessage('')
      setSent(true)
    } else {
      setError(res.error)
    }
  }

  return (
    <section className="chapter chapter-guestbook" id="guestbook">
      <div className="chapter-inner">
        <p className="chapter-tag">
          <Pen width={16} height={16} /> chapter 04 — margin notes
        </p>
        <h2 className="chapter-heading">
          Sign the <span className="chapter-heading-accent">guestbook</span>
        </h2>
        <div className="guestbook-split">
          <div className="guestbook-entries" data-reveal>
            <p className="guestbook-count">
              {entries ? `${entries.length} entries on this page` : 'reading entries…'}
            </p>
            <ul className="guestbook-list">
              {(entries ?? []).map((e, i) => (
                <li key={`${e.name}-${i}`} className="guestbook-entry">
                  <div className="guestbook-entry-head">
                    <span className="guestbook-entry-name">{e.name}</span>
                    <span className="guestbook-entry-date">{e.date.slice(0, 10)}</span>
                  </div>
                  <p className="guestbook-entry-text">{e.message}</p>
                </li>
              ))}
            </ul>
          </div>
          <form className="guestbook-form" onSubmit={submit} data-reveal data-reveal-delay="0.12">
            <label className="guestbook-field">
              <span className="guestbook-label">your name</span>
              <input
                className="guestbook-input"
                name="name"
                required
                maxLength={40}
                placeholder="marginalia enthusiast"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="guestbook-field">
              <span className="guestbook-label">your note</span>
              <textarea
                className="guestbook-input"
                name="message"
                required
                maxLength={400}
                rows={4}
                placeholder="leave a note on this page…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            {error ? <p className="guestbook-error">{error}</p> : null}
            {sent ? <p className="guestbook-sent">stamped — thank you! your note is on the page.</p> : null}
            <button className="guestbook-submit" type="submit">
              <Stamp width={18} height={18} /> stamp the page
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}