export type Lang = 'en' | 'id'

/** A content field that exists in both languages */
export type Localized<T = string> = Record<Lang, T>

const en = {
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Stack',
    contact: 'Contact',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    switchLang: 'Ganti ke Bahasa Indonesia',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'AI Systems & Fullstack Developer',
    summary:
      'I build enterprise AI assistants, workflow automation, and data-driven trading tools that save teams hours of manual work.',
    badges: ['RAG & MCP', 'n8n Automation', 'Algorithmic Trading'],
    viewProjects: 'View Projects',
    contact: 'Contact Me',
    downloadCv: 'Download CV',
    whatsApp: 'WhatsApp',
    available: 'Open to freelance & collaboration',
  },
  about: {
    eyebrow: 'About the work',
    heading: 'Systems that turn ideas into useful products.',
    body: 'I build software that connects AI, automation, data, and product experience, from internal enterprise tools to web apps and trading research.',
    focus: [
      {
        title: 'Intelligent systems',
        description: 'RAG, MCP, chatbots, and knowledge tools that make internal data easier to use.',
      },
      {
        title: 'Reliable automation',
        description: 'n8n workflows and multi-channel integrations that cut manual work and keep processes consistent.',
      },
      {
        title: 'Disciplined trading tools',
        description: 'Analysis frameworks, backtesting, and risk-aware execution for measurable trading experiments.',
      },
    ],
  },
  stats: {
    workflows: 'n8n workflows built',
    projects: 'Public projects',
    domains: 'Focus domains',
    years: 'Years building software',
  },
  experience: {
    eyebrow: 'Career',
    heading: 'Experience',
    present: 'Present',
  },
  projects: {
    eyebrow: 'Selected work',
    heading: 'Featured Projects',
    subheading: 'Six key projects spanning AI, automation, trading, and product engineering.',
    all: 'All',
    viewCaseStudy: 'View case study',
    closeCaseStudy: 'Close case study',
    problem: 'Problem',
    solution: 'Solution',
    architecture: 'Architecture',
    results: 'Results',
    gallery: 'Screenshots',
    github: 'View source on GitHub',
    demo: 'Open live demo',
    private: 'Private / confidential project',
    imagePending: 'Image slot',
  },
  stack: {
    heading: 'Tech Stack',
  },
  footer: {
    tagline: 'Building intelligent automation and quantitative trading solutions.',
    connect: 'Connect',
    workWithMe: 'Work With Me',
    workBody: 'Available for freelance projects, consulting, and collaborations.',
    cta: "Let's Talk",
    rights: 'All rights reserved.',
    whatsApp: 'WhatsApp',
  },
}

const id: typeof en = {
  nav: {
    about: 'Tentang',
    experience: 'Pengalaman',
    projects: 'Proyek',
    stack: 'Teknologi',
    contact: 'Kontak',
    openMenu: 'Buka menu navigasi',
    closeMenu: 'Tutup menu navigasi',
    switchLang: 'Switch to English',
  },
  hero: {
    greeting: 'Halo, saya',
    role: 'AI Systems & Fullstack Developer',
    summary:
      'Saya membangun asisten AI enterprise, otomasi workflow, dan tools trading berbasis data yang menghemat berjam-jam kerja manual tim.',
    badges: ['RAG & MCP', 'Otomasi n8n', 'Algorithmic Trading'],
    viewProjects: 'Lihat Proyek',
    contact: 'Hubungi Saya',
    downloadCv: 'Unduh CV',
    whatsApp: 'WhatsApp',
    available: 'Terbuka untuk freelance & kolaborasi',
  },
  about: {
    eyebrow: 'Tentang karya',
    heading: 'Sistem yang mengubah ide menjadi produk yang berguna.',
    body: 'Saya membangun software yang menghubungkan AI, otomasi, data, dan pengalaman produk, mulai dari tools internal enterprise hingga aplikasi web dan riset trading.',
    focus: [
      {
        title: 'Sistem cerdas',
        description: 'RAG, MCP, chatbot, dan knowledge tools yang membuat data internal lebih mudah dipakai.',
      },
      {
        title: 'Otomasi andal',
        description: 'Workflow n8n dan integrasi multi-channel untuk mengurangi kerja manual dan menjaga alur tetap konsisten.',
      },
      {
        title: 'Tools trading disiplin',
        description: 'Framework analisis, backtesting, dan eksekusi sadar-risiko untuk eksperimen trading yang terukur.',
      },
    ],
  },
  stats: {
    workflows: 'Workflow n8n dibuat',
    projects: 'Proyek publik',
    domains: 'Bidang fokus',
    years: 'Tahun membangun software',
  },
  experience: {
    eyebrow: 'Karier',
    heading: 'Pengalaman',
    present: 'Sekarang',
  },
  projects: {
    eyebrow: 'Karya pilihan',
    heading: 'Proyek Unggulan',
    subheading: 'Enam proyek utama yang mencakup AI, otomasi, trading, dan product engineering.',
    all: 'Semua',
    viewCaseStudy: 'Lihat studi kasus',
    closeCaseStudy: 'Tutup studi kasus',
    problem: 'Masalah',
    solution: 'Solusi',
    architecture: 'Arsitektur',
    results: 'Hasil',
    gallery: 'Tangkapan layar',
    github: 'Lihat source code di GitHub',
    demo: 'Buka demo',
    private: 'Proyek privat / rahasia',
    imagePending: 'Slot gambar',
  },
  stack: {
    heading: 'Teknologi',
  },
  footer: {
    tagline: 'Membangun otomasi cerdas dan solusi trading kuantitatif.',
    connect: 'Terhubung',
    workWithMe: 'Kerja Sama',
    workBody: 'Tersedia untuk proyek freelance, konsultasi, dan kolaborasi.',
    cta: 'Ayo Ngobrol',
    rights: 'Hak cipta dilindungi.',
    whatsApp: 'WhatsApp',
  },
}

export const ui = { en, id }
