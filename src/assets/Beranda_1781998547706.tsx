import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroBg from '@assets/photo-1635829576353-1a14caec2f6f_1781969073425.avif';
import PhaseIndicator from '../components/PhaseIndicator';
import { urutanFase } from '../data/jamaah';
import { checklistItems } from '../data/checklist';
import {
  IconDoa,
  IconPanduan,
  IconIbadah,
  IconTawaf,
  IconSai,
  IconMoon,
  IconIhram,
  IconPeta,
  IconCheck,
  IconSertifikat,
  IconChevron,
} from '../components/icons';

function MiniRing({ progress = 0, total = 7 }: { progress?: number; total?: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (progress / total) * circ;
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="flex-none" aria-hidden>
      <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(212,162,78,0.18)" strokeWidth="5" />
      <circle
        cx="26" cy="26" r={r} fill="none"
        stroke="#d4a24e"
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
      />
      <text x="26" y="26" textAnchor="middle" dy="0.35em" fill="#8d8d8d" fontSize="9" fontFamily="JetBrains Mono, monospace">
        {progress}/{total}
      </text>
    </svg>
  );
}

const quickIconColors: Record<string, { bg: string; icon: string; border: string }> = {
  doa:    { bg: '#ffffff', icon: '#3a3a3a', border: 'rgba(0,0,0,0.10)' },
  ihram:  { bg: '#ffffff', icon: '#3a3a3a', border: 'rgba(0,0,0,0.10)' },
  tawaf:  { bg: '#ffffff', icon: '#3a3a3a', border: 'rgba(0,0,0,0.10)' },
  sai:    { bg: '#ffffff', icon: '#3a3a3a', border: 'rgba(0,0,0,0.10)' },
  peta:   { bg: '#ffffff', icon: '#3a3a3a', border: 'rgba(0,0,0,0.10)' },
  sholat: { bg: '#ffffff', icon: '#3a3a3a', border: 'rgba(0,0,0,0.10)' },
};

function QuickIcon({ to, label, icon, colorKey }: { to: string; label: string; icon: ReactNode; colorKey: string }) {
  const c = quickIconColors[colorKey] ?? quickIconColors.doa;
  return (
    <Link to={to} className="group flex-none flex flex-col items-center gap-2 active:scale-95 transition-transform">
      <div
        className="flex h-[62px] w-[62px] items-center justify-center rounded-[20px] shadow-drop-lifted transition-all group-active:shadow-drop-card group-active:scale-95"
        style={{ background: c.bg, border: `1.5px solid ${c.border}` }}
      >
        <span style={{ color: c.icon }}>{icon}</span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{label}</span>
    </Link>
  );
}

function FeatureCard({ to, label, desc, icon }: { to: string; label: string; desc: string; icon: ReactNode }) {
  return (
    <Link to={to} className="group block">
      <div className="h-full rounded-2xl border border-hairline bg-white p-4 flex flex-col gap-3 transition-all hover:shadow-drop-lifted hover:-translate-y-0.5">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: 'linear-gradient(135deg, #fff8ee 0%, #fdf0d8 100%)', border: '1.5px solid rgba(212,162,78,0.22)' }}
        >
          <span className="text-gold">{icon}</span>
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-semibold leading-snug text-ink">{label}</p>
          <p className="mt-0.5 text-[12px] leading-relaxed text-charcoal">{desc}</p>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary/60 group-hover:text-primary group-hover:gap-1.5 transition-all">
          Buka <IconChevron className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

function SmallCard({ to, label, icon }: { to: string; label: string; icon: ReactNode }) {
  return (
    <Link to={to} className="group flex items-center gap-3 rounded-xl border border-hairline bg-white px-4 py-3.5 transition-all hover:shadow-drop-lifted hover:-translate-y-0.5">
      <span className="flex-none text-mute group-hover:text-primary transition-colors">{icon}</span>
      <span className="flex-1 text-[13px] font-medium text-ink">{label}</span>
      <IconChevron className="h-3.5 w-3.5 flex-none text-stone group-hover:text-ash transition-colors" />
    </Link>
  );
}

export default function Beranda() {
  const { jamaah } = useAuth();

  const totalPersiapan = checklistItems.length;
  const [persiapanDone] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('umrahme.persiapan');
      return raw ? (JSON.parse(raw) as string[]).length : 0;
    } catch {
      return 0;
    }
  });
  const persiapanPersen = totalPersiapan > 0 ? Math.round((persiapanDone / totalPersiapan) * 100) : 0;

  if (!jamaah) return null;

  const idxFase = urutanFase.findIndex((f) => f.id === jamaah.fase);
  const faseAktif = urutanFase[idxFase];

  const heroCta =
    jamaah.fase === 'tanah-suci'
      ? { label: 'Mulai Counter Tawaf', to: '/ibadah/tawaf' }
      : jamaah.fase === 'selesai'
        ? { label: 'Lihat Sertifikat', to: '/profil/sertifikat' }
        : { label: 'Buka Checklist Persiapan', to: '/profil/persiapan' };

  const faseDesc: Record<string, string> = {
    persiapan: 'Lengkapi dokumen, vaksin, dan perlengkapan sebelum keberangkatan.',
    perjalanan: 'Perjalanan menuju Tanah Suci sedang berlangsung. Tetap tenang dan berdoa.',
    'tanah-suci': 'Anda sedang berada di Tanah Suci. Gunakan counter & panduan doa.',
    kepulangan: 'Ibadah telah dilaksanakan. Jaga amal dan kenangan perjalanan ini.',
    selesai: 'Rangkaian umrah telah selesai, insya Allah mabrur.',
  };

  const faseLabelMobile: Record<string, string> = {
    persiapan: 'Fase Persiapan',
    perjalanan: 'Dalam Perjalanan',
    'tanah-suci': 'Di Tanah Suci · Makkah',
    kepulangan: 'Dalam Kepulangan',
    selesai: 'Ibadah Selesai',
  };

  const firstName = jamaah.nama.split(' ')[0];

  return (
    <>
      {/* ==================== MOBILE (< lg) ==================== */}
      <div className="lg:hidden">

        {/* HEADER — full-bleed mosque photo */}
        <header
          className="relative overflow-hidden"
          style={{ height: 'clamp(260px, 58vw, 340px)' }}
        >
          {/* Mosque photo */}
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 38%', transform: 'scale(1.3)', transformOrigin: 'center 38%' }}
          />

          {/* Top scrim — status bar area */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{ height: '90px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
          />

          {/* Bottom scrim — text area */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{ height: '70%', background: 'linear-gradient(to top, rgba(4,3,2,0.82) 0%, rgba(4,3,2,0.50) 45%, transparent 100%)' }}
          />

          {/* Content pinned to bottom */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
            {/* Greeting */}
            <p className="font-display text-[11px] uppercase tracking-[0.2em] text-white/55">
              Assalamu'alaikum
            </p>

            <h1 className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-1.5px] text-white">
              {firstName}
            </h1>

            {/* Fase badge */}
            <div
              className="mt-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.20)', backdropFilter: 'blur(10px)' }}
            >
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold animate-pulse" />
              <p className="font-display text-[10px] uppercase tracking-wider text-white/85">
                {faseLabelMobile[jamaah.fase] ?? jamaah.fase}
              </p>
            </div>
          </div>

          {/* Arabic — top right */}
          <p
            className="absolute top-0 right-5 font-arab text-[15px] leading-none text-white/40"
            style={{ top: 'max(1.2rem, env(safe-area-inset-top))' }}
            dir="rtl"
          >
            السَّلَامُ عَلَيْكُمْ
          </p>
        </header>

        {/* AKSES CEPAT */}
        <div className="mt-5 flex gap-3.5 overflow-x-auto px-5 pb-1 no-scrollbar" role="navigation" aria-label="Akses cepat">
          <QuickIcon to="/doa"                   label="Doa"    colorKey="doa"    icon={<IconDoa    className="h-6 w-6" />} />
          <QuickIcon to="/panduan/ihram"          label="Ihram"  colorKey="ihram"  icon={<IconIhram  className="h-6 w-6" />} />
          <QuickIcon to="/ibadah/tawaf"           label="Tawaf"  colorKey="tawaf"  icon={<IconTawaf  className="h-6 w-6" />} />
          <QuickIcon to="/ibadah/sai"             label="Sa'i"   colorKey="sai"    icon={<IconSai    className="h-6 w-6" />} />
          <QuickIcon to="/peta"                   label="Peta"   colorKey="peta"   icon={<IconPeta   className="h-6 w-6" />} />
          <QuickIcon to="/ibadah/jadwal-sholat"   label="Sholat" colorKey="sholat" icon={<IconMoon   className="h-6 w-6" />} />
        </div>

        {/* KARTU FASE — dark gradient hero card */}
        <section className="mt-5 px-5">
          <div
            className="relative overflow-hidden rounded-2xl shadow-drop-lifted"
            style={{ background: 'linear-gradient(135deg, #2d1e0a 0%, #1a1208 100%)' }}
          >
            {/* Dot pattern inside card */}
            <div className="pointer-events-none absolute inset-0 bg-dot-gold-dense opacity-40" />
            {/* Gold glow bottom-right */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 60% at 100% 110%, rgba(212,162,78,0.20) 0%, transparent 70%)' }}
            />

            <div className="relative p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70">
                Fase Perjalanan
              </p>
              <h2 className="mt-1.5 font-display text-[26px] font-bold leading-tight text-on-dark">
                {faseAktif?.label ?? 'Persiapan'}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-on-dark-mute">
                {faseDesc[jamaah.fase] ?? 'Ikuti panduan dan doa yang telah disiapkan.'}
              </p>
              <Link
                to={heroCta.to}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-bold text-on-primary shadow-glow-primary transition-all active:scale-[0.97]"
              >
                {heroCta.label} <IconChevron className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* PROGRESS PERSIAPAN */}
        <section className="mt-3 px-5">
          <Link to="/profil/persiapan" className="block active:scale-[0.99] transition-transform">
            <div className="rounded-2xl border border-hairline bg-white px-4 py-4 shadow-drop-card">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #eef9fe 0%, #e0f4fd 100%)', border: '1.5px solid rgba(14,165,233,0.18)' }}
                  >
                    <IconCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Checklist</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-ink">
                      {persiapanDone} dari {totalPersiapan} selesai
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="font-display text-[26px] font-bold text-ink">{persiapanPersen}%</p>
                  <IconChevron className="h-3.5 w-3.5 flex-none text-stone" />
                </div>
              </div>
              <div className="mt-3.5 h-2 overflow-hidden rounded-full bg-surface-bone">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${persiapanPersen}%`,
                    background: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%)',
                    boxShadow: '0 0 8px rgba(14,165,233,0.35)',
                  }}
                />
              </div>
            </div>
          </Link>
        </section>

        {/* GRID FITUR */}
        <section className="mt-5 px-5 pb-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
            Panduan &amp; Lainnya
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { to: '/panduan/tata-cara', label: 'Tata Cara', Icon: IconPanduan,  bg: '#f0f4ff', ic: '#3d6fd4', br: 'rgba(61,111,212,0.20)' },
              { to: '/panduan/ihram',     label: 'Ihram',     Icon: IconIhram,    bg: '#fff8f0', ic: '#c8792a', br: 'rgba(200,121,42,0.20)' },
              { to: '/peta',              label: 'Peta',       Icon: IconPeta,     bg: '#f5f0ff', ic: '#7c3aed', br: 'rgba(124,58,237,0.20)' },
            ].map(({ to, label, Icon, bg, ic, br }) => (
              <Link
                key={to + label}
                to={to}
                className="flex min-h-[84px] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center active:scale-[0.96] transition-all hover:shadow-drop-card"
                style={{ background: bg, borderColor: br }}
              >
                <Icon className="h-5 w-5" style={{ color: ic }} />
                <span className="text-[11px] font-semibold leading-tight text-ink">{label}</span>
              </Link>
            ))}
          </div>

          {/* Sertifikat */}
          <Link
            to="/profil/sertifikat"
            className="mt-2.5 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 active:scale-[0.99] transition-all shadow-drop-card hover:shadow-drop-lifted"
            style={{ borderColor: 'rgba(212,162,78,0.22)' }}
          >
            <div
              className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
              style={{ background: 'linear-gradient(135deg, #fffcf0 0%, #fdf5e0 100%)', border: '1.5px solid rgba(212,162,78,0.28)' }}
            >
              <IconSertifikat className="h-4 w-4 text-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-ink">Sertifikat Digital</p>
              <p className="truncate text-[11px] text-mute">Terbit setelah ibadah selesai</p>
            </div>
            <IconChevron className="h-3.5 w-3.5 flex-none text-stone" />
          </Link>
        </section>
      </div>

      {/* ==================== DESKTOP (≥ lg) — BENTO GRID ==================== */}
      <div className="hidden lg:block px-8 py-8">

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Assalamu'alaikum
              </p>
            </div>
            <p className="font-arab text-[20px] leading-none text-gold flex-none" dir="rtl">
              السَّلَامُ عَلَيْكُمْ
            </p>
          </div>
          <h1 className="mt-2 font-display text-[42px] font-bold leading-none tracking-[-2px] text-ink">
            {firstName}
          </h1>
          <div className="mt-2.5 flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              style={{ background: 'rgba(212,162,78,0.10)', border: '1px solid rgba(212,162,78,0.25)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-gold/80">
                {faseLabelMobile[jamaah.fase] ?? jamaah.fase}
              </span>
            </span>
            <span className="text-[13px] text-mute">via {jamaah.travel}</span>
          </div>
        </header>

        {/* Stats strip */}
        <div className="mb-6 grid grid-cols-4 divide-x divide-hairline overflow-hidden rounded-2xl border border-hairline bg-white shadow-drop-card">
          {[
            { label: 'Fase Aktif',   value: faseAktif?.label ?? '—', accent: false },
            { label: 'Tawaf',        value: '7 Putaran',              accent: false },
            { label: "Sa'i",         value: '7 Lintasan',             accent: false },
            { label: 'Mode Ibadah',  value: 'Mode B',                 accent: true  },
          ].map(({ label, value, accent }) => (
            <div key={label} className="px-5 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">{label}</p>
              <p className={`mt-1 text-[14px] font-semibold ${accent ? 'text-primary' : 'text-ink'}`}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-4 gap-4">

          {/* HERO: Fase (col-span-2, row-span-2) — dark card */}
          <div className="col-span-2 row-span-2">
            <div
              className="relative h-full overflow-hidden rounded-2xl shadow-drop-lifted flex flex-col"
              style={{ background: 'linear-gradient(145deg, #2d1e0a 0%, #1a1208 100%)' }}
            >
              {/* Decorative dot bg */}
              <div className="pointer-events-none absolute inset-0 bg-dot-gold-dense opacity-40" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 70% 55% at 90% 110%, rgba(212,162,78,0.22) 0%, transparent 65%)' }}
              />

              <div className="relative flex flex-1 flex-col p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  Fase Perjalanan
                </p>
                <h2 className="mt-1.5 font-display text-[30px] font-bold leading-tight text-on-dark">
                  {faseAktif?.label ?? 'Persiapan'}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-on-dark-mute">
                  {faseDesc[jamaah.fase] ?? 'Ikuti panduan dan doa yang telah disiapkan.'}
                </p>

                <div className="mt-6 flex-1">
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-on-dark/40">
                    Progres Perjalanan
                  </p>
                  <PhaseIndicator fase={jamaah.fase} />
                </div>

                <Link
                  to={heroCta.to}
                  className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-[13px] font-bold text-on-primary shadow-glow-primary transition-all active:scale-[0.98] hover:bg-primary-deep"
                >
                  {heroCta.label} <IconChevron className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* COUNTER TAWAF */}
          <div className="col-span-2">
            <Link to="/ibadah/tawaf" className="group block h-full">
              <div
                className="h-full rounded-2xl border p-5 transition-all hover:shadow-drop-lifted hover:-translate-y-0.5"
                style={{ background: '#fffef8', borderColor: 'rgba(212,162,78,0.20)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Mode B · Counter</p>
                    <h3 className="mt-1 font-display text-[20px] font-bold text-ink">Counter Tawaf</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal">
                      Hitung 7 putaran mengelilingi Ka'bah. Doa muncul otomatis tiap putaran.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary/70 group-hover:text-primary group-hover:gap-2 transition-all">
                      Mulai Tawaf <IconChevron className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-none">
                    <MiniRing />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ash">Progress</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* COUNTER SA'I */}
          <div className="col-span-2">
            <Link to="/ibadah/sai" className="group block h-full">
              <div
                className="h-full rounded-2xl border p-5 transition-all hover:shadow-drop-lifted hover:-translate-y-0.5"
                style={{ background: '#f8fff8', borderColor: 'rgba(30,154,86,0.20)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Mode B · Counter</p>
                    <h3 className="mt-1 font-display text-[20px] font-bold text-ink">Counter Sa'i</h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal">
                      Hitung 7 lintasan Shafa–Marwah. Arah & doa per lintasan tampil otomatis.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary/70 group-hover:text-primary group-hover:gap-2 transition-all">
                      Mulai Sa'i <IconChevron className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-none">
                    <MiniRing />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ash">Progress</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* ROW 3: Kartu fitur */}
          <FeatureCard to="/doa"                label="Kumpulan Doa"  desc="Talbiyah, tawaf, sa'i & lebih"         icon={<IconDoa     className="h-5 w-5" />} />
          <FeatureCard to="/panduan/tata-cara"  label="Tata Cara"     desc="Urutan 6 langkah umrah berurutan"      icon={<IconPanduan className="h-5 w-5" />} />
          <FeatureCard to="/panduan/ihram"      label="Panduan Ihram" desc="Niat, larangan & cara memakai kain"    icon={<IconIhram   className="h-5 w-5" />} />

          <SmallCard to="/peta" label="Peta Lokasi" icon={<IconPeta className="h-5 w-5" />} />

          {/* ROW 4 */}
          <SmallCard to="/profil/persiapan" label="Persiapan" icon={<IconCheck className="h-5 w-5" />} />

          <div className="col-span-3">
            <Link
              to="/profil/sertifikat"
              className="group flex items-center gap-4 overflow-hidden rounded-2xl border px-6 py-4 transition-all hover:shadow-drop-lifted hover:-translate-y-0.5 bg-white"
              style={{ borderColor: 'rgba(212,162,78,0.22)' }}
            >
              <div
                className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
                style={{ background: 'linear-gradient(135deg, #fffcf0 0%, #fdf5e0 100%)', border: '1.5px solid rgba(212,162,78,0.28)' }}
              >
                <IconSertifikat className="h-5 w-5 text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-ink">Sertifikat Digital</p>
                <p className="text-[12px] text-charcoal">Terbit setelah ibadah selesai</p>
              </div>
              <IconChevron className="h-4 w-4 flex-none text-stone group-hover:text-ash transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
