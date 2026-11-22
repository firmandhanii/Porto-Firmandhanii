import { useLanguage } from '../i18n/LanguageContext'
import { freelanceLinks, services } from '../data/services'
import Reveal from './ui/Reveal'

const Services = () => {
  const { t, l } = useLanguage()

  return (
    <section id="services" className="scroll-mt-24 border-t border-line bg-bg-alt py-20" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="section-eyebrow">{t.services.eyebrow}</p>
          <h2 id="services-heading" className="text-3xl font-bold md:text-4xl">
            {t.services.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">{t.services.subheading}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-bg-card/60 p-6 transition-colors hover:border-accent/60">
                <h3 className="mb-2 text-lg font-semibold text-text-primary">{l(service.title)}</h3>
                <p className="mb-4 flex-1 text-sm leading-6 text-text-secondary">{l(service.description)}</p>

                <ul className="mb-5 space-y-1.5">
                  {l(service.features).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-text-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {service.tiers ? (
                  <div className="overflow-hidden rounded-lg border border-line">
                    {service.tiers.map((tier, j) => (
                      <div
                        key={tier.name}
                        className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm ${
                          j > 0 ? 'border-t border-line' : ''
                        } ${j === 1 ? 'bg-accent/10' : ''}`}
                      >
                        <span className="font-semibold text-text-primary">{tier.name}</span>
                        <span className="text-text-secondary">
                          {tier.fastworkPrice} <span className="text-text-muted">/ {tier.fiverrPrice}</span>
                        </span>
                      </div>
                    ))}
                    <p className="border-t border-line bg-bg px-4 py-2 text-xs text-text-muted">
                      {t.services.priceNote}
                    </p>
                  </div>
                ) : (
                  <p className="rounded-lg border border-line bg-bg px-4 py-3 text-center text-sm font-semibold text-accent-soft">
                    {t.services.quote}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="mb-4 text-sm text-text-muted">{t.services.orderVia}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={freelanceLinks.fastwork} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Fastwork
            </a>
            <a href={freelanceLinks.fiverr} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Fiverr
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Services
