import { Link } from 'react-router-dom'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../animations/gsap'
import SpotlightCard from '../animations/reactbits/SpotlightCard'
import { site } from '../data/site'
import type { Qa } from '../data/faq'

export function Crumbs({ name }: { name: string }) {
  return (
    <nav className="crumbs" aria-label="Хлебные крошки">
      <ol>
        <li><Link to="/">Главная</Link></li>
        <li aria-current="page">{name}</li>
      </ol>
    </nav>
  )
}

export function PageHero({ name, title, lead, children }: { name: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Crumbs name={name} />
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </section>
  )
}

export function Faq({ items }: { items: Qa[] }) {
  return (
    <div className="faq">
      {items.map((i) => (
        <details key={i.q}>
          <summary>{i.q}</summary>
          <div className="answer"><p>{i.a}</p></div>
        </details>
      ))}
    </div>
  )
}

/** React Bits SpotlightCard: подсветка в цвет акцента следует за курсором. */
export function Cta({ title, text, label = 'Обсудить проект' }: { title: string; text: string; label?: string }) {
  const vars = { '--spotlight-card-surface': 'var(--surface)', '--spotlight-card-border': 'var(--line)', '--spotlight-card-shadow': 'none' } as CSSProperties
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <SpotlightCard className="cta" spotlightColor="var(--accent)" intensity={0.22} spotlightSize={320} style={vars}>
          <div className="cta__inner">
            <div className="cta__text">
              <h2 id="cta-title">{title}</h2>
              <p>{text}</p>
              <div className="btn-row">
                <Link className="btn btn-primary" to="/contact">{label}</Link>
                <a className="btn btn-ghost" href={site.telegram} rel="noopener">Написать в Telegram</a>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}

export function Chips({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((i) => <li key={i}>{i}</li>)}
    </ul>
  )
}

/** GSAP ScrollTrigger (scrub): жёлтая линия над шагом заполняется при прокрутке вниз и так же возвращается при прокрутке вверх. */
export function Steps({ items }: { items: { title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.utils.toArray<HTMLElement>('li', ref.current).forEach((li) => {
      gsap.fromTo(li, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: li, start: 'top 92%', end: 'top 62%', scrub: 0.4 } })
    })
  }, { scope: ref })
  return (
    <ol className="steps" ref={ref}>
      {items.map((s) => (
        <li key={s.title}><h3><span className="num" />{s.title}</h3><p>{s.text}</p></li>
      ))}
    </ol>
  )
}
