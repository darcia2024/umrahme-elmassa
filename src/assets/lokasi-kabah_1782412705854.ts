// =============================================================
// LOKASI KA'BAH — sisipkan ke array daftarLokasi di lokasi.ts
// Letakkan di kelompok masjid/tempat (kota Makkah).
// Riset terverifikasi dari berbagai sumber. Escape unicode untuk Arab.
// =============================================================

  {
    id: 'kabah',
    tipe: 'sejarah',
    nama: 'Ka\u2019bah',
    namaArab: 'الكعبة المشرفة',
    kota: 'Makkah',
    jarakKm: 0,
    jamKunjungan: 'Pusat Masjidil Haram, 24 jam',
    ringkas: 'Baitullah, kiblat seluruh umat Islam dan pusat pelaksanaan tawaf di Masjidil Haram.',
    gambar: '',
    koordinat: { lat: 21.4225, lng: 39.8262 },
    sejarah:
      'Ka\u2019bah adalah bangunan berbentuk kubus di pusat Masjidil Haram, kiblat umat Islam sedunia, dan rumah ibadah pertama yang dibangun untuk manusia. Dalam Al-Qur\u2019an, Ka\u2019bah memiliki beberapa nama: Baitullah (rumah Allah), Al-Bait Al-Haram, Al-Bait Al-\u2018Atiq, Bakkah, dan Qiblah. Setiap hari, jutaan muslim menghadap kepadanya dalam shalat dan mengelilinginya dalam tawaf.',
    sejarahSeksi: [
      {
        judul: 'Dibangun Nabi Ibrahim & Ismail',
        isi: 'Menurut riwayat, fondasi Ka\u2019bah ditinggikan oleh Nabi Ibrahim \u2018alaihissalam bersama putranya Nabi Ismail \u2018alaihissalam atas perintah Allah, sebagaimana diabadikan dalam Al-Qur\u2019an (QS. Al-Baqarah: 127). Sebagian riwayat menyebutkan Ka\u2019bah sudah ada sejak masa Nabi Adam, lalu ditinggikan kembali oleh Ibrahim. Bangunan Ibrahim saat itu tidak beratap dan memiliki dua pintu.',
      },
      {
        judul: 'Renovasi Masa Quraisy',
        isi: 'Sebelum kenabian, kaum Quraisy merenovasi Ka\u2019bah setelah rusak karena banjir. Karena keterbatasan dana yang halal, mereka memendekkan bangunan sehingga sebagian area (kini Hijir Ismail) tidak masuk ke dalam bangunan utama. Pada renovasi ini pula Nabi Muhammad \ufdfa \u2014 sebelum diangkat menjadi nabi \u2014 menjadi penengah saat para kabilah berselisih siapa yang berhak meletakkan kembali Hajar Aswad, dengan meletakkannya di atas kain yang diangkat bersama-sama.',
      },
      {
        judul: 'Kiblat & Pusat Tawaf',
        isi: 'Ka\u2019bah adalah kiblat shalat sejak diperintahkan berpindah dari Baitul Maqdis. Tawaf (mengelilingi Ka\u2019bah 7 putaran) dimulai dan diakhiri di garis sejajar Hajar Aswad, dengan Ka\u2019bah di sebelah kiri. Ukuran Ka\u2019bah relatif tetap sejak tahun 1040 M, dengan renovasi pada bagian-bagian pelengkap saja.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Ibrahim \u2018alaihissalam', peran: 'Meninggikan fondasi Ka\u2019bah bersama Nabi Ismail' },
      { nama: 'Nabi Ismail \u2018alaihissalam', peran: 'Membantu ayahnya membangun Ka\u2019bah' },
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
        teks: 'Dan (ingatlah) ketika Ibrahim meninggikan fondasi Baitullah bersama Ismail (seraya berdoa), \u201cYa Tuhan kami, terimalah (amal) dari kami. Sungguh, Engkaulah Yang Maha Mendengar lagi Maha Mengetahui.\u201d',
      },
      {
        sumber: 'QS. Ali Imran: 96',
        teks: 'Sesungguhnya rumah (ibadah) pertama yang dibangun untuk manusia adalah (Baitullah) yang di Bakkah (Makkah) yang diberkahi dan menjadi petunjuk bagi seluruh alam.',
      },
    ],
    adab: [
      'Saat melihat Ka\u2019bah pertama kali, dianjurkan berdoa dengan khusyuk (doa terkabul).',
      'Tawaf dengan tertib, jaga jangan menyakiti jamaah lain demi menyentuh bagian tertentu.',
      'Arahkan segala doa hanya kepada Allah, bukan kepada batu/bangunannya.',
      'Jaga kekhusyukan; bagian-bagian Ka\u2019bah dimuliakan karena perintah syariat, bukan disembah.',
    ],
    catatan: 'Mencium Hajar Aswad & mengusap Rukun Yamani adalah sunnah, bukan menyembah batu. Umar bin Khattab \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647 berkata pada Hajar Aswad: \u201cAku tahu engkau hanya batu, tidak memberi manfaat & mudarat. Andai aku tak melihat Nabi \ufdfa menciummu, aku tak akan menciummu.\u201d (HR. Bukhari-Muslim). Semua doa hanya ditujukan kepada Allah.',
    // Bagian-bagian Ka'bah (field baru, lihat LANGKAH 1 di prompt)
    bagian: [
      { nama: 'Hajar Aswad', arab: 'الحجر الأسود', posisi: 'Sudut timur', deskripsi: 'Batu hitam mulia, titik awal & akhir tawaf. Disunnahkan mencium atau memberi isyarat tangan ke arahnya saat memulai putaran. Menciumnya sunnah, bukan ibadah kepada batu.' },
      { nama: 'Rukun Yamani', arab: 'الركن اليماني', posisi: 'Sudut barat daya', deskripsi: 'Sudut menghadap Yaman. Disunnahkan mengusapnya dengan tangan kanan saat tawaf (tanpa mencium). Antara Rukun Yamani dan Hajar Aswad dianjurkan membaca doa \u201cRabbana atina fid-dunya hasanah\u2026\u201d' },
      { nama: 'Multazam', arab: 'الملتزم', posisi: 'Antara Hajar Aswad & pintu Ka\u2019bah', deskripsi: 'Bagian dinding Ka\u2019bah yang mustajab untuk berdoa. Disunnahkan menempelkan dada, pipi, dan kedua tangan ke dinding sambil berdoa khusyuk bila memungkinkan.' },
      { nama: 'Maqam Ibrahim', arab: 'مقام إبراهيم', posisi: 'Sisi timur, dekat pintu', deskripsi: 'Batu berisi bekas pijakan kaki Nabi Ibrahim saat membangun Ka\u2019bah (bukan makam). Disunnahkan shalat 2 rakaat di belakangnya setelah tawaf.' },
      { nama: 'Hijir Ismail', arab: 'حجر إسماعيل', posisi: 'Sisi utara, setengah lingkaran', deskripsi: 'Disebut juga Al-Hathim. Termasuk bagian asli Ka\u2019bah, maka tawaf WAJIB mengelilingi di luar pagarnya. Shalat di dalamnya dihukumi seperti shalat di dalam Ka\u2019bah.' },
      { nama: 'Mizab Ar-Rahman', arab: 'ميزاب الرحمة', posisi: 'Atap, di atas Hijir Ismail', deskripsi: 'Pancuran/talang emas untuk mengalirkan air hujan dari atap Ka\u2019bah. Disebut \u201cpancuran rahmat\u201d.' },
      { nama: 'Pintu Ka\u2019bah', arab: 'باب الكعبة', posisi: 'Sisi timur, ditinggikan dari tanah', deskripsi: 'Terbuat dari emas murni, berat kedua daun pintu sekitar 280 kg. Letaknya ditinggikan sebagai perlindungan.' },
      { nama: 'Kiswah', arab: 'كسوة الكعبة', posisi: 'Menyelubungi seluruh Ka\u2019bah', deskripsi: 'Kain hitam berhias kaligrafi benang emas yang menutupi Ka\u2019bah, diganti setiap tahun pada 9 Dzulhijjah (hari Arafah).' },
      { nama: 'Syadzarwan', arab: 'الشاذروان', posisi: 'Dasar luar Ka\u2019bah', deskripsi: 'Bagian dasar Ka\u2019bah yang menonjol, berfungsi memperkuat fondasi. Termasuk bagian Ka\u2019bah, maka saat tawaf jangan menapak di atasnya.' },
      { nama: 'Rukun Iraqi', arab: 'الركن العراقي', posisi: 'Sudut utara (mengarah Irak)', deskripsi: 'Tidak ada amalan khusus di sudut ini, namun menjadi penanda dalam tawaf.' },
      { nama: 'Rukun Syami', arab: 'الركن الشامي', posisi: 'Sudut barat laut (mengarah Syam)', deskripsi: 'Disebut juga Rukun Maghribi. Tidak ada amalan khusus di sudut ini.' },
    ],
  },
