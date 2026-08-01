import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { IconMoon } from '../components/icons';
import { jadwalMakkah, type WaktuSholat } from '../data/jadwalSholat';
import { getWaktuSaudi } from '../lib/waktu';

// ── Ikon per tipe waktu sholat ──────────────────────────────
function IconWaktu({ tipe, className = '' }: { tipe: WaktuSholat['ikonTipe']; className?: string }) {
  if (tipe === 'subuh' || tipe === 'isya') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 12.79 A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79 Z" />
      </svg>
    );
  }
  if (tipe === 'maghrib') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 18 a5 5 0 0 0-10 0" />
        <path d="M12 9 V2" />
        <path d="M4.22 10.22 L5.64 11.64" />
        <path d="M1 18 h3 M20 18 h3" />
        <path d="M18.36 11.64 L19.78 10.22" />
      </svg>
    );
  }
  if (tipe === 'ashar') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2 v3 M12 19 v3 M4.22 4.22 l2.12 2.12 M17.66 17.66 l2.12 2.12 M2 12 h3 M19 12 h3 M4.22 19.78 l2.12-2.12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2 v3 M12 19 v3 M4.22 4.22 l2.12 2.12 M17.66 17.66 l2.12 2.12 M2 12 h3 M19 12 h3 M4.22 19.78 l2.12-2.12 M17.66 6.34 l2.12-2.12" />
    </svg>
  );
}

// Bintang 5 sudut — penanda malam/Isya
function IconStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.5 L14.3 9.5 H21.8 L15.9 13.8 L18.1 20.8 L12 16.5 L5.9 20.8 L8.1 13.8 L2.2 9.5 H9.7 Z" />
    </svg>
  );
}

// ── Timeline horizontal — 5 titik doa pada garis waktu 24 jam ──
function PrayerTimeline({
  waktuList,
  progressMenit,
}: {
  waktuList: WaktuSholat[];
  progressMenit: number;
}) {
  return (
    <div className="grid grid-cols-5 px-3 pb-1">
      {waktuList.map((prayer) => {
        const [ph, pm] = prayer.jamMulai.split(':').map(Number);
        const pMin = ph * 60 + pm;
        const [ah, am] = prayer.jamAkhir.split(':').map(Number);
        const aMin = ah * 60 + am;
        const isSekarang = progressMenit >= pMin && progressMenit < aMin;
        const passed = pMin < progressMenit && !isSekarang;

        return (
          <div key={prayer.id} className="flex flex-col items-center gap-1.5">
            {/* Jam */}
            <span
              className="font-mono text-[9px] tabular-nums"
              style={{ color: isSekarang ? '#0ea5e9' : '#9a9590', fontWeight: isSekarang ? 600 : 400 }}
            >
              {prayer.jamMulai}
            </span>

            {/* Dot */}
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full transition-all"
              style={isSekarang
                ? { background: '#0ea5e9', boxShadow: '0 0 0 5px rgba(14,165,233,0.12)' }
                : passed
                  ? { background: 'rgba(14,165,233,0.35)', border: '1.5px solid rgba(14,165,233,0.5)' }
                  : { background: '#f0ede6', border: '1.5px solid #c8c3b8' }
              }
            />

            {/* Nama */}
            <span
              className="font-mono text-[8px] uppercase tracking-wider"
              style={{ color: isSekarang ? '#0ea5e9' : '#9a9590', fontWeight: isSekarang ? 600 : 400 }}
            >
              {prayer.nama}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Checkbox notifikasi — semua default ON ──────────────────
function ToggleNotif() {
  const [on, setOn] = useState(true);
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        on
          ? 'border-primary bg-primary'
          : 'border-hairline bg-surface-bone'
      }`}
    >
      {on && (
        <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
          <path
            d="M2 6l3 3 5-5"
            stroke="white"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

// ── Konstanta tanggal ───────────────────────────────────────
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

// ── Halaman utama ───────────────────────────────────────────
export default function JadwalSholat() {
  const jadwal = jadwalMakkah;
  const [ws, setWs] = useState(() => getWaktuSaudi());

  useEffect(() => {
    const id = setInterval(() => setWs(getWaktuSaudi()), 1000);
    return () => clearInterval(id);
  }, []);

  const jam    = ws.jam.toString().padStart(2, '0');
  const menit  = ws.menit.toString().padStart(2, '0');
  const detik  = ws.detik.toString().padStart(2, '0');
  const progressMenit = ws.totalMenit;

  const tanggal = `${HARI[ws.hari]}, ${ws.tanggal} ${BULAN[ws.bulan]} ${ws.tahun}`;

  const sholatBerikutnya = jadwal.waktuList.find((w) => {
    const [h, m] = w.jamMulai.split(':').map(Number);
    return h * 60 + m > progressMenit;
  });

  return (
    <div className="pb-24">
      <PageHeader title="Jadwal Sholat" eyebrow="Ibadah" backTo="/ibadah" />

      {/* ═══════════════════════════════════════════════════
          HERO CARD — jam + timeline
      ═══════════════════════════════════════════════════ */}
      <div className="mt-4 px-5">
        <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-card shadow-drop-card">

          {/* Baris atas: kota + tanggal */}
          <div className="flex items-center justify-between border-b border-hairline px-5 pb-3 pt-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-mute">
                {jadwal.kota}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-ash">{tanggal}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 items-center rounded-full border border-hairline bg-surface-bone px-2.5">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-ash">Waktu Saudi (WAS)</span>
              </div>
              <div className="flex h-6 items-center rounded-full border border-hairline bg-surface-bone px-2.5">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-ash">Data statis</span>
              </div>
            </div>
          </div>

          {/* Jam besar */}
          <div className="flex items-end justify-center gap-1.5 px-5 py-6">
            <span className="font-display text-[68px] font-bold tabular-nums leading-none tracking-tight text-ink">
              {jam}:{menit}
            </span>
            <span className="mb-[3px] font-mono text-[20px] font-semibold tabular-nums leading-none text-mute">
              :{detik}
            </span>
          </div>

          {/* Timeline */}
          <div className="px-1 pb-1">
            <PrayerTimeline waktuList={jadwal.waktuList} progressMenit={progressMenit} />
          </div>

          {/* Baris bawah: Subuh — berikutnya — Isya */}
          <div className="flex items-start justify-between border-t border-hairline px-5 py-3.5">
            {/* Subuh */}
            <div className="flex items-center gap-1.5">
              <IconMoon className="h-3.5 w-3.5 flex-none text-mute" />
              <div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-mute">Subuh</p>
                <p className="mt-0.5 font-mono text-[13px] font-semibold text-ink">{jadwal.jamSubuh}</p>
              </div>
            </div>

            {/* Sholat berikutnya (tengah) */}
            {sholatBerikutnya ? (
              <div className="text-center">
                <p className="font-mono text-[8px] uppercase tracking-widest text-primary/70">Berikutnya</p>
                <p className="mt-0.5 font-mono text-[13px] font-semibold text-primary">
                  {sholatBerikutnya.nama}
                </p>
                <p className="font-mono text-[10px] text-mute">{sholatBerikutnya.jamMulai}</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="font-mono text-[8px] uppercase tracking-widest text-mute">Hari ini</p>
                <p className="mt-0.5 font-mono text-[11px] text-ash">Selesai ✓</p>
              </div>
            )}

            {/* Isya */}
            <div className="flex items-center gap-1.5">
              <div className="text-right">
                <p className="font-mono text-[8px] uppercase tracking-widest text-mute">Isya</p>
                <p className="mt-0.5 font-mono text-[13px] font-semibold text-ink">{jadwal.jamIsya}</p>
              </div>
              <IconStar className="h-3.5 w-3.5 flex-none text-mute" />
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          LIST — 5 waktu sholat
      ═══════════════════════════════════════════════════ */}
      <section className="mt-5 px-5">
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-mute">
          Waktu Sholat
        </h2>

        <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-card shadow-drop-card">
          {jadwal.waktuList.map((w, i) => {
            const [h, m] = w.jamMulai.split(':').map(Number);
            const mulaiMenit = h * 60 + m;
            const [ah, am] = w.jamAkhir.split(':').map(Number);
            const akhirMenit = ah * 60 + am;

            const isSekarang = progressMenit >= mulaiMenit && progressMenit < akhirMenit;
            const sudahLewat = mulaiMenit < progressMenit && !isSekarang;
            const isBerikutnya = sholatBerikutnya?.id === w.id && !isSekarang;

            return (
              <div
                key={w.id}
                className={[
                  'relative flex min-h-[64px] items-center gap-4 pl-4 pr-5 py-3',
                  i < jadwal.waktuList.length - 1 ? 'border-b border-hairline' : '',
                  isSekarang ? 'bg-primary/[0.035]' : isBerikutnya ? 'bg-gold/[0.04]' : '',
                ].join(' ')}
              >
                {/* Aksen vertikal kiri */}
                {(isSekarang || isBerikutnya) && (
                  <div
                    className={`absolute inset-y-0 left-0 w-[3px] ${
                      isSekarang ? 'bg-primary' : 'bg-gold'
                    }`}
                  />
                )}

                {/* Ikon tipe */}
                <div
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl border ${
                    isSekarang
                      ? 'border-primary/25 bg-primary/10 text-primary'
                      : isBerikutnya
                        ? 'border-gold/30 bg-gold/10 text-gold'
                        : sudahLewat
                          ? 'border-hairline bg-surface-bone text-ash'
                          : 'border-hairline bg-surface-bone text-charcoal'
                  }`}
                >
                  <IconWaktu tipe={w.ikonTipe} className="h-5 w-5" />
                </div>

                {/* Nama & rentang jam */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <p
                      className={`text-[15px] font-semibold leading-tight ${
                        isSekarang
                          ? 'text-primary'
                          : isBerikutnya
                            ? 'text-gold'
                            : sudahLewat
                              ? 'text-ash'
                              : 'text-ink'
                      }`}
                    >
                      {w.nama}
                    </p>

                    {isSekarang && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                        Sekarang
                      </span>
                    )}

                    {isBerikutnya && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        Berikutnya
                      </span>
                    )}
                  </div>

                  <p className={`mt-0.5 font-mono text-[12px] ${sudahLewat ? 'text-ash' : 'text-mute'}`}>
                    {w.jamMulai} – {w.jamAkhir}
                  </p>
                </div>

                {/* Toggle notifikasi */}
                <ToggleNotif />
              </div>
            );
          })}
        </div>
      </section>

      {/* Keterangan bawah */}
      <p className="mt-5 px-5 text-center font-mono text-[10px] leading-relaxed text-ash">
        {jadwal.keterangan}
      </p>
    </div>
  );
}
