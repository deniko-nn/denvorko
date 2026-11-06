import { useEffect, useRef, useState } from 'react'

type RingSpec = {
  text: string
  /** радиус в долях от ширины блока */
  radius: number
  /** размер шрифта в долях от ширины блока */
  size: number
  color: string
  /** секунд на полный оборот */
  duration: number
  reverse?: boolean
}

const letterSpacing = 0.14 // в долях от размера шрифта

/** Ширины символов в пикселях: считаем на canvas, чтобы разложить текст по окружности без наложений. */
function measure(chars: string[], px: number) {
  const ctx = document.createElement('canvas').getContext('2d')
  if (ctx) ctx.font = `600 ${px}px Jura, "Nunito Sans", sans-serif`
  return chars.map((c) => (ctx ? ctx.measureText(c).width : px * 0.62) + px * letterSpacing)
}

function Ring({ S, spec }: { S: number; spec: RingSpec }) {
  const R = S * spec.radius
  const base = S * spec.size
  const unit = Array.from(spec.text.toUpperCase() + ' ')
  const w0 = measure(unit, base)
  const U = w0.reduce((a, b) => a + b, 0)
  const C = 2 * Math.PI * R
  // сколько раз повторить фразу, и во сколько раз чуть уменьшить или увеличить шрифт, чтобы замкнуть круг ровно
  const reps = Math.max(1, Math.round(C / U))
  const k = C / (reps * U)
  const chars: { c: string; deg: number }[] = []
  let at = 0
  for (let r = 0; r < reps; r++) {
    unit.forEach((c, i) => {
      const w = w0[i] * k
      chars.push({ c, deg: ((at + w / 2) / R) * (180 / Math.PI) })
      at += w
    })
  }
  return (
    <div className="textring__ring"
      style={{ color: spec.color, fontSize: base * k, animationDuration: `${spec.duration}s`, animationDirection: spec.reverse ? 'reverse' : 'normal' }}>
      {chars.map((ch, i) => (
        <span className="textring__ch" key={i} style={{ transform: `rotate(${ch.deg.toFixed(3)}deg)` }}>
          <span className="textring__g" style={{ top: -R, letterSpacing: `${letterSpacing}em` }}>{ch.c}</span>
        </span>
      ))}
    </div>
  )
}

/**
 * Кольца из бегущего текста. Каждая буква ставится на окружность поворотом, а кольцо целиком вращается CSS:
 * так рисуется одинаково в Chrome, Safari и Firefox (в отличие от текста по SVG-пути со сдвигом).
 * Кольца концентрические и не пересекаются. Размеры считаются от ширины блока.
 */
export function TextRing({ rings }: { rings: RingSpec[] }) {
  const box = useRef<HTMLDivElement>(null)
  const [S, setS] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => setS(el.clientWidth))
    ro.observe(el)
    setS(el.clientWidth)
    const fonts = document.fonts
    if (fonts?.ready) fonts.ready.then(() => setReady(true))
    else setReady(true)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className="textring" aria-hidden="true">
      {S > 0 && ready && rings.map((r, i) => <Ring key={`${i}-${S}`} S={S} spec={r} />)}
    </div>
  )
}
