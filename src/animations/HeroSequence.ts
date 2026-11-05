import type { RefObject } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from './gsap'

/**
 * GSAP: единственная «режиссёрская» сцена при загрузке главной.
 * Порядок: абзац, кнопки и факты по очереди, панель кода, затем строки кода.
 * Заголовок анимирует отдельно React Bits SplitText.
 * Элементы с классом .gsap-hide скрыты в CSS до старта (с запасным показом через 3 секунды).
 */
export function useHeroSequence(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const hidden = root.querySelectorAll('.gsap-hide')
      const reveal = () => hidden.forEach((el) => el.classList.remove('gsap-hide'))
      if (prefersReducedMotion()) return reveal()

      const items = gsap.utils.toArray<HTMLElement>('.hero-item', root)
      const lines = gsap.utils.toArray<HTMLElement>('.code .ln', root)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.5)
        .fromTo('.code-wrap', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, 0.35)
        .fromTo(lines, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.09 }, 1)
      reveal()
    },
    { scope },
  )
}
