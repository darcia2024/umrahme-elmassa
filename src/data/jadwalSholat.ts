// =============================================================
// DATA JADWAL SHOLAT — MVP statis (referensi waktu Makkah)
// TODO(fitur): integrasikan API perhitungan waktu sholat berdasarkan
// koordinat & tanggal sesungguhnya (mis. Aladhan API).
// =============================================================

export interface WaktuSholat {
  id: string;
  nama: string;
  jamMulai: string; // format "HH:MM"
  jamAkhir: string; // akhir rentang / waktu berikutnya
  ikonTipe: 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya';
}

export interface JadwalData {
  kota: string;
  keterangan: string;
  jamSubuh: string; // untuk strip info gauge
  jamIsya: string;
  waktuList: WaktuSholat[];
}

/** Jadwal referensi waktu sholat di Makkah Al-Mukarramah */
export const jadwalMakkah: JadwalData = {
  kota: 'Makkah Al-Mukarramah',
  keterangan: 'Data referensi. Cek imsakiyah lokal untuk keakuratan.',
  jamSubuh: '04:32',
  jamIsya: '20:24',
  waktuList: [
    {
      id: 'subuh',
      nama: 'Subuh',
      jamMulai: '04:32',
      jamAkhir: '05:48',
      ikonTipe: 'subuh',
    },
    {
      id: 'dzuhur',
      nama: 'Dzuhur',
      jamMulai: '12:19',
      jamAkhir: '13:36',
      ikonTipe: 'dzuhur',
    },
    {
      id: 'ashar',
      nama: 'Ashar',
      jamMulai: '15:48',
      jamAkhir: '17:06',
      ikonTipe: 'ashar',
    },
    {
      id: 'maghrib',
      nama: 'Maghrib',
      jamMulai: '18:52',
      jamAkhir: '20:08',
      ikonTipe: 'maghrib',
    },
    {
      id: 'isya',
      nama: 'Isya',
      jamMulai: '20:24',
      jamAkhir: '21:40',
      ikonTipe: 'isya',
    },
  ],
};
