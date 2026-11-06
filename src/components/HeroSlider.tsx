import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Magnet from '../animations/reactbits/Magnet'
import SplitText from '../animations/reactbits/SplitText'
import { site } from '../data/site'
import { playGlitchWipe } from './GlitchWipe'
import { ScrollTrigger } from '../animations/gsap'
import { WireframeScene } from './WireframeScene'

const slides = [
  { title: 'Делаю сайты, которые превращают посетителей в клиентов',
    text: 'Я denvorko, веб-разработчик. Проектирую, рисую и программирую сайты и веб-приложения под ключ: быстрые, удобные на любом экране и ведущие к заявке.',
    more: { to: '/work', label: 'Мои работы' } },
  { title: 'Отвечаю за один рабочий день', text: 'Один контакт на весь проект, без цепочки менеджеров.', more: { to: '/about', label: 'Обо мне' } },
  { title: 'Дизайн и код у одного человека', text: 'Макет и вёрстка совпадают до пикселя, правки идут быстрее.', more: { to: '/work', label: 'Работы' } },
  { title: 'SEO и скорость заложены сразу', text: 'Не надстройка после запуска, а часть архитектуры.', more: { to: '/services', label: 'Услуги' } },
]

/** Круглая стрелка: при клике стрелка «пролетает» сквозь круг и возвращается, состояние не залипает. */
function RoundArrow({ dir, onClick, label }: { dir: 1 | -1; onClick: () => void; label: string }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    if (!go) return
    const t = setTimeout(() => setGo(false), 520)
    return () => clearTimeout(t)
  }, [go])
  return (
    <button className={`round-arrow${dir === -1 ? ' round-arrow--prev' : ''}${go ? ' is-go' : ''}`} type="button" aria-label={label}
      onClick={() => { setGo(true); onClick() }}>
      <svg viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === 1 ? 'M1 6h37M33 1.5L38 6l-5 4.5' : 'M39 6H2M7 1.5L2 6l5 4.5'} />
      </svg>
    </button>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Первый экран в стиле HUD: слайды (стрелка, клавиши, свайп), штриховая плашка 01 — 04,
 * каркасная 3D-модель слева. Тексты слайдов: заголовок и описание главной.
 */
export function HeroSlider() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [glitch, setGlitch] = useState(0)
  const start = useRef<number | null>(null)

  // высота первого экрана зависит от слайда: пересчитываем точки срабатывания эффектов при прокрутке ниже
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [i])

  const go = useCallback((n: number, d: number) => {
    setDir(d)
    setI((n + slides.length) % slides.length)
    setGlitch((g) => g + 1)
    playGlitchWipe(d as 1 | -1)
  }, [])

  return (
    <section className="hero" aria-roledescription="карусель" aria-label="Главное о denvorko"
      tabIndex={0} onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1, 1); if (e.key === 'ArrowLeft') go(i - 1, -1) }}
      onPointerDown={(e) => { start.current = e.clientX }}
      onPointerUp={(e) => { if (start.current === null) return; const dx = e.clientX - start.current; start.current = null; if (Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1) }}>
      <div className="container hero__inner">
        <div className="hero__scene"><WireframeScene active={i} glitch={glitch} /></div>

        <div className="hero__body">
          {/* Управление слайдами всегда рядом с плашкой: на телефоне не нужно скроллить вниз */}
          <div className="hero-controls">
            <div className="hero-pager" aria-label={`Слайд ${i + 1} из ${slides.length}`}>
              <b>{pad(i + 1)}</b><i /><span>{pad(slides.length)}</span>
            </div>
            <div className="hero-arrows">
              <RoundArrow dir={-1} onClick={() => go(i - 1, -1)} label="Предыдущий слайд" />
              <RoundArrow dir={1} onClick={() => go(i + 1, 1)} label="Следующий слайд" />
            </div>
          </div>
          {/* Все слайды лежат в одной ячейке сетки: высота по самому высокому, тексты есть в HTML */}
          <div className="hero__slides" aria-live="polite">
            {slides.map((sl, n) => {
              const active = n === i
              const Tag = n === 0 ? 'h1' : 'h2'
              return (
                <motion.div key={n} className={`slide${active ? ' glitch-in' : ''}`} aria-hidden={!active} inert={!active}
                  initial={false} animate={{ opacity: active ? 1 : 0, x: active ? 0 : -24 * dir }} transition={{ duration: 0.35 }}
                  style={{ visibility: active ? 'visible' : 'hidden' }}>
                  {active
                    ? <SplitText key={glitch} tag={Tag} text={sl.title} className="slide-title" splitType="chars" effect="blur" trigger="load" delay={14} duration={0.7} textAlign="left" />
                    : <Tag className="slide-title">{sl.title}</Tag>}
                  <p className="slide__text">{sl.text}</p>
                  <div className="btn-row">
                    {active
                      ? <Magnet magnetStrength={0.22} maxOffset={8} padding={36}><Link className="btn btn-primary" to="/contact">Обсудить проект</Link></Magnet>
                      : <Link className="btn btn-primary" to="/contact">Обсудить проект</Link>}
                    <Link className="btn btn-ghost" to={sl.more.to}>{sl.more.label}</Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>

      <div className="hero-hud">
        <span className="hud-logo">denvorko</span>
        <div className="hero-hud__links">
          <a href={site.telegram} rel="noopener">Telegram</a>
          <a href={`mailto:${site.email}`}>Почта</a>
          <a href={site.github} rel="noopener">GitHub</a>
        </div>
      </div>
    </section>
  )
}
