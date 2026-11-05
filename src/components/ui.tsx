import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
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

export function Cta({ title, text, label = 'Обсудить проект' }: { title: string; text: string; label?: string }) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta">
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/contact">{label}</Link>
            <a className="btn btn-ghost" href={site.telegram} rel="noopener">Написать в Telegram</a>
          </div>
        </div>
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

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="steps">
      {items.map((s) => (
        <li key={s.title}><h3><span className="num" />{s.title}</h3><p>{s.text}</p></li>
      ))}
    </ol>
  )
}
