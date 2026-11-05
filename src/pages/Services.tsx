import { Seo } from '../components/Seo'
import { Cta, Faq, PageHero } from '../components/ui'
import { servicesFaq } from '../data/faq'
import { breadcrumb, businessId, faqSchema, graph } from '../data/schema'
import { pageUrl } from '../data/site'
import { included, services } from '../data/services'
import { Link } from 'react-router-dom'

export default function Services() {
  const catalog = {
    '@type': 'OfferCatalog', name: 'Услуги веб-разработчика denvorko',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.forWhom, provider: { '@id': businessId }, url: `${pageUrl('/services')}#${s.id}` },
    })),
  }
  return (
    <>
      <Seo
        path="/services"
        title="Разработка сайтов под ключ: услуги, сроки и состав работ | denvorko"
        ogTitle="Разработка сайтов под ключ: услуги и сроки"
        description="Услуги веб-разработчика: лендинги, корпоративные сайты, интернет-магазины, личные кабинеты, ускорение сайтов и поддержка. Понятные сроки и состав работ."
        jsonLd={graph(breadcrumb('/services', 'Услуги'), catalog, faqSchema(servicesFaq))}
      />
      <PageHero name="Услуги" title="Разработка сайтов и веб-приложений под ключ"
        lead="Выберите задачу, которая ближе к вашей. Для каждой услуги ниже понятно, кому она подходит, что входит в работу и сколько времени она занимает.">
        <div className="btn-row"><Link className="btn btn-primary" to="/contact">Получить расчёт</Link></div>
      </PageHero>

      <section className="section section--alt" aria-labelledby="list-title">
        <div className="container">
          <div className="section__head"><h2 id="list-title">Услуги и состав работ</h2></div>
          <div>
            {services.map((s) => (
              <article className="service" id={s.id} key={s.id}>
                <div className="service__head">
                  <h3>{s.name}</h3>
                  <p>{s.forWhom}</p>
                  <span className="service__term">Срок: {s.term}</span>
                </div>
                <div className="service__body">
                  <div><h4>Основа проекта</h4><ul className="tick">{s.base.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  <div><h4>Дополнительно</h4><ul className="tick">{s.extra.map((x) => <li key={x}>{x}</li>)}</ul></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="inc-title">
        <div className="container">
          <div className="section__head">
            <h2 id="inc-title">Что входит в любой проект</h2>
            <p className="lead">Эти пункты не продаются отдельно. Это стандарт, ниже которого я не делаю сайты.</p>
          </div>
          <ul className="checks">
            {included.map((i) => <li key={i.title}><b>{i.title}</b> <span>{i.text}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="price-title">
        <div className="container">
          <div className="section__head">
            <h2 id="price-title">Из чего складывается стоимость</h2>
            <p className="lead">Я не называю цену «с потолка». Сначала разбираю задачу, потом присылаю смету, где каждая строка понятна.</p>
          </div>
          <dl className="defs defs--3">
            <div><dt>Объём</dt><dd>Количество страниц и уникальных блоков. Типовые блоки стоят меньше, чем авторские решения.</dd></div>
            <div><dt>Функциональность</dt><dd>Формы, личный кабинет, оплата, интеграции с CRM и учётными системами.</dd></div>
            <div><dt>Сроки</dt><dd>Срочные проекты требуют перестроить график, поэтому дороже обычных на 20–30 %.</dd></div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <div className="section__head"><h2 id="faq-title">Вопросы про сроки, оплату и поддержку</h2></div>
          <Faq items={servicesFaq} />
        </div>
      </section>

      <Cta title="Опишите задачу, пришлю смету и сроки" text="Достаточно нескольких предложений о проекте. Если чего-то не хватит, я задам уточняющие вопросы." label="Получить расчёт" />
    </>
  )
}
