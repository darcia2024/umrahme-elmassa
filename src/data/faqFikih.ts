export interface FaqItem {
  id: string;
  tanya: string;
  jawab: string;
  catatan?: string;
}

export interface FaqKategori {
  id: string;
  nama: string;
  ringkas: string;
  items: FaqItem[];
}

export const faqKategori: FaqKategori[] = [
  {
    id: 'thaharah',
    nama: 'Wudhu, Haid & Bersuci',
    ringkas: 'Batal wudhu, haid, dan kondisi suci saat ibadah',
    items: [
      {
        id: 'batal-wudhu-tawaf',
        tanya: 'Batal wudhu di tengah tawaf, bagaimana?',
        jawab:
          'Tawaf disyaratkan suci dari hadats (menurut jumhur ulama). Jika wudhu batal di tengah tawaf, keluar dari area tawaf, berwudhu kembali, lalu lanjutkan dari putaran terakhir yang sudah selesai (tidak perlu mengulang dari awal menurut pendapat yang memudahkan). Sebaiknya tandai sudah putaran ke berapa sebelum keluar.',
        catatan:
          'Ada perbedaan pendapat: sebagian menyarankan mengulang dari awal demi muwalah (kesinambungan). Ikuti arahan pembimbing Anda.',
      },
      {
        id: 'haid-saat-umrah',
        tanya: 'Haid datang sebelum/saat umrah, bagaimana?',
        jawab:
          'Wanita haid TETAP boleh berihram dan berniat umrah dari miqat, serta melakukan semua amalan KECUALI tawaf (karena tawaf butuh suci dan dilakukan di dalam Masjidil Haram). Ia menunggu hingga suci, mandi, lalu tawaf dan melanjutkan sai serta tahallul. Sai dan amalan lain selain tawaf tetap boleh saat haid.',
        catatan:
          'Jika waktu mepet (jadwal pulang) dan tak sempat suci, ada rukhsah/pendapat khusus — segera konsultasi pembimbing atau ulama.',
      },
      {
        id: 'sai-tanpa-wudhu',
        tanya: 'Apakah sai harus dalam keadaan suci?',
        jawab:
          'Suci dari hadats saat sai hukumnya sunnah, bukan syarat. Sai tetap sah meski tanpa wudhu. Namun lebih utama (afdhal) tetap dalam keadaan suci. Karena itu wanita haid pun boleh melakukan sai.',
      },
    ],
  },
  {
    id: 'tawaf-sai',
    nama: 'Tawaf & Sai',
    ringkas: 'Putaran, keraguan, dan teknis tawaf-sai',
    items: [
      {
        id: 'lupa-putaran',
        tanya: 'Lupa sudah berapa putaran tawaf/sai?',
        jawab:
          'Jika ragu, ambil jumlah yang LEBIH SEDIKIT (yang diyakini). Misal ragu antara putaran 4 atau 5, anggap baru 4 lalu lanjutkan. Ini kaidah fikih: "yakin tidak hilang oleh keraguan". Gunakan fitur penghitung (counter) tawaf/sai di app ini agar tidak lupa.',
      },
      {
        id: 'tawaf-kursi-roda',
        tanya: 'Boleh tawaf/sai pakai kursi roda?',
        jawab:
          'Boleh, terutama bagi lansia, sakit, atau yang lemah fisik. Tawaf & sai dengan kursi roda sah. Tersedia jalur khusus kursi roda di lantai tertentu Masjidil Haram dan di area sai. Bisa didorong sendiri, keluarga, atau petugas berbayar.',
      },
      {
        id: 'terputus-tawaf-shalat',
        tanya: 'Tawaf terputus karena iqamah shalat fardhu?',
        jawab:
          'Jika shalat fardhu didirikan saat Anda sedang tawaf, hentikan tawaf, ikut shalat berjamaah, lalu lanjutkan tawaf dari tempat/putaran terakhir yang sudah selesai. Tidak perlu mengulang dari awal.',
      },
      {
        id: 'tidak-bisa-cium-hajar-aswad',
        tanya: 'Tidak bisa mencium Hajar Aswad karena ramai?',
        jawab:
          'Mencium Hajar Aswad adalah SUNNAH, bukan wajib. Jika ramai dan berdesakan, cukup memberi isyarat (melambai) dengan tangan kanan ke arah Hajar Aswad sambil mengucap "Bismillah, Allahu Akbar" setiap memulai putaran. Jangan memaksa berdesakan hingga menyakiti orang lain.',
        catatan:
          'Menyakiti sesama muslim demi sunnah justru bertentangan dengan tujuan ibadah. Keselamatan diutamakan.',
      },
    ],
  },
  {
    id: 'ihram-larangan',
    nama: 'Ihram & Larangan',
    ringkas: 'Kondisi tak sengaja & keraguan saat ihram',
    items: [
      {
        id: 'tak-sengaja-langgar',
        tanya: 'Tidak sengaja melanggar larangan ihram (lupa)?',
        jawab:
          'Pelanggaran karena lupa, tidak tahu, atau terpaksa pada umumnya TIDAK dikenai dam menurut banyak ulama, asalkan segera dihentikan saat ingat. Misal tak sengaja memakai wewangian lalu langsung dibersihkan. Namun untuk berjaga, konsultasikan ke pembimbing.',
        catatan:
          'Berbeda dengan pelanggaran yang disengaja, yang dikenai dam. Lihat halaman Panduan Ihram bagian Dam.',
      },
      {
        id: 'kain-ihram-kena-najis',
        tanya: 'Kain ihram terkena najis, bagaimana?',
        jawab:
          'Bersihkan bagian yang terkena najis, atau ganti dengan kain ihram lain yang bersih. Tidak masalah mengganti kain ihram selama masih dalam keadaan ihram — yang penting tetap memenuhi syarat (tidak berjahit bagi pria). Berihram tidak terikat pada satu kain tertentu.',
      },
      {
        id: 'mandi-keramas-ihram',
        tanya: 'Boleh mandi atau keramas saat ihram?',
        jawab:
          'Boleh mandi dan membasahi badan saat ihram. Yang dilarang adalah memakai sabun/sampo BERWANGI dan menggosok rambut hingga rontok dengan sengaja. Gunakan air biasa, bersikap lembut pada rambut, dan hindari produk beraroma.',
      },
    ],
  },
  {
    id: 'umum',
    nama: 'Umum & Praktis',
    ringkas: 'Pertanyaan umum seputar pelaksanaan',
    items: [
      {
        id: 'umrah-berkali',
        tanya: 'Boleh umrah berkali-kali dalam satu perjalanan?',
        jawab:
          "Boleh. Banyak jamaah mengambil umrah tambahan dengan mengambil miqat dari Tan'im (Masjid Aisyah) atau Ji'ranah. Namun sebagian ulama menganjurkan memperbanyak tawaf & ibadah lain daripada mengulang umrah, karena tidak ada riwayat Nabi ﷺ mengulang umrah dalam satu perjalanan.",
        catatan:
          'Ini masalah khilafiyah. Keduanya ada dasarnya; sesuaikan dengan bimbingan dan kondisi.',
      },
      {
        id: 'doa-bahasa-indonesia',
        tanya: 'Boleh berdoa pakai bahasa Indonesia?',
        jawab:
          "Boleh. Tidak ada kewajiban doa tertentu dengan lafal Arab tertentu saat tawaf, sai, atau di tempat mustajab. Anda boleh berdoa dengan bahasa apa pun yang Anda pahami. Doa-doa yang diajarkan (ma'tsur) lebih utama, tapi doa pribadi dengan bahasa sendiri tetap sah dan dianjurkan.",
      },
      {
        id: 'tawaf-wada-umrah',
        tanya: 'Apakah umrah ada tawaf wada (perpisahan)?',
        jawab:
          'Tawaf wada diwajibkan/disunnahkan saat akan meninggalkan Makkah setelah HAJI. Untuk umrah, mayoritas ulama tidak mewajibkan tawaf wada, namun dianjurkan melakukan tawaf perpisahan sebagai penghormatan sebelum meninggalkan Makkah jika memungkinkan.',
      },
    ],
  },
];
