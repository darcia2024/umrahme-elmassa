import { useEffect, useMemo, useRef, useState } from 'react';
import { kategoriChecklist, checklistItems, itemsByKategori } from '../data/checklist';
import type { ChecklistItem as ChecklistItemType, KategoriChecklist, KategoriJamaah } from '../types';
import PageHeader from '../components/PageHeader';
import { IconCheck, IconChevron } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { getJamaahData, setJamaahData } from '../lib/supabase';

const PROFIL_OPTIONS: { id: KategoriJamaah; label: string }[] = [
  { id: 'laki-laki', label: 'Laki-laki' },
  { id: 'perempuan', label: 'Perempuan' },
  { id: 'lansia', label: 'Lansia' },
];

const BADGE_STYLE: Record<KategoriJamaah, string> = {
  'laki-laki': 'border-primary/20 text-primary/70',
  perempuan: 'border-gold/30 text-gold/70',
  lansia: 'border-charcoal/30 text-charcoal/70',
};

const BADGE_LABEL: Record<KategoriJamaah, string> = {
  'laki-laki': 'Pria',
  perempuan: 'Wanita',
  lansia: 'Lansia',
};

function KategoriBadge({ k }: { k: KategoriJamaah }) {
  return (
    <span className={`flex-none self-start rounded-full border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider ${BADGE_STYLE[k]}`}>
      {BADGE_LABEL[k]}
    </span>
  );
}

function ItemRow({
  item,
  on,
  onToggle,
  mobile = false,
}: {
  item: ChecklistItemType;
  on: boolean;
  onToggle: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition ${
        mobile
          ? 'min-h-[56px] active:bg-surface-bone'
          : 'min-h-[52px] active:bg-surface-bone lg:hover:bg-surface-bone'
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border transition ${
          on ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas'
        }`}
      >
        {on ? <IconCheck className="h-4 w-4" /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block text-[15px] leading-snug ${
            on ? 'text-mute line-through' : 'font-medium text-ink'
          }`}
        >
          {item.judul}
        </span>
        {item.catatan ? (
          <span className="mt-0.5 block text-xs leading-relaxed text-charcoal">{item.catatan}</span>
        ) : null}
      </span>
      {item.untukKategori ? item.untukKategori.map((k) => <KategoriBadge key={k} k={k} />) : null}
      {item.tenggat ? (
        <span className="flex-none self-start font-mono text-[11px] text-gold/80">
          {item.tenggat}
        </span>
      ) : null}
    </button>
  );
}

function ProfilSelector({
  profil,
  onChange,
}: {
  profil: KategoriJamaah[];
  onChange: (p: KategoriJamaah[]) => void;
}) {
  const toggle = (id: KategoriJamaah) => {
    if (profil.includes(id)) {
      onChange(profil.filter((x) => x !== id));
    } else {
      onChange([...profil, id]);
    }
  };

  return (
    <div className="rounded-md border border-hairline bg-surface-card px-4 py-4 shadow-drop-card">
      <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
        Siapa yang berangkat?
      </p>
      <p className="mt-0.5 text-[13px] text-charcoal">
        Checklist Barang Bawaan akan menyesuaikan profil Anda.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {PROFIL_OPTIONS.map((opt) => {
          const active = profil.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition ${
                active
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-hairline bg-surface-bone text-mute hover:border-hairline-strong hover:text-body'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {profil.length === 0 && (
        <p className="mt-2 text-[11px] text-ash">
          Belum dipilih — menampilkan semua item.
        </p>
      )}
    </div>
  );
}

export default function Persiapan() {
  const { jamaah, tenant } = useAuth();
  const tenantId = tenant?.id;
  const nomor = jamaah?.nomorJamaah;

  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('umrahme.persiapan');
      return raw ? new Set<string>(JSON.parse(raw) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  const [profil, setProfil] = useState<KategoriJamaah[]>(() => {
    try {
      const raw = localStorage.getItem('umrahme.persiapan.profil');
      return raw ? (JSON.parse(raw) as KategoriJamaah[]) : [];
    } catch {
      return [];
    }
  });

  const [openCat, setOpenCat] = useState<KategoriChecklist | null>(
    () => kategoriChecklist[0]?.id ?? null,
  );

  const cloudLoadedRef = useRef(false);
  useEffect(() => {
    if (!tenantId || !nomor || cloudLoadedRef.current) return;
    cloudLoadedRef.current = true;
    (async () => {
      try {
        const [cloudChecked, cloudProfil] = await Promise.all([
          getJamaahData<string[]>(tenantId, nomor, 'persiapan'),
          getJamaahData<KategoriJamaah[]>(tenantId, nomor, 'persiapan.profil'),
        ]);
        if (cloudChecked !== null) {
          setChecked(new Set(cloudChecked));
          localStorage.setItem('umrahme.persiapan', JSON.stringify(cloudChecked));
        }
        if (cloudProfil !== null) {
          setProfil(cloudProfil);
          localStorage.setItem('umrahme.persiapan.profil', JSON.stringify(cloudProfil));
        }
      } catch { /* offline — localStorage tetap dipakai */ }
    })();
  }, [tenantId, nomor]);

  useEffect(() => {
    const arr = [...checked];
    localStorage.setItem('umrahme.persiapan', JSON.stringify(arr));
    if (tenantId && nomor) setJamaahData(tenantId, nomor, 'persiapan', arr).catch(() => {});
  }, [checked, tenantId, nomor]);

  useEffect(() => {
    localStorage.setItem('umrahme.persiapan.profil', JSON.stringify(profil));
    if (tenantId && nomor) setJamaahData(tenantId, nomor, 'persiapan.profil', profil).catch(() => {});
  }, [profil, tenantId, nomor]);

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const visibleBarangItems = useMemo(
    () => itemsByKategori('barang', profil.length > 0 ? profil : undefined),
    [profil],
  );

  const allVisibleItems = useMemo(() => {
    const nonBarang = checklistItems.filter((i) => i.kategori !== 'barang');
    return [...nonBarang, ...visibleBarangItems];
  }, [visibleBarangItems]);

  const totalItem = allVisibleItems.length;
  const totalDone = useMemo(
    () => allVisibleItems.filter((i) => checked.has(i.id)).length,
    [allVisibleItems, checked],
  );
  const persen = totalItem > 0 ? Math.round((totalDone / totalItem) * 100) : 0;

  const statPerKategori = useMemo(
    () =>
      kategoriChecklist.map((k) => {
        const items = k.id === 'barang' ? visibleBarangItems : itemsByKategori(k.id);
        const done = items.filter((i) => checked.has(i.id)).length;
        return { ...k, total: items.length, done, complete: done === items.length };
      }),
    [checked, visibleBarangItems],
  );

  const laggingKategoriId = useMemo(() => {
    const incomplete = statPerKategori.filter((x) => !x.complete);
    if (!incomplete.length) return null;
    const minRasio = Math.min(...incomplete.map((x) => (x.total > 0 ? x.done / x.total : 0)));
    const allSame = incomplete.every((x) => (x.total > 0 ? x.done / x.total : 0) === minRasio);
    if (allSame) return null;
    return incomplete.find((x) => (x.total > 0 ? x.done / x.total : 0) === minRasio)?.id ?? null;
  }, [statPerKategori]);

  useEffect(() => {
    if (!openCat) return;
    const cur = statPerKategori.find((k) => k.id === openCat);
    if (cur?.complete) {
      const next = statPerKategori.find((k) => !k.complete);
      setOpenCat(next ? next.id : null);
    }
  }, [statPerKategori, openCat]);

  const visibleItemsFor = (kategoriId: KategoriChecklist) =>
    kategoriId === 'barang' ? visibleBarangItems : itemsByKategori(kategoriId);

  return (
    <div>
      <PageHeader title="Persiapan" eyebrow="Profil" backTo="/profil" />

      {/* ===================== MOBILE (< lg) ===================== */}
      <div className="px-5 pt-4 lg:hidden">
        <div className="rounded-md border border-hairline bg-surface-card px-5 py-5 shadow-drop-card">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Kesiapan Anda
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-ink">
                {persen}%
              </p>
            </div>
            <p className="font-mono text-sm text-mute">
              {totalDone}/{totalItem} tugas
            </p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-bone">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${persen}%` }}
            />
          </div>
          {totalDone === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-charcoal">
              Belum ada yang dicentang. Mulai dari{' '}
              <span className="font-medium text-ink">Dokumen Perjalanan</span> di bawah.
            </p>
          ) : null}
        </div>

        <div className="mt-4">
          <ProfilSelector profil={profil} onChange={setProfil} />
        </div>

        <div className="mt-4 space-y-3 pb-8">
          {statPerKategori.map((k) => {
            const open = openCat === k.id;
            const items = visibleItemsFor(k.id);
            return (
              <div
                key={k.id}
                className={`overflow-hidden rounded-md border transition-colors ${
                  k.complete ? 'border-gold/30' : 'border-hairline'
                } bg-surface-card`}
              >
                <button
                  type="button"
                  onClick={() => setOpenCat(open ? null : k.id)}
                  className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3.5 text-left"
                  aria-expanded={open}
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border ${
                      k.complete
                        ? 'border-gold/50 bg-gold/10 text-gold'
                        : 'border-hairline bg-surface-bone text-mute'
                    }`}
                  >
                    {k.complete ? (
                      <IconCheck className="h-4 w-4" />
                    ) : (
                      <span className="font-mono text-[11px]">
                        {k.done}/{k.total}
                      </span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-ink">{k.judul}</p>
                    <p className="truncate text-xs text-charcoal">
                      {k.complete ? 'Selesai — semua tugas tercentang' : k.deskripsi}
                    </p>
                  </div>
                  <IconChevron
                    className={`h-4 w-4 flex-none text-ash transition-transform ${
                      open ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {open ? (
                  <ul className="space-y-1 px-3 pb-3 animate-fade-up">
                    {items.map((item) => (
                      <li key={item.id}>
                        <ItemRow item={item} on={checked.has(item.id)} onToggle={() => toggle(item.id)} mobile />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================== DESKTOP (≥ lg) ===================== */}
      <div className="hidden lg:block px-8 py-6 max-w-5xl mx-auto">
        <div className="mb-5 overflow-hidden rounded-md border border-hairline bg-surface-card px-6 py-5 shadow-drop-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Kesiapan Anda
              </p>
              <p className="mt-1 font-display text-5xl font-bold text-ink">
                {persen}%
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg text-ink">
                {totalDone}/{totalItem}
              </p>
              <p className="text-sm text-charcoal">tugas selesai</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-bone">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${persen}%` }}
            />
          </div>
        </div>

        <div className="mb-5">
          <ProfilSelector profil={profil} onChange={setProfil} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {statPerKategori.map((k) => {
            const rasioProgress = k.total > 0 ? k.done / k.total : 1;
            const isLaggingBehind = !k.complete && k.id === laggingKategoriId && rasioProgress < 1;
            const items = visibleItemsFor(k.id);

            return (
              <div
                key={k.id}
                className={`overflow-hidden rounded-md border transition-all ${
                  k.complete
                    ? 'border-gold/25 bg-gold/5'
                    : isLaggingBehind
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-hairline bg-surface-card'
                }`}
              >
                <div
                  className={`flex items-center gap-3 border-b px-4 py-3.5 ${
                    k.complete ? 'border-gold/15' : 'border-hairline'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border ${
                      k.complete
                        ? 'border-gold/50 bg-gold/10 text-gold'
                        : isLaggingBehind
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'border-hairline bg-surface-bone text-mute'
                    }`}
                  >
                    {k.complete ? (
                      <IconCheck className="h-4 w-4" />
                    ) : (
                      <span className="font-mono text-[11px]">
                        {k.done}/{k.total}
                      </span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-ink">{k.judul}</p>
                    <p className="truncate text-xs text-charcoal">
                      {k.complete
                        ? 'Selesai — semua tugas tercentang'
                        : isLaggingBehind
                          ? 'Butuh perhatian — belum banyak tercentang'
                          : k.deskripsi}
                    </p>
                  </div>
                  {isLaggingBehind && (
                    <span className="flex-none font-mono text-[9px] uppercase tracking-wider text-primary/80">
                      Prioritas
                    </span>
                  )}
                </div>

                <ul className="space-y-1 px-3 py-2">
                  {items.map((item) => (
                    <li key={item.id}>
                      <ItemRow item={item} on={checked.has(item.id)} onToggle={() => toggle(item.id)} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
