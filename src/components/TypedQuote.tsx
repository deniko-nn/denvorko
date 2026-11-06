import { useMotionOff } from '../animations/motion'
import TextType from '../animations/reactbits/TextType'

/**
 * React Bits TextType в режиме «печатная машинка»: фраза набирается по буквам один раз,
 * когда блок появляется в кадре, и остаётся на месте. Место под весь текст зарезервировано
 * невидимой копией, поэтому вёрстка не прыгает. При выключенных анимациях показывается готовый текст.
 */
export function TypedQuote({ text }: { text: string }) {
  const off = useMotionOff()
  return (
    <blockquote className="typed-quote">
      {off ? (
        <p>{text}</p>
      ) : (
        <div className="typed-quote__box">
          <p className="typed-quote__ghost" aria-hidden="true">{text}</p>
          <TextType
            as="p"
            className="typed-quote__text"
            text={text}
            typingSpeed={62}
            initialDelay={250}
            loop={false}
            startOnVisible
            showCursor
            cursorStyle="bar"
            cursorGlide
            typeEffect="none"
          />
        </div>
      )}
    </blockquote>
  )
}
