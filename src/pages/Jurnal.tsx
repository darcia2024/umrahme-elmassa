import React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import type { JurnalEntry } from '../types';
import PageHeader from '../components/PageHeader';
import { IconBack } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { fetchJurnal, createJurnal, deleteJurnal } from '../lib/supabase';

const MAX_FILE_BYTES = 5 * 1024 * 1024;

const LOKASI_SARAN = [
  'Masjidil Haram', "Ka'bah", 'Multazam', 'Hijr Ismail', 'Sumur Zamzam',
  'Masjid Nabawi', 'Raudhah', 'Masjid Quba', 'Jabal Nur (Gua Hira)',
  'Jabal Rahmah', 'Jabal Uhud', 'Mina', 'Arafah', 'Muzdalifah',
];

// ── Foto tetap lokal (hanya dikaitkan ke id baris Supabase) ──
const FOTO_PREFIX = 'umrahme.jurnal.foto.';

function loadFotoLokal(id: string): string | undefined {
  try { return localStorage.getItem(FOTO_PREFIX + id) ?? undefined; } catch { return undefined; }
}

function saveFotoLokal(id: string, dataUrl: string) {
  try { localStorage.setItem(FOTO_PREFIX + id, dataUrl); } catch { /* storage penuh */ }
}

function removeFotoLokal(id: string) {
  try { localStorage.removeItem(FOTO_PREFIX + id); } catch { /* noop */ }
}

function resizeImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_BYTES) { reject(new Error('Foto terlalu besar. Pilih foto di bawah 5 MB.')); return; }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file foto.'));
    reader.onload = (evt) => {
      const src = evt.target?.result as string;
      const img = new Image();
      img.onerror = () => reject(new Error('File bukan gambar yang valid.'));
      img.onload = () => {
        const MAX_DIM = 800;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas tidak didukung.')); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}

function formatTanggalPanjang(iso: string): string {
  try {
    return new Intl.DateTimeFormat('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso + 'T00:00:00'));
  } catch { return iso; }
}

function formatTanggalPendek(iso: string): string {
  try {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso + 'T00:00:00'));
  } catch { return iso; }
}

function EntriDetailOverlay({
  entry, onClose, onDelete,
}: { entry: JurnalEntry; onClose: () => void; onDelete: (id: string) => void }) {
  const handleDelete = () => {
    if (window.confirm('Hapus entri jurnal ini? Tindakan tidak bisa dibatalkan.')) {
      onDelete(entry.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-hairline bg-canvas px-5 py-4">
        <button type="button" onClick={onClose}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-hairline text-mute active:bg-surface-bone" aria-label="Kembali">
          <IconBack className="h-4 w-4" />
        </button>
        <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-widest text-mute">
          {formatTanggalPanjang(entry.tanggal)}
        </span>
        <button type="button" onClick={handleDelete} className="flex-none text-[13px] text-mute transition hover:text-primary">
          Hapus
        </button>
      </div>

      {entry.fotoDataUrl ? (
        <img src={entry.fotoDataUrl} alt={entry.judul ?? 'Foto jurnal'} className="max-h-80 w-full object-cover lg:max-h-[28rem]" />
      ) : null}

      <div className="mx-auto w-full max-w-2xl px-5 py-6">
        {entry.lokasi ? (
          <span className="mb-4 inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-mono text-[11px] text-gold">
            📍 {entry.lokasi}
          </span>
        ) : null}
        {entry.judul ? (
          <h2 className="mt-1 font-display text-2xl font-bold leading-snug text-ink">
            {entry.judul}
          </h2>
        ) : null}
        <p className="mt-4 whitespace-pre-wrap text-[16px] leading-relaxed text-body">
          {entry.isi}
        </p>
      </div>
    </div>
  );
}

function EntriForm({
  onSave, onCancel,
}: { onSave: (data: Omit<JurnalEntry, 'id'>) => Promise<void>; onCancel: () => void }) {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [saranOpen, setSaranOpen] = useState(false);
  const [fotoDataUrl, setFotoDataUrl] = useState<string | null>(null);
  const [fotoError, setFotoError] = useState('');
  const [loadingFoto, setLoadingFoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const saranFiltered = LOKASI_SARAN.filter((s) => s.toLowerCase().includes(lokasi.toLowerCase())).slice(0, 5);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoError('');
    setLoadingFoto(true);
    try {
      const url = await resizeImageToDataUrl(file);
      setFotoDataUrl(url);
    } catch (err) {
      setFotoError(err instanceof Error ? err.message : 'Gagal memproses foto.');
    } finally {
      setLoadingFoto(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!isi.trim() || saving) return;
    setSaving(true);
    try {
      await onSave({
        tanggal: new Date().toISOString().slice(0, 10),
        judul: judul.trim() || undefined,
        isi: isi.trim(),
        fotoDataUrl: fotoDataUrl ?? undefined,
        lokasi: lokasi.trim() || undefined,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-md border border-hairline bg-surface-card p-4 shadow-drop-card">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-mute">
        Entri Baru — {formatTanggalPanjang(new Date().toISOString().slice(0, 10))}
      </p>

      <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul singkat (opsional)"
        className="mb-3 w-full rounded-full border border-hairline bg-canvas px-4 py-2.5 font-display text-[15px] font-medium text-ink placeholder:font-sans placeholder:text-ash focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.5)]" />

      <textarea value={isi} onChange={(e) => setIsi(e.target.value)}
        placeholder="Ceritakan momen ini..." rows={5}
        className="mb-3 w-full resize-none rounded-md border border-hairline bg-canvas px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-ash focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.5)]" />

      <div className="relative mb-3">
        <input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)}
          onFocus={() => setSaranOpen(true)} onBlur={() => setTimeout(() => setSaranOpen(false), 150)}
          placeholder="📍 Tag lokasi (opsional)"
          className="w-full rounded-full border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ash focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.5)]" />
        {saranOpen && saranFiltered.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-hairline bg-surface-card py-1 shadow-drop-soft">
            {saranFiltered.map((s) => (
              <button key={s} type="button"
                onMouseDown={() => { setLokasi(s); setSaranOpen(false); }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-body hover:bg-surface-bone active:bg-surface-bone">
                <span className="text-[11px] text-gold/60">📍</span>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-3">
        {fotoDataUrl ? (
          <div className="relative rounded-md overflow-hidden border border-hairline">
            <img src={fotoDataUrl} alt="Preview foto" className="max-h-52 w-full object-cover" />
            <button type="button" onClick={() => setFotoDataUrl(null)}
              className="absolute right-2 top-2 rounded-full border border-hairline bg-canvas/90 px-2.5 py-1 text-[11px] text-mute hover:text-ink">
              Hapus foto
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current?.click()} disabled={loadingFoto}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-hairline-strong py-3 text-sm text-mute transition hover:border-charcoal hover:text-body disabled:opacity-50">
            {loadingFoto ? 'Memproses foto...' : '+ Lampirkan Foto (opsional)'}
          </button>
        )}
        {fotoError ? <p className="mt-1.5 text-[12px] text-primary">{fotoError}</p> : null}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      <p className="mb-3 rounded-md bg-surface-bone px-3 py-2 text-[11px] leading-relaxed text-mute">
        💡 Catatan teks tersimpan &amp; tersinkron di semua perangkat. Foto saat ini hanya tersimpan di perangkat ini.
      </p>

      <div className="flex gap-2.5">
        <button type="button" onClick={onCancel} disabled={saving}
          className="flex-1 rounded-full border border-hairline py-2.5 text-sm text-mute transition active:scale-[0.98] disabled:opacity-50">
          Batal
        </button>
        <button type="button" onClick={handleSave} disabled={!isi.trim() || saving}
          className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-on-primary transition active:scale-[0.98] disabled:opacity-40">
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </div>
  );
}

export default function Jurnal() {
  const { jamaah, tenant } = useAuth();
  const tenantId = tenant?.id;
  const nomorJamaah = jamaah?.nomorJamaah;

  const [entries, setEntries] = useState<JurnalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'linimasa' | 'gallery'>('linimasa');
  const [formOpen, setFormOpen] = useState(false);
  const [detail, setDetail] = useState<JurnalEntry | null>(null);

  useEffect(() => {
    if (!tenantId || !nomorJamaah) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchJurnal(tenantId, nomorJamaah);
        if (cancelled) return;
        setEntries(rows.map((r) => ({
          id: r.id,
          tanggal: r.tanggal,
          judul: r.judul ?? undefined,
          isi: r.isi,
          lokasi: r.lokasi ?? undefined,
          fotoDataUrl: loadFotoLokal(r.id),
        })));
      } catch (e) {
        console.error('Gagal memuat jurnal', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [tenantId, nomorJamaah]);

  const handleSave = useCallback(async (data: Omit<JurnalEntry, 'id'>) => {
    if (!tenantId || !nomorJamaah) return;
    const row = await createJurnal(tenantId, nomorJamaah, {
      tanggal: data.tanggal,
      judul: data.judul ?? null,
      isi: data.isi,
      lokasi: data.lokasi ?? null,
    });
    if (data.fotoDataUrl) saveFotoLokal(row.id, data.fotoDataUrl);
    setEntries((prev) => [{ ...data, id: row.id }, ...prev]);
    setFormOpen(false);
  }, [tenantId, nomorJamaah]);

  const handleDelete = useCallback(async (id: string) => {
    if (!tenantId || !nomorJamaah) return;
    try {
      await deleteJurnal(id, tenantId, nomorJamaah);
      removeFotoLokal(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert('Gagal menghapus. Coba lagi.');
    }
  }, [tenantId, nomorJamaah]);

  const entriesSorted = [...entries].sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
  const entriesWithPhoto = entriesSorted.filter((e) => !!e.fotoDataUrl);

  if (detail) {
    return <EntriDetailOverlay entry={detail} onClose={() => setDetail(null)} onDelete={handleDelete} />;
  }

  if (!tenantId || !nomorJamaah) {
    return (
      <div className="pb-10">
        <PageHeader title="Jurnal" eyebrow="Profil" backTo="/profil" />
        <div className="mx-auto max-w-2xl px-5 pt-4 lg:px-8">
          <div className="py-20 text-center">
            <p className="font-display text-3xl text-mute/30">✦</p>
            <p className="mt-4 font-display text-xl font-bold text-charcoal">Masuk untuk menulis jurnal</p>
            <p className="mt-2 text-sm leading-relaxed text-mute">
              Jurnal Anda tersinkron ke semua perangkat setelah login.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PageHeader title="Jurnal" eyebrow="Profil" backTo="/profil" />

      <div className="mx-auto max-w-2xl px-5 pt-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-full border border-hairline bg-surface-bone p-1">
            {(['linimasa', 'gallery'] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={`flex-1 rounded-full py-1.5 text-[13px] font-medium transition ${
                  mode === m ? 'bg-primary text-on-primary' : 'text-mute active:bg-surface-card hover:text-body'
                }`}>
                {m === 'linimasa' ? 'Linimasa' : 'Gallery'}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setFormOpen((v) => !v)}
            className={`flex-none rounded-full border px-4 py-2 text-[13px] font-medium transition active:scale-[0.97] ${
              formOpen ? 'border-hairline bg-surface-bone text-ink' : 'border-primary/30 bg-primary/10 text-primary'
            }`}>
            {formOpen ? 'Tutup' : '+ Tulis'}
          </button>
        </div>

        {formOpen ? (
          <div className="mt-4">
            <EntriForm onSave={handleSave} onCancel={() => setFormOpen(false)} />
          </div>
        ) : null}

        {loading ? (
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-mute">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            Memuat jurnal...
          </div>
        ) : null}

        {!loading && mode === 'linimasa' ? (
          <div className="mt-5">
            {entriesSorted.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-display text-3xl text-mute/30">✦</p>
                <p className="mt-4 font-display text-xl font-bold text-charcoal">
                  Catat momen perjalanan Anda
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  Setiap tulisan akan tersimpan &amp; tersinkron di semua perangkat —<br />
                  kenangan yang bisa dibaca ulang kapan saja.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {entriesSorted.map((entry) => (
                  <button key={entry.id} type="button" onClick={() => setDetail(entry)}
                    className="block w-full overflow-hidden rounded-md border border-hairline bg-surface-card text-left transition active:scale-[0.99] hover:shadow-drop-soft">
                    {entry.fotoDataUrl ? (
                      <img src={entry.fotoDataUrl} alt={entry.judul ?? 'Foto jurnal'} className="h-48 w-full object-cover" />
                    ) : null}
                    <div className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-mute">
                          {formatTanggalPendek(entry.tanggal)}
                        </span>
                        {entry.lokasi ? (
                          <span className="rounded-full border border-gold/20 bg-gold/5 px-2 py-0.5 font-mono text-[9px] text-gold">
                            📍 {entry.lokasi}
                          </span>
                        ) : null}
                      </div>
                      {entry.judul ? (
                        <p className="mt-2 font-display text-xl font-bold leading-snug text-ink">
                          {entry.judul}
                        </p>
                      ) : null}
                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal"
                        style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {entry.isi}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {!loading && mode === 'gallery' ? (
          <div className="mt-5">
            {entriesWithPhoto.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-display text-3xl text-mute/30">✦</p>
                <p className="mt-4 font-display text-xl font-bold text-charcoal">Belum ada foto</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  Lampirkan foto saat menulis entri —<br />setiap foto akan muncul di sini sebagai galeri.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
                {entriesWithPhoto.map((entry) => (
                  <button key={entry.id} type="button" onClick={() => setDetail(entry)}
                    className="group relative aspect-square overflow-hidden rounded-md border border-hairline bg-surface-bone active:scale-[0.97] transition">
                    <img src={entry.fotoDataUrl} alt={entry.judul ?? 'Foto'}
                      className="h-full w-full object-cover transition group-active:brightness-75" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="truncate text-[11px] font-medium text-on-primary">
                        {entry.judul ?? formatTanggalPendek(entry.tanggal)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
