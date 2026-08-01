export interface TitikMiqat {
  id: string;
  nama: string;
  namaArab: string;
  namaLain?: string;
  untuk: string;
  jarakKeMakkah: string;
  koordinat?: { lat: number; lng: number };
  keterangan: string;
}

export const daftarMiqat: TitikMiqat[] = [
  {
    id: 'dzulhulaifah',
    nama: 'Dzulhulaifah (Bir Ali)',
    namaArab: '\u0630\u0648 \u0627\u0644\u062d\u0644\u064a\u0641\u0629',
    namaLain: 'Bir Ali / Masjid Asy-Syajarah',
    untuk: 'Penduduk Madinah & jamaah yang berangkat dari/melewati Madinah',
    jarakKeMakkah: '\u00b1 450 km (utara Makkah)',
    koordinat: { lat: 24.4131, lng: 39.5419 },
    keterangan:
      'Miqat terjauh dari Makkah dan yang paling dikenal jamaah Indonesia gelombang dari Madinah. Rasulullah \ufdfa berihram dari sini saat Haji Wada. Kini berupa kompleks Masjid Bir Ali yang besar dan lengkap.',
  },
  {
    id: 'juhfah',
    nama: 'Al-Juhfah',
    namaArab: '\u0627\u0644\u062c\u062d\u0641\u0629',
    namaLain: 'Kini umumnya dari Rabigh',
    untuk: 'Jamaah dari arah Syam (Suriah, Lebanon, Yordania, Palestina) & Mesir',
    jarakKeMakkah: '\u00b1 187 km (barat laut Makkah)',
    koordinat: { lat: 22.7000, lng: 39.1333 },
    keterangan:
      'Terletak di barat laut Makkah. Karena lokasi asli sudah jarang dilewati, kini jamaah umumnya mengambil miqat dari Rabigh (\u00b1 15 km dari Juhfah). Sudah ada Masjid Miqat Al-Juhfah sejak 1306 H.',
  },
  {
    id: 'qarnul-manazil',
    nama: 'Qarnul Manazil',
    namaArab: '\u0642\u0631\u0646 \u0627\u0644\u0645\u0646\u0627\u0632\u0644',
    namaLain: 'Kini disebut As-Sail Al-Kabir',
    untuk: 'Jamaah dari arah Najd & wilayah timur (termasuk dari Thaif)',
    jarakKeMakkah: '\u00b1 75\u201394 km (timur Makkah)',
    koordinat: { lat: 21.6286, lng: 40.4231 },
    keterangan:
      'Bukit/lembah di timur Makkah, membentang hingga arah Arafah. Saat ini dikenal sebagai As-Sail Al-Kabir dan menjadi miqat praktis bagi jamaah dari arah timur, termasuk pengganti Dzatu Irq yang aksesnya tertutup.',
  },
  {
    id: 'yalamlam',
    nama: 'Yalamlam',
    namaArab: '\u064a\u0644\u0645\u0644\u0645',
    namaLain: 'Kini disebut As-Sa\u2019diyyah',
    untuk: 'Jamaah dari arah Yaman & Asia (termasuk Indonesia via jalur laut/udara dari selatan)',
    jarakKeMakkah: '\u00b1 54 km (selatan Makkah)',
    koordinat: { lat: 20.5167, lng: 39.8667 },
    keterangan:
      'Lembah/perbukitan di selatan Makkah. Dahulu menjadi miqat jamaah Indonesia yang datang dengan kapal laut. Jamaah pesawat yang melintas di atasnya berihram saat kru mengumumkan posisi sejajar Yalamlam.',
  },
  {
    id: 'dzatu-irq',
    nama: "Dzatu 'Irq",
    namaArab: '\u0630\u0627\u062a \u0639\u0631\u0642',
    namaLain: 'Kini disebut Adh-Dharibah',
    untuk: 'Jamaah dari arah Irak & sekitarnya',
    jarakKeMakkah: '\u00b1 94\u2013100 km (timur laut Makkah)',
    koordinat: { lat: 21.9333, lng: 40.4167 },
    keterangan:
      'Ditetapkan oleh Khalifah Umar bin Khattab \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 berdasarkan prinsip muhadzah (kesejajaran jalur) untuk memudahkan penduduk Irak. Akses ke lokasi asli kini tertutup, sehingga jamaah dari timur umumnya mengambil miqat di Qarnul Manazil.',
  },
];
