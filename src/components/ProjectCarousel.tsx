import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CircularCarousel from '../animations/reactbits/CircularCarousel'
import { cases, coverOf } from '../data/cases'

const items = cases.map((c) => ({ src: coverOf(c.id), alt: `Обложка проекта: ${c.name}`, title: c.name, subtitle: c.kind }))

/**
 * React Bits CircularCarousel (panorama): карточки проектов по кругу. Клик по карточке ведёт на страницу проекта,
 * перетаскивание и прокрутка листают ровно на одну карточку и останавливаются; автоматически карусель переходит к следующему проекту раз в 5 секунд. Список ссылок скрыт визуально, но нужен клавиатуре, скринридерам и поисковикам.
 */
export function ProjectCarousel() {
  const navigate = useNavigate()
  const [cardWidth, setCardWidth] = useState(220)
  useEffect(() => {
    const sync = () => setCardWidth(window.innerWidth < 640 ? 170 : 220)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <div className="project-carousel">
      <CircularCarousel
        items={items}
        preset="panorama"
        intro="rise"
        cardWidth={cardWidth}
        aspectRatio={0.75}
        autoplay="step"
        interval={5}
        oneAtATime
        captions
        tilt={0}
        perspective={1800}
        focusOnClick={false}
        fadeColor="#05070f"
        onItemClick={(_item, index) => navigate(`/work/${cases[index].id}`)}
      />
      <ul className="visually-hidden">
        {cases.map((c) => <li key={c.id}><Link to={`/work/${c.id}`}>{c.name}</Link></li>)}
      </ul>
    </div>
  )
}
