import { useEffect, useRef, useState, type HTMLAttributes } from 'react'
import { ArrowRight, External, Github } from '~/lib/icons'
import type { Project } from '~/lib/data'
import type { LiveRepo } from '~/server/github'

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  projects: Project[]
  repos?: Record<string, LiveRepo>
  autoRotateSpeed?: number
}

export function CircularGallery({
  projects,
  repos = {},
  autoRotateSpeed = 0.08,
  className = '',
  ...props
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [radius, setRadius] = useState(480)
  const [cardWidth, setCardWidth] = useState(320)

  const dragStartX = useRef(0)
  const startRotation = useRef(0)
  const velocity = useRef(0)
  const lastX = useRef(0)
  const lastTime = useRef(0)
  const rafId = useRef<number | null>(null)

  // Dynamic radius & card sizing for responsive screens
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth
      if (w < 640) {
        setRadius(230)
        setCardWidth(240)
      } else if (w < 1024) {
        setRadius(360)
        setCardWidth(280)
      } else {
        setRadius(480)
        setCardWidth(320)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Viewport intersection observer to avoid unnecessary RAF loop when off-screen
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry?.isIntersecting ?? false)
      },
      { rootMargin: '100px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-rotate and momentum drag physics strictly when in view
  useEffect(() => {
    if (!isInView) return
    let currentRotation = rotation

    const loop = () => {
      if (!isDragging) {
        if (Math.abs(velocity.current) > 0.005) {
          currentRotation += velocity.current
          velocity.current *= 0.94 // friction
          setRotation(currentRotation)
        } else if (!isHovered) {
          currentRotation += autoRotateSpeed
          setRotation(currentRotation)
        }
      }
      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isInView, isDragging, isHovered, autoRotateSpeed])

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true)
    dragStartX.current = clientX
    lastX.current = clientX
    lastTime.current = performance.now()
    startRotation.current = rotation
    velocity.current = 0
  }

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return
    const now = performance.now()
    const dt = Math.max(1, now - lastTime.current)
    const dx = clientX - lastX.current

    velocity.current = (dx / dt) * 4.5
    lastX.current = clientX
    lastTime.current = now

    const delta = (clientX - dragStartX.current) * 0.35
    setRotation(startRotation.current + delta)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const anglePerItem = 360 / Math.max(1, projects.length)

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="3D Interactive Circular Gallery"
      className={`circular-gallery-root ${className} ${isDragging ? 'is-dragging' : ''}`}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseMove={(e) => handlePointerMove(e.clientX)}
      onMouseUp={handlePointerUp}
      onMouseLeave={() => {
        handlePointerUp()
        setIsHovered(false)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={(e) => e.touches[0] && handlePointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => e.touches[0] && handlePointerMove(e.touches[0].clientX)}
      onTouchEnd={handlePointerUp}
      {...props}
    >
      {/* 3D Stage */}
      <div className="circular-gallery-stage">
        <div
          className="circular-gallery-cylinder"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {projects.map((item, i) => {
            const itemAngle = i * anglePerItem
            const totalRotation = rotation % 360
            const relativeAngle = (itemAngle + totalRotation + 360) % 360
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)
            const isFront = normalizedAngle < 60
            const opacity = Math.max(0.25, 1 - (normalizedAngle / 180) * 0.95)
            const repo = repos[item.slug]

            return (
              <div
                key={item.slug}
                className={`circular-gallery-item ${isFront ? 'is-front' : 'is-back'}`}
                style={{
                  width: `${cardWidth}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  marginLeft: `-${cardWidth / 2}px`,
                  opacity,
                }}
              >
                <div className="gallery-card-inner">
                  {/* Card Mac/Terminal Header */}
                  <div className="gallery-card-header">
                    <span className="gallery-card-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-amber" />
                      <span className="dot dot-green" />
                    </span>
                    <span className="gallery-card-slug">~/{item.slug}</span>
                    {item.featured && (
                      <span className="gallery-card-badge">Featured</span>
                    )}
                  </div>

                  {/* Visual Preview / Plate */}
                  <div className="gallery-card-plate">
                    <img
                      src={item.plate}
                      alt={item.name}
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="gallery-card-gradient" />
                  </div>

                  {/* Card Body */}
                  <div className="gallery-card-body">
                    <div className="gallery-card-title-row">
                      <h3 className="gallery-card-name">{item.name}</h3>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="gallery-card-link-icon"
                        title="View on GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <External width={16} height={16} />
                      </a>
                    </div>
                    <p className="gallery-card-one">{item.oneLine}</p>
                    <p className="gallery-card-desc">{item.description}</p>

                    {/* Tech Tags */}
                    <div className="gallery-card-tags">
                      {item.tags.slice(0, 4).map((t) => (
                        <span key={t} className="gallery-card-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer Action */}
                    <div className="gallery-card-footer">
                      {repo ? (
                        <span className="gallery-card-meta">
                          {repo.language ?? 'Code'} · {repo.stars}★
                        </span>
                      ) : (
                        <span className="gallery-card-meta">Production Ready</span>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="gallery-card-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github width={14} height={14} /> Repository <ArrowRight width={12} height={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Drag Hint & Navigation Controls */}
      <div className="circular-gallery-controls">
        <button
          type="button"
          className="gallery-ctrl-btn"
          onClick={() => setRotation((r) => r + anglePerItem)}
          aria-label="Previous project"
        >
          ← Prev
        </button>
        <span className="gallery-drag-hint">
          <span className="gallery-drag-dot" /> Drag or swipe to spin cylinder
        </span>
        <button
          type="button"
          className="gallery-ctrl-btn"
          onClick={() => setRotation((r) => r - anglePerItem)}
          aria-label="Next project"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
