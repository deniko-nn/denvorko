import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../animations/gsap'
import { useMotionOff } from '../animations/motion'
import ScrollReveal from '../animations/reactbits/ScrollReveal'

/**
 * React Bits ScrollReveal: крупное утверждение, слова которого проявляются из размытия по мере прокрутки.
 * Начало прокрутки-триггера: чуть выше центра окна (на 20 px), чтобы эффект успевал попасть в кадр.
 * При выключенных анимациях (и при «уменьшить движение», это учитывает сам компонент) показывается обычный текст.
 */
export function Statement({ children }: { children: string }) {
  const off = useMotionOff()
  // телефон: блок идёт сразу под кнопками первого экрана, поэтому проявление начинается, как только он появился в кадре
  const [phone, setPhone] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 959px)')
    const sync = () => setPhone(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  const start = phone ? 'top 88%' : 'top center-=20'
  const end = phone ? 'bottom 55%' : 'bottom center-=20'

  // после загрузки шрифтов высота блоков меняется: пересчитываем точки срабатывания
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <section className="section statement" aria-label="Главная мысль">
      <div className="container">
        {off
          ? <p className="scroll-reveal"><span className="scroll-reveal-text">{children}</span></p>
          : (
            <ScrollReveal tag="p" mode="scrub" splitBy="words" effect="fade" stagger={0.05} duration={0.8} smoothing={0}
              baseOpacity={0.1} baseRotation={3} baseOffset={0} enableBlur blurStrength={4}
              rotationStart={start} rotationEnd={end} wordAnimationStart={start} wordAnimationEnd={end}>
              {children}
            </ScrollReveal>
          )}
      </div>
    </section>
  )
}
