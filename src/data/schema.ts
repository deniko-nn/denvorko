import { pageUrl, site } from './site'
import type { Qa } from './faq'

const url = site.url
export const personId = `${url}/#person`
export const businessId = `${url}/#business`

export const person = {
  '@type': 'Person', '@id': personId, name: 'denvorko', alternateName: 'Denvorko', jobTitle: 'Веб-разработчик',
  url: `${url}/`, sameAs: [site.github, site.telegram],
  knowsAbout: ['Веб-разработка', 'Разработка сайтов под ключ', 'Адаптивная вёрстка', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'SEO-оптимизация сайтов', 'Core Web Vitals', 'UX и интерфейсы', 'Искусственный интеллект в разработке'],
}

export const business = {
  '@type': 'ProfessionalService', '@id': businessId, name: 'denvorko — разработка сайтов', url: `${url}/`,
  image: `${url}/assets/img/og.png`, email: site.email,
  description: 'Разработка сайтов и веб-приложений под ключ: лендинги, корпоративные сайты, интернет-магазины, личные кабинеты, ускорение и SEO-основа.',
  founder: { '@id': personId }, areaServed: 'Удалённо', knowsLanguage: 'ru', sameAs: [site.github, site.telegram],
}

export const website = { '@type': 'WebSite', '@id': `${url}/#website`, url: `${url}/`, name: 'denvorko', inLanguage: 'ru', publisher: { '@id': personId } }

export const breadcrumb = (path: string, name: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${url}/` },
    { '@type': 'ListItem', position: 2, name, item: pageUrl(path) },
  ],
})

export const faqSchema = (items: Qa[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
})

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })
