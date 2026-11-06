import { ProjectCard } from '../components/ProjectCard'
import { Seo } from '../components/Seo'
import { Cta, PageHero } from '../components/ui'
import { cases } from '../data/cases'
import { breadcrumb, graph } from '../data/schema'
import { pageUrl, site } from '../data/site'

export default function Work() {
  const collection = {
    '@type': 'CollectionPage', name: 'Мои проекты: портфолио denvorko', url: pageUrl('/work'),
    mainEntity: { '@type': 'ItemList', itemListElement: cases.map((c, n) => ({ '@type': 'ListItem', position: n + 1, name: c.name, url: pageUrl(`/work/${c.id}`) })) },
  }
  return (
    <>
      <Seo path="/work" title="Портфолио веб-разработчика: мои проекты и кейсы | denvorko"
        ogTitle="Мои проекты: портфолио веб-разработчика"
        description="Мои проекты: корпоративные сайты, интернет-магазины, лендинги, личные кабинеты и ускорение сайтов. У каждого проекта своя страница с задачей, решением и результатом."
        jsonLd={graph(breadcrumb('/work', 'Мои проекты'), collection)} />
      <PageHero name="Мои проекты" title="Мои проекты"
        lead="Шесть типовых задач бизнеса: показать себя, продать онлайн, автоматизировать работу и ускорить сайт. Откройте любой проект, чтобы узнать, что было нужно, что я сделал и что получилось." />

      <section className="section section--alt" aria-label="Проекты">
        <div className="container">
          <div className="pcards">
            {cases.map((c) => <ProjectCard key={c.id} item={c} />)}
          </div>
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
