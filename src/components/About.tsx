import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './ui/Reveal'

const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="scroll-mt-24 border-t border-line bg-bg-alt py-20" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <Reveal>
          <p className="section-eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-heading" className="text-3xl font-bold leading-tight md:text-4xl">
            {t.about.heading}
          </h2>
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-text-secondary">{t.about.body}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.about.focus.map((area, i) => (
              <Reveal key={area.title} delay={0.15 + i * 0.08}>
                <article className="h-full border-l-2 border-accent pl-4">
                  <h3 className="mb-2 font-semibold text-text-primary">{area.title}</h3>
                  <p className="text-sm leading-6 text-text-muted">{area.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
