import { TextRing } from './TextRing'

/**
 * Кольцо из бегущего текста со шуткой-фразой, полупрозрачное (50 %), вращается CSS.
 * Ставится сбоку секции, не рядом с кнопками. Фраза для скринридеров лежит в скрытом тексте.
 */
export function SideRing({ text }: { text: string }) {
  return (
    <div className="side-ring">
      <span className="visually-hidden">{text}</span>
      <TextRing rings={[{ text: `${text} ✦`, radius: 0.43, size: 0.058, color: 'var(--text)', duration: 56 }]} />
      <span className="side-ring__star" aria-hidden="true">✦</span>
    </div>
  )
}
