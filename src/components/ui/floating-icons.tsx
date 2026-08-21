import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export interface ToolIconItem {
  id: string
  name: string
  category: 'ai' | 'lang' | 'tool'
  color: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  imageSrc?: string
  className: string
}

// Single floating tool badge with physics repulsion
const FloatingBadge = ({
  item,
  mouseX,
  mouseY,
  index,
}: {
  item: ToolIconItem
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
  index: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18 })
  const springY = useSpring(y, { stiffness: 260, damping: 18 })

  useEffect(() => {
    const handleMouseMove = () => {
      if (typeof window !== 'undefined' && window.scrollY > window.innerHeight * 1.1) return
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.hypot(mouseX.current - centerX, mouseY.current - centerY)

        const maxDistance = 140
        if (distance < maxDistance && distance > 0) {
          const angle = Math.atan2(mouseY.current - centerY, mouseX.current - centerX)
          const force = (1 - distance / maxDistance) * 55
          x.set(-Math.cos(angle) * force)
          y.set(-Math.sin(angle) * force)
        } else {
          x.set(0)
          y.set(0)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y, mouseX, mouseY])

  const IconComp = item.icon

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.1 + index * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`floating-tool-item ${item.className}`}
    >
      <motion.div
        className="floating-tool-badge group"
        animate={{
          y: [0, -10, 0, 10, 0],
          x: [0, 8, 0, -8, 0],
          rotate: [0, 4, 0, -4, 0],
        }}
        transition={{
          duration: 6 + (index % 4) * 1.5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <div className="floating-tool-icon-wrap" style={{ color: item.color }}>
          {item.imageSrc ? (
            <img
              src={item.imageSrc}
              alt={item.name}
              className="w-7 h-7 object-contain rounded-md select-none pointer-events-none"
              loading="lazy"
            />
          ) : IconComp ? (
            <IconComp width={26} height={26} />
          ) : null}
        </div>
        <span className="floating-tool-tooltip">{item.name}</span>
      </motion.div>
    </motion.div>
  )
}

// ----------------- SVG Tool Logos -----------------

export const IconDeepSeek = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 12.42 12 13 12 14.5h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .88-.36 1.68-.93 2.25z" />
  </svg>
)

export const IconAntigravity = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m12 16 4-8-8 4 4 4Z" />
  </svg>
)

export const IconOpenCode = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

export const IconPython = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.91 2c-3.1 0-2.9 1.34-2.9 1.34l.01 1.39h2.95v.42H6.04S4 4.92 4 8.07c0 3.16 1.77 3.03 1.77 3.03h1.06v-1.48s-.06-1.77 1.74-1.77h3.01s1.68.03 1.68-1.63V3.63S13.56 2 11.91 2zm-1.63 1.01c.34 0 .61.28.61.62 0 .35-.27.63-.61.63-.34 0-.62-.28-.62-.63 0-.34.28-.62.62-.62zm1.81 18.99c3.1 0 2.9-1.34 2.9-1.34l-.01-1.39h-2.95v-.42h5.93s2.04.23 2.04-2.92c0-3.16-1.77-3.03-1.77-3.03h-1.06v1.48s.06 1.77-1.74 1.77h-3.01s-1.68-.03-1.68 1.63v2.59s-.3 1.63 1.35 1.63zm1.63-1.01c-.34 0-.61-.28-.61-.62 0-.35.27-.63.61-.63.34 0 .62.28.62.63 0 .34-.28-.62-.62-.62z" />
  </svg>
)

export const IconReact = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

export const IconTypeScript = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3 3h18v18H3V3zm8.7 13.5v-6h-1.9V9.2h5.7v1.3h-1.9v6h-1.9zm3.5 0c.7.4 1.5.6 2.3.6.9 0 1.5-.4 1.5-1 0-.6-.4-.9-1.4-1.3-1.4-.5-2.2-1.2-2.2-2.3 0-1.4 1.1-2.4 2.8-2.4.9 0 1.6.2 2.2.6l-.5 1.3c-.5-.3-1.1-.5-1.7-.5-.8 0-1.3.4-1.3.9 0 .6.4.8 1.4 1.2 1.5.6 2.2 1.3 2.2 2.4 0 1.5-1.1 2.5-3 2.5-1 0-1.9-.3-2.6-.7l.4-1.3z" />
  </svg>
)

export const IconDocker = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.98 11.08h1.85v1.85h-1.85v-1.85zm-2.46 0h1.85v1.85h-1.85v-1.85zm-2.46 0h1.85v1.85H9.06v-1.85zm-2.46 0h1.85v1.85H6.6v-1.85zm4.92-2.46h1.85v1.85h-1.85V8.62zm-2.46 0h1.85v1.85H9.06V8.62zm-2.46 0h1.85v1.85H6.6V8.62zm4.92-2.46h1.85v1.85h-1.85V6.16zm-2.46 0h1.85v1.85H9.06V6.16zM22.5 12.3c-.4-.26-1.3-.37-2.2-.1-.17-.9-1-1.6-2-1.6-.3 0-.6.06-.9.18-.5-1.2-1.7-2-3-2V8h-9v3.5c-.8.4-1.4 1.2-1.4 2.2 0 1.4 1.1 2.5 2.5 2.5h14c1.1 0 2-.9 2-2 0-.7-.3-1.4-.8-1.9h.8v-.03z" />
  </svg>
)

export const IconTailwind = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
  </svg>
)

export const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

export const IconOpenAI = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7466-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.1456-2.3561l2.5476-1.4728 2.5476 1.4728v2.936l-2.5476 1.4728-2.5476-1.4728z" />
  </svg>
)

export const IconNodeJS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2l10 5.8v11.6L12 25.2 2 19.4V7.8L12 2zm0 2.3L4 8.9v9.4l8 4.6 8-4.6V8.9l-8-4.6z" />
  </svg>
)

export const IconFigma = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 2h4v4H8V2zm4 4h4a4 4 0 0 1 0 8h-4V6zm-4 4h4v4H8v-4zm0 4h4v4a4 4 0 0 1-4-4zm8 0a4 4 0 0 1-4 4v-4h4z" />
  </svg>
)

// List of all user tools positioned gracefully across the hero section
export const DEFAULT_USER_TOOLS: ToolIconItem[] = [
  { id: 'deepseek', name: 'DeepSeek AI', category: 'ai', color: '#4D6BFE', imageSrc: '/assets/icons/deepseek.png', className: 'top-[12%] left-[6%]' },
  { id: 'antigravity', name: 'Google Antigravity', category: 'ai', color: '#C8F135', imageSrc: '/assets/icons/antigravity.png', className: 'top-[14%] right-[8%]' },
  { id: 'opencode', name: 'OpenCode', category: 'ai', color: '#FFFFFF', imageSrc: '/assets/icons/opencode.png', className: 'top-[36%] left-[4%]' },
  { id: 'python', name: 'Python 3.12', category: 'lang', color: '#FFD43B', imageSrc: '/assets/icons/python.png', className: 'bottom-[24%] left-[7%]' },
  { id: 'openai', name: 'OpenAI GPT', category: 'ai', color: '#10A37F', icon: IconOpenAI, className: 'top-[38%] right-[5%]' },
  { id: 'react', name: 'React 19', category: 'lang', color: '#61DAFB', icon: IconReact, className: 'bottom-[22%] right-[8%]' },
  { id: 'typescript', name: 'TypeScript', category: 'lang', color: '#3178C6', imageSrc: '/assets/icons/typescript.png', className: 'top-[5%] left-[26%]' },
  { id: 'docker', name: 'Docker', category: 'tool', color: '#2496ED', imageSrc: '/assets/icons/docker.png', className: 'top-[6%] right-[28%]' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'lang', color: '#06B6D4', icon: IconTailwind, className: 'bottom-[8%] left-[20%]' },
  { id: 'github', name: 'GitHub', category: 'tool', color: '#F2ECDD', icon: IconGitHub, className: 'bottom-[10%] right-[22%]' },
  { id: 'nodejs', name: 'Node.js', category: 'lang', color: '#68A063', imageSrc: '/assets/icons/nodejs.png', className: 'top-[25%] left-[16%]' },
  { id: 'figma', name: 'Figma', category: 'tool', color: '#F24E1E', icon: IconFigma, className: 'top-[24%] right-[17%]' },
]

export function FloatingToolsOverlay({ tools = DEFAULT_USER_TOOLS }: { tools?: ToolIconItem[] }) {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = e.clientX
    mouseY.current = e.clientY
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="floating-tools-container"
      aria-hidden="true"
    >
      {tools.map((item, index) => (
        <FloatingBadge
          key={item.id}
          item={item}
          mouseX={mouseX}
          mouseY={mouseY}
          index={index}
        />
      ))}
    </div>
  )
}

