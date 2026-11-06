import { ViteReactSSG } from 'vite-react-ssg'
import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Project from './pages/Project'
import { cases } from './data/cases'
import NotFound from './pages/NotFound'
import Services from './pages/Services'
import Work from './pages/Work'
// Шрифты свои (не с Google): быстрее и приватнее
import '@fontsource/jura/latin-300.css'
import '@fontsource/jura/latin-500.css'
import '@fontsource/jura/latin-700.css'
import '@fontsource/jura/cyrillic-300.css'
import '@fontsource/jura/cyrillic-500.css'
import '@fontsource/jura/cyrillic-700.css'
import '@fontsource/nunito-sans/latin-300.css'
import '@fontsource/nunito-sans/latin-400.css'
import '@fontsource/nunito-sans/latin-600.css'
import '@fontsource/nunito-sans/latin-700.css'
import '@fontsource/nunito-sans/cyrillic-300.css'
import '@fontsource/nunito-sans/cyrillic-400.css'
import '@fontsource/nunito-sans/cyrillic-600.css'
import '@fontsource/nunito-sans/cyrillic-700.css'
import './styles/global.css'

const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'work', Component: Work },
      // страница каждого проекта: /work/studio, /work/shop и т. д.
      ...cases.map((c) => ({ path: `work/${c.id}`, Component: () => <Project id={c.id} /> })),
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: '404', Component: NotFound },
      { path: '*', Component: NotFound },
    ],
  },
]

// Если после новой публикации браузер держит старую страницу и не может загрузить обновлённый кусок кода,
// один раз перезагружаем страницу, чтобы подтянуть свежую версию (повторно не зацикливаемся)
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', () => {
    try {
      if (sessionStorage.getItem('reloaded-after-update')) return
      sessionStorage.setItem('reloaded-after-update', '1')
    } catch { /* без хранилища просто перезагрузим */ }
    window.location.reload()
  })
}

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
