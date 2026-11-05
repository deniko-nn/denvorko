import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

/** При переходе: к началу страницы или к якорю (#landing). */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function Layout() {
  return (
    <>
      <a className="skip" href="#main">Перейти к содержимому</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <ScrollManager />
    </>
  )
}
