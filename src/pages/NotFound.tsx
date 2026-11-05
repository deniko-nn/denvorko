import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" noindex title="Страница не найдена | denvorko" description="Такой страницы нет. Вернитесь на главную или перейдите к услугам и работам." />
      <section className="notfound">
        <div className="container" style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
          <p className="big" aria-hidden="true">404</p>
          <h1>Такой страницы нет</h1>
          <p className="lead">Возможно, адрес изменился или в нём опечатка. Вернитесь на главную или выберите нужный раздел.</p>
          <div className="btn-row">
            <Link className="btn btn-primary" to="/">На главную</Link>
            <Link className="btn btn-ghost" to="/services">Услуги</Link>
            <Link className="btn btn-ghost" to="/work">Работы</Link>
          </div>
        </div>
      </section>
    </>
  )
}
