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
