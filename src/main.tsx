import type { ComponentType } from 'react'
import { ViteReactSSG } from 'vite-react-ssg'
import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import { cases } from './data/cases'
import Home from './pages/Home'
// Шрифты свои (не с Google): быстрее, приватнее и позволяют строгую политику безопасности
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

/** Страницы кроме главной загружаются отдельными файлами: первый заход быстрее. */
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({ Component: (await load()).default })

const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'services', lazy: page(() => import('./pages/Services')) },
      { path: 'work', lazy: page(() => import('./pages/Work')) },
      // страница каждого проекта: /work/studio, /work/shop и т. д.
      ...cases.map((c) => ({
        path: `work/${c.id}`,
        lazy: async () => {
          const { default: Project } = await import('./pages/Project')
          return { Component: () => <Project id={c.id} /> }
        },
      })),
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: '404', lazy: page(() => import('./pages/NotFound')) },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
]

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
