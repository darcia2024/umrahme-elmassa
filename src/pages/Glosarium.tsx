import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { daftarIstilah, type IstilahGlosarium } from '../data/glosarium';

const KAT_LABEL: Record<IstilahGlosarium['kategori'] | 'semua', string> = {
  semua: 'Semua',
  ihram: 'Ihram',
  tawaf: 'Tawaf',
  sai: "Sa'i",
  tempat: 'Tempat',
  umum: 'Umum',
  waktu: 'Waktu',
};

const KATEGORI_LIST = Object.keys(KAT_LABEL) as (IstilahGlosarium['kategori'] | 'semua')[];

export default function Glosarium() {
  const [q, setQ] = useState('');
  const [kat, setKat] = useState<'semua' | IstilahGlosarium['kategori']>('semua');
  const location = useLocation();
  const hashTarget = location.hash?.replace('#', '') ?? '';

  useEffect(() => {
    if (!hashTarget) return;
    const t = setTimeout(() => {
      const el = document.getElementById(hashTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-primary/40');
        setTimeout(() => el.classList.remove('ring-2', 'ring-primary/40'), 2000);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [hashTarget]);

  const hasil = daftarIstilah
    .filter((it) => kat === 'semua' || it.kategori === kat)
    .filter((it) => {
      const s = q.trim().toLowerCase();
      if (!s) return true;
      return (
        it.istilah.toLowerCase().includes(s) ||
        it.arti.toLowerCase().includes(s) ||
        (it.arab ?? '').includes(s)
      );
    })
    .sort((a, b) => a.istilah.localeCompare(b.istilah, 'id'));

  return (
    <div className="pb-10">
      <PageHeader title="Glosarium" eyebrow="Panduan" backTo="/panduan" />

      <div className="px-5 pt-5 space-y-4 lg:px-8 lg:max-w-3xl lg:mx-auto">

        {/* Search bar */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Cari istilah atau arti…"
            className="w-full rounded-full border border-hairline bg-surface-card py-2.5 pl-10 pr-4 text-[14px] text-ink placeholder:text-ash outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition"
          />
        </div>

        {/* Filter kategori */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {KATEGORI_LIST.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKat(k)}
              className={`flex-none rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition ${
                kat === k
                  ? 'bg-primary text-on-primary'
                  : 'border border-hairline bg-surface-card text-mute hover:text-body'
              }`}
            >
              {KAT_LABEL[k]}
            </button>
          ))}
        </div>

        {/* Jumlah hasil */}
        <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
          {hasil.length} istilah
        </p>

        {/* Daftar istilah */}
        {hasil.length === 0 ? (
          <div className="rounded-2xl border border-hairline bg-surface-card py-12 text-center">
            <p className="text-[14px] text-charcoal">Istilah tidak ditemukan</p>
            <p className="mt-1 text-[12px] text-ash">Coba kata kunci lain</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {hasil.map((it) => (
              <div
                key={it.id}
                id={it.id}
                className="rounded-2xl border border-hairline bg-surface-card p-4 shadow-drop-soft transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[15px] font-bold text-ink">{it.istilah}</h3>
                  {it.arab && (
                    <span className="flex-none font-arab text-[16px] text-gold" dir="rtl">
                      {it.arab}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal">{it.arti}</p>
                <span className="mt-2 inline-block rounded-full bg-surface-bone px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-mute">
                  {KAT_LABEL[it.kategori]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
