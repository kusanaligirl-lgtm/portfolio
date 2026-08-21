import './sections.css'
import { stats, AUTHOR_NAME } from '~/lib/data'
import { Pen, Stamp } from '~/lib/icons'

export function About() {
  return (
    <section className="chapter chapter-about" id="about">
      <div className="chapter-inner">
        <p className="chapter-tag">
          <Pen width={16} height={16} /> chapter 01 — the coder
        </p>
        <div className="about-split">
          <div className="about-portrait" data-reveal>
            <img
              src="/assets/about/portrait.jpg"
              alt={`Photo of ${AUTHOR_NAME}`}
              width={720}
              height={720}
              loading="lazy"
            />
            <span className="about-portrait-tape" aria-hidden="true" />
            <span className="about-portrait-caption">specimen 001 — me, mid-experiment</span>
          </div>
          <div className="about-copy" data-reveal data-reveal-delay="0.12">
            <h2 className="about-heading">
              Hi, I&apos;m {AUTHOR_NAME.split(' ')[0]} — <span className="about-heading-accent">the one taking notes.</span>
            </h2>
            <p className="about-body">
              An IT student who treats every side project like a lab entry: formulate a wild idea,
              build a first version that barely works, then refine it until it ships. My pages are
              full of web apps, Telegram bots, and one very opinionated recipe model.
            </p>
            <p className="about-body">
              Right now I&apos;m mixing classic frontend craft with AI-driven ideas — and documenting
              everything as I go.
            </p>
            <ul className="about-stats">
              {stats.map((s) => (
                <li key={s.label} className="about-stat">
                  <span className="about-stat-value">{s.value}</span>
                  <span className="about-stat-label">{s.label}</span>
                </li>
              ))}
            </ul>
            <div className="about-stamp" aria-hidden="true">
              <Stamp width={22} height={22} />
              <span>entry approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}