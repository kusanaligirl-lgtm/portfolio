import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  baseAlpha: number
  color: string
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = -1000
    let mouseY = -1000
    let rafId: number

    const colors = [
      'rgba(200, 241, 53, ', // chartreuse / green neon
      'rgba(242, 236, 221, ', // warm ivory
      'rgba(168, 85, 247, ', // violet/purple glow (like reference)
      'rgba(74, 222, 128, ', // emerald
    ]

    const particleCount = Math.min(65, Math.floor((width * height) / 18000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15
      const chosenColor = colors[Math.floor(Math.random() * colors.length)] ?? colors[0]!
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: baseAlpha,
        baseAlpha,
        color: chosenColor,
      })
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!p) continue

        p.x += p.vx
        p.y += p.vy

        // Wrap around boundaries
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Mouse interaction (repel & brighten)
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 130

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 1.5
          p.x -= (dx / dist) * force
          p.y -= (dy / dist) * force
          p.alpha = Math.min(0.9, p.baseAlpha + (1 - dist / maxDist) * 0.6)
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.alpha})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `${p.color}0.5)`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          if (!p2) continue
          const djx = p.x - p2.x
          const djy = p.y - p2.y
          const d = Math.sqrt(djx * djx + djy * djy)

          if (d < 95) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            const lineAlpha = (1 - d / 95) * 0.18
            ctx.strokeStyle = `rgba(200, 241, 53, ${lineAlpha})`
            ctx.lineWidth = 0.75
            ctx.shadowBlur = 0
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  )
}
