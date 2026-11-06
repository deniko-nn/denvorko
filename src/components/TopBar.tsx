import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { setMotionOff, useMotionOff } from '../animations/motion'
import { nav, site } from '../data/site'
import { playGlitchWipe } from './GlitchWipe'

/** Волна: переключатель анимаций сайта (вкл/выкл). Анимированная, пока движение включено. */
function MotionToggle() {
  const off = useMotionOff()
  return (
    <button className="hud-wave" type="button" aria-pressed={!off} onClick={() => setMotionOff(!off)}
      aria-label={off ? 'Включить анимации' : 'Выключить анимации'} title={off ? 'Включить анимации' : 'Выключить анимации'}>
      <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path className="wave" d="M2 12 C 8 12, 9 3, 14 3 S 20 21, 25 21 S 31 3, 36 3 S 42 12, 46 12" />
      </svg>
    </button>
  )
}

/** HUD: верхняя строка с названием, переключателем анимаций и меню; меню раскрывается на весь экран. */
export function TopBar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = () => { playGlitchWipe(1); setOpen((v) => !v) }
  const items = [{ to: '/', label: 'Главная' }, ...nav]

  return (
    <>
      <header className="hud-top">
        <Link className="hud-label" to="/" aria-label="denvorko — на главную">
          <span className="bar" />denvorko <span className="hud-label__sub">веб-разработчик</span>
        </Link>
        <div className="hud-right">
          <MotionToggle />
          <button className="hud-menu" type="button" aria-expanded={open} aria-controls="menu" onClick={toggle}>
            <span>{open ? 'Закрыть' : 'Меню'}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 8h18M7 12h14M3 16h18" />}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div id="menu" className="menu" role="dialog" aria-modal="true" aria-label="Меню сайта"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, delay: 0.12 }}>
            <nav className="menu__nav" aria-label="Основное меню">
              <ul>
                {items.map((n, i) => (
                  <m.li key={n.to} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07, duration: 0.45 }}>
                    <NavLink to={n.to} end={n.to === '/'} onClick={() => setOpen(false)}><span className="bar" />{n.label}</NavLink>
                  </m.li>
                ))}
              </ul>
            </nav>
            <div className="menu__contacts">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.telegram} rel="noopener noreferrer">Telegram {site.telegramHandle}</a>
              <a href={site.github} rel="noopener noreferrer">GitHub</a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
