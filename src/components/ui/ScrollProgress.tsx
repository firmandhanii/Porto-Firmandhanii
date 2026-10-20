import { motion, useScroll, useSpring } from 'motion/react'

/** Thin gradient bar fixed to the top of the page that tracks scroll progress. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-cyan"
    />
  )
}

export default ScrollProgress