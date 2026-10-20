# Firman Ramdhani — Developer Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-13.5-0055FF?logo=framer&logoColor=white)](https://motion.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-passing-brightgreen)](https://oxc.rs/)

Personal portfolio web application showcasing projects in **Enterprise AI (RAG & MCP)**, **Workflow Automation (n8n)**, **Algorithmic Trading**, and **Fullstack Web Engineering**.

Built with React 19, TypeScript, Tailwind CSS, and Framer Motion. Features a dual-language interface (English / Bahasa Indonesia), animated metrics, 3D interactive tilt cards, and deep-dive project case study modals.

---

## ⚡ Highlights & Key Metrics

- **280+ Automations**: Curated library of production-ready n8n workflows covering AI agent delegation, multi-channel alerting, and document ETL.
- **10 Core Projects**: Ranging from enterprise insurance knowledge retrieval (RAG via custom MCP) to quantitative trading engines and fullstack web platforms.
- **Bilingual (i18n)**: Seamless English & Bahasa Indonesia switching with reactive state persistence.
- **Case Study Modals**: Structured breakdowns per project detailing the Problem, Solution, Architecture, and Measurable Results.
- **Performance & Polish**: Oxlint static analysis, responsive layouts, spring animations with `motion`, scroll-progress indicators, and accessible UI fallbacks.

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript 6.0, Vite 8 |
| **Styling & UI** | Tailwind CSS 3.4, PostCSS, Custom Design Tokens |
| **Animation & UX** | Motion 13.5, 3D Card Tilt, CountUp Stats, Preloader |
| **Internationalization** | Custom Context-based i18n (`en` / `id`) |
| **Linter & Tools** | Oxlint (Rust-based linter) |

---

## 📂 Featured Projects in Portfolio

1. **Enterprise RAG & MCP Gateway**  
   Internal knowledge retrieval system for insurance policy docs, claims, and SOPs via Model Context Protocol (FastAPI, Qdrant, OCR, Python).
2. **Gemini Conversational API**  
   Context-aware multi-turn AI assistant backend with token-aware memory trimming and webhook dispatching (TypeScript, Node.js, Google Gemini).
3. **Freeman Automation Matrix**  
   280+ production n8n workflows spanning AI agent delegators, Telegram alerting pipelines, and database sync.
4. **FreemanTrader**  
   Quantitative crypto & forex execution system with market regime detection, risk sizing, and live logging (Python, CCXT, MetaTrader, Pandas, TA-Lib).
5. **ZaraPilson Life OS**  
   Local-first productivity and personal finance dashboard for habits, budgeting, mood tracking, and weekly planning (React, TypeScript, Tailwind).
6. **YanProperty**  
   Interactive real estate portal with location filtering, unit spec comparison, and integrated mortgage simulator (Next.js, Maps, TypeScript).
7. **Zafir Finance**  
   Fullstack personal finance manager with expense categories, investments, receipt OCR, and Telegram bot integration.
8. **KUR Reconciliation & Evidence Review**  
   Auditable financial reconciliation web tool for loan records with discrepancy drill-downs (Flask, SQLite, pytest).

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (recommended LTS)
- npm or pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/firmandhanii/Porto-Firmandhanii.git
cd Porto-Firmandhanii

# Install dependencies
npm install
```

### Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

Type-check and create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run Oxlint for fast code analysis:

```bash
npm run lint
```

---

## 📁 Project Structure

```text
Porto-Firmandhanii/
├── public/
│   ├── images/
│   │   ├── profile/          # Avatar photo (avatar.jpg)
│   │   └── projects/         # Cover images, screenshots, and SVG fallbacks
│   └── cv/                   # Downloadable CV PDF
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI (CountUp, Tilt, Reveal, Preloader, Icons)
│   │   ├── Navbar.tsx        # Navigation with mobile drawer & lang switch
│   │   ├── Hero.tsx          # Profile hero section & quick CTAs
│   │   ├── About.tsx         # Background & core pillars
│   │   ├── Stats.tsx         # Animated counter strip
│   │   ├── FeaturedProjects.tsx # Filterable grid & case study modals
│   │   ├── Experience.tsx    # Career timeline
│   │   ├── TechStack.tsx     # Categorized skill badges
│   │   └── Footer.tsx        # Social links & contact
│   ├── data/
│   │   ├── profile.ts        # Personal details, socials, and stats config
│   │   ├── projects.ts       # Detailed project entries & case studies
│   │   └── experience.ts     # Career history data
│   ├── i18n/
│   │   ├── LanguageContext.tsx
│   │   └── translations.ts   # English & Indonesian copy
│   ├── App.tsx
│   ├── index.css             # Tailwind layers & custom color tokens
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Customization

Edit files inside `src/data/` to update your portfolio content without touching UI components:

- **`src/data/profile.ts`**: Update your name, avatar, bio, links (GitHub, Telegram, WhatsApp, LinkedIn), and stats.
- **`src/data/projects.ts`**: Add, modify, or reorder projects, screenshots, and case study details.
- **`src/data/experience.ts`**: Update career timeline, achievements, and tech used.
- **`src/i18n/translations.ts`**: Add or modify bilingual copy for UI labels and section descriptions.

---

## 👤 Author

**Firman Ramdhani**

- GitHub: [@firmandhanii](https://github.com/firmandhanii)
- Telegram: [@Firmandhanii](https://t.me/Firmandhanii)
- Email: firmandhanii26@gmail.com

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
