// После сборки: sitemap.xml, robots.txt, 404.html и .nojekyll для GitHub Pages.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'

const { url } = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8'))
const site = url.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const pages = [['/', '1.0'], ['/services/', '0.9'], ['/work/', '0.8'], ['/about/', '0.7'], ['/contact/', '0.8']]
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map(([p, pr]) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n') + '\n</urlset>\n'

writeFileSync('dist/sitemap.xml', xml)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
writeFileSync('dist/.nojekyll', '')
if (!existsSync('dist/404.html') && existsSync('dist/404/index.html')) copyFileSync('dist/404/index.html', 'dist/404.html')
console.log('postbuild: sitemap, robots, 404 готовы')
