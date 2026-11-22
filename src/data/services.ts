import type { Localized } from '../i18n/translations'

export interface ServiceTier {
  /** Package name as listed on Fastwork / Fiverr */
  name: string
  fastworkPrice: string
  fiverrPrice: string
}

export interface Service {
  id: string
  title: Localized
  description: Localized
  features: Localized<string[]>
  /** Omit for quote-based services */
  tiers?: ServiceTier[]
}

/**
 * Freelance services. Prices are exactly as listed on Fastwork and Fiverr —
 * do not change them here; update them on the platforms first.
 */
export const services: Service[] = [
  {
    id: 'it-support',
    title: { en: 'Remote IT Support', id: 'IT Support Remote' },
    description: {
      en: 'Remote help for everyday computer problems — fixed from home, in the evening, without a site visit.',
      id: 'Bantuan remote untuk masalah komputer sehari-hari — dikerjakan dari rumah, di malam hari, tanpa kunjungan.',
    },
    features: {
      en: ['Windows troubleshooting', 'Software installation', 'Printer & email setup', 'SQL & data tasks'],
      id: ['Troubleshooting Windows', 'Instalasi software', 'Setup printer & email', 'Tugas SQL & data'],
    },
    tiers: [
      { name: 'Basic', fastworkPrice: 'Rp200rb', fiverrPrice: '$15' },
      { name: 'Standard', fastworkPrice: 'Rp250rb', fiverrPrice: '$20' },
      { name: 'Premium', fastworkPrice: 'Rp350rb', fiverrPrice: '$25' },
    ],
  },
  {
    id: 'ai-chatbot',
    title: { en: 'AI Chatbot & AI Agent Development', id: 'Pengembangan AI Chatbot & AI Agent' },
    description: {
      en: 'Chatbots and AI agents that answer from your own documents and automate replies on WhatsApp and the web.',
      id: 'Chatbot dan AI agent yang menjawab dari dokumen Anda sendiri dan mengotomasi balasan di WhatsApp dan web.',
    },
    features: {
      en: ['RAG knowledge chatbot', 'WhatsApp & web chatbot', 'AI agent workflows', 'Document-grounded answers'],
      id: ['Chatbot knowledge berbasis RAG', 'Chatbot WhatsApp & web', 'Workflow AI agent', 'Jawaban berbasis dokumen'],
    },
    tiers: [
      { name: 'Basic', fastworkPrice: 'Rp1jt', fiverrPrice: '$55' },
      { name: 'Standard', fastworkPrice: 'Rp2,5jt', fiverrPrice: '$135' },
      { name: 'Premium', fastworkPrice: 'Rp5jt', fiverrPrice: '$270' },
    ],
  },
  {
    id: 'web-automation',
    title: { en: 'Websites, Dashboards & Automation', id: 'Website, Dashboard & Otomasi' },
    description: {
      en: 'Online stores for small businesses, personal dashboards and smart-home setups, workflow automation, and Oracle EBS / SQL work — scoped per project.',
      id: 'Toko online untuk UMKM, dashboard pribadi dan smart home, otomasi workflow, serta pekerjaan Oracle EBS / SQL — disesuaikan per proyek.',
    },
    features: {
      en: ['Online store website for UMKM', 'Dashboard & Home Assistant setup', 'n8n workflow automation', 'SQL & Oracle EBS services'],
      id: ['Website toko online untuk UMKM', 'Setup Dashboard & Home Assistant', 'Otomasi workflow n8n', 'Layanan SQL & Oracle EBS'],
    },
  },
]

/** Freelance marketplace profiles */
export const freelanceLinks = {
  fastwork: 'https://fastwork.id/user/firmanramdhani',
  fiverr: 'https://www.fiverr.com/users/firmandhanii_',
}
