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
 * Source: CV Firman Ramdhani V2 — do not invent dates, companies or figures.
 */
export const experiences: Experience[] = [
  {
    id: 'askrindo',
    role: { en: 'IT Service Desk', id: 'IT Service Desk' },
    company: { en: 'PT Asuransi Kredit Indonesia (Askrindo)', id: 'PT Asuransi Kredit Indonesia (Askrindo)' },
    start: '2023',
    end: '',
    highlights: {
      en: [
        'Resolved 2,751 tickets — 1,964 Service Requests (99.8% resolution rate) and 787 Incidents (100% resolution rate) across business-critical insurance systems.',
        'Oracle E-Business Suite functional support across AP, GL, PO, FA and iProc — configurations, approval rules, workflows and period-close monitoring with advanced SQL.',
        'Administered ASKRED, E-Polis, Kupera-Kupedes, AIR, DigiAsk and ABO/ASMIK: user access, workflow routing, claims and endorsement troubleshooting, and production data patching for Polis, SPPA, PKS and KLAIM records.',
        'SLA PIC: triaged incoming issues, classified severity and routed tickets to the right support PIC, coordinating with DBA, infrastructure and vendor teams on complex escalations.',
        'Built an internal RAG assistant over policy, claims and SOP documents using a custom MCP gateway, and automated reporting and alerting flows with n8n and Telegram bots.',
      ],
      id: [
        'Menyelesaikan 2.751 tiket — 1.964 Service Request (tingkat resolusi 99,8%) dan 787 Incident (100%) di sistem-sistem asuransi yang kritikal.',
        'Dukungan fungsional Oracle E-Business Suite untuk modul AP, GL, PO, FA dan iProc — konfigurasi, approval rule, workflow, dan monitoring period-close dengan SQL.',
        'Mengelola ASKRED, E-Polis, Kupera-Kupedes, AIR, DigiAsk dan ABO/ASMIK: akses pengguna, routing workflow, troubleshooting klaim dan endorse, serta data patching produksi untuk Polis, SPPA, PKS dan KLAIM.',
        'PIC SLA: memilah isu masuk, mengklasifikasikan severity dan mendistribusikan tiket ke PIC support yang tepat, berkoordinasi dengan tim DBA, infrastruktur dan vendor untuk eskalasi kompleks.',
        'Membangun asisten RAG internal untuk dokumen polis, klaim dan SOP menggunakan MCP gateway kustom, serta mengotomasi pelaporan dan notifikasi dengan n8n dan bot Telegram.',
      ],
    },
    tech: ['Oracle EBS', 'Oracle DB', 'SQL', 'Python', 'FastAPI', 'MCP', 'n8n'],
  },
  {
    id: 'sinar-prima-plastisindo',
    role: { en: 'Engineering Staff & IT Support', id: 'Engineering Staff & IT Support' },
    company: { en: 'PT Sinar Prima Plastisindo', id: 'PT Sinar Prima Plastisindo' },
    start: '2021',
    end: '2023',
    highlights: {
      en: [
        'Created production trial schedules aligned with customer demand and prepared weekly and monthly trial activity reports for new engineering projects.',
        'Prepared mass-production documents (PPAP, APQP, SPTT, HVPT) and audit documentation for customer review, and supported the TUVNORD certification process.',
        'Built and managed network systems for internal and external needs, supervised web delivery, and resolved hardware and software issues on client computers.',
      ],
      id: [
        'Menyusun jadwal production trial sesuai permintaan pelanggan serta laporan aktivitas trial mingguan dan bulanan untuk proyek engineering baru.',
        'Menyiapkan dokumen mass production (PPAP, APQP, SPTT, HVPT) dan dokumentasi audit untuk review pelanggan, serta mendukung proses sertifikasi TUVNORD.',
        'Membangun dan mengelola sistem jaringan untuk kebutuhan internal dan eksternal, mengawasi web delivery, serta menyelesaikan masalah hardware dan software di komputer klien.',
      ],
    },
    tech: ['IT Support', 'Network', 'Engineering Documentation'],
  },
  {
    id: 'cakratunggal-steel-mills',
    role: { en: 'Staff IT Support (Internship)', id: 'Staff IT Support (Magang)' },
    company: { en: 'PT Cakratunggal Steel Mills', id: 'PT Cakratunggal Steel Mills' },
    start: '2013',
    end: '2014',
    highlights: {
      en: [
        'Installed and configured hardware, software and operating systems, and monitored computer networks to detect and fix problems proactively.',
        'Determined network requirements and built efficient, scalable network infrastructure; performed regular data backups and assisted data recovery.',
      ],
      id: [
        'Melakukan instalasi dan konfigurasi hardware, software dan sistem operasi, serta memantau jaringan komputer untuk mendeteksi dan memperbaiki masalah secara proaktif.',
        'Menentukan kebutuhan jaringan dan membangun infrastruktur jaringan yang efisien dan scalable; melakukan backup data rutin dan membantu pemulihan data.',
      ],
    },
    tech: ['IT Support', 'Network', 'Hardware'],
  },
]
