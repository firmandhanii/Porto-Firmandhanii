import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { projectImages, type Project } from '../data/projects'
import SmartImage from './ui/SmartImage'
import ImageSlot from './ui/ImageSlot'
import { CloseIcon, ExternalIcon, GitHubIcon, LockIcon } from './ui/icons'

/**
 * Motion tokens for this drawer, matching the portfolio's existing system:
 * hover 160ms, pop 200ms, drawer 380ms with the soft drawer easing.
 * `MotionConfig reducedMotion="user"` in App.tsx disables transform
 * animations when the OS asks for reduced motion.
 */
export const DRAWER_DURATION = 0.38
export const DRAWER_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]

/** Screenshot gallery. Hides itself in production when no screenshot exists yet. */
const Gallery = ({ project }: { project: Project }) => {
  const { t } = useLanguage()
  const { shots } = projectImages(project.id)
  const [missing, setMissing] = useState<Set<string>>(() => new Set())

  if (!import.meta.env.DEV && missing.size === shots.length) return null

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">{t.projects.gallery}</h4>
      <div className="grid grid-cols-2 gap-3">
        {shots.map((src, i) => (
          <div
            key={src}
            className={`aspect-[16/10] overflow-hidden rounded-lg ${missing.has(src) && !import.meta.env.DEV ? 'hidden' : ''} ${
              i === 0 ? 'col-span-2' : ''
            }`}
          >
            <SmartImage
              sources={[src]}
              alt={`${project.title} screenshot ${i + 1}`}
              className="h-full w-full rounded-lg border border-line object-cover"
              onExhausted={() => setMissing((prev) => new Set(prev).add(src))}
              fallback={<ImageSlot path={src} label={`${t.projects.imagePending} ${i + 1}`} />}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface ProjectDrawerProps {
  project: Project | null
  onClose: () => void
}

/**
 * Slide-in case-study drawer (from the right). Closes on Escape, on the
 * backdrop, or on the close button, and returns focus to the element that
 * opened it. Only renders fields that already exist in `projects.ts` —
 * nothing is invented for projects without a link or screenshots.
 */
const ProjectDrawer = ({ project, onClose }: ProjectDrawerProps) => {
  const { t, l } = useLanguage()
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<Element | null>(null)

  // Remember what opened the drawer so focus can go back on close.
  useEffect(() => {
    if (project) triggerRef.current = document.activeElement
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus()
    }
  }, [project, onClose])

  const cs = project?.caseStudy
  const images = project ? projectImages(project.id) : null

  return (
    <AnimatePresence>
      {project && cs && images && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm motion-reduce:transition-none"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: DRAWER_DURATION, ease: DRAWER_EASE }}
            className="absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto border-l border-line bg-bg-card shadow-2xl sm:max-w-xl"
          >
            <div className="overflow-hidden bg-bg">
              <SmartImage
                sources={[images.cover, images.fallback]}
                alt={`${project.title} project cover`}
                className="aspect-[3/2] w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-md bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-soft">{project.category}</span>
                  <h3 id="drawer-title" className="mt-3 text-2xl font-bold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent-soft">{l(project.tagline)}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={t.projects.close}
                  className="shrink-0 rounded-full border border-line bg-bg p-2 text-text-secondary transition-colors duration-[160ms] hover:border-accent hover:text-accent-soft motion-reduce:transition-none"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm leading-6 text-text-secondary">{l(project.description)}</p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-soft">{t.projects.problem}</h4>
                  <p className="text-sm leading-6 text-text-secondary">{l(cs.problem)}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan">{t.projects.solution}</h4>
                  <p className="text-sm leading-6 text-text-secondary">{l(cs.solution)}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">{t.projects.architecture}</h4>
                <ul className="space-y-2">
                  {l(cs.architecture).map((step) => (
                    <li key={step} className="flex gap-3 text-sm text-text-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">{t.projects.results}</h4>
                <ul className="space-y-2">
                  {l(cs.results).map((r) => (
                    <li key={r} className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-sm text-text-secondary">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded bg-bg-hover px-2 py-1 text-xs text-text-secondary">
                    {tech}
                  </span>
                ))}
              </div>

              <Gallery project={project} />

              <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5">
                {project.githubRepo ? (
                  <a
                    href={`${profile.github}/${project.githubRepo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent-soft transition-colors duration-[160ms] hover:text-white motion-reduce:transition-none"
                  >
                    <GitHubIcon className="h-5 w-5" />
                    {t.projects.github}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                    <LockIcon className="h-4 w-4" />
                    {t.projects.private}
                  </span>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent-soft transition-colors duration-[160ms] hover:text-white motion-reduce:transition-none"
                  >
                    <ExternalIcon className="h-5 w-5" />
                    {t.projects.demo}
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectDrawer
