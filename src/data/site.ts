import config from '../../site.config.json'

export const site = {
  url: config.url.replace(/\/$/, ''),
  email: config.email,
  telegram: config.telegram,
  telegramHandle: config.telegramHandle,
  github: config.github,
  name: 'denvorko',
}

export const nav = [
  { to: '/services', label: 'Услуги' },
  { to: '/work', label: 'Работы' },
  { to: '/about', label: 'Обо мне' },
  { to: '/contact', label: 'Контакты' },
]

/** Абсолютный адрес страницы для canonical и Open Graph (со слэшем на конце). */
export const pageUrl = (path: string) => `${site.url}${path === '/' ? '/' : path.replace(/\/?$/, '/')}`
