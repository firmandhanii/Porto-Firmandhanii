import type { Localized } from '../i18n/translations'

export interface Education {
  id: string
  school: Localized
  degree: Localized
  /** Free text, e.g. '2015' */
  start: string
  end: string
  /** e.g. 'GPA 3.20 / 4.00' — shown as-is */
  detail?: string
  coursework: string[]
}

export interface Training {
  id: string
  title: Localized
  provider: string
  note: Localized
}

export interface Certification {
  id: string
  /** Certificate name as shown on LinkedIn — a proper name, same in EN/ID. */
  title: string
  issuer: string
  /** Month + year of issue, localized. */
  issued: Localized
  credentialId?: string
  credentialUrl?: string
}

/**
 * Education (newest first).
 * Source: CV Firman Ramdhani V2 — do not invent schools, dates or grades.
 */
export const educationList: Education[] = [
  {
    id: 'gunadarma',
    school: { en: 'Gunadarma University', id: 'Universitas Gunadarma' },
    degree: { en: 'Bachelor of Computer Science — Information Systems', id: 'Sarjana Ilmu Komputer — Sistem Informasi' },
    start: '2015',
    end: '2019',
    detail: 'GPA 3.20 / 4.00',
    coursework: ['Web Programming', 'Oracle Database', 'Desktop Programming', 'Mobile Programming'],
  },
  {
    id: 'smk-astrindo',
    school: { en: 'SMK Astrindo Kota Tegal', id: 'SMK Astrindo Kota Tegal' },
    degree: { en: 'Computer Network Engineering', id: 'Teknik Komputer dan Jaringan' },
    start: '2012',
    end: '2015',
    coursework: ['Network Installation', 'Network Management', 'Network Security', 'Maintenance & Care'],
  },
]

/**
 * Certifications (newest first).
 * Source: Firman's LinkedIn profile, Licenses & Certifications section,
 * checked 22 Nov 2026 — names, issuers, dates, IDs and URLs copied exactly.
 * No expiry dates are shown on LinkedIn, so none is listed here.
 * Dedup check (22 Nov 2026): none of these duplicates the training items
 * below — Agentic AI / GenAI App Builder are Google Cloud items, while the
 * IBM AI-agents certificate is a separate IBM credential; Data Analytics
 * (RevoU, 2023) and Data - AI Agent for Data Analysis (Hacktiv8, 2026)
 * are separate credentials from different issuers; Java (Gunadarma, 2019)
 * is a certificate, not the Gunadarma degree above.
 */
export const certificationsList: Certification[] = [
  {
    id: 'hacktiv8-data-ai-agent',
    title: 'Data - AI Agent for Data Analysis',
    issuer: 'Hacktiv8 Indonesia',
    issued: { en: 'Apr 2026', id: 'Apr 2026' },
    credentialId: '00445/H8/CSR/ISUE/V/2026',
    credentialUrl: 'https://students.hacktiv8.com/certificates/6eacf0d8-61d8-4af9-9e75-87180a0d0a0c',
  },
  {
    id: 'revou-software-engineering',
    title: 'Software Engineering',
    issuer: 'RevoU',
    issued: { en: 'Apr 2026', id: 'Apr 2026' },
    credentialId: 'CCSE 200426-01-1-00022',
    credentialUrl: 'https://drive.google.com/file/d/1xsSGjF9R_Dp2q3MmkrYtSv6qJP8r40g5/view',
  },
  {
    id: 'ibm-ai-agents',
    title: 'Unleashing the Power of AI Agents',
    issuer: 'IBM',
    issued: { en: 'Apr 2026', id: 'Apr 2026' },
    credentialId: 'ALM-COURSE_3825456',
    credentialUrl:
      'https://skills.yourlearning.ibm.com/certificate/share/c7364f3b6aewogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICI3NjE2MjMwUkVHIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfMzgyNTQ1NiIKfQc719b59ea6-10',
  },
  {
    id: 'ibm-granite-classifying-data',
    title: 'Classifying Data Using IBM Granite',
    issuer: 'IBM',
    issued: { en: 'Apr 2026', id: 'Apr 2026' },
    credentialId: 'MDL-563',
    credentialUrl:
      'https://skills.yourlearning.ibm.com/certificate/share/dc0d1be550ewogICJsZWFybmVyQ05VTSIgOiAiNzYxNjIzMFJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIiwKICAib2JqZWN0SWQiIDogIk1ETC01NjMiCn081c05888b6-10',
  },
  {
    id: 'hacktiv8-ai-productivity',
    title: 'AI Productivity and AI API Integration for Developers',
    issuer: 'Hacktiv8 Indonesia',
    issued: { en: 'Mar 2026', id: 'Mar 2026' },
    credentialId: '01338/H8/CSR/MBA2/III/2026',
    credentialUrl: 'https://students.hacktiv8.com/certificates/f7771303-45c3-4d7c-b53e-15a42391010e',
  },
  {
    id: 'revou-data-analytics',
    title: 'Data Analytics',
    issuer: 'RevoU',
    issued: { en: 'Aug 2023', id: 'Agu 2023' },
    credentialUrl: 'https://certificates.revou.co/firman-ramdhani-certificate-completion-damc23.pdf',
  },
  {
    id: 'gunadarma-java',
    title: 'Java',
    issuer: 'Universitas Gunadarma',
    issued: { en: 'Apr 2019', id: 'Apr 2019' },
  },
  {
    id: 'alteration-android',
    title: 'Android Programming',
    issuer: 'Alteration Studio Indonesia',
    issued: { en: 'Dec 2016', id: 'Des 2016' },
  },
]

/**
 * Training listed on the CV. The CV gives no completion year or
 * certificate number for these, so none is shown — do not invent one.
 */
export const trainingList: Training[] = [
  {
    id: 'agentic-ai',
    title: { en: 'Agentic AI', id: 'Agentic AI' },
    provider: 'Google Cloud Skills Boost',
    note: {
      en: 'Module completed',
      id: 'Modul diselesaikan',
    },
  },
  {
    id: 'genai-app-builder',
    title: { en: 'GenAI App Builder', id: 'GenAI App Builder' },
    provider: 'Google Cloud',
    note: {
      en: 'Hands-on experience building AI applications',
      id: 'Pengalaman hands-on membangun aplikasi AI',
    },
  },
]
