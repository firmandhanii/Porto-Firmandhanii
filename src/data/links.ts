import type { Localized } from '../i18n/translations'

/** Links with localized labels */
export interface Link {
  id: string
  href: string
  label: Localized
  external?: boolean
}

/** Main navigation links */
export const navLinks: Link[] = [
  { id: 'about', href: '#about', label: { en: 'About', id: 'Tentang' } },
  { id: 'experience', href: '#experience', label: { en: 'Experience', id: 'Pengalaman' } },
  { id: 'projects', href: '#projects', label: { en: 'Projects', id: 'Proyek' } },
  { id: 'stack', href: '#stack', label: { en: 'Stack', id: 'Teknologi' } },
  { id: 'contact', href: '#contact', label: { en: 'Contact', id: 'Kontak' } },
]

/** Contact / social links */
export const contactLinks: Link[] = [
  { id: 'github', href: 'https://github.com/firmandhanii', label: { en: 'GitHub', id: 'GitHub' }, external: true },
  { id: 'linkedin', href: '', label: { en: 'LinkedIn', id: 'LinkedIn' }, external: true }, // hidden when empty
  { id: 'telegram', href: 'https://t.me/Firmandhanii', label: { en: 'Telegram', id: 'Telegram' }, external: true },
  { id: 'email', href: 'mailto:firmandhanii26@gmail.com', label: { en: 'Email', id: 'Email' }, external: false },
]

/** Footer links (CTA) */
export const footerLinks: Link[] = [
  { id: 'cta', href: 'mailto:firmandhanii26@gmail.com', label: { en: "Let's Talk", id: 'Ayo Ngobrol' } },
  { id: 'wa', href: 'https://wa.me/6287784518610', label: { en: 'WhatsApp', id: 'WhatsApp' }, external: true },
]

/** Download / CV */
export const downloadLinks: Link[] = [
  { id: 'cv', href: '', label: { en: 'Download CV', id: 'Unduh CV' }, external: false },
]
