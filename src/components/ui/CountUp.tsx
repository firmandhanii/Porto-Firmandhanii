import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Display value such as "280+" or "10". The first integer is animated. */
  value: string
  duration?: number
  className?: string
}

const pattern = /^(\D*)(\d+)(.*)$/

/** Counts the first integer in `value` up from 0 once it scrolls into view. */
const CountUp = ({ value, duration = 1.4, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  const match = pattern.exec(value)
  const prefix = match?.[1] ?? ''
  const target = match ? Number(match[2]) : null
  const suffix = match?.[3] ?? ''

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || reduced || target === null) return
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduced, target, duration])

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduced ? target : count}
      {suffix}
    </span>
  )
}

export default CountUp