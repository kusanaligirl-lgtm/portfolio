const STACKS = [
  'JavaScript',
  'TypeScript',
  'React',
  'TailwindCSS',
  'Python',
  'Node.js',
  'Next.js',
  'Flask',
  'GSAP',
  'Docker',
  'SQL',
  'REST APIs',
  'YOLO AI',
  'Figma',
  'Git',
  'Vibe Coding',
]

export function TechMarquee() {
  return (
    <div className="tech-marquee-wrapper" aria-hidden="true">
      <div className="tech-marquee-content">
        {STACKS.concat(STACKS).concat(STACKS).map((tech, i) => (
          <span key={`${tech}-${i}`} className="tech-marquee-item">
            <span className="tech-marquee-dot" />
            <span className="tech-marquee-text">{tech}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
