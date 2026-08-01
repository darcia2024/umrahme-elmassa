import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doaById } from '../data/doa';
import { IconBack, IconReset, IconCheck, IconChevron } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { getJamaahData, setJamaahData } from '../lib/supabase';

const TOTAL = 7;
const STORAGE = 'umrahme.tawaf';

const doaRabbana = doaById('tawaf-rabbana-atina');

function DoaCard({
  putaran,
}: {
  putaran: number;
}) {
  const [bukaTerjemahan, setBukaTerjemahan] = useState(false);
  const doa = doaById(`tawaf-putaran-${putaran}`);

  return (
    <div className="mt-5 w-full space-y-2">
      <div className="w-full rounded-md border border-hairline bg-surface-card px-4 py-3 text-center shadow-drop-card">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          Doa Putaran Ke-{putaran}
        </p>
        {doa ? (
          <>
            <p className="mt-2 font-arab text-2xl leading-relaxed text-ink" dir="rtl">
              {doa.arab}
            </p>
            <p className="mt-1.5 text-xs italic leading-relaxed text-charcoal">
              {doa.latin}
            </p>
            <button
              type="button"
              onClick={() => setBukaTerjemahan((v) => !v)}
              className="mt-2 font-mono text-[10px] uppercase tracking-widest text-mute"
            >
              {bukaTerjemahan ? '▲ Sembunyikan' : '▼ Terjemahan'}
            </button>
            {bukaTerjemahan && (
              <p className="mt-1.5 text-xs leading-relaxed text-charcoal">
                {doa.terjemahan}
              </p>
            )}
          </>
        ) : (
          <p className="mt-2 text-xs text-mute">Doa untuk putaran ini belum tersedia.</p>
        )}
      </div>

      {doaRabbana && (
        <div className="w-full rounded-md border border-hairline bg-surface-bone px-4 py-3 text-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-mute">
            Dibaca antara Rukun Yamani & Hajar Aswad
          </p>
          <p className="mt-1.5 font-arab text-xl leading-relaxed text-gold" dir="rtl">
            {doaRabbana.arab}
          </p>
          <p className="mt-1 text-[11px] italic leading-relaxed text-charcoal">
            {doaRabbana.latin}
          </p>
        </div>
      )}
    </div>
  );
}

export default function CounterTawaf() {
  const navigate = useNavigate();
  const { jamaah, tenant } = useAuth();
  const tid = tenant?.id;
  const nm = jamaah?.nomorJamaah;

  const [count, setCount] = useState<number>(() => {
    const v = Number(localStorage.getItem(STORAGE));
    return Number.isFinite(v) && v >= 0 && v <= TOTAL ? v : 0;
  });
  const [konfirmasiReset, setKonfirmasiReset] = useState(false);

  useEffect(() => {
    if (!tid || !nm) return;
    getJamaahData<number>(tid, nm, 'counter.tawaf').then((cloud) => {
      const local = Number(localStorage.getItem(STORAGE)) || 0;
      if (typeof cloud === 'number' && cloud > local && cloud <= TOTAL) {
        setCount(cloud);
        localStorage.setItem(STORAGE, String(cloud));
      }
    }).catch(() => {});
  }, [tid, nm]);

  useEffect(() => {
    localStorage.setItem(STORAGE, String(count));
    if (tid && nm) setJamaahData(tid, nm, 'counter.tawaf', count).catch(() => {});
  }, [count, tid, nm]);

  const selesai = count >= TOTAL;
  const putaranBerjalan = Math.min(count + 1, TOTAL);

  function tap() {
    if (selesai) return;
    setCount((c) => Math.min(TOTAL, c + 1));
    if (navigator.vibrate) navigator.vibrate(35);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setCount(0);
    setKonfirmasiReset(false);
  }

  const persen = (count / TOTAL) * 100;

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col bg-canvas lg:min-h-screen lg:items-center lg:justify-center">
      <div className="w-full lg:max-w-sm">
        <div
          className="flex items-center justify-between px-4 pt-4"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-card text-ink active:scale-95 transition shadow-drop-card"
          >
            <IconBack className="h-5 w-5" />
          </button>

          {!selesai ? (
            <button
              type="button"
              onClick={() => setKonfirmasiReset(true)}
              className="flex items-center gap-1.5 rounded-full border border-hairline bg-surface-card px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-mute active:scale-95"
            >
              <IconReset className="h-3.5 w-3.5" /> Reset
            </button>
          ) : (
            <span className="w-11" />
          )}
        </div>

        {selesai ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center animate-fade-up py-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-badge-success/30 bg-badge-success/10 text-badge-success">
              <IconCheck className="h-12 w-12" />
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-badge-success">
              7 dari 7 putaran
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-ink">
              Tawaf Selesai
            </h1>
            <p className="mt-2 max-w-[28ch] text-pretty text-[15px] leading-relaxed text-charcoal">
              Alhamdulillah. Setelah tawaf, lanjutkan dengan shalat di Maqam Ibrahim lalu menuju
              Sa'i antara Shafa & Marwah.
            </p>

            <Link
              to="/ibadah/sai"
              className="mt-8 flex min-h-[52px] w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-on-primary active:scale-[0.99]"
            >
              Lanjut ke Sa'i <IconChevron className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => setKonfirmasiReset(true)}
              className="mt-4 font-mono text-xs uppercase tracking-wider text-mute underline-offset-4 hover:underline"
            >
              Ulangi dari awal
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center px-6 pb-6">
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">
              Tawaf · Mengelilingi Ka'bah
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[88px] font-bold leading-none text-ink">
                {count}
              </span>
              <span className="font-display text-3xl text-mute">/ {TOTAL}</span>
            </div>
            <p className="mt-1 text-sm text-charcoal">putaran selesai</p>

            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i < count ? 'bg-primary' : 'bg-surface-bone border border-hairline'
                  }`}
                />
              ))}
            </div>

            <DoaCard putaran={putaranBerjalan} />

            <button
              type="button"
              onClick={tap}
              aria-label={`Tap untuk menambah putaran. Saat ini ${count} dari ${TOTAL}.`}
              className="relative mt-8 mb-2 flex h-56 w-56 select-none items-center justify-center rounded-full active:scale-[0.98] transition-transform"
              style={{
                background: `conic-gradient(#0ea5e9 ${persen}%, #f3f0e8 ${persen}%)`,
                padding: '8px',
              }}
            >
              <span className="flex h-full w-full flex-col items-center justify-center rounded-full bg-primary text-on-primary shadow-drop-soft">
                <span className="font-display text-2xl font-bold">TAP</span>
                <span className="mt-1 font-mono text-[11px] uppercase tracking-widest text-on-primary/80">
                  tiap putaran
                </span>
              </span>
            </button>
          </div>
        )}
      </div>

      {konfirmasiReset ? (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-app items-end bg-ink/30 backdrop-blur-sm lg:max-w-none lg:items-center lg:justify-center">
          <div className="w-full rounded-t-2xl border-t border-hairline bg-surface-card p-6 pb-8 animate-fade-up shadow-drop-soft lg:max-w-sm lg:rounded-2xl lg:border">
            <h3 className="font-display text-xl font-bold text-ink">
              Ulangi hitungan tawaf?
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-charcoal">
              Progress {count} putaran akan dihapus dan kembali ke 0. Tindakan ini tidak bisa
              dibatalkan.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setKonfirmasiReset(false)}
                className="min-h-[44px] flex-1 rounded-full border border-hairline-strong font-medium text-ink active:scale-[0.99]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={reset}
                className="min-h-[44px] flex-1 rounded-full bg-primary font-semibold text-on-primary active:scale-[0.99]"
              >
                Ya, ulangi
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
