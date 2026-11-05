import type { ReactNode } from 'react'

function Browser({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg className="shot" viewBox="0 0 640 400" role="img" aria-label={label}>
      <rect x="1" y="1" width="638" height="398" rx="16" fill="var(--surface)" stroke="var(--line)" />
      <path d="M1 44h638" stroke="var(--line)" />
      <circle cx="26" cy="23" r="5" fill="var(--line)" /><circle cx="44" cy="23" r="5" fill="var(--line)" /><circle cx="62" cy="23" r="5" fill="var(--line)" />
      <rect x="120" y="13" width="400" height="20" rx="10" fill="var(--bg-2)" />
      {children}
    </svg>
  )
}

const Bar = (p: { x: number; y: number; w: number; h?: number; o?: number; f?: string }) => (
  <rect x={p.x} y={p.y} width={p.w} height={p.h ?? 8} rx={4} fill={p.f ?? 'var(--muted)'} opacity={p.o ?? 0.6} />
)

export function MockStudio() {
  return (
    <Browser label="Схема корпоративного сайта студии: крупный заголовок, кнопка заявки, галерея проектов">
      <Bar x={40} y={84} w={270} h={16} f="var(--text)" o={0.9} />
      <Bar x={40} y={110} w={210} h={16} f="var(--text)" o={0.9} />
      <Bar x={40} y={146} w={250} /><Bar x={40} y={162} w={220} />
      <rect x="40" y="198" width="132" height="36" rx="10" fill="var(--accent)" />
      <rect x="344" y="72" width="256" height="188" rx="12" fill="var(--surface-2)" />
      <rect x="364" y="92" width="64" height="86" rx="6" fill="var(--bg-2)" />
      <rect x="444" y="92" width="136" height="40" rx="6" fill="var(--accent)" opacity=".35" />
      <rect x="364" y="196" width="216" height="44" rx="10" fill="var(--bg-2)" />
      <rect x="444" y="144" width="136" height="34" rx="6" fill="var(--bg-2)" />
      {[40, 235, 430].map((x) => (
        <g key={x}><rect x={x} y="290" width="170" height="80" rx="10" fill="var(--surface-2)" /><Bar x={x + 12} y={342} w={90} /></g>
      ))}
    </Browser>
  )
}

export function MockShop() {
  const tiles: ReactNode[] = []
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
    const x = 40 + c * 192, y = 76 + r * 150
    tiles.push(
      <g key={`${r}${c}`}>
        <rect x={x} y={y} width="176" height="104" rx="10" fill="var(--surface-2)" />
        <path d={`M${x + 70} ${y + 22}h36c6 0 10 6 8 12l-6 40c-1 6-5 10-10 10h-20c-5 0-9-4-10-10l-6-40c-2-6 2-12 8-12z`} fill="var(--accent)" opacity={0.35 + 0.15 * ((r + c) % 3)} />
        <Bar x={x} y={y + 114} w={110} f="var(--text)" o={0.85} />
        <Bar x={x} y={y + 130} w={56} f="var(--accent)" o={1} />
      </g>,
    )
  }
  return <Browser label="Схема интернет-магазина: сетка карточек товаров с ценой">{tiles}</Browser>
}

export function MockApp() {
  return (
    <Browser label="Схема личного кабинета: меню, показатели, график и таблица">
      <rect x="1" y="45" width="130" height="354" fill="var(--bg-2)" />
      <Bar x={20} y={68} w={70} h={10} f="var(--accent)" o={1} />
      <Bar x={20} y={102} w={88} /><Bar x={20} y={124} w={76} /><Bar x={20} y={146} w={92} />
      {[156, 312, 468].map((x, i) => (
        <g key={x}>
          <rect x={x} y="66" width="140" height="62" rx="10" fill="var(--surface-2)" />
          <Bar x={x + 14} y={82} w={50} />
          <Bar x={x + 14} y={100} w={[72, 60, 84][i]} h={14} f={i === 2 ? 'var(--accent)' : 'var(--text)'} o={i === 2 ? 1 : 0.85} />
        </g>
      ))}
      <rect x="156" y="146" width="452" height="130" rx="10" fill="var(--surface-2)" />
      <polyline points="176,250 230,226 280,236 336,196 392,208 450,172 510,186 586,160" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {[292, 318, 344].map((y) => <rect key={y} x="156" y={y} width="452" height="14" rx="4" fill="var(--surface-2)" />)}
    </Browser>
  )
}

export const mockups = { studio: MockStudio, shop: MockShop, app: MockApp }
