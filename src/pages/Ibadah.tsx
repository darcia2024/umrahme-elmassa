import React from 'react';
import { Link } from 'react-router-dom';
import { IconTawaf, IconSai, IconNavigator, IconScissors, IconMoon, IconDoa, IconChevron } from '../components/icons';

// ── Navigator Hero ──────────────────────────────────────────────
function NavigatorHero() {
  return (
    <Link to="/ibadah/navigator" className="block active:opacity-90 transition-opacity">
      <div
        className="relative overflow-hidden rounded-[28px] shadow-md"
        style={{
          background: 'linear-gradient(145deg, #be185d 0%, #e11d48 100%)',
          padding: '1px',
        }}
      >
        <div
          className="relative overflow-hidden rounded-[27px] p-6 sm:p-8"
          style={{ background: 'linear-gradient(145deg, #be185d 0%, #e11d48 100%)' }}
        >
          {/* Subtle Geometric Pattern Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0, rgba(255, 255, 255, 0.2) 1px, transparent 0, transparent 16px),
                repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 0, rgba(255, 255, 255, 0.2) 1px, transparent 0, transparent 16px)
              `,
            }}
          />

          {/* Badge */}
          <div className="relative inline-flex items-center gap-2 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/80 font-sans">
              Panduan Utama • El Massa
            </span>
          </div>

          {/* Body */}
          <div className="relative flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2
                className="font-display font-black text-white"
                style={{ fontSize: 'clamp(24px, 6vw, 32px)', letterSpacing: '-0.5px', lineHeight: 1.1 }}
              >
                Pemandu Ibadah
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80 max-w-[320px] font-sans">
                Ikuti tiap tahap umrah langkah demi langkah — progres tersimpan otomatis.
              </p>
            </div>

            {/* Ikon floated */}
            <div
              className="flex-none flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md text-white shadow-sm"
            >
              <IconNavigator className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* CTA */}
          <div className="relative mt-6">
            <span
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold bg-white text-pink-900 shadow-sm hover:bg-pink-50 transition"
            >
              Mulai Navigator <IconChevron className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Counter Card ────────────────────────────────────────────────
function CounterCard({
  to, title, desc, icon, cta,
}: {
  to: string; title: string; desc: string; icon: React.ReactNode; cta: string;
}) {
  return (
    <Link to={to} className="block active:scale-[0.97] transition-transform">
      <div className="h-full flex flex-col justify-between rounded-[22px] bg-white border border-stone-200/80 p-5 shadow-2xs hover:shadow-md hover:border-pink-200 transition-all">
        <div>
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl mb-3 text-pink-600 bg-pink-50 border border-pink-100"
          >
            {icon}
          </div>
          <h3 className="text-sm font-extrabold text-stone-900 leading-snug font-display">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-stone-500 font-sans">{desc}</p>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-pink-600">
          {cta} <IconChevron className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

// ── Halaman ─────────────────────────────────────────────────────
export default function Ibadah() {
  const doaLinks = [
    { to: '/doa?kategori=tawaf',    label: 'Doa Tawaf',    desc: "Saat mengelilingi Ka'bah" },
    { to: '/doa?kategori=sai',      label: "Doa Sa'i",     desc: 'Antara Shafa & Marwah' },
    { to: '/doa?kategori=tahallul', label: 'Doa Tahallul', desc: 'Mencukur / memotong rambut' },
  ];

  const counters = [
    {
      to:    '/ibadah/tawaf',
      title: 'Counter Tawaf',
      desc:  '7 putaran dengan satu tap. Doa muncul otomatis.',
      icon:  <IconTawaf className="h-5 w-5" />,
      cta:   'Mulai Tawaf',
    },
    {
      to:    '/ibadah/sai',
      title: "Counter Sa'i",
      desc:  '7 lintasan Shafa–Marwah. Arah & doa per lintasan.',
      icon:  <IconSai className="h-5 w-5" />,
      cta:   "Mulai Sa'i",
    },
    {
      to:    '/ibadah/tahallul',
      title: 'Tahallul',
      desc:  'Langkah terakhir — potong rambut, keluar ihram.',
      icon:  <IconScissors className="h-5 w-5" />,
      cta:   'Panduan',
    },
    {
      to:    '/ibadah/jadwal-sholat',
      title: 'Jadwal Sholat',
      desc:  'Waktu 5 sholat + pengingat adzan real-time.',
      icon:  <IconMoon className="h-5 w-5" />,
      cta:   'Lihat Jadwal',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ───── MOBILE ───── */}
      <div className="lg:hidden">

        {/* Header */}
        <header
          className="px-5 pb-5"
          style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-pink-600 font-bold mb-1">
            Saat di Tanah Suci
          </p>
          <h1
            className="font-display font-black text-stone-900"
            style={{ fontSize: 'clamp(28px, 8vw, 36px)', letterSpacing: '-1px', lineHeight: 1 }}
          >
            Ibadah
          </h1>
          <p className="mt-1.5 text-xs text-stone-500">
            Satu layar, satu fokus — buka cepat saat beribadah.
          </p>
        </header>

        {/* Navigator hero */}
        <section className="px-4">
          <NavigatorHero />
        </section>

        {/* Counter grid */}
        <section className="px-4 mt-5">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-stone-400 font-bold">Panduan & Counter</p>
          <div className="grid grid-cols-2 gap-3">
            {counters.map((c) => (
              <CounterCard key={c.to} {...c} />
            ))}
          </div>
        </section>

        {/* Doa section */}
        <section className="px-4 mt-6 pb-8">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-stone-400 font-bold">Doa Saat Ibadah</p>
          <div className="overflow-hidden rounded-[22px] border border-stone-200/80 bg-white shadow-2xs divide-y divide-stone-100">
            {doaLinks.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                className="flex items-center gap-3 px-4 py-4 active:bg-stone-50 transition-colors"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-pink-50 border border-pink-100 text-pink-600">
                  <IconDoa className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-stone-900 font-display">{it.label}</p>
                  <p className="text-xs text-stone-500 font-normal">{it.desc}</p>
                </div>
                <IconChevron className="h-4 w-4 flex-none text-stone-400" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ───── DESKTOP ───── */}
      <div className="hidden lg:block max-w-[1440px] mx-auto">
        <header className="px-8 pb-6 pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-pink-600 font-bold mb-1">Saat di Tanah Suci</p>
          <h1 className="font-display text-4xl font-black text-stone-900 tracking-tight">Ibadah</h1>
          <p className="mt-1 text-sm text-stone-500 font-medium">Buka cepat saat sedang beribadah. Satu layar, satu fokus.</p>
        </header>

        <div className="px-8 pb-10 space-y-6">
          <NavigatorHero />

          <div className="grid grid-cols-4 gap-4">
            {counters.map((c) => (
              <CounterCard key={c.to} {...c} />
            ))}
          </div>

          <div className="pt-2">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-stone-400 font-bold">Doa Saat Ibadah</p>
            <div className="grid grid-cols-3 gap-4">
              {doaLinks.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  className="flex items-center gap-4 rounded-[22px] border border-stone-200/80 bg-white px-5 py-4 hover:border-pink-300 hover:shadow-md transition-all shadow-2xs"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-pink-50 border border-pink-100 text-pink-600">
                    <IconDoa className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold text-stone-900 font-display">{it.label}</p>
                    <p className="text-xs text-stone-500 font-normal">{it.desc}</p>
                  </div>
                  <IconChevron className="h-4 w-4 flex-none text-stone-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
