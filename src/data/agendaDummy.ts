import { bulkInsertAgenda } from '../lib/supabase';

function getRelativeDate(daysFromToday: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().split('T')[0];
}

interface DummyItem {
  judul: string;
  jam_mulai: string | null;
  lokasi: string | null;
  deskripsi: string | null;
  urutan: number;
}

const ITINERARY: Array<{ dayOffset: number; items: DummyItem[] }> = [
  {
    dayOffset: -3,
    items: [
      { judul: 'Persiapan keberangkatan dari Indonesia', jam_mulai: '08:00', lokasi: 'Bandara Soekarno-Hatta', deskripsi: 'Kumpul di terminal keberangkatan internasional. Bawa dokumen perjalanan lengkap.', urutan: 1 },
      { judul: 'Boarding pesawat menuju Madinah', jam_mulai: '13:00', lokasi: 'Terminal 3 Internasional', deskripsi: 'Pastikan koper sudah masuk bagasi. Patuhi aturan barang bawaan.', urutan: 2 },
      { judul: 'Tiba di Bandara Prince Mohammad bin Abdulaziz', jam_mulai: '23:00', lokasi: 'Bandara Madinah, Arab Saudi', deskripsi: 'Proses imigrasi & pengambilan bagasi. Bus menuju hotel sudah menunggu.', urutan: 3 },
    ],
  },
  {
    dayOffset: -2,
    items: [
      { judul: 'Sarapan & Sholat Subuh berjamaah', jam_mulai: '07:00', lokasi: 'Hotel Madinah', deskripsi: null, urutan: 1 },
      { judul: 'Ziarah Masjid Nabawi & Raudhah', jam_mulai: '09:00', lokasi: 'Masjid Nabawi', deskripsi: "Berdoa di Raudhah — taman surga antara mimbar dan makam Rasulullah ﷺ.", urutan: 2 },
      { judul: 'Istirahat siang di hotel', jam_mulai: '14:00', lokasi: 'Hotel Madinah', deskripsi: null, urutan: 3 },
      { judul: "Ziarah Makam Baqi' & Bukit Uhud", jam_mulai: '16:00', lokasi: 'Jabal Uhud', deskripsi: "Mengenang para syuhada Uhud dan berziarah ke makam Baqi'.", urutan: 4 },
      { judul: 'Makan malam & persiapan esok hari', jam_mulai: '20:00', lokasi: 'Hotel Madinah', deskripsi: null, urutan: 5 },
    ],
  },
  {
    dayOffset: -1,
    items: [
      { judul: 'Sholat Tahajud & Subuh berjamaah di Masjid Nabawi', jam_mulai: '04:30', lokasi: 'Masjid Nabawi', deskripsi: null, urutan: 1 },
      { judul: 'Kunjungan Masjid Quba', jam_mulai: '08:00', lokasi: 'Masjid Quba', deskripsi: "Masjid pertama yang dibangun dalam Islam. Sholat 2 rakaat di sini setara pahala umrah.", urutan: 2 },
      { judul: 'Ziarah Masjid Qiblatayn', jam_mulai: '11:00', lokasi: 'Masjid Qiblatayn', deskripsi: "Masjid tempat perpindahan kiblat dari Baitul Maqdis ke Ka'bah.", urutan: 3 },
      { judul: 'Istirahat hotel', jam_mulai: '14:00', lokasi: 'Hotel Madinah', deskripsi: null, urutan: 4 },
      { judul: 'Persiapan perjalanan ke Makkah', jam_mulai: '16:00', lokasi: 'Hotel Madinah', deskripsi: 'Siapkan koper untuk pindah ke Makkah besok pagi.', urutan: 5 },
    ],
  },
  {
    dayOffset: 0,
    items: [
      { judul: "Miqat di Bir Ali — niat ihram umrah", jam_mulai: '08:00', lokasi: 'Bir Ali (Dzul Hulaifah)', deskripsi: "Mandi sunnah, pakai pakaian ihram, niat ihram, dan perbanyak talbiyah.", urutan: 1 },
      { judul: 'Perjalanan bus menuju Makkah', jam_mulai: '10:00', lokasi: 'Bis Makkah', deskripsi: 'Sepanjang perjalanan perbanyak talbiyah: لبيك اللهم لبيك', urutan: 2 },
      { judul: 'Tiba di hotel Makkah, check-in', jam_mulai: '15:00', lokasi: 'Hotel Makkah', deskripsi: null, urutan: 3 },
      { judul: "Persiapan tawaf & sa'i", jam_mulai: '17:00', lokasi: 'Hotel Makkah', deskripsi: 'Istirahat sebentar sebelum berangkat ke Masjidil Haram.', urutan: 4 },
    ],
  },
  {
    dayOffset: 1,
    items: [
      { judul: "Tawaf qudum & sa'i", jam_mulai: '02:00', lokasi: 'Masjidil Haram', deskripsi: "Waktu terbaik — Masjidil Haram lebih lengang. Tawaf 7 putaran + sa'i Safa-Marwa.", urutan: 1 },
      { judul: 'Istirahat & sarapan', jam_mulai: '06:00', lokasi: 'Hotel Makkah', deskripsi: null, urutan: 2 },
      { judul: 'Pengarahan pembimbing: tata cara ibadah', jam_mulai: '09:00', lokasi: 'Hotel Makkah', deskripsi: 'Bimbingan manasik, tanya jawab, dan persiapan ibadah selanjutnya.', urutan: 3 },
      { judul: 'Waktu bebas — ziarah sekitar Masjidil Haram', jam_mulai: '14:00', lokasi: 'Masjidil Haram', deskripsi: null, urutan: 4 },
    ],
  },
  {
    dayOffset: 2,
    items: [
      { judul: 'Kajian manasik pagi bersama pembimbing', jam_mulai: '08:00', lokasi: 'Hotel Makkah', deskripsi: null, urutan: 1 },
      { judul: 'Sholat Jumat di Masjidil Haram', jam_mulai: '11:00', lokasi: 'Masjidil Haram', deskripsi: 'Berangkat lebih awal untuk mendapat tempat yang baik.', urutan: 2 },
      { judul: 'Istirahat siang', jam_mulai: '14:00', lokasi: 'Hotel Makkah', deskripsi: null, urutan: 3 },
      { judul: 'Tawaf sunnah petang', jam_mulai: '16:00', lokasi: 'Masjidil Haram', deskripsi: null, urutan: 4 },
    ],
  },
  {
    dayOffset: 3,
    items: [
      { judul: 'Ziarah sejarah: Jabal Nur & Gua Hira', jam_mulai: '09:00', lokasi: 'Jabal Nur', deskripsi: "Tempat turunnya wahyu pertama (QS Al-Alaq) kepada Rasulullah ﷺ.", urutan: 1 },
      { judul: 'Istirahat hotel', jam_mulai: '13:00', lokasi: 'Hotel Makkah', deskripsi: null, urutan: 2 },
      { judul: 'Ziarah Jabal Tsur', jam_mulai: '16:00', lokasi: 'Jabal Tsur', deskripsi: "Gua tempat Rasulullah ﷺ dan Abu Bakar As-Shiddiq bersembunyi saat hijrah.", urutan: 3 },
      { judul: 'Makan malam & muhasabah perjalanan', jam_mulai: '20:00', lokasi: 'Hotel Makkah', deskripsi: null, urutan: 4 },
    ],
  },
  {
    dayOffset: 4,
    items: [
      { judul: 'Waktu bebas ibadah mandiri di Masjidil Haram', jam_mulai: '08:00', lokasi: 'Masjidil Haram', deskripsi: null, urutan: 1 },
      { judul: 'Persiapan perjalanan pulang', jam_mulai: '14:00', lokasi: 'Hotel Makkah', deskripsi: 'Kumpulkan barang, selesaikan urusan keuangan hotel.', urutan: 2 },
      { judul: "Tawaf wada' (tawaf perpisahan)", jam_mulai: '18:00', lokasi: 'Masjidil Haram', deskripsi: "Tawaf wada' wajib bagi yang akan meninggalkan Makkah.", urutan: 3 },
    ],
  },
  {
    dayOffset: 5,
    items: [
      { judul: 'Berangkat ke Bandara King Abdulaziz, Jeddah', jam_mulai: '03:00', lokasi: 'Bandara Jeddah', deskripsi: 'Bus berangkat dari hotel. Pastikan semua barang sudah terkemas.', urutan: 1 },
      { judul: 'Boarding pesawat menuju Indonesia', jam_mulai: '07:00', lokasi: 'King Abdulaziz International Airport', deskripsi: 'Semoga perjalanan ibadah diterima oleh Allah SWT. آمين', urutan: 2 },
    ],
  },
  {
    dayOffset: 6,
    items: [
      { judul: 'Tiba di Indonesia', jam_mulai: '15:00', lokasi: 'Bandara Soekarno-Hatta', deskripsi: 'Estimasi kedatangan sesuai jadwal penerbangan. Selamat datang kembali, semoga ibadah mabrur!', urutan: 1 },
    ],
  },
];

export async function insertAgendaDummy(tenantId: string, keberangkatanId: string): Promise<{ inserted: number; error?: string }> {
  const rows = ITINERARY.flatMap(({ dayOffset, items }) => {
    const tanggal = getRelativeDate(dayOffset);
    return items.map((item) => ({
      tanggal,
      jam_mulai: item.jam_mulai,
      judul: item.judul,
      lokasi: item.lokasi,
      deskripsi: item.deskripsi,
      urutan: item.urutan,
    }));
  });

  try {
    const result = await bulkInsertAgenda(tenantId, keberangkatanId, rows);
    return { inserted: result.inserted };
  } catch (err: unknown) {
    return { inserted: 0, error: err instanceof Error ? err.message : String(err) };
  }
}
