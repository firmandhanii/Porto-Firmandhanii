import { useState, type ReactNode } from 'react'

interface SmartImageProps {
  /** Candidate sources, tried in order until one loads */
  sources: string[]
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  /** Rendered when every source fails */
  fallback?: ReactNode
  /** Called once when every source has failed */
  onExhausted?: () => void
}

/**
 * <img> that walks through a list of sources and shows a fallback when none exist.
 * Lets you drop real images into /public later without touching code.
 */
const SmartImage = ({ sources, alt, className, loading = 'lazy', fallback = null, onExhausted }: SmartImageProps) => {
  const [index, setIndex] = useState(0)

  if (index >= sources.length) return <>{fallback}</>

  return (
    <img
      key={sources[index]}
      src={sources[index]}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={() => {
        if (index + 1 >= sources.length) onExhausted?.()
        setIndex(index + 1)
      }}
    />
  )
}

export default SmartImage
