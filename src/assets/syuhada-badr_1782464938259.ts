// =============================================================
// DATA SYUHADA BADR — 14 syuhada muslimin Perang Badr (2 H / 624 M)
// Sumber: Sirah Ibnu Hisyam, Ibnu Ishaq, Ibnu Katsir (via Islampos, Wikipedia ID, Surau, Detik).
// Tambahkan sebagai field `syuhada` pada objek lokasi Perang Badr di lokasi.ts.
// Karakter Arab & tanda baca ditulis LANGSUNG (bukan \uXXXX).
// =============================================================

// Field tambahan untuk objek lokasi Badr:
//   syuhadaPengantar: string;
//   syuhada: { nama: string; golongan: string; konteks: string }[];

  syuhadaPengantar:
    'Dalam Perang Badr (17 Ramadhan 2 H / 624 M), 14 sahabat gugur sebagai syuhada — 6 dari kaum Muhajirin dan 8 dari kaum Anshar (2 dari kabilah Aus, 6 dari Khazraj). Berikut nama-nama mereka menurut riwayat para ulama sirah seperti Ibnu Hisyam, Ibnu Ishaq, dan Ibnu Katsir.',

  syuhada: [
    // ── Muhajirin (6) ──
    { nama: 'Ubaidah bin Al-Harits', golongan: 'Muhajirin', konteks: 'Sepupu Rasulullah ﷺ. Terluka dalam duel pembuka melawan pembesar Quraisy, lalu wafat dalam perjalanan pulang di Ash-Shafra’. Termasuk yang paling awal masuk Islam.' },
    { nama: 'Umair bin Abi Waqqash', golongan: 'Muhajirin', konteks: 'Adik Sa’ad bin Abi Waqqash. Masih sangat muda; sempat dilarang ikut karena usianya, namun diizinkan lalu gugur sebagai syahid.' },
    { nama: 'Dzusy Syimalain (Umair bin Abdu Amr)', golongan: 'Muhajirin', konteks: 'Sekutu Bani Zuhrah dari kabilah Khuza’ah. Dijuluki "Dzusy Syimalain" (pemilik dua tangan kiri) karena cekatan memakai kedua tangan.' },
    { nama: 'Aqil bin Al-Bukair', golongan: 'Muhajirin', konteks: 'Sekutu Bani Adi bin Ka’ab. Termasuk generasi awal pemeluk Islam yang berhijrah.' },
    { nama: 'Mihja’ bin Shalih', golongan: 'Muhajirin', konteks: 'Mantan budak (maula) Umar bin Khattab. Disebutkan sebagai muslim pertama yang gugur dalam Perang Badr.' },
    { nama: 'Shafwan bin Baidha’', golongan: 'Muhajirin', konteks: 'Dari Bani Al-Harits bin Fihr. Salah satu sahabat Muhajirin yang gugur dalam pertempuran.' },

    // ── Anshar — Aus (2) ──
    { nama: 'Sa’ad bin Khaitsamah', golongan: 'Anshar (Aus)', konteks: 'Dari Bani Amr bin Auf. Salah satu naqib (pemimpin) kaumnya. Memilih berangkat berperang meski ditawari tetap tinggal menjaga keluarga.' },
    { nama: 'Mubasysyir bin Abdul Mundzir', golongan: 'Anshar (Aus)', konteks: 'Dari Bani Amr bin Auf. Gugur sebagai syahid dalam barisan kaum Anshar.' },

    // ── Anshar — Khazraj (6) ──
    { nama: 'Yazid bin Al-Harits (Ibnu Fushum)', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Al-Harits bin Al-Khazraj. Dikenal dengan sapaan Ibnu Fushum (dinisbahkan ke ibunya).' },
    { nama: 'Umair bin Al-Humam', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Salimah. Masyhur dengan kisahnya melempar kurma di tangannya saat mendengar janji surga, lalu maju bertempur hingga syahid.' },
    { nama: 'Rafi’ bin Al-Mu’alla', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Habib bin Abdu Haritsah. Gugur sebagai syahid di medan Badr.' },
    { nama: 'Haritsah bin Suraqah', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani An-Najjar. Masih muda; terkenal lewat hadis tentang ibunya yang bertanya pada Nabi ﷺ, lalu beliau mengabarkan Haritsah berada di Firdaus tertinggi.' },
    { nama: 'Auf bin Al-Harits', golongan: 'Anshar (Khazraj)', konteks: 'Dari Bani Ghanm bin Malik bin An-Najjar. Putra Afra’; gugur bersama saudaranya Muawwidz.' },
    { nama: 'Muawwidz bin Al-Harits', golongan: 'Anshar (Khazraj)', konteks: 'Saudara Auf, sama-sama putra Afra’. Dua bersaudara ini termasuk yang melukai Abu Jahal dalam pertempuran.' },
  ],
