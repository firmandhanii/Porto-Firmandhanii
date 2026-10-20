import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

interface TiltProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees */
  maxTilt?: number
}

/** Floats gently and tilts toward the pointer (mouse and pen only). */
const Tilt = ({ children, className, maxTilt = 8 }: TiltProps) => {
  const reduced = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springX = useSpring(px, { stiffness: 150, damping: 18 })
  const springY = useSpring(py, { stiffness: 150, damping: 18 })
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt])
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt])

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={className}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      animate={reduced ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}

export default Tilt