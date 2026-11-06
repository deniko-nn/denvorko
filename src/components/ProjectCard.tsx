import { Link } from 'react-router-dom'
import ReflectiveCard from '../animations/reactbits/ReflectiveCard'
import { coverOf, type CaseItem } from '../data/cases'

/**
 * React Bits ReflectiveCard: металлическая карточка с бликом и отражением, следит за курсором.
 * Вся карточка является ссылкой на страницу проекта.
 */
export function ProjectCard({ item }: { item: CaseItem }) {
  return (
    <Link className="pcard" to={`/work/${item.id}`} aria-label={`Открыть проект: ${item.name}`}>
      <ReflectiveCard width="100%" height={500} radius={6} tint="#ffffff" metalness={1} roughness={0.3} blurStrength={6} shine={1} glare={0.5}>
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
