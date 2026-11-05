import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { isMotionOff } from './motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }

/** true, если пользователь просит меньше движения или выключил анимации на сайте. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMotionOff())
