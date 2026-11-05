import { Link } from 'react-router-dom'
import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="logo" to="/" aria-label="denvorko — на главную">denvorko</Link>
            <p>Веб-разработчик. Делаю сайты и веб-приложения под ключ: от идеи и дизайна до запуска и поддержки.</p>
          </div>
          <div>
            <h2>Разделы</h2>
            <ul>
              <li><Link to="/services">Услуги и сроки</Link></li>
              <li><Link to="/work">Работы и кейсы</Link></li>
              <li><Link to="/about">Обо мне и резюме</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h2>Связаться</h2>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.telegram} rel="noopener">Telegram {site.telegramHandle}</a></li>
              <li><a href={site.github} rel="noopener">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <span>© {new Date().getFullYear()} denvorko. Все права защищены.</span>
          <span>Работаю удалённо, на русском языке.</span>
          <a href="#main" className="to-top">Наверх</a>
        </div>
      </div>
    </footer>
  )
}
