import { useMotionOff } from '../animations/motion'
import TextType from '../animations/reactbits/TextType'

/**
 * React Bits TextType: строка, в которой варианты задач печатаются и стираются
 * (с редкими опечатками, как у живого человека). Все варианты есть в тексте для скринридеров.
 * При выключенных анимациях показывается первый вариант без печати.
 */
export function TypedLine({ prefix, phrases }: { prefix: string; phrases: string[] }) {
  const off = useMotionOff()
  return (
    <p className="typed-line">
      <span className="typed-line__prefix">{prefix}</span>{' '}
      {off ? (
        <span className="typed-line__text">{phrases[0]}</span>
      ) : (
        <TextType
          as="span"
          className="typed-line__text"
          text={phrases}
          typingSpeed={65}
          deletingSpeed={35}
          pauseDuration={1800}
          deleteMode="backspace"
          typeEffect="fade"
          mistakes={0.2}
          cursorStyle="bar"
          cursorGlide
          showCursor
        />
      )}
    </p>
  )
}
