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

const types = ['Лендинг или сайт-визитка', 'Многостраничный сайт', 'Интернет-магазин', 'Веб-приложение или кабинет', 'Ускорение или доработка сайта', 'Пока не знаю, нужна консультация']
const deadlines = ['Как можно скорее', 'В течение месяца', 'В течение 2–3 месяцев', 'Сроки не горят']

export default function Contact() {
  const [status, setStatus] = useState('')
  const [checked, setChecked] = useState(false)
  const statusRef = useRef<HTMLParagraphElement>(null)

  /** Собираем письмо и открываем почтовую программу. Замените на отправку в API, когда появится бэкенд. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    setChecked(true)
    if (!f.checkValidity()) { f.querySelector<HTMLElement>(':invalid')?.focus(); return }
    const d = new FormData(f)
    // убираем управляющие символы и переводы строк из полей, которые попадают в тему и заголовки письма
    const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max)
    const oneLine = (v: FormDataEntryValue | null, max: number) => clean(v, max).replace(/[\r\n]+/g, ' ')
    const type = oneLine(d.get('type'), 80)
    const body = [`Имя: ${oneLine(d.get('name'), 80)}`, `Как связаться: ${oneLine(d.get('contact'), 120)}`, `Тип проекта: ${type}`, `Сроки: ${oneLine(d.get('deadline'), 80)}`, '', clean(d.get('message'), 2000)].join('\n')
    setStatus(`Открываю почтовую программу с готовым письмом. Если ничего не произошло, напишите на ${site.email} или в Telegram.`)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Заявка с сайта denvorko: ' + type)}&body=${encodeURIComponent(body)}`
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
              <form className={`form${checked ? ' was-validated' : ''}`} onSubmit={onSubmit} noValidate>
                <div className="form-row">
                  <div className="field">
                    <input id="name" name="name" type="text" autoComplete="name" required maxLength={80} placeholder=" " />
                    <label htmlFor="name">Как к вам обращаться</label>
                    <span className="field__error">Напишите, как к вам обращаться</span>
                  </div>
                  <div className="field">
                    <input id="contact" name="contact" type="text" autoComplete="email" required maxLength={120} placeholder=" " />
                    <label htmlFor="contact">Почта или Telegram</label>
                    <span className="field__error">Укажите, как с вами связаться</span>
                  </div>
                </div>

                <fieldset className="choice">
                  <legend>Что нужно сделать</legend>
                  <div className="choice__opts">
                    {types.map((t, i) => (
                      <label className="opt" key={t}><input type="radio" name="type" value={t} defaultChecked={i === 0} /><span>{t}</span></label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="choice">
                  <legend>Когда нужен результат</legend>
                  <div className="choice__opts">
                    {deadlines.map((t, i) => (
                      <label className="opt" key={t}><input type="radio" name="deadline" value={t} defaultChecked={i === 0} /><span>{t}</span></label>
                    ))}
                  </div>
                </fieldset>

                <div className="field">
                  <textarea id="message" name="message" required rows={4} maxLength={2000} placeholder=" " />
                  <label htmlFor="message">О проекте</label>
                  <span className="field__error">Опишите задачу в паре предложений</span>
                  <span className="hint">Чем занимается бизнес, какая цель у сайта, есть ли примеры, которые нравятся.</span>
                </div>

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
                <a href={site.telegram} rel="noopener noreferrer"><span className="lab">Telegram</span><span className="val">{site.telegramHandle}</span></a>
                <a href={site.github} rel="noopener noreferrer"><span className="lab">GitHub</span><span className="val">github.com/deniko-nn</span></a>
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
