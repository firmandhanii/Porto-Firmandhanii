import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { GitHubIcon, WhatsAppIcon } from './ui/icons'

const sectionIds = ['about', 'experience', 'projects', 'stack', 'contact'] as const

/** Tracks which section is currently in the middle of the viewport. */
const useActiveSection = () => {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return active
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, toggleLang } = useLanguage()
  const active = useActiveSection()

  const closeMenu = () => setMenuOpen(false)
  const links = sectionIds.map((id) => ({ id, name: t.nav[id] }))

  const langToggle = (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.nav.switchLang}
      className="flex items-center rounded-full border border-line p-0.5 text-xs font-semibold"
    >
      {(['id', 'en'] as const).map((code) => (
        <span
          key={code}
          aria-hidden="true"
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === code ? 'bg-accent text-white' : 'text-text-muted'
          }`}
        >
          {code}
        </span>
      ))}
    </button>
  )

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md" aria-label="Primary navigation">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#top" className="text-2xl font-bold tracking-wide text-accent" onClick={closeMenu}>
            FIRMANDHANII
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-accent-soft'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-bg-hover"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.name}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {langToggle}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden rounded-lg bg-accent p-2 text-white transition-colors hover:bg-accent-hover sm:inline-flex"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            {profile.wa && (
              <a
                href={`https://wa.me/62${profile.wa.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hidden rounded-lg bg-[#25D366] p-2 text-white transition-colors hover:bg-[#128C7E] sm:inline-flex"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            )}
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-lg border border-line p-2 text-text-secondary transition-colors hover:border-accent hover:text-accent-soft md:hidden"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-4 flex flex-col gap-1 border-t border-line pt-4">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={closeMenu}
                    aria-current={active === link.id ? 'location' : undefined}
                    className={`rounded-lg px-3 py-2 transition-colors hover:bg-bg-card hover:text-accent-soft ${
                      active === link.id ? 'bg-bg-card text-text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
