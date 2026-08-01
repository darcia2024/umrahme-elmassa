// =============================================================
// DATA MANASIK INTERAKTIF
// Semua konten diturunkan dari data yang sudah tervalidasi:
//   - tatacara.ts (6 step alur umrah)
//   - ihram.ts (niatIhram, larganganIhram, tataCaraMemakaiIhram)
//   - doa.ts (kategori ihram, tawaf, sai, tahallul)
// TIDAK ada fakta ibadah baru yang dikarang.
// =============================================================

export interface ManasikKartu {
  id: string;
  judul: string;
  penjelasan: string;
  ilustrasiTipe: 'miqat' | 'ihram-pakaian' | 'talbiyah' | 'larangan' | 'kabah' | 'tawaf-arah' | 'hajar-aswad' | 'maqam-ibrahim' | 'shafa' | 'sai-7' | 'marwah' | 'tahallul' | 'selesai';
}

export interface ManasikUrutanItem {
  id: string;
  teks: string;
  urutanBenar: number;
}

export interface ManasikKuisSoal {
  id: string;
  pertanyaan: string;
  pilihan: string[];
  jawabanBenarIndex: number;
  penjelasanSingkat: string;
}

export interface ManasikModul {
  id: string;
  judul: string;
  subjudul: string;
  urutan: number;
  warna: 'rose' | 'gold' | 'teal' | 'mute';
  kartuKenali: ManasikKartu[];
  urutanItems: ManasikUrutanItem[];
  kuisSoal: ManasikKuisSoal[];
}

// -----------------------------------------------------------------------
// Modul 1 — Ihram & Miqat
// Sumber: tatacara.ts step 1-2, ihram.ts, doa.ts (niat-ihram-umrah, talbiyah)
// -----------------------------------------------------------------------
const modulIhram: ManasikModul = {
  id: 'ihram-miqat',
  judul: 'Ihram & Miqat',
  subjudul: 'Pintu masuk rangkaian umrah',
  urutan: 1,
  warna: 'rose',
  kartuKenali: [
    {
      id: 'ihram-1',
      judul: 'Apa itu Miqat?',
      penjelasan:
        'Miqat adalah titik batas yang sudah ditetapkan, di mana jamaah harus mulai berihram sebelum boleh memasuki Makkah untuk umrah. Melewati miqat tanpa ihram adalah pelanggaran.',
      ilustrasiTipe: 'miqat',
    },
    {
      id: 'ihram-2',
      judul: 'Bersiap Sebelum Berihram',
      penjelasan:
        'Potong kuku, merapikan rambut, dan mandi sunnah ihram sebelum berniat. Boleh memakai wewangian pada badan — tapi hanya SEBELUM berniat, bukan sesudahnya.',
      ilustrasiTipe: 'ihram-pakaian',
    },
    {
      id: 'ihram-3',
      judul: 'Pakaian Ihram',
      penjelasan:
        'Laki-laki: dua helai kain putih tak berjahit (izar & rida\'). Kepala terbuka, sandal yang tampak punggung kaki. Perempuan: pakaian biasa yang menutup aurat — tanpa niqab dan sarung tangan.',
      ilustrasiTipe: 'ihram-pakaian',
    },
    {
      id: 'ihram-4',
      judul: 'Niat & Talbiyah',
      penjelasan:
        'Di miqat, shalat sunnah 2 rakaat lalu ucapkan niat: "Labbaika Allāhumma \'umratan". Setelah itu, perbanyak talbiyah sepanjang perjalanan menuju Makkah. Laki-laki mengeraskan suara, perempuan melirihkan.',
      ilustrasiTipe: 'talbiyah',
    },
    {
      id: 'ihram-5',
      judul: 'Larangan Selama Ihram',
      penjelasan:
        'Sejak berniat ihram, berlaku larangan: tidak boleh pakai wewangian, tidak boleh potong rambut/kuku, tidak boleh berburu, menjauhi rafats, fusuq, dan pertengkaran. Larangan ini terangkat setelah tahallul.',
      ilustrasiTipe: 'larangan',
    },
  ],
  urutanItems: [
    { id: 'ih-u1', teks: 'Potong kuku & rapikan rambut (terakhir sebelum ihram)', urutanBenar: 1 },
    { id: 'ih-u2', teks: 'Mandi sunnah ihram', urutanBenar: 2 },
    { id: 'ih-u3', teks: 'Mengenakan pakaian ihram', urutanBenar: 3 },
    { id: 'ih-u4', teks: 'Shalat sunnah 2 rakaat di miqat', urutanBenar: 4 },
    { id: 'ih-u5', teks: 'Mengucapkan niat ihram & memulai talbiyah', urutanBenar: 5 },
  ],
  kuisSoal: [
    {
      id: 'ih-k1',
      pertanyaan: 'Di mana jamaah harus mulai berihram?',
      pilihan: ['Di dalam pesawat', 'Di Miqat', 'Di Masjidil Haram', 'Di hotel Makkah'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        'Miqat adalah titik batas yang ditetapkan. Jamaah wajib berihram sebelum melewatinya (Tata Cara Umrah, langkah 1).',
    },
    {
      id: 'ih-k2',
      pertanyaan: 'Bolehkah memakai wewangian SEBELUM niat ihram?',
      pilihan: ['Ya, boleh pada badan', 'Tidak boleh sama sekali', 'Hanya untuk perempuan', 'Boleh di pakaian saja'],
      jawabanBenarIndex: 0,
      penjelasanSingkat:
        'Wewangian boleh dipakai pada badan sebelum berniat ihram. Setelah niat, memakai wewangian menjadi larangan ihram (Panduan Ihram, bagian "Sebelum Berihram").',
    },
    {
      id: 'ih-k3',
      pertanyaan: 'Bacaan apa yang diperbanyak setelah berihram menuju Makkah?',
      pilihan: ['Doa safar', 'Talbiyah', 'Istighfar', 'Shalawat'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        'Talbiyah diperbanyak sejak berniat ihram hingga mulai tawaf. Laki-laki mengeraskan, perempuan melirihkan (Tata Cara Umrah, langkah 2).',
    },
    {
      id: 'ih-k4',
      pertanyaan: 'Larangan ihram mana yang berlaku untuk SEMUA jamaah, baik pria maupun wanita?',
      pilihan: ['Memakai pakaian berjahit', 'Memakai wewangian', 'Menutup kepala', 'Memakai niqab'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        'Memakai wewangian termasuk larangan umum (berlaku semua gender). Pakaian berjahit & menutup kepala khusus larangan pria; niqab khusus larangan wanita (Panduan Ihram, larangan ihram).',
    },
  ],
};

// -----------------------------------------------------------------------
// Modul 2 — Tawaf
// Sumber: tatacara.ts step 3-4, doa.ts (tawaf-putaran-1..7, tawaf-rabbana-atina)
// -----------------------------------------------------------------------
const modulTawaf: ManasikModul = {
  id: 'tawaf',
  judul: 'Tawaf',
  subjudul: 'Mengelilingi Ka\'bah 7 putaran',
  urutan: 2,
  warna: 'rose',
  kartuKenali: [
    {
      id: 'tw-1',
      judul: "Apa itu Tawaf?",
      penjelasan:
        "Tawaf adalah mengelilingi Ka'bah sebanyak tujuh putaran, berlawanan arah jarum jam. Ini adalah salah satu rukun utama umrah yang tidak boleh ditinggalkan.",
      ilustrasiTipe: 'kabah',
    },
    {
      id: 'tw-2',
      judul: 'Mulai dari Hajar Aswad',
      penjelasan:
        "Tawaf dimulai dan diakhiri di garis sejajar Hajar Aswad (batu hitam di sudut Ka'bah). Setiap kali melewati Hajar Aswad, itu menandai satu putaran baru.",
      ilustrasiTipe: 'hajar-aswad',
    },
    {
      id: 'tw-3',
      judul: "Ka'bah Selalu di Sebelah Kiri",
      penjelasan:
        "Saat tawaf, Ka'bah harus selalu berada di sebelah KIRI tubuh jamaah. Ini memastikan arah berlawanan jarum jam terjaga sepanjang 7 putaran.",
      ilustrasiTipe: 'tawaf-arah',
    },
    {
      id: 'tw-4',
      judul: 'Setelah Tawaf Selesai',
      penjelasan:
        "Setelah 7 putaran selesai, jamaah shalat sunnah 2 rakaat di belakang Maqam Ibrahim bila memungkinkan, kemudian minum air zamzam sebelum melanjutkan ke Sa'i.",
      ilustrasiTipe: 'maqam-ibrahim',
    },
  ],
  urutanItems: [
    { id: 'tw-u1', teks: 'Pastikan sudah berwudhu (tawaf harus dalam keadaan suci)', urutanBenar: 1 },
    { id: 'tw-u2', teks: "Masuk Masjidil Haram, mendahulukan kaki kanan", urutanBenar: 2 },
    { id: 'tw-u3', teks: "Menuju posisi sejajar Hajar Aswad untuk memulai", urutanBenar: 3 },
    { id: 'tw-u4', teks: "Mulai tawaf — Ka'bah di sebelah kiri, berputar berlawanan jarum jam", urutanBenar: 4 },
    { id: 'tw-u5', teks: "Selesaikan 7 putaran sambil berdoa di tiap putaran", urutanBenar: 5 },
    { id: 'tw-u6', teks: 'Shalat sunnah 2 rakaat di belakang Maqam Ibrahim & minum zamzam', urutanBenar: 6 },
  ],
  kuisSoal: [
    {
      id: 'tw-k1',
      pertanyaan: "Berapa kali jamaah mengelilingi Ka'bah dalam satu tawaf?",
      pilihan: ['5 kali', '7 kali', '3 kali', '9 kali'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Tawaf dilakukan 7 putaran — ini adalah ketentuan baku yang tidak boleh dikurangi (Tata Cara Umrah, langkah 3).",
    },
    {
      id: 'tw-k2',
      pertanyaan: 'Tawaf dilakukan dengan arah...',
      pilihan: [
        'Searah jarum jam',
        'Berlawanan arah jarum jam',
        'Boleh pilih arah sendiri',
        'Arah berganti tiap putaran',
      ],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Tawaf selalu berlawanan arah jarum jam sehingga Ka'bah berada di sebelah kiri jamaah (Tata Cara Umrah, langkah 3).",
    },
    {
      id: 'tw-k3',
      pertanyaan: 'Doa apa yang dibaca di antara Rukun Yamani dan Hajar Aswad pada setiap putaran?',
      pilihan: ['Talbiyah', 'Istighfar', 'Rabbana Atina', "Doa melihat Ka'bah"],
      jawabanBenarIndex: 2,
      penjelasanSingkat:
        '"Rabbana atina fid-dunya hasanah..." dibaca di antara Rukun Yamani dan Hajar Aswad pada setiap putaran (Kumpulan Doa — Doa Tawaf: Doa Antara Rukun Yamani & Hajar Aswad).',
    },
    {
      id: 'tw-k4',
      pertanyaan: 'Apa yang dilakukan langsung setelah selesai 7 putaran tawaf?',
      pilihan: [
        "Langsung lanjut Sa'i",
        'Shalat sunnah di Maqam Ibrahim & minum zamzam',
        'Kembali ke hotel',
        'Tahallul',
      ],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Setelah tawaf selesai, jamaah shalat sunnah 2 rakaat di belakang Maqam Ibrahim bila memungkinkan, lalu minum air zamzam (Tata Cara Umrah, langkah 4).",
    },
  ],
};

// -----------------------------------------------------------------------
// Modul 3 — Sa'i
// Sumber: tatacara.ts step 5, doa.ts sai-putaran-1..7 (field waktu & cara)
// -----------------------------------------------------------------------
const modulSai: ManasikModul = {
  id: 'sai',
  judul: "Sa'i",
  subjudul: 'Berjalan antara Shafa & Marwah',
  urutan: 3,
  warna: 'gold',
  kartuKenali: [
    {
      id: 'sai-1',
      judul: "Apa itu Sa'i?",
      penjelasan:
        "Sa'i adalah berjalan antara dua bukit, Shafa dan Marwah, sebanyak tujuh lintasan. Ini mengikuti jejak Siti Hajar yang berlari-lari mencari air untuk anaknya, Ismail.",
      ilustrasiTipe: 'shafa',
    },
    {
      id: 'sai-2',
      judul: 'Dimulai dari Bukit Shafa',
      penjelasan:
        "Sa'i selalu dimulai dari bukit Shafa. Satu lintasan = berjalan dari Shafa ke Marwah (atau sebaliknya). Sa'i diakhiri di Marwah setelah 7 lintasan.",
      ilustrasiTipe: 'shafa',
    },
    {
      id: 'sai-3',
      judul: '7 Lintasan, Bukan 7 Putaran',
      penjelasan:
        "Shafa → Marwah = lintasan ke-1. Marwah → Shafa = lintasan ke-2. Dan seterusnya. Lintasan ke-7 (ganjil) selesai di Marwah. Total: 7 lintasan, bukan 7 putaran bolak-balik.",
      ilustrasiTipe: 'sai-7',
    },
    {
      id: 'sai-4',
      judul: 'Doa di Setiap Lintasan',
      penjelasan:
        "Tiap lintasan punya bacaan doa yang berbeda — dimulai dengan takbir (Allahu Akbar) di awal setiap lintasan. Jamaah berdoa dengan khusuk selama berjalan dari satu bukit ke bukit lainnya.",
      ilustrasiTipe: 'marwah',
    },
  ],
  urutanItems: [
    { id: 'sai-u1', teks: 'Naik ke bukit Shafa, menghadap Ka\'bah', urutanBenar: 1 },
    { id: 'sai-u2', teks: 'Membaca takbir (Allahu Akbar) dan berdoa', urutanBenar: 2 },
    { id: 'sai-u3', teks: 'Berjalan menuju bukit Marwah — itu lintasan ke-1', urutanBenar: 3 },
    { id: 'sai-u4', teks: 'Dari Marwah, kembali ke Shafa — itu lintasan ke-2', urutanBenar: 4 },
    { id: 'sai-u5', teks: 'Ulangi hingga lintasan ke-7 — selesai di Marwah', urutanBenar: 5 },
  ],
  kuisSoal: [
    {
      id: 'sai-k1',
      pertanyaan: "Sa'i dimulai dari bukit apa?",
      pilihan: ['Marwah', 'Shafa', 'Maqam Ibrahim', 'Arafah'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Sa'i selalu dimulai dari bukit Shafa dan diakhiri di Marwah (Tata Cara Umrah, langkah 5; Doa Sa'i Lintasan 1 — Shafa ke Marwah).",
    },
    {
      id: 'sai-k2',
      pertanyaan: "Berapa lintasan total dalam Sa'i?",
      pilihan: ['5 lintasan', '9 lintasan', '7 lintasan', '14 lintasan'],
      jawabanBenarIndex: 2,
      penjelasanSingkat:
        "Sa'i dilakukan 7 lintasan (bukan 7 putaran). Dimulai Shafa, selesai di Marwah (Tata Cara Umrah, langkah 5).",
    },
    {
      id: 'sai-k3',
      pertanyaan: "Sa'i berakhir di bukit apa?",
      pilihan: ['Shafa', 'Marwah', 'Di tengah jalan', 'Hajar Aswad'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Lintasan ke-7 (angka ganjil, Shafa→Marwah) selesai di Marwah — bukan kembali ke Shafa (Tata Cara Umrah, langkah 5: 'diakhiri di Marwah').",
    },
    {
      id: 'sai-k4',
      pertanyaan: "Doa apa yang pertama dibaca di awal setiap lintasan Sa'i?",
      pilihan: ['Talbiyah', 'Takbir — Allahu Akbar', 'Rabbana Atina', 'Doa masuk masjid'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Setiap lintasan sa'i dibuka dengan takbir: 'Allaahu Akbar, Allaahu Akbar, Allaahu Akbar...' (Kumpulan Doa — Sa'i Lintasan 1 s.d. 7).",
    },
  ],
};

// -----------------------------------------------------------------------
// Modul 4 — Tahallul & Penutup
// Sumber: tatacara.ts step 6, ihram.ts larangan, doa.ts (kategori tahallul)
// -----------------------------------------------------------------------
const modulTahallul: ManasikModul = {
  id: 'tahallul',
  judul: 'Tahallul & Penutup',
  subjudul: 'Tanda selesainya ihram',
  urutan: 4,
  warna: 'mute',
  kartuKenali: [
    {
      id: 'th-1',
      judul: 'Apa itu Tahallul?',
      penjelasan:
        "Tahallul adalah mencukur atau memotong rambut sebagai tanda selesainya ihram. Ini adalah langkah terakhir dalam rangkaian umrah, dan dilakukan setelah Sa'i selesai.",
      ilustrasiTipe: 'tahallul',
    },
    {
      id: 'th-2',
      judul: 'Perbedaan Pria & Wanita',
      penjelasan:
        'Pria: mencukur gundul (lebih utama) atau setidaknya memendekkan rambut dari seluruh kepala. Wanita: cukup memotong sepanjang seujung jari dari bagian rambut mana pun.',
      ilustrasiTipe: 'tahallul',
    },
    {
      id: 'th-3',
      judul: 'Semua Larangan Terangkat',
      penjelasan:
        'Setelah tahallul, semua larangan ihram (wewangian, pakaian berjahit, dll.) terangkat sepenuhnya. Dengan ini, rangkaian ibadah umrah dinyatakan selesai — insya Allah mabrur.',
      ilustrasiTipe: 'selesai',
    },
  ],
  urutanItems: [
    { id: 'th-u1', teks: "Selesaikan lintasan ke-7 Sa'i di bukit Marwah", urutanBenar: 1 },
    { id: 'th-u2', teks: 'Menuju tempat cukur/potong rambut', urutanBenar: 2 },
    { id: 'th-u3', teks: 'Membaca niat/doa tahallul', urutanBenar: 3 },
    { id: 'th-u4', teks: 'Mencukur (pria) atau memotong seujung jari (wanita)', urutanBenar: 4 },
    { id: 'th-u5', teks: 'Larangan ihram terangkat — umrah selesai', urutanBenar: 5 },
  ],
  kuisSoal: [
    {
      id: 'th-k1',
      pertanyaan: 'Apa yang dilakukan jamaah saat tahallul?',
      pilihan: ['Potong kuku', 'Memotong atau mencukur rambut', 'Mandi wajib', 'Berpuasa'],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Tahallul adalah mencukur (gundul, lebih utama bagi pria) atau memotong rambut. Ini adalah tanda sah-nya keluar dari ihram (Tata Cara Umrah, langkah 6).",
    },
    {
      id: 'th-k2',
      pertanyaan: 'Berapa banyak rambut yang minimal dipotong oleh jamaah wanita saat tahallul?',
      pilihan: ['Gundul seperti pria', 'Setengah panjang rambut', 'Seujung jari', 'Tidak perlu potong rambut'],
      jawabanBenarIndex: 2,
      penjelasanSingkat:
        "Wanita cukup memotong seujung jari dari rambut mana saja — ini sudah sah untuk tahallul (Tata Cara Umrah, langkah 6).",
    },
    {
      id: 'th-k3',
      pertanyaan: 'Apa yang terjadi setelah tahallul?',
      pilihan: [
        'Larangan ihram terangkat sepenuhnya',
        'Harus shalat sunnah 4 rakaat',
        'Harus berwudhu ulang',
        'Perlu pergi ke Masjid Nabawi',
      ],
      jawabanBenarIndex: 0,
      penjelasanSingkat:
        "Tahallul menandai berakhirnya ihram. Semua larangan (wewangian, pakaian berjahit, dll.) terangkat setelah tahallul (Tata Cara Umrah, langkah 6; Panduan Ihram).",
    },
    {
      id: 'th-k4',
      pertanyaan: 'Urutan rangkaian umrah yang benar adalah...',
      pilihan: [
        "Ihram → Sa'i → Tawaf → Tahallul",
        "Ihram → Tawaf → Sa'i → Tahallul",
        "Tawaf → Ihram → Sa'i → Tahallul",
        "Tawaf → Sa'i → Ihram → Tahallul",
      ],
      jawabanBenarIndex: 1,
      penjelasanSingkat:
        "Urutan baku umrah: (1) Ihram di Miqat → (2) Tawaf 7 putaran → (3) Sa'i 7 lintasan → (4) Tahallul. Ini tidak boleh ditukar (Tata Cara Umrah, 6 langkah).",
    },
  ],
};

export const manasikModulList: ManasikModul[] = [
  modulIhram,
  modulTawaf,
  modulSai,
  modulTahallul,
];

export function getModulById(id: string): ManasikModul | undefined {
  return manasikModulList.find((m) => m.id === id);
}

// -----------------------------------------------------------------------
// Progress localStorage helper
// Key: umrahme.manasik.{modulId}
// -----------------------------------------------------------------------
export interface ModulProgress {
  partADone: boolean;
  partBDone: boolean;
  partBBenar: boolean;
  partCScore: number;
  partCTotal: number;
  selesai: boolean;
}

const defaultProgress = (): ModulProgress => ({
  partADone: false,
  partBDone: false,
  partBBenar: false,
  partCScore: 0,
  partCTotal: 0,
  selesai: false,
});

export function getModulProgress(modulId: string): ModulProgress {
  try {
    const raw = localStorage.getItem(`umrahme.manasik.${modulId}`);
    return raw ? { ...defaultProgress(), ...(JSON.parse(raw) as Partial<ModulProgress>) } : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

export function saveModulProgress(modulId: string, progress: Partial<ModulProgress>): void {
  try {
    const current = getModulProgress(modulId);
    localStorage.setItem(`umrahme.manasik.${modulId}`, JSON.stringify({ ...current, ...progress }));
  } catch {
    // localStorage not available
  }
}

export function resetModulProgress(modulId: string): void {
  try {
    localStorage.removeItem(`umrahme.manasik.${modulId}`);
  } catch {
    // localStorage not available
  }
}

// ── Sinkronisasi Manasik ke Supabase ─────────────────────────
// Import lazy (di dalam fungsi) agar tidak menyebabkan circular-dep saat tree shaking

export async function syncManasikFromCloud(tenantId: string, nomor: string): Promise<void> {
  const { getJamaahData } = await import('../lib/supabase');
  const cloud = await getJamaahData<Record<string, ModulProgress>>(tenantId, nomor, 'manasik');
  if (!cloud) return;
  Object.entries(cloud).forEach(([modulId, prog]) => {
    try {
      localStorage.setItem(`umrahme.manasik.${modulId}`, JSON.stringify(prog));
    } catch { /* noop */ }
  });
}

export async function pushManasikToCloud(tenantId: string, nomor: string): Promise<void> {
  const { setJamaahData } = await import('../lib/supabase');
  const all: Record<string, ModulProgress> = {};
  for (const m of manasikModulList) {
    all[m.id] = getModulProgress(m.id);
  }
  await setJamaahData(tenantId, nomor, 'manasik', all);
}
