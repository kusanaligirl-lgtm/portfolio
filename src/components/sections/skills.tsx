import './sections.css'
import { Terminal } from '~/lib/icons'
import { InteractiveSkills } from '~/components/interactive/interactive-skills'

export function Skills() {
  return (
    <section className="chapter chapter-skills" id="skills">
      <div className="chapter-inner">
        <p className="chapter-tag" data-reveal>
          <Terminal width={16} height={16} /> chapter 03 — the tools
        </p>
        <h2 className="chapter-heading" data-reveal data-reveal-delay="0.08">
          The <span className="chapter-heading-accent">workbench</span>
        </h2>
        <p className="chapter-subheading text-[#8F8A7D] font-mono text-sm max-w-xl mb-6" data-reveal data-reveal-delay="0.12">
          An interactive laboratory of AI agents, full-stack frameworks, machine learning models, and deployment infrastructure.
        </p>

        <InteractiveSkills />
      </div>
    </section>
  )
}