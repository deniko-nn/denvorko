import { useEffect, useState, type ComponentType } from 'react'
import type { TopographyProps } from '../animations/reactbits/Topography'

/**
 * React Bits Topography (WebGL): топографические линии как фон всех страниц.
 * Фиксированный слой на весь экран, не перехватывает клики. Подгружается отдельным чанком
 * уже после первой отрисовки, поэтому не задерживает показ страницы.
 */
export function TopographyBackground() {
  const [Topography, setTopography] = useState<ComponentType<TopographyProps> | null>(null)
  const [light, setLight] = useState(false)
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    let alive = true
    import('../animations/reactbits/Topography').then((m) => alive && setTopography(() => m.default))
    return () => { alive = false }
  }, [])

  // Тема сайта: в светлой теме линии рисуются «чернилами» на светлом фоне
  useEffect(() => {
    const root = document.documentElement
    const sync = () => setLight(root.dataset.theme === 'light')
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  // Экономим видеокарту на телефонах и слабых устройствах
  useEffect(() => {
    const calc = () => setDpr(window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <div className={`topo-bg${Topography ? ' is-ready' : ''}`} aria-hidden="true">
      {Topography && (
        <Topography
          color={light ? '#2f56d9' : '#4f7cff'}
          lightMode={light}
          lineCount={22}
          lineWidth={1.2}
          elevation={1}
          foreground={0.2}
          tilt={32}
          speed={0.25}
          direction="forward"
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
