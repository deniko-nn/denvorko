# denvorko — сайт-портфолио веб-разработчика

React 19 + TypeScript + Vite. Страницы собираются в статический HTML (vite-react-ssg), поэтому поисковики видят весь текст и разметку, а React «оживляет» страницу в браузере.

## Команды
```bash
npm install        # один раз
npm run dev        # разработка: http://localhost:5173
npm run build      # сборка в папку dist (со статическими страницами, sitemap и robots)
npm run typecheck  # проверка типов
```

## Структура
- `src/pages` — страницы (Home, Services, Work, About, Contact, NotFound).
- `src/components` — HUD-шапка и меню, первый экран со слайдами и каркасной моделью, глитч-переходы, подвал, CTA, FAQ, макеты проектов, SEO-компонент.
- `src/data` — тексты и данные: услуги, кейсы, FAQ, Schema.org, контакты. Правьте здесь. Проекты (`cases.ts`): у каждого своя страница `/work/<id>`; обложки лежат в `public/assets/projects/<id>.svg`.
- `src/styles/global.css` — дизайн-система в стиле «иммерсивный HUD» (токены цветов, отступов, шрифтов в начале файла). Сайт тёмный, переключения тем нет.
- `src/animations` — место для анимаций (см. README внутри).
- `site.config.json` — адрес сайта, почта, Telegram, GitHub.
- `public` — картинки, манифест. Файл `public/CNAME` с доменом включает режим своего домена.

## Публикация (GitHub Pages)
Один раз: **Settings → Pages → Source: GitHub Actions**. Дальше каждый пуш в `main` собирает и публикует сайт (`.github/workflows/deploy.yml`).

## Что заменить перед запуском
1. Адрес сайта в `site.config.json` (сейчас адрес GitHub Pages). С своим доменом: поменять `url`, добавить `public/CNAME`.
2. Почта и Telegram в `site.config.json` (сейчас заглушки).
3. Кейсы (`src/data/cases.ts`), сроки и условия (`src/data/services.ts`), опыт и навыки (`src/pages/About.tsx`).
4. Подключить Яндекс Метрику и Search Console, отправить `sitemap.xml`.

## Патч vite-react-ssg
Папка `patches/` содержит правку библиотеки (применяется автоматически после `npm install` через `patch-package`): при ошибке загрузки служебного JSON сайт не падает, а продолжает работать. Без неё пользователь с закэшированной старой версией после нового деплоя видел «Unexpected Application Error».
