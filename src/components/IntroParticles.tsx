import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../animations/gsap'

/**
 * Вступление при первом заходе за сессию: тёмный экран и взрыв жёлтых частиц из центра,
 * затем сайт проявляется. Повторно не показывается; при «уменьшить движение» пропускается.
 * До загрузки скрипта экран закрывает html.intro-pending (см. index.html и CSS).
 */
export function IntroParticles() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLCanvasElement>(null)
  const curtain = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    let seen = false
    try { seen = sessionStorage.getItem('intro') === '1' } catch { /* без хранилища показываем */ }
    if (seen || prefersReducedMotion()) { root.classList.remove('intro-pending'); return }
    try { sessionStorage.setItem('intro', '1') } catch { /* ignore */ }
    setActive(true)
  }, [])

  useEffect(() => {
    if (!active) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    const el = curtain.current
    if (!canvas || !ctx || !el) { document.documentElement.classList.remove('intro-pending'); return }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const N = 520
    const ps = Array.from({ length: N }, () => {
      const a = Math.random() * Math.PI * 2
      const sp = 40 + Math.pow(Math.random(), 1.6) * Math.max(w, h) * 0.9
      return { a, sp, r: 0.6 + Math.random() * 1.6, delay: Math.random() * 0.25 }
    })
    const TOTAL = 1900
    const start = performance.now()
    // занавес принимает эстафету у html.intro-pending и плавно гаснет
    document.documentElement.classList.remove('intro-pending')
    el.style.opacity = '1'
    let raf = 0
    const frame = (now: number) => {
      const t = (now - start) / TOTAL
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        const k = Math.min(Math.max((t - p.delay) / 0.85, 0), 1)
        if (k <= 0) continue
        const ease = 1 - Math.pow(1 - k, 3)
        const dist = p.sp * ease
        const x = w / 2 + Math.cos(p.a) * dist
        const y = h / 2 + Math.sin(p.a) * dist * 0.62
        ctx.globalAlpha = Math.max(0, 1 - Math.max(t - 0.45, 0) * 1.7) * (0.4 + 0.6 * (1 - k))
        ctx.fillStyle = '#ffe11a'
        ctx.fillRect(x, y, p.r, p.r)
      }
      ctx.globalAlpha = 1
      el.style.opacity = String(Math.max(0, Math.min(1, 1 - (t - 0.3) / 0.55)))
      if (t < 1) raf = requestAnimationFrame(frame)
      else setActive(false)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [active])

  if (!active) return null
  return (
    <div ref={curtain} className="intro-curtain" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  )
}
