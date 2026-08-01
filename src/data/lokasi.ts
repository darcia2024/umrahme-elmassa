import type { Lokasi } from '../types';

// =============================================================
// DATA LOKASI — Masjid & Tempat Bersejarah (riset lengkap)
// jarakKm: estimasi representatif dari area hotel jamaah.
// koordinat: dipakai untuk deep-link Google Maps di LokasiDetail.
// =============================================================

export const daftarLokasi: Lokasi[] = [
  // ===================================================== MASJID
  {
    id: 'masjidil-haram',
    tipe: 'masjid',
    nama: 'Masjidil Haram',
    namaArab: 'المسجد الحرام',
    kota: 'Makkah',
    jarakKm: 0.4,
    jamKunjungan: 'Buka 24 jam',
    ringkas: 'Masjid teragung dalam Islam, mengelilingi Ka\u2019bah \u2014 kiblat seluruh umat.',
    gambar: '/lokasi/masjidil-haram.jpg',
    koordinat: { lat: 21.4225, lng: 39.8262 },
    sejarah:
      'Masjidil Haram adalah masjid tertua sekaligus terbesar di dunia, berpusat pada Ka\u2019bah yang dalam tradisi Islam dibangun kembali oleh Nabi Ibrahim dan putranya Ismail \u2018alaihimas-salam, lalu mengalami perluasan besar dari masa para Khalifah hingga era Saudi modern.',
    sejarahSeksi: [
      {
        judul: 'Asal Mula Ka\u2019bah',
        isi: 'Dalam tradisi Islam, Ka\u2019bah adalah bangunan pertama yang didirikan untuk beribadah kepada Allah. Setelah hilang akibat banjir besar pada masa Nabi Nuh, Allah memerintahkan Nabi Ibrahim bersama putranya Ismail untuk membangunnya kembali di lokasi semula. Keduanya pula yang meletakkan Hajar Aswad dan menandai Maqam Ibrahim di sekitar Ka\u2019bah.',
      },
      {
        judul: 'Peristiwa Hajar Aswad & Gelar Al-Amin',
        isi: 'Saat Ka\u2019bah diperbaiki karena banjir di masa muda Nabi Muhammad \ufdfa, kabilah-kabilah Quraisy berselisih tentang siapa yang berhak meletakkan Hajar Aswad. Nabi \ufdfa menengahi dengan meletakkan batu di atas kain yang setiap ujungnya dipegang pemimpin kabilah, lalu mengangkatnya bersama. Atas kebijaksanaan ini beliau digelari Al-Amin (yang terpercaya).',
      },
      {
        judul: 'Perluasan dari Masa ke Masa',
        isi: 'Di zaman Nabi \ufdfa, area tawaf hanyalah halaman luas dikelilingi rumah penduduk seluas \u00b11.500\u20132.000 m\u00b2. Khalifah Umar bin Khattab membangun tembok pertama; Utsman bin Affan menambahkan serambi beratap. Perluasan berlanjut di masa Umayyah, Abbasiyah, hingga era Saudi modern yang kini menampung lebih dari dua juta jamaah.',
      },
      {
        judul: 'Titik-Titik Penting di Dalamnya',
        isi: 'Selain Ka\u2019bah, di dalam kompleks terdapat Hajar Aswad di sudut Ka\u2019bah, Maqam Ibrahim (batu pijakan Nabi Ibrahim saat membangun Ka\u2019bah \u2014 bukan kuburan), Hijir Ismail, Multazam, sumur Zamzam di sisi timur Ka\u2019bah, serta bukit Shafa dan Marwah tempat sa\u2019i yang kini berada di dalam masjid.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645', peran: 'Membangun kembali Ka\u2019bah bersama putranya' },
      { nama: 'Nabi Ismail \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645', peran: 'Membantu pembangunan & peletakan Hajar Aswad' },
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menengahi peletakan Hajar Aswad, membersihkan Ka\u2019bah dari berhala saat Fathu Makkah' },
    ],
    keutamaan: [
      'Shalat di Masjidil Haram bernilai 100.000 kali lipat dibanding masjid lain.',
      'Ka\u2019bah adalah kiblat shalat seluruh umat Islam di dunia.',
      'Pusat pelaksanaan tawaf dalam ibadah haji dan umrah.',
      'Sumur Zamzam adalah sumber air yang terus mengalir sejak zaman Nabi Ismail.',
    ],
    dalil: [
      {
        sumber: 'QS. Ali \u2018Imran: 96',
        teks: 'Sesungguhnya rumah yang mula-mula dibangun untuk (tempat ibadah) manusia ialah Baitullah di Bakkah (Makkah) yang diberkahi dan menjadi petunjuk bagi semesta alam.',
      },
    ],
    adab: [
      'Jaga kekhusyukan dan perbanyak doa, terutama di Multazam dan saat menatap Ka\u2019bah.',
      'Hati-hati terhadap \u201cjoki\u201d Hajar Aswad yang meminta uang; mencium Hajar Aswad sunnah tetapi jangan sampai menyakiti atau berdesakan membahayakan.',
      'Perhatikan sistem lampu pintu (hijau = ada ruang, merah = penuh).',
    ],
    petaResmiUrl: 'https://alharamain.gov.sa/public/?site=en',
    pintu: [
      { nama: 'Bab Malik Abdul Aziz (Gerbang 1)', fungsi: 'Salah satu gerbang terbesar dan terpopuler, akses langsung ke area Mataf dari sisi selatan.' },
      { nama: 'Bab Malik Fahd', fungsi: 'Sering dipakai karena dekat dengan area tawaf (Mataf).' },
      { nama: 'Bab As-Salam', fungsi: 'Pintu bersejarah, dianjurkan masuk dengan mendahulukan kaki kanan dan berdoa.' },
      { nama: 'Bab Umrah (Gerbang 63)', fungsi: 'Pintu yang menurut riwayat dilalui Nabi ﷺ saat memasuki Makkah untuk umrah. Akses langsung ke Mataf dari arah barat laut.' },
      { nama: 'Bab Ajyad', fungsi: 'Gerbang di sisi tenggara, sering dipakai jamaah; tersedia eskalator ke lantai atas.' },
      { nama: 'Bab Al-Fath', fungsi: 'Dinamai untuk mengenang Fathu Makkah (pembebasan Makkah).' },
    ],
  },
  {
    id: 'kabah',
    tipe: 'sejarah',
    nama: 'Ka\u2019bah',
    namaArab: 'الكعبة المشرفة',
    kota: 'Makkah',
    jarakKm: 0,
    jamKunjungan: 'Pusat Masjidil Haram, 24 jam',
    ringkas: 'Baitullah, kiblat seluruh umat Islam dan pusat pelaksanaan tawaf di Masjidil Haram.',
    gambar: '/lokasi/kabah.jpg',
    koordinat: { lat: 21.4225, lng: 39.8262 },
    sejarah:
      'Ka\u2019bah adalah bangunan berbentuk kubus di pusat Masjidil Haram, kiblat umat Islam sedunia, dan rumah ibadah pertama yang dibangun untuk manusia. Dalam Al-Qur\u2019an, Ka\u2019bah disebut dengan beberapa nama: Baitullah (rumah Allah), Al-Bait Al-Haram, Al-Bait Al-\u2018Atiq, Bakkah, dan Qiblah. Setiap hari jutaan muslim menghadap kepadanya dalam shalat dan mengelilinginya dalam tawaf.',
    sejarahSeksi: [
      {
        judul: 'Dibangun Nabi Ibrahim & Ismail',
        isi: 'Fondasi Ka\u2019bah ditinggikan oleh Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 bersama putranya Nabi Ismail \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 atas perintah Allah, sebagaimana diabadikan dalam Al-Qur\u2019an (QS. Al-Baqarah: 127). Sebagian riwayat menyebut Ka\u2019bah sudah ada sejak masa Nabi Adam, lalu ditinggikan kembali oleh Ibrahim. Bangunan Ibrahim saat itu tidak beratap dan memiliki dua pintu.',
      },
      {
        judul: 'Renovasi Masa Quraisy',
        isi: 'Sebelum kenabian, kaum Quraisy merenovasi Ka\u2019bah setelah rusak karena banjir. Karena keterbatasan dana yang halal, mereka memendekkan bangunan sehingga sebagian area (kini Hijir Ismail) tidak masuk ke dalam bangunan utama. Pada renovasi inilah Nabi Muhammad \ufdfa \u2014 sebelum diangkat menjadi nabi \u2014 menengahi perselisihan kabilah soal siapa yang berhak meletakkan Hajar Aswad, dengan meletakkannya di atas kain yang diangkat bersama-sama.',
      },
      {
        judul: 'Kiblat & Pusat Tawaf',
        isi: 'Ka\u2019bah adalah kiblat shalat setelah perpindahan dari Baitul Maqdis. Tawaf (mengelilingi Ka\u2019bah 7 putaran) dimulai dan diakhiri di garis sejajar Hajar Aswad, dengan Ka\u2019bah berada di sebelah kiri jamaah.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645', peran: 'Meninggikan fondasi Ka\u2019bah bersama Nabi Ismail' },
      { nama: 'Nabi Ismail \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645', peran: 'Membantu ayahnya membangun Ka\u2019bah' },
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menengahi peletakan Hajar Aswad saat renovasi Quraisy' },
    ],
    keutamaan: [
      'Rumah ibadah pertama yang dibangun untuk manusia (QS. Ali Imran: 96).',
      'Kiblat seluruh umat Islam dalam shalat di mana pun berada.',
      'Pusat tawaf dalam ibadah haji & umrah.',
    ],
    dalil: [
      {
        sumber: 'QS. Al-Baqarah: 127',
        teks: 'Dan (ingatlah) ketika Ibrahim meninggikan fondasi Baitullah bersama Ismail (seraya berdoa), "Ya Tuhan kami, terimalah (amal) dari kami. Sungguh, Engkaulah Yang Maha Mendengar lagi Maha Mengetahui."',
      },
      {
        sumber: 'QS. Ali Imran: 96',
        teks: 'Sesungguhnya rumah (ibadah) pertama yang dibangun untuk manusia adalah (Baitullah) yang di Bakkah (Makkah) yang diberkahi dan menjadi petunjuk bagi seluruh alam.',
      },
    ],
    adab: [
      'Saat melihat Ka\u2019bah pertama kali, dianjurkan berdoa dengan khusyuk.',
      'Tawaf dengan tertib; jangan menyakiti jamaah lain demi menyentuh bagian tertentu.',
      'Arahkan segala doa hanya kepada Allah, bukan kepada batu atau bangunannya.',
    ],
    catatan: 'Mencium Hajar Aswad & mengusap Rukun Yamani adalah sunnah (mengikuti Nabi \ufdfa), bukan menyembah batu. Umar bin Khattab \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 berkata pada Hajar Aswad: \u201cAku tahu engkau hanya batu, tidak memberi manfaat & mudarat. Andai aku tak melihat Nabi \ufdfa menciummu, aku tak akan menciummu.\u201d (HR. Bukhari-Muslim). Semua doa hanya ditujukan kepada Allah.',
    diagramBagian: '/lokasi/kabah/diagram-bagian.png',
    bagianGrup: [
      {
        judul: '4 Sudut (Rukun) Ka\u2019bah',
        items: [
          { nama: 'Rukun Hajar Aswad', arab: 'ركن الحجر الأسود', deskripsi: 'Sudut timur, tempat Hajar Aswad. Titik awal & akhir tawaf. Disunnahkan mencium atau memberi isyarat tangan ke arahnya tiap memulai putaran.' },
          { nama: 'Rukun Yamani', arab: 'الركن اليماني', deskripsi: 'Sudut barat daya (mengarah Yaman). Disunnahkan mengusapnya dengan tangan kanan tanpa mencium. Antara Rukun Yamani & Hajar Aswad dianjurkan membaca \u201cRabbana atina fid-dunya hasanah\u2026\u201d' },
          { nama: 'Rukun Iraqi', arab: 'الركن العراقي', deskripsi: 'Sudut utara (mengarah Irak). Tidak ada amalan khusus, menjadi penanda dalam tawaf.' },
          { nama: 'Rukun Syami', arab: 'الركن الشامي', deskripsi: 'Sudut barat laut (mengarah Syam). Disebut juga Rukun Maghribi. Tidak ada amalan khusus.' },
        ],
      },
      {
        judul: 'Bagian Penting Lainnya',
        items: [
          { nama: 'Multazam', arab: 'الملتزم', deskripsi: 'Dinding antara Hajar Aswad & pintu Ka\u2019bah; tempat mustajab berdoa. Disunnahkan menempelkan dada & tangan ke dinding bila memungkinkan.' },
          { nama: 'Maqam Ibrahim', arab: 'مقام إبراهيم', deskripsi: 'Batu berisi bekas pijakan Nabi Ibrahim saat membangun Ka\u2019bah (bukan makam). Disunnahkan shalat 2 rakaat di belakangnya setelah tawaf.' },
          { nama: 'Hijir Ismail', arab: 'حجر إسماعيل', deskripsi: 'Area setengah lingkaran di sisi utara (disebut Al-Hathim). Termasuk bagian asli Ka\u2019bah, maka tawaf wajib mengelilingi di luar pagarnya.' },
          { nama: 'Pintu Ka\u2019bah', arab: 'باب الكعبة', deskripsi: 'Terbuat dari emas murni, ditinggikan dari permukaan tanah. Berat kedua daun pintu sekitar 280 kg.' },
          { nama: 'Mizab Ar-Rahman', arab: 'ميزاب الرحمة', deskripsi: 'Pancuran/talang emas di atap (di atas Hijir Ismail) untuk mengalirkan air hujan. Disebut \u201cpancuran rahmat\u201d.' },
          { nama: 'Kiswah', arab: 'كسوة الكعبة', deskripsi: 'Kain hitam berhias kaligrafi benang emas yang menyelubungi Ka\u2019bah, diganti setiap tahun pada 9 Dzulhijjah.' },
          { nama: 'Syadzarwan', arab: 'الشاذروان', deskripsi: 'Bagian dasar Ka\u2019bah yang menonjol. Termasuk bagian Ka\u2019bah, maka saat tawaf jangan menapak di atasnya.' },
        ],
      },
    ],
  },
  {
    id: 'masjid-nabawi',
    tipe: 'masjid',
    nama: 'Masjid Nabawi',
    namaArab: '\u0627\u0644\u0645\u0633\u062c\u062f \u0627\u0644\u0646\u0628\u0648\u064a',
    kota: 'Madinah',
    jarakKm: 1.1,
    jamKunjungan: 'Buka 24 jam \u00b7 Raudhah perlu tasrih/janji temu via aplikasi Nusuk',
    ringkas: 'Masjid yang dibangun Rasulullah \ufdfa, tempat makam beliau berada.',
    gambar: '/lokasi/masjid-nabawi.jpg',
    koordinat: { lat: 24.4672, lng: 39.6111 },
    sejarah:
      'Masjid Nabawi didirikan Nabi Muhammad \ufdfa sesaat setelah hijrah ke Madinah pada 622 M, berdampingan dengan kediaman beliau. Di dalamnya terdapat makam Rasulullah \ufdfa bersama Abu Bakar dan Umar, serta Raudhah yang disebut \u201ctaman surga\u201d.',
    sejarahSeksi: [
      {
        judul: 'Dibangun Saat Hijrah',
        isi: 'Ketika Rasulullah \ufdfa hijrah ke Madinah pada 622 M, beliau membangun masjid ini sebagai pusat ibadah dan kegiatan sosial umat Islam. Strukturnya sangat sederhana: dinding dari batu bata, tiang dari batang kurma, dan atap dari pelepah kurma, tanpa kubah.',
      },
      {
        judul: 'Raudhah \u2014 Taman Surga',
        isi: 'Raudhah adalah area antara mimbar dan bekas rumah Nabi \ufdfa. Rasulullah \ufdfa bersabda bahwa area antara rumah dan mimbar beliau adalah \u201ctaman dari taman-taman surga\u201d. Luasnya sekitar 330 m\u00b2 (\u00b122 m \u00d7 15 m), ditandai dengan karpet dan tiang putih. Kini akses Raudhah diatur dengan tasrih (izin) melalui aplikasi Nusuk.',
      },
      {
        judul: 'Makam Rasulullah \ufdfa & Dua Sahabat',
        isi: 'Makam Nabi \ufdfa berada di bekas kamar Aisyah (Hujrah asy-Syarifah) di sisi timur Raudhah, sesuai sabda beliau bahwa nabi dimakamkan di tempat ia wafat. Di sampingnya dimakamkan Abu Bakar Ash-Shiddiq lalu Umar bin Khattab, keduanya atas izin Aisyah. Karena perluasan masjid, ketiga makam kini berada di dalam masjid.',
      },
      {
        judul: 'Kubah Hijau',
        isi: 'Kubah Hijau menandai lokasi makam Nabi \ufdfa. Kubah pertama dibangun era Mamluk oleh Sultan Al-Mansur Qalawun (678 H / 1279 M), awalnya dari kayu berlapis timah. Warna hijau yang dikenal sekarang baru diberikan pada masa Sultan Mahmud II dari Utsmaniyah (1817 M). Kubah ini menjadi ikon Madinah dan simbol kecintaan umat kepada Rasulullah \ufdfa.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Pendiri masjid, dimakamkan di dalamnya' },
      { nama: 'Abu Bakar Ash-Shiddiq', peran: 'Khalifah pertama, dimakamkan di samping Nabi \ufdfa' },
      { nama: 'Umar bin Khattab', peran: 'Khalifah kedua, dimakamkan di sisi Abu Bakar' },
      { nama: 'Bilal bin Rabah', peran: 'Muadzin Rasulullah \ufdfa' },
    ],
    keutamaan: [
      'Shalat di Masjid Nabawi bernilai 1.000 kali lipat dibanding masjid lain (selain Masjidil Haram).',
      'Berdoa di Raudhah termasuk tempat yang sangat dianjurkan.',
      'Disunnahkan mengucapkan salam kepada Rasulullah \ufdfa dan dua sahabatnya saat ziarah.',
    ],
    dalil: [
      {
        sumber: 'HR. Bukhari & Muslim',
        teks: 'Antara rumahku dan mimbarku terdapat taman dari taman-taman surga.',
      },
    ],
    adab: [
      'Untuk masuk Raudhah, pesan tasrih lebih dulu lewat aplikasi Nusuk sesuai jadwal.',
      'Ucapkan salam dengan tenang saat melewati makam; jangan mengusap pagar atau meminta kepada penghuni kubur.',
      'Jaga ketertiban \u2014 area Raudhah sangat padat.',
    ],
    petaResmiUrl: 'https://alharamain.gov.sa/public/?site=en',
    pintu: [
      { nama: 'Bab As-Salam', fungsi: 'Pintu utama yang dahulu sering dilalui Nabi \ufdfa. Banyak peziarah pria masuk dari sini menuju arah Raudhah.' },
      { nama: 'Bab Jibril', fungsi: 'Pintu bersejarah; dinamai Malaikat Jibril yang membawa wahyu.' },
      { nama: 'Bab Ar-Rahmah', fungsi: 'Salah satu dari tiga pintu asli masjid pada masa Nabi \ufdfa. Dikaitkan dengan rahmat dan ampunan.' },
      { nama: 'Bab An-Nisa (Gerbang 39)', fungsi: 'Pintu yang ditetapkan Khalifah Umar bin Khattab untuk jamaah wanita.' },
      { nama: 'Bab Al-Baqi', fungsi: 'Menghadap pemakaman Jannatul Baqi di sisi timur; jalur menuju ziarah Baqi.' },
      { nama: 'Gerbang 333', fungsi: 'Penanda populer di sisi selatan (dekat food street), sering jadi titik kumpul rombongan.' },
      { nama: 'Gerbang King Fahd', fungsi: 'Gerbang besar dari perluasan modern, melayani area perluasan masjid.' },
    ],
  },
  {
    id: 'raudhah',
    tipe: 'masjid',
    nama: 'Raudhah',
    namaArab: '\u0627\u0644\u0631\u0648\u0636\u0629 \u0627\u0644\u0634\u0631\u064a\u0641\u0629',
    kota: 'Madinah',
    jarakKm: 0,
    jamKunjungan: 'Wajib booking via aplikasi Nusuk',
    ringkas: 'Area mulia di dalam Masjid Nabawi, disebut Nabi \ufdfa sebagai taman dari taman-taman surga.',
    gambar: '/lokasi/raudhah.jpg',
    koordinat: { lat: 24.4672, lng: 39.6112 },
    sejarah:
      'Raudhah (\u201ctaman\u201d) adalah area di dalam Masjid Nabawi yang terletak di antara mimbar Rasulullah \ufdfa dan kamar Sayyidah Aisyah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0627 (kini menjadi area makam Nabi \ufdfa). Luasnya sekitar 22 x 15 meter dan ditandai dengan karpet hijau yang berbeda dari karpet merah di bagian lain masjid. Di area inilah dahulu Rasulullah \ufdfa shalat, menerima wahyu, berdakwah, dan mengajar para sahabat.',
    sejarahSeksi: [
      {
        judul: 'Makna \u201cTaman Surga\u201d',
        isi: 'Nabi \ufdfa bersabda bahwa area antara rumah (kini makam) dan mimbar beliau adalah \u201ctaman dari taman-taman surga\u201d. Para ulama menafsirkan ini dalam dua makna: secara majas karena keutamaan dan keberkahannya yang besar, dan menurut sebagian ulama secara hakikat karena area ini kelak akan diangkat menjadi bagian dari surga di hari kiamat. Ibnu Hajar dalam Fathul Baari menyebut kedua makna ini.',
      },
      {
        judul: 'Batas-Batas Raudhah',
        isi: 'Menurut keterangan para ulama, batas Raudhah adalah: dari timur dibatasi kamar Aisyah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0627 (makam Nabi \ufdfa), dari barat oleh mimbar Rasulullah \ufdfa, dari selatan sejajar ujung mihrab Nabi, dan dari utara sejajar ujung akhir kamar Aisyah. Area ini ditandai jelas dengan karpet hijau.',
      },
      {
        judul: 'Tiang-Tiang Bersejarah',
        isi: 'Di sekitar Raudhah terdapat tiang-tiang (ustuwanah) bersejarah dengan nama dan kisah masing-masing, seperti Ustuwanah Aisyah, Ustuwanah Taubah (Abu Lubabah), dan Ustuwanah Sarir. Tiang-tiang ini menandai titik-titik penting pada masa Nabi \ufdfa.',
      },
      {
        judul: 'Dekat Makam Rasulullah \ufdfa',
        isi: 'Saat keluar dari Raudhah, jamaah umumnya melewati makam Nabi \ufdfa beserta dua sahabat beliau, Abu Bakar dan Umar \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0645\u0627. Di sini disunnahkan mengucapkan salam dan shalawat kepada Nabi \ufdfa sambil terus berjalan tertib, tanpa mengusap atau berdoa kepada penghuni kubur.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Shalat, menerima wahyu, berdakwah, dan mengajar di area ini' },
      { nama: 'Sayyidah Aisyah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0627', peran: 'Kamarnya menjadi batas timur Raudhah (kini area makam Nabi)' },
    ],
    keutamaan: [
      'Disebut langsung oleh Nabi \ufdfa sebagai \u201ctaman dari taman-taman surga\u201d.',
      'Termasuk dalam keutamaan umum shalat di Masjid Nabawi yang bernilai lebih dari 1.000 shalat di masjid lain (kecuali Masjidil Haram).',
      'Tempat yang dianjurkan memperbanyak shalat, dzikir, doa, dan membaca Al-Qur\u2019an.',
      'Berdekatan dengan makam Rasulullah \ufdfa, kesempatan menyampaikan salam kepada beliau.',
    ],
    dalil: [
      {
        sumber: 'HR. Bukhari & Muslim',
        teks: 'Rasulullah \ufdfa bersabda: \u201cApa yang berada di antara rumahku dan mimbarku adalah salah satu taman dari taman-taman surga.\u201d',
      },
      {
        sumber: 'QS. Al-Ahzab: 56',
        teks: 'Sesungguhnya Allah dan para malaikat-Nya bershalawat untuk Nabi. Wahai orang-orang yang beriman, bershalawatlah kamu untuk Nabi dan ucapkanlah salam dengan penuh penghormatan kepadanya.',
      },
    ],
    adab: [
      'Wajib booking jadwal masuk lewat aplikasi Nusuk; datang tepat waktu sesuai slot.',
      'Jadwal pria dan wanita dipisah; jaga agar tidak terjadi ikhtilath (campur baur).',
      'Perbanyak shalat sunnah, dzikir, dan doa selagi di dalam \u2014 waktu terbatas, siapkan doa sebelumnya.',
      'Bersabar, tertib, tidak berdesak-desakan, dan beri kesempatan jamaah lain.',
      'Dokumentasi secukupnya; jangan mengorbankan kekhusyukan demi video/foto.',
    ],
    catatan: 'Tidak ada doa khusus yang wajib di Raudhah \u2014 semua doa boleh dengan bahasa apa pun. Hindari kesalahan umum: mengusap-usap dinding makam atau mimbar untuk tabaruk, dan berdoa/meminta kepada penghuni kubur. Berdoa hanya kepada Allah; salam kepada Nabi \ufdfa diucapkan sambil lewat dengan tertib.',
  },
  {
    id: 'masjid-quba',
    tipe: 'masjid',
    nama: 'Masjid Quba',
    namaArab: '\u0645\u0633\u062c\u062f \u0642\u0628\u0627\u0621',
    kota: 'Madinah',
    jarakKm: 5.0,
    jamKunjungan: 'Buka 24 jam (waktu setempat)',
    ringkas: 'Masjid pertama yang dibangun dalam sejarah Islam.',
    gambar: '/lokasi/masjid-quba.jpg',
    koordinat: { lat: 24.4368, lng: 39.6170 },
    sejarah:
      'Masjid Quba adalah masjid pertama yang dibangun Rasulullah \ufdfa saat tiba di pinggiran Madinah dalam perjalanan hijrah, dibangun di atas dasar takwa. Shalat di dalamnya berpahala seperti umrah.',
    sejarahSeksi: [
      {
        judul: 'Masjid Pertama dalam Islam',
        isi: 'Saat hijrah dari Makkah, Rasulullah \ufdfa singgah di perkampungan Quba dan membangun masjid ini dengan tangannya sendiri bersama para sahabat. Dibangun pada 8 Rabiul Awwal tahun pertama Hijriah (23 September 622 M) di atas tanah \u00b11.200 m\u00b2. Peletakan batu pertama di mihrab dilakukan Rasulullah \ufdfa, diikuti Abu Bakar, Umar, dan Utsman.',
      },
      {
        judul: 'Dibangun di Atas Takwa',
        isi: 'Al-Qur\u2019an memuji masjid ini sebagai masjid yang \u201cdidirikan atas dasar takwa sejak hari pertama\u201d. Di sinilah shalat berjamaah pertama setelah hijrah dilakukan, dengan kiblat masih ke arah Baitul Maqdis, dan azan pertama di Madinah dikumandangkan Bilal bin Rabah.',
      },
      {
        judul: 'Kebiasaan Rasulullah \ufdfa',
        isi: 'Rasulullah \ufdfa rutin mengunjungi Masjid Quba, terutama setiap hari Sabtu, kadang berjalan kaki kadang berkendara. Kini masjid telah diperluas hingga mampu menampung puluhan ribu jamaah, dikelilingi kebun kurma dan empat menara putih.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Membangun masjid dengan tangannya sendiri' },
      { nama: 'Bilal bin Rabah', peran: 'Mengumandangkan azan pertama di Madinah' },
    ],
    keutamaan: [
      'Bersuci di rumah lalu shalat di Masjid Quba berpahala seperti umrah.',
      'Masjid pertama yang dibangun atas dasar takwa.',
      'Tempat shalat berjamaah pertama dalam sejarah Islam.',
    ],
    dalil: [
      {
        sumber: 'QS. At-Taubah: 108',
        teks: 'Sungguh, masjid yang didirikan atas dasar takwa sejak hari pertama lebih pantas engkau melaksanakan shalat di dalamnya.',
      },
      {
        sumber: 'HR. Ibnu Majah',
        teks: 'Barangsiapa bersuci di rumahnya lalu mendatangi Masjid Quba dan shalat di dalamnya, ia memperoleh pahala seperti umrah.',
      },
    ],
    adab: [
      'Disunnahkan bersuci/berwudhu dari hotel sebelum berangkat agar meraih keutamaan hadits.',
      'Datang di luar jam padat agar lebih leluasa shalat sunnah.',
    ],
  },

  {
    id: 'masjid-jin',
    tipe: 'masjid',
    nama: 'Masjid Jin',
    namaArab: '\u0645\u0633\u062c\u062f \u0627\u0644\u062c\u0646',
    kota: 'Makkah',
    jarakKm: 1.2,
    jamKunjungan: 'Buka saat waktu shalat',
    ringkas: 'Tempat serombongan jin memeluk Islam setelah mendengar bacaan Al-Qur\u2019an Nabi \ufdfa.',
    gambar: '/lokasi/masjid-jin.jpg',
    koordinat: { lat: 21.4333, lng: 39.8289 },
    sejarah:
      'Masjid Jin terletak di distrik Ma\u2019la, dekat pemakaman Jannatul Mu\u2019alla, sekitar 1,2 km di utara Masjidil Haram. Masjid ini menandai lokasi peristiwa yang diabadikan dalam Surah Al-Jinn: serombongan jin mendengar Nabi \ufdfa membaca Al-Qur\u2019an, lalu beriman.',
    sejarahSeksi: [
      {
        judul: 'Peristiwa Para Jin Beriman',
        isi: 'Dalam riwayat yang masyhur, ketika Nabi \ufdfa membaca Al-Qur\u2019an di kawasan ini, serombongan jin yang sedang melintas berhenti dan mendengarkan dengan saksama. Mereka terkesan oleh kebenaran wahyu lalu beriman, dan kembali kepada kaumnya untuk menyampaikan dakwah tauhid. Peristiwa ini begitu penting hingga diabadikan dalam satu surah utuh, yaitu Surah Al-Jinn (surah ke-72).',
      },
      {
        judul: 'Nama-Nama Lain',
        isi: 'Masjid ini juga dikenal sebagai Masjid Al-Bai\u2019ah (Masjid Baiat) karena dikaitkan dengan baiat para jin, dan Masjid Al-Haras (Masjid Penjaga) karena dahulu menjadi batas patroli penjaga kota Makkah. Di dalamnya terdapat titik yang dikenal sebagai \u201cMaudhi\u2019 al-Khath\u201d (tempat penulisan), dikaitkan dengan riwayat Abdullah bin Mas\u2019ud.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Membaca Al-Qur\u2019an yang didengar para jin' },
      { nama: 'Abdullah bin Mas\u2019ud \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Sahabat yang diriwayatkan menyertai Nabi \ufdfa pada peristiwa ini' },
    ],
    keutamaan: [
      'Mengingatkan bahwa risalah Islam ditujukan bukan hanya kepada manusia, tetapi juga kepada jin.',
      'Menjadi pengingat keagungan Al-Qur\u2019an yang mampu menggerakkan hati makhluk yang tak terlihat.',
    ],
    dalil: [
      {
        sumber: 'QS. Al-Jinn: 1\u20132',
        teks: 'Katakanlah (Muhammad), \u201cTelah diwahyukan kepadaku bahwa sekumpulan jin telah mendengarkan (Al-Qur\u2019an), lalu mereka berkata, \u2018Kami telah mendengarkan Al-Qur\u2019an yang menakjubkan, (yang) memberi petunjuk kepada jalan yang benar, lalu kami beriman kepadanya.\u2019\u201d',
      },
    ],
    adab: [
      'Masjid ini hanya untuk shalat \u2014 tidak ada ritual khusus di dalamnya.',
      'Jaga adab dan kekhusyukan, hormati jamaah setempat yang shalat sehari-hari.',
      'Ziarah ke sini bersifat sunnah/anjuran, bukan bagian dari rangkaian wajib umrah.',
    ],
    catatan: 'Ziarah ke Masjid Jin bersifat opsional (bukan rukun atau wajib umrah). Tujuannya untuk mengambil pelajaran sejarah, bukan ritual tertentu.',
  },
  {
    id: 'masjid-ghamamah',
    tipe: 'masjid',
    nama: 'Masjid Ghamamah',
    namaArab: '\u0645\u0633\u062c\u062f \u0627\u0644\u063a\u0645\u0627\u0645\u0629',
    kota: 'Madinah',
    jarakKm: 0.3,
    jamKunjungan: 'Kadang dibuka sore hari',
    ringkas: 'Tempat Rasulullah \ufdfa pertama kali memimpin shalat Id dan shalat Istisqa (minta hujan).',
    gambar: '/lokasi/masjid-ghamamah.jpg',
    koordinat: { lat: 24.4681, lng: 39.6097 },
    sejarah:
      'Masjid Ghamamah terletak sekitar 300 meter di barat daya Masjid Nabawi. Dahulu kawasan ini adalah tanah lapang (al-Mushalla) tempat Rasulullah \ufdfa dan para sahabat menunaikan shalat Id dan shalat Istisqa. Nama \u201cGhamamah\u201d berarti awan/mendung, merujuk peristiwa turunnya hujan setelah Nabi \ufdfa memimpin shalat Istisqa.',
    sejarahSeksi: [
      {
        judul: 'Shalat Istisqa & Turunnya Hujan',
        isi: 'Ketika Madinah dilanda kekeringan, penduduk meminta Nabi \ufdfa berdoa memohon hujan. Beliau mengajak mereka ke tanah lapang ini, menunaikan shalat dua rakaat dengan suara keras sambil membalik selendangnya, lalu berdoa menghadap kiblat. Tidak lama, awan (ghamamah) berkumpul dan hujan pun turun. Peristiwa ini diriwayatkan dalam Shahih Bukhari dari Abdullah bin Zaid.',
      },
      {
        judul: 'Tempat Shalat Id Pertama',
        isi: 'Masjid Ghamamah juga menjadi tempat Rasulullah \ufdfa pertama kali memimpin shalat Idul Fitri, sekitar tahun ke-2 Hijriah. Karena shalat Id disunnahkan di tanah lapang, kawasan terbuka ini menjadi tempat khas pelaksanaan shalat hari raya. Bangunan masjid sekarang adalah peninggalan era Utsmaniyah (Sultan Abdul Majid) yang kemudian direnovasi pada masa Raja Fahd.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Memimpin shalat Istisqa dan shalat Id pertama di sini' },
      { nama: 'Khalifah Umar bin Khattab \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Diriwayatkan membangun masjid di tempat shalat Nabi \ufdfa' },
    ],
    keutamaan: [
      'Mengenang ijabah doa Nabi \ufdfa saat memohon hujan untuk umat.',
      'Tempat bersejarah pelaksanaan shalat Id pertama dalam Islam.',
      'Berada sangat dekat dengan Masjid Nabawi, mudah dijangkau berjalan kaki.',
    ],
    dalil: [
      {
        sumber: 'HR. Bukhari (dari Abdullah bin Zaid)',
        teks: 'Nabi \ufdfa keluar ke tanah lapang untuk memohon hujan. Beliau menghadap kiblat, membalik selendangnya, lalu shalat dua rakaat (mengeraskan bacaan). Kemudian Allah menurunkan hujan.',
      },
    ],
    adab: [
      'Jika masjid dibuka, shalat dua rakaat tahiyyatul masjid dengan tertib.',
      'Tidak ada ritual khusus; cukup ambil pelajaran sejarahnya.',
      'Jaga ketenangan, masjid ini tidak selalu dibuka untuk umum.',
    ],
  },
  {
    id: 'masjid-abu-bakar',
    tipe: 'masjid',
    nama: 'Masjid Abu Bakar Ash-Shiddiq',
    namaArab: '\u0645\u0633\u062c\u062f \u0623\u0628\u064a \u0628\u0643\u0631 \u0627\u0644\u0635\u062f\u064a\u0642',
    kota: 'Madinah',
    jarakKm: 0.33,
    jamKunjungan: 'Umumnya terkunci, untuk ziarah luar',
    ringkas: 'Masjid bersejarah dekat Masjid Nabawi, dikaitkan dengan Khalifah Abu Bakar \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647.',
    gambar: '/lokasi/masjid-abu-bakar.jpg',
    koordinat: { lat: 24.4676, lng: 39.6101 },
    sejarah:
      'Masjid Abu Bakar Ash-Shiddiq adalah salah satu dari masjid-masjid tua bersejarah di barat daya Masjid Nabawi, berjarak sekitar 330 meter. Masjid ini dikaitkan dengan dua hal: tempat Abu Bakar \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 pernah memimpin shalat Id, dan lokasi yang dinisbahkan kepada beliau.',
    sejarahSeksi: [
      {
        judul: 'Dinisbahkan kepada Abu Bakar \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647',
        isi: 'Diriwayatkan bahwa Khalifah Abu Bakar Ash-Shiddiq \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 pernah memimpin shalat Id di tempat ini pada masa kekhalifahannya. Masjid ini termasuk dalam kompleks masjid tua di sekitar Masjid Ghamamah, sebagai pengingat jejak para Khalifah Rasyidin.',
      },
    ],
    tokoh: [
      { nama: 'Abu Bakar Ash-Shiddiq \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Khalifah pertama, dinisbahkan kepada masjid ini' },
    ],
    keutamaan: [
      'Mengenang Abu Bakar \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647, sahabat terdekat dan Khalifah pertama.',
      'Menguatkan kecintaan pada generasi awal Islam (Khulafaur Rasyidin).',
    ],
    dalil: [
      {
        sumber: 'QS. At-Taubah: 40',
        teks: '\u201c\u2026ketika dia berkata kepada sahabatnya, \u2018Jangan engkau bersedih, sesungguhnya Allah bersama kita.\u2019\u201d (tentang Abu Bakar yang menemani Nabi \ufdfa saat hijrah).',
      },
    ],
    adab: [
      'Masjid umumnya terkunci; cukup ziarah dan ambil pelajaran dari luar.',
      'Tidak ada ritual khusus di tempat ini.',
    ],
  },
  {
    id: 'masjid-ali',
    tipe: 'masjid',
    nama: 'Masjid Ali bin Abi Thalib',
    namaArab: '\u0645\u0633\u062c\u062f \u0639\u0644\u064a \u0628\u0646 \u0623\u0628\u064a \u0637\u0627\u0644\u0628',
    kota: 'Madinah',
    jarakKm: 0.3,
    jamKunjungan: 'Kadang dibuka untuk peziarah',
    ringkas: 'Masjid bersejarah dekat Masjid Nabawi, dinisbahkan kepada Ali bin Abi Thalib \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647.',
    gambar: '/lokasi/masjid-ali.jpg',
    koordinat: { lat: 24.4679, lng: 39.6094 },
    sejarah:
      'Masjid Ali bin Abi Thalib terletak sekitar 300 meter di arah barat Masjid Nabawi, di kawasan masjid-masjid tua bersama Masjid Ghamamah dan Masjid Abu Bakar. Masjid ini dinisbahkan kepada Ali bin Abi Thalib \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 dan pernah digunakan untuk shalat Id.',
    sejarahSeksi: [
      {
        judul: 'Dinisbahkan kepada Ali \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647',
        isi: 'Masjid ini dinisbahkan kepada Ali bin Abi Thalib \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647, sepupu sekaligus menantu Rasulullah \ufdfa dan Khalifah keempat. Termasuk dalam gugus masjid-masjid bersejarah di barat daya Masjid Nabawi yang menandai tempat-tempat bersejarah masa Nabi dan Khulafaur Rasyidin.',
      },
    ],
    tokoh: [
      { nama: 'Ali bin Abi Thalib \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Khalifah keempat, dinisbahkan kepada masjid ini' },
    ],
    keutamaan: [
      'Mengenang Ali bin Abi Thalib \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647, salah satu dari sepuluh sahabat yang dijanjikan surga.',
    ],
    dalil: [],
    adab: [
      'Jika dibuka, shalat sunnah dua rakaat dengan tertib.',
      'Tidak ada ritual khusus; ambil pelajaran dari sejarahnya.',
    ],
  },
  {
    id: 'sabu-masajid',
    tipe: 'masjid',
    nama: 'Sab\u2019u Masajid (Tujuh Masjid)',
    namaArab: '\u0627\u0644\u0645\u0633\u0627\u062c\u062f \u0627\u0644\u0633\u0628\u0639\u0629',
    kota: 'Madinah',
    jarakKm: 3,
    jamKunjungan: 'Area terbuka, masjid utama buka',
    ringkas: 'Kompleks masjid kecil bersejarah di lokasi Perang Khandaq (Perang Parit).',
    gambar: '/lokasi/sabu-masajid.jpg',
    koordinat: { lat: 24.4847, lng: 39.6028 },
    sejarah:
      'Sab\u2019u Masajid (\u201cTujuh Masjid\u201d) adalah kompleks beberapa masjid kecil bersejarah di sisi barat Gunung Sala\u2019, Madinah. Lokasi ini terhubung dengan Perang Khandaq (Perang Parit) tahun 5 H/627 M, ketika kaum muslimin menggali parit untuk mempertahankan Madinah dari pasukan gabungan (Al-Ahzab).',
    sejarahSeksi: [
      {
        judul: 'Perang Khandaq (Perang Parit)',
        isi: 'Atas usul Salman Al-Farisi \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647, kaum muslimin menggali parit di sekeliling sisi Madinah yang rawan. Strategi ini berhasil menahan pasukan gabungan Quraisy dan sekutunya. Masjid-masjid kecil dibangun di titik-titik tempat Nabi \ufdfa dan para sahabat shalat serta bertahan selama pengepungan.',
      },
      {
        judul: 'Masjid-Masjid dalam Kompleks',
        isi: 'Meski dinamai \u201cTujuh\u201d, kini terdapat sekitar enam masjid kecil: Masjid Al-Fath (terbesar, tempat Nabi \ufdfa berdoa memohon kemenangan), Masjid Salman Al-Farisi, Masjid Abu Bakar, Masjid Umar bin Khattab, Masjid Ali bin Abi Thalib, dan Masjid Fatimah. Banyak peziarah menambahkan Masjid Qiblatain sehingga genap disebut tujuh.',
      },
    ],
    tokoh: [
      { nama: 'Salman Al-Farisi \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Pengusul strategi menggali parit' },
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Memimpin pertahanan & berdoa di Masjid Al-Fath' },
    ],
    keutamaan: [
      'Mengenang strategi & keteguhan kaum muslimin dalam Perang Khandaq.',
      'Salah satu kompleks masjid tertua yang dibangun di titik bersejarah.',
    ],
    dalil: [
      {
        sumber: 'QS. Al-Ahzab: 9',
        teks: 'Wahai orang-orang yang beriman! Ingatlah akan nikmat Allah (yang diberikan) kepadamu ketika bala tentara datang kepadamu, lalu Kami kirimkan kepada mereka angin topan dan bala tentara yang tidak dapat kamu melihatnya.',
      },
    ],
    adab: [
      'Hanya untuk mengambil pelajaran sejarah; tidak ada ritual khusus.',
      'Masjid Al-Fath umumnya dibuka, masjid kecil lainnya kadang terkunci.',
      'Ziarah ke kompleks ini bersifat anjuran, bukan rukun umrah.',
    ],
    catatan: 'Keutamaan khusus shalat di masjid-masjid ini tidak berdasar hadis sahih tertentu. Ziarah cukup untuk mengenang sejarah Perang Khandaq, bukan mencari keberkahan khusus dari tempatnya.',
  },

  // ============================================ TEMPAT BERSEJARAH
  {
    id: 'jabal-nur',
    tipe: 'sejarah',
    nama: 'Jabal Nur (Gua Hira)',
    namaArab: '\u062c\u0628\u0644 \u0627\u0644\u0646\u0648\u0631',
    kota: 'Makkah',
    jarakKm: 6.5,
    jamKunjungan: 'Disarankan pagi hari \u00b7 pendakian berat, butuh fisik prima',
    ringkas: 'Bukit tempat Gua Hira, lokasi turunnya wahyu pertama.',
    gambar: '/lokasi/jabal-nur.jpg',
    koordinat: { lat: 21.4577, lng: 39.8617 },
    sejarah:
      'Jabal Nur (\u201cGunung Cahaya\u201d) di timur laut Makkah memuat Gua Hira, tempat Nabi Muhammad \ufdfa menerima wahyu pertama berupa lima ayat awal Surah Al-\u2018Alaq melalui Malaikat Jibril.',
    sejarahSeksi: [
      {
        judul: 'Tempat Wahyu Pertama',
        isi: 'Sebelum diangkat menjadi nabi, Rasulullah \ufdfa kerap menyendiri dan bertafakkur di Gua Hira. Pada usia \u00b140 tahun, di bulan Ramadan (sekitar 610 M), Malaikat Jibril datang dan memerintahkan \u201cIqra\u2019 (Bacalah)\u201d. Setelah tiga kali dekapan, turunlah lima ayat pertama Surah Al-\u2018Alaq \u2014 penanda dimulainya kenabian.',
      },
      {
        judul: 'Lokasi & Pendakian',
        isi: 'Jabal Nur terletak sekitar 4\u20137 km di timur laut Masjidil Haram dengan ketinggian \u00b1640 m dpl. Gua Hira sendiri kecil (\u00b13,5 m \u00d7 1,5 m), berada dekat puncak menghadap ke arah Ka\u2019bah. Mendaki ke puncak melewati ratusan anak tangga terjal dan bisa memakan 30\u201360 menit atau lebih, sehingga butuh fisik prima.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menerima wahyu pertama di Gua Hira' },
      { nama: 'Malaikat Jibril', peran: 'Menyampaikan wahyu pertama' },
    ],
    keutamaan: [
      'Tempat turunnya wahyu pertama dan dimulainya risalah Islam.',
      'Simbol pentingnya tafakkur, ilmu, dan membaca (Iqra\u2019).',
    ],
    dalil: [
      {
        sumber: 'QS. Al-\u2018Alaq: 1\u20135',
        teks: 'Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan\u2026 Dia mengajarkan manusia apa yang tidak diketahuinya.',
      },
    ],
    adab: [
      'Gunakan alas kaki nyaman, bawa air cukup, berangkat pagi/sore agar tidak terlalu panas.',
      'Jamaah lansia atau berisiko cukup menyaksikan dari kejauhan.',
      'Ziarah ini bernilai mengambil pelajaran (ibrah), bukan ibadah khusus yang disyariatkan.',
    ],
    catatan:
      'Mendaki Gua Hira tidak termasuk rangkaian wajib umrah/haji; niatkan sebagai napak tilas sejarah, bukan ritual.',
  },
  {
    id: 'jabal-tsur',
    tipe: 'sejarah',
    nama: 'Jabal Tsur (Gua Tsur)',
    namaArab: '\u062c\u0628\u0644 \u062b\u0648\u0631',
    kota: 'Makkah',
    jarakKm: 7.0,
    jamKunjungan: 'Pagi hari \u00b7 pendakian terjal & panjang',
    ringkas: 'Gunung tempat Nabi \ufdfa dan Abu Bakar bersembunyi saat hijrah.',
    gambar: '/lokasi/jabal-tsur.jpg',
    koordinat: { lat: 21.3859, lng: 39.8472 },
    sejarah:
      'Jabal Tsur di selatan Makkah memuat Gua Tsur, tempat Nabi Muhammad \ufdfa dan Abu Bakar Ash-Shiddiq bersembunyi tiga hari dari kejaran Quraisy di awal perjalanan hijrah ke Madinah.',
    sejarahSeksi: [
      {
        judul: 'Benteng Perlindungan Saat Hijrah',
        isi: 'Sekitar 7 km di selatan Masjidil Haram, di puncak Jabal Tsur terdapat Gua Tsur tempat Rasulullah \ufdfa dan Abu Bakar berlindung selama tiga hari sebelum melanjutkan hijrah pada sekitar 16 Juli 622 M. Saat Abu Bakar khawatir musuh menemukan mereka, Nabi \ufdfa menenangkannya bahwa Allah bersama mereka.',
      },
      {
        judul: 'Jabal Nur vs Jabal Tsur',
        isi: 'Keduanya sering tertukar. Jabal Nur (utara/timur laut Makkah) adalah tempat wahyu pertama \u2014 pintu awal kenabian. Jabal Tsur (selatan Makkah) adalah tempat persembunyian saat hijrah \u2014 benteng yang menjaga kelangsungan risalah.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Bersembunyi di Gua Tsur saat hijrah' },
      { nama: 'Abu Bakar Ash-Shiddiq', peran: 'Sahabat yang menemani hijrah' },
    ],
    keutamaan: [
      'Saksi keteguhan iman dan tawakal di momen kritis hijrah.',
      'Diabadikan dalam Al-Qur\u2019an sebagai bukti pertolongan Allah.',
    ],
    dalil: [
      {
        sumber: 'QS. At-Taubah: 40',
        teks: 'Ketika dia berkata kepada sahabatnya, \u201cJangan bersedih, sesungguhnya Allah bersama kita.\u201d',
      },
    ],
    adab: [
      'Pendakian Jabal Tsur lebih berat dari Jabal Nur; perlu persiapan fisik baik.',
      'Berangkat pagi, bawa air cukup, hindari kerumunan padat.',
    ],
    catatan:
      'Mendaki gua bukan bagian dari ritual umrah; bernilai sebagai pelajaran sejarah.',
  },
  {
    id: 'jabal-rahmah',
    tipe: 'sejarah',
    nama: 'Jabal Rahmah',
    namaArab: '\u062c\u0628\u0644 \u0627\u0644\u0631\u062d\u0645\u0629',
    kota: 'Arafah',
    jarakKm: 22.0,
    jamKunjungan: 'Ramai saat musim haji \u00b7 area terbuka',
    ringkas: 'Bukit di Padang Arafah, dikaitkan dengan Khutbah Wada\u2019.',
    gambar: '/lokasi/jabal-rahmah.jpg',
    koordinat: { lat: 21.3549, lng: 39.9843 },
    sejarah:
      'Jabal Rahmah (\u201cBukit Kasih Sayang\u201d) di Padang Arafah. Di kawasan Arafah inilah Rasulullah \ufdfa menyampaikan Khutbah Wada\u2019 di hadapan puluhan ribu sahabat.',
    sejarahSeksi: [
      {
        judul: 'Padang Arafah & Khutbah Wada\u2019',
        isi: 'Arafah adalah inti pelaksanaan ibadah haji \u2014 di sinilah jamaah haji melaksanakan wukuf. Di kawasan ini Rasulullah \ufdfa menyampaikan Khutbah Wada\u2019 (haji perpisahan), berisi pesan tentang persaudaraan, hak-hak manusia, dan penyempurnaan agama.',
      },
      {
        judul: 'Tugu Penanda',
        isi: 'Di puncak Jabal Rahmah terdapat tugu/monumen penanda. Banyak peziarah naik ke bukit ini saat berada di Arafah, terutama di luar musim haji.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menyampaikan Khutbah Wada\u2019 di Arafah' },
    ],
    keutamaan: [
      'Arafah adalah rukun haji (wukuf) \u2014 \u201cHaji itu (wukuf di) Arafah\u201d.',
      'Tempat bersejarah penyampaian Khutbah Wada\u2019.',
    ],
    adab: [
      'Tidak termasuk rangkaian wajib umrah; biasanya dikunjungi saat city tour Makkah.',
      'Area terbuka & panas \u2014 bawa pelindung matahari dan air.',
    ],
    catatan:
      'Kisah pertemuan Nabi Adam dan Hawa di bukit ini populer di masyarakat, namun TIDAK memiliki dasar riwayat yang kuat. Kunjungan bernilai sejarah, bukan ritual.',
  },
  {
    id: 'jabal-uhud',
    tipe: 'sejarah',
    nama: 'Jabal Uhud',
    namaArab: '\u062c\u0628\u0644 \u0623\u062d\u062f',
    kota: 'Madinah',
    jarakKm: 4.5,
    jamKunjungan: '06.00 \u2013 18.00 (waktu setempat)',
    ringkas: 'Gunung tempat Perang Uhud dan makam para syuhada.',
    gambar: '/lokasi/jabal-uhud.jpg',
    koordinat: { lat: 24.5018, lng: 39.6157 },
    sejarah:
      'Jabal Uhud, gunung batu kemerahan \u00b15 km di utara Madinah, menjadi saksi Perang Uhud (3 H / 625 M). Di kakinya dimakamkan para syuhada Uhud, termasuk Hamzah bin Abdul Muthalib.',
    sejarahSeksi: [
      {
        judul: 'Perang Uhud',
        isi: 'Perang Uhud terjadi pada 15 Syawal 3 Hijriah (sekitar Maret 625 M), pembalasan Quraisy atas kekalahan di Badar. \u00b1700 pasukan muslim menghadapi \u00b13.000 pasukan Quraisy. Kemenangan nyaris diraih, namun sebagian pasukan pemanah meninggalkan pos di Bukit Rumat karena tergiur harta rampasan. Khalid bin Walid (saat itu di pihak Quraisy) memanfaatkannya untuk menyerang balik, dan 70 sahabat gugur sebagai syuhada.',
      },
      {
        judul: 'Makam Para Syuhada',
        isi: 'Rasulullah \ufdfa memerintahkan agar para syuhada dimakamkan di tempat mereka gugur, di antara Jabal Uhud dan Bukit Rumat. Yang paling utama adalah makam Hamzah bin Abdul Muthalib, paman Nabi \ufdfa yang bergelar \u201cSinga Allah\u201d (Asadullah), gugur ditombak Wahsyi. Kompleks makam kini dipagari dan menjadi tujuan ziarah utama di Madinah.',
      },
      {
        judul: 'Gunung yang Dicintai Nabi \ufdfa',
        isi: 'Rasulullah \ufdfa bersabda bahwa Uhud adalah gunung yang mencintai beliau dan beliau mencintainya. Dalam riwayat lain disebutkan Uhud termasuk salah satu gunung di surga.',
      },
    ],
    tokoh: [
      { nama: 'Hamzah bin Abdul Muthalib', peran: 'Paman Nabi \ufdfa, \u201cSinga Allah\u201d, syahid di Uhud' },
      { nama: 'Mush\u2019ab bin Umair', peran: 'Sahabat pembawa panji, syahid di Uhud' },
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Memimpin pasukan, terluka dalam perang' },
    ],
    keutamaan: [
      'Tempat mengenang pengorbanan para syuhada dan mengambil pelajaran ketaatan pada pemimpin.',
      'Disebut sebagai salah satu gunung yang dicintai Rasulullah \ufdfa.',
    ],
    dalil: [
      {
        sumber: 'HR. Bukhari',
        teks: 'Uhud adalah gunung yang mencintai kami dan kami mencintainya.',
      },
    ],
    adab: [
      'Berdiri di luar pagar makam dengan khidmat, ucapkan salam, dan doakan para syuhada.',
      'Hindari mengusap pagar, mengambil tanah untuk \u201cberkah\u201d, atau meminta kepada penghuni kubur.',
      'Naik ke Bukit Rumat (Bukit Pemanah) untuk merenungi medan perang.',
    ],
  },
  {
    id: 'jannatul-baqi',
    tipe: 'sejarah',
    nama: 'Jannatul Baqi\u2019',
    namaArab: '\u062c\u0646\u0629 \u0627\u0644\u0628\u0642\u064a\u0639',
    kota: 'Madinah',
    jarakKm: 1.2,
    jamKunjungan: 'Dibuka untuk ziarah pada waktu tertentu setelah shalat',
    ringkas: 'Pemakaman utama umat Islam sejak zaman Nabi \ufdfa.',
    gambar: '/lokasi/jannatul-baqi.jpg',
    koordinat: { lat: 24.4672, lng: 39.6147 },
    sejarah:
      'Jannatul Baqi\u2019 adalah kompleks pemakaman utama di sisi tenggara Masjid Nabawi, tempat bersemayam ribuan sahabat, keluarga, dan ahlul bait Rasulullah \ufdfa.',
    sejarahSeksi: [
      {
        judul: 'Pemakaman Para Sahabat',
        isi: 'Sejak zaman Nabi \ufdfa, Baqi\u2019 menjadi pemakaman penduduk Madinah. Di sini dimakamkan banyak sahabat dan keluarga Rasulullah \ufdfa, di antaranya istri-istri beliau (termasuk Aisyah), putri-putri beliau, Utsman bin Affan, serta banyak tabiin.',
      },
      {
        judul: 'Adab Ziarah',
        isi: 'Menziarahi Baqi\u2019 dianjurkan untuk merenungkan kehidupan akhirat dan mendoakan para pendahulu. Rasulullah \ufdfa sendiri sering mendatangi Baqi\u2019 untuk mendoakan ahli kubur.',
      },
    ],
    tokoh: [
      { nama: 'Utsman bin Affan', peran: 'Khalifah ketiga, dimakamkan di Baqi\u2019' },
      { nama: 'Aisyah binti Abu Bakar', peran: 'Istri Nabi \ufdfa, Ummul Mukminin' },
      { nama: 'Ibrahim bin Muhammad', peran: 'Putra Rasulullah \ufdfa' },
    ],
    keutamaan: [
      'Tempat dimakamkannya ribuan sahabat dan ahlul bait Nabi \ufdfa.',
      'Ziarah mengingatkan pada kematian dan akhirat.',
    ],
    adab: [
      'Ucapkan salam kepada ahli kubur dan doakan mereka.',
      'Saat ini umumnya hanya jamaah pria yang dapat masuk; ikuti aturan waktu buka.',
      'Hindari perbuatan yang tidak dicontohkan seperti mengusap atau meminta kepada kubur.',
    ],
  },
  {
    id: 'masjid-qiblatain',
    tipe: 'sejarah',
    nama: 'Masjid Qiblatain',
    namaArab: '\u0645\u0633\u062c\u062f \u0627\u0644\u0642\u0628\u0644\u062a\u064a\u0646',
    kota: 'Madinah',
    jarakKm: 5.5,
    jamKunjungan: 'Buka 24 jam',
    ringkas: 'Masjid \u201cdua kiblat\u201d, saksi perpindahan arah kiblat ke Ka\u2019bah.',
    gambar: '/lokasi/masjid-qiblatain.jpg',
    koordinat: { lat: 24.4838, lng: 39.5740 },
    sejarah:
      'Masjid Qiblatain (\u201cMasjid Dua Kiblat\u201d) di barat laut Madinah adalah tempat turunnya perintah memindahkan kiblat dari Baitul Maqdis ke Ka\u2019bah saat shalat berlangsung.',
    sejarahSeksi: [
      {
        judul: 'Perpindahan Kiblat',
        isi: 'Awalnya bernama Masjid Bani Salamah, dibangun Sawad bin Ghanam bin Ka\u2019ab pada tahun 2 H. Setelah Nabi \ufdfa shalat menghadap Baitul Maqdis selama sekitar 16 bulan di Madinah, turun wahyu memerintahkan menghadap Ka\u2019bah. Saat shalat sedang berlangsung, imam dan jamaah berputar mengubah arah kiblat \u2014 sehingga masjid ini memiliki dua arah kiblat dalam satu peristiwa.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menerima perintah perpindahan kiblat' },
      { nama: 'Sawad bin Ghanam bin Ka\u2019ab', peran: 'Membangun masjid (Masjid Bani Salamah)' },
    ],
    keutamaan: [
      'Saksi peristiwa besar perpindahan arah kiblat umat Islam.',
      'Simbol ketaatan penuh para sahabat terhadap perintah Allah.',
    ],
    dalil: [
      {
        sumber: 'QS. Al-Baqarah: 144',
        teks: 'Maka palingkanlah wajahmu ke arah Masjidil Haram. Dan di mana saja kamu berada, palingkanlah wajahmu ke arahnya.',
      },
    ],
    adab: [
      'Biasanya dikunjungi dalam city tour Madinah bersama Masjid Quba dan Jabal Uhud.',
    ],
  },
  {
    id: 'jannatul-mualla',
    tipe: 'sejarah',
    nama: 'Jannatul Mu\u2019alla',
    namaArab: '\u062c\u0646\u0629 \u0627\u0644\u0645\u0639\u0644\u0627\u0629',
    kota: 'Makkah',
    jarakKm: 1.5,
    jamKunjungan: 'Ziarah dari luar pagar',
    ringkas: 'Pemakaman bersejarah Makkah, tempat dimakamkannya Sayyidah Khadijah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0627.',
    gambar: '/lokasi/jannatul-mualla.jpg',
    koordinat: { lat: 21.4314, lng: 39.8294 },
    sejarah:
      'Jannatul Mu\u2019alla (juga disebut Maqbarah Al-Ma\u2019la) adalah pemakaman tua di distrik Al-Hujun, Makkah, tidak jauh dari Masjid Jin. Di sinilah dimakamkan istri pertama Nabi \ufdfa, Sayyidah Khadijah binti Khuwailid, beserta sejumlah kerabat dan keluarga beliau.',
    sejarahSeksi: [
      {
        judul: 'Tempat Peristirahatan Sayyidah Khadijah',
        isi: 'Jannatul Mu\u2019alla dikenal sebagai tempat dimakamkannya Sayyidah Khadijah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0627, istri pertama Nabi \ufdfa dan wanita pertama yang beriman. Ia wafat di Makkah sebelum peristiwa hijrah. Di pemakaman ini juga dimakamkan sejumlah anggota keluarga dan kerabat Nabi \ufdfa, termasuk kakek beliau Abdul Muthalib.',
      },
      {
        judul: 'Pemakaman Bersejarah Makkah',
        isi: 'Sebagaimana Jannatul Baqi di Madinah, Jannatul Mu\u2019alla menjadi pemakaman utama bagi penduduk Makkah sejak masa awal Islam. Banyak sahabat dan tabi\u2019in dimakamkan di sini. Peziarah dianjurkan mendoakan ahli kubur dari luar pagar tanpa melakukan ritual yang berlebihan.',
      },
    ],
    tokoh: [
      { nama: 'Sayyidah Khadijah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0627', peran: 'Istri pertama Nabi \ufdfa, dimakamkan di sini' },
      { nama: 'Abdul Muthalib', peran: 'Kakek Nabi \ufdfa' },
    ],
    keutamaan: [
      'Mengingatkan pada pengorbanan Sayyidah Khadijah yang mendukung dakwah di masa-masa tersulit.',
      'Tempat untuk merenungkan kematian dan mendoakan kaum muslimin yang telah wafat.',
    ],
    dalil: [
      {
        sumber: 'HR. Muslim',
        teks: 'Nabi \ufdfa mengajarkan doa ziarah kubur: \u201cAss-sal\u0101mu \u2018alaikum ahlad-diy\u0101r minal-mu\u2019min\u012bna wal-muslim\u012bn, wa inn\u0101 in sy\u0101\u2019all\u0101hu bikum l\u0101\u1e25iq\u016bn.\u201d (Salam sejahtera atas kalian wahai penghuni kubur dari kaum mukminin dan muslimin.)',
      },
    ],
    adab: [
      'Ziarah dilakukan dari luar pagar; mendoakan ahli kubur, bukan meminta kepada mereka.',
      'Hindari menyentuh, mengusap, atau menjadikan kuburan sebagai tempat memohon.',
      'Jaga ketertiban dan kekhusyukan saat berdoa.',
    ],
    catatan: 'Ziarah kubur disyariatkan untuk mengingat akhirat dan mendoakan yang wafat. Hindari praktik yang tidak sesuai tuntunan seperti meminta kepada ahli kubur.',
  },
  {
    id: 'jabal-qubais',
    tipe: 'sejarah',
    nama: 'Jabal Abu Qubais',
    namaArab: '\u062c\u0628\u0644 \u0623\u0628\u064a \u0642\u0628\u064a\u0633',
    kota: 'Makkah',
    jarakKm: 0.5,
    jamKunjungan: 'Dilihat dari area Masjidil Haram',
    ringkas: 'Bukit di sebelah timur Masjidil Haram, saksi mukjizat terbelahnya bulan.',
    gambar: '/lokasi/jabal-qubais.jpg',
    koordinat: { lat: 21.4231, lng: 39.8305 },
    sejarah:
      'Jabal Abu Qubais adalah salah satu bukit tertua di Makkah, terletak di sebelah timur Masjidil Haram dekat bukit Shafa. Dalam tradisi Islam, bukit ini dikaitkan dengan peristiwa mukjizat terbelahnya bulan (syaqqul qamar) di hadapan kaum Quraisy.',
    sejarahSeksi: [
      {
        judul: 'Mukjizat Terbelahnya Bulan',
        isi: 'Diriwayatkan bahwa kaum musyrikin Quraisy meminta Nabi \ufdfa menunjukkan tanda kenabian. Maka atas izin Allah, bulan terbelah menjadi dua \u2014 satu bagian terlihat di atas Jabal Abu Qubais dan bagian lain di arah seberang. Peristiwa ini disinggung dalam Surah Al-Qamar.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menunjukkan mukjizat terbelahnya bulan atas izin Allah' },
    ],
    keutamaan: [
      'Menjadi pengingat salah satu mukjizat besar Nabi \ufdfa yang disaksikan kaum Quraisy.',
    ],
    dalil: [
      {
        sumber: 'QS. Al-Qamar: 1',
        teks: 'Telah dekat hari Kiamat dan bulan pun telah terbelah.',
      },
    ],
    adab: [
      'Cukup mengambil pelajaran dari sejarahnya; tidak ada ritual khusus.',
      'Area sekitarnya kini banyak dikelilingi bangunan modern.',
    ],
  },
  {
    id: 'masjid-aisyah-tanim',
    tipe: 'sejarah',
    nama: 'Masjid Aisyah (Tan\u2019im)',
    namaArab: '\u0645\u0633\u062c\u062f \u0639\u0627\u0626\u0634\u0629',
    kota: 'Makkah',
    jarakKm: 7.5,
    jamKunjungan: 'Buka 24 jam \u00b7 titik miqat',
    ringkas: 'Miqat terdekat dari Makkah untuk memulai ihram umrah.',
    gambar: '/lokasi/masjid-aisyah-tanim.jpg',
    koordinat: { lat: 21.4486, lng: 39.7656 },
    sejarah:
      'Masjid Aisyah di Tan\u2019im adalah salah satu titik miqat terdekat dari Makkah, sekitar 7,5 km dari Masjidil Haram, tempat banyak jamaah mengambil ihram untuk umrah.',
    sejarahSeksi: [
      {
        judul: 'Miqat Sayyidah Aisyah',
        isi: 'Setelah haji wada\u2019, Aisyah radhiyallahu \u2018anha ingin melaksanakan umrah. Rasulullah \ufdfa menyuruhnya berangkat ke Tan\u2019im dan memulai ihram dari sana. Karena itu masjid ini dikenal sebagai Masjid Aisyah, dan Tan\u2019im menjadi salah satu batas tanah haram yang lazim digunakan penduduk Makkah untuk miqat umrah.',
      },
    ],
    tokoh: [
      { nama: 'Aisyah binti Abu Bakar', peran: 'Mengambil miqat umrah dari Tan\u2019im' },
    ],
    keutamaan: [
      'Titik miqat terdekat dari Makkah untuk ihram umrah.',
      'Banyak dipakai jamaah untuk umrah sunnah tambahan.',
    ],
    adab: [
      'Berniat ihram dan mulai talbiyah dari sini saat hendak umrah lagi.',
      'Sediakan kain ihram sebelum berangkat.',
    ],
  },
  {
    id: 'jabal-sala',
    tipe: 'sejarah',
    nama: 'Jabal Sala\u2019 (Gunung Sala\u2019)',
    namaArab: '\u062c\u0628\u0644 \u0633\u0644\u0639',
    kota: 'Madinah',
    jarakKm: 1.5,
    jamKunjungan: 'Dilihat dari area sekitar',
    ringkas: 'Gunung di pusat Madinah, titik strategis pertahanan dalam Perang Khandaq.',
    gambar: '/lokasi/jabal-sala.jpg',
    koordinat: { lat: 24.4772, lng: 39.6053 },
    sejarah:
      'Jabal Sala\u2019 adalah gunung yang terletak di bagian dalam Kota Madinah, dekat kompleks Sab\u2019u Masajid. Gunung ini menjadi titik strategis pertahanan kaum muslimin saat Perang Khandaq, karena parit digali di sisi-sisi yang rawan sementara Jabal Sala\u2019 menjadi benteng alami di belakang pasukan.',
    sejarahSeksi: [
      {
        judul: 'Benteng Alami Perang Khandaq',
        isi: 'Saat Perang Khandaq (5 H), pasukan muslimin memposisikan diri dengan Jabal Sala\u2019 di belakang mereka sebagai pelindung alami, sementara parit (khandaq) digali di sisi yang terbuka. Strategi ini, atas usul Salman Al-Farisi, membuat Madinah sulit ditembus pasukan gabungan.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Memimpin pertahanan Madinah dengan Jabal Sala\u2019 sebagai benteng' },
    ],
    keutamaan: [
      'Saksi bisu keteguhan dan strategi kaum muslimin dalam Perang Khandaq.',
    ],
    dalil: [],
    adab: [
      'Cukup untuk mengambil pelajaran sejarah; tidak ada ritual khusus.',
    ],
  },
  {
    id: 'saqifah-bani-saidah',
    tipe: 'sejarah',
    nama: 'Saqifah Bani Saidah',
    namaArab: '\u0633\u0642\u064a\u0641\u0629 \u0628\u0646\u064a \u0633\u0627\u0639\u062f\u0629',
    kota: 'Madinah',
    jarakKm: 0.45,
    jamKunjungan: 'Taman terbuka, kadang dibuka untuk umum',
    ringkas: 'Taman bersejarah tempat pembaiatan Abu Bakar \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 sebagai khalifah pertama.',
    gambar: '/lokasi/saqifah-bani-saidah.jpg',
    koordinat: { lat: 24.4685, lng: 39.6105 },
    sejarah:
      'Saqifah Bani Saidah terletak di sisi barat laut Masjid Nabawi, hanya sekitar 450 meter dari Raudhah. \u201cSaqifah\u201d berarti bangunan beratap \u2014 dahulu ini adalah balai pertemuan milik kabilah Bani Saidah dari suku Khazraj, tempat kaum Anshar bermusyawarah. Kini lokasinya menjadi taman kecil yang asri dengan pepohonan kurma. Di tempat inilah berlangsung peristiwa besar: musyawarah pemilihan pemimpin umat setelah Rasulullah \ufdfa wafat.',
    sejarahSeksi: [
      {
        judul: 'Musyawarah Pertama Umat Islam',
        isi: 'Tidak lama setelah Rasulullah \ufdfa wafat pada tahun 11 H, kaum Anshar berkumpul di Saqifah Bani Saidah dan sempat mengusulkan Sa\u2019ad bin Ubadah sebagai pemimpin. Ketika kaum Muhajirin (Abu Bakar, Umar, dan Abu Ubaidah) datang, terjadi musyawarah yang sempat memanas mengenai siapa yang paling berhak memimpin umat. Peristiwa ini menjadi rapat politik pertama umat Islam.',
      },
      {
        judul: 'Pembaiatan Abu Bakar \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647',
        isi: 'Umar bin Khattab \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 mengingatkan bahwa Rasulullah \ufdfa pernah menunjuk Abu Bakar sebagai imam shalat saat beliau sakit. Maka tidak ada yang lebih layak mendahului Abu Bakar. Umar lalu menggenggam tangan Abu Bakar dan membaiatnya, diikuti seluruh yang hadir. Keesokan harinya, pembaiatan dikukuhkan secara umum di Masjid Nabawi. Maka resmilah Abu Bakar sebagai khalifah pertama, memulai era Khulafaur Rasyidin.',
      },
      {
        judul: 'Teladan Kerendahan Hati',
        isi: 'Peristiwa ini menyimpan teladan besar: ketika ditawari memimpin, Umar menjawab dengan rendah hati, \u201cBagaimana mungkin aku menjadi pemimpin umat yang di dalamnya ada Abu Bakar?\u201d Setelah dibaiat, Abu Bakar berpidato, \u201cWahai manusia, aku telah diangkat memimpin kalian, padahal aku bukan yang terbaik di antara kalian.\u201d Sebuah pelajaran tentang musyawarah, kerendahan hati, dan pentingnya persatuan.',
      },
    ],
    tokoh: [
      { nama: 'Abu Bakar Ash-Shiddiq \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Dibaiat menjadi khalifah pertama di tempat ini' },
      { nama: 'Umar bin Khattab \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Orang pertama yang membaiat Abu Bakar' },
      { nama: 'Sa\u2019ad bin Ubadah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Calon dari kaum Anshar' },
    ],
    keutamaan: [
      'Saksi sejarah lahirnya kepemimpinan Islam (Khilafah Rasyidah) pertama.',
      'Mengajarkan pentingnya musyawarah (syura) dalam memilih pemimpin.',
      'Teladan kerendahan hati dan mengutamakan persatuan umat.',
    ],
    dalil: [
      {
        sumber: 'QS. Asy-Syura: 38',
        teks: '\u201c\u2026sedang urusan mereka (diputuskan) dengan musyawarah di antara mereka\u2026\u201d \u2014 landasan pentingnya musyawarah yang tercermin dalam peristiwa Saqifah.',
      },
      {
        sumber: 'HR. Bukhari',
        teks: 'Diriwayatkan dari Umar bahwa setelah Nabi \ufdfa wafat, kaum Anshar berkumpul di Saqifah Bani Saidah, lalu Umar mengajak Abu Bakar menemui mereka untuk menjaga persatuan umat.',
      },
    ],
    adab: [
      'Tempat untuk mengambil pelajaran sejarah, bukan ritual khusus.',
      'Jika taman dibuka, jaga ketertiban dan kebersihan.',
      'Renungkan nilai musyawarah & persatuan yang lahir di tempat ini.',
    ],
    catatan: 'Saqifah Bani Saidah kini berupa taman dan tidak selalu dibuka untuk umum. Ziarah ke sini untuk mengenang sejarah, bukan ibadah khusus.',
  },
  {
    id: 'masjid-bir-ali',
    tipe: 'masjid',
    nama: 'Masjid Bir Ali (Dzulhulaifah)',
    namaArab: '\u0645\u0633\u062c\u062f \u0630\u064a \u0627\u0644\u062d\u0644\u064a\u0641\u0629',
    kota: 'Madinah',
    jarakKm: 11,
    jamKunjungan: 'Buka 24 jam untuk miqat',
    ringkas: 'Tempat miqat (niat ihram) bagi jamaah yang berangkat dari Madinah menuju Makkah.',
    gambar: '/lokasi/masjid-bir-ali.jpg',
    koordinat: { lat: 24.4131, lng: 39.5419 },
    sejarah:
      'Masjid Bir Ali, dikenal juga sebagai Masjid Dzulhulaifah atau Masjid Asy-Syajarah, terletak di kawasan Dzulhulaifah sekitar 11\u201314 km dari Masjid Nabawi. Inilah miqat makani (batas tempat memulai ihram) bagi penduduk Madinah dan jamaah yang melewati Madinah menuju Makkah. Rasulullah \ufdfa sendiri memulai ihram dari tempat ini saat Haji Wada\u2019.',
    sejarahSeksi: [
      {
        judul: 'Miqat yang Ditetapkan Rasulullah \ufdfa',
        isi: 'Nabi \ufdfa menetapkan Dzulhulaifah sebagai miqat bagi penduduk Madinah \u2014 miqat yang paling jauh jaraknya dari Makkah (sekitar 420 km). Di sinilah dahulu Rasulullah \ufdfa berwudhu, shalat dua rakaat, lalu berniat ihram dan bertalbiyah sebelum melanjutkan perjalanan ke Makkah.',
      },
      {
        judul: 'Nama Bir Ali & Masjid Asy-Syajarah',
        isi: 'Disebut \u201cBir Ali\u201d (sumur Ali) karena di kawasan ini dahulu terdapat banyak sumur. Disebut juga \u201cMasjid Asy-Syajarah\u201d (masjid pohon) karena dibangun di tempat Nabi \ufdfa pernah berteduh di bawah pohon akasia. Masjid pertama dibangun pada masa Umar bin Abdul Aziz (87\u201393 H), lalu berkali-kali direnovasi hingga menjadi kompleks megah dengan fasilitas lengkap untuk jamaah berihram.',
      },
      {
        judul: 'Amalan Sunnah saat Miqat',
        isi: 'Di Bir Ali jamaah melakukan rangkaian: mandi sunnah ihram, mengenakan pakaian ihram, shalat sunnah dua rakaat, lalu berniat ihram umrah/haji dan memulai talbiyah. Penting: niat ihram harus dilakukan sebelum melewati batas miqat \u2014 jika terlewat tanpa niat, jamaah wajib kembali atau membayar dam.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Memulai ihram dari tempat ini saat Haji Wada\u2019' },
      { nama: 'Umar bin Abdul Aziz', peran: 'Membangun masjid pertama di lokasi ini (87\u201393 H)' },
    ],
    keutamaan: [
      'Miqat resmi yang ditetapkan langsung oleh Rasulullah \ufdfa.',
      'Titik awal ibadah umrah/haji \u2014 tempat menanggalkan urusan dunia & berniat.',
      'Mengikuti jejak Nabi \ufdfa yang berihram dari tempat yang sama.',
    ],
    dalil: [
      {
        sumber: 'HR. Bukhari & Muslim (dari Ibnu Abbas)',
        teks: 'Nabi \ufdfa menetapkan miqat penduduk Madinah di Dzul Hulaifah, penduduk Syam di Juhfah, penduduk Najd di Qarnul Manazil, dan penduduk Yaman di Yalamlam.',
      },
    ],
    adab: [
      'Lakukan mandi sunnah ihram & kenakan pakaian ihram di sini.',
      'Shalat sunnah dua rakaat sebelum berniat ihram.',
      'WAJIB berniat ihram sebelum melewati batas miqat \u2014 jangan tertunda.',
      'Perbanyak talbiyah setelah berniat: Labbaik Allahumma labbaik\u2026',
      'Jaga larangan ihram setelah berniat (tidak memakai wewangian, tidak memotong rambut/kuku, dll).',
    ],
    catatan: 'Bagi jamaah Indonesia gelombang dari Madinah, Bir Ali adalah miqat utama. Pastikan sudah berniat ihram sebelum bus melewati batas miqat untuk menghindari kewajiban dam.',
  },

  // ===================================================== THAIF
  {
    id: 'masjid-abdullah-bin-abbas',
    tipe: 'masjid',
    nama: 'Masjid Abdullah bin Abbas',
    namaArab: '\u0645\u064e\u0633\u0652\u062c\u0650\u062f \u0639\u064e\u0628\u0652\u062f \u0671\u0644\u0644\u0670\u0647 \u0671\u0628\u0652\u0646 \u0671\u0644\u0652\u0639\u064e\u0628\u0651\u064e\u0627\u0633',
    kota: 'Thaif',
    jarakKm: 90,
    jamKunjungan: 'Buka saat waktu shalat',
    ringkas: 'Masjid bersejarah di Thaif, dekat makam sahabat & ahli tafsir Abdullah bin Abbas \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647.',
    gambar: '/lokasi/masjid-abdullah-bin-abbas.jpg',
    koordinat: { lat: 21.2701, lng: 40.4082 },
    sejarah:
      'Masjid Abdullah bin Abbas terletak di pusat kota lama Thaif, sekitar 90 km tenggara Makkah di dataran tinggi yang sejuk. Masjid ini dinamai sesuai nama Abdullah bin Abbas \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 \u2014 sepupu Rasulullah \ufdfa dan ahli tafsir Al-Qur\u2019an terbesar di kalangan sahabat \u2014 yang wafat dan dimakamkan di Thaif pada tahun 68 H. Masjid awal diperkirakan dibangun sekitar tahun 630 M, lalu berkali-kali direnovasi pada era Abbasiyah, Utsmaniyah, hingga era Saudi modern.',
    sejarahSeksi: [
      {
        judul: 'Abdullah bin Abbas \u2014 Sang Penafsir Al-Qur\u2019an',
        isi: 'Abdullah bin Abbas \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 dijuluki \u201cHabrul Ummah\u201d (ulama umat) dan \u201cBahrul Ulum\u201d (lautan ilmu). Sejak kecil ia didoakan Rasulullah \ufdfa: \u201cYa Allah, pahamkanlah ia dalam agama dan ajarkanlah ia takwil (tafsir).\u201d Ia meriwayatkan 1.660 hadis dan menjadi rujukan utama dalam tafsir Al-Qur\u2019an. Beliau wafat di Thaif pada 68 H dan dimakamkan dekat masjid ini.',
      },
      {
        judul: 'Sejarah Dakwah Nabi \ufdfa ke Thaif',
        isi: 'Thaif memiliki tempat khusus dalam sirah: ke kota inilah Rasulullah \ufdfa pergi berdakwah setelah tahun kesedihan (wafatnya Khadijah & Abu Thalib). Beliau ditolak keras dan dilempari batu oleh penduduk Thaif hingga terluka. Justru di saat tersulit itulah turun teladan kesabaran beliau \u2014 menolak tawaran malaikat untuk membinasakan penduduk Thaif, dan malah mendoakan agar keturunan mereka kelak beriman.',
      },
      {
        judul: 'Arsitektur & Renovasi',
        isi: 'Masjid ini memadukan elemen Hijazi tradisional dengan pengaruh Utsmaniyah \u2014 kubah, menara, dan kaligrafi. Bentuknya kini adalah hasil renovasi berlapis dari masa ke masa. Di kompleksnya terdapat makam Abdullah bin Abbas, Muhammad bin Ali (bin Hanafiyah), serta sejumlah syuhada.',
      },
    ],
    tokoh: [
      { nama: 'Abdullah bin Abbas \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Ahli tafsir Al-Qur\u2019an, dimakamkan di sini' },
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Berdakwah ke Thaif & memberi teladan kesabaran' },
    ],
    keutamaan: [
      'Mengenang Abdullah bin Abbas, ahli tafsir terbesar di kalangan sahabat.',
      'Mengingatkan teladan kesabaran Nabi \ufdfa saat ditolak penduduk Thaif.',
      'Salah satu masjid tertua & monumen Islam penting di Thaif.',
    ],
    dalil: [
      {
        sumber: 'HR. Bukhari',
        teks: 'Rasulullah \ufdfa memeluk Ibnu Abbas dan berdoa: \u201cYa Allah, ajarkanlah ia hikmah dan takwil Al-Kitab.\u201d',
      },
    ],
    adab: [
      'Tempat ziarah untuk mengenang sejarah & mengambil pelajaran, bukan ritual khusus.',
      'Jaga adab di area makam \u2014 tidak meminta berkah pada kuburan.',
      'Berpakaian sopan & jaga ketenangan masjid.',
    ],
    catatan: 'Thaif sering jadi tujuan ziarah tambahan saat umrah karena udaranya sejuk. Banyak travel memasukkan Thaif sebagai paket city tour opsional dari Makkah.',
  },
  {
    id: 'masjid-addas',
    tipe: 'sejarah',
    nama: 'Masjid Addas',
    namaArab: '\u0645\u064e\u0633\u0652\u062c\u0650\u062f \u0639\u064e\u062f\u0651\u064e\u0627\u0633',
    kota: 'Thaif',
    jarakKm: 90,
    jamKunjungan: 'Buka saat waktu shalat',
    ringkas: 'Tempat Addas, pemuda Nasrani, memeluk Islam setelah memberi anggur kepada Nabi \ufdfa saat beliau terluka di Thaif.',
    gambar: '/lokasi/masjid-addas.jpg',
    koordinat: { lat: 21.2510, lng: 40.3920 },
    sejarah:
      'Masjid Addas terletak sekitar 2,5 km barat daya Masjid Abdullah bin Abbas, di kawasan kebun lama Thaif. Masjid ini mengenang peristiwa menyentuh: setelah Rasulullah \ufdfa ditolak dan dilempari batu oleh penduduk Thaif, beliau berteduh di sebuah kebun milik Utbah dan Syaibah bin Rabi\u2019ah. Keduanya menyuruh budak mereka, Addas \u2014 seorang pemuda Nasrani dari Nineveh \u2014 mengantarkan setangkai anggur untuk Nabi \ufdfa.',
    sejarahSeksi: [
      {
        judul: 'Anggur & Kalimat \u201cBismillah\u201d',
        isi: 'Saat Addas menyodorkan anggur, Rasulullah \ufdfa mengucap \u201cBismillah\u201d sebelum memakannya. Addas terkejut \u2014 kalimat itu tak pernah ia dengar dari penduduk Thaif. Ketika Nabi \ufdfa bertanya asalnya dan Addas menyebut Nineveh, beliau menyebut Nineveh sebagai negeri Nabi Yunus bin Matta. Addas takjub bagaimana seorang di tengah gurun Arab mengenal Nabi Yunus, lalu ia pun masuk Islam.',
      },
      {
        judul: 'Teladan di Titik Terberat',
        isi: 'Peristiwa Addas terjadi di hari paling berat dalam dakwah Nabi \ufdfa \u2014 ditolak, terluka, dan kesepian. Namun justru di sanalah Allah menghadirkan secercah cahaya: satu jiwa yang beriman. Kisah ini mengajarkan bahwa hidayah datang dari Allah, dan kebaikan kecil (setangkai anggur) bisa menjadi pintu keimanan.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Berteduh & menerima anggur di tempat ini' },
      { nama: 'Addas \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Pemuda Nasrani yang memeluk Islam di sini' },
    ],
    keutamaan: [
      'Mengenang masuk Islamnya Addas \u2014 buah kesabaran Nabi \ufdfa di Thaif.',
      'Mengajarkan bahwa hidayah adalah milik Allah semata.',
      'Teladan bahwa kebaikan kecil bisa membuka pintu keimanan.',
    ],
    dalil: [
      {
        sumber: 'Sirah Ibnu Hisyam',
        teks: 'Kisah Addas memberikan anggur kepada Rasulullah \ufdfa di Thaif dan keislamannya diriwayatkan dalam kitab-kitab sirah.',
      },
    ],
    adab: [
      'Tempat untuk merenungkan sejarah dakwah & kesabaran Nabi \ufdfa.',
      'Jaga ketenangan & kebersihan lokasi.',
      'Ambil pelajaran tentang hidayah, bukan ritual khusus.',
    ],
    catatan: 'Lokasi persis masjid kadang berbeda menurut sumber. Kunjungan untuk mengenang sejarah, bukan ibadah khusus.',
  },

  // ===================================================== BADR
  {
    id: 'situs-perang-badr',
    tipe: 'sejarah',
    nama: 'Situs Perang Badr',
    namaArab: '\u0645\u064e\u0648\u0652\u0642\u0650\u0639\u064e\u0629 \u0628\u064e\u062f\u0652\u0631',
    kota: 'Badr',
    jarakKm: 130,
    jamKunjungan: 'Area terbuka, dapat dikunjungi',
    ringkas: 'Medan Perang Badr \u2014 kemenangan besar pertama umat Islam atas kaum Quraisy pada 17 Ramadhan 2 H.',
    gambar: '/lokasi/situs-perang-badr.jpg',
    koordinat: { lat: 23.7333, lng: 38.7667 },
    sejarah:
      'Situs Perang Badr terletak di kota Badr, Provinsi Madinah, sekitar 130 km barat daya Madinah. Di sinilah berlangsung Perang Badr pada 17 Ramadhan 2 H (624 M) \u2014 pertempuran besar pertama umat Islam. Pasukan muslimin yang hanya berjumlah 313 orang dengan persenjataan seadanya menghadapi pasukan Quraisy yang berjumlah sekitar 1.000 orang bersenjata lengkap. Dengan pertolongan Allah, kaum muslimin meraih kemenangan gemilang.',
    sejarahSeksi: [
      {
        judul: 'Pertempuran yang Menentukan',
        isi: 'Hanya 14 sahabat yang gugur sebagai syuhada, sementara pihak Quraisy kehilangan 70 orang terbaiknya dan 70 lainnya ditawan. Kemenangan ini menjadi titik balik: umat Islam Madinah bangkit sebagai kekuatan yang diperhitungkan, dan keimanan kaum muslimin terhadap pertolongan Allah semakin kokoh.',
      },
      {
        judul: 'Pertolongan dari Langit',
        isi: 'Al-Qur\u2019an mengabadikan bahwa Allah menurunkan bantuan malaikat dalam Perang Badr. Para pejuang Badr (ahlu Badr) mendapat kedudukan istimewa \u2014 Rasulullah \ufdfa menyebut mereka sebagai sebaik-baik kaum muslimin, dan dalam satu riwayat disebutkan bahwa Allah telah mengampuni mereka.',
      },
      {
        judul: 'Landmark di Situs Badr',
        isi: 'Kawasan Badr mencakup beberapa landmark: medan pertempuran, Masjid Al-Arish (tempat Nabi \ufdfa berkemah & berdoa sebelum perang), makam para syuhada Badr, serta Jabal Malaikah (Gunung Malaikat). Sebagian area kini berupa lahan terbuka dengan papan informasi sejarah.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Memimpin pasukan muslimin dalam Perang Badr' },
      { nama: 'Hamzah bin Abdul Muthalib \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Pahlawan dalam duel pembuka Badr' },
      { nama: 'Umair bin al-Humam \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Syahid pertama dalam Perang Badr' },
    ],
    keutamaan: [
      'Kemenangan besar pertama umat Islam \u2014 disebut langsung dalam Al-Qur\u2019an.',
      'Bukti pertolongan Allah kepada orang beriman meski jumlah sedikit.',
      'Para pejuang Badr mendapat kedudukan istimewa di sisi Allah & Rasul-Nya.',
    ],
    dalil: [
      {
        sumber: 'QS. Ali \u2018Imran: 123',
        teks: '\u201cSungguh, Allah telah menolong kamu dalam perang Badr, padahal kamu dalam keadaan lemah. Maka bertakwalah kepada Allah agar kamu mensyukuri-Nya.\u201d',
      },
    ],
    adab: [
      'Tempat untuk mengambil pelajaran sejarah & merenungkan pertolongan Allah.',
      'Hormati area makam syuhada \u2014 tidak meminta berkah pada kuburan.',
      'Jaga ketertiban & kebersihan di area situs.',
    ],
    catatan: 'Badr berjarak ~130 km dari Madinah. Beberapa travel menawarkan ziarah Badr sebagai perjalanan tambahan dari Madinah.',
  },
  {
    id: 'makam-syuhada-badr',
    tipe: 'sejarah',
    nama: 'Makam Syuhada Badr',
    namaArab: '\u0645\u064e\u0642\u0652\u0628\u064e\u0631\u064e\u0629 \u0634\u064f\u0647\u064e\u062f\u064e\u0627\u0621 \u0628\u064e\u062f\u0652\u0631',
    kota: 'Badr',
    jarakKm: 130,
    jamKunjungan: 'Area tertutup, dilihat dari luar',
    ringkas: 'Pemakaman 14 sahabat yang gugur sebagai syuhada dalam Perang Badr.',
    gambar: '/lokasi/makam-syuhada-badr.jpg',
    koordinat: { lat: 23.7314, lng: 38.7611 },
    sejarah:
      'Makam Syuhada Badr terletak sekitar 550 meter sebelah barat medan Perang Badr. Di sinilah 14 sahabat yang gugur sebagai syuhada dalam Perang Badr dimakamkan. Meskipun jumlah syuhada awalnya 14 orang, area pemakaman ini meluas selama berabad-abad. Kini lokasinya dibatasi pagar tembok dan tidak dibuka untuk umum \u2014 peziarah hanya dapat melihat dari luar dan mendoakan para syuhada.',
    sejarahSeksi: [
      {
        judul: 'Para Syuhada Badr',
        isi: 'Syahid pertama dalam Perang Badr adalah Umair bin al-Humam \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647. Di antara para syuhada juga ada Umair bin Abi Waqqash \u2014 salah satu peserta termuda yang sempat khawatir tidak diizinkan ikut karena usianya baru 16 tahun, namun akhirnya gugur sebagai syahid. Mereka adalah generasi terbaik yang Allah abadikan keutamaannya.',
      },
      {
        judul: 'Kedudukan Mulia Ahlu Badr',
        isi: 'Rasulullah \ufdfa memberikan kabar gembira tentang ahlu Badr. Dalam satu riwayat, Jibril \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 bertanya kepada Nabi \ufdfa tentang bagaimana beliau memandang para pejuang Badr, dan Nabi \ufdfa menjawab: \u201cSebaik-baik kaum muslimin.\u201d Keutamaan ini menjadikan makam mereka tempat yang dihormati umat Islam.',
      },
    ],
    tokoh: [
      { nama: 'Umair bin al-Humam \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Syahid pertama Perang Badr' },
      { nama: 'Umair bin Abi Waqqash \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647', peran: 'Syahid termuda Perang Badr' },
    ],
    keutamaan: [
      'Tempat peristirahatan generasi terbaik \u2014 para pejuang Badr.',
      'Mengenang pengorbanan para syuhada dalam membela Islam.',
      'Ahlu Badr mendapat kedudukan paling mulia di kalangan sahabat.',
    ],
    dalil: [
      {
        sumber: 'HR. Bukhari',
        teks: 'Rasulullah \ufdfa bersabda tentang ahlu Badr bahwa Allah telah melihat mereka dan berfirman: \u201cBerbuatlah sekehendak kalian, sungguh Aku telah mengampuni kalian.\u201d',
      },
    ],
    adab: [
      'Mendoakan para syuhada dari luar pagar \u2014 area tidak dibuka untuk umum.',
      'Tidak meminta berkah atau berdoa kepada penghuni kubur.',
      'Mengucap salam kepada ahli kubur sesuai sunnah & mendoakan rahmat.',
    ],
    catatan: 'Makam ini tidak dibuka untuk umum dan hanya bisa dilihat dari luar. Ziarah untuk mengenang & mendoakan, sesuai adab ziarah kubur yang syar\u2019i.',
    syuhadaPengantar:
      'Dalam Perang Badr (17 Ramadhan 2 H / 624 M), 14 sahabat gugur sebagai syuhada — 6 dari kaum Muhajirin dan 8 dari kaum Anshar (2 dari kabilah Aus, 6 dari Khazraj). Berikut nama-nama mereka menurut riwayat para ulama sirah seperti Ibnu Hisyam, Ibnu Ishaq, dan Ibnu Katsir.',
    syuhada: [
      { nama: 'Ubaidah bin Al-Harits', golongan: 'Muhajirin', konteks: 'Sepupu Rasulullah ﷺ. Terluka dalam duel pembuka melawan pembesar Quraisy, lalu wafat dalam perjalanan pulang di Ash-Shafra\'. Termasuk yang paling awal masuk Islam.' },
      { nama: 'Umair bin Abi Waqqash', golongan: 'Muhajirin', konteks: 'Adik Sa\'ad bin Abi Waqqash. Masih sangat muda; sempat dilarang ikut karena usianya, namun diizinkan lalu gugur sebagai syahid.' },
      { nama: 'Dzusy Syimalain (Umair bin Abdu Amr)', golongan: 'Muhajirin', konteks: 'Sekutu Bani Zuhrah dari kabilah Khuza\'ah. Dijuluki "Dzusy Syimalain" (pemilik dua tangan kiri) karena cekatan memakai kedua tangan.' },
      { nama: 'Aqil bin Al-Bukair', golongan: 'Muhajirin', konteks: 'Sekutu Bani Adi bin Ka\'ab. Termasuk generasi awal pemeluk Islam yang berhijrah.' },
      { nama: 'Mihja\' bin Shalih', golongan: 'Muhajirin', konteks: 'Mantan budak (maula) Umar bin Khattab. Disebutkan sebagai muslim pertama yang gugur dalam Perang Badr.' },
      { nama: 'Shafwan bin Baidha\'', golongan: 'Muhajirin', konteks: 'Dari Bani Al-Harits bin Fihr. Salah satu sahabat Muhajirin yang gugur dalam pertempuran.' },
      { nama: 'Sa\'ad bin Khaitsamah', golongan: 'Anshar (Aus)', konteks: 'Dari Bani Amr bin Auf. Salah satu naqib (pemimpin) kaumnya. Memilih berangkat berperang meski ditawari tetap tinggal menjaga keluarga.' },
      { nama: 'Mubasysyir bin Abdul Mundzir', golongan: 'Anshar (Aus)', konteks: 'Dari Bani Amr bin Auf. Gugur sebagai syahid dalam barisan kaum Anshar.' },
      { nama: 'Yazid bin Al-Harits (Ibnu Fushum)', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Al-Harits bin Al-Khazraj. Dikenal dengan sapaan Ibnu Fushum (dinisbahkan ke ibunya).' },
      { nama: 'Umair bin Al-Humam', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Salimah. Masyhur dengan kisahnya melempar kurma di tangannya saat mendengar janji surga, lalu maju bertempur hingga syahid.' },
      { nama: 'Rafi\' bin Al-Mu\'alla', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Habib bin Abdu Haritsah. Gugur sebagai syahid di medan Badr.' },
      { nama: 'Haritsah bin Suraqah', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani An-Najjar. Masih muda; terkenal lewat hadis tentang ibunya yang bertanya pada Nabi ﷺ, lalu beliau mengabarkan Haritsah berada di Firdaus tertinggi.' },
      { nama: 'Auf bin Al-Harits', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Ghanm bin Malik bin An-Najjar. Putra Afra\'; gugur bersama saudaranya Muawwidz.' },
      { nama: 'Muawwidz bin Al-Harits', golongan: 'Anshar (Khazraj)', konteks: 'Saudara Auf, sama-sama putra Afra\'. Dua bersaudara ini termasuk yang melukai Abu Jahal dalam pertempuran.' },
    ],
  },
  // ===================================================== WADI JINN
  {
    id: 'jabal-magnet',
    tipe: 'sejarah',
    nama: 'Jabal Magnet (Wadi Jinn)',
    namaArab: '\u0648\u064e\u0627\u062f\u0650\u064a \u0627\u0644\u0652\u062c\u0650\u0646\u0651',
    kota: 'Wadi Jinn',
    jarakKm: 60,
    jamKunjungan: 'Area terbuka 24 jam (terbaik pagi/sore)',
    ringkas: 'Fenomena \u201cbukit magnet\u201d di Wadi Jinn \u2014 kendaraan terasa bergerak menanjak sendiri. Spot wisata alam populer dekat Madinah.',
    gambar: '/lokasi/jabal-magnet.jpg',
    koordinat: { lat: 24.7225, lng: 39.4431 },
    sejarah:
      'Jabal Magnet, dikenal juga sebagai Wadi Jinn atau Wadi Al-Baida, terletak sekitar 60 km barat laut Kota Madinah. Tempat ini terkenal dengan fenomena unik: kendaraan yang diposisikan netral (tanpa gas) terasa bergerak dan justru menanjak dengan sendirinya, seolah ada gaya magnet yang menarik. Kawasan ini menjadi tujuan wisata alam populer bagi keluarga Saudi maupun jamaah umrah yang punya waktu luang di Madinah.',
    sejarahSeksi: [
      {
        judul: 'Fenomena \u201cBukit Magnet\u201d',
        isi: 'Di beberapa ruas jalan Wadi Jinn, mobil atau bus yang dimatikan gasnya akan terasa melaju sendiri, bahkan bisa mencapai kecepatan tinggi, seolah ditarik gaya tak terlihat. Air pun terlihat \u201cmengalir ke atas\u201d. Karena keunikan inilah tempat ini dijuluki Jabal Magnet (Bukit Magnet).',
      },
      {
        judul: 'Penjelasan Ilmiah: Ilusi Optik',
        isi: 'Secara ilmiah, fenomena ini adalah ilusi optik gravitasi (gravity hill). Jalan yang tampak menanjak sebenarnya menurun landai. Karena dikelilingi pegunungan tanpa garis horizon yang jelas, mata & otak tertipu menilai kemiringan jalan. Studi pengukuran membuktikan kemiringan jalan turun bertahap menuju Madinah \u2014 jadi \u201cmagnet\u201d itu sebenarnya gravitasi biasa yang bekerja pada jalan menurun.',
      },
      {
        judul: 'Wadi Jinn & Penamaan',
        isi: 'Nama \u201cWadi Jinn\u201d (Lembah Jin) muncul dari cerita rakyat setempat yang mengaitkan fenomena ini dengan makhluk halus. Namun ini hanya legenda \u2014 tidak ada dasar syar\u2019i yang mengaitkan tempat ini dengan peristiwa keagamaan tertentu. Kawasan ini dahulu sempat menjadi area danau/sumber air, dan kini jadi tempat rekreasi keluarga, terutama akhir pekan.',
      },
    ],
    tokoh: [],
    keutamaan: [
      'Tujuan wisata alam yang unik & menyegarkan dekat Madinah.',
      'Sarana edukasi tentang fenomena ilusi optik gravitasi.',
      'Pemandangan lembah & pegunungan yang indah, cocok untuk rehat.',
    ],
    dalil: [],
    adab: [
      'Ini tempat wisata alam, BUKAN situs ibadah atau ziarah keagamaan.',
      'Tidak ada amalan/ritual khusus di sini \u2014 kunjungan murni rekreasi & edukasi.',
      'Hindari mengaitkan fenomena dengan hal mistis; pahami penjelasan ilmiahnya.',
      'Jaga kebersihan area & keselamatan saat berkendara di jalur fenomena.',
    ],
    catatan: 'Jabal Magnet sering jadi paket wisata tambahan dari Madinah (~60 km, 30-45 menit berkendara). Cocok untuk mengisi waktu luang, tapi ingatkan jamaah bahwa ini destinasi wisata alam \u2014 bukan bagian dari rangkaian ibadah umrah.',
  },
  // ===================================================== TEMPAT HAJI
  {
    id: 'padang-arafah',
    tipe: 'sejarah',
    nama: 'Padang Arafah',
    namaArab: '\u0639\u064e\u0631\u064e\u0641\u064e\u0627\u062a',
    kota: 'Arafah',
    jarakKm: 20,
    jamKunjungan: 'Area terbuka (puncak ibadah 9 Dzulhijjah)',
    ringkas: '\u201cHaji itu Arafah\u201d \u2014 padang luas tempat wukuf, inti ibadah haji.',
    gambar: '/lokasi/padang-arafah.jpg',
    koordinat: { lat: 21.3547, lng: 39.9843 },
    sejarah:
      'Padang Arafah adalah kawasan padang luas sekitar 20 km timur Makkah. Wukuf di Arafah pada 9 Dzulhijjah adalah rukun haji yang tidak tergantikan \u2014 siapa yang tidak sempat wukuf, hajinya tidak sah. Di kawasan Arafah, Rasulullah \ufdfa menyampaikan Khutbah Wada\u2019 (Haji Perpisahan) kepada lebih dari 100.000 sahabat.',
    sejarahSeksi: [
      {
        judul: 'Wukuf \u2014 Rukun Haji Terbesar',
        isi: 'Wukuf di Arafah adalah rukun haji yang tidak tergantikan. Rasulullah \ufdfa bersabda: \u201cHaji itu Arafah.\u201d Siapa yang tidak wukuf di Arafah pada waktunya, hajinya tidak sah. Di sinilah jamaah memperbanyak doa, dzikir, istighfar, dan taubat \u2014 hari ketika Allah membanggakan hamba-hamba-Nya di hadapan para malaikat.',
      },
      {
        judul: 'Khutbah Wada\u2019 (Haji Perpisahan)',
        isi: 'Di kawasan Arafah, dari Wadi Uranah dekat Masjid Namira, Rasulullah \ufdfa menyampaikan Khutbah Wada\u2019 di hadapan lebih dari 100.000 sahabat. Khutbah ini berisi pesan agung tentang persamaan derajat manusia, hak-hak sesama, larangan riba & balas dendam jahiliah, serta penyempurnaan agama Islam.',
      },
      {
        judul: 'Tempat Pertemuan Adam & Hawa',
        isi: 'Sebagian riwayat menyebut Arafah sebagai tempat bertemunya kembali Nabi Adam dan Hawa setelah turun ke bumi. Dari sinilah pula nama \u201cArafah\u201d (mengenal) dikaitkan. Jabal Rahmah, bukit di tengah padang ini, menjadi penanda peristiwa tersebut.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menyampaikan Khutbah Wada\u2019 di Arafah' },
      { nama: 'Nabi Adam & Hawa', peran: 'Diyakini bertemu kembali di Arafah (sebagian riwayat)' },
    ],
    keutamaan: [
      'Wukuf di Arafah adalah rukun haji terbesar \u2014 \u201cHaji itu Arafah\u201d.',
      'Hari Arafah adalah hari pengampunan dosa & pembebasan dari neraka.',
      'Doa di hari Arafah adalah doa terbaik.',
    ],
    dalil: [
      {
        sumber: 'HR. Tirmidzi & Abu Dawud',
        teks: 'Rasulullah \ufdfa bersabda: \u201cHaji itu Arafah. Barangsiapa datang (wukuf) pada malam itu sebelum terbit fajar, maka sungguh ia telah mendapati haji.\u201d',
      },
    ],
    adab: [
      'Bagi jamaah haji: wukuf adalah rukun \u2014 jangan tinggalkan area Arafah sebelum maghrib.',
      'Perbanyak doa, dzikir, istighfar & taubat \u2014 terutama saat hari Arafah.',
      'Bagi yang tidak berhaji: disunnahkan puasa Arafah (9 Dzulhijjah).',
    ],
    catatan: 'Di luar musim haji, kawasan Arafah dapat dikunjungi sebagai ziarah. Padang Arafah hanya \u201chidup\u201d penuh saat puncak haji 9 Dzulhijjah.',
  },
  {
    id: 'mina',
    tipe: 'sejarah',
    nama: 'Mina',
    namaArab: '\u0645\u0650\u0646\u0649',
    kota: 'Mina',
    jarakKm: 8,
    jamKunjungan: 'Area terbuka (aktif saat musim haji)',
    ringkas: '\u201cKota Tenda\u201d \u2014 tempat jamaah haji bermalam (mabit) & melempar jumrah.',
    gambar: '/lokasi/mina.jpg',
    koordinat: { lat: 21.4133, lng: 39.8933 },
    sejarah:
      'Mina adalah lembah sekitar 8 km timur Makkah, dijuluki \u201cKota Tenda\u201d karena dipenuhi lebih dari 100.000 tenda permanen untuk menampung jutaan jamaah haji. Di Mina jamaah bermalam (mabit) pada malam tanggal 8, 11, 12, dan 13 Dzulhijjah, serta melaksanakan lempar jumrah (jamarat) di tiga tugu yang melambangkan godaan setan.',
    sejarahSeksi: [
      {
        judul: 'Mabit & Lempar Jumrah',
        isi: 'Di Mina terdapat tiga jamarat: Jamratul Ula (terkecil), Jamratul Wustha (tengah), dan Jamratul Aqabah (terbesar). Jamaah melempar batu kerikil ke tugu-tugu ini sebagai simbol perlawanan terhadap godaan setan, mengikuti jejak Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 yang melempar setan saat menggoda beliau.',
      },
      {
        judul: 'Kisah Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645',
        isi: 'Di lembah Mina inilah Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 diperintahkan Allah dalam mimpi untuk menyembelih putranya, Ismail. Saat menjalankan perintah itu, setan berusaha menggodanya, lalu Ibrahim melempari setan dengan batu. Peristiwa ini diabadikan dalam ritual lempar jumrah.',
      },
      {
        judul: 'Baiat Aqabah',
        isi: 'Mina juga diyakini sebagai lokasi Baiat Aqabah \u2014 perjanjian kaum Anshar dari Madinah untuk membela & menerima dakwah Rasulullah \ufdfa. Peristiwa ini menjadi titik awal hijrah dan berdirinya masyarakat Islam di Madinah.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645', peran: 'Melempar setan di Mina \u2014 asal ritual jumrah' },
      { nama: 'Kaum Anshar', peran: 'Membaiat Rasulullah \ufdfa di Aqabah, Mina' },
    ],
    keutamaan: [
      'Tempat pelaksanaan lempar jumrah & mabit dalam rangkaian haji.',
      'Mengenang ketaatan Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 atas perintah Allah.',
      'Lokasi Baiat Aqabah \u2014 cikal bakal hijrah & masyarakat Islam.',
    ],
    dalil: [
      {
        sumber: 'QS. Ash-Shaffat: 102',
        teks: 'Kisah Nabi Ibrahim yang diperintah menyembelih putranya, lalu Allah menggantinya dengan sembelihan besar \u2014 peristiwa yang terjadi di lembah Mina.',
      },
    ],
    adab: [
      'Bagi jamaah haji: laksanakan mabit & lempar jumrah sesuai waktu yang ditentukan.',
      'Jaga ketertiban saat melempar jumrah \u2014 keselamatan diutamakan.',
      'Perbanyak takbir & dzikir selama di Mina.',
    ],
    catatan: 'Mina aktif penuh hanya saat musim haji (8\u201313 Dzulhijjah). Di luar itu berupa kawasan tenda kosong yang dapat dilewati saat ziarah.',
  },
  {
    id: 'muzdalifah',
    tipe: 'sejarah',
    nama: 'Muzdalifah',
    namaArab: '\u0645\u064f\u0632\u0652\u062f\u064e\u0644\u0650\u0641\u064e\u0629',
    kota: 'Muzdalifah',
    jarakKm: 12,
    jamKunjungan: 'Area terbuka (aktif saat musim haji)',
    ringkas: 'Tempat jamaah haji bermalam setelah Arafah & mengumpulkan kerikil untuk jumrah.',
    gambar: '/lokasi/muzdalifah.jpg',
    koordinat: { lat: 21.3925, lng: 39.9378 },
    sejarah:
      'Muzdalifah adalah kawasan terbuka antara Arafah dan Mina, sekitar 12 km tenggara Makkah. Setelah wukuf di Arafah, pada malam 10 Dzulhijjah jamaah haji bergerak ke Muzdalifah untuk bermalam (mabit), menjamak shalat Maghrib & Isya, lalu mengumpulkan batu kerikil yang akan dipakai untuk melempar jumrah di Mina.',
    sejarahSeksi: [
      {
        judul: 'Mabit di Muzdalifah',
        isi: 'Mabit (bermalam) di Muzdalifah pada malam 10 Dzulhijjah adalah bagian dari rangkaian wajib haji. Jamaah menjamak-qashar shalat Maghrib dan Isya, lalu beristirahat di bawah langit terbuka hingga menjelang fajar, sebelum bergerak ke Mina.',
      },
      {
        judul: 'Mengumpulkan Kerikil Jumrah',
        isi: 'Di Muzdalifah jamaah mengumpulkan batu-batu kerikil kecil (biasanya 49 atau 70 butir) yang akan dipakai untuk melempar jumrah di Mina selama hari-hari Tasyrik. Kebiasaan ini mengikuti sunnah dalam pelaksanaan haji.',
      },
      {
        judul: 'Al-Masy\u2019aril Haram',
        isi: 'Muzdalifah disebut dalam Al-Qur\u2019an dengan nama \u201cAl-Masy\u2019aril Haram\u201d. Allah memerintahkan jamaah untuk berdzikir kepada-Nya di tempat ini, menjadikan Muzdalifah sebagai tempat perenungan & ketundukan di tengah rangkaian haji.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Mencontohkan mabit & menjamak shalat di Muzdalifah' },
    ],
    keutamaan: [
      'Tempat mabit & menjamak shalat dalam rangkaian wajib haji.',
      'Disebut dalam Al-Qur\u2019an sebagai \u201cAl-Masy\u2019aril Haram\u201d.',
      'Tempat mengumpulkan kerikil untuk lempar jumrah.',
    ],
    dalil: [
      {
        sumber: 'QS. Al-Baqarah: 198',
        teks: '\u201c\u2026Maka apabila kamu bertolak dari Arafah, berzikirlah kepada Allah di Masy\u2019aril Haram (Muzdalifah)\u2026\u201d',
      },
    ],
    adab: [
      'Bagi jamaah haji: laksanakan mabit & jamak shalat sesuai tuntunan.',
      'Manfaatkan waktu untuk dzikir & istirahat sebelum ke Mina.',
      'Kumpulkan kerikil jumrah secukupnya.',
    ],
    catatan: 'Muzdalifah aktif saat musim haji (malam 10 Dzulhijjah). Di luar itu berupa area terbuka yang dilewati saat perjalanan ziarah.',
  },
  {
    id: 'masjid-namira',
    tipe: 'masjid',
    nama: 'Masjid Namira',
    namaArab: '\u0645\u064e\u0633\u0652\u062c\u0650\u062f \u0646\u064e\u0645\u0650\u0631\u064e\u0629',
    kota: 'Arafah',
    jarakKm: 18,
    jamKunjungan: 'Aktif saat hari Arafah (9 Dzulhijjah)',
    ringkas: 'Masjid besar di tepi barat Arafah, tempat khutbah & shalat jamak di hari Arafah.',
    gambar: '/lokasi/masjid-namira.jpg',
    koordinat: { lat: 21.3547, lng: 39.9728 },
    sejarah:
      'Masjid Namira terletak di tepi barat Padang Arafah, sekitar 18 km dari Masjidil Haram. Masjid ini dibangun di kawasan tempat Rasulullah \ufdfa singgah sebelum menyampaikan Khutbah Wada\u2019. Di sinilah pada hari Arafah (9 Dzulhijjah) imam menyampaikan khutbah haji dan memimpin shalat Dzuhur & Ashar yang dijamak-qashar. Kini Masjid Namira menjadi salah satu masjid terbesar di dunia.',
    sejarahSeksi: [
      {
        judul: 'Tempat Khutbah Wada\u2019',
        isi: 'Masjid Namira berdiri di dekat Wadi Uranah, tempat Rasulullah \ufdfa menyampaikan Khutbah Wada\u2019 pada Haji Perpisahan. Karena itu, di sinilah setiap tahun khutbah Arafah disampaikan kepada jutaan jamaah haji dan disiarkan ke seluruh dunia.',
      },
      {
        judul: 'Batas Arafah & Wadi Uranah',
        isi: 'Sebagian struktur masjid berada di dalam batas Arafah dan sebagian di Wadi Uranah (yang BUKAN bagian Arafah). Di dalam masjid terdapat papan penanda batas, penting bagi jamaah karena wukuf harus dilakukan di dalam batas Arafah yang sah.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Menyampaikan Khutbah Wada\u2019 & menjamak shalat di sini' },
    ],
    keutamaan: [
      'Tempat khutbah Arafah & shalat jamak di hari Arafah.',
      'Berdiri di lokasi bersejarah Khutbah Wada\u2019.',
      'Salah satu masjid terbesar di dunia (kapasitas ratusan ribu jamaah).',
    ],
    dalil: [
      {
        sumber: 'HR. Muslim',
        teks: 'Dalam hadis panjang tentang Haji Wada\u2019, disebutkan bahwa Rasulullah \ufdfa singgah di Namira lalu menyampaikan khutbah dan menjamak shalat di hari Arafah.',
      },
    ],
    adab: [
      'Tempat ibadah aktif terutama saat hari Arafah \u2014 jaga kekhusyukan.',
      'Perhatikan papan penanda batas Arafah jika melaksanakan wukuf.',
      'Di luar musim haji, masjid dapat dilihat dari luar.',
    ],
    catatan: 'Masjid Namira terutama berfungsi penuh di hari Arafah. Sebagian besar waktu lain dalam keadaan tutup.',
  },
  {
    id: 'masjid-khayf',
    tipe: 'masjid',
    nama: 'Masjid Al-Khayf',
    namaArab: '\u0645\u064e\u0633\u0652\u062c\u0650\u062f \u0627\u0644\u0652\u062e\u064e\u064a\u0652\u0641',
    kota: 'Mina',
    jarakKm: 8,
    jamKunjungan: 'Aktif saat musim haji',
    ringkas: 'Masjid bersejarah di Mina, diriwayatkan 70 nabi pernah shalat di tempat ini.',
    gambar: '/lokasi/masjid-khayf.jpg',
    koordinat: { lat: 21.4108, lng: 39.8867 },
    sejarah:
      'Masjid Al-Khayf terletak di tengah lembah Mina, dekat Jamratul Ula (jumrah terkecil). Masjid ini memiliki keutamaan istimewa: diriwayatkan bahwa 70 nabi pernah shalat di tempat ini. Pada musim haji, masjid ini menjadi tempat shalat jamaah yang sedang mabit di Mina.',
    sejarahSeksi: [
      {
        judul: 'Tempat Shalat Para Nabi',
        isi: 'Dalam sebuah riwayat disebutkan bahwa 70 nabi pernah melaksanakan shalat di lokasi Masjid Al-Khayf. Ini menjadikan masjid ini salah satu tempat bersejarah yang istimewa di Mina, menghubungkan jamaah dengan jejak para nabi terdahulu.',
      },
      {
        judul: 'Lokasi di Lembah Mina',
        isi: 'Masjid Al-Khayf berada di kaki gunung di sisi selatan lembah Mina, dekat jumrah terkecil. Kata \u201ckhayf\u201d merujuk pada tanah yang menurun dari gunung tetapi tidak sampai dataran \u2014 menggambarkan posisi geografis masjid ini.',
      },
    ],
    tokoh: [
      { nama: 'Para Nabi terdahulu', peran: 'Diriwayatkan 70 nabi shalat di tempat ini' },
      { nama: 'Nabi Muhammad \ufdfa', peran: 'Shalat di Masjid Al-Khayf saat haji' },
    ],
    keutamaan: [
      'Diriwayatkan 70 nabi pernah shalat di tempat ini.',
      'Masjid bersejarah utama di lembah Mina.',
      'Tempat shalat jamaah haji saat mabit di Mina.',
    ],
    dalil: [
      {
        sumber: 'HR. Thabrani',
        teks: 'Diriwayatkan bahwa tujuh puluh nabi telah melaksanakan shalat di Masjid Al-Khayf.',
      },
    ],
    adab: [
      'Tempat ibadah bersejarah \u2014 jaga kekhusyukan & adab masjid.',
      'Aktif terutama saat musim haji ketika jamaah mabit di Mina.',
      'Renungkan jejak para nabi yang pernah shalat di sini.',
    ],
    catatan: 'Masjid Al-Khayf berfungsi penuh saat musim haji. Di luar itu relatif sepi.',
  },
  {
    id: 'jamarat',
    tipe: 'sejarah',
    nama: 'Jamarat (Jembatan Jumrah)',
    namaArab: '\u0627\u0644\u0652\u062c\u064e\u0645\u064e\u0631\u064e\u0627\u062a',
    kota: 'Mina',
    jarakKm: 8,
    jamKunjungan: 'Aktif saat hari-hari Tasyrik',
    ringkas: 'Tiga tugu tempat melempar jumrah \u2014 simbol perlawanan terhadap godaan setan.',
    gambar: '/lokasi/jamarat.jpg',
    koordinat: { lat: 21.4222, lng: 39.8728 },
    sejarah:
      'Jamarat adalah tiga tugu (pilar) di lembah Mina tempat jamaah haji melaksanakan ritual lempar jumrah. Ketiganya adalah Jamratul Ula (terkecil), Jamratul Wustha (tengah), dan Jamratul Aqabah (terbesar). Kini ketiganya berada di Jembatan Jamarat \u2014 struktur bertingkat yang dibangun untuk menampung jutaan jamaah agar lebih aman dan teratur.',
    sejarahSeksi: [
      {
        judul: 'Simbol Perlawanan terhadap Setan',
        isi: 'Lempar jumrah mengenang peristiwa Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 yang digoda setan agar membatalkan perintah Allah untuk menyembelih Ismail. Ibrahim melempari setan dengan batu di tiga tempat. Ritual ini menjadi simbol keteguhan menolak godaan & ketaatan kepada Allah.',
      },
      {
        judul: 'Jembatan Jamarat Modern',
        isi: 'Setelah beberapa tragedi desak-desakan, pemerintah Saudi membangun Jembatan Jamarat bertingkat (selesai diperluas tahun 2005) yang mampu menampung hingga 300.000 jamaah per jam. Tugu jumrah kini berbentuk dinding panjang (bukan tugu bulat) agar lebih mudah dijangkau & mengurangi desakan.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645', peran: 'Melempar setan di tiga tempat \u2014 asal ritual jumrah' },
    ],
    keutamaan: [
      'Tempat pelaksanaan lempar jumrah dalam rangkaian wajib haji.',
      'Simbol keteguhan menolak godaan setan & ketaatan kepada Allah.',
      'Mengenang ketaatan Nabi Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645.',
    ],
    dalil: [
      {
        sumber: 'HR. Muslim',
        teks: 'Rasulullah \ufdfa melaksanakan lempar jumrah saat haji dan bersabda bahwa ritual ini ditegakkan untuk mengingat Allah.',
      },
    ],
    adab: [
      'Bagi jamaah haji: lempar jumrah sesuai waktu & jumlah yang ditentukan.',
      'Utamakan keselamatan \u2014 ikuti arahan petugas, hindari desak-desakan.',
      'Bertakbir saat melempar setiap kerikil.',
    ],
    catatan: 'Jamarat aktif saat hari-hari Tasyrik (10\u201313 Dzulhijjah). Jembatan bertingkat dirancang untuk keselamatan jutaan jamaah.',
  },
];

export function lokasiByTipe(tipe: Lokasi['tipe']): Lokasi[] {
  return daftarLokasi.filter((l) => l.tipe === tipe);
}

export function lokasiById(id: string): Lokasi | undefined {
  return daftarLokasi.find((l) => l.id === id);
}

export type KotaFilter = 'Makkah' | 'Madinah' | 'Haji' | 'Lainnya';

const KOTA_HAJI = ['Mina', 'Muzdalifah', 'Arafah'];

export function lokasiByKota(kota: KotaFilter): Lokasi[] {
  return daftarLokasi.filter((l) => {
    if (kota === 'Makkah') return l.kota === 'Makkah';
    if (kota === 'Madinah') return l.kota === 'Madinah';
    if (kota === 'Haji') return KOTA_HAJI.includes(l.kota);
    return l.kota !== 'Makkah' && l.kota !== 'Madinah' && !KOTA_HAJI.includes(l.kota);
  });
}

/** Bangun deep-link Google Maps dari koordinat (membuka app Maps di HP, web di desktop). */
export function gmapsUrl(l: Lokasi): string {
  const q = encodeURIComponent(`${l.nama} ${l.kota}`);
  return `https://www.google.com/maps/search/?api=1&query=${l.koordinat.lat},${l.koordinat.lng}(${q})`;
}
