import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ELMASSA_WEB_URL } from '../../config/site';
import {
  ambilStatusPendataan,
  ambilTokenPendataan,
  urlFormPendataan,
  type HasilStatusPendataan,
} from '../../lib/pendataan';

if (import.meta.env.DEV && !ELMASSA_WEB_URL) {
  console.warn('VITE_ELMASSA_WEB_URL belum di-set: kartu "Lengkapi Data Umrah" tidak bisa membuka form pendataan.');
}

// Token hanya hidup di state ini (memori), diambil ulang setiap kartu dimuat.
export type Keadaan =
  | { tahap: 'memuat' }
  | { tahap: 'belum-ditautkan' }
  | { tahap: 'gagal' }
  | { tahap: 'siap'; token: string; status: HasilStatusPendataan | null };

// Urut dari terburuk ke terbaik, sesuai El Massa Web.
export const GAYA_STATUS: Record<string, { badge: string; titik: string }> = {
  'Data Belum Lengkap':    { badge: 'bg-rose-50 text-rose-700 border-rose-200',          titik: 'bg-rose-500' },
  'Dokumen Belum Lengkap': { badge: 'bg-amber-50 text-amber-800 border-amber-200',       titik: 'bg-amber-500' },
  'Siap Diproses':         { badge: 'bg-blue-50 text-blue-700 border-blue-200',          titik: 'bg-blue-500' },
  'Siap Masuk Manifest':   { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', titik: 'bg-emerald-500' },
};
export const GAYA_NETRAL = { badge: 'bg-stone-100 text-stone-700 border-stone-200', titik: 'bg-stone-400' };

// Cegah muat ganda saat focus dan visibilitychange menyala bersamaan.
const JEDA_MUAT_MS = 2000;

function IconBerkas({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6 M9 17h4" />
    </svg>
  );
}

function DaftarKurang({ judul, isi }: { judul: string; isi: string[] }) {
  if (isi.length === 0) return null;
  return (
    <div>
      <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">{judul}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {isi.map((x) => (
          <span key={x} className="rounded-md border border-hairline bg-surface-bone px-2 py-0.5 text-[11px] text-charcoal">{x}</span>
        ))}
      </div>
    </div>
  );
}

function Pesan({ children }: { children: string }) {
  return <p className="text-[12px] leading-relaxed text-charcoal">{children}</p>;
}

export interface Pendataan {
  keadaan: Keadaan;
  muatUlang: () => void;
}

/**
 * Panggil sekali per halaman, lalu oper hasilnya ke setiap <KartuPendataan>.
 * Beranda merender tampilan mobile dan desktop bersamaan, jadi memanggil
 * hook ini per kartu berarti RPC dan API dipanggil dua kali.
 */
export function usePendataan(): Pendataan {
  const { jamaah } = useAuth();
  const nama = jamaah?.nama ?? '';
  const kode = jamaah?.kodeAktivasi;

  const [keadaan, setKeadaan] = useState<Keadaan>({ tahap: 'memuat' });
  const kontroler = useRef<AbortController | null>(null);
  const terakhirMuat = useRef(0);

  const muat = useCallback(async (paksa = false) => {
    if (!nama) return;
    const sekarang = Date.now();
    if (!paksa && sekarang - terakhirMuat.current < JEDA_MUAT_MS) return;
    terakhirMuat.current = sekarang;

    kontroler.current?.abort();
    const k = new AbortController();
    kontroler.current = k;

    try {
      const token = ELMASSA_WEB_URL ? await ambilTokenPendataan(nama, kode) : null;
      if (k.signal.aborted) return;
      if (!token) {
        setKeadaan({ tahap: 'belum-ditautkan' });
        return;
      }
      // Status lama tetap tampil selama dimuat ulang, supaya kartu tidak berkedip.
      setKeadaan((prev) =>
        prev.tahap === 'siap' && prev.token === token ? prev : { tahap: 'siap', token, status: null },
      );
      const status = await ambilStatusPendataan(token, k.signal);
      if (k.signal.aborted) return;
      setKeadaan({ tahap: 'siap', token, status });
    } catch {
      if (!k.signal.aborted) setKeadaan({ tahap: 'gagal' });
    }
  }, [nama, kode]);

  useEffect(() => {
    muat();
    // Jamaah biasanya baru kembali dari form pendataan di tab lain: muat ulang statusnya.
    const onFocus = () => { muat(); };
    const onVisible = () => { if (document.visibilityState === 'visible') muat(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisible);
      kontroler.current?.abort();
      terakhirMuat.current = 0;
    };
  }, [muat]);

  return { keadaan, muatUlang: () => { muat(true); } };
}

export function KartuPendataan({ pendataan }: { pendataan: Pendataan }) {
  const { keadaan, muatUlang } = pendataan;

  const bukaForm = () => {
    if (keadaan.tahap !== 'siap') return;
    const url = urlFormPendataan(keadaan.token);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const status = keadaan.tahap === 'siap' ? keadaan.status : null;
  const kelengkapan = status?.ok ? status.kelengkapan : null;
  const gaya = kelengkapan ? (GAYA_STATUS[kelengkapan.status] ?? GAYA_NETRAL) : null;
  const linkDiganti = status?.ok === false && status.alasan === 'link-diganti';
  const tampilTombol = keadaan.tahap === 'siap' && !linkDiganti;

  return (
    <div className="rounded-2xl bg-white p-4" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
          <IconBerkas className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Pendataan Jamaah</p>
          <p className="mt-0.5 text-[13px] font-semibold text-ink">Lengkapi Data Umrah</p>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {kelengkapan && gaya && (
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${gaya.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${gaya.titik}`} />
            {kelengkapan.status}
          </span>
        )}
        {keadaan.tahap === 'memuat' && (
          <div className="space-y-2" aria-busy="true">
            <div className="h-3 w-3/4 animate-pulse rounded bg-surface-bone" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-bone" />
          </div>
        )}

        {keadaan.tahap === 'belum-ditautkan' && (
          <Pesan>Data kamu sedang disiapkan kantor El Massa. Hubungi admin untuk link pendataan.</Pesan>
        )}

        {keadaan.tahap === 'gagal' && (
          <div className="flex items-center justify-between gap-3">
            <Pesan>Server sedang bermasalah, coba lagi nanti.</Pesan>
            <button type="button" onClick={muatUlang}
              className="flex-none font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
              Coba Lagi
            </button>
          </div>
        )}

        {keadaan.tahap === 'siap' && (
          <>
            {status === null && (
              <p className="text-[12px] text-mute">Memeriksa kelengkapan data…</p>
            )}
            {linkDiganti && (
              <Pesan>Link pendataan kamu sudah diganti kantor. Minta link baru ke admin El Massa.</Pesan>
            )}
            {status?.ok === false && status.alasan === 'server' && (
              <Pesan>Status kelengkapan belum bisa dimuat, server sedang bermasalah. Coba lagi nanti.</Pesan>
            )}
            {kelengkapan && (
              <>
                {kelengkapan.missingFields.length === 0 && kelengkapan.missingDocs.length === 0 ? (
                  <Pesan>Data dan dokumen kamu sudah lengkap.</Pesan>
                ) : (
                  <>
                    <DaftarKurang judul="Data yang masih kurang" isi={kelengkapan.missingFields} />
                    <DaftarKurang judul="Dokumen yang masih kurang" isi={kelengkapan.missingDocs} />
                  </>
                )}
                {kelengkapan.warnings.length > 0 && (
                  <ul className="space-y-1">
                    {kelengkapan.warnings.map((w) => (
                      <li key={w} className="text-[11px] leading-snug text-amber-800">• {w}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </>
        )}

        {tampilTombol && (
          <button type="button" onClick={bukaForm}
            className="w-full sm:w-auto sm:px-6 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white active:scale-[0.98] transition-transform"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)' }}>
            Lengkapi Data &amp; Dokumen
          </button>
        )}
      </div>
    </div>
  );
}
