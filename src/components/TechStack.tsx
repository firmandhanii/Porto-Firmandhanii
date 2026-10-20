import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './ui/Reveal'

const techCategories = [
  {
    name: 'AI & MCP',
    dot: 'bg-accent',
    items: ['Python', 'FastAPI', 'Google Gemini API', 'Model Context Protocol', 'Vector DB', 'LangChain'],
  },
  {
    name: 'Trading & Data',
    dot: 'bg-emerald-400',
    items: ['CCXT', 'MetaTrader API', 'Pandas', 'TA-Lib', 'Backtesting'],
  },
  {
    name: 'Web & Frontend',
    dot: 'bg-cyan',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
  },
  {
    name: 'Automation & DevOps',
    dot: 'bg-pink-400',
    items: ['n8n', 'Node.js', 'Docker', 'Telegram Bot API', 'IMAP/SMTP', 'GitHub Actions'],
  },
]

const TechStack = () => {
  const { t } = useLanguage()

  return (
    <section id="stack" className="scroll-mt-24 border-t border-line bg-bg-alt py-20" aria-labelledby="stack-heading">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 id="stack-heading" className="mb-12 text-center text-3xl font-bold md:text-4xl">
            {t.stack.heading}
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {techCategories.map((category, i) => (
            <Reveal key={category.name} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-line bg-bg-card/50 p-6 transition-colors hover:border-accent/50">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text-primary">
                  <span className={`h-2.5 w-2.5 rounded-full ${category.dot}`} aria-hidden="true" />
                  {category.name}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((tech, j) => (
                    <motion.li
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.15 + j * 0.04 } }}
                      whileHover={{ y: -3, scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                      viewport={{ once: true, margin: '-40px' }}
                      className="rounded-lg border border-line bg-bg px-3 py-1 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent-soft"
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
