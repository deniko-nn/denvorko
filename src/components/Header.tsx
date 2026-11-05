import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { nav } from '../data/site'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 880px)')
    const close = () => setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  return (
    <header className="site-header">
      <div className="container">
        <Link className="logo" to="/" aria-label="denvorko — на главную">denvorko</Link>
        {/* React Transition Group: классы menu-enter / menu-exit управляют появлением пунктов мобильного меню */}
        <CSSTransition in={open} timeout={400} classNames="menu" nodeRef={navRef}>
          <nav ref={navRef} className={`site-nav${open ? ' open' : ''}`} id="site-nav" aria-label="Основное меню">
            <ul className="nav-list">
              {nav.map((n, i) => (
                <li key={n.to} style={{ '--i': i } as CSSProperties}>
                  <NavLink to={n.to}>
                    {({ isActive }) => (
                      <>
                        {n.label}
                        {/* Framer Motion: подчёркивание «переезжает» между пунктами */}
                        {isActive && <motion.span layoutId="nav-indicator" className="nav-ind" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
              <li className="nav-cta" style={{ '--i': nav.length } as CSSProperties}><Link className="btn btn-primary" to="/contact">Обсудить проект</Link></li>
            </ul>
          </nav>
        </CSSTransition>
        <div className="header-tools">
          <Link className="btn btn-primary" to="/contact">Обсудить проект</Link>
          <ThemeToggle />
          <button className="icon-btn nav-toggle" type="button" aria-expanded={open} aria-controls="site-nav"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  )
}
