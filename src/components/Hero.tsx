import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import SmartImage from './ui/SmartImage'
import Tilt from './ui/Tilt'
import { DownloadIcon, WhatsAppIcon } from './ui/icons'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const InitialsAvatar = () => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-cyan text-6xl font-extrabold text-white">
    {profile.initials}
  </div>
)

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section id="top" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 28, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-cyan/10 blur-3xl"
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.3fr_0.7fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center md:text-left">
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-bg-card/60 px-4 py-1.5 text-sm text-text-secondary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.hero.available}
          </motion.p>

          <motion.h1 variants={item} className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="block text-lg font-medium text-text-secondary md:text-xl">{t.hero.greeting}</span>
            <span className="text-text-primary">{profile.name}</span>
          </motion.h1>

          <motion.p variants={item} className="text-gradient mb-6 text-2xl font-bold md:text-3xl">
            {t.hero.role}
          </motion.p>

          <motion.p variants={item} className="mx-auto mb-6 max-w-xl text-lg leading-8 text-text-secondary md:mx-0">
            {t.hero.summary}
          </motion.p>

          <motion.ul variants={item} className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
            {t.hero.badges.map((badge) => (
              <li key={badge} className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent-soft">
                {badge}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <a href="#projects" className="btn-primary">
              {t.hero.viewProjects}
            </a>
            <a href="#contact" className="btn-secondary">
              {t.hero.contact}
            </a>
            {profile.wa && (
              <a href={`https://wa.me/62${profile.wa.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <WhatsAppIcon className="h-4 w-4" />
                {t.hero.whatsApp}
              </a>
            )}
            {profile.cv && (
              <a href={profile.cv} download className="btn-secondary">
                <DownloadIcon className="h-4 w-4" />
                {t.hero.downloadCv}
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto w-56 md:w-full md:max-w-xs"
        >
          <Tilt className="relative">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-accent to-cyan opacity-60 blur-lg" aria-hidden="true" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-bg-card">
              <SmartImage
                sources={[profile.avatar]}
                alt={profile.name}
                loading="eager"
                className="h-full w-full object-cover object-top"
                fallback={<InitialsAvatar />}
              />
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
