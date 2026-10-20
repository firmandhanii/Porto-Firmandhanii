import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { projectImages, type Project, type ProjectCategory } from '../data/projects'
import Reveal from './ui/Reveal'
import SmartImage from './ui/SmartImage'
import ImageSlot from './ui/ImageSlot'
import { ChevronIcon, ExternalIcon, GitHubIcon, LockIcon } from './ui/icons'

const categories: Array<ProjectCategory | 'All'> = ['All', 'AI', 'Trading', 'Web', 'Tools']

/** Screenshot gallery. Hides itself in production when no screenshot exists yet. */
const Gallery = ({ project }: { project: Project }) => {
  const { t } = useLanguage()
  const { shots } = projectImages(project.id)
  const [missing, setMissing] = useState<Set<string>>(() => new Set())

  if (!import.meta.env.DEV && missing.size === shots.length) return null

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">{t.projects.gallery}</h4>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {shots.map((src, i) => (
          <div
            key={src}
            className={`aspect-[16/10] overflow-hidden rounded-lg ${missing.has(src) && !import.meta.env.DEV ? 'hidden' : ''} ${
              i === 0 ? 'col-span-2 lg:col-span-1' : ''
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

const CaseStudy = ({ project }: { project: Project }) => {
  const { t, l } = useLanguage()
  const cs = project.caseStudy

  return (
    <div className="grid gap-8 border-t border-line p-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
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
      </div>
      <Gallery project={project} />
    </div>
  )
}

const ProjectCard = ({ project, expanded, onToggle }: { project: Project; expanded: boolean; onToggle: () => void }) => {
  const { t, l } = useLanguage()
  const images = projectImages(project.id)
  const panelId = `case-study-${project.id}`

  return (
    <motion.article
      id={`card-${project.id}`}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ layout: { duration: 0.4, ease: 'easeInOut' }, duration: 0.25 }}
      className={`group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border bg-bg-card transition-colors ${
        expanded
          ? 'border-accent shadow-xl shadow-accent/10 md:col-span-2 lg:col-span-3'
          : 'border-line hover:border-accent/70 hover:shadow-lg hover:shadow-accent/10'
      }`}
    >
      <motion.div layout="position" className={expanded ? 'grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]' : ''}>
        <div className={`overflow-hidden bg-bg ${expanded ? 'aspect-[3/2] md:aspect-auto md:h-full' : 'aspect-[3/2] border-b border-line'}`}>
          <SmartImage
            sources={[images.cover, images.fallback]}
            alt={`${project.title} project cover`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>

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
                  className="text-text-secondary transition-colors hover:text-accent-soft"
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
                  className="text-text-secondary transition-colors hover:text-accent-soft"
                >
                  <ExternalIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <h3 className="mb-1 text-xl font-bold text-text-primary">{project.title}</h3>
          <p className="mb-3 text-sm text-accent-soft">{l(project.tagline)}</p>
          <p className="mb-5 flex-1 text-sm leading-6 text-text-secondary">{l(project.description)}</p>

          {!expanded && (
            <div className="mb-5 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded bg-bg-hover px-2 py-1 text-xs text-text-secondary">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent-soft transition-colors hover:text-white"
          >
            {expanded ? t.projects.closeCaseStudy : t.projects.viewCaseStudy}
            <ChevronIcon className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <CaseStudy project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  const handleToggle = (id: string) => {
    const opening = expandedId !== id
    setExpandedId(opening ? id : null)
    if (opening) {
      // Wait for the layout animation, then bring the expanded card into view
      window.setTimeout(() => {
        document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 420)
    }
  }

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line bg-bg py-20" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 text-center">
          <p className="section-eyebrow">{t.projects.eyebrow}</p>
          <h2 id="projects-heading" className="text-3xl font-bold md:text-4xl">
            {t.projects.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">{t.projects.subheading}</p>
        </Reveal>

        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              onClick={() => {
                setFilter(cat)
                setExpandedId(null)
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                filter === cat ? 'bg-accent text-white' : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
              }`}
            >
              {cat === 'All' ? t.projects.all : cat}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  expanded={expandedId === project.id}
                  onToggle={() => handleToggle(project.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

export default FeaturedProjects
