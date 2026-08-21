import './sections.css'
import { useState } from 'react'
import { ArrowRight, Github, Mail } from '~/lib/icons'
import { GITHUB_USER, GITHUB_URL, EMAIL_ADDRESS } from '~/lib/data'
import { postContact } from '~/server/contact'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await postContact({ data: form })
    if (res.ok) {
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } else {
      setError(res.error)
    }
  }

  return (
    <section className="chapter chapter-contact" id="contact">
      <div className="contact-card" data-reveal>
        <p className="contact-kicker">chapter 05 — the call</p>
        <h2 className="contact-title">
          Have an experiment <span className="contact-accent">worth recording?</span>
        </h2>
        <p className="contact-body">
          I&apos;m open to projects, collaborations, and tech debates — coffee first, code after.
        </p>
        <div className="contact-cta-row">
          <a className="contact-cta-main" href={`mailto:${EMAIL_ADDRESS}`}>
            <Mail width={20} height={20} /> {EMAIL_ADDRESS} <ArrowRight width={18} height={18} />
          </a>
          <a className="contact-cta-ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Github width={20} height={20} /> @{GITHUB_USER}
          </a>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="contact-form-row">
            <label className="contact-field">
              <span className="contact-label">name</span>
              <input
                className="contact-input"
                name="name"
                required
                maxLength={60}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="contact-field">
              <span className="contact-label">email</span>
              <input
                className="contact-input"
                name="email"
                type="email"
                required
                maxLength={120}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
          </div>
          <label className="contact-field">
            <span className="contact-label">message</span>
            <textarea
              className="contact-input"
              name="message"
              required
              maxLength={800}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          {error ? <p className="contact-error">{error}</p> : null}
          {sent ? <p className="contact-sent">letter received — a reply will arrive in your inbox soon.</p> : null}
          <button className="contact-submit" type="submit">
            send the letter <ArrowRight width={16} height={16} />
          </button>
        </form>
      </div>
    </section>
  )
}