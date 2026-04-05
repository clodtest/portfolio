'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function MouseGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const targetOpacity = useRef(0)
  const currentOpacity = useRef(0)
  const hue = useRef(165) // Start at teal
  const inactiveTimer = useRef<ReturnType<typeof setTimeout>>()
  const rafId = useRef<number>()

  const createRipple = useCallback((x: number, y: number) => {
    const el = document.createElement('div')
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple-expand 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      background: radial-gradient(circle, rgba(0,212,184,0.35) 0%, rgba(0,212,184,0.08) 50%, transparent 70%);
    `
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 700)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      targetOpacity.current = 1

      clearTimeout(inactiveTimer.current)
      inactiveTimer.current = setTimeout(() => {
        targetOpacity.current = 0
      }, 2000)
    }

    const onClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('click', onClick)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lerp opacity
      currentOpacity.current +=
        (targetOpacity.current - currentOpacity.current) * 0.06

      if (currentOpacity.current > 0.005) {
        hue.current = (hue.current + 0.25) % 360
        const h = hue.current
        const alpha = currentOpacity.current * 0.18

        const grad = ctx.createRadialGradient(
          mouse.current.x,
          mouse.current.y,
          0,
          mouse.current.x,
          mouse.current.y,
          420
        )
        grad.addColorStop(0, `hsla(${h}, 75%, 62%, ${alpha})`)
        grad.addColorStop(0.35, `hsla(${(h + 50) % 360}, 70%, 52%, ${alpha * 0.55})`)
        grad.addColorStop(0.7, `hsla(${(h + 100) % 360}, 65%, 42%, ${alpha * 0.2})`)
        grad.addColorStop(1, 'transparent')

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      rafId.current = requestAnimationFrame(draw)
    }
    rafId.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      ro.disconnect()
      cancelAnimationFrame(rafId.current!)
      clearTimeout(inactiveTimer.current)
    }
  }, [createRipple])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
