import type { Localized } from '../i18n/translations'

export type ProjectCategory = 'AI' | 'Trading' | 'Web' | 'Tools'

export interface Project {
  id: string
  title: string
  tagline: Localized
  description: Localized
  category: ProjectCategory
  techStack: string[]
  /** Repo name under your GitHub user. Omit for private/confidential work. */
  githubRepo?: string
  demoUrl?: string
  caseStudy: {
    problem: Localized
    solution: Localized
    architecture: Localized<string[]>
    results: Localized<string[]>
  }
}

/**
 * Image convention (all optional, missing files fall back automatically):
 *   public/images/projects/<id>/cover.webp     card cover, 3:2 (e.g. 1200x800)
 *   public/images/projects/<id>/shot-1.webp    case study screenshots, 16:10
 *   public/images/projects/<id>/shot-2.webp
 *   public/images/projects/<id>/shot-3.webp
 * Fallback cover: public/images/projects/<id>.svg
 */
export const SCREENSHOT_SLOTS = 3

export const projectImages = (id: string) => ({
  cover: `/images/projects/${id}/cover.webp`,
  fallback: `/images/projects/${id}.svg`,
  shots: Array.from({ length: SCREENSHOT_SLOTS }, (_, i) => `/images/projects/${id}/shot-${i + 1}.webp`),
})

export const projects: Project[] = [
  {
    id: 'enterprise-rag',
    title: 'Enterprise RAG & MCP Gateway',
    tagline: {
      en: 'Internal knowledge retrieval via a custom MCP protocol',
      id: 'Temu-balik pengetahuan internal via protokol MCP kustom',
    },
    description: {
      en: 'Enterprise RAG system integrated with the Model Context Protocol for secure, real-time retrieval of policy data, claims, and internal SOPs at an insurance company.',
      id: 'Knowledge base RAG on-premise untuk helpdesk ASKRINDO yang mengindeks dokumen lokal, menjalankan OCR dan validasi file, lalu menyediakan retrieval melalui MCP server.',
    },
    category: 'AI',
    techStack: ['Python', 'FastAPI', 'MCP', 'Qdrant', 'OCR'],
    caseStudy: {
      problem: {
        en: 'Staff spent significant time searching scattered policy documents, claim records, and SOPs across separate systems.',
        id: 'Staf menghabiskan banyak waktu mencari dokumen polis, data klaim, dan SOP yang tersebar di berbagai sistem.',
      },
      solution: {
        en: 'A RAG assistant that answers questions grounded in internal documents, exposed to AI clients through a custom MCP gateway on a private network.',
        id: 'Asisten RAG yang menjawab pertanyaan berdasarkan dokumen internal, diekspos ke klien AI melalui MCP gateway kustom di jaringan privat.',
      },
      architecture: {
        en: ['Document ingestion → chunking → embeddings in a vector DB', 'FastAPI service implementing MCP tools', 'Private access over Tailscale, no public exposure'],
        id: ['Ingestion dokumen → chunking → embedding di vector DB', 'Layanan FastAPI yang mengimplementasikan MCP tools', 'Akses privat via Tailscale, tanpa ekspos publik'],
      },
      results: {
        en: ['Provides document-grounded retrieval through an MCP server; no measured time-saving figures are claimed.'],
        id: ['Menyediakan temu-balik berbasis dokumen melalui MCP server; belum ada klaim angka penghematan waktu.'],
      },
    },
  },
  {
    id: 'gemini-chatbot',
    title: 'Gemini Conversational API',
    tagline: {
      en: 'Context-aware multi-turn AI assistant backend',
      id: 'Backend asisten AI multi-turn yang sadar konteks',
    },
    description: {
      en: 'Chatbot API built on Google Gemini with multi-turn context management, dynamic token handling, and webhook integration.',
      id: 'Backend API chatbot berbasis Google Gemini dengan manajemen konteks multi-turn, token handling dinamis, dan integrasi webhook.',
    },
    category: 'AI',
    techStack: ['TypeScript', 'Node.js', 'Gemini API', 'REST'],
    githubRepo: 'gemini-chatbot-api-batch7',
    caseStudy: {
      problem: {
        en: 'Simple chatbot wrappers lose context between turns and break on long conversations.',
        id: 'Wrapper chatbot sederhana kehilangan konteks antar giliran dan gagal pada percakapan panjang.',
      },
      solution: {
        en: 'A REST API that stores conversation history, trims it to fit token limits, and forwards replies to webhooks.',
        id: 'REST API yang menyimpan riwayat percakapan, memangkasnya sesuai batas token, dan meneruskan balasan ke webhook.',
      },
      architecture: {
        en: ['Node.js + TypeScript REST endpoints', 'Session history with token-aware trimming', 'Webhook dispatcher for downstream channels'],
        id: ['Endpoint REST Node.js + TypeScript', 'Riwayat sesi dengan pemangkasan berbasis token', 'Webhook dispatcher untuk channel lanjutan'],
      },
      results: {
        en: ['Supports multi-turn conversation history, token-aware context handling, and webhook delivery.'],
        id: ['Mendukung riwayat percakapan multi-turn, pengelolaan konteks berbasis token, dan pengiriman webhook.'],
      },
    },
  },
  {
    id: 'n8n-templates',
    title: 'Freeman Automation Matrix',
    tagline: {
      en: '280+ n8n workflows: AI agents, RAG pipelines, multi-channel integrations',
      id: '280+ workflow n8n: AI agent, pipeline RAG, integrasi multi-channel',
    },
    description: {
      en: 'A comprehensive library of 280+ workflow templates: AI agent delegators, Telegram alert pipelines, automated email parsing, and database sync.',
      id: 'Koleksi 280+ template workflow: AI agent delegator, pipeline alert Telegram, parsing email otomatis, dan sinkronisasi database.',
    },
    category: 'Tools',
    techStack: ['n8n', 'AI Agents', 'Telegram Bot', 'IMAP/SMTP', 'Docker'],
    githubRepo: 'awesome-n8n-templates-Freeman',
    caseStudy: {
      problem: {
        en: 'Teams rebuild the same automations from scratch, and good n8n examples are scattered.',
        id: 'Tim membangun ulang otomasi yang sama dari nol, dan contoh n8n yang baik tersebar di mana-mana.',
      },
      solution: {
        en: 'A curated, categorized template library that can be imported and adapted in minutes.',
        id: 'Pustaka template yang terkurasi dan terkategori, siap diimpor dan disesuaikan dalam hitungan menit.',
      },
      architecture: {
        en: ['Workflows grouped by use case', 'Self-hosted n8n via Docker', 'Integrations: Telegram, IMAP/SMTP, databases, LLM APIs'],
        id: ['Workflow dikelompokkan per use case', 'n8n self-hosted via Docker', 'Integrasi: Telegram, IMAP/SMTP, database, LLM API'],
      },
      results: {
        en: ['280+ ready-to-import workflows'],
        id: ['280+ workflow siap impor'],
      },
    },
  },
  {
    id: 'freeman-trader',
    title: 'FreemanTrader',
    tagline: {
      en: 'Algorithmic crypto & forex backtesting and execution',
      id: 'Backtesting dan eksekusi algoritmik untuk crypto & forex',
    },
    description: {
      en: 'Quantitative trading system with market-regime detection, risk-disciplined order execution, position sizing, and real-time performance logging.',
      id: 'Sistem trading kuantitatif dengan deteksi rezim pasar, eksekusi order disiplin risiko, kalkulasi position sizing, dan logging performa real-time.',
    },
    category: 'Trading',
    techStack: ['Python', 'CCXT', 'MetaTrader', 'Pandas', 'TA-Lib'],
    githubRepo: 'freeman-trader',
    caseStudy: {
      problem: {
        en: 'Discretionary trading is inconsistent and hard to evaluate objectively.',
        id: 'Trading diskresioner tidak konsisten dan sulit dievaluasi secara objektif.',
      },
      solution: {
        en: 'A rules-based engine that detects market regimes across timeframes and sizes positions from a fixed risk budget.',
        id: 'Engine berbasis aturan yang mendeteksi rezim pasar lintas timeframe dan menghitung ukuran posisi dari anggaran risiko tetap.',
      },
      architecture: {
        en: ['Data feeds via CCXT / MetaTrader', 'Multi-timeframe regime analysis with Pandas + TA-Lib', 'Risk module, executor, and performance logger'],
        id: ['Data feed via CCXT / MetaTrader', 'Analisis rezim multi-timeframe dengan Pandas + TA-Lib', 'Modul risiko, executor, dan logger performa'],
      },
      results: {
        en: ['Includes market-regime analysis, risk-based position sizing, and performance logging; no backtest metrics are claimed.'],
        id: ['Mencakup analisis rezim pasar, position sizing berbasis risiko, dan pencatatan performa; tidak mengklaim metrik backtest.'],
      },
    },
  },
  {
    id: 'zarapilson',
    title: 'ZaraPilson Life OS',
    tagline: {
      en: 'Personal dashboard for finance, habits, mood & planning',
      id: 'Dashboard pribadi untuk keuangan, kebiasaan, mood & perencanaan',
    },
    description: {
      en: 'Productivity web dashboard for tracking finances, daily habits, mood, to-dos, and weekly planning.',
      id: 'Web dashboard produktivitas untuk tracking finansial, habit harian, mood, to-do, dan perencanaan mingguan.',
    },
    category: 'Web',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'LocalStorage'],
    githubRepo: 'zarapilson',
    caseStudy: {
      problem: {
        en: 'Personal tracking was split across several apps that did not talk to each other.',
        id: 'Pencatatan pribadi tersebar di beberapa aplikasi yang tidak saling terhubung.',
      },
      solution: {
        en: 'One dashboard that combines finance, habits, mood, and planning in a single view.',
        id: 'Satu dashboard yang menggabungkan keuangan, kebiasaan, mood, dan perencanaan dalam satu tampilan.',
      },
      architecture: {
        en: ['React + TypeScript SPA', 'Tailwind CSS design system', 'Local-first storage with optional sync'],
        id: ['SPA React + TypeScript', 'Design system Tailwind CSS', 'Penyimpanan local-first dengan sync opsional'],
      },
      results: {
        en: ['Combines finance, habit, mood, task, and weekly-planning views in one dashboard.'],
        id: ['Menggabungkan tampilan keuangan, kebiasaan, mood, tugas, dan perencanaan mingguan dalam satu dashboard.'],
      },
    },
  },
  {
    id: 'yan-property',
    title: 'YanProperty',
    tagline: {
      en: 'Property discovery with advanced filters & geo-data',
      id: 'Pencarian properti dengan filter lanjutan & geo-data',
    },
    description: {
      en: 'Modern property portal with an interactive catalog, location-based search, unit spec filters, and a financing simulator.',
      id: 'Portal properti modern dengan katalog interaktif, pencarian berbasis lokasi, filter spesifikasi unit, dan kalkulator simulasi pembiayaan.',
    },
    category: 'Web',
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Maps'],
    githubRepo: 'YanProperty',
    caseStudy: {
      problem: {
        en: 'Buyers struggle to compare listings by location, specs, and affordability in one place.',
        id: 'Pembeli kesulitan membandingkan listing berdasarkan lokasi, spesifikasi, dan kemampuan bayar di satu tempat.',
      },
      solution: {
        en: 'A listing platform with map search, spec filters, and a built-in mortgage simulator.',
        id: 'Platform listing dengan pencarian peta, filter spesifikasi, dan simulator KPR bawaan.',
      },
      architecture: {
        en: ['Next.js pages with typed listing data', 'Interactive map layer', 'Client-side financing calculator'],
        id: ['Halaman Next.js dengan data listing bertipe', 'Layer peta interaktif', 'Kalkulator pembiayaan di sisi klien'],
      },
      results: {
        en: ['Brings property listings, location search, unit filters, and a financing simulator into one portal.'],
        id: ['Menggabungkan listing properti, pencarian lokasi, filter unit, dan simulator pembiayaan dalam satu portal.'],
      },
    },
  },
  {
    id: 'zafir-finance',
    title: 'Zafir Finance',
    tagline: {
      en: 'Personal finance dashboard with budgets, investments & AI insights',
      id: 'Dashboard keuangan pribadi untuk anggaran, investasi & insight AI',
    },
    description: {
      en: 'Full-stack personal finance app for tracking wallets and transactions, monitoring monthly budgets and investments, and organizing savings goals. Includes AI insights, receipt OCR, and a Telegram bot.',
      id: 'Aplikasi keuangan pribadi full-stack untuk mencatat dompet dan transaksi, memantau anggaran bulanan dan investasi, serta mengelola target tabungan. Dilengkapi insight AI, OCR struk, dan bot Telegram.',
    },
    category: 'Web',
    techStack: ['Next.js', 'React', 'Express', 'Prisma', 'SQLite', 'Telegram'],
    caseStudy: {
      problem: {
        en: 'Personal wallets, spending limits, investments, and savings goals need a shared place to track and review.',
        id: 'Dompet, batas pengeluaran, investasi, dan target tabungan pribadi perlu dicatat dan ditinjau dalam satu tempat.',
      },
      solution: {
        en: 'A finance dashboard backed by an API, with transaction, wallet, budget, investment, and savings-goal features plus AI, OCR, and Telegram integrations.',
        id: 'Dashboard keuangan dengan API untuk transaksi, dompet, anggaran, investasi, dan target tabungan, dilengkapi integrasi AI, OCR, dan Telegram.',
      },
      architecture: {
        en: ['Next.js frontend with reusable finance dashboard cards', 'Express API and Prisma-backed SQLite data model', 'Separate AI, receipt OCR, and Telegram bot integrations'],
        id: ['Frontend Next.js dengan kartu dashboard keuangan yang dapat digunakan ulang', 'API Express dan model data SQLite melalui Prisma', 'Integrasi terpisah untuk AI, OCR struk, dan bot Telegram'],
      },
      results: {
        en: ['Tracks wallets, transactions, budgets, investments, and sinking funds in one application'],
        id: ['Mencatat dompet, transaksi, anggaran, investasi, dan sinking fund dalam satu aplikasi'],
      },
    },
  },
  {
    id: 'it-ops-knowledge',
    title: 'IT Ops Knowledge & Topology Map',
    tagline: {
      en: 'Interactive operations knowledge base and application-to-database map',
      id: 'Knowledge base operasional dan peta aplikasi-ke-database interaktif',
    },
    description: {
      en: 'Browser-based IT operations workspace that brings SOPs, searchable technical knowledge, an interactive application-to-database topology map, content approval workflows, and audit analytics into one interface.',
      id: 'Workspace operasional IT berbasis browser yang menggabungkan SOP, pencarian pengetahuan teknis, peta topologi aplikasi-ke-database interaktif, alur persetujuan konten, dan analitik audit.',
    },
    category: 'Tools',
    techStack: ['JavaScript', 'HTML', 'CSS', 'Search', 'Data Visualization'],
    caseStudy: {
      problem: {
        en: 'Operational procedures, system relationships, and maintenance activity are difficult to navigate when split across separate references.',
        id: 'Prosedur operasional, relasi sistem, dan aktivitas pemeliharaan sulit ditelusuri saat tersebar di referensi berbeda.',
      },
      solution: {
        en: 'A single-page operations workspace with a searchable knowledge base, topology view, role selector, approval workflow, and audit analytics.',
        id: 'Workspace operasional satu halaman dengan knowledge base yang dapat dicari, tampilan topologi, pemilih peran, alur persetujuan, dan analitik audit.',
      },
      architecture: {
        en: ['Vanilla JavaScript application with separate state, search, and knowledge modules', 'Interactive application-to-database topology map', 'Browser-based workflow and analytics modules'],
        id: ['Aplikasi JavaScript tanpa framework dengan modul state, pencarian, dan knowledge terpisah', 'Peta topologi aplikasi-ke-database interaktif', 'Modul workflow dan analitik berbasis browser'],
      },
      results: {
        en: ['Combines operational knowledge, topology navigation, content maintenance, and audit views in one interface'],
        id: ['Menggabungkan knowledge operasional, navigasi topologi, pemeliharaan konten, dan tampilan audit dalam satu antarmuka'],
      },
    },
  },
  {
    id: 'rekonsiliasi-kur',
    title: 'KUR Reconciliation & Evidence Review',
    tagline: {
      en: 'Auditable reconciliation workflow for loan records',
      id: 'Alur rekonsiliasi data pinjaman yang dapat diaudit',
    },
    description: {
      en: 'Flask web app for reconciling KUR Kupedes and Kupra records. Imports source files, classifies matches and discrepancies, and lets reviewers inspect raw values, normalization, and calculation evidence for each result.',
      id: 'Aplikasi web Flask untuk merekonsiliasi data KUR Kupedes dan Kupra. Mengimpor file sumber, mengelompokkan kecocokan dan selisih, serta memungkinkan pemeriksa menelusuri nilai mentah, normalisasi, dan bukti perhitungan tiap hasil.',
    },
    category: 'Tools',
    techStack: ['Python', 'Flask', 'SQLite', 'pytest'],
    caseStudy: {
      problem: {
        en: 'Reconciliation summaries need traceable evidence so reviewers can understand why each record matched or differed.',
        id: 'Ringkasan rekonsiliasi perlu bukti yang dapat ditelusuri agar pemeriksa memahami alasan tiap record cocok atau berbeda.',
      },
      solution: {
        en: 'A web workflow that compares source records, surfaces unmatched and ambiguous entries, and provides a verification view for recalculating summary figures.',
        id: 'Alur web yang membandingkan record sumber, menampilkan data yang tidak cocok atau ambigu, dan menyediakan halaman verifikasi untuk menghitung ulang ringkasan.',
      },
      architecture: {
        en: ['Flask web application with separate reconciliation engine and repository', 'SQLite-backed application data', 'Pytest suite covering application workflows'],
        id: ['Aplikasi web Flask dengan engine rekonsiliasi dan repository terpisah', 'Data aplikasi berbasis SQLite', 'Rangkaian pengujian pytest untuk alur aplikasi'],
      },
      results: {
        en: ['Provides record-level reconciliation evidence and a dedicated summary verification view'],
        id: ['Menyediakan bukti rekonsiliasi per record dan halaman khusus untuk verifikasi ringkasan'],
      },
    },
  },
  {
    id: 'personal-dashboard',
    title: 'Personal Dashboard',
    tagline: {
      en: 'Offline-first personal workspace with focus and task tools',
      id: 'Workspace pribadi offline dengan alat fokus dan pengelola tugas',
    },
    description: {
      en: 'A self-contained dashboard with a live clock and greeting, 25-minute focus timer, sortable to-do list, and customizable quick links. Saves personal settings and items in browser localStorage and works offline after first load.',
      id: 'Dashboard mandiri dengan jam dan sapaan langsung, timer fokus 25 menit, daftar tugas yang dapat diurutkan, dan tautan cepat kustom. Menyimpan pengaturan serta data di localStorage browser dan dapat digunakan offline setelah dimuat.',
    },
    category: 'Web',
    techStack: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
    caseStudy: {
      problem: {
        en: 'Everyday focus tools and personal shortcuts are scattered across separate apps and browser tabs.',
        id: 'Alat fokus harian dan pintasan pribadi tersebar di aplikasi serta tab browser yang berbeda.',
      },
      solution: {
        en: 'A single-page dashboard that combines time and greeting, a focus timer, task tracking, and quick links in one offline-capable workspace.',
        id: 'Dashboard satu halaman yang menggabungkan waktu dan sapaan, timer fokus, pencatatan tugas, serta tautan cepat dalam satu workspace yang dapat digunakan offline.',
      },
      architecture: {
        en: ['Self-contained HTML, CSS, and JavaScript page', 'Browser localStorage for name, theme, tasks, and links', 'No backend; core dashboard runs offline after initial load'],
        id: ['Halaman mandiri berbasis HTML, CSS, dan JavaScript', 'localStorage browser untuk nama, tema, tugas, dan tautan', 'Tanpa backend; fitur utama berjalan offline setelah pemuatan awal'],
      },
      results: {
        en: ['Combines clock, 25-minute focus timer, sortable tasks, and saved quick links in one page'],
        id: ['Menggabungkan jam, timer fokus 25 menit, tugas yang dapat diurutkan, dan tautan tersimpan dalam satu halaman'],
      },
    },
  },
]
