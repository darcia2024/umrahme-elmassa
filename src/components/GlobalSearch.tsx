import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAll, TYPE_META, type SearchItem } from '../data/searchIndex';

// ── Ikon ─────────────────────────────────────────────────────

function IconSearch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function IconX({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// ── Saran default saat bar difokus tapi kosong ────────────────
const QUICK_SHORTCUTS: { label: string; to: string; emoji: string }[] = [
  { label: 'Tata Cara Umrah', to: '/panduan/tata-cara', emoji: '📖' },
  { label: 'Doa Tawaf',       to: '/doa?kategori=tawaf', emoji: '🤲' },
  { label: "Doa Sa'i",        to: '/doa?kategori=sai',   emoji: '🤲' },
  { label: 'Panduan Ihram',   to: '/panduan/ihram',      emoji: '🕌' },
  { label: 'Jadwal Sholat',   to: '/ibadah/jadwal-sholat', emoji: '🕐' },
  { label: 'Checklist',       to: '/profil/persiapan',   emoji: '✅' },
];

// ── Komponen item hasil ───────────────────────────────────────
function ResultItem({
  item,
  active,
  onSelect,
}: {
  item: SearchItem;
  active: boolean;
  onSelect: (to: string) => void;
}) {
  const meta = TYPE_META[item.type];
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onSelect(item.to); }}
      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${active ? 'bg-surface-bone' : 'hover:bg-surface-bone/60'}`}
    >
      <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-canvas text-[14px]">
        {meta.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold leading-snug text-ink">{item.judul}</p>
        {item.sub && (
          <p className="mt-0.5 truncate text-[11px] leading-snug text-mute">{item.sub}</p>
        )}
      </div>
      <span className="mt-0.5 flex-none rounded-full bg-surface-bone px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-ash">
        {meta.label}
      </span>
    </button>
  );
}

// ── Komponen utama ────────────────────────────────────────────
export default function GlobalSearch() {
  const [query,   setQuery]   = useState('');
  const [open,    setOpen]    = useState(false);
  const [active,  setActive]  = useState(-1);
  const inputRef  = useRef<HTMLInputElement>(null);
  const navigate  = useNavigate();

  const results = query.trim() ? searchAll(query) : [];
  const showShortcuts = open && !query.trim();
  const showResults   = open && results.length > 0;
  const showEmpty     = open && query.trim() && results.length === 0;
  const isDropVisible = showShortcuts || showResults || showEmpty;

  const go = useCallback((to: string) => {
    setQuery('');
    setOpen(false);
    setActive(-1);
    navigate(to);
  }, [navigate]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); setActive(-1); return; }
    if (!showResults) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      go(results[active].to);
    }
  };

  // Reset active index ketika query berubah
  useEffect(() => { setActive(-1); }, [query]);

  // Tutup saat klik di luar
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative px-5" onMouseDown={(e) => e.stopPropagation()}>
      {/* ── Input bar ── */}
      <div
        className={`flex items-center gap-2.5 rounded-2xl border bg-white px-3.5 py-3 shadow-drop-card transition-all ${open ? 'border-primary/40 shadow-[0_0_0_3px_rgba(14,165,233,0.10)]' : 'border-hairline'}`}
      >
        <IconSearch className="h-4 w-4 flex-none text-ash" />
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          value={query}
          placeholder="Cari doa, panduan, lokasi, checklist…"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink placeholder:text-ash focus:outline-none"
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onKeyDown={handleKey}
        />
        {query && (
          <button
            onMouseDown={(e) => { e.preventDefault(); setQuery(''); inputRef.current?.focus(); }}
            className="flex-none rounded-full p-0.5 text-ash transition-colors hover:text-charcoal"
            aria-label="Hapus"
          >
            <IconX className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* ── Dropdown ── */}
      {isDropVisible && (
        <div className="absolute inset-x-5 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-hairline bg-white shadow-drop-lifted">

          {/* Saran cepat */}
          {showShortcuts && (
            <>
              <p className="px-4 pt-3 pb-1 font-mono text-[8.5px] uppercase tracking-[0.22em] text-mute">
                Akses Cepat
              </p>
              {QUICK_SHORTCUTS.map((s) => (
                <button
                  key={s.to}
                  onMouseDown={(e) => { e.preventDefault(); go(s.to); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-surface-bone transition-colors"
                >
                  <span className="text-[14px]">{s.emoji}</span>
                  <span className="text-[13px] font-semibold text-ink">{s.label}</span>
                </button>
              ))}
              <div className="h-2" />
            </>
          )}

          {/* Hasil pencarian */}
          {showResults && (
            <>
              <p className="px-4 pt-3 pb-1 font-mono text-[8.5px] uppercase tracking-[0.22em] text-mute">
                Hasil ({results.length})
              </p>
              {results.map((item, i) => (
                <ResultItem
                  key={item.id}
                  item={item}
                  active={i === active}
                  onSelect={go}
                />
              ))}
              <div className="h-2" />
            </>
          )}

          {/* Kosong */}
          {showEmpty && (
            <div className="px-4 py-6 text-center">
              <p className="text-[13px] text-charcoal">Tidak ditemukan untuk</p>
              <p className="mt-0.5 font-semibold text-ink">"{query}"</p>
              <p className="mt-1 text-[11px] text-mute">Coba kata kunci lain</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
