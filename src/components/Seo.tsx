import { Head } from 'vite-react-ssg'
import { pageUrl, site } from '../data/site'

type Props = {
  title: string
  description: string
  path: string
  ogTitle?: string
  noindex?: boolean
  jsonLd?: object
}

/** Мета-теги, Open Graph и JSON-LD. Попадают в статический HTML при сборке. «<» в JSON-LD экранируется, чтобы данные не могли закрыть тег script. */
export function Seo({ title, description, path, ogTitle, noindex, jsonLd }: Props) {
  const url = pageUrl(path)
  const image = `${site.url}/assets/img/og.png`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="ru" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      <meta name="author" content="denvorko" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="denvorko" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="denvorko — веб-разработчик: сайты под ключ" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>}
    </Head>
  )
}
