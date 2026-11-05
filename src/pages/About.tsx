import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Chips, Cta, PageHero } from '../components/ui'
import { breadcrumb, graph, person, personId } from '../data/schema'
import { pageUrl } from '../data/site'

const skills: [string, string[]][] = [
  ['Интерфейс', ['HTML5 и семантика', 'CSS, Grid, Flexbox', 'JavaScript (ES2023)', 'TypeScript', 'React', 'Next.js', 'Адаптивная вёрстка']],
  ['Серверная часть', ['Node.js', 'REST API', 'PostgreSQL', 'Авторизация и роли', 'Платёжные шлюзы', 'Интеграции']],
  ['Дизайн и UX', ['Figma', 'Прототипирование', 'Дизайн-системы', 'Типографика', 'Доступность (a11y)']],
  ['SEO и скорость', ['Core Web Vitals', 'Schema.org', 'Технический SEO', 'Lighthouse', 'Search Console', 'Яндекс Метрика']],
  ['Рабочий процесс', ['Git и GitHub', 'Code review', 'Docker', 'CI/CD', 'Развёртывание на VPS']],
  ['Общение', ['Работа с брифом', 'Переговоры', 'Оценка сроков', 'Простые объяснения', 'Работа в команде']],
]

const roles: [string, string][] = [
  ['Разработка сайтов под ключ', 'Лендинги, корпоративные сайты и магазины: от брифа и прототипа до запуска и обучения заказчика.'],
  ['Веб-приложения', 'Личные кабинеты, панели управления и внутренние сервисы с авторизацией, API и интеграциями.'],
  ['Оптимизация', 'Аудит и ускорение существующих сайтов, исправление адаптива, технические SEO-правки.'],
  ['Работа в команде', 'Могу взять отдельную часть проекта: фронтенд, вёрстку или интеграцию, и встроиться в процесс студии или агентства.'],
]

const principles: [string, string][] = [
  ['Сначала цель, потом дизайн', 'Сайт, который не отвечает на задачу бизнеса, красивой картинкой не спасти.'],
  ['Простота выигрывает', 'Каждый элемент на странице должен помогать человеку. Всё остальное убираю.'],
  ['Честные сроки и цены', 'Называю цифры после разбора задачи и не меняю их по ходу работы.'],
  ['Прозрачность', 'Рабочая версия доступна заказчику с первых недель. Никаких сюрпризов в финале.'],
]

export default function About() {
  const profile = { '@type': 'ProfilePage', url: pageUrl('/about'), name: 'Резюме веб-разработчика denvorko', mainEntity: { '@id': personId } }
  return (
    <>
      <Seo path="/about" title="Резюме веб-разработчика: стек, опыт и подход | denvorko"
        ogTitle="Резюме веб-разработчика denvorko"
        description="Обо мне: веб-разработчик denvorko. Технологический стек, направления работы, принципы и то, как строится общение с заказчиком. Страницу можно распечатать как резюме."
        jsonLd={graph(breadcrumb('/about', 'Обо мне'), profile, person)} />
      <PageHero name="Обо мне" title="Веб-разработчик, с которым легко договориться"
        lead="Я denvorko. Делаю сайты и веб-приложения и считаю, что хороший результат строится на двух вещах: аккуратном коде и понятном общении.">
        <div className="btn-row no-print">
          <Link className="btn btn-primary" to="/contact">Обсудить проект</Link>
          <button className="btn btn-ghost" type="button" onClick={() => window.print()}>Сохранить резюме в PDF</button>
        </div>
      </PageHero>

      <section className="section section--alt" aria-labelledby="me-title">
        <div className="container about-grid">
          <h2 id="me-title">Обо мне</h2>
          <div className="prose">
            <p>Я веб-разработчик и работаю с задачей целиком: разбираюсь в бизнесе клиента, продумываю структуру, рисую интерфейс и пишу код. Мне важно, чтобы сайт не просто выглядел хорошо, а решал конкретную задачу: приводил заявки, продавал или упрощал работу.</p>
            <p>Люблю чистую вёрстку, быстрые страницы и интерфейсы, в которых не нужно разбираться. Так же отношусь к общению: объясняю простыми словами, предупреждаю о рисках заранее и держу вас в курсе на каждом этапе.</p>
            <p>Работаю удалённо, на русском языке, с клиентами любого масштаба: от экспертов и небольших компаний до команд, которым нужен надёжный подрядчик на отдельную часть проекта.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <div className="container">
          <div className="section__head">
            <h2 id="skills-title">Что умею</h2>
            <p className="lead">Основные технологии и инструменты, с которыми работаю каждый день.</p>
          </div>
          <div className="stack-groups">
            {skills.map(([t, items]) => <div key={t}><h3>{t}</h3><Chips items={items} /></div>)}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="focus-title">
        <div className="container about-grid">
          <h2 id="focus-title">Чем занимаюсь</h2>
          <dl className="roles">
            {roles.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="princ-title">
        <div className="container">
          <div className="section__head"><h2 id="princ-title">Принципы работы</h2></div>
          <dl className="defs">
            {principles.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <Cta title="Давайте обсудим вашу задачу" text="Если вам нужен веб-разработчик, который и сделает, и объяснит, напишите мне." />
    </>
  )
}
