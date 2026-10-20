import { useLanguage } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import Reveal from './ui/Reveal'
import { WhatsAppIcon } from './ui/icons'

const currentYear = new Date().getFullYear()

const Footer = () => {
  const { t } = useLanguage()

  const links = [
    { id: 'github', name: 'GitHub', href: profile.github, external: true },
    { id: 'linkedin', name: 'LinkedIn', href: profile.linkedin, external: true },
    { id: 'telegram', name: 'Telegram', href: profile.telegram, external: true },
    { id: 'email', name: 'Email', href: `mailto:${profile.email}`, external: false },
    ...(profile.wa
      ? [
          {
            id: 'wa',
            name: 'WhatsApp',
            href: `https://wa.me/62${profile.wa.replace(/^0/, '')}`,
            external: true,
          } as const,
        ]
      : []),
  ].filter((link) => link.href)

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line bg-bg py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* CTA banner */}
        <Reveal>
          <div className="relative mb-14 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-accent/20 via-bg-card to-cyan/10 p-8 text-center md:p-12">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">{t.footer.workWithMe}</h2>
            <p className="mx-auto mb-6 max-w-xl text-text-secondary">{t.footer.workBody}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                {t.footer.cta}
              </a>
              {profile.wa && (
                <a
                  href={`https://wa.me/62${profile.wa.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary bg-[#25D366] hover:bg-[#128C7E] text-white border-[#25D366]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t.footer.whatsApp}
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xl font-bold text-text-primary">
              Firman<span className="text-accent">.dev</span>
            </p>
            <p className="max-w-sm text-text-secondary">{t.footer.tagline}</p>
          </div>

          <div className="md:text-right">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">{t.footer.connect}</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-text-secondary transition-colors hover:text-accent-soft"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8 text-center text-sm text-text-muted">
          © {currentYear} {profile.name}. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}

export default Footer
