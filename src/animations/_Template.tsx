/**
 * Шаблон: как оборачивать присланный скрипт анимации в React-компонент.
 * Скопируйте файл, переименуйте (например, HeroWaves.tsx) и вставьте логику в useEffect.
 *
 * Правила:
 *  1. Всё, что трогает DOM или window, живёт внутри useEffect (на сервере при сборке этого кода нет).
 *  2. Всё, что запустили, останавливаем в функции очистки (return () => ...).
 *  3. При reduced === true показываем статичный результат без движения.
 *  4. Цвета берём из CSS-переменных (var(--accent), var(--text)), чтобы работали обе темы.
 */
import { useEffect, useRef } from 'react'
import { useReducedMotion } from './hooks'

export function AnimationTemplate({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // ↓↓↓ сюда попадает код из присланного скрипта (el вместо document.querySelector) ↓↓↓
    let frame = 0
    const tick = () => {
      // ...отрисовка кадра
      if (!reduced) frame = requestAnimationFrame(tick)
    }
    tick()
    // ↑↑↑

    return () => cancelAnimationFrame(frame)
  }, [reduced])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
