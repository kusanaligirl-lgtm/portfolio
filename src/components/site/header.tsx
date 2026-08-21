import { navItems, GITHUB_URL } from '~/lib/data'
import { Github } from '~/lib/icons'

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="header-wordmark" href="#top">
          <span className="header-wordmark-dot" aria-hidden="true" />
          agusirawan.dev
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} className="header-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-gh" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github width={20} height={20} />
        </a>
      </div>
    </header>
  )
}