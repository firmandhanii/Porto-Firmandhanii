import { AnimatePresence, animate, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'

/** Seconds the 0-100% count takes. */
const COUNT_DURATION = 1.8
/** Pause at 100% before the curtain lifts, in milliseconds. */
const HOLD_MS = 250

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Full-screen intro: counts 0-100% with a progress bar, then lifts like a curtain.
 * Skipped entirely when the OS asks for reduced motion.
 * To remove: delete <Preloader /> from App.tsx and this file.
 */
const Preloader = () => {
  const [visible, setVisible] = useState(() => !prefersReducedMotion())
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) return

    document.body.style.overflow = 'hidden'
    let hideTimer: number | undefined
    const controls = animate(0, 100, {
      duration: COUNT_DURATION,
      ease: 'easeInOut',
      onUpdate: (value) => setProgress(Math.round(value)),
      onComplete: () => {
        hideTimer = window.setTimeout(() => setVisible(false), HOLD_MS)
      },
    })

    return () => {
      controls.stop()
      window.clearTimeout(hideTimer)
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          exit={{ y: '-100%', transition: { duration: 0.7, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg px-6"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
          </div>

          <p className="relative mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-accent-soft" aria-hidden="true">
            {profile.name}
          </p>

          <p className="text-gradient relative text-7xl font-extrabold tabular-nums md:text-9xl" aria-hidden="true">
            {progress}
            <span className="text-3xl md:text-5xl">%</span>
          </p>

          <div className="relative mt-8 h-0.5 w-full max-w-xs overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div
              className="h-full origin-left bg-gradient-to-r from-accent to-cyan"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>

          <span className="sr-only">Loading {progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader