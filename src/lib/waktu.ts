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
