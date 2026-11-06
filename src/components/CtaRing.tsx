import { Link } from 'react-router-dom'
import { useMotionOff } from '../animations/motion'
import TextLoop from '../animations/reactbits/TextLoop'

/**
 * React Bits TextLoop: кольцо из бегущего текста (белое) и пересекающий его эллипс (жёлтый)
 * вокруг круглой кнопки. Кольцо можно «крутить» рукой, при наведении оно замедляется,
 * при прокрутке страницы разгоняется. Отключается переключателем анимаций в шапке.
 */
export function CtaRing() {
  const off = useMotionOff()
  return (
    <div className="ring">
      <div className="ring__loop" aria-hidden="true">
        <TextLoop
          text="Напишите мне ✦ Отвечу за один рабочий день"
          shape="circle"
          speed={off ? 0 : 55}
          direction="forward"
          separator="✦"
          curviness={120}
          fontSize={30}
          fontWeight={600}
          letterSpacing={3}
          uppercase
          ribbon={false}
          cross
          crossAngle={30}
          crossColor="#ffe11a"
          draggable={!off}
          scrollBoost={off ? 0 : 0.5}
          pauseOnHover
        />
      </div>
      <Link className="ring__btn" to="/contact" aria-label="Обсудить проект">
        <span>Обсудить проект</span>
        <svg viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 6h37M33 1.5L38 6l-5 4.5" /></svg>
      </Link>
    </div>
  )
}
