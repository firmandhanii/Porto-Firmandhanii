/**
 * Personal info + links. Leave a value as '' to hide that element in the UI.
 */
export const profile = {
  name: 'Firman Ramdhani',
  initials: 'FR',
  /** Put your photo at public/images/profile/avatar.jpg (square, ≥ 600x600) */
  avatar: '/images/profile/avatar.jpg',
  email: 'firmandhanii26@gmail.com',
  github: 'https://github.com/firmandhanii',
  githubUser: 'firmandhanii',
  telegram: 'https://t.me/Firmandhanii',
  linkedin: 'https://www.linkedin.com/in/firmandhanii',
  /** CV file lives at public/cv/Firman-Ramdhani-CV.pdf */
  cv: '/cv/Firman-Ramdhani-CV.pdf',
  /** WhatsApp (shown in footer and Hero) */
  wa: '087784518610',
}

/** Stats strip. Set a value to '' to hide that stat. */
export const stats = [
  { key: 'workflows', value: '280+' as string | '' },
  { key: 'projects', value: '10' as string | '' },
  { key: 'domains', value: '4' as string | '' },
] as const
