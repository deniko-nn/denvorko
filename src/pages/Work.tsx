import { mockups } from '../components/Mockups'
import { Seo } from '../components/Seo'
import { Chips, Cta, PageHero } from '../components/ui'
import { cases } from '../data/cases'
import { breadcrumb, graph } from '../data/schema'
import { pageUrl, site } from '../data/site'

export default function Work() {
  const collection = {
    '@type': 'CollectionPage', name: 'Портфолио denvorko', url: pageUrl('/work'),
    mainEntity: { '@type': 'ItemList', itemListElement: cases.map((c, n) => ({ '@type': 'ListItem', position: n + 1, name: c.name, url: `${pageUrl('/work')}#${c.id}` })) },
  }
  return (
    <>
      <Seo path="/work" title="Портфолио веб-разработчика: проекты и кейсы | denvorko"
        ogTitle="Портфолио веб-разработчика: проекты и кейсы"
        description="Портфолио веб-разработчика denvorko: корпоративный сайт, интернет-магазин и личный кабинет. Задачи, решения и технологии каждого проекта."
        jsonLd={graph(breadcrumb('/work', 'Работы'), collection)} />
      <PageHero name="Работы" title="Проекты и подход к работе"
        lead="Три задачи, которые чаще всего приходят от бизнеса: показать себя, продать онлайн и автоматизировать работу. Для каждой рассказываю, что было нужно, что сделал и на чём." />

      <section className="section section--alt" aria-label="Кейсы">
        <div className="container">
          {cases.map((c) => {
            const Shot = mockups[c.mockup]
            return (
              <article className="case" id={c.id} key={c.id}>
                <div className="case__fig"><Shot /></div>
                <div className="case__body">
                  <div>
                    <p className="muted">{c.kind}</p>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 1.1rem + 1.6vw, 2.2rem)', marginTop: 6 }}>{c.name}</h2>
                  </div>
                  <dl className="case__meta">
                    <div><dt>Задача</dt><dd>{c.task}</dd></div>
                    <div><dt>Решение</dt><dd>{c.solution}</dd></div>
                    <div><dt>Что получилось</dt><dd>{c.result}</dd></div>
                  </dl>
                  <Chips items={c.stack} label="Технологии" />
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="code-title">
        <div className="container">
          <div className="section__head">
            <h2 id="code-title">Код можно посмотреть</h2>
            <p className="lead">Я публикую рабочий код и учебные проекты на GitHub. Так видно, как я пишу и структурирую решения, без пересказов.</p>
          </div>
          <div className="btn-row"><a className="btn btn-ghost" href={site.github} rel="noopener">Открыть GitHub</a></div>
        </div>
      </section>

      <Cta title="Нужен такой же результат для вашего проекта?" text="Расскажите о задаче, а я подскажу, какой формат подойдёт, и назову сроки." />
    </>
  )
}
