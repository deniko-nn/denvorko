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

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
