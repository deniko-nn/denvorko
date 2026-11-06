import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import ReflectiveCard from '../animations/reactbits/ReflectiveCard'
import { coverOf, type CaseItem } from '../data/cases'

/**
 * React Bits ReflectiveCard в стиле сайта: тёмное стекло цвета фона, острые углы, тонкая лавандовая рамка,
 * мягкий блик, следящий за курсором. Вся карточка является ссылкой на страницу проекта.
 */
const glass = {
  '--rc-base': '#090c1c',
  '--rc-shadow': 'none',
  '--rc-ink': '#eceffa',
  '--rc-muted': '#9aa0b8',
  '--rc-rim': 'rgba(190, 200, 255, 0.22)',
  '--rc-rim-highlight': 'rgba(190, 200, 255, 0.06)',
} as CSSProperties

export function ProjectCard({ item }: { item: CaseItem }) {
  return (
    <Link className="pcard" to={`/work/${item.id}`} aria-label={`Открыть проект: ${item.name}`}>
      <ReflectiveCard width="100%" height={500} radius={0} theme="dark" tint="#aab6ff" metalness={0.25} roughness={0.5} blurStrength={8} shine={0.3} glare={0.55} bevel={0} warp={0.25} tiltStrength={5} style={glass}>
        <div className="pcard__content">
          <span className="pcard__kind">{item.kind}</span>
          <img className="pcard__cover" src={coverOf(item.id)} alt="" loading="lazy" draggable={false} />
          <h2 className="pcard__title">{item.name}</h2>
          <p className="pcard__short">{item.short}</p>
          <span className="pcard__more">
            Открыть проект
            <svg viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 6h37M33 1.5L38 6l-5 4.5" /></svg>
          </span>
        </div>
      </ReflectiveCard>
    </Link>
  )
}
