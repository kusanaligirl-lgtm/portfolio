import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Cloud, Flask, Code, Database, Sparkles, Activity, CheckCircle2 } from '~/lib/icons'
import {
  IconReact,
  IconTypeScript,
  IconDocker,
  IconTailwind,
  IconGitHub,
  IconNodeJS,
  IconOpenAI,
} from '~/components/ui/floating-icons'

// Additional SVG Icons for the Matrix
const IconPyTorch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.87 2.15a1 1 0 0 0-1.74 0L8.7 6.4a8 8 0 1 0 7.6 0l-2.43-4.25zm.63 7.85a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
  </svg>
)

const IconFastAPI = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5l-3.5-4.5H13l-.5-4.5 4 4.5h-3.5z" />
  </svg>
)

const IconYOLO = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
  </svg>
)

const IconGSAP = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3.3l6.5 3.25v6.9L12 18.7l-6.5-3.25v-6.9L12 5.3z" />
  </svg>
)

const IconTanStack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 18V6l8 12 8-12v12" />
  </svg>
)

const IconLinux = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C9.24 2 7 4.24 7 7v4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2v1c0 2.21 1.79 4 4 4h2c2.21 0 4-1.79 4-4v-1c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2V7c0-2.76-2.24-5-5-5zm-2 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
)

const IconVite = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m20.5 3.5-8.8 17.7a1 1 0 0 1-1.8 0L3.5 9.5a1 1 0 0 1 .4-1.3l8-4.5a1 1 0 0 1 1 0l7.2 4a1 1 0 0 1 .4-4.2z" />
  </svg>
)

const IconSQL = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

// Categories for filter
type SkillCategory = 'all' | 'ai' | 'frontend' | 'backend' | 'devops'

export interface SkillItem {
  name: string
  category: 'ai' | 'frontend' | 'backend' | 'devops'
  level: string
  experience: string
  color: string
  desc: string
  imageSrc?: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  highlight?: boolean
}

export const ALL_SKILLS: SkillItem[] = [
  // AI & ML
  { name: 'DeepSeek AI', category: 'ai', level: 'Expert', experience: 'LLM Prompting & API Integration', color: '#4D6BFE', desc: 'V3 / R1 reasoning models, context pipelines', imageSrc: '/assets/icons/deepseek.png', highlight: true },
  { name: 'Google Antigravity', category: 'ai', level: 'Advanced', experience: 'Custom skills & autonomous agents', color: '#C8F135', desc: 'Agentic workflows, subagent coordination', imageSrc: '/assets/icons/antigravity.png', highlight: true },
  { name: 'OpenCode / Copilot', category: 'ai', level: 'Daily Driver', experience: 'Vibe coding & accelerated dev', color: '#38BDF8', desc: 'Context-driven generative coding', imageSrc: '/assets/icons/opencode.png' },
  { name: 'PyTorch & XGBoost', category: 'ai', level: 'Advanced', experience: 'Financial ML & Algo Trading', color: '#EE4C2C', desc: 'Predictive price direction & walk-forward optimization', icon: IconPyTorch },
  { name: 'YOLO Vision', category: 'ai', level: 'Intermediate', experience: 'Object Detection & Tracking', color: '#10B981', desc: 'Real-time camera detection & inference', icon: IconYOLO },

  // Frontend
  { name: 'React 19', category: 'frontend', level: 'Expert', experience: 'Modern Hooks, Server Components', color: '#61DAFB', desc: 'Component architecture, state management', icon: IconReact, highlight: true },
  { name: 'TypeScript', category: 'frontend', level: 'Advanced', experience: 'Type-safe scalable codebases', color: '#3178C6', desc: 'Strict typing, generic systems, interfaces', imageSrc: '/assets/icons/typescript.png', highlight: true },
  { name: 'Tailwind CSS v4', category: 'frontend', level: 'Expert', experience: 'Utility-first modern design systems', color: '#06B6D4', desc: 'Fluid typography, dark mode, custom palettes', icon: IconTailwind },
  { name: 'GSAP & Framer Motion', category: 'frontend', level: 'Advanced', experience: 'Physics animations & scroll scrubbing', color: '#C8F135', desc: 'Smooth spring physics, magnetic cursors, 60fps', icon: IconGSAP },
  { name: 'TanStack Router', category: 'frontend', level: 'Advanced', experience: 'Full-stack type-safe routing', color: '#FF4154', desc: 'SSR hydration, route loaders, search params', icon: IconTanStack },

  // Backend
  { name: 'Python 3.12', category: 'backend', level: 'Expert', experience: 'Async IO, Data Pipelines & APIs', color: '#FFD43B', desc: 'FastAPI, algorithmic trading engines, bot backends', imageSrc: '/assets/icons/python.png', highlight: true },
  { name: 'FastAPI & Flask', category: 'backend', level: 'Advanced', experience: 'RESTful Microservices', color: '#009688', desc: 'High-throughput endpoints, OpenAPI schema', icon: IconFastAPI },
  { name: 'Node.js', category: 'backend', level: 'Intermediate', experience: 'Serverless & SSR Runtimes', color: '#68A063', desc: 'Event loop, Nitro server, backend handlers', imageSrc: '/assets/icons/nodejs.png' },
  { name: 'SQL & SQLite', category: 'backend', level: 'Advanced', experience: 'Relational database schema & queries', color: '#336791', desc: 'ACID transactions, indexing, analytics', icon: IconSQL },

  // DevOps & Tools
  { name: 'Docker', category: 'devops', level: 'Advanced', experience: 'Containerization & deployment', color: '#2496ED', desc: 'Multi-stage builds, compose networks', imageSrc: '/assets/icons/docker.png', highlight: true },
  { name: 'Git & GitHub', category: 'devops', level: 'Expert', experience: 'Version control & CI/CD workflows', color: '#F2ECDD', desc: 'Branch strategy, actions, PR reviews', icon: IconGitHub },
  { name: 'Linux / WSL', category: 'devops', level: 'Advanced', experience: 'CLI automation & server management', color: '#FCC624', desc: 'Bash scripting, systemd, environment isolation', imageSrc: '/assets/icons/linux.png' },
  { name: 'Vite & Bundlers', category: 'devops', level: 'Advanced', experience: 'Lightning-fast HMR & optimization', color: '#646CFF', desc: 'Code splitting, asset pipeline, tree shaking', imageSrc: '/assets/icons/vite.png' },
]

// 3D Card with Mouse Spotlight Effect
function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-[rgba(200,241,53,0.18)] bg-[rgba(18,32,25,0.75)] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(200,241,53,0.45)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(200, 241, 53, 0.12), transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}

export function InteractiveSkills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all')
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(ALL_SKILLS[0]!)
  const [simulatedAiPrompt, setSimulatedAiPrompt] = useState(0)

  const aiPrompts = [
    { title: 'Algo-Trading Strategy', model: 'DeepSeek R1', snippet: '// Analyzing BTC 4H Orderflow with XGBoost\nconst signal = engine.predict({ volatility: 0.034, rsi: 28.4 })\nif (signal.confidence > 0.88) executeTrade("BUY", 0.05)' },
    { title: 'Antigravity Subagent', model: 'Google Antigravity', snippet: '// Coordinating parallel autonomous workers\nawait agy.invoke_subagent({\n  role: "Market Researcher",\n  goal: "Scrape tick-level momentum signals"\n})' },
    { title: 'Interactive Web Engine', model: 'OpenCode Copilot', snippet: '// 60fps physics-driven reactive canvas\nuseSpring(motionValue, { stiffness: 260, damping: 18 })\nvideo.currentTime = smoothProgress * duration' },
  ]

  const filteredSkills = activeCategory === 'all'
    ? ALL_SKILLS
    : ALL_SKILLS.filter((s) => s.category === activeCategory)

  return (
    <div className="interactive-skills-workbench flex flex-col gap-8 w-full mt-4">
      {/* Top Category Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5 p-1.5 rounded-full bg-[rgba(10,20,15,0.75)] border border-[rgba(200,241,53,0.2)] max-w-2xl mx-auto backdrop-blur-md">
        {[
          { id: 'all', label: 'All Disciplines', icon: Sparkles },
          { id: 'ai', label: 'AI & Machine Learning', icon: Flask },
          { id: 'frontend', label: 'Frontend & UI', icon: Terminal },
          { id: 'backend', label: 'Backend & APIs', icon: Database },
          { id: 'devops', label: 'DevOps & Tools', icon: Cloud },
        ].map((tab) => {
          const isActive = activeCategory === tab.id
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as SkillCategory)}
              className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs md:text-sm font-mono font-medium rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#16281F] font-bold shadow-md'
                  : 'text-[#C3BEB1] hover:text-[#C8F135]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-[#C8F135] rounded-full -z-10 shadow-[0_0_15px_rgba(200,241,53,0.5)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <TabIcon width={14} height={14} className={isActive ? 'text-[#16281F]' : 'text-[#8F8A7D]'} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main 2-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Left Column: Interactive Interactive Skill Matrix (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <SpotlightCard className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[rgba(200,241,53,0.14)] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C8F135] animate-ping" />
                <h3 className="font-mono text-sm font-semibold tracking-wider uppercase text-[#C8F135]">
                  Active Toolset Matrix ({filteredSkills.length})
                </h3>
              </div>
              <span className="text-xs font-mono text-[#8F8A7D]">Hover / click to inspect telemetry</span>
            </div>

            {/* Badges Grid with Tool Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name
                const SkillIcon = skill.icon
                return (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    className={`flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                      isSelected
                        ? 'border-[#C8F135] bg-[rgba(200,241,53,0.12)] shadow-[0_0_16px_rgba(200,241,53,0.2)]'
                        : 'border-[rgba(200,241,53,0.12)] bg-[rgba(10,20,15,0.5)] hover:border-[rgba(200,241,53,0.3)] hover:bg-[rgba(20,38,28,0.7)]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Branded Icon Container */}
                        <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.45)] border border-[rgba(200,241,53,0.18)] p-1 shrink-0 group-hover:scale-110 transition-transform">
                          {skill.imageSrc ? (
                            <img
                              src={skill.imageSrc}
                              alt={skill.name}
                              className="w-full h-full object-contain rounded"
                              loading="lazy"
                            />
                          ) : SkillIcon ? (
                            <SkillIcon width={16} height={16} style={{ color: skill.color }} />
                          ) : (
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                          )}
                        </div>
                        <span className="font-medium text-xs md:text-sm text-[#F2ECDD] group-hover:text-[#C8F135] transition-colors truncate">
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>

                    <div className="flex items-center justify-between w-full pt-1 border-t border-[rgba(200,241,53,0.06)]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8F8A7D]">
                        {skill.level}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </SpotlightCard>

          {/* Mini Telemetry Inspector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SpotlightCard className="!p-4 bg-[rgba(14,26,20,0.85)] border-[#C8F135]/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Selected Tool Logo Avatar */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[rgba(0,0,0,0.5)] border border-[#C8F135]/30 p-1.5 shrink-0 shadow-[0_0_12px_rgba(200,241,53,0.15)]">
                      {selectedSkill.imageSrc ? (
                        <img src={selectedSkill.imageSrc} alt={selectedSkill.name} className="w-full h-full object-contain rounded" />
                      ) : selectedSkill.icon ? (
                        <selectedSkill.icon width={22} height={22} style={{ color: selectedSkill.color }} />
                      ) : (
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedSkill.color }} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-semibold text-[#F2ECDD]">{selectedSkill.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#C8F135]/20 text-[#C8F135] border border-[#C8F135]/40 font-semibold">
                          {selectedSkill.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#C3BEB1] mt-0.5">{selectedSkill.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8F8A7D] bg-[rgba(0,0,0,0.3)] px-3 py-1.5 rounded-lg self-start sm:self-auto shrink-0">
                    <CheckCircle2 width={14} height={14} className="text-[#C8F135]" />
                    <span>{selectedSkill.experience}</span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Interactive Live Code & Engine Sandbox (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SpotlightCard className="flex flex-col h-full justify-between">
            {/* Terminal Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[rgba(200,241,53,0.14)] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="text-xs font-mono text-[#8F8A7D] ml-2">live-workstation.ts</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#C8F135]">
                  <Activity width={13} height={13} />
                  <span>142 ops/s</span>
                </div>
              </div>

              {/* Interactive Pipeline Tabs */}
              <div className="flex items-center gap-2 mb-3">
                {aiPrompts.map((p, idx) => (
                  <button
                    key={p.title}
                    onClick={() => setSimulatedAiPrompt(idx)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all cursor-pointer ${
                      simulatedAiPrompt === idx
                        ? 'bg-[#C8F135] text-[#16281F] font-bold shadow-[0_0_10px_rgba(200,241,53,0.3)]'
                        : 'bg-[rgba(200,241,53,0.08)] text-[#C3BEB1] hover:bg-[rgba(200,241,53,0.15)]'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              {/* Code Sandbox Preview */}
              <div className="p-3.5 rounded-xl bg-[rgba(6,14,10,0.95)] border border-[rgba(200,241,53,0.15)] font-mono text-xs text-[#C8F135] overflow-x-auto leading-relaxed shadow-inner">
                <pre className="text-xs text-[#E2E8F0] whitespace-pre-wrap font-mono">
                  <code>{aiPrompts[simulatedAiPrompt]?.snippet ?? ''}</code>
                </pre>
              </div>
            </div>

            {/* Live Metrics Footer */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[rgba(200,241,53,0.14)] text-center font-mono">
              <div className="p-2 rounded-lg bg-[rgba(0,0,0,0.35)]">
                <span className="text-[10px] text-[#8F8A7D] block">Inference</span>
                <span className="text-xs font-bold text-[#C8F135]">18ms latency</span>
              </div>
              <div className="p-2 rounded-lg bg-[rgba(0,0,0,0.35)]">
                <span className="text-[10px] text-[#8F8A7D] block">Type Safety</span>
                <span className="text-xs font-bold text-[#61DAFB]">100% Strict</span>
              </div>
              <div className="p-2 rounded-lg bg-[rgba(0,0,0,0.35)]">
                <span className="text-[10px] text-[#8F8A7D] block">FPS Goal</span>
                <span className="text-xs font-bold text-[#34D399]">60 FPS Locked</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  )
}
