import { Link } from 'react-router-dom'
import { HeroSlider } from '../components/HeroSlider'
import { HoverLift } from '../components/HoverLift'
import { Statement } from '../components/Statement'
import { mockups } from '../components/Mockups'
import { Seo } from '../components/Seo'
import { SideRing } from '../components/SideRing'
import { Chips, Cta, Faq, Steps } from '../components/ui'
import { cases } from '../data/cases'
import { homeFaq } from '../data/faq'
import { business, faqSchema, graph, person, website } from '../data/schema'
import { homeServiceIds, services } from '../data/services'

const process = [
  { title: 'Бриф и цель', text: 'Разбираем, что должен давать сайт: заявки, продажи или доверие. Фиксируем задачу, сроки и стоимость.' },
  { title: 'Структура и прототип', text: 'Продумываю страницы и путь посетителя до заявки. Показываю схему до того, как начну рисовать.' },
  { title: 'Дизайн и разработка', text: 'Рисую интерфейс, верстаю и программирую. Раз в неделю показываю рабочую версию.' },
  { title: 'Запуск и рост', text: 'Проверяю на устройствах, подключаю аналитику, запускаю и передаю доступы. Остаюсь на связи после старта.' },
]

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="denvorko — веб-разработчик, сайты под ключ и веб-приложения"
        description="Веб-разработчик denvorko: разработка сайтов под ключ. Лендинги, корпоративные сайты, интернет-магазины и личные кабинеты. Адаптив, скорость и SEO-основа с первого дня."
        jsonLd={graph(website, person, business, faqSchema(homeFaq))}
      />

      <HeroSlider />

      <Statement>Хороший сайт — это не просто красивая картинка. Это рабочий инструмент: он быстро открывается, его находят в поиске, и он приводит клиентов, пока вы занимаетесь своим делом.</Statement>

      <section className="section section--alt" aria-labelledby="services-title">
        <div className="container">
          <div className="section__head">
            <h2 id="services-title">Что я делаю</h2>
            <p className="lead">Беру проект целиком, от первого разговора до запуска и поддержки. Один исполнитель, одна ответственность, понятные сроки.</p>
          </div>
          <div className="rows">
            {homeServiceIds.map((id) => {
              const s = services.find((x) => x.id === id)!
              return (
                <Link key={id} className="row" to={{ pathname: '/services', hash: `#${id}` }}>
                  <h3>{s.name}</h3><p>{s.short}</p>
                </Link>
              )
            })}
          </div>
          <div className="section__foot"><Link className="btn btn-ghost" to="/services">Все услуги, сроки и что входит</Link></div>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section__head">
            <h2 id="work-title">Проекты, по которым видно мой подход</h2>
            <p className="lead">Три типовые задачи: сайт для бизнеса, магазин и сервис с личным кабинетом. Подробности о задачах и решениях на странице работ.</p>
          </div>
          <div className="cases-grid">
            {cases.map((c) => {
              const Shot = mockups[c.mockup]
              return (
                <Link key={c.id} className="case-mini" to={{ pathname: '/work', hash: `#${c.id}` }}>
                  <HoverLift className="frame"><Shot /></HoverLift>
                  <h3>{c.name}</h3><p>{c.short}</p>
                </Link>
              )
            })}
          </div>
          <div className="section__foot"><Link className="btn btn-ghost" to="/work">Все работы и кейсы</Link></div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="process-title">
        <div className="container">
          <div className="section__head">
            <h2 id="process-title">Как проходит работа</h2>
            <p className="lead">Четыре понятных этапа. После каждого вы видите результат и решаете, идём ли дальше.</p>
          </div>
          <Steps items={process} />
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="container why-layout">
          <div className="why-main">
          <div className="section__head">
            <h2 id="why-title">Со мной просто договориться</h2>
            <p className="lead">Хороший сайт получается там, где исполнитель слушает и объясняет. Поэтому коммуникацию я считаю частью услуги.</p>
          </div>
          <dl className="defs defs--3">
            <div><dt>Говорю на языке задач</dt><dd>Объясняю без жаргона, что делаю и зачем. Вы принимаете решения осознанно, а не на веру.</dd></div>
            <div><dt>Вы всегда знаете, что происходит</dt><dd>Каждую неделю показываю прогресс на рабочей версии и называю следующий шаг.</dd></div>
            <div><dt>Беру ответственность за результат</dt><dd>Если вижу, что задуманное не сработает, говорю об этом сразу и предлагаю лучший вариант.</dd></div>
          </dl>
          </div>
          <SideRing text="Сайт, который грузится дольше чайника, клиентов не согреет" />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="stack-title">
        <div className="container">
          <div className="section__head">
            <h2 id="stack-title">Технологии, на которых я строю</h2>
            <p className="lead">Выбираю инструменты под задачу, а не под моду. Для лендинга достаточно чистого HTML и CSS, для сервиса нужен полноценный стек. А там, где ИИ ускоряет работу, использую и его, но проверяю результат сам.</p>
          </div>
          <div className="stack-groups stack-groups--4">
            <div><h3>Интерфейс</h3><Chips items={['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js']} /></div>
            <div><h3>Серверная часть</h3><Chips items={['Node.js', 'REST API', 'PostgreSQL', 'Авторизация', 'Платёжные шлюзы']} /></div>
            <div><h3>Качество и рост</h3><Chips items={['Core Web Vitals', 'Schema.org', 'Яндекс Метрика', 'Search Console', 'Доступность']} /></div>
            <div><h3>ИИ в работе</h3><Chips items={['ИИ-ассистенты для кода', 'Claude и другие модели', 'Автоматизация рутины', 'Проверка человеком']} /></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <div className="section__head"><h2 id="faq-title">Частые вопросы</h2></div>
          <Faq items={homeFaq} />
        </div>
      </section>

      <Cta title="Расскажите о задаче, отвечу в течение рабочего дня" text="Напишите пару предложений о проекте: чем занимается бизнес и чего вы ждёте от сайта. Я предложу решение, сроки и стоимость." />
    </>
  )
}
