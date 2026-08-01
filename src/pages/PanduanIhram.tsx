import { useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { niatIhram, larganganIhram, tataCaraMemakaiIhram, jenisDam, damPengantar } from '../data/ihram';
import type { GenderLarangan } from '../types';
import PageHeader from '../components/PageHeader';
import MihrabCard from '../components/MihrabCard';
import { IconChevron } from '../components/icons';

const tabs: { id: GenderLarangan; label: string }[] = [
  { id: 'lakilaki', label: 'Laki-laki' },
  { id: 'perempuan', label: 'Perempuan' },
  { id: 'umum', label: 'Berlaku Umum' },
];

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-surface-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-bold text-ink">{title}</span>
        <IconChevron
          className={`h-4 w-4 flex-none text-ash transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>
      {open ? <div className="px-4 pb-4 animate-fade-up">{children}</div> : null}
    </div>
  );
}

export default function PanduanIhram() {
  const [tab, setTab] = useState<GenderLarangan>('lakilaki');
  const location = useLocation();
  const hashTarget = location.hash?.replace('#', '') ?? '';

  // Jika hash mengarah ke larangan gender tertentu, switch tab dulu
  useEffect(() => {
    if (!hashTarget) return;
    const targetLarangan = larganganIhram.find((l) => l.id === hashTarget);
    if (targetLarangan) setTab(targetLarangan.gender);
  }, [hashTarget]);

  useEffect(() => {
    if (!hashTarget) return;
    const t = setTimeout(() => {
      const el = document.getElementById(hashTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-primary/40');
        setTimeout(() => el.classList.remove('ring-2', 'ring-primary/40'), 2000);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [hashTarget, tab]);

  const larangan = larganganIhram.filter((l) => l.gender === tab);

  return (
    <div>
      <PageHeader title="Panduan Ihram" eyebrow="Panduan" backTo="/panduan" />

      <div className="space-y-5 px-5 pt-5 pb-8 lg:px-8 lg:max-w-5xl lg:mx-auto">
        {/* Niat ihram */}
        <div>
          <h2 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-mute">
            Niat Ihram
          </h2>
          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-3">
            {niatIhram.map((n) => (
              <div key={n.id} id={n.id} className="transition-all">
                <MihrabCard bodyClassName="px-5 pb-5 pt-2">
                  <p className="text-xs font-semibold text-primary">{n.judul}</p>
                  <p className="mt-2 text-center font-arab text-[26px] leading-loose text-gold" dir="rtl">
                    {n.arab}
                  </p>
                  <p className="mt-2 text-center text-sm italic text-body">{n.latin}</p>
                  <p className="mt-2 text-center text-xs leading-relaxed text-charcoal">{n.arti}</p>
                </MihrabCard>
              </div>
            ))}
          </div>
        </div>

        {/* Larangan ihram */}
        <div>
          <h2 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-mute">
            Larangan Ihram
          </h2>
          <div className="mb-3 flex gap-1.5 rounded-full border border-hairline bg-surface-bone p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`min-h-[36px] flex-1 rounded-full px-2 text-[13px] font-medium transition ${
                  tab === t.id
                    ? 'bg-primary text-on-primary'
                    : 'text-mute active:bg-surface-card hover:text-body'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <ul className="space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-2.5 lg:space-y-0">
            {larangan.map((l) => (
              <li
                key={l.id}
                id={l.id}
                className="rounded-md border border-hairline bg-surface-card px-4 py-3.5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-primary" aria-hidden />
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{l.judul}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-charcoal">{l.keterangan}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Cara memakai ihram */}
        <div>
          <h2 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-mute">
            Cara Memakai Ihram
          </h2>
          <div className="space-y-2.5 lg:grid lg:grid-cols-2 lg:gap-2.5 lg:space-y-0">
            {tataCaraMemakaiIhram.map((s, i) => (
              <Section key={s.id} title={s.judul} defaultOpen={i === 0}>
                <ol className="space-y-2">
                  {s.langkah.map((lk, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-body">
                      <span className="font-mono text-xs text-primary">{j + 1}.</span>
                      <span>{lk}</span>
                    </li>
                  ))}
                </ol>
              </Section>
            ))}
          </div>
        </div>

        {/* Dam (denda pelanggaran) */}
        <div>
          <h2 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-mute">
            Dam (Denda Pelanggaran)
          </h2>
          <p className="mb-3 text-[13px] leading-relaxed text-charcoal">{damPengantar}</p>

          <div className="space-y-2.5">
            {jenisDam.map((d) => (
              <div
                key={d.id}
                id={d.id}
                className="rounded-2xl border border-hairline bg-surface-card p-4 shadow-drop-soft transition-all"
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-gold/20 to-gold/5">
                    <span className="font-arab text-[15px] font-bold text-gold">ر</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-bold leading-tight text-ink">{d.nama}</h3>
                  </div>
                </div>
                <div className="mt-2.5 space-y-2 text-[12.5px] leading-snug">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-mute">Pelanggaran</p>
                    <p className="mt-0.5 text-charcoal">{d.untukPelanggaran}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-mute">Bentuk Dam</p>
                    <p className="mt-0.5 text-charcoal">{d.bentuk}</p>
                  </div>
                  {d.catatan ? (
                    <div className="rounded-lg border border-gold/20 bg-gold/5 px-3 py-2">
                      <p className="text-[12px] leading-snug text-gold">{d.catatan}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <p className="text-[12.5px] leading-relaxed text-primary">
              Penyembelihan dam dilakukan di tanah haram dan dagingnya dibagikan kepada fakir miskin di sana. Jika ragu tentang kewajiban dam atas kasus tertentu, tanyakan kepada pembimbing/muthowif atau ulama yang terpercaya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
