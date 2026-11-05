import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../animations/gsap'

/**
 * Глитч-полоса: мозаика цветных блоков пролетает через экран слева направо
 * (смена страниц, открытие меню). Рисуется на canvas, события не перехватывает.
 */
let trigger: ((direction?: 1 | -1) => void) | null = null
export const playGlitchWipe = (direction: 1 | -1 = 1) => trigger?.(direction)

const PALETTE = ['#ffe11a', '#ffd400', '#ff9d2e', '#ff5a4d', '#c43a8f', '#6a3fb8', '#2a3a9e', '#0b1030']
const DURATION = 1000

type Row = { y: number; h: number; segs: { x: number; w: number; jitter: number; shade: number }[] }

export function GlitchWipe() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let raf = 0
    let rows: Row[] = []

    const build = (w: number, h: number) => {
      rows = []
      let y = 0
      while (y < h) {
        const rh = Math.round(14 + Math.random() * 56)
        const segs: Row['segs'] = []
        let x = 0
        while (x < w * 1.2) {
          const sw = Math.round(36 + Math.random() * 190)
          segs.push({ x, w: sw, jitter: Math.random() * 0.22, shade: Math.random() })
          x += sw
        }
        rows.push({ y, h: rh, segs })
        y += rh
      }
    }

    const play = (direction: 1 | -1 = 1) => {
      if (prefersReducedMotion()) return
      cancelAnimationFrame(raf)
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build(w, h)
      const trail = Math.max(w * 0.55, 420)
      const start = performance.now()

      const frame = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1)
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        const front = ease * (w + trail * 1.3) - trail * 0.15
        ctx.clearRect(0, 0, w, h)
        for (const row of rows) {
          for (const s of row.segs) {
            const x = direction === 1 ? s.x : w - s.x - s.w
            const pos = direction === 1 ? x : w - x
            // расстояние от фронта: 0 у самого фронта, 1 в конце хвоста
            const d = (front - pos - s.jitter * trail) / trail
            if (d < 0 || d > 1) continue
            const q = Math.floor(d * 8 + s.shade * 1.4)
            const color = PALETTE[Math.min(q, PALETTE.length - 1)]
            ctx.globalAlpha = Math.min(1, (1 - d) * 1.6) * (0.55 + s.shade * 0.45)
            ctx.fillStyle = color
            ctx.fillRect(x, row.y, s.w, row.h - 1)
          }
        }
        ctx.globalAlpha = 1
        if (t < 1) raf = requestAnimationFrame(frame)
        else ctx.clearRect(0, 0, w, h)
      }
      raf = requestAnimationFrame(frame)
    }

    trigger = play
    return () => {
      cancelAnimationFrame(raf)
      if (trigger === play) trigger = null
    }
  }, [])

  return <canvas ref={ref} className="glitch-wipe" aria-hidden="true" />
}
