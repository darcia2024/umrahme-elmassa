// =============================================================
// DATA GLOSARIUM — data/glosarium.ts
// Kamus istilah umrah/haji. Disusun ringkas & akurat.
// =============================================================

export interface IstilahGlosarium {
  id: string;
  istilah: string;
  arab?: string;
  arti: string;
  kategori: 'ihram' | 'tawaf' | 'sai' | 'tempat' | 'umum' | 'waktu';
}

export const daftarIstilah: IstilahGlosarium[] = [
  // ── Ihram ──
  { id: 'ihram', istilah: 'Ihram', arab: '\u0625\u062d\u0631\u0627\u0645', kategori: 'ihram',
    arti: 'Niat memasuki ibadah umrah/haji, ditandai dengan mengenakan pakaian ihram dan berlakunya larangan-larangan tertentu. Bagi pria: dua helai kain putih tak berjahit; bagi wanita: pakaian biasa yang menutup aurat.' },
  { id: 'miqat', istilah: 'Miqat', arab: '\u0645\u064a\u0642\u0627\u062a', kategori: 'ihram',
    arti: 'Batas tempat (miqat makani) atau waktu (miqat zamani) untuk memulai ihram. Melewatinya tanpa berihram bagi yang hendak umrah/haji mewajibkan dam.' },
  { id: 'talbiyah', istilah: 'Talbiyah', arab: '\u062a\u0644\u0628\u064a\u0629', kategori: 'ihram',
    arti: 'Bacaan "Labbaika All\u0101humma labbaik\u2026" yang diucapkan setelah berniat ihram sebagai jawaban atas panggilan Allah, diperbanyak hingga memulai tawaf.' },
  { id: 'dam', istilah: 'Dam', arab: '\u062f\u0645', kategori: 'ihram',
    arti: 'Denda atau tebusan (secara bahasa berarti "darah") yang wajib ditunaikan karena melanggar larangan ihram atau meninggalkan wajib umrah/haji, umumnya berupa menyembelih kambing.' },
  { id: 'fidyah', istilah: 'Fidyah', arab: '\u0641\u062f\u064a\u0629', kategori: 'ihram',
    arti: 'Tebusan atas pelanggaran tertentu saat ihram (mis. mencukur rambut karena uzur), bisa berupa puasa, sedekah, atau menyembelih.' },
  { id: 'idhtiba', istilah: 'Idhtiba\u2019', arab: '\u0627\u0636\u0637\u0628\u0627\u0639', kategori: 'ihram',
    arti: 'Cara mengenakan kain ihram bagi pria saat tawaf qudum/umrah: membuka bahu kanan dengan menyelempangkan kain ke bawah ketiak kanan dan ujungnya di atas bahu kiri. Hanya saat tawaf, lalu dirapikan kembali.' },

  // ── Tawaf ──
  { id: 'tawaf', istilah: 'Tawaf', arab: '\u0637\u0648\u0627\u0641', kategori: 'tawaf',
    arti: 'Mengelilingi Ka\u2019bah sebanyak 7 putaran dengan posisi Ka\u2019bah di sebelah kiri, dimulai dan diakhiri di garis sejajar Hajar Aswad.' },
  { id: 'raml', istilah: 'Raml', arab: '\u0631\u0645\u0644', kategori: 'tawaf',
    arti: 'Berjalan cepat dengan langkah pendek (jalan tergesa namun bukan berlari) yang disunnahkan bagi pria pada 3 putaran pertama tawaf qudum/umrah.' },
  { id: 'hajar-aswad', istilah: 'Hajar Aswad', arab: '\u0627\u0644\u062d\u062c\u0631 \u0627\u0644\u0623\u0633\u0648\u062f', kategori: 'tawaf',
    arti: 'Batu hitam mulia di salah satu sudut Ka\u2019bah, titik awal & akhir setiap putaran tawaf. Disunnahkan menciumnya, atau cukup memberi isyarat tangan bila ramai.' },
  { id: 'multazam', istilah: 'Multazam', arab: '\u0627\u0644\u0645\u0644\u062a\u0632\u0645', kategori: 'tawaf',
    arti: 'Bagian dinding Ka\u2019bah antara Hajar Aswad dan pintu Ka\u2019bah; tempat yang dianjurkan untuk berdoa dengan menempelkan dada dan wajah bila memungkinkan.' },
  { id: 'maqam-ibrahim', istilah: 'Maqam Ibrahim', arab: '\u0645\u0642\u0627\u0645 \u0625\u0628\u0631\u0627\u0647\u064a\u0645', kategori: 'tawaf',
    arti: 'Batu berpijak Nabi Ibrahim saat membangun Ka\u2019bah, kini dalam kubah kaca. Disunnahkan shalat 2 rakaat di belakangnya setelah tawaf.' },
  { id: 'hijir-ismail', istilah: 'Hijir Ismail', arab: '\u062d\u062c\u0631 \u0625\u0633\u0645\u0627\u0639\u064a\u0644', kategori: 'tawaf',
    arti: 'Area setengah lingkaran berpagar rendah di sisi Ka\u2019bah. Termasuk bagian Ka\u2019bah, sehingga tawaf harus mengelilingi di LUAR pagar ini, tidak memotong masuk.' },
  { id: 'syadzarwan', istilah: 'Syadzarwan', arab: '\u0634\u0627\u0630\u0631\u0648\u0627\u0646', kategori: 'tawaf',
    arti: 'Bagian dasar Ka\u2019bah yang sedikit menonjol; termasuk bagian Ka\u2019bah, maka saat tawaf jangan menapak di atasnya agar putaran sah.' },
  { id: 'tawaf-wada', istilah: 'Tawaf Wada\u2019', arab: '\u0637\u0648\u0627\u0641 \u0627\u0644\u0648\u062f\u0627\u0639', kategori: 'tawaf',
    arti: 'Tawaf perpisahan yang dilakukan saat akan meninggalkan Makkah. Diwajibkan setelah haji; untuk umrah, mayoritas ulama menganggapnya tidak wajib namun dianjurkan.' },

  // ── Sai ──
  { id: 'sai', istilah: 'Sa\u2019i', arab: '\u0633\u0639\u064a', kategori: 'sai',
    arti: 'Berjalan bolak-balik antara bukit Shafa dan Marwah sebanyak 7 lintasan, mengenang perjuangan Siti Hajar mencari air untuk Nabi Ismail.' },
  { id: 'shafa', istilah: 'Shafa', arab: '\u0627\u0644\u0635\u0641\u0627', kategori: 'sai',
    arti: 'Bukit kecil di dalam Masjidil Haram, titik awal sai. Sai dimulai dari Shafa dan berakhir di Marwah.' },
  { id: 'marwah', istilah: 'Marwah', arab: '\u0627\u0644\u0645\u0631\u0648\u0629', kategori: 'sai',
    arti: 'Bukit kecil di ujung lain lintasan sai. Satu perjalanan Shafa\u2192Marwah atau Marwah\u2192Shafa dihitung satu lintasan.' },
  { id: 'masa', istilah: 'Mas\u2019a', arab: '\u0627\u0644\u0645\u0633\u0639\u0649', kategori: 'sai',
    arti: 'Lintasan/jalur tempat pelaksanaan sai antara Shafa dan Marwah, kini berupa lorong panjang ber-AC di dalam kompleks Masjidil Haram.' },
  { id: 'lampu-hijau', istilah: 'Lampu Hijau (Tanda Sai)', kategori: 'sai',
    arti: 'Penanda hijau di lintasan sai yang menunjukkan area di mana pria disunnahkan berlari-lari kecil (antara dua tanda hijau).' },

  // ── Tahallul & penutup ──
  { id: 'tahallul', istilah: 'Tahallul', arab: '\u062a\u062d\u0644\u0644', kategori: 'umum',
    arti: 'Keluar dari keadaan ihram dengan mencukur (tahliq) atau memendekkan (taqshir) rambut setelah selesai sai, sehingga larangan ihram kembali halal.' },
  { id: 'tahliq', istilah: 'Tahliq', arab: '\u062a\u062d\u0644\u064a\u0642', kategori: 'umum',
    arti: 'Mencukur habis seluruh rambut kepala saat tahallul. Lebih utama bagi pria; wanita cukup memendekkan.' },
  { id: 'taqshir', istilah: 'Taqshir', arab: '\u062a\u0642\u0635\u064a\u0631', kategori: 'umum',
    arti: 'Memendekkan/menggunting sebagian rambut (minimal seukuran ruas jari) sebagai bentuk tahallul. Pilihan bagi pria, dan cara bagi wanita.' },

  // ── Tempat ──
  { id: 'kabah', istilah: 'Ka\u2019bah', arab: '\u0627\u0644\u0643\u0639\u0628\u0629', kategori: 'tempat',
    arti: 'Bangunan kubus di tengah Masjidil Haram, kiblat umat Islam dan pusat tawaf. Disebut juga Baitullah (rumah Allah).' },
  { id: 'masjidil-haram-g', istilah: 'Masjidil Haram', arab: '\u0627\u0644\u0645\u0633\u062c\u062f \u0627\u0644\u062d\u0631\u0627\u0645', kategori: 'tempat',
    arti: 'Masjid teragung dalam Islam di Makkah yang mengelilingi Ka\u2019bah; tempat pelaksanaan tawaf dan sai.' },
  { id: 'mataf', istilah: 'Mataf', arab: '\u0627\u0644\u0645\u0637\u0627\u0641', kategori: 'tempat',
    arti: 'Area lantai melingkar di sekeliling Ka\u2019bah tempat jamaah melakukan tawaf.' },
  { id: 'raudhah-g', istilah: 'Raudhah', arab: '\u0627\u0644\u0631\u0648\u0636\u0629', kategori: 'tempat',
    arti: 'Area mulia di Masjid Nabawi antara mimbar dan kamar (makam) Nabi \ufdfa, disebut "taman surga". Kini wajib booking via aplikasi Nusuk untuk masuk.' },
  { id: 'zamzam', istilah: 'Air Zamzam', arab: '\u0632\u0645\u0632\u0645', kategori: 'tempat',
    arti: 'Air dari sumur Zamzam dekat Ka\u2019bah yang muncul sejak zaman Siti Hajar & Nabi Ismail. Disunnahkan meminumnya dengan menghadap kiblat dan berdoa.' },

  // ── Umum ──
  { id: 'umrah', istilah: 'Umrah', arab: '\u0639\u0645\u0631\u0629', kategori: 'umum',
    arti: 'Ibadah berkunjung ke Baitullah dengan rangkaian ihram, tawaf, sai, dan tahallul. Bisa dilakukan kapan saja sepanjang tahun (tidak terikat waktu seperti haji).' },
  { id: 'manasik-g', istilah: 'Manasik', arab: '\u0645\u0646\u0627\u0633\u0643', kategori: 'umum',
    arti: 'Tata cara/rangkaian ibadah haji dan umrah. "Bimbingan manasik" berarti pelatihan tata cara sebelum berangkat.' },
  { id: 'muthawwif', istilah: 'Muthawwif', arab: '\u0645\u0637\u0648\u0641', kategori: 'umum',
    arti: 'Pembimbing yang mendampingi & mengarahkan jamaah selama pelaksanaan ibadah di tanah suci.' },
  { id: 'jamaah', istilah: 'Jamaah', arab: '\u062c\u0645\u0627\u0639\u0629', kategori: 'umum',
    arti: 'Sebutan untuk para peserta ibadah umrah/haji yang berangkat bersama dalam satu rombongan.' },
  { id: 'badal', istilah: 'Badal', arab: '\u0628\u062f\u0644', kategori: 'umum',
    arti: 'Menggantikan/mewakili orang lain dalam ibadah (mis. umrah badal untuk orang yang sudah wafat atau tidak mampu secara fisik).' },
  { id: 'rukun', istilah: 'Rukun', arab: '\u0631\u0643\u0646', kategori: 'umum',
    arti: 'Amalan yang wajib dikerjakan dan tidak bisa diganti dam; jika ditinggalkan, ibadah tidak sah. Rukun umrah: ihram, tawaf, sai, tahallul, tertib.' },
  { id: 'wajib', istilah: 'Wajib (Umrah)', arab: '\u0648\u0627\u062c\u0628', kategori: 'umum',
    arti: 'Amalan yang bila ditinggalkan ibadah tetap sah namun wajib membayar dam. Wajib umrah: berihram dari miqat.' },
  { id: 'sunnah', istilah: 'Sunnah', arab: '\u0633\u0646\u0629', kategori: 'umum',
    arti: 'Amalan yang dianjurkan; mendapat pahala bila dikerjakan, tidak berdosa bila ditinggalkan dan tidak membatalkan ibadah.' },

  // ── Waktu / haji terkait ──
  { id: 'miqat-zamani', istilah: 'Miqat Zamani', arab: '\u0645\u064a\u0642\u0627\u062a \u0632\u0645\u0627\u0646\u064a', kategori: 'waktu',
    arti: 'Batas WAKTU memulai ihram haji: bulan Syawal, Dzulqa\u2019dah, dan 10 hari pertama Dzulhijjah. Umrah TIDAK memiliki miqat zamani.' },
  { id: 'miqat-makani', istilah: 'Miqat Makani', arab: '\u0645\u064a\u0642\u0627\u062a \u0645\u0643\u0627\u0646\u064a', kategori: 'waktu',
    arti: 'Batas TEMPAT memulai ihram, mis. Dzulhulaifah (Bir Ali), Juhfah, Qarnul Manazil, Yalamlam, Dzatu \u2018Irq.' },
];
