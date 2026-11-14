import { useEffect, useState, type ComponentType } from 'react'
import { useMotionOff } from '../animations/motion'

/**
 * React Bits FaultyTerminal (WebGL2): «терминал» из зелёных блоков как фон всех страниц.
 * Пробный вариант фона. Прежний фон (Topography) лежит в TopographyBackground.tsx:
 * чтобы вернуть его, в Layout.tsx замените FaultyTerminalBackground на TopographyBackground.
 */
export function FaultyTerminalBackground() {
  const [Terminal, setTerminal] = useState<ComponentType<Record<string, unknown>> | null>(null)
  const motionOff = useMotionOff()
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (nav.connection?.saveData) return
    let alive = true
    import('../animations/reactbits/FaultyTerminal').then((m) => alive && setTerminal(() => m.default as ComponentType<Record<string, unknown>>))
    return () => { alive = false }
  }, [])

  useEffect(() => {
    const calc = () => setDpr(window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <div className={`faulty-bg${Terminal && !motionOff ? ' is-ready' : ''}`} aria-hidden="true">
      {Terminal && !motionOff && (
        <Terminal
          tint="#A7EF9E"
          glyphs="blocks"
          scale={1.5}
          digitSize={1.2}
          timeScale={0.5}
          brightness={0.6}
          glow={0}
          persistence={0}
          mouseStrength={0.5}
          mouseGlow={0}
          curvature={0.1}
          vignette={0}
          clickEffect="none"
          dpr={dpr}
        />
      )}
    </div>
  )
}
