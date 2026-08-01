import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import {
  getModulById,
  getModulProgress,
  saveModulProgress,
  resetModulProgress,
  manasikModulList,
  type ManasikKartu,
  type ManasikUrutanItem,
  type ManasikKuisSoal,
  type ManasikModul,
} from '../data/manasikInteraktif';

// =============================================================================
// Utilitas
// =============================================================================
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  const lcg = () => { s = ((1664525 * s + 1013904223) | 0) >>> 0; return s; };
  for (let i = result.length - 1; i > 0; i--) {
    const j = lcg() % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function modulSeed(id: string): number {
  return id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 7919);
}

// =============================================================================
// Ilustrasi SVG — light theme (bone bg, primary red, gold)
// =============================================================================
function IlustrasiManasik({ tipe }: { tipe: ManasikKartu['ilustrasiTipe'] }) {
  const common = 'mx-auto block';
  /* shared colors */
  const bg = '#f3f0e8';
  const gold = '#d4a24e';
  const red = '#0ea5e9';

  switch (tipe) {
    case 'miqat':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <rect x="10" y="70" width="100" height="4" rx="2" fill={bg} />
          <path d="M35 70 L35 40 Q35 20 60 20 Q85 20 85 40 L85 70" stroke={gold} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M48 70 L48 48 Q48 36 60 36 Q72 36 72 48 L72 70" fill={red} fillOpacity="0.10" stroke={red} strokeWidth="1.5" />
          <circle cx="60" cy="32" r="5" fill={gold} fillOpacity="0.25" />
          <line x1="20" y1="74" x2="100" y2="74" stroke={gold} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 4" />
        </svg>
      );
    case 'ihram-pakaian':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <rect x="30" y="20" width="60" height="55" rx="6" fill={bg} stroke={gold} strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M30 35 Q60 28 90 35" stroke={gold} strokeWidth="1.5" fill="none" strokeOpacity="0.7" />
          <path d="M30 50 Q60 43 90 50" stroke={red} strokeWidth="1.2" fill="none" strokeOpacity="0.6" />
          <path d="M30 65 Q60 58 90 65" stroke={gold} strokeWidth="1.2" fill="none" strokeOpacity="0.5" />
          <ellipse cx="60" cy="20" rx="12" ry="6" fill={red} fillOpacity="0.12" stroke={red} strokeWidth="1.2" />
        </svg>
      );
    case 'talbiyah':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <ellipse cx="60" cy="38" rx="32" ry="24" fill={bg} stroke={gold} strokeWidth="1.5" />
          <path d="M60 62 L52 72 L68 72 Z" fill={bg} stroke={gold} strokeWidth="1.5" />
          <text x="60" y="44" textAnchor="middle" fontSize="14" fontFamily="serif" fill={gold} fillOpacity="0.9">لبيك</text>
          {[18, 28, 38].map((x, i) => (
            <path key={i} d={`M${x + 64} ${33 - i * 6} Q${x + 70} ${29 - i * 6} ${x + 76} ${33 - i * 6}`} stroke={red} strokeWidth="1.4" fill="none" strokeOpacity={0.8 - i * 0.2} />
          ))}
        </svg>
      );
    case 'larangan':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <circle cx="60" cy="45" r="32" fill={bg} stroke={red} strokeWidth="2" />
          <line x1="38" y1="23" x2="82" y2="67" stroke={red} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M52 38 Q60 33 68 38 L70 50 Q60 55 50 50 Z" fill={gold} fillOpacity="0.1" stroke={gold} strokeWidth="0.8" />
        </svg>
      );
    case 'kabah':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <rect x="32" y="28" width="56" height="52" rx="2" fill={bg} stroke={gold} strokeWidth="2" />
          <rect x="32" y="44" width="56" height="3" fill={gold} fillOpacity="0.6" />
          <rect x="48" y="60" width="24" height="20" rx="2" fill={red} fillOpacity="0.12" stroke={red} strokeWidth="1.2" />
          <path d="M20 28 L60 12 L100 28" fill={bg} stroke={gold} strokeWidth="1.5" />
          <line x1="24" y1="80" x2="96" y2="80" stroke={gold} strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      );
    case 'tawaf-arah':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <rect x="46" y="26" width="28" height="38" rx="2" fill={bg} stroke={gold} strokeWidth="1.8" />
          <rect x="46" y="36" width="28" height="2.5" fill={gold} fillOpacity="0.5" />
          <path d="M60 45 m-28 0 a28 22 0 0 0 28 22 a28 22 0 0 0 28-22 a28 22 0 0 0-28-22" stroke={red} strokeWidth="2.2" fill="none" strokeDasharray="5 3" />
          <path d="M88 44 L94 40 L94 48 Z" fill={red} />
        </svg>
      );
    case 'hajar-aswad':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <rect x="55" y="20" width="38" height="52" rx="2" fill={bg} stroke={gold} strokeWidth="1.8" />
          <rect x="27" y="20" width="28" height="52" rx="2" fill={bg} stroke={gold} strokeWidth="1.8" />
          <ellipse cx="55" cy="42" rx="10" ry="8" fill={red} fillOpacity="0.18" stroke={red} strokeWidth="2" />
          <ellipse cx="55" cy="42" rx="5" ry="4" fill={red} fillOpacity="0.4" />
          <line x1="18" y1="72" x2="102" y2="72" stroke={gold} strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      );
    case 'maqam-ibrahim':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <rect x="35" y="48" width="50" height="22" rx="3" fill={bg} stroke={gold} strokeWidth="1.8" />
          <rect x="43" y="36" width="34" height="14" rx="2" fill={bg} stroke={gold} strokeWidth="1.5" />
          <rect x="50" y="27" width="20" height="12" rx="2" fill={bg} stroke={red} strokeWidth="1.4" />
          <ellipse cx="60" cy="56" rx="10" ry="6" fill={red} fillOpacity="0.08" stroke={red} strokeWidth="1" strokeDasharray="3 2" />
          <text x="60" y="60" textAnchor="middle" fontSize="9" fill={gold} fillOpacity="0.8" fontFamily="sans-serif">مقام</text>
        </svg>
      );
    case 'shafa':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <path d="M10 72 Q30 72 40 56 Q50 40 60 36 Q70 32 80 40 Q90 52 110 52 L110 72 Z" fill={bg} stroke={red} strokeWidth="1.8" />
          <circle cx="60" cy="30" r="8" fill={red} fillOpacity="0.12" stroke={red} strokeWidth="1.5" />
          <text x="60" y="34" textAnchor="middle" fontSize="7.5" fill={red} fontFamily="sans-serif">الصفا</text>
          <path d="M90 68 L98 60 L106 68" stroke={gold} strokeWidth="2" fill="none" strokeLinecap="round" />
          <line x1="98" y1="60" x2="98" y2="72" stroke={gold} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'sai-7':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          {[0,1,2,3,4,5,6].map((i) => {
            const y = 18 + i * 10;
            const goRight = i % 2 === 0;
            return (
              <g key={i}>
                <line x1={goRight ? 20 : 100} y1={y} x2={goRight ? 100 : 20} y2={y}
                  stroke={i === 0 ? red : gold} strokeWidth={i === 0 ? 2.5 : 1.4} strokeOpacity={1 - i * 0.1} />
                <polygon points={goRight ? `95,${y-3} 102,${y} 95,${y+3}` : `25,${y-3} 18,${y} 25,${y+3}`}
                  fill={i === 0 ? red : gold} opacity={1 - i * 0.1} />
              </g>
            );
          })}
          <circle cx="18" cy="45" r="7" fill={red} fillOpacity="0.12" stroke={red} strokeWidth="1.2" />
          <circle cx="102" cy="45" r="7" fill={gold} fillOpacity="0.10" stroke={gold} strokeWidth="1.2" />
        </svg>
      );
    case 'marwah':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <path d="M10 72 Q25 72 40 55 Q55 38 70 40 Q90 42 110 72 Z" fill={bg} stroke={gold} strokeWidth="1.8" />
          <circle cx="68" cy="34" r="8" fill={gold} fillOpacity="0.12" stroke={gold} strokeWidth="1.5" />
          <text x="68" y="38" textAnchor="middle" fontSize="7.5" fill={gold} fontFamily="sans-serif">المروة</text>
          <path d="M20 62 L10 62 L14 55" stroke={red} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'tahallul':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <circle cx="60" cy="32" r="22" fill={bg} stroke={gold} strokeWidth="1.8" />
          <path d="M48 28 Q60 18 72 28" stroke={red} strokeWidth="2" fill="none" strokeLinecap="round" />
          <line x1="46" y1="37" x2="74" y2="37" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M36 62 Q60 54 84 62 L84 68 Q60 62 36 68 Z" fill={red} fillOpacity="0.08" stroke={red} strokeWidth="1.2" />
          <line x1="60" y1="54" x2="60" y2="72" stroke={gold} strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      );
    case 'selesai':
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <circle cx="60" cy="42" r="32" fill={bg} stroke={gold} strokeWidth="1.8" />
          <path d="M42 43 L54 55 L78 31" stroke={red} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {[0,1,2,3,4,5,6,7].map((i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const r = 42;
            const x = 60 + r * Math.cos(angle);
            const y = 42 + r * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="2" fill={gold} fillOpacity="0.5" />;
          })}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 90" className={`${common} w-[140px]`} aria-hidden>
          <circle cx="60" cy="45" r="30" fill={bg} stroke={gold} strokeWidth="1.5" />
        </svg>
      );
  }
}

// =============================================================================
// Bagian Indicator (A → B → C)
// =============================================================================
type Tahap = 'A' | 'B' | 'C' | 'ringkasan';

function TahapIndicator({ tahap }: { tahap: Tahap }) {
  const steps: { id: Tahap; label: string; sublabel: string }[] = [
    { id: 'A', label: 'A', sublabel: 'Kenali' },
    { id: 'B', label: 'B', sublabel: 'Urutkan' },
    { id: 'C', label: 'C', sublabel: 'Uji Paham' },
  ];
  const idx = tahap === 'ringkasan' ? 3 : ['A', 'B', 'C'].indexOf(tahap);

  return (
    <div className="flex items-center justify-center gap-0 px-5 py-4">
      {steps.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step.id} className="flex items-center">
            {i > 0 && (
              <div className={`h-px w-8 transition-colors ${done ? 'bg-primary' : 'bg-hairline'}`} />
            )}
            <div className="flex flex-col items-center gap-0.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-all
                  ${active ? 'border-primary bg-primary text-on-primary shadow-[0_0_12px_rgba(14,165,233,0.3)]' : ''}
                  ${done ? 'border-primary/60 bg-primary/10 text-primary' : ''}
                  ${!active && !done ? 'border-hairline bg-surface-bone text-mute' : ''}
                `}
              >
                {done ? '✓' : step.label}
              </div>
              <span className={`font-mono text-[9px] uppercase tracking-wider ${active ? 'text-primary' : done ? 'text-primary/60' : 'text-ash'}`}>
                {step.sublabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// Bagian A — Kenali (slide kartu)
// =============================================================================
function BagianAKenali({ kartuList, onSelesai }: { kartuList: ManasikKartu[]; onSelesai: () => void }) {
  const [idx, setIdx] = useState(0);
  const kartu = kartuList[idx];
  const isLast = idx === kartuList.length - 1;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="px-5">
      <div className="flex justify-center gap-1.5 mb-4">
        {kartuList.map((_, i) => (
          <button key={i} type="button" onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-5 bg-primary' : 'w-1.5 bg-surface-bone border border-hairline'}`}
            aria-label={`Kartu ${i + 1}`} />
        ))}
      </div>

      <div key={kartu.id}
        className={`rounded-md border border-hairline bg-surface-card overflow-hidden shadow-drop-soft ${!prefersReduced ? 'animate-fade-up' : ''}`}>
        <div className="flex justify-center items-center pt-8 pb-4 bg-surface-bone">
          <IlustrasiManasik tipe={kartu.ilustrasiTipe} />
        </div>

        <div className="px-5 pb-6 pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute mb-1">
            Kartu {idx + 1} / {kartuList.length}
          </p>
          <h3 className="font-display text-xl font-bold text-ink leading-snug">
            {kartu.judul}
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-charcoal">
            {kartu.penjelasan}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        {idx > 0 && (
          <button type="button" onClick={() => setIdx((i) => i - 1)}
            className="flex-none rounded-full border border-hairline bg-surface-card px-5 py-3.5 font-mono text-sm text-mute active:scale-[0.98]">
            ← Sebelumnya
          </button>
        )}
        <button type="button"
          onClick={() => { if (isLast) onSelesai(); else setIdx((i) => i + 1); }}
          className="flex-1 rounded-full bg-primary py-3.5 text-center font-semibold text-on-primary active:scale-[0.98] transition-transform">
          {isLast ? 'Lanjut ke Urutkan →' : 'Kartu Berikutnya'}
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// Bagian B — Urutkan (tap-to-order)
// =============================================================================
function BagianBUrutkan({
  items, shuffledItems, onSelesai,
}: { items: ManasikUrutanItem[]; shuffledItems: ManasikUrutanItem[]; onSelesai: (benar: boolean) => void }) {
  const [dipilih, setDipilih] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ benar: boolean; detail: boolean[] } | null>(null);
  const shakeRef = useRef<HTMLDivElement>(null);

  const dipilihSet = new Set(dipilih);
  const allSelected = dipilih.length === items.length;

  const handleTap = (id: string) => {
    if (feedback) return;
    if (dipilihSet.has(id)) {
      const pos = dipilih.indexOf(id);
      setDipilih(dipilih.slice(0, pos));
    } else {
      setDipilih([...dipilih, id]);
    }
  };

  const cekUrutan = () => {
    const correct = items.sort((a, b) => a.urutanBenar - b.urutanBenar).map((i) => i.id);
    const detail = dipilih.map((id, i) => id === correct[i]);
    const benar = detail.every(Boolean);
    setFeedback({ benar, detail });
    if (benar) { setTimeout(() => onSelesai(true), 1600); }
  };

  const reset = () => { setDipilih([]); setFeedback(null); };
  const correctOrder = [...items].sort((a, b) => a.urutanBenar - b.urutanBenar);

  return (
    <div className="px-5" ref={shakeRef}>
      <p className="mb-4 text-[13px] leading-relaxed text-charcoal">
        Tap langkah-langkah di bawah <strong className="text-ink">sesuai urutan yang benar</strong>, dari pertama hingga terakhir.
      </p>

      <div className="space-y-2">
        {shuffledItems.map((item) => {
          const selected = dipilihSet.has(item.id);
          const selIdx = dipilih.indexOf(item.id);
          let feedbackColor = '';
          if (feedback && selected) {
            feedbackColor = feedback.detail[selIdx]
              ? 'border-emerald-500/60 bg-emerald-500/5'
              : 'border-red-500/60 bg-red-500/5';
          }
          return (
            <button key={item.id} type="button" onClick={() => handleTap(item.id)} disabled={!!feedback}
              className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-all active:scale-[0.99]
                ${selected && !feedback ? 'border-primary/50 bg-primary/8' : ''}
                ${!selected && !feedback ? 'border-hairline bg-surface-card' : ''}
                ${feedbackColor}
                ${selected && !feedback ? '' : 'hover:border-hairline-strong'}
              `}
            >
              <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition-all
                ${selected ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-surface-bone text-mute'}
                ${feedback && selected && feedback.detail[selIdx] ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600' : ''}
                ${feedback && selected && !feedback.detail[selIdx] ? 'border-red-500 bg-red-500/20 text-red-500' : ''}
              `}>
                {selected ? (feedback ? (feedback.detail[selIdx] ? '✓' : '✗') : selIdx + 1) : '·'}
              </span>
              <span className={`text-[13px] leading-snug ${selected ? 'text-ink' : 'text-charcoal'}`}>
                {item.teks}
              </span>
            </button>
          );
        })}
      </div>

      {feedback && !feedback.benar && (
        <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/5 px-4 py-4">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-red-500">Urutan yang Benar:</p>
          <ol className="space-y-1.5">
            {correctOrder.map((item, i) => (
              <li key={item.id} className="flex items-start gap-2">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 font-mono text-[10px] text-emerald-600">
                  {i + 1}
                </span>
                <span className="text-[12px] leading-snug text-body">{item.teks}</span>
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => { reset(); setTimeout(() => onSelesai(false), 0); }}
            className="mt-3 rounded-full bg-primary px-4 py-2.5 text-[13px] font-semibold text-on-primary active:scale-[0.98]">
            Lanjut ke Uji Paham →
          </button>
        </div>
      )}

      {!feedback && (
        <div className="mt-4 flex gap-3">
          {dipilih.length > 0 && (
            <button type="button" onClick={reset}
              className="rounded-full border border-hairline px-4 py-3 font-mono text-[12px] text-mute active:scale-[0.98]">
              Reset
            </button>
          )}
          <button type="button" disabled={!allSelected} onClick={cekUrutan}
            className={`flex-1 rounded-full py-3 text-center font-semibold transition-all active:scale-[0.98]
              ${allSelected ? 'bg-primary text-on-primary' : 'bg-surface-bone text-ash border border-hairline'}
            `}>
            {allSelected ? 'Cek Urutan →' : `Pilih ${items.length - dipilih.length} langkah lagi`}
          </button>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Bagian C — Uji Paham (MCQ)
// =============================================================================
function BagianCKuis({ soalList, onSelesai }: { soalList: ManasikKuisSoal[]; onSelesai: (score: number, total: number) => void }) {
  const [soalIdx, setSoalIdx] = useState(0);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [skor, setSkor] = useState(0);

  const soal = soalList[soalIdx];
  const isLast = soalIdx === soalList.length - 1;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pilihJawaban = (idx: number) => {
    if (feedbackShown) return;
    setDipilih(idx);
    setFeedbackShown(true);
    if (idx === soal.jawabanBenarIndex) { setSkor((s) => s + 1); }
  };

  const lanjut = () => {
    if (isLast) {
      onSelesai(dipilih === soal.jawabanBenarIndex ? skor : skor, soalList.length);
    } else {
      setSoalIdx((i) => i + 1);
      setDipilih(null);
      setFeedbackShown(false);
    }
  };

  return (
    <div className="px-5" key={soalIdx}>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-mute">
          Soal {soalIdx + 1} / {soalList.length}
        </p>
        <div className="flex gap-1">
          {soalList.map((_, i) => (
            <div key={i} className={`h-1 w-4 rounded-full transition-all ${
              i < soalIdx ? 'bg-primary' : i === soalIdx ? 'bg-primary w-6' : 'bg-surface-bone border border-hairline'
            }`} />
          ))}
        </div>
      </div>

      <div className={`mb-4 rounded-md border border-hairline bg-surface-card px-5 py-5 shadow-drop-card ${!prefersReduced ? 'animate-fade-up' : ''}`}>
        <p className="font-display text-[18px] font-bold leading-snug text-ink">
          {soal.pertanyaan}
        </p>
      </div>

      <div className="space-y-2">
        {soal.pilihan.map((pilihan, i) => {
          const isBenar = i === soal.jawabanBenarIndex;
          const isDipilih = i === dipilih;
          let style = 'border-hairline bg-surface-card text-charcoal';
          if (feedbackShown) {
            if (isBenar) style = 'border-emerald-500/60 bg-emerald-500/8 text-ink';
            else if (isDipilih && !isBenar) style = 'border-red-500/60 bg-red-500/8 text-ink';
            else style = 'border-hairline bg-canvas text-ash';
          } else if (isDipilih) {
            style = 'border-primary/50 bg-primary/8 text-ink';
          }

          return (
            <button key={i} type="button" onClick={() => pilihJawaban(i)} disabled={feedbackShown}
              className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-all active:scale-[0.99] ${style}`}>
              <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border font-mono text-[11px] font-medium
                ${feedbackShown && isBenar ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600' : ''}
                ${feedbackShown && isDipilih && !isBenar ? 'border-red-500 bg-red-500/20 text-red-500' : ''}
                ${!feedbackShown && isDipilih ? 'border-primary bg-primary text-on-primary' : ''}
                ${!feedbackShown && !isDipilih ? 'border-hairline bg-surface-bone text-mute' : ''}
                ${feedbackShown && !isDipilih && !isBenar ? 'border-hairline bg-surface-bone text-ash' : ''}
              `}>
                {feedbackShown && isBenar ? '✓' : feedbackShown && isDipilih && !isBenar ? '✗' : String.fromCharCode(65 + i)}
              </span>
              <span className="text-[13px] leading-snug">{pilihan}</span>
            </button>
          );
        })}
      </div>

      {feedbackShown && (
        <div className={`mt-3 rounded-md border px-4 py-3 ${
          dipilih === soal.jawabanBenarIndex
            ? 'border-emerald-500/30 bg-emerald-500/5'
            : 'border-red-500/30 bg-red-500/5'
        }`}>
          <p className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${dipilih === soal.jawabanBenarIndex ? 'text-emerald-600' : 'text-red-500'}`}>
            {dipilih === soal.jawabanBenarIndex ? '✓ Benar!' : '✗ Belum tepat'}
          </p>
          <p className="text-[12px] leading-relaxed text-charcoal">
            {soal.penjelasanSingkat}
          </p>
        </div>
      )}

      {feedbackShown && (
        <button type="button" onClick={lanjut}
          className="mt-4 w-full rounded-full bg-primary py-3.5 text-center font-semibold text-on-primary active:scale-[0.98]">
          {isLast ? 'Lihat Hasil →' : 'Soal Berikutnya →'}
        </button>
      )}
    </div>
  );
}

// =============================================================================
// Ringkasan Modul
// =============================================================================
function RingkasanModul({
  modul, skor, total, onUlangDariAwal, onLanjut, isLastModul,
}: {
  modul: ManasikModul; skor: number; total: number;
  onUlangDariAwal: () => void; onLanjut: () => void; isLastModul: boolean;
}) {
  const persen = total > 0 ? Math.round((skor / total) * 100) : 100;
  const level = persen >= 80 ? 'tinggi' : persen >= 60 ? 'cukup' : 'perlu-ulang';
  const pesan =
    level === 'tinggi' ? 'Pemahaman Anda sangat baik!'
    : level === 'cukup' ? 'Cukup baik — sedikit lagi sempurna.'
    : 'Tidak apa-apa, coba pelajari ulang dan uji lagi.';

  return (
    <div className="px-5">
      <div className="rounded-md border border-hairline bg-surface-card px-5 py-7 text-center shadow-drop-soft">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/8">
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
            <path d="M8 4h16v12a8 8 0 0 1-16 0V4Z" stroke="#d4a24e" strokeWidth="1.8" />
            <path d="M8 8H4a4 4 0 0 0 4 4M24 8h4a4 4 0 0 1-4 4" stroke="#d4a24e" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M13 28h6M16 24v4" stroke="#d4a24e" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="9" y="28" width="14" height="2" rx="1" fill="#d4a24e" fillOpacity="0.3" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">
          Modul Selesai!
        </h2>
        <p className="mt-1 text-[13px] text-charcoal">{modul.judul}</p>

        {total > 0 && (
          <div className="mt-5">
            <p className="font-display text-4xl font-bold text-ink">
              {skor}/{total}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-mute">soal dijawab benar</p>
            <div className="mx-auto mt-3 h-1.5 max-w-[160px] overflow-hidden rounded-full bg-surface-bone">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  level === 'tinggi' ? 'bg-emerald-500' : level === 'cukup' ? 'bg-gold' : 'bg-red-500'
                }`}
                style={{ width: `${persen}%` }}
              />
            </div>
            <p className="mt-2 text-[12px] text-charcoal">{pesan}</p>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <button type="button" onClick={onLanjut}
          className="w-full rounded-full bg-primary py-4 text-center font-semibold text-on-primary active:scale-[0.98]">
          {isLastModul ? 'Kembali ke Daftar Modul' : 'Lanjut ke Modul Berikutnya →'}
        </button>
        <button type="button" onClick={onUlangDariAwal}
          className="w-full rounded-full border border-hairline py-3.5 text-center text-[13px] text-mute active:scale-[0.98]">
          Pelajari Ulang dari Awal
        </button>
      </div>

      {isLastModul && (
        <div className="mt-5 rounded-md border border-gold/20 bg-gold/5 px-4 py-4 text-center">
          <p className="text-[13px] leading-relaxed text-gold">
            Alhamdulillah — Anda telah mempelajari seluruh rangkaian manasik umrah. Semoga bermanfaat sebagai persiapan sebelum berangkat. 🤲
          </p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// ManasikModulDetail — Halaman utama
// =============================================================================
export default function ManasikModulDetail() {
  const { modulId } = useParams<{ modulId: string }>();
  const navigate = useNavigate();
  const modul = getModulById(modulId ?? '');

  const [tahap, setTahap] = useState<Tahap>('A');
  const [partCSkor, setPartCSkor] = useState(0);
  const [partCTotal, setPartCTotal] = useState(0);

  const shuffledUrutanItems = useMemo<ManasikUrutanItem[]>(() => {
    if (!modul) return [];
    return seededShuffle(modul.urutanItems, modulSeed(modul.id));
  }, [modul?.id]);

  useEffect(() => {
    if (!modul) return;
    const p = getModulProgress(modul.id);
    if (p.selesai) {
      setPartCSkor(p.partCScore);
      setPartCTotal(p.partCTotal);
      setTahap('ringkasan');
    }
  }, [modul?.id]);

  if (!modul) return <Navigate to="/panduan/manasik-interaktif" replace />;

  const modulIdx = manasikModulList.findIndex((m) => m.id === modul.id);
  const nextModul = manasikModulList[modulIdx + 1];
  const isLastModul = modulIdx === manasikModulList.length - 1;

  const handlePartASelesai = () => { saveModulProgress(modul.id, { partADone: true }); setTahap('B'); };
  const handlePartBSelesai = (benar: boolean) => { saveModulProgress(modul.id, { partBDone: true, partBBenar: benar }); setTahap('C'); };
  const handlePartCSelesai = (score: number, total: number) => {
    setPartCSkor(score);
    setPartCTotal(total);
    saveModulProgress(modul.id, { partCScore: score, partCTotal: total, selesai: true });
    setTahap('ringkasan');
  };
  const handleUlangDariAwal = () => {
    resetModulProgress(modul.id);
    setPartCSkor(0);
    setPartCTotal(0);
    setTahap('A');
  };
  const handleLanjut = () => {
    if (isLastModul || !nextModul) navigate('/panduan/manasik-interaktif');
    else navigate(`/panduan/manasik-interaktif/${nextModul.id}`);
  };

  const eyebrow = `Manasik · Modul ${modul.urutan}/${manasikModulList.length}`;

  return (
    <div className="pb-24">
      <PageHeader title={modul.judul} eyebrow={eyebrow} backTo="/panduan/manasik-interaktif" />

      {tahap !== 'ringkasan' && <TahapIndicator tahap={tahap} />}

      <div className="mt-1">
        {tahap === 'A' && <BagianAKenali kartuList={modul.kartuKenali} onSelesai={handlePartASelesai} />}
        {tahap === 'B' && (
          <BagianBUrutkan items={modul.urutanItems} shuffledItems={shuffledUrutanItems} onSelesai={handlePartBSelesai} />
        )}
        {tahap === 'C' && <BagianCKuis soalList={modul.kuisSoal} onSelesai={handlePartCSelesai} />}
        {tahap === 'ringkasan' && (
          <div className="pt-4">
            <RingkasanModul modul={modul} skor={partCSkor} total={partCTotal}
              onUlangDariAwal={handleUlangDariAwal} onLanjut={handleLanjut} isLastModul={isLastModul} />
          </div>
        )}
      </div>
    </div>
  );
}
