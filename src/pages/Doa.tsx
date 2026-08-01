import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { daftarDoa, kategoriDoaMeta, cariDoa, doaByKategori } from '../data/doa';
import type { Doa, KategoriDoa } from '../types';
import { IconSearch, IconChevron, IconDoa, IconBack } from '../components/icons';
import EmptyState from '../components/EmptyState';
import MihrabCard from '../components/MihrabCard';

const accentMap = {
  pink: { tile: 'bg-pink-50 border border-pink-200/80', icon: 'text-pink-600', count: 'bg-pink-100 text-pink-700' },
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

function Accordion({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50/70 transition-all">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[52px] w-full items-center justify-between gap-3 px-5 py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="font-sans text-xs uppercase tracking-widest font-extrabold text-pink-600">
          {label}
        </span>
        <IconChevron
          className={`h-4 w-4 flex-none text-stone-400 transition-transform ${
            open ? 'rotate-90 text-pink-600' : ''
          }`}
        />
      </button>
      {open ? (
        <div className="px-5 pb-5 text-sm leading-relaxed text-stone-700 font-sans border-t border-stone-100 pt-3 bg-white">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function DoaDetailContent({ doa }: { doa: Doa }) {
  const katMeta = kategoriDoaMeta.find((k) => k.id === doa.kategori);
  const adaBacaan = Boolean(doa.arab || doa.latin || doa.terjemahan);

  return (
    <div className="space-y-4 font-sans">
      <div className="space-y-1 border-b border-stone-100 pb-3">
        <p className="font-sans text-xs uppercase tracking-widest font-extrabold text-pink-600">
          {katMeta?.judul ?? 'Doa'}
        </p>
        <h2 className="font-display text-2xl font-black text-stone-900 tracking-tight">{doa.judul}</h2>
      </div>

      {adaBacaan ? (
        <MihrabCard bodyClassName="px-6 pb-6 pt-4 space-y-4">
          
          {/* Audio Player Button */}
          {doa.arab || doa.latin ? (
            <div className="flex justify-center pt-1 pb-2">
              <button
                type="button"
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const text = doa.arab || doa.latin || '';
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = doa.arab ? 'ar-SA' : 'id-ID';
                    utterance.rate = 0.85;
                    window.speechSynthesis.speak(utterance);
                  } else {
                    alert('Audio tidak didukung di browser ini.');
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-extrabold text-xs shadow-2xs transition active:scale-95"
              >
                <span>▶️ Putar Audio Doa Jernih</span>
              </button>
            </div>
          ) : null}

          {doa.arab ? (
            <p className="text-center font-arab text-[34px] leading-[2.2] text-amber-700 font-bold" dir="rtl">
              {doa.arab}
            </p>
          ) : null}
          {doa.latin ? (
            <p className="mt-4 text-center text-sm italic leading-relaxed text-stone-700 font-serif">
              {doa.latin}
            </p>
          ) : null}
          {doa.terjemahan ? (
            <p className="mt-3 text-center text-xs leading-relaxed text-stone-600 font-sans border-t border-stone-100 pt-3">
              "{doa.terjemahan}"
            </p>
          ) : null}
        </MihrabCard>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 px-5 py-6 text-center space-y-1">
          <p className="font-sans text-xs uppercase tracking-widest font-extrabold text-amber-800">
            Konten dalam peninjauan
          </p>
          <p className="text-xs leading-relaxed text-stone-600 font-sans">
            Teks bacaan doa ini belum ditampilkan karena masih perlu diverifikasi oleh ustadz sebelum dipublikasikan.
          </p>
        </div>
      )}

      {doa.perluVerifikasi ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50/60 px-4 py-2.5 text-center text-xs leading-relaxed text-amber-800 font-sans">
          Sumber masih perlu verifikasi ulama sebelum dijadikan rujukan pasti.
        </p>
      ) : null}

      <div className="mt-2 space-y-3">
        {doa.arti ? <Accordion label="Arti / Makna">{doa.arti}</Accordion> : null}
        {doa.dalil ? <Accordion label="Dalil & Sumber">{doa.dalil}</Accordion> : null}
        {doa.cara ? <Accordion label="Cara Mengamalkan">{doa.cara}</Accordion> : null}
        {doa.waktu ? <Accordion label="Waktu Membaca">{doa.waktu}</Accordion> : null}
      </div>
    </div>
  );
}

function DoaRow({
  doa,
  selected,
  onSelect,
}: {
  doa: Doa;
  selected?: boolean;
  onSelect?: (doa: Doa) => void;
}) {
  const inner = (
    <>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-extrabold leading-tight text-stone-900 font-display">{doa.judul}</p>
        {doa.latin ? (
          <p className="truncate text-xs italic text-stone-500 font-sans">{doa.latin}</p>
        ) : (
          <p className="font-sans text-[10px] uppercase tracking-wider font-bold text-amber-600">
            Perlu verifikasi ustadz
          </p>
        )}
      </div>
      <IconChevron className={`h-4 w-4 flex-none transition-colors ${selected ? 'text-pink-600' : 'text-stone-400'}`} />
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(doa)}
        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all ${
          selected
            ? 'border-pink-300 bg-pink-50/70 shadow-2xs'
            : 'border-stone-200/80 bg-white hover:bg-stone-50'
        }`}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      to={`/doa/${doa.id}`}
      className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-4 py-3.5 active:scale-[0.99] hover:bg-stone-50 transition-all shadow-2xs"
    >
      {inner}
    </Link>
  );
}

function SearchBox({ q, setQ }: { q: string; setQ: (v: string) => void }) {
  return (
    <div className="relative">
      <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari doa… (mis. talbiyah, ka'bah)"
        className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-2.5 pl-11 text-xs font-normal text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-pink-300 outline-none transition"
      />
    </div>
  );
}

export default function DoaPage() {
  const [params, setParams] = useSearchParams();
  const kategori = params.get('kategori') as KategoriDoa | null;
  const [q, setQ] = useState('');
  const [selectedDoa, setSelectedDoa] = useState<Doa | null>(null);
  const isDesktop = useIsDesktop();

  const hasil = useMemo(() => (q.trim() ? cariDoa(q) : []), [q]);
  const katMeta = kategori ? kategoriDoaMeta.find((k) => k.id === kategori) : null;
  const doaKategori = kategori ? doaByKategori(kategori) : [];

  useEffect(() => {
    setSelectedDoa(null);
  }, [kategori, q]);

  useEffect(() => {
    if (isDesktop && kategori && doaKategori.length > 0 && !selectedDoa) {
      setSelectedDoa(doaKategori[0]);
    }
  }, [isDesktop, kategori, doaKategori.length]);

  if (!isDesktop) {
    if (q.trim()) {
      return (
        <div className="bg-white min-h-screen">
          <header
            className="sticky top-0 z-30 border-b border-stone-100 bg-white/95 px-5 pb-3 pt-4 backdrop-blur-md"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            <SearchBox q={q} setQ={setQ} />
          </header>
          <div className="space-y-3 px-5 pt-4">
            <p className="font-sans text-xs uppercase tracking-widest font-bold text-pink-600">
              {hasil.length} hasil untuk "{q}"
            </p>
            {hasil.length ? (
              hasil.map((d) => <DoaRow key={d.id} doa={d} />)
            ) : (
              <EmptyState
                icon={<IconSearch className="h-7 w-7 text-pink-600" />}
                title="Doa tidak ditemukan"
                desc="Coba kata kunci lain, atau jelajahi berdasarkan kategori."
              />
            )}
          </div>
        </div>
      );
    }

    if (kategori && katMeta) {
      return (
        <div className="bg-white min-h-screen">
          <header
            className="sticky top-0 z-30 border-b border-stone-100 bg-white/95 px-4 pb-3 pt-4 backdrop-blur-md"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setParams({})}
                aria-label="Kembali ke kategori"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 active:scale-95 shadow-2xs"
              >
                <IconBack className="h-5 w-5" />
              </button>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-pink-600">
                  Kumpulan Doa
                </p>
                <h1 className="font-display text-lg font-black text-stone-900">
                  {katMeta.judul}
                </h1>
              </div>
            </div>
          </header>
          <div className="space-y-3 px-5 pt-4">
            {doaKategori.length ? (
              doaKategori.map((d) => <DoaRow key={d.id} doa={d} />)
            ) : (
              <EmptyState
                icon={<IconDoa className="h-7 w-7 text-pink-600" />}
                title="Belum ada doa"
                desc="Konten untuk kategori ini sedang disiapkan."
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white min-h-screen">
        <header
          className="px-5 pb-1 pt-8"
          style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}
        >
          <h1 className="font-display text-3xl font-black text-stone-900">Kumpulan Doa</h1>
          <p className="mt-1 text-xs text-stone-500 font-sans">Cari cepat, atau jelajahi per tahapan ibadah.</p>
        </header>
        <div className="px-5 pt-4">
          <SearchBox q={q} setQ={setQ} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 px-5 pb-6">
          {kategoriDoaMeta.map((k) => {
            const jumlah = daftarDoa.filter((d) => d.kategori === k.id).length;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setParams({ kategori: k.id })}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white text-left shadow-2xs hover:border-pink-300 transition-all active:scale-[0.98] p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 border border-pink-100 text-pink-600">
                    <IconDoa className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 font-mono text-[10px] font-bold text-pink-800">{jumlah}</span>
                </div>
                <div>
                  <h2 className="font-display text-sm font-extrabold leading-tight text-stone-900">{k.judul}</h2>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-stone-500 font-sans">{k.deskripsi}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">
      <div className="w-[340px] flex-none border-r border-stone-200/80 overflow-y-auto bg-white">
        <div className="sticky top-0 z-10 bg-white/95 px-5 py-5 backdrop-blur-md border-b border-stone-100">
          <h1 className="font-display text-2xl font-black text-stone-900 tracking-tight">Kumpulan Doa</h1>
          <p className="mt-0.5 text-xs text-stone-500 font-sans">Per tahapan ibadah</p>
          <div className="mt-3">
            <SearchBox q={q} setQ={setQ} />
          </div>
        </div>

        <div className="px-4 py-4">
          {q.trim() ? (
            <div className="space-y-2.5">
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-pink-600 mb-3">
                {hasil.length} hasil untuk "{q}"
              </p>
              {hasil.length ? (
                hasil.map((d) => (
                  <DoaRow
                    key={d.id}
                    doa={d}
                    selected={selectedDoa?.id === d.id}
                    onSelect={setSelectedDoa}
                  />
                ))
              ) : (
                <EmptyState
                  icon={<IconSearch className="h-6 w-6 text-pink-600" />}
                  title="Tidak ditemukan"
                  desc="Coba kata kunci lain."
                />
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {kategoriDoaMeta.map((k) => {
                const doaList = doaByKategori(k.id);
                if (!doaList.length) return null;
                const selected = kategori === k.id;
                return (
                  <div key={k.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setParams({ kategori: k.id });
                        setSelectedDoa(doaList[0]);
                      }}
                      className={`mb-2.5 flex w-full items-center justify-between px-1 ${
                        selected ? 'text-pink-600 font-extrabold' : 'text-stone-600 hover:text-stone-900'
                      } transition-colors`}
                    >
                      <span className="font-sans text-xs font-extrabold uppercase tracking-wider text-pink-600">
                        {k.judul}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                        selected ? 'bg-pink-100 text-pink-800' : 'bg-stone-100 text-stone-600'
                      }`}>{doaList.length}</span>
                    </button>

                    <div className="space-y-2">
                      {doaList.map((d) => (
                        <DoaRow
                          key={d.id}
                          doa={d}
                          selected={selectedDoa?.id === d.id}
                          onSelect={(doa) => {
                            setSelectedDoa(doa);
                            setParams({ kategori: k.id });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {selectedDoa ? (
          <div className="px-8 py-8 max-w-3xl">
            <DoaDetailContent doa={selectedDoa} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-12 text-center space-y-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-200 bg-pink-50 text-pink-600 shadow-sm">
              <IconDoa className="h-7 w-7" />
            </div>
            <p className="font-display text-xl font-black text-stone-900">
              Pilih doa dari panel kiri
            </p>
            <p className="max-w-[36ch] text-xs leading-relaxed text-stone-500 font-sans">
              Klik salah satu doa untuk menampilkan bacaan Arab, transliterasi, dan keterangannya di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
