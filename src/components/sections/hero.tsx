import './sections.css'
import { ArrowDown, Mail } from '~/lib/icons'
import { AUTHOR_NAME, AUTHOR_ROLE, AUTHOR_TAGLINE } from '~/lib/data'
import { TechMarquee } from '~/components/interactive/tech-marquee'
import { FloatingToolsOverlay } from '~/components/ui/floating-icons'

export function Hero() {
  const [firstName, ...lastName] = AUTHOR_NAME.split(' ')
  const restName = lastName.join(' ')

  return (
    <section className="chapter chapter-hero" id="top">
      <FloatingToolsOverlay />
      
      <div className="hero-content-wrap">
        <p className="hero-kicker" data-reveal>
          <span className="hero-kicker-mark" aria-hidden="true" />
          {AUTHOR_ROLE}
        </p>
        <h1 className="hero-title" data-reveal data-reveal-delay="0.08">
          {firstName} <span className="hero-title-thin">{restName}</span>
          <span className="hero-title-sub">
            <span className="hero-title-stamp">Portfolio</span>
            <span className="hero-title-user">Digital Lab</span>
          </span>
        </h1>
        <p className="hero-lede" data-reveal data-reveal-delay="0.16">
          {AUTHOR_TAGLINE}
        </p>
        <div className="hero-cta-row" data-reveal data-reveal-delay="0.24">
          <a className="hero-cta-primary" href="#projects">
            View Projects <ArrowDown width={18} height={18} />
          </a>
          <a className="hero-cta-ghost" href="#contact">
            <Mail width={18} height={18} /> Contact Me
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-hint-line" />
        <span className="hero-scroll-hint-label">scroll to explore</span>
      </div>

      <TechMarquee />
    </section>
  )
}