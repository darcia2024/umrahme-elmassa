// =============================================================
// LOKASI KA'BAH — bagian dikelompokkan jadi 2 grup (Sudut/Rukun & Bagian Lain)
// Sisipkan ke array daftarLokasi di lokasi.ts (kelompok Makkah).
// Karakter Arab & tanda baca ditulis LANGSUNG (bukan \uXXXX) — hindari teks ngawur.
// =============================================================

  {
    id: 'kabah',
    tipe: 'sejarah',
    nama: 'Ka’bah',
    namaArab: 'الكعبة المشرفة',
    kota: 'Makkah',
    jarakKm: 0,
    jamKunjungan: 'Pusat Masjidil Haram, 24 jam',
    ringkas: 'Baitullah, kiblat seluruh umat Islam dan pusat pelaksanaan tawaf di Masjidil Haram.',
    gambar: '/lokasi/kabah.jpg',
    koordinat: { lat: 21.4225, lng: 39.8262 },
    sejarah:
      'Ka’bah adalah bangunan berbentuk kubus di pusat Masjidil Haram, kiblat umat Islam sedunia, dan rumah ibadah pertama yang dibangun untuk manusia. Dalam Al-Qur’an, Ka’bah disebut dengan beberapa nama: Baitullah (rumah Allah), Al-Bait Al-Haram, Al-Bait Al-‘Atiq, Bakkah, dan Qiblah. Setiap hari jutaan muslim menghadap kepadanya dalam shalat dan mengelilinginya dalam tawaf.',
    sejarahSeksi: [
      {
        judul: 'Dibangun Nabi Ibrahim & Ismail',
        isi: 'Fondasi Ka’bah ditinggikan oleh Nabi Ibrahim عليه السلام bersama putranya Nabi Ismail عليه السلام atas perintah Allah, sebagaimana diabadikan dalam Al-Qur’an (QS. Al-Baqarah: 127). Sebagian riwayat menyebut Ka’bah sudah ada sejak masa Nabi Adam, lalu ditinggikan kembali oleh Ibrahim. Bangunan Ibrahim saat itu tidak beratap dan memiliki dua pintu.',
      },
      {
        judul: 'Renovasi Masa Quraisy',
        isi: 'Sebelum kenabian, kaum Quraisy merenovasi Ka’bah setelah rusak karena banjir. Karena keterbatasan dana yang halal, mereka memendekkan bangunan sehingga sebagian area (kini Hijir Ismail) tidak masuk ke dalam bangunan utama. Pada renovasi inilah Nabi Muhammad ﷺ — sebelum diangkat menjadi nabi — menengahi perselisihan kabilah soal siapa yang berhak meletakkan Hajar Aswad, dengan meletakkannya di atas kain yang diangkat bersama-sama.',
      },
      {
        judul: 'Kiblat & Pusat Tawaf',
        isi: 'Ka’bah adalah kiblat shalat setelah perpindahan dari Baitul Maqdis. Tawaf (mengelilingi Ka’bah 7 putaran) dimulai dan diakhiri di garis sejajar Hajar Aswad, dengan Ka’bah berada di sebelah kiri jamaah.',
      },
    ],
    tokoh: [
      { nama: 'Nabi Ibrahim عليه السلام', peran: 'Meninggikan fondasi Ka’bah bersama Nabi Ismail' },
      { nama: 'Nabi Ismail عليه السلام', peran: 'Membantu ayahnya membangun Ka’bah' },
      { nama: 'Nabi Muhammad ﷺ', peran: 'Menengahi peletakan Hajar Aswad saat renovasi Quraisy' },
    ],
    keutamaan: [
      'Rumah ibadah pertama yang dibangun untuk manusia (QS. Ali Imran: 96).',
      'Kiblat seluruh umat Islam dalam shalat di mana pun berada.',
      'Pusat tawaf dalam ibadah haji & umrah.',
    ],
    dalil: [
      {
        sumber: 'QS. Al-Baqarah: 127',
        teks: 'Dan (ingatlah) ketika Ibrahim meninggikan fondasi Baitullah bersama Ismail (seraya berdoa), “Ya Tuhan kami, terimalah (amal) dari kami. Sungguh, Engkaulah Yang Maha Mendengar lagi Maha Mengetahui.”',
      },
      {
        sumber: 'QS. Ali Imran: 96',
        teks: 'Sesungguhnya rumah (ibadah) pertama yang dibangun untuk manusia adalah (Baitullah) yang di Bakkah (Makkah) yang diberkahi dan menjadi petunjuk bagi seluruh alam.',
      },
    ],
    adab: [
      'Saat melihat Ka’bah pertama kali, dianjurkan berdoa dengan khusyuk.',
      'Tawaf dengan tertib; jangan menyakiti jamaah lain demi menyentuh bagian tertentu.',
      'Arahkan segala doa hanya kepada Allah, bukan kepada batu atau bangunannya.',
    ],
    catatan: 'Mencium Hajar Aswad & mengusap Rukun Yamani adalah sunnah (mengikuti Nabi ﷺ), bukan menyembah batu. Umar bin Khattab رضي الله عنه berkata pada Hajar Aswad: “Aku tahu engkau hanya batu, tidak memberi manfaat & mudarat. Andai aku tak melihat Nabi ﷺ menciummu, aku tak akan menciummu.” (HR. Bukhari-Muslim). Semua doa hanya ditujukan kepada Allah.',

    // Diagram visual semua bagian Ka'bah (satu gambar)
    diagramBagian: '/lokasi/kabah/diagram-bagian.jpg',

    // ── Bagian Ka'bah dikelompokkan jadi 2 GRUP ──
    bagianGrup: [
      {
        judul: '4 Sudut (Rukun) Ka’bah',
        items: [
          { nama: 'Rukun Hajar Aswad', arab: 'ركن الحجر الأسود', deskripsi: 'Sudut timur, tempat Hajar Aswad. Titik awal & akhir tawaf. Disunnahkan mencium atau memberi isyarat tangan ke arahnya tiap memulai putaran.'  },
          { nama: 'Rukun Yamani', arab: 'الركن اليماني', deskripsi: 'Sudut barat daya (mengarah Yaman). Disunnahkan mengusapnya dengan tangan kanan tanpa mencium. Antara Rukun Yamani & Hajar Aswad dianjurkan membaca “Rabbana atina fid-dunya hasanah…”'  },
          { nama: 'Rukun Iraqi', arab: 'الركن العراقي', deskripsi: 'Sudut utara (mengarah Irak). Tidak ada amalan khusus, menjadi penanda dalam tawaf.'  },
          { nama: 'Rukun Syami', arab: 'الركن الشامي', deskripsi: 'Sudut barat laut (mengarah Syam). Disebut juga Rukun Maghribi. Tidak ada amalan khusus.'  },
        ],
      },
      {
        judul: 'Bagian Penting Lainnya',
        items: [
          { nama: 'Multazam', arab: 'الملتزم', deskripsi: 'Dinding antara Hajar Aswad & pintu Ka’bah; tempat mustajab berdoa. Disunnahkan menempelkan dada & tangan ke dinding bila memungkinkan.'  },
          { nama: 'Maqam Ibrahim', arab: 'مقام إبراهيم', deskripsi: 'Batu berisi bekas pijakan Nabi Ibrahim saat membangun Ka’bah (bukan makam). Disunnahkan shalat 2 rakaat di belakangnya setelah tawaf.'  },
          { nama: 'Hijir Ismail', arab: 'حجر إسماعيل', deskripsi: 'Area setengah lingkaran di sisi utara (disebut Al-Hathim). Termasuk bagian asli Ka’bah, maka tawaf wajib mengelilingi di luar pagarnya.'  },
          { nama: 'Pintu Ka’bah', arab: 'باب الكعبة', deskripsi: 'Terbuat dari emas murni, ditinggikan dari permukaan tanah. Berat kedua daun pintu sekitar 280 kg.'  },
          { nama: 'Mizab Ar-Rahman', arab: 'ميزاب الرحمة', deskripsi: 'Pancuran/talang emas di atap (di atas Hijir Ismail) untuk mengalirkan air hujan. Disebut “pancuran rahmat”.'  },
          { nama: 'Kiswah', arab: 'كسوة الكعبة', deskripsi: 'Kain hitam berhias kaligrafi benang emas yang menyelubungi Ka’bah, diganti setiap tahun pada 9 Dzulhijjah.'  },
          { nama: 'Syadzarwan', arab: 'الشاذروان', deskripsi: 'Bagian dasar Ka’bah yang menonjol. Termasuk bagian Ka’bah, maka saat tawaf jangan menapak di atasnya.'  },
        ],
      },
    ],
  },
