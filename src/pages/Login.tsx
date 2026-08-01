import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validasiKode } from '../data/jamaah';
import loginBg from '@assets/el_massa_login.png';

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
      const hasil = await validasiKode(null, nama);
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
    <div className="min-h-screen flex items-center justify-center bg-[#221204] p-4 sm:p-8 font-sans">
      {/* Outer White Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-[32px] p-4 sm:p-8 shadow-[0_32px_128px_rgba(0,0,0,0.5)] grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left Side: Custom El Massa Login Image (Clean Display, No Overlay) */}
        <div className="md:col-span-5 relative rounded-[24px] overflow-hidden min-h-[340px] md:min-h-[460px] bg-stone-100 flex items-center justify-center">
          <img
            src={loginBg}
            alt="El Massa Login Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Clean Form Container (Matching Reference Image) */}
        <div className="md:col-span-7 flex flex-col justify-center px-2 sm:px-6 py-4 space-y-6">
          
          {/* Logo / Header (Reference Starburst Icon) */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#ea580c]">
              {/* Sunburst/Kaaba SVG icon from reference */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.4 7.2L20 8L16 12L17.2 17.6L12 15L6.8 17.6L8 12L4 8L9.6 7.2L12 2Z" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Selamat Datang Jamaah
              </h2>
              <p className="text-xs text-stone-500 font-normal mt-1">
                Selamat Datang di UmrahMe — Cukup masukkan nama Anda untuk masuk.
              </p>
            </div>
          </div>

          <hr className="border-stone-100" />

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
                placeholder="cth. H. Rusli Suparman / Daru"
                autoComplete="name"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-900 bg-white placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
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

            {/* Submit Button (Matching Reference Solid Orange Button) */}
            <button
              type="submit"
              disabled={loading || !nama.trim()}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#ea580c] hover:bg-[#d97706] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 mt-2"
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
          <div className="pt-2 text-center text-xs text-stone-500">
            Belum terdaftar? <span className="font-semibold text-stone-900 underline">Hubungi Admin Travel El Massa</span>
          </div>

        </div>

      </div>
    </div>
  );
}

