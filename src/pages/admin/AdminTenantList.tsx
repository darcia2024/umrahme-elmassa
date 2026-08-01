import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchTenants, deleteTenant, type TenantRow } from '../../lib/supabase';

export default function AdminTenantList() {
  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [hapusTarget, setHapusTarget] = useState<TenantRow | null>(null);
  const [konfirmText, setKonfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const msg = sessionStorage.getItem('admin_toast');
    if (msg) { setToast(msg); sessionStorage.removeItem('admin_toast'); }
    fetchTenants()
      .then(setTenants)
      .catch(err => setError(err instanceof Error ? err.message : 'Terjadi kesalahan.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleDelete() {
    if (!hapusTarget) return;
    setDeleting(true);
    try {
      await deleteTenant(hapusTarget.id);
      setTenants((prev) => prev.filter((t) => t.id !== hapusTarget.id));
      setToast(`Tenant "${hapusTarget.nama_travel}" berhasil dihapus.`);
      setHapusTarget(null);
      setKonfirmText('');
    } catch (err) {
      setToast(err instanceof Error ? `Gagal menghapus: ${err.message}` : 'Gagal menghapus tenant.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminLayout>
      {toast && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.20)', color: '#065f46' }}>
          <svg className="flex-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-bold leading-tight" style={{ fontSize: '24px', color: '#111827', letterSpacing: '-0.02em' }}>Daftar Tenant</h1>
          <p className="font-mono text-[11px] mt-0.5" style={{ color: '#9ca3af', letterSpacing: '0.01em' }}>{loading ? '—' : `${tenants.length} tenant terdaftar`}</p>
        </div>
        <Link to="/admin/tenants/baru" className="inline-flex items-center gap-2 font-semibold text-[13px] px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#ffffff', boxShadow: '0 2px 8px rgba(67,56,202,0.26), 0 1px 2px rgba(67,56,202,0.18)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Tenant Baru
        </Link>
      </div>

      {error && <div className="mb-5 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', color: '#dc2626' }}>{error}</div>}

      {loading ? (
        <div className="rounded-2xl py-16 text-center font-mono text-[12px]" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', color: '#d1d5db' }}>Memuat data...</div>
      ) : tenants.length === 0 ? (
        <div className="rounded-2xl py-16 text-center text-sm" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', color: '#9ca3af' }}>Belum ada tenant. Tambah yang pertama!</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {tenants.map((t) => {
            const inisial = (t.nama_travel || '?').trim().charAt(0).toUpperCase();
            return (
              <div key={t.id}
                className="rounded-2xl flex flex-col items-center text-center transition-all duration-150"
                style={{ background: '#ffffff', border: '0.5px solid rgba(0,0,0,0.09)', padding: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>

                {/* Avatar warna tema + inisial */}
                <div className="flex items-center justify-center rounded-full"
                  style={{ width: '48px', height: '48px', background: t.primary_color, marginBottom: '10px' }}>
                  {t.logo_url
                    ? <img src={t.logo_url} alt="" className="w-full h-full object-cover rounded-full" />
                    : <span style={{ color: '#fff', fontWeight: 500, fontSize: '19px' }}>{inisial}</span>}
                </div>

                {/* Nama travel */}
                <p className="font-medium leading-tight" style={{ fontSize: '14px', color: '#111827', margin: '0 0 4px' }}>
                  {t.nama_travel}
                </p>

                {/* Kode aktivasi */}
                <span className="font-mono" style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  {t.activation_code}
                </span>

                {/* Warna tema: dot + hex */}
                <div className="inline-flex items-center gap-1.5" style={{ marginBottom: '14px' }}>
                  <span className="flex-none rounded" style={{ width: '9px', height: '9px', background: t.primary_color }} />
                  <span className="font-mono" style={{ fontSize: '10px', color: '#9ca3af' }}>{t.primary_color}</span>
                </div>

                {/* Aksi: Edit (lebar) + Hapus (icon) */}
                <div className="flex items-center gap-1.5 w-full" style={{ marginTop: 'auto' }}>
                  <Link to={`/admin/tenants/${t.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg transition-all duration-150"
                    style={{ height: '32px', fontSize: '12px', fontWeight: 600, color: '#4338ca', border: '0.5px solid rgba(67,56,202,0.25)', background: 'transparent' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(67,56,202,0.06)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    Edit
                  </Link>
                  <button type="button" onClick={() => { setHapusTarget(t); setKonfirmText(''); }}
                    aria-label="Hapus"
                    className="flex-none inline-flex items-center justify-center rounded-lg transition-all duration-150"
                    style={{ width: '32px', height: '32px', color: '#9ca3af', border: '0.5px solid rgba(0,0,0,0.1)', background: 'transparent' }}
                    onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = '#dc2626'; b.style.borderColor = 'rgba(220,38,38,0.3)'; b.style.background = 'rgba(220,38,38,0.05)'; }}
                    onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = '#9ca3af'; b.style.borderColor = 'rgba(0,0,0,0.1)'; b.style.background = 'transparent'; }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      {hapusTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => !deleting && setHapusTarget(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6"
            style={{ background: '#ffffff' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="flex-none flex items-center justify-center rounded-full"
                style={{ width: '40px', height: '40px', background: 'rgba(220,38,38,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
              </div>
              <div>
                <h3 className="text-[16px] font-bold" style={{ color: '#111827' }}>Hapus Tenant</h3>
                <p className="text-[12px]" style={{ color: '#6b7280' }}>Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed" style={{ color: '#374151' }}>
              Menghapus <b>{hapusTarget.nama_travel}</b> akan menghapus seluruh data terkait (agenda, pengumuman, akun jamaah). Ketik nama travel di bawah untuk konfirmasi:
            </p>

            <input
              type="text"
              value={konfirmText}
              onChange={e => setKonfirmText(e.target.value)}
              placeholder={hapusTarget.nama_travel}
              className="mt-3 w-full rounded-xl px-3 py-2.5 text-[14px] outline-none"
              style={{ border: '1px solid rgba(0,0,0,0.15)' }}
              autoFocus
            />

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => { setHapusTarget(null); setKonfirmText(''); }}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold"
                style={{ color: '#374151', border: '1px solid rgba(0,0,0,0.15)' }}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting || konfirmText.trim() !== hapusTarget.nama_travel.trim()}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150"
                style={{
                  background: (deleting || konfirmText.trim() !== hapusTarget.nama_travel.trim()) ? 'rgba(220,38,38,0.4)' : '#dc2626',
                  color: '#ffffff',
                  cursor: (deleting || konfirmText.trim() !== hapusTarget.nama_travel.trim()) ? 'not-allowed' : 'pointer',
                }}
              >
                {deleting ? 'Menghapus…' : 'Hapus Permanen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
