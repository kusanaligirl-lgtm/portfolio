import { useEffect, useRef, type ReactNode } from 'react'
import './scroll-scrub.css'

type ScrollScrubProps = {
  videoSrc: string
  mobileSrc?: string
  poster?: string
  duration: number
  children: ReactNode
}

export function ScrollScrub({ videoSrc, mobileSrc, poster, duration, children }: ScrollScrubProps) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const blobUrlRef = useRef('')
  const rafRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const video = videoRef.current
    if (!video) return
    const el: HTMLVideoElement = video
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.preload = 'metadata'
      return
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const src = isMobile && mobileSrc ? mobileSrc : videoSrc
    let cancelled = false

    async function loadClip() {
      try {
        const res = await fetch(src)
        if (!res.ok || cancelled) return
        const blob = await res.blob()
        if (cancelled) return
        const url = URL.createObjectURL(blob)
        blobUrlRef.current = url
        el.src = url
        el.load()
        el.pause()
      } catch {
        /* keep poster fallback */
      }
    }

    let targetTime = 0
    let currentTime = 0
    let isVisible = true

    function onScroll() {
      if (cancelled) return
      const scrollY = window.scrollY
      const aboutEl = document.getElementById('about')
      const limitY = aboutEl ? aboutEl.offsetTop + aboutEl.offsetHeight : window.innerHeight * 2

      // 1. Calculate target video timestamp strictly from scroll progress
      const maxScroll = Math.max(1, limitY - window.innerHeight * 0.35)
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      targetTime = progress * (el.duration || duration)

      // 2. Smoothly fade out and cull video stage when scrolling past About into Projects
      if (stageRef.current) {
        const fadeStart = limitY - window.innerHeight * 0.7
        const fadeEnd = limitY + window.innerHeight * 0.1
        if (scrollY <= fadeStart) {
          stageRef.current.style.opacity = '1'
          stageRef.current.style.visibility = 'visible'
          isVisible = true
        } else if (scrollY >= fadeEnd) {
          stageRef.current.style.opacity = '0'
          stageRef.current.style.visibility = 'hidden'
          isVisible = false
        } else {
          const op = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)
          stageRef.current.style.opacity = String(Math.max(0, Math.min(1, op)))
          stageRef.current.style.visibility = 'visible'
          isVisible = true
        }
      }
    }

    // High-performance 60fps LERP loop with automatic viewport culling
    function renderLoop() {
      if (cancelled) return

      if (isVisible && el.duration && !el.seeking) {
        const diff = targetTime - currentTime
        if (Math.abs(diff) > 0.004) {
          currentTime += diff * 0.14
          if (typeof (el as any).fastSeek === 'function') {
            try {
              (el as any).fastSeek(currentTime)
            } catch {
              el.currentTime = currentTime
            }
          } else {
            el.currentTime = currentTime
          }
        }
      }

      rafRef.current = requestAnimationFrame(renderLoop)
    }

    function prime() {
      if (el.readyState < 2) el.load()
      el.pause()
    }

    loadClip()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    document.addEventListener('pointerdown', prime, { once: true, passive: true })
    document.addEventListener('touchstart', prime, { once: true, passive: true })
    onScroll()
    rafRef.current = requestAnimationFrame(renderLoop)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('pointerdown', prime)
      document.removeEventListener('touchstart', prime)
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current)
    }
  }, [videoSrc, mobileSrc, duration])

  return (
    <div className="scrub">
      <div ref={stageRef} className="scrub-stage" aria-hidden="true">
        <video
          ref={videoRef}
          className="scrub-video"
          muted
          playsInline
          preload="none"
          poster={poster}
          tabIndex={-1}
        />
        <div className="scrub-vignette" />
      </div>
      <div className="scrub-content">{children}</div>
    </div>
  )
}