import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { animated, to, useSpring } from '@react-spring/web'

/** Панель кода в hero. Строки по очереди показывает GSAP (см. animations/HeroSequence.ts). */
const lines: ReactNode[] = [
  <><span className="k">const</span> project = {'{'}</>,
  <>  goal: <span className="s">"заявки и продажи"</span>,</>,
  <>  pages: [<span className="s">"главная"</span>, <span className="s">"услуги"</span>],</>,
  <>  design: <span className="s">"mobile first"</span>,</>,
  <>  stack: [<span className="s">"Next.js"</span>, <span className="s">"TypeScript"</span>],</>,
  <>  seo: <span className="s">"с первого дня"</span>,</>,
  <>  speed: <span className="s">{'"LCP < 2.5 с"'}</span>,</>,
  <>  launch: <span className="s">"по плану"</span>,</>,
  <>{'};'}</>,
  <><span className="c">// готово к запуску</span><span className="caret" aria-hidden="true" /></>,
]

/** React Spring: мягкий наклон панели за курсором (только мышь). */
export function CodePanel() {
  const [spring, api] = useSpring(() => ({ rx: 0, ry: 0, config: { mass: 1, tension: 140, friction: 20 } }))

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    api.start({ rx: -y * 6, ry: x * 8 })
  }

  return (
    <div className="code-wrap gsap-hide">
      <animated.figure
        className="code"
        aria-label="Пример описания проекта в коде"
        onPointerMove={onMove}
        onPointerLeave={() => api.start({ rx: 0, ry: 0 })}
        style={{ transform: to([spring.rx, spring.ry], (rx, ry) => `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`) }}
      >
        <figcaption className="code__bar"><span>project.config.ts</span><span className="code__status">собрано</span></figcaption>
        <pre><code>
          {lines.map((l, i) => (
            <span className="ln" data-n={i + 1} style={{ '--i': i } as CSSProperties} key={i}>{l}</span>
          ))}
        </code></pre>
      </animated.figure>
    </div>
  )
}
