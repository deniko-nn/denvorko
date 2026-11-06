import { useEffect } from 'react'
import { ScrollTrigger } from '../animations/gsap'
import { useMotionOff } from '../animations/motion'
import ScrollReveal from '../animations/reactbits/ScrollReveal'

/**
 * React Bits ScrollReveal: крупное утверждение, слова которого проявляются из размытия по мере прокрутки.
 * При выключенных анимациях (и при «уменьшить движение», это учитывает сам компонент) показывается обычный текст.
 */
export function Statement({ children }: { children: string }) {
  const off = useMotionOff()

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
              baseOpacity={0.1} baseRotation={3} baseOffset={0} enableBlur blurStrength={4}>
              {children}
            </ScrollReveal>
          )}
      </div>
    </section>
  )
}
