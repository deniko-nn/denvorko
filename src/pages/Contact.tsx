import { useRef, useState, type FormEvent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Seo } from '../components/Seo'
import { PageHero, Steps } from '../components/ui'
import { TypedLine } from '../components/TypedLine'
import { breadcrumb, business, graph } from '../data/schema'
import { pageUrl, site } from '../data/site'

const next = [
  { title: 'Отвечу в течение рабочего дня', text: 'Подтвержу, что понял задачу, и задам вопросы, если чего-то не хватает.' },
  { title: 'Созвонимся на 15–20 минут', text: 'Уточним цель, примеры и ограничения. Звонок бесплатный и ни к чему не обязывает.' },
  { title: 'Пришлю предложение', text: 'Структура, сроки и стоимость по этапам. Обычно это занимает 1–2 рабочих дня.' },
  { title: 'Согласуем и стартуем', text: 'Подписываем договор, вношу предоплату в график и приступаю к работе.' },
]

export default function Contact() {
  const [status, setStatus] = useState('')
  const statusRef = useRef<HTMLParagraphElement>(null)

  /** Собираем письмо и открываем почтовую программу. Замените на отправку в API, когда появится бэкенд. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    if (!f.reportValidity()) return
    const d = new FormData(f)
    const body = [`Имя: ${d.get('name')}`, `Как связаться: ${d.get('contact')}`, `Тип проекта: ${d.get('type')}`, `Сроки: ${d.get('deadline')}`, '', String(d.get('message'))].join('\n')
    setStatus(`Открываю почтовую программу с готовым письмом. Если ничего не произошло, напишите на ${site.email} или в Telegram.`)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Заявка с сайта denvorko: ' + d.get('type'))}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <Seo path="/contact" title="Заказать сайт: контакты веб-разработчика | denvorko"
        ogTitle="Заказать сайт: контакты веб-разработчика"
        description="Свяжитесь с веб-разработчиком denvorko: опишите задачу и получите ответ в течение рабочего дня. Почта, Telegram и форма заявки."
        jsonLd={graph(breadcrumb('/contact', 'Контакты'), { '@type': 'ContactPage', url: pageUrl('/contact'), name: 'Контакты denvorko', mainEntity: { '@id': business['@id'] } }, business)} />
      <PageHero name="Контакты" title="Обсудим ваш проект"
        lead="Опишите задачу своими словами. Я отвечу в течение рабочего дня, задам уточняющие вопросы и предложу решение со сроками и стоимостью.">
        <TypedLine prefix="Чаще всего пишут, когда нужен" phrases={['лендинг за 1–2 недели', 'интернет-магазин без комиссий маркетплейсов', 'личный кабинет для клиентов', 'сайт, который находят в поиске', 'быстрый сайт вместо медленного']} />
      </PageHero>

      <section className="section section--alt" aria-labelledby="form-title">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 id="form-title" className="visually-hidden">Форма заявки</h2>
              <form className="form" onSubmit={onSubmit} noValidate>
                <div className="form-row">
                  <div className="field"><label htmlFor="name">Как к вам обращаться</label><input id="name" name="name" type="text" autoComplete="name" required /></div>
                  <div className="field"><label htmlFor="contact">Почта или Telegram</label><input id="contact" name="contact" type="text" autoComplete="email" required /></div>
                </div>
                <div className="form-row">
                  <div className="field"><label htmlFor="type">Что нужно сделать</label>
                    <select id="type" name="type" required>
                      <option>Лендинг или сайт-визитка</option><option>Многостраничный сайт</option><option>Интернет-магазин</option>
                      <option>Веб-приложение или кабинет</option><option>Ускорение или доработка сайта</option><option>Пока не знаю, нужна консультация</option>
                    </select></div>
                  <div className="field"><label htmlFor="deadline">Когда нужен результат</label>
                    <select id="deadline" name="deadline">
                      <option>Как можно скорее</option><option>В течение месяца</option><option>В течение 2–3 месяцев</option><option>Сроки не горят</option>
                    </select></div>
                </div>
                <div className="field"><label htmlFor="message">О проекте</label>
                  <textarea id="message" name="message" required />
                  <span className="hint">Чем занимается бизнес, какая цель у сайта, есть ли примеры, которые нравятся.</span></div>
                <button className="btn btn-primary" type="submit">Отправить заявку</button>
                <div role="status" className="form-status-wrap">
                  {/* React Transition Group: сообщение мягко появляется после отправки */}
                  <CSSTransition in={!!status} timeout={300} classNames="fade" unmountOnExit nodeRef={statusRef}>
                    <p className="form-status" ref={statusRef}>{status}</p>
                  </CSSTransition>
                </div>
                <p className="form-note">Нажимая кнопку, вы откроете письмо с заполненными данными в вашей почтовой программе. Данные используются только для ответа на заявку.</p>
              </form>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 1.1rem + 0.8vw, 1.7rem)', marginBottom: 20 }}>Или напишите напрямую</h2>
              <div className="channels">
                <a href={`mailto:${site.email}`}><span className="lab">Почта</span><span className="val">{site.email}</span></a>
                <a href={site.telegram} rel="noopener"><span className="lab">Telegram</span><span className="val">{site.telegramHandle}</span></a>
                <a href={site.github} rel="noopener"><span className="lab">GitHub</span><span className="val">github.com/deniko-nn</span></a>
                <div><span className="lab">Формат работы</span><span className="val">Удалённо, на русском языке</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="next-title">
        <div className="container">
          <div className="section__head"><h2 id="next-title">Что будет после заявки</h2></div>
          <Steps items={next} />
        </div>
      </section>
    </>
  )
}
