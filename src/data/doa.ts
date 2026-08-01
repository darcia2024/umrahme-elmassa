import type { Doa, KategoriDoa } from '../types';

export const KATEGORI_LABEL: Record<KategoriDoa, string> = {
  persiapan: 'Persiapan & Perjalanan',
  madinah: 'Madinah & Ziarah',
  ihram: 'Ihram',
  makkah: 'Makkah & Masjidil Haram',
  tawaf: 'Tawaf',
  sai: "Sa'i",
  tahallul: 'Tahallul',
  wada: "Thawaf Wada' & Perpisahan",
  harian: 'Shalawat & Doa Harian',
};

export const kategoriDoaMeta: { id: KategoriDoa; judul: string; deskripsi: string }[] = [
  { id: 'persiapan', judul: 'Persiapan & Perjalanan', deskripsi: 'Safar, keluar rumah, kendaraan' },
  { id: 'madinah', judul: 'Madinah & Ziarah', deskripsi: 'Tiba di Madinah, Nabawi, Raudhah, ziarah' },
  { id: 'ihram', judul: 'Ihram', deskripsi: 'Niat ihram, mandi sunnah, talbiyah' },
  { id: 'makkah', judul: 'Makkah & Masjidil Haram', deskripsi: "Masuk Makkah, Masjidil Haram, Ka'bah" },
  { id: 'tawaf', judul: 'Tawaf', deskripsi: "Niat tawaf, doa per putaran, sesudah tawaf" },
  { id: 'sai', judul: "Sa'i", deskripsi: 'Di Shafa/Marwah, doa per lintasan' },
  { id: 'tahallul', judul: 'Tahallul', deskripsi: 'Doa tahallul / mencukur rambut' },
  { id: 'wada', judul: "Thawaf Wada' & Perpisahan", deskripsi: "Tawaf wada', doa perpisahan" },
  { id: 'harian', judul: 'Shalawat & Doa Harian', deskripsi: 'Shalawat, doa umum, pulang' },
];

// ============================================================================
// BAGIAN 1 — PERSIAPAN & PERJALANAN 
// ============================================================================

export const doaPersiapan: Doa[] = [
  {
    id: 'safar-niat-shalat-safar',
    kategori: 'persiapan',
    judul: 'Niat Shalat Sunnah Safar',
    arab: 'أُصَلِّيْ سُنَّةَ السَّفَرِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً لِلّٰهِ تَعَالَى',
    latin: "Usholli sunnatas-safari rok'ataini mustaqbilal-qiblati adaa-an lillahi ta'ala",
    terjemahan: "Niat saya shalat sunnah safar dua rakaat karena Allah Ta'ala.",
    arti: 'Niat melaksanakan shalat sunnah dua rakaat sebelum memulai perjalanan, memohon keselamatan kepada Allah.',
    dalil: 'Niat shalat sunnah safar. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca sebagai niat shalat sunnah dua rakaat sebelum berangkat safar.',
    waktu: 'Sebelum memulai perjalanan (safar).',
  },
  {
    id: 'safar-doa-keluar-rumah',
    kategori: 'persiapan',
    judul: 'Doa Keluar Rumah',
    arab: 'بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ الْعَلِيِّ الْعَظِيْمِ',
    latin: "Bismillaahi tawakkaltu 'alallaahi laa hawla wa laa quwwata illaa billaahil-'aliyyil-'azhiim",
    terjemahan: 'Dengan nama Allah, aku berserah diri kepada Allah. Tiada daya upaya dan tiada kekuatan melainkan atas izin Allah Yang Maha Luhur lagi Maha Agung.',
    arti: 'Doa berserah diri kepada Allah saat meninggalkan rumah untuk memulai perjalanan ibadah.',
    dalil: 'Doa keluar rumah. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca ketika melangkah keluar dari rumah.',
    waktu: 'Saat keluar rumah, sebelum berangkat.',
  },
  {
    id: 'safar-doa-kendaraan-bergerak',
    kategori: 'persiapan',
    judul: 'Doa Ketika Kendaraan Mulai Bergerak',
    arab: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ. اَللهُ أَكْبَرُ، اَللهُ أَكْبَرُ، اَللهُ أَكْبَرُ، سُبْحَانَ الَّذِيْ سَخَّرَلَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ. اَللَّهُمَّ إِنَّا نَسْئَلُكَ فِيْ سَفَرِنَا هٰذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَاتَرْضَى. اَللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هٰذَا وَأَطْوِ عَنَّا بُعْدَهُ. اَللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيْفَةُ فِي الْأَهْلِ. اَللَّهُمَّ إِنِّيْ أَعُوْذُبِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمَنْظَرِ وَسُوْءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ وَالْوَلَدِ',
    latin: "Bismillaahir-rahmaanir-rahiim. Allaahu akbar, Allaahu akbar, Allaahu akbar. Subhaanalladzii sakhkhoro lanaa haadza wa maa kunnaa lahuu muqriniin. Wa innaa ilaa robbinaa lamunqolibuun. Allaahumma innaa nas'aluka fii safarinaa haadzal-birro wattaqwaa wa minal-'amali maa tardhaa. Allaahumma hawwin 'alainaa safaranaa haadza wa athwi 'annaa bu'dah. Allaahumma antash-shaahibu fis-safari wal-khaliifatu fil-ahli. Allaahumma innii a'uudzubika min wa'tsaa'is-safari wa ka'aabatil-manzhori wa suu'il-munqolabi fil-maali wal-ahli wal-waladi",
    terjemahan: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Allah Maha Besar (3x). Maha suci Allah yang telah menggerakkan untuk kami kendaraan ini, padahal kami tiada kuasa menggerakkannya. Dan sesungguhnya hanya kepada Tuhan, kami pasti akan kembali. Ya Allah, kami mohon kepada-Mu dalam bepergian kami ini bakti, taat dan takwa serta amal perbuatan yang Engkau ridhai. Ya Allah, mudahkanlah bepergian kami ini dan singkatkan kejauhannya. Ya Allah, Engkau adalah kawan dalam bepergian dan pengganti dalam keluarga yang ditinggalkan. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kesukaran dalam bepergian dan pemandangan yang menyedihkan serta tidak membawa kebaikan, baik mengenai harta benda, keluarga maupun anak-anak.',
    arti: 'Doa yang dibaca saat kendaraan mulai bergerak, memohon keselamatan, kemudahan, dan perlindungan selama perjalanan.',
    dalil: 'Doa ketika kendaraan mulai bergerak (berdasarkan QS. Az-Zukhruf: 13-14 dan hadis safar). Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca ketika kendaraan (pesawat/bus) mulai bergerak meninggalkan tempat.',
    waktu: 'Saat kendaraan mulai berjalan di awal perjalanan.',
  },
  {
    id: 'safar-doa-tiba-tujuan',
    kategori: 'persiapan',
    judul: 'Doa Setelah Tiba di Tempat Tujuan',
    arab: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَهَا وَخَيْرَ أَهْلِهَا وَخَيْرَ مَا فِيْهَا وَأَعُوْذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيْهَا',
    latin: "Allaahumma innii as'aluka khoirohaa wa khoiro ahlihaa wa khoiro maa fiihaa wa a'udzu bika min syarrihaa wa syarri ahlihaa wa syarri maa fiihaa",
    terjemahan: 'Ya Allah, saya mohon kepada-Mu kebaikan negeri ini dan kebaikan penduduknya serta kebaikan yang ada di dalamnya. Saya berlindung kepada-Mu dari kejahatan negeri ini dan kejahatan penduduknya serta kejahatan yang ada di dalamnya.',
    arti: 'Doa memohon kebaikan dan perlindungan saat tiba di suatu tempat/negeri tujuan.',
    dalil: 'Doa setelah tiba di tempat tujuan. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca setelah sampai di tempat tujuan perjalanan.',
    waktu: 'Saat tiba di tempat tujuan.',
  },
];

// ============================================================================
// BAGIAN 2 — MADINAH & ZIARAH 
// ============================================================================

export const doaMadinah: Doa[] = [
  {
    id: 'madinah-tiba-kota',
    kategori: 'madinah',
    judul: 'Doa Ketika Tiba di Kota Madinah',
    arab: 'اَللَّهُمَّ هٰذَا حَرَمُ رَسُوْلِكَ فَاجْعَلْهُ وِقَايَةً مِنَ النَّارِ وَأَمَانَةً مِنَ الْعَذَابِ وَسُوْءِ الْحِسَابِ',
    latin: "Allaahumma haadzaa haromu rosuulika faj'alhu wiqooyatan minannaari wa amaanatan minal-'adzaabi wa suu'il-hisaab",
    terjemahan: 'Ya Allah, negeri ini adalah tanah haram Rasul-Mu, Muhammad SAW, maka jadikanlah penjaga bagiku dari neraka, aman dari siksa dan buruknya hisab (perhitungan di hari kiamat).',
    arti: 'Doa saat memasuki kota Madinah, tanah haram Rasulullah, memohon perlindungan dan keselamatan.',
    dalil: 'Doa ketika tiba di kota Madinah. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca ketika tiba/memasuki kota Madinah.',
    waktu: 'Saat tiba di kota Madinah.',
  },
  {
    id: 'madinah-masuk-nabawi',
    kategori: 'madinah',
    judul: 'Doa Masuk Masjid Nabawi (Melalui Babussalam)',
    arab: 'بِسْمِ اللهِ وَعَلَى مِلَّةِ رَسُوْلِ اللهِ، رَبِّ أَدْخِلْنِيْ مُدْخَلَ صِدْقٍ وَأَخْرِجْنِيْ مُخْرَجَ صِدْقٍ وَاجْعَلْ لِيْ مِنْ لَدُنْكَ سُلْطَانًا نَصِيْرًا. اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، وَاغْفِرْ لِيْ ذُنُوْبِيْ وَافْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ وَأَدْخِلْنِيْ فِيْهَا يَا أَرْحَمَ الرَّاحِمِيْنَ',
    latin: "Bismillaahi wa 'alaa millati rosuulillah, robbi adkhilnii mudkhola shidqin wa akhrijnii mukhroja shidqin waj'al lii min ladunka sulthoonan nashiiroo. Allaahumma sholli 'alaa sayyidinaa muhammadin wa 'alaa aali sayyidinaa muhammad, waghfir lii dzunuubii waftah lii abwaaba rohmatika wa adkhilnii fiihaa yaa arhamar-roohimiin",
    terjemahan: 'Dengan menyebut nama Allah, dan atas agama Rasulullah. Ya Tuhan, masukkanlah aku dengan masuk yang benar dan keluarkanlah pula aku dengan keluar yang benar dan berikanlah padaku dari sisi-Mu kekuasaan yang menolong. Ya Allah, sampaikanlah shalawat kepada junjungan kami Muhammad dan atas keluarganya, dan ampunilah dosaku, bukakanlah pintu rahmat-Mu bagiku dan masukkanlah aku ke dalamnya, Wahai Tuhan Yang Maha Pengasih dari segenap pengasih.',
    arti: 'Doa saat memasuki Masjid Nabawi, sebaiknya melalui pintu Babussalam dengan kaki kanan.',
    dalil: 'Doa masuk Masjid Nabawi melalui Babussalam. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca saat masuk Masjid Nabawi, dahulukan kaki kanan, dianjurkan lewat Babussalam.',
    waktu: 'Saat memasuki Masjid Nabawi di Madinah.',
  },
  {
    id: 'madinah-ziarah-rasulullah',
    kategori: 'madinah',
    judul: 'Salam & Ziarah di Makam Rasulullah SAW',
    arab: 'اَلسَّلاَمُ عَلَيْكَ يَا رَسُوْلَ اللهِ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ. اَلسَّلاَمُ عَلَيْكَ يَا نَبِيَّ اللهِ. اَلسَّلاَمُ عَلَيْكَ يَا صَفْوَةَ اللهِ. اَلسَّلاَمُ عَلَيْكَ يَا حَبِيْبَ اللهِ. أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ وَأَنَّكَ عَبْدَهُ وَرَسُوْلُهُ، وَأَشْهَدُ أَنَّكَ بَلَّغْتَ الرِّسَالَةَ وَأَدَّيْتَ الْأَمَانَةَ وَنَصَحْتَ الْأُمَّةَ وَجَاهَدْتَ فِيْ سَبِيْلِ اللهِ فَصَلَّى اللهُ عَلَيْكَ صَلاَةً دَائِمَةً إِلَى يَوْمِ الدِّيْنِ',
    latin: "Assalaamu 'alaika yaa rosuulallaahi wa rohmatullaahi wa barokaatuhu. Assalaamu 'alaika yaa nabiyyallaahi. Assalaamu 'alaika yaa shofwatallaahi. Assalaamu 'alaika yaa habiiballaahi. Asyhadu an laa ilaaha illallaahu wahdahu laa syariika lahu wa annaka 'abdahu wa rosuuluhu, wa asyhadu annaka ballaghtar-risaalata wa addaital-amaanata wa nashahtal-ummata wa jaahadta fii sabiilillaahi fashollallaahu 'alaika sholaatan daa-imatan ilaa yaumid-diin",
    terjemahan: 'Salam sejahtera atasmu wahai Rasulullah, rahmat Allah dan berkah-Nya untukmu. Salam sejahtera atasmu wahai Nabiyullah. Salam sejahtera atasmu wahai makhluk pilihan Allah. Salam sejahtera atasmu wahai kekasih Allah. Aku bersaksi bahwa tiada Tuhan yang berhak disembah selain Allah satu-satunya, tiada sekutu bagi-Nya, dan sesungguhnya engkau hamba dan utusan-Nya. Dan aku bersaksi bahwa engkau telah menyampaikan risalah, menunaikan amanat, memberi nasihat kepada umat, dan berjihad di jalan Allah. Maka shalawat yang abadi untukmu sampai hari kiamat.',
    arti: 'Salam dan kesaksian saat berziarah ke makam Rasulullah SAW di Masjid Nabawi.',
    dalil: 'Doa dan salam ziarah di makam Rasulullah SAW. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca dengan adab dan suara lembut saat menghadap makam Rasulullah SAW.',
    waktu: 'Saat ziarah ke makam Rasulullah SAW di Madinah.',
  },
  {
    id: 'madinah-ziarah-abu-bakar',
    kategori: 'madinah',
    judul: 'Salam & Ziarah di Makam Abu Bakar Ash-Shiddiq RA',
    arab: 'اَلسَّلاَمُ عَلَيْكَ يَا خَلِيْفَةَ رَسُوْلِ اللهِ، اَلسَّلاَمُ عَلَيْكَ يَا صَاحِبَ رَسُوْلِ اللهِ فِي الْغَارِ، جَزَاكَ اللهُ عَنْ أُمَّةِ رَسُوْلِ اللهِ خَيْرَ الْجَزَاءِ، فَالسَّلاَمُ عَلَيْكَ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    latin: "Assalaamu 'alaika yaa kholiifata rosuulillaahi, assalaamu 'alaika yaa shoohiba rosuulillaahi fil-ghoori, jazaakallaahu 'an ummati rosuulillaahi khoirol-jazaa-i, fassalaamu 'alaika wa rohmatullaahi wa barokaatuhu",
    terjemahan: 'Salam sejahtera atasmu wahai khalifah Rasulullah. Salam sejahtera atasmu wahai sahabat Rasulullah di dalam gua. Semoga Allah membalasmu dari umat Rasulullah dengan sebaik-baik balasan. Maka salam sejahtera, rahmat Allah dan berkah-Nya untukmu.',
    arti: 'Salam saat berziarah ke makam Abu Bakar Ash-Shiddiq RA yang bersebelahan dengan makam Rasulullah.',
    dalil: 'Doa dan salam ziarah di makam Abu Bakar Ash-Shiddiq RA. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca saat menghadap makam Abu Bakar RA.',
    waktu: 'Saat ziarah makam Abu Bakar RA di Madinah.',
  },
  {
    id: 'madinah-ziarah-umar',
    kategori: 'madinah',
    judul: 'Salam & Ziarah di Makam Umar bin Khattab RA',
    arab: 'اَلسَّلاَمُ عَلَيْكَ يَا مُظْهِرَ الْإِسْلاَمِ، اَلسَّلاَمُ عَلَيْكَ يَا فَارُوْقُ، اَلسَّلاَمُ عَلَيْكَ يَا مَنْ نَطَقَتْ بِالصَّوَابِ وَكَفَلْتَ الْأَيْتَامَ وَوَصَلْتَ الْأَرْحَامَ وَقَوِيَ بِكَ الْإِسْلاَمُ. اَلسَّلاَمُ عَلَيْكَ وَرَحْمَةُ اللهِ',
    latin: "Assalaamu 'alaika yaa muzhhirol-islaami, assalaamu 'alaika yaa faaruuqu, assalaamu 'alaika yaa man nathaqat bish-shawaabi wa kafaltal-aytaama wa washaltal-arhaama wa qawiya bikal-islaamu. Assalaamu 'alaika wa rohmatullaahi",
    terjemahan: 'Salam sejahtera atasmu wahai penyebar Islam. Salam sejahtera atasmu wahai Al-Faruq (pembeda antara hak dan batil). Salam sejahtera atasmu wahai orang yang senantiasa berkata benar, menjamin anak yatim, menyambung silaturahmi, dan dengan dirimu Islam menjadi kuat. Salam sejahtera dan rahmat Allah atasmu.',
    arti: 'Salam saat berziarah ke makam Umar bin Khattab RA.',
    dalil: 'Doa dan salam ziarah di makam Umar bin Khattab RA. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca saat menghadap makam Umar bin Khattab RA.',
    waktu: 'Saat ziarah makam Umar bin Khattab RA di Madinah.',
  },
  {
    id: 'madinah-ziarah-baqi',
    kategori: 'madinah',
    judul: "Salam Ziarah di Pemakaman Baqi'",
    arab: 'اَلسَّلاَمُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِيْنَ، وَأَتَاكُمْ مَا تُوْعَدُوْنَ غَدًا مُؤَجَّلِيْنَ، وَإِنَّا إِنْ شَاءَ اللهُ بِكُمْ لاَحِقُوْنَ. اَللَّهُمَّ اغْفِرْ لِأَهْلِ بَقِيْعِ الْغَرْقَدِ',
    latin: "Assalaamu 'alaikum daara qaumim mu'miniina, wa ataakum maa tuu'aduuna ghadan mu'ajjaliina wa innaa in syaa-allaahu bikum laahiquun. Allaahummaghfir li-ahli baqii'il-gharqadi",
    terjemahan: "Salam sejahtera atas kamu wahai (penghuni) tempat kaum yang beriman. Apa yang dijanjikan kepadamu yang masih ditangguhkan besok, pasti akan datang kepadamu, dan kami Insya Allah akan menyusulmu. Ya Allah, ampunilah ahli Baqi' al-Gharqad.",
    arti: "Salam saat berziarah ke pemakaman Baqi', tempat dimakamkannya banyak sahabat dan keluarga Nabi.",
    dalil: "Doa salam ziarah di pemakaman Baqi'. Sumber: Panduan Manasik Umrah.",
    cara: "Dibaca saat menghadap pemakaman Baqi'.",
    waktu: "Saat ziarah ke pemakaman Baqi' di Madinah.",
  },
  {
    id: 'madinah-ziarah-syuhada-uhud',
    kategori: 'madinah',
    judul: 'Doa & Salam kepada Para Syuhada Uhud',
    arab: 'اَلسَّلاَمُ عَلَيْكُمْ يَا شُهَدَاءِ أُحُدٍ. اَللَّهُمَّ اجْزِهِمْ عَنِ الْإِسْلاَمِ وَأَهْلَهُ أَفْضَلَ الْجَزَاءِ وَارْفَعْ دَرَجَاتِهِمْ وَأَكْرِمْ مَقَامَهُمْ بِفَضْلِكَ وَكَرَمِكَ يَا أَكْرَمَ الْأَكْرَمِيْنَ',
    latin: "Assalaamu 'alaikum yaa syuhadaa-i uhudin. Allaahummajzihim 'anil-islaami wa ahlahu afdholal-jazaa-i warfa' darajaatihim wa akrim maqaamahum bifadhlika wa karomika yaa akromal-akromiin",
    terjemahan: 'Salam sejahtera atasmu wahai para syuhada Uhud. Ya Allah, berilah mereka semua ganjaran karena Islam dan para pemeluknya dengan ganjaran yang paling utama, dan tinggikanlah derajat mereka dan muliakanlah kedudukan mereka dengan keagungan-Mu dan kemurahan-Mu, wahai Tuhan Yang Paling Pemurah.',
    arti: 'Salam dan doa untuk para syuhada Perang Uhud, termasuk Hamzah bin Abdul Muthalib RA.',
    dalil: 'Doa dan salam kepada para syuhada Uhud. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca saat ziarah ke makam para syuhada di Uhud.',
    waktu: 'Saat ziarah ke Jabal Uhud / makam syuhada Uhud.',
  },
  {
    id: 'madinah-meninggalkan-kota',
    kategori: 'madinah',
    judul: 'Doa Meninggalkan Kota Madinah',
    arab: 'اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ وَلاَ تَجْعَلْهُ آخِرَ الْعَهْدِ بِنَبِيِّكَ، وَحُطَّ أَوْزَارِيْ بِزِيَارَتِهِ وَأَصْحِبْنِيْ فِيْ سَفَرِي السَّلاَمَةَ وَيَسِّرْ رُجُوْعِيْ إِلَى أَهْلِيْ وَوَطَنِيْ سَالِمًا يَا أَرْحَمَ الرَّاحِمِيْنَ',
    latin: "Allaahumma sholli 'alaa muhammadin wa 'alaa aali muhammadin wa laa taj'alhu aakhirol-'ahdi binabiyyika, wa huththo awzaarii biziyaaratihi wa ash-hibnii fii safaris-salaamata wa yassir rujuu'ii ilaa ahlii wa wathonii saaliman yaa arhamar-roohimiin",
    terjemahan: 'Ya Allah, sampaikanlah shalawat kepada Muhammad dan keluarganya, dan jangan Engkau jadikan ini akhir kesempatan (berziarah) kepada Nabi-Mu, dan hapuskanlah dosa-dosaku dengan ziarah ini, dan sertailah keselamatan dalam perjalananku dan mudahkanlah kepulanganku kepada keluarga dan tanah airku dengan selamat, wahai Tuhan Yang Maha Pengasih dari segenap pengasih.',
    arti: 'Doa saat hendak meninggalkan kota Madinah, memohon agar bukan ziarah terakhir dan keselamatan perjalanan.',
    dalil: 'Doa meninggalkan kota Madinah. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca ketika hendak meninggalkan Madinah menuju Makkah.',
    waktu: 'Saat akan meninggalkan kota Madinah.',
  },
];

// ============================================================================
// BAGIAN 3 — IHRAM 
// ============================================================================

export const doaIhram: Doa[] = [
  {
    id: 'ihram-niat-mandi',
    kategori: 'ihram',
    judul: 'Niat Mandi Sunnah untuk Ihram',
    arab: 'نَوَيْتُ غُسْلَ الْإِحْرَامِ لِلّٰهِ تَعَالَى',
    latin: "Nawaitu ghuslal-ihroomi lillaahi ta'aalaa",
    terjemahan: "Aku niat mandi untuk ihram karena Allah Ta'ala.",
    arti: 'Niat mandi sunnah sebelum mengenakan pakaian ihram dan berniat umrah.',
    dalil: 'Niat mandi sunnah untuk ihram. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca sebagai niat sebelum mandi sunnah ihram di miqat.',
    waktu: 'Sebelum mengenakan pakaian ihram di miqat.',
  },
  {
    id: 'ihram-doa-setelah-pakai',
    kategori: 'ihram',
    judul: 'Doa Sesudah Memakai Pakaian Ihram',
    arab: 'اَللَّهُمَّ أُحَرِّمُ شَعْرِيْ وَبَشَرِيْ وَجَسَدِيْ وَجَمِيْعَ جَوَارِحِيْ مِنْ كُلِّ شَيْءٍ حَرَّمْتَهُ عَلَى الْمُحْرِمِ أَبْتَغِيْ بِذَالِكَ وَجْهَكَ الْكَرِيْمَ يَا رَبَّ الْعَالَمِيْنَ',
    latin: "Allaahumma uharrimu sya'rii wa basyarii wa jasadii wa jamii'a jawaarihii min kulli syai-in harromtahu 'alal-muhrimi abtaghii bidzaalika wajhakal-kariima yaa robbal-'aalamiin",
    terjemahan: 'Ya Allah aku haramkan rambut, kulit, tubuh dan seluruh anggota tubuhku dari semua yang Kau haramkan bagi seorang yang sedang berihram, demi mengharapkan dari-Mu semata, wahai Tuhan pemelihara alam semesta.',
    arti: 'Doa setelah mengenakan pakaian ihram, menegaskan komitmen menjauhi larangan ihram.',
    dalil: 'Doa sesudah memakai pakaian ihram. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca setelah mengenakan pakaian ihram.',
    waktu: 'Setelah memakai pakaian ihram, sebelum niat umrah.',
  },
  {
    id: 'ihram-niat-shalat-ihram',
    kategori: 'ihram',
    judul: 'Niat Shalat Sunnah Ihram',
    arab: 'أُصَلِّيْ سُنَّةَ الْإِحْرَامِ رَكْعَتَيْنِ لِلّٰهِ تَعَالَى',
    latin: "Usholli sunnatal-ihroomi rok'ataini lillaahi ta'aalaa. Allaahu akbar",
    terjemahan: "Aku niat shalat sunnah ihram dua rakaat karena Allah Ta'ala.",
    arti: 'Niat shalat sunnah dua rakaat sebelum berihram untuk umrah.',
    dalil: 'Niat shalat sunnah ihram. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca sebagai niat shalat sunnah dua rakaat ihram.',
    waktu: 'Sebelum berniat ihram umrah di miqat.',
  },
  {
    id: 'ihram-niat-umrah',
    kategori: 'ihram',
    judul: 'Niat Umrah',
    arab: 'لَبَّيْكَ اللّٰهُمَّ عُمْرَةً',
    latin: "Labbaikallaahumma 'umrotan",
    terjemahan: 'Aku sambut panggilan-Mu ya Allah untuk umrah.',
    arti: 'Niat memulai ibadah umrah, menandai dimulainya rangkaian ihram untuk umrah.',
    dalil: "Niat umrah (Labbaikallaahumma umratan). Sumber: Panduan Manasik Umrah.",
    cara: "Diucapkan saat berniat memulai umrah di miqat. Boleh juga dengan lafaz: \"Nawaitul-'umrota wa ahromtu bihaa lillaahi ta'aalaa\".",
    waktu: 'Di miqat, saat memulai ihram untuk umrah.',
  },
  {
    id: 'ihram-talbiyah',
    kategori: 'ihram',
    judul: 'Bacaan Talbiyah',
    arab: 'لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيْكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لاَ شَرِيْكَ لَكَ',
    latin: "Labbaikallaahumma labbaik, labbaika laa syariika laka labbaik, innal-hamda wanni'mata laka wal-mulka laa syariika lak",
    terjemahan: 'Aku datang memenuhi panggilan-Mu Ya Allah, aku datang memenuhi panggilan-Mu, aku datang memenuhi panggilan-Mu, tidak ada sekutu bagi-Mu, aku datang memenuhi panggilan-Mu. Sesungguhnya pujian, kemuliaan dan segenap kekuasaan adalah milik-Mu, tidak ada sekutu bagi-Mu.',
    arti: 'Seruan penyerahan diri kepada Allah yang diucapkan terus-menerus selama ihram.',
    dalil: 'Bacaan talbiyah (muttafaq alaih, dari hadis Ibnu Umar RA). Sumber: Panduan Manasik Umrah.',
    cara: 'Diperbanyak sejak berihram hingga menjelang tawaf, dengan suara lantang bagi laki-laki.',
    waktu: 'Sejak niat ihram hingga sebelum memulai tawaf.',
  },
  {
    id: 'ihram-shalawat-nabi',
    kategori: 'harian',
    judul: 'Shalawat Nabi',
    arab: 'اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    latin: "Allaahumma sholli 'alaa muhammadin wa 'alaa aali muhammad",
    terjemahan: 'Ya Allah, berilah karunia kesejahteraan atas Nabi Muhammad, dan juga atas keluarga Nabi Muhammad.',
    arti: 'Shalawat ringkas yang dianjurkan diperbanyak, terutama setelah talbiyah.',
    dalil: 'Shalawat Nabi. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca memperbanyak shalawat, dianjurkan setelah talbiyah.',
    waktu: 'Kapan saja, dianjurkan diperbanyak selama perjalanan ibadah.',
  },
];

// ============================================================================
// BAGIAN 4 — MAKKAH & MASJIDIL HARAM 
// ============================================================================

export const doaMakkah: Doa[] = [
  {
    id: 'makkah-masuk-kota',
    kategori: 'makkah',
    judul: 'Doa Ketika Masuk Kota Makkah',
    arab: 'اَللَّهُمَّ هٰذَا حَرَمُكَ وَأَمْنُكَ فَحَرِّمْ لَحْمِيْ وَدَمِيْ وَشَعْرِيْ وَبَشَرِيْ عَلَى النَّارِ وَآمِنِّيْ مِنْ عَذَابِكَ يَوْمَ تَبْعَثُ عِبَادَكَ وَاجْعَلْنِيْ مِنْ أَوْلِيَائِكَ وَأَهْلِ طَاعَتِكَ',
    latin: "Allaahumma haadzaa haromuka wa amnuka faharrim lahmii wa damii wa sya'rii wa basyarii 'alannaari wa aaminnii min 'adzaabika yauma tab'atsu 'ibaadaka waj'alnii min auliyaa-ika wa ahli thoo'atika",
    terjemahan: 'Ya Allah, kota ini adalah kota haram-Mu dan tempat aman-Mu, maka hindarkanlah daging, darah, rambut dan kulitku dari api neraka. Dan selamatkanlah diriku dari siksa-Mu pada hari Engkau membangkitkan hamba-hamba-Mu, dan jadikanlah aku termasuk orang-orang yang selalu dekat (menjadi wali-Mu) dan taat kepada-Mu.',
    arti: 'Doa saat memasuki kota Makkah, memohon perlindungan dari neraka dan dijadikan hamba yang taat.',
    dalil: 'Doa ketika masuk kota Makkah. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca ketika memasuki kota Makkah.',
    waktu: 'Saat tiba/memasuki kota Makkah.',
  },
  {
    id: 'makkah-masuk-masjidil-haram',
    kategori: 'makkah',
    judul: 'Doa Masuk Masjidil Haram',
    arab: 'اَللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ وَإِلَيْكَ يَعُوْدُ السَّلاَمُ فَحَيِّنَا رَبَّنَا بِالسَّلاَمِ وَأَدْخِلْنَا الْجَنَّةَ دَارَ السَّلاَمِ تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ يَا ذَا الْجَلاَلِ وَالْإِكْرَامِ. اَللَّهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ. بِسْمِ اللهِ وَالْحَمْدُ لِلّٰهِ وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُوْلِ اللهِ',
    latin: "Allaahumma antas-salaamu wa minkas-salaamu wa ilaika ya'uudus-salaamu fahayyinaa robbanaa bis-salaami wa adkhilnal-jannata daaros-salaami tabaarokta robbanaa wa ta'aalaita yaa dzal-jalaali wal-ikroom. Allaahummaftah lii abwaaba rohmatika. Bismillaahi wal-hamdu lillaahi wash-sholaatu was-salaamu 'alaa rosuulillaah",
    terjemahan: 'Ya Allah, Engkau sumber keselamatan dan dari pada-Mulah datangnya keselamatan dan kepada-Mu kembalinya keselamatan. Maka hidupkanlah kami wahai Tuhan, dengan selamat sejahtera dan masukkanlah ke dalam surga negeri keselamatan. Maha banyak anugerah-Mu dan Maha Tinggi Engkau, Wahai Tuhan yang memiliki keagungan dan kehormatan. Ya Allah bukakanlah untukku pintu rahmat-Mu. Dengan nama Allah disertai dengan segala puji bagi Allah serta shalawat dan salam untuk Rasulullah.',
    arti: 'Doa saat memasuki Masjidil Haram, dahulukan kaki kanan.',
    dalil: 'Doa masuk Masjidil Haram. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca saat masuk Masjidil Haram, dengan mendahulukan kaki kanan.',
    waktu: 'Saat memasuki Masjidil Haram.',
  },
  {
    id: 'makkah-melihat-kabah',
    kategori: 'makkah',
    judul: "Doa Ketika Melihat Ka'bah",
    arab: 'اَللّٰهُمَّ زِدْ هٰذَا الْبَيْتَ تَشْرِيْفًا وَتَعْظِيْمًا وَتَكْرِيْمًا وَمَهَابَةً وَزِدْ مَنْ شَرَّفَهُ وَعَظَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيْفًا وَتَعْظِيْمًا وَتَكْرِيْمًا وَبِرًّا',
    latin: "Allaahumma zid haadzal-baita tasyriifan wa ta'zhiiman wa takriiman wa mahaabatan wa zid man syarrofahu wa 'azhzhomahu mimman hajjahu awi'tamarohu tasyriifan wa ta'zhiiman wa takriiman wa birron",
    terjemahan: "Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan dan wibawa pada Bait (Ka'bah) ini. Dan tambahkanlah pula pada orang-orang yang memuliakan, mengagungkan dan menghormatinya di antara mereka yang berhaji atau yang berumrah dengan kemuliaan, keagungan, kehormatan dan kebaikan.",
    arti: "Doa saat pertama kali melihat Ka'bah, momen mustajab untuk berdoa.",
    dalil: "Doa ketika melihat Ka'bah. Sebagian riwayat doa ini diperselisihkan kesahihan sanadnya, namun lafaznya masyhur diamalkan. Sumber: Panduan Manasik Umrah.",
    cara: "Dibaca saat pandangan pertama tertuju pada Ka'bah; perbanyak doa pribadi karena ini waktu mustajab.",
    waktu: "Saat pertama kali melihat Ka'bah.",
    perluVerifikasi: true,
  },
  {
    id: 'makkah-melintasi-maqam-ibrahim',
    kategori: 'makkah',
    judul: 'Doa Ketika Melintasi Maqam Ibrahim',
    arab: 'رَبِّ أَدْخِلْنِيْ مُدْخَلَ صِدْقٍ وَأَخْرِجْنِيْ مُخْرَجَ صِدْقٍ وَاجْعَلْ لِيْ مِنْ لَدُنْكَ سُلْطَانًا نَصِيْرًا. وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ إِنَّ الْبَاطِلَ كَانَ زَهُوْقًا',
    latin: "Robbi adkhilnii mudkhola shidqin wa akhrijnii mukhroja shidqin waj'al lii min ladunka sulthoonan nashiiroo. Wa qul jaa-al-haqqu wa zahaqol-baathilu innal-baathila kaana zahuuqoo",
    terjemahan: 'Ya Tuhanku, masukkanlah aku dengan cara masuk yang benar dan keluarkanlah aku dengan cara keluar yang benar, dan berikanlah kepadaku dari sisi-Mu kekuasaan yang menolong. Dan katakanlah: Yang benar telah datang dan yang batil telah lenyap. Sesungguhnya yang batil itu pasti lenyap.',
    arti: 'Doa saat melewati Maqam Ibrahim (berdasarkan QS. Al-Isra: 80-81).',
    dalil: 'Doa ketika melintasi Maqam Ibrahim. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca ketika melintasi/mendekati Maqam Ibrahim.',
    waktu: 'Saat melintasi Maqam Ibrahim.',
  },
];

// ============================================================================
// BAGIAN 5 — TAWAF 
// Doa per putaran dibaca dari Hajar Aswad sampai Rukun Yamani. Di antara Rukun
// Yamani dan Hajar Aswad dibaca doa "Rabbana atina..." (lihat tawaf-rabbana-atina).
// ============================================================================

export const doaTawaf: Doa[] = [
  {
    id: 'tawaf-niat',
    kategori: 'tawaf',
    judul: 'Ketika Memulai Tawaf (di Hajar Aswad)',
    arab: 'بِسْمِ اللهِ اللهُ أَكْبَرُ',
    latin: 'Bismillaahi, Allaahu akbar',
    terjemahan: 'Dengan nama Allah, Allah Maha Besar.',
    arti: "Bacaan saat memulai tawaf, menghadap Hajar Aswad sambil mengangkat tangan, lalu bergerak dengan posisi Ka'bah di sebelah kiri.",
    dalil: 'Bacaan memulai tawaf di Hajar Aswad. Sumber: Panduan Manasik Umrah.',
    cara: "Berdiri menghadap Hajar Aswad, angkat tangan, ucapkan 'Bismillaahi Allaahu akbar', lalu mulai tawaf dengan Ka'bah di sebelah kiri.",
    waktu: 'Saat memulai setiap putaran dari titik Hajar Aswad.',
  },
  {
    id: 'tawaf-putaran-1',
    kategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-1',
    arab: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلّٰهِ وَلاَ إِلَهَ إِلاَّ اللهُ وَاللهُ أَكْبَرُ وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ الْعَلِيِّ الْعَظِيْمِ. وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُوْلِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ. اَللَّهُمَّ إِيْمَانًا بِكَ وَتَصْدِيْقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ وَحَبِيْبِكَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ',
    latin: "Subhaanallaahi wal-hamdu lillaahi wa laa ilaaha illallaahu wallaahu akbar wa laa hawla wa laa quwwata illaa billaahil-'aliyyil-'azhiim. Wash-sholaatu was-salaamu 'alaa rosuulillaahi shollallaahu 'alaihi wasallam. Allaahumma iimaanan bika wa tashdiiqon bikitaabika wa wafaa-an bi'ahdika wattibaa'an lisunnati nabiyyika wa habiibika muhammadin shollallaahu 'alaihi wasallam",
    terjemahan: 'Maha suci Allah, segala puji bagi Allah, tiada Tuhan selain Allah, Allah Maha Besar, tiada daya dan kekuatan selain dengan kuasa Allah Yang Maha Tinggi lagi Maha Agung. Shalawat dan salam atas Rasulullah SAW. Ya Allah, (aku bertawaf) karena beriman kepada-Mu, membenarkan kitab-Mu, memenuhi janji-Mu dan mengikuti sunnah nabi-Mu, Muhammad SAW.',
    arti: 'Doa putaran pertama tawaf, menegaskan tauhid dan niat mengikuti sunnah Nabi.',
    dalil: 'Bacaan tawaf putaran ke-1, dibaca dari Hajar Aswad sampai Rukun Yamani. Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca sambil mengelilingi Ka'bah dari Hajar Aswad menuju Rukun Yamani.",
    waktu: 'Tawaf, putaran ke-1.',
  },
  {
    id: 'tawaf-putaran-2',
    kategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-2',
    arab: 'اَللّٰهُمَّ إِنَّ هٰذَا الْبَيْتَ بَيْتُكَ وَالْحَرَمَ حَرَمُكَ وَالْأَمْنَ أَمْنُكَ وَالْعَبْدَ عَبْدُكَ وَأَنَا عَبْدُكَ وَابْنُ عَبْدِكَ وَهٰذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ. فَحَرِّمْ لُحُوْمَنَا وَبَشَرَتَنَا عَلَى النَّارِ. اَللَّهُمَّ حَبِّبْ إِلَيْنَا الْإِيْمَانَ وَزَيِّنْهُ فِيْ قُلُوْبِنَا وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوْقَ وَالْعِصْيَانَ وَاجْعَلْنَا مِنَ الرَّاشِدِيْنَ',
    latin: "Allaahumma inna haadzal-baita baituka wal-haroma haromuka wal-amna amnuka wal-'abda 'abduka wa anaa 'abduka wabnu 'abdika wa haadzaa maqaamul-'aa-idzi bika minannaari faharrim luhuumanaa wa basyarotanaa 'alannaar. Allaahumma habbib ilainal-iimaana wa zayyinhu fii quluubinaa wa karrih ilainal-kufro wal-fusuuqo wal-'ishyaana waj'alnaa minar-roosyidiin",
    terjemahan: "Ya Allah, sesungguhnya bait ini adalah rumah-Mu, tanah mulia ini adalah tanah haram-Mu, negeri yang aman ini adalah negeri-Mu, hamba ini adalah hamba-Mu, aku hamba-Mu dan anak hamba-Mu, dan tempat ini adalah tempat orang berlindung pada-Mu dari api neraka. Maka haramkanlah daging dan kulit kami dari api neraka. Ya Allah, cintakanlah kami pada iman dan hiaskanlah ia di hati kami, dan bencikanlah kami pada kekufuran, kefasikan dan kemaksiatan, serta jadikanlah kami termasuk orang-orang yang mendapat petunjuk.",
    arti: "Doa putaran kedua, mengakui Ka'bah sebagai rumah Allah dan memohon dijauhkan dari neraka.",
    dalil: 'Bacaan tawaf putaran ke-2, dibaca dari Hajar Aswad sampai Rukun Yamani. Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca sambil mengelilingi Ka'bah dari Hajar Aswad menuju Rukun Yamani.",
    waktu: 'Tawaf, putaran ke-2.',
  },
  {
    id: 'tawaf-putaran-3',
    kategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-3',
    arab: 'اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَالشِّقَاقِ وَالنِّفَاقِ وَسُوْءِ الْأَخْلاَقِ وَسُوْءِ الْمَنْظَرِ وَالْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ وَالْوَلَدِ. اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ وَأَعُوْذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ. اَللَّهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ فِتْنَةِ الْقَبْرِ وَأَعُوْذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ',
    latin: "Allaahumma innii a'uudzu bika minasy-syakki wasy-syirki wasy-syiqooqi wan-nifaaqi wa suu-il-akhlaaqi wa suu-il-manzhori wal-munqolabi fil-maali wal-ahli wal-walad. Allaahumma innii as-aluka ridhooka wal-jannata wa a'uudzu bika min sakhothika wannaar. Allaahumma innii a'uudzu bika min fitnatil-qobri wa a'uudzu bika min fitnatil-mahyaa wal-mamaat",
    terjemahan: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari keraguan, syirik, cerai-berai, kemunafikan, buruk budi pekerti, buruk penampilan dan salah urus terhadap harta benda, keluarga dan anak. Ya Allah, sesungguhnya aku mohon kepada-Mu ridha-Mu dan surga, dan aku berlindung kepada-Mu dari murka-Mu dan api neraka. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari fitnah kubur dan aku berlindung kepada-Mu dari fitnah kehidupan dan kematian.',
    arti: 'Doa putaran ketiga, memohon perlindungan dari berbagai keburukan dan fitnah dunia-akhirat.',
    dalil: 'Bacaan tawaf putaran ke-3, dibaca dari Hajar Aswad sampai Rukun Yamani. Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca sambil mengelilingi Ka'bah dari Hajar Aswad menuju Rukun Yamani.",
    waktu: 'Tawaf, putaran ke-3.',
  },
  {
    id: 'tawaf-putaran-4',
    kategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-4',
    arab: 'اَللّٰهُمَّ اجْعَلْهُ حَجًّا مَبْرُوْرًا وَسَعْيًا مَشْكُوْرًا وَذَنْبًا مَغْفُوْرًا وَعَمَلاً صَالِحًا مَقْبُوْلاً وَتِجَارَةً لَنْ تَبُوْرَ. يَا عَالِمَ مَا فِي الصُّدُوْرِ أَخْرِجْنِيْ يَا اللهُ مِنَ الظُّلُمَاتِ إِلَى النُّوْرِ. اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ مُوْجِبَاتِ رَحْمَتِكَ وَعَزَائِمَ مَغْفِرَتِكَ وَالسَّلاَمَةَ مِنْ كُلِّ إِثْمٍ وَالْغَنِيْمَةَ مِنْ كُلِّ بِرٍّ وَالْفَوْزَ بِالْجَنَّةِ وَالنَّجَاةَ مِنَ النَّارِ',
    latin: "Allaahummaj'alhu hajjan mabruuron wa sa'yan masykuuron wa dzanban maghfuuron wa 'amalan shoolihan maqbuulan wa tijaarotan lan tabuur. Yaa 'aalima maa fish-shuduuri akhrijnii yaallaahu minazh-zhulumaati ilan-nuur. Allaahumma innii as-aluka muujibaati rohmatika wa 'azaa-ima maghfirotika was-salaamata min kulli itsmin wal-ghoniimata min kulli birrin wal-fauza bil-jannati wannajaata minannaar",
    terjemahan: "Ya Allah, jadikanlah ibadah ini haji yang mabrur, sa'i yang diterima, dosa yang diampuni, amal shaleh yang diterima dan usaha yang tidak akan merugi. Wahai Tuhan Yang Maha Mengetahui apa yang ada dalam hati, keluarkanlah aku ya Allah dari kegelapan menuju cahaya. Ya Allah, aku mohon kepada-Mu segala yang mendatangkan rahmat-Mu, keteguhan ampunan-Mu, selamat dari segala dosa, beruntung dengan segala kebaikan, beruntung memperoleh surga dan selamat dari neraka.",
    arti: 'Doa putaran keempat, memohon ibadah yang mabrur dan keberuntungan dunia-akhirat.',
    dalil: 'Bacaan tawaf putaran ke-4, dibaca dari Hajar Aswad sampai Rukun Yamani. Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca sambil mengelilingi Ka'bah dari Hajar Aswad menuju Rukun Yamani.",
    waktu: 'Tawaf, putaran ke-4.',
  },
  {
    id: 'tawaf-putaran-5',
    kategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-5',
    arab: 'اَللّٰهُمَّ أَظِلَّنِيْ تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لاَ ظِلَّ إِلاَّ ظِلُّكَ وَلاَ بَاقِيَ إِلاَّ وَجْهُكَ وَاسْقِنِيْ مِنْ حَوْضِ نَبِيِّكَ سَيِّدِنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ شَرْبَةً هَنِيْئَةً مَرِيْئَةً لاَ أَظْمَأُ بَعْدَهَا أَبَدًا',
    latin: "Allaahumma azhillanii tahta zhilli 'arsyika yauma laa zhilla illaa zhilluka wa laa baaqiya illaa wajhuka wasqinii min haudhi nabiyyika sayyidinaa muhammadin shollallaahu 'alaihi wasallama syarbatan hanii-atan marii-atan laa azhma-u ba'dahaa abadaa",
    terjemahan: "Ya Allah, lindungilah aku di bawah naungan 'Arsy-Mu pada hari yang tidak ada naungan selain naungan-Mu, dan tidak ada yang kekal selain wajah-Mu. Dan berilah aku minum dari telaga Nabi-Mu, junjungan kami Muhammad SAW, dengan suatu minuman yang lezat, segar dan nyaman, yang setelah itu aku tidak akan haus selamanya.",
    arti: "Doa putaran kelima, memohon naungan 'Arsy di hari kiamat dan minum dari telaga Nabi.",
    dalil: 'Bacaan tawaf putaran ke-5, dibaca dari Hajar Aswad sampai Rukun Yamani. Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca sambil mengelilingi Ka'bah dari Hajar Aswad menuju Rukun Yamani.",
    waktu: 'Tawaf, putaran ke-5.',
  },
  {
    id: 'tawaf-putaran-6',
    kategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-6',
    arab: 'اَللّٰهُمَّ إِنَّ لَكَ عَلَيَّ حُقُوْقًا كَثِيْرَةً فِيْمَا بَيْنِيْ وَبَيْنَكَ وَحُقُوْقًا كَثِيْرَةً فِيْمَا بَيْنِيْ وَبَيْنَ خَلْقِكَ. اَللَّهُمَّ مَا كَانَ لَكَ مِنْهَا فَاغْفِرْهُ لِيْ وَمَا كَانَ لِخَلْقِكَ فَتَحَمَّلْهُ عَنِّيْ وَأَغْنِنِيْ بِحَلاَلِكَ عَنْ حَرَامِكَ وَبِطَاعَتِكَ عَنْ مَعْصِيَتِكَ وَبِفَضْلِكَ عَمَّنْ سِوَاكَ يَا وَاسِعَ الْمَغْفِرَةِ',
    latin: "Allaahumma inna laka 'alayya huquuqon katsiirotan fiimaa bainii wa bainaka wa huquuqon katsiirotan fiimaa bainii wa baina kholqika. Allaahumma maa kaana laka minhaa faghfirhu lii wa maa kaana likholqika fatahammalhu 'annii wa aghninii bihalaalika 'an haroomika wa bithoo'atika 'an ma'shiyatika wa bifadhlika 'amman siwaaka yaa waasi'al-maghfiroh",
    terjemahan: 'Ya Allah, sesungguhnya Engkau memiliki banyak hak atas diriku dalam hubungan antara aku dengan-Mu, dan banyak hak dalam hubungan antara aku dengan makhluk-Mu. Ya Allah, apa yang menjadi hak-Mu maka ampunilah, dan apa yang menjadi hak makhluk-Mu maka tanggunglah ia dariku. Cukupkanlah aku dengan yang halal sehingga tidak butuh yang haram, dengan taat kepada-Mu sehingga tidak bermaksiat, dan dengan karunia-Mu sehingga tidak butuh selain-Mu, wahai Yang Maha Luas ampunan-Nya.',
    arti: 'Doa putaran keenam, memohon ampunan atas hak Allah dan keringanan atas hak sesama makhluk.',
    dalil: 'Bacaan tawaf putaran ke-6, dibaca dari Hajar Aswad sampai Rukun Yamani. Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca sambil mengelilingi Ka'bah dari Hajar Aswad menuju Rukun Yamani.",
    waktu: 'Tawaf, putaran ke-6.',
  },
  {
    id: 'tawaf-putaran-7',
    kategori: 'tawaf',
    judul: 'Doa Tawaf Putaran ke-7',
    arab: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ إِيْمَانًا كَامِلاً وَيَقِيْنًا صَادِقًا وَقَلْبًا خَاشِعًا وَلِسَانًا ذَاكِرًا وَرِزْقًا وَاسِعًا وَحَلاَلاً طَيِّبًا وَتَوْبَةً نَصُوْحًا وَتَوْبَةً قَبْلَ الْمَوْتِ وَرَحْمَةً عِنْدَ الْمَوْتِ وَمَغْفِرَةً بَعْدَ الْمَوْتِ وَالْعَفْوَ عِنْدَ الْحِسَابِ وَالْفَوْزَ بِالْجَنَّةِ وَالنَّجَاةَ مِنَ النَّارِ بِرَحْمَتِكَ يَا عَزِيْزُ يَا غَفَّارُ. رَبِّ زِدْنِيْ عِلْمًا وَأَلْحِقْنِيْ بِالصَّالِحِيْنَ',
    latin: "Allaahumma innii as-aluka iimaanan kaamilan wa yaqiinan shoodiqon wa qolban khoosyi'an wa lisaanan dzaakiron wa rizqon waasi'an wa halaalan thoyyiban wa taubatan nashuuhan wa taubatan qoblal-mauti wa rohmatan 'indal-mauti wa maghfirotan ba'dal-mauti wal-'afwa 'indal-hisaabi wal-fauza bil-jannati wannajaata minannaari birohmatika yaa 'aziizu yaa ghoffaar. Robbi zidnii 'ilman wa alhiqnii bish-shoolihiin",
    terjemahan: 'Ya Allah, aku mohon kepada-Mu iman yang sempurna, keyakinan yang benar, hati yang khusyuk, lidah yang berdzikir, rizki yang luas, yang halal lagi baik, taubat yang diterima dan taubat sebelum mati, rahmat ketika mati, ampunan setelah mati, maaf ketika dihisab, keberuntungan memperoleh surga dan selamat dari neraka dengan rahmat-Mu, wahai Yang Maha Perkasa lagi Maha Pengampun. Tuhanku, tambahkanlah ilmu kepadaku dan masukkanlah aku ke dalam golongan orang-orang shaleh.',
    arti: 'Doa putaran ketujuh (terakhir), memohon kesempurnaan iman dan kebaikan hingga akhir hayat.',
    dalil: 'Bacaan tawaf putaran ke-7, dibaca dari Hajar Aswad sampai Rukun Yamani. Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca sambil mengelilingi Ka'bah dari Hajar Aswad menuju Rukun Yamani.",
    waktu: 'Tawaf, putaran ke-7 (terakhir).',
  },
  {
    id: 'tawaf-rabbana-atina',
    kategori: 'tawaf',
    judul: 'Doa Antara Rukun Yamani dan Hajar Aswad',
    arab: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ. وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ يَا عَزِيْزُ يَا غَفَّارُ يَا رَبَّ الْعَالَمِيْنَ',
    latin: "Robbanaa aatinaa fid-dunyaa hasanah wa fil-aakhiroti hasanah wa qinaa 'adzaabannaar. Wa adkhilnal-jannata ma'al-abroor. Yaa 'aziizu yaa ghoffaaru yaa robbal-'aalamiin",
    terjemahan: 'Ya Tuhan kami, karuniakanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, dan hindarkanlah kami dari siksa neraka. Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbuat baik. Wahai Yang Maha Perkasa, Yang Maha Pengampun, wahai Tuhan semesta alam.',
    arti: 'Doa yang dibaca di antara Rukun Yamani dan Hajar Aswad pada setiap putaran (berdasarkan QS. Al-Baqarah: 201).',
    dalil: 'Doa antara Rukun Yamani dan Hajar Aswad (QS. Al-Baqarah: 201). Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca di antara Rukun Yamani dan Hajar Aswad, di akhir setiap putaran.',
    waktu: 'Di antara Rukun Yamani dan Hajar Aswad, pada setiap putaran tawaf (1-7).',
  },
];

// ============================================================================
// BAGIAN 6 — SA'I 
// Sa'i dibaca bolak-balik: lintasan ganjil (1,3,5,7) Shafa->Marwah, lintasan
// genap (2,4,6) Marwah->Shafa. Di antara dua lampu hijau dibaca doa khusus.
// ============================================================================

export const doaSai: Doa[] = [
  {
    id: 'sai-di-shafa',
    kategori: 'sai',
    judul: "Doa di Bukit Shafa (Sebelum Mulai Sa'i)",
    arab: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلاَ جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللهَ شَاكِرٌ عَلِيْمٌ',
    latin: "Innash-shofaa wal-marwata min sya'aa-irillaah, faman hajjal-baita awi'tamaro falaa junaaha 'alaihi an yaththowwafa bihimaa wa man tathowwa'a khoiron fa-innallaaha syaakirun 'aliim",
    terjemahan: "Sesungguhnya Shafa dan Marwah adalah sebagian dari syiar-syiar (tanda kebesaran) Allah. Maka barangsiapa yang berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barangsiapa mengerjakan suatu kebajikan dengan kerelaan hati, maka sesungguhnya Allah Maha Mensyukuri lagi Maha Mengetahui.",
    arti: "Bacaan saat menaiki/mendekati Bukit Shafa sebelum memulai sa'i (QS. Al-Baqarah: 158).",
    dalil: "Bacaan di Bukit Shafa sebelum sa'i (QS. Al-Baqarah: 158). Sumber: Panduan Manasik Umrah.",
    cara: "Dibaca ketika mendekati/menaiki Bukit Shafa, menghadap Ka'bah, sebelum memulai lintasan pertama.",
    waktu: "Di Bukit Shafa, sebelum memulai sa'i.",
  },
  {
    id: 'sai-putaran-1',
    kategori: 'sai',
    judul: "Doa Sa'i Lintasan ke-1 (Shafa → Marwah)",
    arab: 'اَللهُ أَكْبَرُ، اَللهُ أَكْبَرُ، اَللهُ أَكْبَرُ، اَللهُ أَكْبَرُ كَبِيْرًا وَالْحَمْدُ لِلّٰهِ كَثِيْرًا وَسُبْحَانَ اللهِ الْعَظِيْمِ وَبِحَمْدِهِ بُكْرَةً وَأَصِيْلاً',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, Allaahu akbar kabiiron wal-hamdu lillaahi katsiiron wa subhaanallaahil-'azhiimi wa bihamdihi bukrotan wa ashiilaa",
    terjemahan: 'Allah Maha Besar (4x) dengan segala kebesaran-Nya. Segala puji bagi Allah dengan pujian yang banyak. Maha suci Allah Yang Maha Agung, dan segala puji bagi-Nya di waktu pagi dan petang.',
    arti: 'Bacaan takbir dan tahmid pada lintasan pertama dari Shafa menuju Marwah.',
    dalil: "Bacaan sa'i lintasan ke-1, dibaca dari bukit Shafa menuju Marwah. Sumber: Panduan Manasik Umrah.",
    cara: 'Dibaca sambil berjalan dari Shafa menuju Marwah.',
    waktu: "Sa'i, lintasan ke-1 (Shafa → Marwah).",
  },
  {
    id: 'sai-putaran-2',
    kategori: 'sai',
    judul: "Doa Sa'i Lintasan ke-2 (Marwah → Shafa)",
    arab: 'اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ. اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ خَيْرِ مَا تَعْلَمُ وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا تَعْلَمُ وَأَسْتَغْفِرُكَ مِنْ كُلِّ مَا تَعْلَمُ إِنَّكَ أَنْتَ عَلاَّمُ الْغُيُوْبِ. لاَ إِلَهَ إِلاَّ اللهُ الْمَلِكُ الْحَقُّ الْمُبِيْنُ، مُحَمَّدٌ رَسُوْلُ اللهِ صَادِقُ الْوَعْدِ الْأَمِيْنُ',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, walillaahil-hamd. Allaahumma innii as-aluka min khoiri maa ta'lamu wa a'uudzu bika min syarri maa ta'lamu wa astaghfiruka min kulli maa ta'lamu innaka anta 'allaamul-ghuyuub. Laa ilaaha illallaahul-malikul-haqqul-mubiin, muhammadur-rosuulullaahi shoodiqul-wa'dil-amiin",
    terjemahan: 'Allah Maha Besar (3x) dan bagi-Nya segala pujian. Ya Allah, aku mohon kepada-Mu kebaikan yang Engkau ketahui, aku berlindung kepada-Mu dari kejahatan yang Engkau ketahui, dan aku mohon ampun kepada-Mu dari segala yang Engkau ketahui. Sesungguhnya Engkau Maha Mengetahui yang ghaib. Tiada Tuhan selain Allah, Maha Raja yang sebenar-benarnya. Muhammad utusan Allah yang menepati janji lagi terpercaya.',
    arti: 'Bacaan lintasan kedua dari Marwah kembali menuju Shafa.',
    dalil: "Bacaan sa'i lintasan ke-2, dibaca dari bukit Marwah menuju Shafa. Sumber: Panduan Manasik Umrah.",
    cara: 'Dibaca sambil berjalan dari Marwah menuju Shafa.',
    waktu: "Sa'i, lintasan ke-2 (Marwah → Shafa).",
  },
  {
    id: 'sai-putaran-3',
    kategori: 'sai',
    judul: "Doa Sa'i Lintasan ke-3 (Shafa → Marwah)",
    arab: 'اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ. رَبَّنَا أَتْمِمْ لَنَا نُوْرَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ. اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْخَيْرَ كُلَّهُ عَاجِلَهُ وَآجِلَهُ وَأَسْتَغْفِرُكَ لِذَنْبِيْ وَأَسْأَلُكَ رَحْمَتَكَ يَا أَرْحَمَ الرَّاحِمِيْنَ',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, walillaahil-hamd. Robbanaa atmim lanaa nuuronaa waghfir lanaa innaka 'alaa kulli syai-in qodiir. Allaahumma innii as-alukal-khoiro kullahu 'aajilahu wa aajilahu wa astaghfiruka lidzanbii wa as-aluka rohmataka yaa arhamar-roohimiin",
    terjemahan: 'Allah Maha Besar (3x) dan bagi-Nya segala pujian. Ya Tuhan kami, sempurnakanlah cahaya kami dan ampunilah kami, sesungguhnya Engkau Maha Kuasa atas segala sesuatu. Ya Allah, aku mohon kepada-Mu segala kebaikan yang segera maupun yang akan datang, aku mohon ampun atas dosaku dan aku mohon rahmat-Mu, wahai Yang Maha Pengasih dari segenap pengasih.',
    arti: 'Bacaan lintasan ketiga dari Shafa menuju Marwah.',
    dalil: "Bacaan sa'i lintasan ke-3, dibaca dari bukit Shafa menuju Marwah. Sumber: Panduan Manasik Umrah.",
    cara: 'Dibaca sambil berjalan dari Shafa menuju Marwah.',
    waktu: "Sa'i, lintasan ke-3 (Shafa → Marwah).",
  },
  {
    id: 'sai-putaran-4',
    kategori: 'sai',
    judul: "Doa Sa'i Lintasan ke-4 (Marwah → Shafa)",
    arab: 'اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ. اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ مَا تَعْلَمُ وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا تَعْلَمُ وَأَسْتَغْفِرُكَ مِنْ كُلِّ مَا تَعْلَمُ إِنَّكَ أَنْتَ عَلاَّمُ الْغُيُوْبِ. لاَ إِلَهَ إِلاَّ اللهُ الْمَلِكُ الْحَقُّ الْمُبِيْنُ، مُحَمَّدٌ رَسُوْلُ اللهِ صَادِقُ الْوَعْدِ الْأَمِيْنُ',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, walillaahil-hamd. Allaahumma innii as-aluka maa ta'lamu wa a'uudzu bika min syarri maa ta'lamu wa astaghfiruka min kulli maa ta'lamu innaka anta 'allaamul-ghuyuub. Laa ilaaha illallaahul-malikul-haqqul-mubiin, muhammadur-rosuulullaahi shoodiqul-wa'dil-amiin",
    terjemahan: 'Allah Maha Besar (3x) dan bagi-Nya segala pujian. Ya Allah, aku mohon kepada-Mu kebaikan yang Engkau ketahui, aku berlindung kepada-Mu dari kejahatan yang Engkau ketahui, dan aku mohon ampun kepada-Mu dari segala yang Engkau ketahui. Sesungguhnya Engkau Maha Mengetahui yang ghaib. Tiada Tuhan selain Allah, Maha Raja yang sebenarnya. Muhammad utusan Allah yang menepati janji lagi terpercaya.',
    arti: 'Bacaan lintasan keempat dari Marwah menuju Shafa.',
    dalil: "Bacaan sa'i lintasan ke-4, dibaca dari bukit Marwah menuju Shafa. Sumber: Panduan Manasik Umrah.",
    cara: 'Dibaca sambil berjalan dari Marwah menuju Shafa.',
    waktu: "Sa'i, lintasan ke-4 (Marwah → Shafa).",
  },
  {
    id: 'sai-putaran-5',
    kategori: 'sai',
    judul: "Doa Sa'i Lintasan ke-5 (Shafa → Marwah)",
    arab: 'اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ. سُبْحَانَكَ مَا شَكَرْنَاكَ حَقَّ شُكْرِكَ يَا اللهُ، سُبْحَانَكَ مَا أَعْلَى شَأْنَكَ يَا اللهُ. اَللَّهُمَّ حَبِّبْ إِلَيْنَا الْإِيْمَانَ وَزَيِّنْهُ فِيْ قُلُوْبِنَا وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوْقَ وَالْعِصْيَانَ وَاجْعَلْنَا مِنَ الرَّاشِدِيْنَ',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, walillaahil-hamd. Subhaanaka maa syakarnaaka haqqo syukrika yaallaahu, subhaanaka maa a'laa sya'naka yaallaah. Allaahumma habbib ilainal-iimaana wa zayyinhu fii quluubinaa wa karrih ilainal-kufro wal-fusuuqo wal-'ishyaana waj'alnaa minar-roosyidiin",
    terjemahan: 'Allah Maha Besar (3x) dan bagi-Nya segala pujian. Maha suci Engkau, kami belum bersyukur kepada-Mu dengan syukur yang semestinya wahai Allah. Maha suci Engkau, alangkah tinggi keagungan-Mu wahai Allah. Ya Allah, cintakanlah kami pada iman dan hiaskanlah ia di hati kami, bencikanlah kami pada kekufuran, kefasikan dan kemaksiatan, dan jadikanlah kami termasuk orang-orang yang mendapat petunjuk.',
    arti: 'Bacaan lintasan kelima dari Shafa menuju Marwah.',
    dalil: "Bacaan sa'i lintasan ke-5, dibaca dari bukit Shafa menuju Marwah. Sumber: Panduan Manasik Umrah.",
    cara: 'Dibaca sambil berjalan dari Shafa menuju Marwah.',
    waktu: "Sa'i, lintasan ke-5 (Shafa → Marwah).",
  },
  {
    id: 'sai-putaran-6',
    kategori: 'sai',
    judul: "Doa Sa'i Lintasan ke-6 (Marwah → Shafa)",
    arab: 'اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ وَلِلّٰهِ الْحَمْدُ. اَللَّهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ وَسَاوِسِ الصَّدْرِ وَشَتَاتِ الْأَمْرِ وَفِتْنَةِ الْقَبْرِ. اَللَّهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ شَرِّ مَا يَلِجُ فِي اللَّيْلِ وَشَرِّ مَا يَلِجُ فِي النَّهَارِ وَمِنْ شَرِّ مَا تَهُبُّ بِهِ الرِّيَاحُ يَا أَرْحَمَ الرَّاحِمِيْنَ',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar, walillaahil-hamd. Allaahumma innii a'uudzu bika min wasaawisish-shodri wa syataatil-amri wa fitnatil-qobri. Allaahumma innii a'uudzu bika min syarri maa yaliju fil-laili wa syarri maa yaliju fin-nahaari wa min syarri maa tahubbu bihir-riyaahu yaa arhamar-roohimiin",
    terjemahan: 'Allah Maha Besar (3x) dan bagi-Nya segala pujian. Ya Allah, aku berlindung kepada-Mu dari godaan bisikan hati, kekacauan urusan dan fitnah kubur. Ya Allah, aku berlindung kepada-Mu dari kejahatan yang masuk di waktu malam dan kejahatan yang masuk di waktu siang, serta dari kejahatan yang dibawa oleh angin, wahai Yang Maha Pengasih dari segenap pengasih.',
    arti: 'Bacaan lintasan keenam dari Marwah menuju Shafa.',
    dalil: "Bacaan sa'i lintasan ke-6, dibaca dari bukit Marwah menuju Shafa. Sumber: Panduan Manasik Umrah.",
    cara: 'Dibaca sambil berjalan dari Marwah menuju Shafa.',
    waktu: "Sa'i, lintasan ke-6 (Marwah → Shafa).",
  },
  {
    id: 'sai-putaran-7',
    kategori: 'sai',
    judul: "Doa Sa'i Lintasan ke-7 (Shafa → Marwah)",
    arab: 'اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ اَللهُ أَكْبَرُ كَبِيْرًا وَالْحَمْدُ لِلّٰهِ كَثِيْرًا. اَللَّهُمَّ حَبِّبْ إِلَيَّ الْإِيْمَانَ وَزَيِّنْهُ فِيْ قَلْبِيْ وَكَرِّهْ إِلَيَّ الْكُفْرَ وَالْفُسُوْقَ وَالْعِصْيَانَ وَاجْعَلْنِيْ مِنَ الرَّاشِدِيْنَ',
    latin: "Allaahu akbar, Allaahu akbar, Allaahu akbar kabiiron wal-hamdu lillaahi katsiiron. Allaahumma habbib ilayyal-iimaana wa zayyinhu fii qolbii wa karrih ilayyal-kufro wal-fusuuqo wal-'ishyaana waj'alnii minar-roosyidiin",
    terjemahan: 'Allah Maha Besar (3x) dengan segala kebesaran-Nya, dan segala puji bagi Allah dengan pujian yang banyak. Ya Allah, cintakanlah aku pada iman dan hiaskanlah ia di hatiku, bencikanlah aku pada kekufuran, kefasikan dan kemaksiatan, dan jadikanlah aku termasuk orang-orang yang mendapat petunjuk.',
    arti: "Bacaan lintasan ketujuh (terakhir) dari Shafa menuju Marwah, mengakhiri rangkaian sa'i.",
    dalil: "Bacaan sa'i lintasan ke-7, dibaca dari bukit Shafa menuju Marwah. Sumber: Panduan Manasik Umrah.",
    cara: 'Dibaca sambil berjalan dari Shafa menuju Marwah pada lintasan terakhir.',
    waktu: "Sa'i, lintasan ke-7 (Shafa → Marwah, terakhir).",
  },
  {
    id: 'sai-lampu-hijau',
    kategori: 'sai',
    judul: 'Doa di Antara Dua Lampu Hijau',
    arab: 'رَبِّ اغْفِرْ وَارْحَمْ وَاعْفُ وَتَكَرَّمْ وَتَجَاوَزْ عَمَّا تَعْلَمُ إِنَّكَ تَعْلَمُ مَا لاَ نَعْلَمُ إِنَّكَ أَنْتَ اللهُ الْأَعَزُّ الْأَكْرَمُ',
    latin: "Robbighfir warham wa'fu wa takarrom wa tajaawaz 'ammaa ta'lamu innaka ta'lamu maa laa na'lamu innaka antallaahul-a'azzul-akrom",
    terjemahan: 'Ya Tuhanku, ampunilah, sayangilah, maafkanlah, bermurah hatilah, dan hapuskanlah apa-apa yang Engkau ketahui. Sesungguhnya Engkau Maha Mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau ya Allah Maha Mulia dan Maha Pemurah.',
    arti: 'Doa yang dibaca di area antara dua lampu/pilar hijau, tempat laki-laki dianjurkan berlari-lari kecil.',
    dalil: 'Doa di antara dua lampu hijau. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca di sepanjang area antara dua lampu hijau, setiap kali melintasinya (laki-laki berlari-lari kecil di sini).',
    waktu: "Setiap melintasi area dua lampu hijau dalam tiap lintasan sa'i.",
  },
];

// ============================================================================
// BAGIAN 7 — TAHALLUL, WADA', PULANG 
// ============================================================================

export const doaTahallulWada: Doa[] = [
  {
    id: 'tahallul-doa',
    kategori: 'tahallul',
    judul: 'Doa Tahallul (Menggunting Rambut)',
    arab: 'اَللّٰهُمَّ اجْعَلْ لِكُلِّ شَعْرَةٍ نُوْرًا يَوْمَ الْقِيَامَةِ',
    latin: "Allaahummaj'al likulli sya'rotin nuuron yaumal-qiyaamah",
    terjemahan: 'Ya Allah, jadikanlah untuk setiap helai rambut (yang aku gunting) cahaya pada hari kiamat.',
    arti: 'Doa saat tahallul (menggunting/mencukur rambut), menandai selesainya rangkaian umrah.',
    dalil: 'Doa tahallul (menggunting rambut). Sumber: Panduan Manasik Umrah.',
    cara: "Dibaca saat menggunting/mencukur rambut. Laki-laki disunnahkan mencukur habis atau minimal 3 helai; perempuan memotong ujung rambut minimal 3 helai.",
    waktu: "Saat tahallul, setelah selesai sa'i (mengakhiri umrah).",
  },
  {
    id: 'wada-tawaf-wada',
    kategori: 'wada',
    judul: "Doa Thawaf Wada' (Perpisahan)",
    arab: 'اَللّٰهُمَّ إِنَّ الْبَيْتَ بَيْتُكَ وَالْعَبْدَ عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ، حَمَلْتَنِيْ عَلَى مَا سَخَّرْتَ لِيْ مِنْ خَلْقِكَ حَتَّى سَيَّرْتَنِيْ إِلَى بَلَدِكَ وَبَلَّغْتَنِيْ بِنِعْمَتِكَ حَتَّى أَعَنْتَنِيْ عَلَى قَضَاءِ مَنَاسِكِكَ، فَإِنْ كُنْتَ رَضِيْتَ عَنِّيْ فَازْدَدْ عَنِّيْ رِضًا',
    latin: "Allaahumma innal-baita baituka wal-'abda 'abduka wabnu 'abdika wabnu amatika, hamaltanii 'alaa maa sakhkhorta lii min kholqika hattaa sayyartanii ilaa baladika wa ballaghtanii bini'matika hattaa a'antanii 'alaa qodhoo-i manaasikika, fa-in kunta rodhiita 'annii fazdad 'annii ridhoo",
    terjemahan: 'Ya Allah, sesungguhnya rumah ini adalah rumah-Mu, hamba ini adalah hamba-Mu, anak hamba-Mu (laki-laki) dan anak hamba-Mu (perempuan). Engkau membawaku di atas apa yang Engkau mudahkan untukku dari makhluk-Mu, hingga Engkau perjalankan aku ke negeri-Mu dan Engkau sampaikan aku dengan nikmat-Mu hingga Engkau menolongku menunaikan manasik-Mu. Maka jika Engkau telah ridha kepadaku, tambahkanlah keridhaan-Mu kepadaku.',
    arti: "Doa thawaf wada' (perpisahan) yang dibaca saat hendak meninggalkan Makkah.",
    dalil: "Doa thawaf wada'. Sumber: Panduan Manasik Umrah.",
    cara: "Dibaca saat melakukan thawaf wada' sebelum meninggalkan kota Makkah.",
    waktu: "Saat thawaf wada', sebelum meninggalkan Makkah.",
  },
  {
    id: 'harian-doa-pulang',
    kategori: 'harian',
    judul: 'Doa Sesudah Pulang Umrah (untuk Diri & Tamu)',
    arab: 'اَللّٰهُمَّ اجْعَلْ حَجَّنَا مَبْرُوْرًا وَسَعْيًا مَشْكُوْرًا وَذَنْبًا مَغْفُوْرًا وَعَمَلاً صَالِحًا مَقْبُوْلاً وَتِجَارَةً لَنْ تَبُوْرَ. رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: "Allaahummaj'al hajjanaa mabruuron wa sa'yan masykuuron wa dzanban maghfuuron wa 'amalan shoolihan maqbuulan wa tijaarotan lan tabuur. Robbanaa aatinaa fid-dunyaa hasanah wa fil-aakhiroti hasanah wa qinaa 'adzaabannaar",
    terjemahan: "Ya Allah, jadikanlah haji/umrah kami mabrur, sa'i yang diterima, dosa yang diampuni, amal shaleh yang diterima dan usaha yang tidak akan merugi. Ya Tuhan kami, karuniakanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, dan hindarkanlah kami dari siksa neraka.",
    arti: 'Doa syukur setelah pulang dari umrah, dibaca untuk diri sendiri dan tamu yang meminta didoakan.',
    dalil: 'Doa sesudah pulang haji/umrah untuk diri dan tamu. Sumber: Panduan Manasik Umrah.',
    cara: 'Dibaca setelah kembali dari umrah, juga saat mendoakan tamu yang datang.',
    waktu: 'Setelah pulang dari umrah.',
  },
];

// ============================================================================
// BAGIAN 8 — DOA TAMBAHAN (sumber: himpunan daring — PERLU VERIFIKASI)
// ============================================================================

export const doaTambahan: Doa[] = [
  {
    id: 'makkah-minum-zamzam',
    kategori: 'makkah',
    judul: 'Doa Minum Air Zamzam',
    arab: 'اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ',
    latin: "Allaahumma innii as-aluka 'ilman naafi'an wa rizqon waasi'an wa syifaa-an min kulli daa-in",
    terjemahan: 'Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rizki yang luas, dan kesembuhan dari segala penyakit.',
    arti: 'Doa yang dibaca saat meminum air zamzam. Diriwayatkan air zamzam bermanfaat sesuai niat peminumnya.',
    dalil: 'Doa minum air zamzam (himpunan daring; lafaz masyhur diamalkan, periksa rujukan hadis terkait). Sumber tambahan, perlu verifikasi ustadz.',
    cara: 'Dibaca sebelum minum air zamzam, dianjurkan menghadap kiblat dan minum tiga tegukan.',
    waktu: 'Saat hendak minum air zamzam.',
    perluVerifikasi: true,
  },
  {
    id: 'harian-doa-multazam',
    kategori: 'makkah',
    judul: 'Doa di Multazam',
    arab: 'اَللّٰهُمَّ يَا رَبَّ الْبَيْتِ الْعَتِيْقِ أَعْتِقْ رِقَابَنَا وَرِقَابَ آبَائِنَا وَأُمَّهَاتِنَا وَإِخْوَانِنَا وَأَوْلاَدِنَا مِنَ النَّارِ يَا ذَا الْجُوْدِ وَالْكَرَمِ وَالْفَضْلِ وَالْمَنِّ وَالْعَطَاءِ وَالْإِحْسَانِ',
    latin: "Allaahumma yaa robbal-baitil-'atiiqi a'tiq riqoobanaa wa riqooba aabaa-inaa wa ummahaatinaa wa ikhwaaninaa wa aulaadinaa minannaari yaa dzal-juudi wal-karomi wal-fadhli wal-manni wal-'athoo-i wal-ihsaan",
    terjemahan: "Ya Allah, wahai Tuhan pemilik Baitul Atiq (Ka'bah) ini, bebaskanlah diri kami, orang tua kami, ibu-ibu kami, saudara-saudara kami dan anak-anak kami dari api neraka, wahai Pemilik kemurahan, kedermawanan, keutamaan, anugerah, pemberian dan kebaikan.",
    arti: "Doa di Multazam (area antara Hajar Aswad dan pintu Ka'bah), tempat mustajab untuk berdoa.",
    dalil: 'Doa di Multazam (himpunan daring). Multazam masyhur sebagai tempat doa mustajab. Sumber tambahan, perlu verifikasi ustadz.',
    cara: 'Dibaca sambil menempelkan diri di area Multazam jika memungkinkan, atau menghadap ke arahnya. Perbanyak doa pribadi.',
    waktu: "Saat berada di Multazam, biasanya setelah tawaf.",
    perluVerifikasi: true,
  },
];

// ============================================================================
// GABUNGAN & HELPER FUNCTIONS
// ============================================================================

export const semuaDoa: Doa[] = [
  ...doaPersiapan,
  ...doaMadinah,
  ...doaIhram,
  ...doaMakkah,
  ...doaTawaf,
  ...doaSai,
  ...doaTahallulWada,
  ...doaTambahan,
];

/** Alias untuk backward-compatibility dengan komponen lama. */
export const daftarDoa: Doa[] = semuaDoa;

/** Cari doa berdasarkan id. */
export function doaById(id: string): Doa | undefined {
  return semuaDoa.find((d) => d.id === id);
}

/** Ambil semua doa dalam satu kategori, urut sesuai urutan deklarasi. */
export function doaByKategori(kategori: KategoriDoa): Doa[] {
  return semuaDoa.filter((d) => d.kategori === kategori);
}

/** Pencarian sederhana berdasarkan judul, latin, atau terjemahan. */
export function cariDoa(query: string): Doa[] {
  const q = query.trim().toLowerCase();
  if (!q) return semuaDoa;
  return semuaDoa.filter(
    (d) =>
      d.judul.toLowerCase().includes(q) ||
      d.latin.toLowerCase().includes(q) ||
      d.terjemahan.toLowerCase().includes(q),
  );
}

/** Daftar kategori yang punya minimal satu doa, untuk render tab/list kategori. */
export function kategoriTersedia(): { kategori: KategoriDoa; label: string; jumlah: number }[] {
  const urutan: KategoriDoa[] = [
    'persiapan', 'madinah', 'ihram', 'makkah', 'tawaf', 'sai', 'tahallul', 'wada', 'harian',
  ];
  return urutan
    .map((k) => ({ kategori: k, label: KATEGORI_LABEL[k], jumlah: doaByKategori(k).length }))
    .filter((x) => x.jumlah > 0);
}
