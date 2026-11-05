import type { ReactNode } from 'react'

/** Панель кода в hero. Строки появляются по очереди средствами CSS (см. .code .ln). */
const lines: ReactNode[] = [
  <><span className="k">const</span> project = {'{'}</>,
  <>  goal: <span className="s">"заявки и продажи"</span>,</>,
  <>  pages: [<span className="s">"главная"</span>, <span className="s">"услуги"</span>],</>,
  <>  design: <span className="s">"mobile first"</span>,</>,
  <>  stack: [<span className="s">"Next.js"</span>, <span className="s">"TypeScript"</span>],</>,
  <>  seo: <span className="s">"с первого дня"</span>,</>,
  <>  speed: <span className="s">{'"LCP < 2.5 с"'}</span>,</>,
  <>  launch: <span className="s">"по плану"</span>,</>,
  <>{'};'}</>,
  <><span className="c">// готово к запуску</span><span className="caret" aria-hidden="true" /></>,
]

export function CodePanel() {
  return (
    <figure className="code" aria-label="Пример описания проекта в коде">
      <figcaption className="code__bar"><span>project.config.ts</span><span className="code__status">собрано</span></figcaption>
      <pre><code>
        {lines.map((l, i) => (
          <span className="ln" data-n={i + 1} style={{ '--i': i } as React.CSSProperties} key={i}>{l}</span>
        ))}
      </code></pre>
    </figure>
  )
}
