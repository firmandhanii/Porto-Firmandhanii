import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { experiences } from '../data/experience'
import Reveal from './ui/Reveal'

const Experience = () => {
  const { t, l } = useLanguage()

  return (
    <section id="experience" className="scroll-mt-24 border-t border-line bg-bg-alt py-20" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="section-eyebrow">{t.experience.eyebrow}</p>
          <h2 id="experience-heading" className="text-3xl font-bold md:text-4xl">
            {t.experience.heading}
          </h2>
        </Reveal>

        <ol className="relative border-l border-line">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="mb-10 ml-6 last:mb-0">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.1 }}
                className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border-2 border-bg-alt bg-accent"
                aria-hidden="true"
              />
              <Reveal delay={i * 0.1}>
                <article className="rounded-xl border border-line bg-bg-card/60 p-6 transition-colors hover:border-accent/60">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{l(exp.role)}</h3>
                      <p className="text-accent-soft">{l(exp.company)}</p>
                    </div>
                    <p className="text-sm text-text-muted">
                      {exp.start} – {exp.end || t.experience.present}
                    </p>
                  </div>
                  <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm leading-6 text-text-secondary marker:text-accent">
                    {l(exp.highlights).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <ul className="flex flex-wrap gap-2" aria-label="Tech">
                    {exp.tech.map((tech) => (
                      <li key={tech} className="rounded bg-bg-hover px-2 py-1 text-xs text-text-secondary">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
