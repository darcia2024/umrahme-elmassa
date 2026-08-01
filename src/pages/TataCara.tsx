import { Link } from 'react-router-dom';
import { tataCaraSteps } from '../data/tatacara';
import PageHeader from '../components/PageHeader';
import { IconChevron } from '../components/icons';

export default function TataCara() {
  return (
    <div>
      <PageHeader title="Tata Cara Umrah" eyebrow="Panduan" backTo="/panduan" />

      <div className="px-5 pt-5 pb-8 lg:px-8 lg:max-w-4xl lg:mx-auto">
        <p className="mb-5 text-pretty text-sm leading-relaxed text-charcoal">
          Enam tahap berurutan. Ikuti dari atas ke bawah — beberapa langkah tertaut langsung ke
          fitur yang Anda butuhkan saat itu.
        </p>

        {/* Mobile: timeline vertikal */}
        <ol className="relative space-y-5 pl-2 lg:hidden">
          <span className="absolute bottom-4 left-[22px] top-4 w-px bg-hairline" aria-hidden />
          {tataCaraSteps.map((step) => (
            <li key={step.nomor} className="relative flex gap-4">
              <span className="z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-sm font-semibold text-primary">
                {String(step.nomor).padStart(2, '0')}
              </span>
              <div className="flex-1 rounded-md border border-hairline bg-surface-card px-4 py-3.5 shadow-drop-card">
                <h2 className="font-display text-lg font-bold leading-tight text-ink">
                  {step.judul}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-charcoal">{step.deskripsi}</p>
                {step.tautan ? (
                  <Link
                    to={step.tautan}
                    className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-primary"
                  >
                    {step.tautanLabel} <IconChevron className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: nomor step besar + konten berdampingan */}
        <ol className="hidden lg:block space-y-4">
          {tataCaraSteps.map((step) => (
            <li
              key={step.nomor}
              className="grid grid-cols-[80px_1fr] gap-5 rounded-md border border-hairline bg-surface-card p-5 shadow-drop-card transition-shadow hover:shadow-drop-soft"
            >
              <div className="flex flex-col items-center justify-start pt-0.5">
                <span className="font-display text-4xl font-bold text-primary/25 leading-none">
                  {String(step.nomor).padStart(2, '0')}
                </span>
                {step.nomor < tataCaraSteps.length && (
                  <div className="mt-3 flex-1 w-px bg-hairline" />
                )}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold leading-tight text-ink">
                  {step.judul}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-charcoal">{step.deskripsi}</p>
                {step.tautan ? (
                  <Link
                    to={step.tautan}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
                  >
                    {step.tautanLabel} <IconChevron className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
