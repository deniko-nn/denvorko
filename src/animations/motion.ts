import { useSyncExternalStore } from 'react'

/** Переключатель «анимации вкл/выкл» (волна в шапке). Состояние хранится в localStorage и классе html.motion-off. */
const listeners = new Set<() => void>()

export const isMotionOff = () => typeof document !== 'undefined' && document.documentElement.classList.contains('motion-off')

export function setMotionOff(off: boolean) {
  document.documentElement.classList.toggle('motion-off', off)
  try { localStorage.setItem('motion', off ? 'off' : 'on') } catch { /* приватный режим */ }
  listeners.forEach((l) => l())
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

export const useMotionOff = () => useSyncExternalStore(subscribe, isMotionOff, () => false)
