import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { fetchAgenda, type AgendaItemRow } from '../lib/supabase';
import { insertAgendaDummy } from '../data/agendaDummy';

function formatTanggalHeader(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatRentang(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatJam(jam: string | null) {
  if (!jam) return null;
  return jam.slice(0, 5);
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function isToday(iso: string) {
  return iso === getTodayStr();
}

function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function jamToMinutes(jam: string): number {
  const [h, m] = jam.split(':').map(Number);
  return h * 60 + m;
}

function isPast(tanggal: string, jam_mulai: string | null): boolean {
  const today = getTodayStr();
  if (tanggal < today) return true;
  if (tanggal > today) return false;
  if (!jam_mulai) return false;
  return nowMinutes() > jamToMinutes(jam_mulai);
}

function isOngoing(dayItems: AgendaItemRow[], idx: number, tanggal: string, jam_mulai: string | null): boolean {
  if (!isToday(tanggal) || !jam_mulai) return false;
  const now = nowMinutes();
  const start = jamToMinutes(jam_mulai);
  if (now < start) return false;
  const next = dayItems[idx + 1];
  if (!next?.jam_mulai) return now >= start;
  return now < jamToMinutes(next.jam_mulai);
}

export default function AgendaLengkap() {
  const { keberangkatan, tenant } = useAuth();
  const [items, setItems] = useState<AgendaItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inserting, setInserting] = useState(false);
  const [hariIniVisible, setHariIniVisible] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchParams] = useSearchParams();
  const isDemoMode = searchParams.get('demo') === '1';
  const todayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!keberangkatan?.id) { setLoading(false); return; }
    setLoading(true);
    fetchAgenda(keberangkatan.id)
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => { setError('Gagal memuat agenda.'); setLoading(false); });
  }, [keberangkatan?.id, refreshKey]);

  useEffect(() => {
    if (!todayRef.current) return;
    const el = todayRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => setHariIniVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [items]);

  const grouped: Record<string, AgendaItemRow[]> = {};
  for (const item of items) {
    if (!grouped[item.tanggal]) grouped[item.tanggal] = [];
    grouped[item.tanggal].push(item);
  }
  const tanggalList = Object.keys(grouped).sort();
  const firstDate = tanggalList[0] ?? null;
  const lastDate = tanggalList[tanggalList.length - 1] ?? null;
  const todayStr = getTodayStr();

  function hariKe(iso: string): number {
    if (!firstDate) return 1;
    const start = new Date(firstDate + 'T00:00:00').getTime();
    const cur = new Date(iso + 'T00:00:00').getTime();
    return Math.round((cur - start) / 86400000) + 1;
  }

  const todayHariKe = firstDate ? hariKe(todayStr) : null;
  const todayInRange = todayHariKe !== null && todayHariKe >= 1 && todayHariKe <= tanggalList.length;

  const handleInsertDemo = async () => {
    if (!tenant?.id || !keberangkatan?.id) return;
    setInserting(true);
    await insertAgendaDummy(tenant.id, keberangkatan.id);
    setInserting(false);
    setRefreshKey((k) => k + 1);
  };

  const showFloating = !hariIniVisible && tanggalList.includes(todayStr) && tanggalList.length > 3;

  return (
    <div className="min-h-screen bg-canvas">
      <PageHeader
        title="Agenda Perjalanan"
        eyebrow={tenant?.nama_travel ?? 'Agenda'}
        backTo="/beranda"
      />

      <div className="px-4 pb-10 pt-4">

        {/* ── Trip summary strip ── */}
        {!loading && tanggalList.length > 0 && (
          <div className="mb-5 rounded-2xl border border-hairline bg-white px-4 py-3 shadow-drop-card">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
                {tenant?.nama_travel}
              </span>
              <span className="text-[10px] text-hairline">·</span>
              {firstDate && lastDate && (
                <span className="font-mono text-[10px] text-charcoal">
                  {formatRentang(firstDate)} — {formatRentang(lastDate)}
                </span>
              )}
              <span className="text-[10px] text-hairline">·</span>
              <span className="font-mono text-[10px] text-charcoal">{tanggalList.length} hari</span>
              {todayInRange && (
                <>
                  <span className="text-[10px] text-hairline">·</span>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    Hari Ini: Hari ke-{todayHariKe}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="py-20 text-center">
            <p className="font-mono text-[12px] uppercase tracking-widest text-stone">Memuat agenda...</p>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
            <p className="text-[13px] text-red-600">{error}</p>
          </div>
        )}

        {/* ── Kosong ── */}
        {!loading && !error && tanggalList.length === 0 && (
          <div className="py-20 text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(14,165,233,0.08)', border: '1.5px solid rgba(14,165,233,0.15)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2 v4 M8 2 v4 M3 10 h18" />
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-ink">Belum ada agenda</p>
            <p className="mt-1 text-[13px] text-charcoal">Admin travel belum menambahkan jadwal perjalanan.</p>
            {isDemoMode && (
              <button
                onClick={handleInsertDemo}
                disabled={inserting}
                className="mt-6 rounded-2xl px-6 py-3 text-[13px] font-bold text-white transition-all active:scale-95 disabled:opacity-60"
                style={{ background: 'var(--color-primary)' }}
              >
                {inserting ? 'Memasukkan data demo...' : '✨ Insert Data Demo'}
              </button>
            )}
          </div>
        )}

        {/* ── Timeline ── */}
        {!loading && tanggalList.length > 0 && (
          <div className="space-y-8">
            {tanggalList.map((tgl) => {
              const dayItems = grouped[tgl];
              const todayDay = isToday(tgl);
              const n = hariKe(tgl);

              return (
                <div
                  key={tgl}
                  id={todayDay ? 'hari-ini' : undefined}
                  ref={todayDay ? todayRef : null}
                >
                  {/* ── Tanggal header dua baris ── */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex-none">
                      <p
                        className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: todayDay ? 'var(--color-primary)' : '#9ca3af' }}
                      >
                        Hari {n}
                      </p>
                      <p
                        className="text-[13px] font-semibold leading-tight"
                        style={{ color: todayDay ? 'var(--color-primary)' : '#374151' }}
                      >
                        {formatTanggalHeader(tgl)}
                      </p>
                    </div>
                    {todayDay && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white"
                        style={{ background: 'var(--color-primary)' }}
                      >
                        Hari Ini
                      </span>
                    )}
                  </div>

                  {/* ── Item list ── */}
                  <div
                    className="space-y-2 pl-4"
                    style={{ borderLeft: `2px solid ${todayDay ? 'var(--color-primary)' : '#e5e7eb'}` }}
                  >
                    {dayItems.map((item, idx) => {
                      const past = isPast(tgl, item.jam_mulai);
                      const ongoing = !past && isOngoing(dayItems, idx, tgl, item.jam_mulai);
                      const jamStr = formatJam(item.jam_mulai);

                      return (
                        <div
                          key={item.id}
                          className="relative overflow-hidden rounded-2xl border bg-white px-4 py-3.5 transition-all"
                          style={{
                            opacity: past ? 0.65 : 1,
                            borderColor: ongoing
                              ? 'var(--color-primary)'
                              : past
                              ? 'rgba(0,0,0,0.06)'
                              : todayDay
                              ? 'rgba(14,165,233,0.14)'
                              : 'rgba(0,0,0,0.06)',
                            background: ongoing ? 'rgba(14,165,233,0.04)' : '#fff',
                          }}
                        >
                          {/* Accent kiri untuk yang sedang berlangsung */}
                          {ongoing && (
                            <div
                              className="absolute bottom-0 left-0 top-0 w-1"
                              style={{ background: 'var(--color-primary)', borderRadius: '8px 0 0 8px' }}
                            />
                          )}

                          {/* Badge "Sekarang" */}
                          {ongoing && (
                            <span
                              className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
                              style={{ background: 'var(--color-primary)' }}
                            >
                              Sekarang
                            </span>
                          )}

                          <div className="flex items-start gap-3">
                            {/* Kolom jam + checkmark */}
                            <div className="flex w-10 flex-none flex-col items-center gap-0.5 pt-0.5">
                              {past && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                              {jamStr ? (
                                <span
                                  className="font-mono text-[12px] font-bold leading-none"
                                  style={{ color: past ? '#9ca3af' : 'var(--color-primary)' }}
                                >
                                  {jamStr}
                                </span>
                              ) : (
                                <span className="font-mono text-[12px] leading-none" style={{ color: '#d1d5db' }}>—:—</span>
                              )}
                            </div>

                            {/* Konten */}
                            <div className="min-w-0 flex-1">
                              <p
                                className="text-[14px] font-bold leading-snug"
                                style={{ color: past ? '#6b7280' : '#111827' }}
                              >
                                {item.judul}
                              </p>
                              {item.lokasi && (
                                <p className="mt-0.5 flex items-center gap-1 font-mono text-[11px] text-mute">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5 flex-none">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                  </svg>
                                  {item.lokasi}
                                </p>
                              )}
                              {item.deskripsi && (
                                <p className="mt-1 text-[12px] leading-relaxed text-charcoal">{item.deskripsi}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── CTA kembali ── */}
        {!loading && tanggalList.length > 0 && (
          <Link
            to="/beranda"
            className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-hairline bg-white px-5 py-3.5 text-[13px] font-semibold text-charcoal transition-all active:scale-[0.98]"
          >
            Kembali ke Beranda
          </Link>
        )}
      </div>

      {/* ── Floating "Ke Hari Ini" ── */}
      {showFloating && (
        <button
          onClick={() =>
            document.getElementById('hari-ini')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          className="fixed bottom-6 right-4 z-50 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[12px] font-bold text-white shadow-lg transition-all active:scale-95"
          style={{ background: 'var(--color-primary)' }}
        >
          Ke Hari Ini
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
}
