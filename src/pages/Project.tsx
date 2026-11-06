import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Cta, PageHero } from '../components/ui'
import { cases, coverOf } from '../data/cases'
import { breadcrumbTrail, graph, personId } from '../data/schema'
import { pageUrl, site } from '../data/site'

const BackArrow = () => (
  <svg viewBox="0 0 40 12" width="30" height="10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M39 6H2M7 1.5L2 6l5 4.5" /></svg>
)

/** Страница отдельного проекта: задача, решение, результат, состав работ и возврат к списку проектов. */
export default function Project({ id }: { id: string }) {
  const index = cases.findIndex((c) => c.id === id)
  const c = cases[index]
  const next = cases[(index + 1) % cases.length]
  const path = `/work/${c.id}`

  const work = {
    '@type': 'CreativeWork', name: c.name, description: `${c.short} ${c.result}`, url: pageUrl(path),
    image: `${site.url}/assets/projects/${c.id}.svg`, creator: { '@id': personId }, inLanguage: 'ru', genre: c.kind,
  }

  return (
    <>
      <Seo path={path} title={`${c.name}: кейс веб-разработчика | denvorko`} ogTitle={c.name}
        description={`${c.short} Задача, решение и результат проекта: ${c.kind.toLowerCase()}.`}
        jsonLd={graph(breadcrumbTrail([{ name: 'Мои проекты', path: '/work' }, { name: c.name, path }]), work)} />

      <PageHero name={c.name} parent={{ name: 'Мои проекты', to: '/work' }} title={c.name} lead={c.short}>
        <div className="btn-row">
          <Link className="btn btn-ghost" to="/work"><BackArrow />К моим проектам</Link>
          <Link className="btn btn-primary" to="/contact">Обсудить такой проект</Link>
        </div>
      </PageHero>

      <section className="section section--alt" aria-label="О проекте">
        <div className="container project-layout">
          <div className="project-story">
            <p className="muted project-kind">{c.kind}</p>
            <dl className="case__meta">
              <div><dt>Задача</dt><dd>{c.task}</dd></div>
              <div><dt>Решение</dt><dd>{c.solution}</dd></div>
              <div><dt>Что получилось</dt><dd>{c.result}</dd></div>
            </dl>
            <div>
              <h2 className="project-h">Что вошло в проект</h2>
              <ul className="tick">{c.scope.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
          <figure className="project-figure">
            <img src={coverOf(c.id)} alt={`Обложка проекта: ${c.name}`} width={480} height={640} />
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="more-title">
        <div className="container">
          <div className="section__head"><h2 id="more-title">Другие проекты</h2></div>
          <div className="project-nav">
            <Link className="btn btn-ghost" to="/work"><BackArrow />К моим проектам</Link>
            <Link className="project-next" to={`/work/${next.id}`}>
              <span className="muted">Следующий проект</span>
              <strong>{next.name}</strong>
            </Link>
          </div>
        </div>
      </section>

      <Cta title="Нужен такой же результат для вашего проекта?" text="Расскажите о задаче, а я подскажу, какой формат подойдёт, и назову сроки." />
    </>
  )
}
