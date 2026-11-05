import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Framer Motion: карточка проекта слегка приподнимается при наведении. */
export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}>
      {children}
    </motion.div>
  )
}
