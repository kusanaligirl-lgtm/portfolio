import { useEffect, useState } from 'react'
import { GITHUB_USER, GITHUB_URL, EMAIL_ADDRESS } from '~/lib/data'
import { Github, Mail } from '~/lib/icons'
import { bumpVisits, getVisits } from '~/server/visits'

export function Footer() {
  const year = new Date().getFullYear()
  const [visits, setVisits] = useState<number | null>(null)

  useEffect(() => {
    let live = true
    if (typeof window !== 'undefined') {
      const sessionKey = 'has_recorded_visit'
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, '1')
        bumpVisits().then((n) => {
          if (live) setVisits(n)
        }).catch(() => {})
      } else {
        getVisits().then((n) => {
          if (live) setVisits(n)
        }).catch(() => {})
      }
    }
    return () => {
      live = false
    }
  }, [])
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p className="footer-sign">ag — lab notebook №{year}</p>
          <p className="footer-motto">built by vibe, checked by coffee.</p>
        </div>
        <div className="footer-links">
          <a className="footer-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Github width={18} height={18} /> @{GITHUB_USER}
          </a>
          <a className="footer-link" href={`mailto:${EMAIL_ADDRESS}`}>
            <Mail width={18} height={18} /> {EMAIL_ADDRESS}
          </a>
        </div>
      </div>
      <p className="footer-print">
        set in space grotesk · typeset in forest ink · no trackers, only ink
        {visits !== null ? ` · ${visits} visits recorded` : ''}
      </p>
    </footer>
  )
}