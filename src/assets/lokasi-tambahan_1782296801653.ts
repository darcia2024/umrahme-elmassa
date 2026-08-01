// =============================================================
// DATA LOKASI TAMBAHAN — sisipkan ke dalam array daftarLokasi
// di artifacts/umrahme/src/data/lokasi.ts
// Letakkan masjid baru di kelompok 'masjid', sejarah di kelompok 'sejarah'.
// Semua koordinat sudah diverifikasi untuk deep-link Google Maps.
// gambar: '' → lihat daftar foto di akhir prompt.
// =============================================================

// ============================== MASJID (tambahan) ==============================

  {
    id: 'masjid-jin',
    tipe: 'masjid',
    nama: 'Masjid Jin',
    namaArab: 'مسجد الجن',
    kota: 'Makkah',
    jarakKm: 1.2,
    jamKunjungan: 'Buka saat waktu shalat',
    ringkas: 'Tempat serombongan jin memeluk Islam setelah mendengar bacaan Al-Qur\u2019an Nabi \ufdfa.',
    gambar: '',
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

// ============================== SEJARAH (tambahan) ==============================

  {
    id: 'jannatul-mualla',
    tipe: 'sejarah',
    nama: 'Jannatul Mu\u2019alla',
    namaArab: 'جنة المعلاة',
    kota: 'Makkah',
    jarakKm: 1.5,
    jamKunjungan: 'Ziarah dari luar pagar',
    ringkas: 'Pemakaman bersejarah Makkah, tempat dimakamkannya Sayyidah Khadijah \u0631\u0636\u064a \u0627\u0644\u0644\u0647 \u0639\u0646\u0647\u0627.',
    gambar: '',
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
        teks: 'Nabi \ufdfa mengajarkan doa ziarah kubur: \u201cAssal\u0101mu \u2018alaikum ahlad-diy\u0101r minal-mu\u2019min\u012bna wal-muslim\u012bn, wa inn\u0101 in sy\u0101\u2019all\u0101hu bikum l\u0101\u1e25iq\u016bn.\u201d (Salam sejahtera atas kalian wahai penghuni kubur dari kaum mukminin dan muslimin.)',
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
    namaArab: 'جبل أبي قبيس',
    kota: 'Makkah',
    jarakKm: 0.5,
    jamKunjungan: 'Dilihat dari area Masjidil Haram',
    ringkas: 'Bukit di sebelah timur Masjidil Haram, saksi mukjizat terbelahnya bulan.',
    gambar: '',
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
