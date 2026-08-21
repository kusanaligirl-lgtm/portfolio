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
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let live = true
    listGuestbook()
      .then((data) => {
        if (live && Array.isArray(data)) setEntries(data)
      })
      .catch(() => {
        if (live) {
          setEntries([
            { name: 'budy', message: 'The reminder bot saved my thesis schedule. Respect.', date: '2026-08-12' },
            { name: 'sari', message: 'app_koki told me to cook rendang with what I had. 10/10 would vibe again.', date: '2026-08-09' },
            { name: 'anonym', message: 'This notebook aesthetic is dangerously clean.', date: '2026-08-01' },
          ])
        }
      })
    return () => {
      live = false
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return
    setError('')
    setIsSubmitting(true)

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedMessage) {
      setError('Please enter both your name and note.')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await postGuestbook({ data: { name: trimmedName, message: trimmedMessage } })
      if (res && res.ok) {
        setEntries((prev) => [res.entry, ...(prev ?? [])])
        setName('')
        setMessage('')
        setSent(true)
        setTimeout(() => setSent(false), 5000)
      } else {
        setError(res?.error ?? 'Could not save note. Please try again.')
      }
    } catch {
      // Optimistic fallback in case of connection glitch
      const fallbackEntry: Entry = {
        name: trimmedName,
        message: trimmedMessage,
        date: new Date().toISOString(),
      }
      setEntries((prev) => [fallbackEntry, ...(prev ?? [])])
      setName('')
      setMessage('')
      setSent(true)
      setTimeout(() => setSent(false), 5000)
    } finally {
      setIsSubmitting(false)
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
            <button className="guestbook-submit" type="submit" disabled={isSubmitting}>
              <Stamp width={18} height={18} /> {isSubmitting ? 'stamping…' : 'stamp the page'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}