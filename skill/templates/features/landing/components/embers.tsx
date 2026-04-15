'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  life: number
  maxLife: number
  hue: number
}

export function Embers({
  density = 0.6,
  className = '',
}: {
  density?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect user preference — no animation
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    const width = () => canvas.clientWidth
    const height = () => canvas.clientHeight

    const spawn = (): Particle => ({
      x: Math.random() * width(),
      y: height() + 20,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.6 + 0.2),
      vx: (Math.random() - 0.5) * 0.2,
      life: 0,
      maxLife: Math.random() * 180 + 120,
      hue: 30 + Math.random() * 20,
    })

    const target = Math.round(120 * density)
    particlesRef.current = Array.from({ length: Math.round(target * 0.5) }, spawn)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      // Top-up particles
      while (particlesRef.current.length < target && Math.random() < 0.4) {
        particlesRef.current.push(spawn())
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += 1
        p.x += p.vx + Math.sin(p.life * 0.03) * 0.15
        p.y += p.vy
        p.vy -= 0.003

        const lifeRatio = p.life / p.maxLife
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.9

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 65%, ${alpha})`)
        grad.addColorStop(0.4, `hsla(${p.hue - 10}, 90%, 50%, ${alpha * 0.35})`)
        grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()

        return p.life < p.maxLife && p.y > -40
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    let isVisible = true
    let isPageVisible = !document.hidden

    const maybeRun = () => {
      cancelAnimationFrame(rafRef.current)
      if (isVisible && isPageVisible) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    maybeRun()

    // Pause when canvas is off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        maybeRun()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    // Pause when tab is hidden
    const onVisibility = () => {
      isPageVisible = !document.hidden
      maybeRun()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      resize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
