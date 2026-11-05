import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../data/site'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

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
        <nav className={`site-nav${open ? ' open' : ''}`} id="site-nav" aria-label="Основное меню">
          <ul className="nav-list">
            {nav.map((n) => (
              <li key={n.to}><NavLink to={n.to}>{n.label}</NavLink></li>
            ))}
            <li className="nav-cta"><Link className="btn btn-primary" to="/contact">Обсудить проект</Link></li>
          </ul>
        </nav>
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
