import { useState } from 'react';
import { Link } from 'react-router-dom';
import { lokasiByKota, type KotaFilter } from '../data/lokasi';
import type { Lokasi } from '../types';
import PageHeader from '../components/PageHeader';
import { IconPeta, IconChevron } from '../components/icons';

const tabs: { id: KotaFilter; label: string }[] = [
  { id: 'Makkah', label: 'Makkah' },
  { id: 'Madinah', label: 'Madinah' },
  { id: 'Haji', label: 'Haji' },
  { id: 'Lainnya', label: 'Lainnya' },
];

const PRIORITY_IDS = ['masjidil-haram', 'masjid-nabawi'];

function sortLokasi(list: Lokasi[]) {
  return [...list].sort((a, b) => {
    const ai = PRIORITY_IDS.indexOf(a.id);
    const bi = PRIORITY_IDS.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });
}

export default function Peta() {
  const [tab, setTab] = useState<KotaFilter>('Makkah');
  const lokasi = sortLokasi(lokasiByKota(tab));

  return (
    <div>
      <PageHeader title="Peta Lokasi" eyebrow="Panduan" backTo="/panduan" />

      <div className="px-4 pt-4 pb-8 sm:px-5 lg:px-8 lg:max-w-5xl lg:mx-auto">
        {/* Tab kategori */}
        <div className="mb-3 flex gap-1.5 rounded-full border border-hairline bg-surface-bone p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`min-h-[36px] flex-1 rounded-full px-1.5 text-[12px] font-medium transition ${
                tab === t.id ? 'bg-primary text-on-primary' : 'text-mute active:bg-surface-card hover:text-body'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Jumlah lokasi */}
        <p className="mb-3 font-mono text-[11px] text-mute">
          {lokasi.length} lokasi
        </p>

        {/* Grid lokasi — 1 kolom mobile, 2 kolom desktop */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {lokasi.map((l) => (
            <Link
              key={l.id}
              to={`/peta/${l.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-card transition-all hover:border-hairline hover:shadow-drop-soft active:scale-[0.99]"
            >
              {/* ── Gambar ── */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-bone">
                {l.gambar ? (
                  <img
                    src={l.gambar}
                    alt={l.nama}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-[0.18]"
                      style={{ backgroundImage: 'repeating-linear-gradient(45deg, #d4a24e 0 1px, transparent 1px 9px)' }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconPeta className="h-7 w-7 text-gold/50" />
                    </div>
                  </>
                )}

                {/* Badge tipe — kiri atas */}
                <span className="absolute left-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {l.tipe === 'masjid' ? 'Masjid' : 'Bersejarah'}
                </span>

                {/* Badge kota — kanan atas */}
                <span className="absolute right-2.5 top-2.5 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
                  {l.kota}
                </span>

                {/* Gradient bawah */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" aria-hidden />
              </div>

              {/* ── Konten ── */}
              <div className="flex flex-1 flex-col p-3.5">
                {/* Nama */}
                <h2 className="text-[15.5px] font-bold leading-snug text-ink">{l.nama}</h2>

                {/* Nama Arab */}
                {l.namaArab && (
                  <p className="mt-0.5 font-arab text-[15px] leading-relaxed text-gold" dir="rtl">{l.namaArab}</p>
                )}

                {/* Ringkas */}
                <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-charcoal">{l.ringkas}</p>

                {/* Footer — jarak + CTA */}
                <div className="mt-3 flex items-center justify-between border-t border-hairline pt-2.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-mute">
                    <IconPeta className="h-3.5 w-3.5 text-gold/70" />
                    <span>{l.jarakKm} km dari pusat</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Detail
                    <IconChevron className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
