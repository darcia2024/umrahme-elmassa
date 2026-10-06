import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validasiSlug } from '../data/jamaah';
import { DEFAULT_TENANT_SLUG } from '../config/site';
import LoginShell from '../components/LoginShell';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/beranda';

  const [nama, setNama] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!nama.trim()) {
      setError('Nama jamaah wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      const hasil = await validasiSlug(DEFAULT_TENANT_SLUG, nama);
      if (hasil.ok && hasil.jamaah && hasil.tenant) {
        login(hasil.jamaah, hasil.tenant, hasil.keberangkatan ?? null);
        navigate(from, { replace: true });
      } else {
        setError(hasil.error ?? 'Nama jamaah tidak ditemukan.');
        setLoading(false);
      }
    } catch {
      setError('Tidak dapat terhubung. Periksa koneksi internet Anda.');
      setLoading(false);
    }
  }

  return (
    <LoginShell>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Nama Jamaah */}
        <div className="space-y-1.5">
          <label htmlFor="nama" className="text-xs font-semibold text-stone-600 block">
            Nama Lengkap Jamaah *
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="cth. Budi Santoso"
            autoComplete="name"
            autoFocus
            className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-900 bg-white placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all shadow-sm"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-xs"
          >
            <span className="flex-none mt-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-[10px]">!</span>
            <p className="leading-relaxed font-medium">{error}</p>
          </div>
        )}

        {/* Submit Button (Pink Theme) */}
        <button
          type="submit"
          disabled={loading || !nama.trim()}
          className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#be185d] hover:bg-[#9d174d] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 mt-2"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span>Memeriksa Akun…</span>
            </>
          ) : (
            <span>Masuk Ke Akun Saya →</span>
          )}
        </button>
      </form>

      {/* Footer note */}
      <div className="text-center text-xs text-stone-500 sm:pt-2">
        Belum terdaftar? <span className="font-semibold text-stone-900 underline">Hubungi Admin Travel El Massa</span>
      </div>
    </LoginShell>
  );
}
