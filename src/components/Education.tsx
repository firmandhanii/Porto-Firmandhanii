import { useLanguage } from '../i18n/LanguageContext'
import { educationList, certificationsList, trainingList } from '../data/education'
import Reveal from './ui/Reveal'

const Education = () => {
  const { t, l } = useLanguage()

  return (
    <section id="education" className="scroll-mt-24 border-t border-line bg-bg/75 py-20" aria-labelledby="education-heading">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="section-eyebrow">{t.education.eyebrow}</p>
          <h2 id="education-heading" className="text-3xl font-bold md:text-4xl">
            {t.education.heading}
          </h2>
        </Reveal>

        <Reveal className="mb-6">
          <h3 className="text-center text-xl font-bold text-text-primary">{t.education.educationHeading}</h3>
        </Reveal>

        <ol className="relative border-l border-line">
          {educationList.map((edu, i) => (
            <li key={edu.id} className="mb-10 ml-6 last:mb-0">
              <span
                className="absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent"
                aria-hidden="true"
              />
              <Reveal delay={i * 0.1}>
                <article className="rounded-xl border border-line bg-bg-card/60 p-6 transition-colors hover:border-accent/60">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{l(edu.degree)}</h3>
                      <p className="text-accent-soft">{l(edu.school)}</p>
                    </div>
                    <p className="text-sm text-text-muted">
                      {edu.start} – {edu.end}
                    </p>
                  </div>
                  {edu.detail && <p className="mb-3 text-sm font-medium text-text-primary">{edu.detail}</p>}
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {t.education.coursework}
                  </p>
                  <ul className="flex flex-wrap gap-2" aria-label={t.education.coursework}>
                    {edu.coursework.map((course) => (
                      <li key={course} className="rounded bg-bg-hover px-2 py-1 text-xs text-text-secondary">
                        {course}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14">
          <h3 className="mb-6 text-center text-xl font-bold text-text-primary">
            {t.education.certificationsHeading}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {certificationsList.map((cert) => (
              <article
                key={cert.id}
                className="flex flex-col rounded-xl border border-line bg-bg-card/60 p-5 transition-colors hover:border-accent/60"
              >
                <h4 className="text-base font-semibold text-text-primary">{cert.title}</h4>
                <p className="text-sm text-accent-soft">{cert.issuer}</p>
                <p className="mt-2 text-sm text-text-muted">{l(cert.issued)}</p>
                {cert.credentialId && (
                  <p className="mt-1 text-sm text-text-secondary">
                    {t.education.certificationId}: {cert.credentialId}
                  </p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    {t.education.showCredential} ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="mb-6 text-center text-xl font-bold text-text-primary">{t.education.trainingHeading}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {trainingList.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-line bg-bg-card/60 p-5 transition-colors hover:border-accent/60"
              >
                <h4 className="text-base font-semibold text-text-primary">{l(item.title)}</h4>
                <p className="text-sm text-accent-soft">{item.provider}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{l(item.note)}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-text-muted">{t.education.trainingNote}</p>
        </Reveal>
      </div>
    </section>
  )
}

export default Education
