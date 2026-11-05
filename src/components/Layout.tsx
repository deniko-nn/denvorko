import { useEffect, useRef } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

const scrollToLocation = (hash: string) => {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (el) el.scrollIntoView()
  else window.scrollTo(0, 0)
}

/** Framer Motion: плавная смена страниц. Старая уходит, новая появляется, затем прокрутка к началу или якорю. */
export function Layout() {
  const outlet = useOutlet()
  const { pathname, hash } = useLocation()
  const prevPath = useRef(pathname)
  const hashRef = useRef(hash)
  hashRef.current = hash

  // Якорь на той же странице (например, клик по ссылке внутри страницы)
  useEffect(() => {
    if (prevPath.current === pathname) scrollToLocation(hash)
    prevPath.current = pathname
  }, [pathname, hash])

  // Прямой заход по ссылке с якорем
  useEffect(() => {
    if (hashRef.current) scrollToLocation(hashRef.current)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">Перейти к содержимому</a>
      <Header />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onAnimationStart={(def) => { if (typeof def === 'object' && 'y' in def) scrollToLocation(hashRef.current) }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>
  )
}
