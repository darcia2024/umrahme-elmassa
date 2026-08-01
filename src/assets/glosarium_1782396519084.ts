// =============================================================
// DATA GLOSARIUM — data/glosarium.ts (BARU)
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
  { id: 'ihram', istilah: 'Ihram', arab: 'إحرام', kategori: 'ihram',
    arti: 'Niat memasuki ibadah umrah/haji, ditandai dengan mengenakan pakaian ihram dan berlakunya larangan-larangan tertentu. Bagi pria: dua helai kain putih tak berjahit; bagi wanita: pakaian biasa yang menutup aurat.' },
  { id: 'miqat', istilah: 'Miqat', arab: 'ميقات', kategori: 'ihram',
    arti: 'Batas tempat (miqat makani) atau waktu (miqat zamani) untuk memulai ihram. Melewatinya tanpa berihram bagi yang hendak umrah/haji mewajibkan dam.' },
  { id: 'talbiyah', istilah: 'Talbiyah', arab: 'تلبية', kategori: 'ihram',
    arti: 'Bacaan "Labbaika Allāhumma labbaik…" yang diucapkan setelah berniat ihram sebagai jawaban atas panggilan Allah, diperbanyak hingga memulai tawaf.' },
  { id: 'dam', istilah: 'Dam', arab: 'دم', kategori: 'ihram',
    arti: 'Denda atau tebusan (secara bahasa berarti "darah") yang wajib ditunaikan karena melanggar larangan ihram atau meninggalkan wajib umrah/haji, umumnya berupa menyembelih kambing.' },
  { id: 'fidyah', istilah: 'Fidyah', arab: 'فدية', kategori: 'ihram',
    arti: 'Tebusan atas pelanggaran tertentu saat ihram (mis. mencukur rambut karena uzur), bisa berupa puasa, sedekah, atau menyembelih.' },
  { id: 'idhtiba', istilah: 'Idhtiba\u2019', arab: 'اضطباع', kategori: 'ihram',
    arti: 'Cara mengenakan kain ihram bagi pria saat tawaf qudum/umrah: membuka bahu kanan dengan menyelempangkan kain ke bawah ketiak kanan dan ujungnya di atas bahu kiri. Hanya saat tawaf, lalu dirapikan kembali.' },

  // ── Tawaf ──
  { id: 'tawaf', istilah: 'Tawaf', arab: 'طواف', kategori: 'tawaf',
    arti: 'Mengelilingi Ka\u2019bah sebanyak 7 putaran dengan posisi Ka\u2019bah di sebelah kiri, dimulai dan diakhiri di garis sejajar Hajar Aswad.' },
  { id: 'raml', istilah: 'Raml', arab: 'رمل', kategori: 'tawaf',
    arti: 'Berjalan cepat dengan langkah pendek (jalan tergesa namun bukan berlari) yang disunnahkan bagi pria pada 3 putaran pertama tawaf qudum/umrah.' },
  { id: 'hajar-aswad', istilah: 'Hajar Aswad', arab: 'الحجر الأسود', kategori: 'tawaf',
    arti: 'Batu hitam mulia di salah satu sudut Ka\u2019bah, titik awal & akhir setiap putaran tawaf. Disunnahkan menciumnya, atau cukup memberi isyarat tangan bila ramai.' },
  { id: 'multazam', istilah: 'Multazam', arab: 'الملتزم', kategori: 'tawaf',
    arti: 'Bagian dinding Ka\u2019bah antara Hajar Aswad dan pintu Ka\u2019bah; tempat yang dianjurkan untuk berdoa dengan menempelkan dada dan wajah bila memungkinkan.' },
  { id: 'maqam-ibrahim', istilah: 'Maqam Ibrahim', arab: 'مقام إبراهيم', kategori: 'tawaf',
    arti: 'Batu berpijak Nabi Ibrahim saat membangun Ka\u2019bah, kini dalam kubah kaca. Disunnahkan shalat 2 rakaat di belakangnya setelah tawaf.' },
  { id: 'hijir-ismail', istilah: 'Hijir Ismail', arab: 'حجر إسماعيل', kategori: 'tawaf',
    arti: 'Area setengah lingkaran berpagar rendah di sisi Ka\u2019bah. Termasuk bagian Ka\u2019bah, sehingga tawaf harus mengelilingi di LUAR pagar ini, tidak memotong masuk.' },
  { id: 'syadzarwan', istilah: 'Syadzarwan', arab: 'شاذروان', kategori: 'tawaf',
    arti: 'Bagian dasar Ka\u2019bah yang sedikit menonjol; termasuk bagian Ka\u2019bah, maka saat tawaf jangan menapak di atasnya agar putaran sah.' },

  // ── Sai ──
  { id: 'sai', istilah: 'Sa\u2019i', arab: 'سعي', kategori: 'sai',
    arti: 'Berjalan bolak-balik antara bukit Shafa dan Marwah sebanyak 7 lintasan, mengenang perjuangan Siti Hajar mencari air untuk Nabi Ismail.' },
  { id: 'shafa', istilah: 'Shafa', arab: 'الصفا', kategori: 'sai',
    arti: 'Bukit kecil di dalam Masjidil Haram, titik awal sai. Sai dimulai dari Shafa dan berakhir di Marwah.' },
  { id: 'marwah', istilah: 'Marwah', arab: 'المروة', kategori: 'sai',
    arti: 'Bukit kecil di ujung lain lintasan sai. Satu perjalanan Shafa→Marwah atau Marwah→Shafa dihitung satu lintasan.' },
  { id: 'masa', istilah: 'Mas\u2019a', arab: 'المسعى', kategori: 'sai',
    arti: 'Lintasan/jalur tempat pelaksanaan sai antara Shafa dan Marwah, kini berupa lorong panjang ber-AC di dalam kompleks Masjidil Haram.' },
  { id: 'lampu-hijau', istilah: 'Lampu Hijau (Tanda Sai)', kategori: 'sai',
    arti: 'Penanda hijau di lintasan sai yang menunjukkan area di mana pria disunnahkan berlari-lari kecil (antara dua tanda hijau).' },

  // ── Tahallul & penutup ──
  { id: 'tahallul', istilah: 'Tahallul', arab: 'تحلل', kategori: 'umum',
    arti: 'Keluar dari keadaan ihram dengan mencukur (tahliq) atau memendekkan (taqshir) rambut setelah selesai sai, sehingga larangan ihram kembali halal.' },
  { id: 'tahliq', istilah: 'Tahliq', arab: 'تحليق', kategori: 'umum',
    arti: 'Mencukur habis seluruh rambut kepala saat tahallul. Lebih utama bagi pria; wanita cukup memendekkan.' },
  { id: 'taqshir', istilah: 'Taqshir', arab: 'تقصير', kategori: 'umum',
    arti: 'Memendekkan/menggunting sebagian rambut (minimal seukuran ruas jari) sebagai bentuk tahallul. Pilihan bagi pria, dan cara bagi wanita.' },

  // ── Tempat ──
  { id: 'kabah', istilah: 'Ka\u2019bah', arab: 'الكعبة', kategori: 'tempat',
    arti: 'Bangunan kubus di tengah Masjidil Haram, kiblat umat Islam dan pusat tawaf. Disebut juga Baitullah (rumah Allah).' },
  { id: 'masjidil-haram-g', istilah: 'Masjidil Haram', arab: 'المسجد الحرام', kategori: 'tempat',
    arti: 'Masjid teragung dalam Islam di Makkah yang mengelilingi Ka\u2019bah; tempat pelaksanaan tawaf dan sai.' },
  { id: 'mataf', istilah: 'Mataf', arab: 'المطاف', kategori: 'tempat',
    arti: 'Area lantai melingkar di sekeliling Ka\u2019bah tempat jamaah melakukan tawaf.' },
  { id: 'raudhah-g', istilah: 'Raudhah', arab: 'الروضة', kategori: 'tempat',
    arti: 'Area mulia di Masjid Nabawi antara mimbar dan kamar (makam) Nabi \ufdfa, disebut "taman surga". Kini wajib booking via aplikasi Nusuk untuk masuk.' },
  { id: 'zamzam', istilah: 'Air Zamzam', arab: 'زمزم', kategori: 'tempat',
    arti: 'Air dari sumur Zamzam dekat Ka\u2019bah yang muncul sejak zaman Siti Hajar & Nabi Ismail. Disunnahkan meminumnya dengan menghadap kiblat dan berdoa.' },

  // ── Umum ──
  { id: 'umrah', istilah: 'Umrah', arab: 'عمرة', kategori: 'umum',
    arti: 'Ibadah berkunjung ke Baitullah dengan rangkaian ihram, tawaf, sai, dan tahallul. Bisa dilakukan kapan saja sepanjang tahun (tidak terikat waktu seperti haji).' },
  { id: 'manasik', istilah: 'Manasik', arab: 'مناسك', kategori: 'umum',
    arti: 'Tata cara/rangkaian ibadah haji dan umrah. "Bimbingan manasik" berarti pelatihan tata cara sebelum berangkat.' },
  { id: 'muthawwif', istilah: 'Muthawwif', arab: 'مطوف', kategori: 'umum',
    arti: 'Pembimbing yang mendampingi & mengarahkan jamaah selama pelaksanaan ibadah di tanah suci.' },
  { id: 'jamaah', istilah: 'Jamaah', arab: 'جماعة', kategori: 'umum',
    arti: 'Sebutan untuk para peserta ibadah umrah/haji yang berangkat bersama dalam satu rombongan.' },
  { id: 'badal', istilah: 'Badal', arab: 'بدل', kategori: 'umum',
    arti: 'Menggantikan/mewakili orang lain dalam ibadah (mis. umrah badal untuk orang yang sudah wafat atau tidak mampu secara fisik).' },
  { id: 'rukun', istilah: 'Rukun', arab: 'ركن', kategori: 'umum',
    arti: 'Amalan yang wajib dikerjakan dan tidak bisa diganti dam; jika ditinggalkan, ibadah tidak sah. Rukun umrah: ihram, tawaf, sai, tahallul, tertib.' },
  { id: 'wajib', istilah: 'Wajib (Umrah)', arab: 'واجب', kategori: 'umum',
    arti: 'Amalan yang bila ditinggalkan ibadah tetap sah namun wajib membayar dam. Wajib umrah: berihram dari miqat.' },
  { id: 'sunnah', istilah: 'Sunnah', arab: 'سنة', kategori: 'umum',
    arti: 'Amalan yang dianjurkan; mendapat pahala bila dikerjakan, tidak berdosa bila ditinggalkan dan tidak membatalkan ibadah.' },

  // ── Waktu / haji terkait ──
  { id: 'miqat-zamani', istilah: 'Miqat Zamani', arab: 'ميقات زماني', kategori: 'waktu',
    arti: 'Batas WAKTU memulai ihram haji: bulan Syawal, Dzulqa\u2019dah, dan 10 hari pertama Dzulhijjah. Umrah TIDAK memiliki miqat zamani.' },
  { id: 'miqat-makani', istilah: 'Miqat Makani', arab: 'ميقات مكاني', kategori: 'waktu',
    arti: 'Batas TEMPAT memulai ihram, mis. Dzulhulaifah (Bir Ali), Juhfah, Qarnul Manazil, Yalamlam, Dzatu \u2018Irq.' },
  { id: 'tawaf-wada', istilah: 'Tawaf Wada\u2019', arab: 'طواف الوداع', kategori: 'tawaf',
    arti: 'Tawaf perpisahan yang dilakukan saat akan meninggalkan Makkah. Diwajibkan setelah haji; untuk umrah, mayoritas ulama menganggapnya tidak wajib namun dianjurkan.' },
];
