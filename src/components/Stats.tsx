import { useLanguage } from '../i18n/LanguageContext'
import { stats } from '../data/profile'
import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'

type Stat = { key: string; value: string | '' }

const Stats = () => {
  const { t } = useLanguage()
  const visible = (stats as unknown as Stat[]).filter((s) => s.value !== '')

  if (visible.length === 0) return null

  return (
    <section className="border-t border-line bg-bg py-14" aria-label="Highlights">
      <div className="mx-auto max-w-6xl px-6">
        <dl className={`grid grid-cols-2 gap-8 ${visible.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {visible.map((stat, i) => (
            <Reveal key={stat.key} delay={(i as number) * 0.08} className="flex flex-col-reverse text-center">
              <dt className="text-sm text-text-secondary">{t.stats[stat.key as keyof typeof t.stats]}</dt>
              <dd className="text-gradient mb-2 text-4xl font-extrabold md:text-5xl">
                <CountUp value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Stats
