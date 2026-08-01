import type { TataCaraStep } from '../types';

// =============================================================
// DATA PANDUAN TATA CARA UMRAH (alur urut, kartu bernomor)
// Miqat → Ihram → Tawaf → Sa'i → Tahallul
// =============================================================

export const tataCaraSteps: TataCaraStep[] = [
  {
    nomor: 1,
    judul: 'Miqat & Niat Ihram',
    deskripsi:
      'Di titik miqat, jamaah bersuci (mandi sunnah), mengenakan pakaian ihram, lalu berniat umrah. Sejak saat ini berlaku larangan-larangan ihram.',
    tautan: '/panduan/ihram',
    tautanLabel: 'Buka Panduan Ihram',
  },
  {
    nomor: 2,
    judul: 'Talbiyah Menuju Makkah',
    deskripsi:
      'Memperbanyak talbiyah sepanjang perjalanan menuju Masjidil Haram, dengan dikeraskan bagi laki-laki dan dilirihkan bagi perempuan.',
    tautan: '/doa/talbiyah',
    tautanLabel: 'Baca Talbiyah',
  },
  {
    nomor: 3,
    judul: 'Tawaf 7 Putaran',
    deskripsi:
      'Mengelilingi Ka’bah sebanyak tujuh putaran berlawanan arah jarum jam, dimulai dan diakhiri di garis sejajar Hajar Aswad.',
    tautan: '/ibadah/tawaf',
    tautanLabel: 'Buka Counter Tawaf',
  },
  {
    nomor: 4,
    judul: 'Shalat di Maqam Ibrahim',
    deskripsi:
      'Setelah tawaf, shalat sunnah dua rakaat di belakang Maqam Ibrahim bila memungkinkan, lalu minum air zamzam.',
  },
  {
    nomor: 5,
    judul: "Sa'i Shafa – Marwah",
    deskripsi:
      'Berjalan antara bukit Shafa dan Marwah sebanyak tujuh kali lintasan, dimulai dari Shafa dan diakhiri di Marwah.',
    tautan: '/doa?kategori=sai',
    tautanLabel: "Doa Sa'i",
  },
  {
    nomor: 6,
    judul: 'Tahallul',
    deskripsi:
      'Mencukur (gundul/lebih utama bagi laki-laki) atau memendekkan rambut. Bagi perempuan cukup memotong seujung jari. Dengan ini umrah selesai dan larangan ihram terangkat.',
    tautan: '/doa?kategori=tahallul',
    tautanLabel: 'Doa Tahallul',
  },
];
