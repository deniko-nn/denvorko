import { useRef, type CSSProperties } from 'react'
import { animated, to, useSpring } from '@react-spring/web'
import { gsap, prefersReducedMotion, useGSAP } from '../animations/gsap'

const W = 560
const H = 380

const box = (x: number, y: number, w: number, h: number, extra?: CSSProperties): CSSProperties => ({ left: x, top: y, width: w, height: h, ...extra })

/**
 * Каркасная 3D-модель сайта в «разобранном» виде: слои страницы разнесены по глубине.
 * Жёлтым подсвечивается деталь, о которой говорит текущий слайд (active).
 * Наклон за курсором: React Spring. Сборка слоёв при загрузке: GSAP. Подсветка и глитч: CSS.
 */
export function WireframeScene({ active, glitch }: { active: number; glitch: number }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [sp, api] = useSpring(() => ({ rx: 0, ry: 0, config: { mass: 1, tension: 110, friction: 20 } }))

  useGSAP(() => {
    const el = wrap.current
    if (!el) return
    const fit = () => el.style.setProperty("--k", String(Math.min(el.clientWidth / (W + 60), 1.2)))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    const layers = gsap.utils.toArray<HTMLElement>('.wf-layer', el)
    if (prefersReducedMotion()) {
      layers.forEach((l) => l.style.setProperty('--zn', l.dataset.z ?? '0'))
    } else {
      gsap.fromTo(layers, { '--zn': 0, opacity: 0 }, { '--zn': (_i: number, t: HTMLElement) => Number(t.dataset.z), opacity: 1, duration: 1.6, ease: 'power3.out', stagger: 0.14, delay: 0.2 })
    }
    return () => ro.disconnect()
  }, { scope: wrap })

  // при смене слайда слои на мгновение «расходятся» шире
  useGSAP(() => {
    if (prefersReducedMotion() || !wrap.current) return
    const layers = gsap.utils.toArray<HTMLElement>('.wf-layer', wrap.current)
    gsap.fromTo(layers, { '--zs': 1.55 }, { '--zs': 1, duration: 0.9, ease: 'power3.out', stagger: 0.04 })
  }, { dependencies: [glitch], scope: wrap })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const r = e.currentTarget.getBoundingClientRect()
    api.start({ rx: -((e.clientY - r.top) / r.height - 0.5) * 14, ry: ((e.clientX - r.left) / r.width - 0.5) * 22 })
  }

  const hl = (n: number) => (active === n ? ' is-hl' : '')

  return (
    <div className="wf" ref={wrap} onPointerMove={onMove} onPointerLeave={() => api.start({ rx: 0, ry: 0 })} aria-hidden="true" key="wf">
      <div className="wf__idle">
        <animated.div className="wf__tilt" style={{ transform: to([sp.rx, sp.ry], (rx, ry) => `rotateX(${rx}deg) rotateY(${ry}deg)`) }}>
          <div className="wf__stage" style={{ width: W, height: H }}>
            <div className="wf-floor" />
            <div className="wf-layer wf-frame" data-z="0">
              <div className="wf-box" style={box(0, 0, W, H)} />
              <div className="wf-line" style={box(0, 36, W, 0)} />
              <i className="wf-dot" style={box(16, 14, 8, 8)} /><i className="wf-dot" style={box(32, 14, 8, 8)} /><i className="wf-dot" style={box(48, 14, 8, 8)} />
              <div className="wf-box wf-pill" style={box(120, 10, 320, 16)} />
            </div>
            <div className="wf-layer" data-z="34">
              <div className="wf-box" style={box(24, 52, 90, 18)} />
              {[300, 362, 424].map((x) => <div className="wf-box wf-thin" key={x} style={box(x, 58, 50, 6)} />)}
              <div className="wf-box" style={box(486, 48, 56, 24)} />
            </div>
            <div className="wf-layer" data-z="84">
              <div className="wf-box" style={box(40, 108, 260, 16)} />
              <div className="wf-box" style={box(40, 134, 200, 16)} />
              {[176, 190, 204].map((y, i) => <div className="wf-box wf-thin" key={y} style={box(40, y, [240, 220, 180][i], 5)} />)}
              <div className={`wf-box wf-cta${hl(0)}`} style={box(40, 238, 132, 40)} />
              <div className="wf-box wf-img" style={box(340, 100, 190, 156)} />
            </div>
            <div className="wf-layer" data-z="150">
              {[40, 205, 370].map((x) => (
                <div className={`wf-card${hl(3)}`} key={x} style={box(x, 298, 150, 64)}>
                  <div className="wf-circle" /><div className="wf-box wf-thin" style={box(52, 22, 80, 5)} /><div className="wf-box wf-thin" style={box(52, 36, 56, 5)} />
                </div>
              ))}
            </div>
            <div className="wf-layer" data-z="220">
              <div className={`wf-bubble${hl(1)}`} style={box(384, 128, 150, 62)}>
                <div className="wf-box wf-thin" style={box(14, 16, 100, 5)} /><div className="wf-box wf-thin" style={box(14, 30, 70, 5)} />
                <i style={box(110, 44, 4, 4)} /><i style={box(120, 44, 4, 4)} /><i style={box(130, 44, 4, 4)} />
              </div>
            </div>
            <div className="wf-layer" data-z="290">
              <div className={`wf-code${hl(2)}`} style={box(180, 150, 230, 90)}>{'</>'}</div>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  )
}
