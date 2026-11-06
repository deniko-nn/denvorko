import { useEffect, useState, type ComponentType } from 'react'
import { useMotionOff } from '../animations/motion'
import type { TopographyProps } from '../animations/reactbits/Topography'

/**
 * React Bits Topography (WebGL): топографические линии как фон всех страниц.
 * Фиксированный слой на весь экран, не перехватывает клики. Подгружается отдельным чанком
 * уже после первой отрисовки, поэтому не задерживает показ страницы.
 */
export function TopographyBackground() {
  const [Topography, setTopography] = useState<ComponentType<TopographyProps> | null>(null)
  const motionOff = useMotionOff()
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    // экономия: не грузим тяжёлый WebGL-фон при включённой экономии трафика и на очень слабых устройствах
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    if (nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) || (navigator.hardwareConcurrency || 8) <= 2) return
    let alive = true
    import('../animations/reactbits/Topography').then((m) => alive && setTopography(() => m.default))
    return () => { alive = false }
  }, [])

  // Экономим видеокарту на телефонах и слабых устройствах
  useEffect(() => {
    const calc = () => setDpr(window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <div className={`topo-bg${Topography && !motionOff ? ' is-ready' : ''}`} aria-hidden="true">
      {Topography && !motionOff && (
        <Topography
          // Каркасные линии холодного бело-лилового цвета, как на тёмных схемах
          color="#b9c2ff"
          lineCount={34}
          lineWidth={1.2}
          elevation={0.5}
          foreground={0.2}
          scale={1.8}
          detail={0.15}
          tilt={32}
          speed={0.45}
          direction="right"
          glow={0.6}
          depthOfField={0.4}
          fog={0.35}
          hoverEffect="lift"
          clickEffect="pulse"
          dpr={dpr}
        />

      )}
    </div>
  )
}
