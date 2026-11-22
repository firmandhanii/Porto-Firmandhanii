import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { projectImages, type Project, type ProjectCategory } from '../data/projects'
import Reveal from './ui/Reveal'
import SmartImage from './ui/SmartImage'
import ProjectDrawer from './ProjectDrawer'
import { ChevronIcon, ExternalIcon, GitHubIcon, LockIcon } from './ui/icons'

const categories: Array<ProjectCategory | 'All'> = ['All', 'AI', 'Trading', 'Web', 'Tools']

/** Motion token shared with the drawer: hover 160ms (pop 200ms lives in the drawer). */
const HOVER_MS = 'duration-[160ms]'

const pad = (n: number) => String(n).padStart(2, '0')

const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
}) => {
  const { t, l } = useLanguage()
  const images = projectImages(project.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.06, ease: 'easeOut' }}
      className="group flex w-[82vw] max-w-[420px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-line bg-bg-card transition-colors duration-[160ms] hover:border-accent/70 hover:shadow-lg hover:shadow-accent/10 sm:w-[400px] motion-reduce:transition-none"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`${t.projects.openCaseStudy}: ${project.title}`}
        className="block w-full overflow-hidden bg-bg text-left"
      >
        <SmartImage
          sources={[images.cover, images.fallback]}
          alt={`${project.title} project cover`}
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-md bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-soft">{project.category}</span>
          <div className="flex items-center gap-3">
            {project.githubRepo ? (
              <a
                href={`${profile.github}/${project.githubRepo}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.projects.github}: ${project.title}`}
                title={t.projects.github}
                className={`text-text-secondary transition-colors ${HOVER_MS} hover:text-accent-soft motion-reduce:transition-none`}
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            ) : (
              <span className="flex items-center gap-1 text-xs text-text-muted" title={t.projects.private}>
                <LockIcon className="h-4 w-4" />
                <span className="sr-only">{t.projects.private}</span>
              </span>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.projects.demo}: ${project.title}`}
                title={t.projects.demo}
                className={`text-text-secondary transition-colors ${HOVER_MS} hover:text-accent-soft motion-reduce:transition-none`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="mb-1 text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="mb-3 text-sm text-accent-soft">{l(project.tagline)}</p>
        <p className="mb-5 flex-1 text-sm leading-6 text-text-secondary">{l(project.description)}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded bg-bg-hover px-2 py-1 text-xs text-text-secondary">
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`${t.projects.openCaseStudy}: ${project.title}`}
          className={`inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent-soft transition-colors ${HOVER_MS} hover:text-white motion-reduce:transition-none`}
        >
          {t.projects.viewCaseStudy}
          <ChevronIcon className="h-4 w-4 -rotate-90" />
        </button>
      </div>
    </motion.article>
  )
}

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, dragged: false })

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const total = filteredProjects.length

  const reducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const updateActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return
    let best = 0
    let bestDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.scrollLeft)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setActiveIndex(best)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', updateActive, { passive: true })
    return () => track.removeEventListener('scroll', updateActive)
  }, [updateActive])

  // Reset the gallery when the filter changes.
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: 'auto' })
    setActiveIndex(0)
    setSelected(null)
  }, [filter])

  const step = useCallback((dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>(':scope > *')
    const stepWidth = (card?.offsetWidth ?? 400) + 24
    track.scrollBy({ left: dir * stepWidth, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [])

  const progress = total > 1 ? activeIndex / (total - 1) : 1

  return (
    <section id="projects" className="scroll-mt-24 overflow-hidden border-t border-line bg-bg/75 py-20" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 text-center">
          <p className="section-eyebrow">{t.projects.eyebrow}</p>
          <h2 id="projects-heading" className="text-3xl font-bold md:text-4xl">
            {t.projects.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">{t.projects.subheading}</p>
        </Reveal>

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${HOVER_MS} motion-reduce:transition-none ${
                filter === cat ? 'bg-accent text-white' : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
              }`}
            >
              {cat === 'All' ? t.projects.all : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm text-text-muted">{t.projects.scrollHint}</p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-text-muted" aria-live="polite">
              {pad(activeIndex + 1)} / {pad(total)}
            </span>
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={activeIndex === 0}
              aria-label={t.projects.previous}
              className={`rounded-full border border-line bg-bg-card p-2 text-text-secondary transition-all ${HOVER_MS} hover:border-accent hover:text-accent-soft disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none`}
            >
              <ChevronIcon className="h-5 w-5 rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={activeIndex >= total - 1}
              aria-label={t.projects.next}
              className={`rounded-full border border-line bg-bg-card p-2 text-text-secondary transition-all ${HOVER_MS} hover:border-accent hover:text-accent-soft disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none`}
            >
              <ChevronIcon className="h-5 w-5 -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <div
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 pt-1 [scrollbar-width:none] motion-reduce:snap-none"
          role="region"
          aria-label={t.projects.heading}
          onPointerDown={(e) => {
            // Drag-to-scroll with the mouse; touch swipe stays native.
            if (e.pointerType !== 'mouse') return
            dragRef.current = { down: true, startX: e.clientX, startScroll: trackRef.current?.scrollLeft ?? 0, dragged: false }
          }}
          onPointerMove={(e) => {
            const drag = dragRef.current
            const track = trackRef.current
            if (!drag.down || !track) return
            const dx = e.clientX - drag.startX
            if (Math.abs(dx) > 6) drag.dragged = true
            if (drag.dragged) track.scrollLeft = drag.startScroll - dx
          }}
          onPointerUp={() => {
            dragRef.current.down = false
          }}
          onPointerLeave={() => {
            dragRef.current.down = false
          }}
          onClickCapture={(e) => {
            // A drag is not a click: swallow the click that ends a drag.
            if (dragRef.current.dragged) {
              e.preventDefault()
              e.stopPropagation()
              dragRef.current.dragged = false
            }
          }}
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={setSelected} />
          ))}
        </div>

        <div className="px-6 pt-5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-bg-hover" role="progressbar" aria-valuenow={activeIndex + 1} aria-valuemin={1} aria-valuemax={total} aria-label={t.projects.heading}>
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${Math.max(progress * 100, total > 1 ? 8 : 100)}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default FeaturedProjects
