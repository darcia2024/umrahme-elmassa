const TZ = 'Asia/Riyadh';

export interface WaktuSaudi {
  jam: number;
  menit: number;
  detik: number;
  hari: number;
  tanggal: number;
  bulan: number;
  tahun: number;
  totalMenit: number;
}

export function getWaktuSaudi(base: Date = new Date()): WaktuSaudi {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'short',
  });
  const parts = fmt.formatToParts(base);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0';

  const jam = parseInt(get('hour'), 10) % 24;
  const menit = parseInt(get('minute'), 10);
  const detik = parseInt(get('second'), 10);
  const tanggal = parseInt(get('day'), 10);
  const bulan = parseInt(get('month'), 10) - 1;
  const tahun = parseInt(get('year'), 10);

  const hariMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  const hari = hariMap[get('weekday')] ?? 0;

  return { jam, menit, detik, hari, tanggal, bulan, tahun, totalMenit: jam * 60 + menit };
}

/**
 * Tanggal untuk header: Masehi dan Hijriah dari kalender bawaan browser
 * (Umm al-Qura), supaya selalu mengikuti hari ini dan tidak perlu diketik.
 */
export function formatTanggalHeader(d: Date = new Date()): { masehi: string; hijri: string } {
  const masehi = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'short', year: 'numeric',
  }).format(d);
  let hijri = '';
  try {
    hijri = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(d);
  } catch {
    // Browser tanpa kalender Hijriah: tampilkan Masehi saja.
  }
  return { masehi, hijri };
}

/**
 * Nama hotel di data kadang membawa emoji bintang ("Pullman Zamzam ⭐5").
 * Dipisah supaya tampilan memakai ikon outline, bukan emoji.
 */
export function pisahBintangHotel(nama: string): { nama: string; bintang: number | null } {
  const m = nama.match(/\s*[⭐★☆✭]\s*(\d)?\s*$/u) ?? nama.match(/\s*(\d)\s*[⭐★]\s*$/u);
  if (!m) return { nama: nama.trim(), bintang: null };
  const bintang = m[1] ? Number(m[1]) : null;
  return { nama: nama.slice(0, m.index).trim(), bintang: bintang && bintang >= 1 && bintang <= 5 ? bintang : null };
}
