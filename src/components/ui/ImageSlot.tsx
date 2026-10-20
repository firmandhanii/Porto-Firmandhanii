import { ImageIcon } from './icons'

interface ImageSlotProps {
  /** Path where the image is expected, shown to help you drop the file in */
  path: string
  label: string
  className?: string
}

/**
 * Dashed placeholder for a missing image.
 * Visible only in development (`npm run dev`); renders nothing in production builds.
 */
const ImageSlot = ({ path, label, className = '' }: ImageSlotProps) => {
  if (!import.meta.env.DEV) return null

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-bg/60 p-4 text-center text-text-muted ${className}`}
    >
      <ImageIcon className="h-8 w-8" />
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      <code className="break-all text-[11px] text-accent-soft">public{path}</code>
    </div>
  )
}

export default ImageSlot
