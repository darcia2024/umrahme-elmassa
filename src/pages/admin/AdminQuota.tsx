import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchQuotas, fetchQuotaLedger, fetchTenants, topupQuota,
  type QuotaLedgerRow, type QuotaRow, type TenantRow,
} from '../../lib/supabase';
import { useAdminAuth } from '../../context/AdminAuthContext';

/**
 * Panel vendor untuk menambah kuota lisensi travel.
 *
 * Ini satu-satunya tempat kuota bisa bertambah. Sisi travel hanya membacanya
 * (RLS: SELECT saja) dan memotongnya otomatis saat menerbitkan akun jamaah.
 */

function rupiah(n: number) {
  return `Rp ${Math.round(n).toLocaleString('id-ID')}`;
}

function tanggal(iso: string) {
  return new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminQuota() {
  const { email } = useAdminAuth();
  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [quotas, setQuotas] = useState<QuotaRow[]>([]);
  const [ledger, setLedger] = useState<QuotaLedgerRow[]>([]);
  const [dipilih, setDipilih] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [catatan, setCatatan] = useState('');
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [pesan, setPesan] = useState<{ tipe: 'ok' | 'gagal'; teks: string } | null>(null);

  const muat = useCallback(async () => {
    try {
      const [t, q] = await Promise.all([fetchTenants(), fetchQuotas()]);
      setTenants(t);
      setQuotas(q);
      setDipilih((prev) => prev || t[0]?.id || '');
    } catch (e) {
      setPesan({ tipe: 'gagal', teks: (e as Error).message });
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => { void muat(); }, [muat]);

  useEffect(() => {
    if (!dipilih) return;
    fetchQuotaLedger(dipilih).then(setLedger).catch(() => setLedger([]));
  }, [dipilih, quotas]);

  const saldo = quotas.find((q) => q.tenant_id === dipilih);
  const harga = saldo?.price_per_unit ?? 35000;
  const qty = Number(jumlah) || 0;

  async function kirim() {
    if (qty <= 0) {
      setPesan({ tipe: 'gagal', teks: 'Jumlah kuota harus lebih dari 0.' });
      return;
    }

    setMenyimpan(true);
    setPesan(null);
    try {
      const saldoBaru = await topupQuota(dipilih, qty, catatan.trim(), email ?? 'admin');
      setJumlah('');
      setCatatan('');
      setPesan({ tipe: 'ok', teks: `Berhasil. Saldo ${dipilih} sekarang ${saldoBaru} kuota.` });
      await muat();
    } catch (e) {
      setPesan({ tipe: 'gagal', teks: (e as Error).message });
    } finally {
      setMenyimpan(false);
    }
  }

  if (memuat) {
    return <div className="p-8 text-sm text-slate-500">Memuat data kuota…</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-5 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-900">Kuota Lisensi Travel</h1>
          <p className="text-[13px] text-slate-500">
            Tambah kuota setelah travel membayar. Pemotongan terjadi otomatis saat mereka menerbitkan akun jamaah.
          </p>
        </div>
        <Link to="/admin" className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">
          ← Daftar Travel
        </Link>
      </header>

      {/* Saldo semua travel */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Travel</th>
              <th className="px-4 py-2.5 text-right">Sisa Kuota</th>
              <th className="px-4 py-2.5 text-right">Tarif / Pax</th>
              <th className="px-4 py-2.5 text-right">Nilai Sisa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tenants.map((t) => {
              const q = quotas.find((x) => x.tenant_id === t.id);
              const sisa = q?.balance ?? 0;
              return (
                <tr key={t.id} className={dipilih === t.id ? 'bg-sky-50/60' : ''}>
                  <td className="px-4 py-2.5 font-semibold text-slate-800">{t.nama_travel}</td>
                  <td className={`px-4 py-2.5 text-right font-black ${sisa <= 5 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {sisa}
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-600">{rupiah(q?.price_per_unit ?? 35000)}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600">{rupiah(sisa * (q?.price_per_unit ?? 35000))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Form top-up */}
      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-black text-slate-900">Tambah Kuota</h2>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Travel</span>
            <select
              value={dipilih}
              onChange={(e) => setDipilih(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 px-2 text-[13px]"
            >
              {tenants.map((t) => <option key={t.id} value={t.id}>{t.nama_travel}</option>)}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Jumlah Kuota</span>
            <input
              type="number"
              min={1}
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="40"
              className="h-9 w-full rounded-lg border border-slate-200 px-3 text-[13px]"
            />
          </label>

          <label className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Catatan</span>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Pembayaran 12 Agt"
              className="h-9 w-full rounded-lg border border-slate-200 px-3 text-[13px]"
            />
          </label>
        </div>

        {qty > 0 && (
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-[13px] text-slate-700">
            {qty} kuota × {rupiah(harga)} = <b>{rupiah(qty * harga)}</b>
            {saldo && <> · saldo jadi <b>{saldo.balance + qty}</b></>}
          </p>
        )}

        {pesan && (
          <p className={`rounded-lg px-3 py-2 text-[13px] font-semibold ${
            pesan.tipe === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
          }`}>
            {pesan.teks}
          </p>
        )}

        <button
          type="button"
          onClick={kirim}
          disabled={menyimpan || qty <= 0 || !dipilih}
          className="h-9 rounded-lg bg-slate-900 px-5 text-[13px] font-bold text-white disabled:opacity-40"
        >
          {menyimpan ? 'Menyimpan…' : 'Tambah Kuota'}
        </button>
      </section>

      {/* Riwayat */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <h2 className="border-b border-slate-100 px-4 py-3 text-sm font-black text-slate-900">
          Riwayat Kuota
        </h2>
        {ledger.length === 0 ? (
          <p className="px-4 py-6 text-center text-[13px] text-slate-500">Belum ada pergerakan kuota.</p>
        ) : (
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Waktu</th>
                <th className="px-4 py-2.5">Jenis</th>
                <th className="px-4 py-2.5 text-right">Jumlah</th>
                <th className="px-4 py-2.5">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledger.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-2.5 whitespace-nowrap text-slate-600">{tanggal(r.created_at)}</td>
                  <td className="px-4 py-2.5">
                    <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${
                      r.delta > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {r.kind}
                    </span>
                  </td>
                  <td className={`px-4 py-2.5 text-right font-black ${r.delta > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {r.delta > 0 ? `+${r.delta}` : r.delta}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">{r.note || r.reference || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
