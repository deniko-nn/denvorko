import { Link } from 'react-router-dom'
import { TextRing } from './TextRing'

/**
 * Два концентрических кольца из бегущего текста вокруг круглой кнопки:
 * внешнее белое по часовой, внутреннее жёлтое против. Полупрозрачные, при наведении мышью замедляются.
 * Отключаются переключателем анимаций в шапке (волна).
 */
export function CtaRing() {
  return (
    <div className="ring">
      <TextRing rings={[
        { text: 'Напишите мне ✦ Отвечу за один рабочий день ✦', radius: 0.43, size: 0.058, color: 'var(--text)', duration: 48 },
        { text: 'Сайты ✦ Магазины ✦ Приложения ✦ SEO ✦', radius: 0.295, size: 0.05, color: '#ffe11a', duration: 36, reverse: true },
      ]} />
      <Link className="ring__btn" to="/contact" aria-label="Обсудить проект">
        <span>Обсудить проект</span>
        <svg viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 6h37M33 1.5L38 6l-5 4.5" /></svg>
      </Link>
    </div>
  )
}
