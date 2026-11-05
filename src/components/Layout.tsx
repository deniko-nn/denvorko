import { useEffect, useRef } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { Footer } from './Footer'
import { GlitchWipe, playGlitchWipe } from './GlitchWipe'
import { GridLines } from './GridLines'
import { IntroParticles } from './IntroParticles'
import { TopBar } from './TopBar'
import { TopographyBackground } from './TopographyBackground'

const scrollToLocation = (hash: string) => {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (el) el.scrollIntoView()
  else window.scrollTo(0, 0)
}

/**
 * Каркас всех страниц: фон Topography, сетка, HUD-шапка, глитч-полоса при переходах.
 * Смена страниц: старая гаснет, поверх пролетает глитч-полоса, новая появляется.
 */
export function Layout() {
  const outlet = useOutlet()
  const { pathname, hash } = useLocation()
  const prevPath = useRef(pathname)
  const hashRef = useRef(hash)
  hashRef.current = hash

  useEffect(() => {
    if (prevPath.current !== pathname) playGlitchWipe(1)
    else scrollToLocation(hash) // якорь на той же странице
    prevPath.current = pathname
  }, [pathname, hash])

  // Прямой заход по ссылке с якорем
  useEffect(() => {
    if (hashRef.current) scrollToLocation(hashRef.current)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <IntroParticles />
      <TopographyBackground />
      <GridLines />
      <GlitchWipe />
      <a className="skip" href="#main">Перейти к содержимому</a>
      <TopBar />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onAnimationStart={(def) => { if (typeof def === 'object' && (def as { opacity?: number }).opacity === 1) scrollToLocation(hashRef.current) }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>
  )
}
