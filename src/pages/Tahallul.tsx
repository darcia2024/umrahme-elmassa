import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doaById } from '../data/doa';
import { IconBack, IconChevron, IconScissors } from '../components/icons';

const langkah = [
  {
    no: 1,
    judul: 'Waktu pelaksanaan',
    isi: 'Tahallul dilakukan setelah selesai Sa\'i — bukan sebelumnya. Ini langkah terakhir yang menyempurnakan rangkaian umrah.',
  },
  {
    no: 2,
    judul: 'Untuk laki-laki',
    isi: 'Disunnahkan mencukur habis (gundul) seluruh rambut kepala — ini yang lebih utama (afdhal). Boleh juga hanya memendekkan atau memotong sebagian, minimal 3 helai rambut dari seluruh bagian kepala.',
  },
  {
    no: 3,
    judul: 'Untuk perempuan',
    isi: 'Cukup memotong ujung rambut sepanjang kurang lebih satu ruas jari (sekitar 2–3 cm). Tidak boleh mencukur habis. Minimal memotong 3 helai dari ujung rambut.',
  },
  {
    no: 4,
    judul: 'Setelah tahallul',
    isi: 'Dengan selesainya tahallul, seluruh larangan ihram gugur — jamaah kembali halal melakukan hal-hal yang sebelumnya dilarang saat ihram (memakai wangi-wangian, memotong kuku, dsb.).',
  },
  {
    no: 5,
    judul: 'Ikuti arahan pembimbing',
    isi: 'Untuk teknis pelaksanaan di lapangan (lokasi, tukang cukur, atau detail fiqih lainnya), ikuti petunjuk pembimbing atau muthawwif perjalanan Anda.',
  },
];

export default function Tahallul() {
  const navigate = useNavigate();
  const [bukaTerjemahan, setBukaTerjemahan] = useState(false);
  const doa = doaById('tahallul-doa');

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-canvas lg:min-h-screen">
      <div className="mx-auto w-full max-w-lg">

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 pt-5"
          style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-card text-ink active:scale-95 transition shadow-drop-card"
          >
            <IconBack className="h-5 w-5" />
          </button>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Langkah Terakhir
          </p>
          <span className="w-11" />
        </div>

        {/* Opening */}
        <div className="mt-6 px-5 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10 text-gold">
            <IconScissors className="h-9 w-9" />
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink">
            Tahallul
          </h1>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-charcoal">
            Anda telah menyelesaikan Sa'i. Tahallul adalah langkah terakhir yang{' '}
            <span className="font-semibold text-ink">menyempurnakan umrah Anda</span>
            {' '}— dengan memotong atau mencukur rambut, jamaah resmi keluar dari ihram.
          </p>
        </div>

        {/* Langkah praktis */}
        <div className="mt-8 px-5">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-mute">
            Langkah Pelaksanaan
          </p>
          <div className="space-y-3">
            {langkah.map((l) => (
              <div
                key={l.no}
                className="flex gap-4 rounded-md border border-hairline bg-surface-card px-4 py-4 shadow-drop-card"
              >
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-on-primary">
                  {l.no}
                </span>
                <div>
                  <p className="font-semibold text-ink">{l.judul}</p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal">{l.isi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doa Tahallul */}
        <div className="mt-8 px-5">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-mute">
            Doa saat menggunting rambut
          </p>
          {doa ? (
            <div className="w-full rounded-md border border-gold/30 bg-surface-card px-5 py-5 text-center shadow-drop-card">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
                Doa Tahallul
              </p>
              <p className="mt-3 font-arab text-3xl leading-relaxed text-gold" dir="rtl">
                {doa.arab}
              </p>
              <p className="mt-3 text-sm italic leading-relaxed text-charcoal">
                {doa.latin}
              </p>
              <button
                type="button"
                onClick={() => setBukaTerjemahan((v) => !v)}
                className="mt-3 font-mono text-[10px] uppercase tracking-widest text-mute"
              >
                {bukaTerjemahan ? '▲ Sembunyikan' : '▼ Terjemahan'}
              </button>
              {bukaTerjemahan && (
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  {doa.terjemahan}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-mute">Doa tahallul belum tersedia.</p>
          )}
        </div>

        {/* Penutup & CTA */}
        <div className="mt-10 px-5 pb-12 text-center">
          <div className="rounded-md border border-badge-success/20 bg-badge-success/8 px-6 py-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-badge-success">
              Umrah Sempurna
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink">
              Alhamdulillah,<br />rangkaian umrah selesai.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal">
              Tawaf → Sa'i → Tahallul sudah dilalui. Semoga umrah Anda diterima dan menjadi
              umrah yang mabrur.
            </p>
          </div>

          <Link
            to="/profil/sertifikat"
            className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-on-primary active:scale-[0.99] transition"
          >
            Lihat Sertifikat <IconChevron className="h-5 w-5" />
          </Link>
          <Link
            to="/beranda"
            className="mt-3 flex min-h-[44px] w-full items-center justify-center font-mono text-xs uppercase tracking-wider text-mute"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
