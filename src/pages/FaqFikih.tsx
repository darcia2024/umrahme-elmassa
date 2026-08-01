import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { faqKategori } from '../data/faqFikih';
import type { FaqItem } from '../data/faqFikih';
import { IconChevron } from '../components/icons';

function FaqAccordion({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  return (
    <div id={item.id} className="overflow-hidden rounded-xl border border-hairline bg-surface-card transition-all">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[52px] w-full items-start justify-between gap-3 px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-primary" aria-hidden />
          <span className="text-[14px] font-semibold leading-snug text-ink">{item.tanya}</span>
        </div>
        <IconChevron
          className={`mt-1 h-4 w-4 flex-none text-ash transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open ? (
        <div className="animate-fade-up px-4 pb-4">
          <div className="border-t border-hairline pt-3">
            <p className="text-[13px] leading-relaxed text-charcoal">{item.jawab}</p>
            {item.catatan ? (
              <div className="mt-2.5 rounded-lg border border-gold/25 bg-gold/8 px-3 py-2.5">
                <p className="text-[11.5px] leading-relaxed text-gold">
                  <span className="font-semibold">Catatan: </span>
                  {item.catatan}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function FaqFikih() {
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

  return (
    <div className="pb-10">
      <PageHeader title="Tanya Jawab Fikih" eyebrow="Panduan" backTo="/panduan" />

      <div className="space-y-6 px-5 pt-5 lg:px-8 lg:max-w-5xl lg:mx-auto">

        {/* Pengantar */}
        <p className="text-[13px] leading-relaxed text-charcoal">
          Kumpulan pertanyaan yang sering muncul seputar ibadah umrah. Jawaban bersifat panduan umum — untuk kasus spesifik, selalu tanyakan kepada{' '}
          <span className="font-semibold text-ink">pembimbing/muthowif atau ulama terpercaya</span>.
        </p>

        {/* Kategori */}
        {faqKategori.map((kat) => (
          <section key={kat.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {kat.items.length} pertanyaan
              </span>
              <span className="h-px flex-1 bg-hairline" aria-hidden />
            </div>
            <h2 className="mb-1 font-display text-[16px] font-bold text-ink">{kat.nama}</h2>
            <p className="mb-3 text-[12px] text-charcoal">{kat.ringkas}</p>

            <div className="space-y-2">
              {kat.items.map((item) => (
                <FaqAccordion
                  key={item.id}
                  item={item}
                  defaultOpen={hashTarget === item.id}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Penutup */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-primary mb-1.5">Catatan Penting</p>
          <p className="text-[12.5px] leading-relaxed text-charcoal">
            Jawaban di atas mengikuti pendapat yang umum dipakai di Indonesia (banyak merujuk mazhab Syafi'i & jumhur ulama). Masalah khilafiyah sudah diberi keterangan. App ini tidak memberikan fatwa final untuk kasus spesifik — konsultasikan kepada pembimbing ibadah atau ulama yang Anda percaya.
          </p>
        </div>

      </div>
    </div>
  );
}
