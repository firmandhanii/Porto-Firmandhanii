import type { Localized } from '../i18n/translations'

export interface Experience {
  id: string
  role: Localized
  company: Localized
  /** Free text, e.g. '2023' or 'Jan 2023' */
  start: string
  /** Leave '' for a current role (renders as "Present") */
  end: string
  highlights: Localized<string[]>
  tech: string[]
}

/**
 * Professional experience (newest first).
 * Leave 'end' empty for current roles.
 */
export const experiences: Experience[] = [
  {
    id: 'enterprise-insurance',
    role: { en: 'AI Systems & Automation Developer', id: 'AI Systems & Automation Developer' },
    company: { en: 'Enterprise Insurance Company', id: 'Perusahaan Asuransi Enterprise' },
    start: '20XX',
    end: '',
    highlights: {
      en: [
        'Built an internal RAG assistant over policy, claims, and SOP documents using a custom MCP gateway.',
        'Automated reporting and alerting flows with n8n and Telegram bots.',
      ],
      id: [
        'Membangun asisten RAG internal untuk dokumen polis, klaim, dan SOP menggunakan MCP gateway kustom.',
        'Mengotomasi alur pelaporan dan notifikasi dengan n8n dan bot Telegram.',
      ],
    },
    tech: ['Python', 'FastAPI', 'MCP', 'n8n'],
  },
  {
    id: 'independent',
    role: { en: 'Fullstack Developer & Algorithmic Trader', id: 'Fullstack Developer & Algorithmic Trader' },
    company: { en: 'Independent / Freelance', id: 'Independen / Freelance' },
    start: '20XX',
    end: '',
    highlights: {
      en: [
        'Develop web products (Life OS dashboard, property listing platform) with React and TypeScript.',
        'Research and run quantitative trading strategies with Python backtesting tooling.',
      ],
      id: [
        'Mengembangkan produk web (dashboard Life OS, platform listing properti) dengan React dan TypeScript.',
        'Meriset dan menjalankan strategi trading kuantitatif dengan tooling backtesting Python.',
      ],
    },
    tech: ['React', 'TypeScript', 'Python', 'Pandas'],
  },
]
