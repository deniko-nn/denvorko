// После сборки: sitemap.xml, robots.txt, 404.html и .nojekyll для GitHub Pages.
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'

const { url } = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8'))
const site = url.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

// страницы проектов берём из src/data/cases.ts (id: '...')
const casesSrc = readFileSync(new URL('../src/data/cases.ts', import.meta.url), 'utf8')
const ids = [...casesSrc.matchAll(/\bid: '([a-z0-9-]+)'/g)].map((m) => m[1])
const pages = [['/', '1.0'], ['/services/', '0.9'], ['/work/', '0.8'], ...ids.map((id) => [`/work/${id}/`, '0.6']), ['/about/', '0.7'], ['/contact/', '0.8']]
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map(([p, pr]) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n') + '\n</urlset>\n'

writeFileSync('dist/sitemap.xml', xml)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
writeFileSync('dist/.nojekyll', '')
if (!existsSync('dist/404.html') && existsSync('dist/404/index.html')) copyFileSync('dist/404/index.html', 'dist/404.html')


// Политика безопасности (CSP) для каждой страницы. GitHub Pages не позволяет задавать HTTP-заголовки,
// поэтому используем мета-тег. Политика мягкая и не мешает работе страницы в разных браузерах и расширениях:
// запрещает загрузку скриптов, стилей, шрифтов и данных с чужих сайтов, плагины (object), подмену базового
// адреса и отправку форм наружу. Встроенные скрипты разрешены (без жёсткой привязки к хэшам).
const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = `${dir}/${n}`
  return statSync(p).isDirectory() ? walk(p) : [p]
})
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self' data: blob:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')
let pagesWithCsp = 0
for (const file of walk('dist').filter((f) => f.endsWith('.html'))) {
  let html = readFileSync(file, 'utf8')
  if (!html.includes('<head>')) continue
  html = html.replace('<head>', `<head><meta http-equiv="Content-Security-Policy" content="${csp}">`)
  writeFileSync(file, html)
  pagesWithCsp++
}
console.log(`postbuild: sitemap, robots, 404 готовы; CSP добавлена на ${pagesWithCsp} страниц`)
