// =============================================================
// DATA RITUAL NAVIGATOR — 10 tahap rangkaian umrah
// Urutan ini selaras dengan tataCaraSteps di tatacara.ts
// (Navigator lebih granular, Tata Cara lebih ringkas — keduanya
//  konsisten dalam urutan & istilah, tidak saling kontradiksi.)
// =============================================================

export interface RitualStep {
  id: string;
  urutan: number;
  judul: string;
  deskripsiSingkat: string;
  doaTerkaitId?: string;
  /** Route ke fitur pendamping (mis. Counter Tawaf). */
  linkKeFitur?: string;
  linkKeFiturLabel?: string;
  /** Pengingat krusial satu kalimat — ditampilkan dengan penekanan gold. */
  catatanPenting?: string;
}

export const ritualSteps: RitualStep[] = [
  {
    id: 'niat-ihram',
    urutan: 1,
    judul: 'Niat Ihram dari Miqat',
    deskripsiSingkat:
      'Di titik miqat, bersuci (mandi sunnah), lalu ucapkan niat umrah dalam hati. Sejak saat ini berlaku seluruh larangan ihram.',
    doaTerkaitId: 'ihram-niat-umrah',
    linkKeFitur: '/panduan/ihram',
    linkKeFiturLabel: 'Panduan Ihram',
    catatanPenting:
      'Hindari larangan ihram sejak niat diucapkan: tidak memotong rambut/kuku, tidak memakai wangi-wangian.',
  },
  {
    id: 'pakai-ihram-talbiyah',
    urutan: 2,
    judul: 'Memakai Ihram & Membaca Talbiyah',
    deskripsiSingkat:
      'Kenakan kain ihram (laki-laki: 2 lembar tanpa jahitan; perempuan: pakaian menutup aurat tanpa penutup wajah & telapak tangan), lalu mulai membaca talbiyah.',
    doaTerkaitId: 'ihram-talbiyah',
    catatanPenting:
      'Laki-laki mengeraskan talbiyah; perempuan melirihkan.',
  },
  {
    id: 'perjalanan-makkah',
    urutan: 3,
    judul: 'Perjalanan Menuju Makkah',
    deskripsiSingkat:
      'Perbanyak bacaan talbiyah selama perjalanan — di kendaraan, di jalanan, di setiap kesempatan. Ini waktu yang baik untuk berdoa dan merenungkan niat.',
    doaTerkaitId: 'ihram-talbiyah',
  },
  {
    id: 'masuk-masjidil-haram',
    urutan: 4,
    judul: 'Memasuki Masjidil Haram',
    deskripsiSingkat:
      'Masuk dengan kaki kanan, bacakan doa masuk masjid. Saat tiba di dalam, hentikan talbiyah ketika akan memulai tawaf.',
    doaTerkaitId: 'makkah-masuk-masjidil-haram',
    catatanPenting:
      'Hentikan talbiyah saat akan memulai tawaf — talbiyah tidak dibaca lagi hingga selesai umrah.',
  },
  {
    id: 'melihat-kabah',
    urutan: 5,
    judul: "Melihat Ka'bah",
    deskripsiSingkat:
      "Saat pertama kali Ka'bah terlihat, berhentilah sejenak dan panjatkan doa. Momen ini sangat mustajab — sampaikan hajat dengan penuh harap dan ketulusan.",
    doaTerkaitId: 'makkah-melihat-kabah',
    catatanPenting:
      "Doa pertama kali melihat Ka'bah termasuk doa yang sangat dikabulkan. Jangan lewatkan.",
  },
  {
    id: 'tawaf',
    urutan: 6,
    judul: 'Tawaf 7 Putaran',
    deskripsiSingkat:
      "Kelilingi Ka'bah 7 putaran berlawanan arah jarum jam. Ka'bah selalu di sisi kiri. Setiap putaran dimulai dan diakhiri sejajar Hajar Aswad.",
    doaTerkaitId: 'tawaf-rabbana-atina',
    linkKeFitur: '/ibadah/tawaf',
    linkKeFiturLabel: 'Buka Counter Tawaf',
    catatanPenting:
      "Ka'bah harus selalu berada di sisi KIRI Anda. Putaran dimulai dari garis sejajar Hajar Aswad.",
  },
  {
    id: 'shalat-maqam-ibrahim',
    urutan: 7,
    judul: 'Shalat Sunnah di Maqam Ibrahim',
    deskripsiSingkat:
      'Seusai tawaf, shalat sunnah 2 rakaat di belakang Maqam Ibrahim. Rakaat pertama baca Al-Kafirun, rakaat kedua baca Al-Ikhlas (setelah Al-Fatihah).',
    catatanPenting:
      'Jika sangat penuh, boleh shalat di mana saja di dalam Masjidil Haram — tidak harus persis di belakang Maqam Ibrahim.',
  },
  {
    id: 'minum-zamzam',
    urutan: 8,
    judul: 'Minum Air Zamzam',
    deskripsiSingkat:
      'Minum air zamzam sambil menghadap Ka\'bah, berdiri, dengan niat yang baik. Sunnah diminum puas hingga kenyang.',
    doaTerkaitId: 'doa-minum-zamzam',
    catatanPenting:
      'Niatkanlah hajat atau kesembuhan yang ingin dikabulkan saat meminum zamzam.',
  },
  {
    id: 'sai',
    urutan: 9,
    judul: "Sa'i 7 Lintasan",
    deskripsiSingkat:
      'Berjalan dari bukit Shafa ke Marwah dan sebaliknya sebanyak 7 lintasan. Dimulai dari Shafa (lintasan 1) dan diakhiri di Marwah (lintasan 7).',
    linkKeFitur: '/ibadah/sai',
    linkKeFiturLabel: "Buka Counter Sa'i",
    catatanPenting:
      "DIMULAI dari Shafa, DIAKHIRI di Marwah. Lintasan ganjil (1,3,5,7) arah Shafa→Marwah; genap (2,4,6) arah Marwah→Shafa.",
  },
  {
    id: 'tahallul',
    urutan: 10,
    judul: 'Tahallul',
    deskripsiSingkat:
      'Cukur atau potong rambut untuk mengakhiri ihram. Dengan ini, seluruh larangan ihram terangkat dan umrah selesai. Alhamdulillah.',
    doaTerkaitId: 'tahallul-niat',
    catatanPenting:
      'Laki-laki lebih utama mencukur gundul (halq). Perempuan cukup memotong beberapa helai rambut sepanjang ujung jari.',
  },
];

export const TOTAL_STEPS = ritualSteps.length; // 10
