import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validasiKode } from '../data/jamaah';
import heroBg from '@assets/photo-1635829576353-1a14caec2f6f_1781969073425.avif';

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
    <div className="min-h-screen flex items-center justify-center bg-[#f0efed] p-0 sm:p-6 font-sans">
      {/* Card — image is absolute background, content flows on top */}
      <div className="relative w-full sm:max-w-[400px] h-screen sm:h-auto flex flex-col sm:rounded-[32px] sm:shadow-[0_16px_64px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Background image fills entire card */}
        <img
          src={heroBg}
          alt="UmrahMe Cover"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: 'center 45%', transform: 'scale(1.04)', transformOrigin: 'center 45%' }}
        />

        {/* Gradient Overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
        />

        {/* Arabic calligraphy Header */}
        <div className="relative flex flex-col items-center justify-center gap-2 px-8 pt-12 pb-4" style={{ zIndex: 1 }}>
          <p
            className="font-arab text-center text-white"
            style={{ fontSize: 'clamp(20px, 6vw, 28px)', direction: 'rtl', textShadow: '0 2px 12px rgba(0,0,0,0.6)', lineHeight: 1.7 }}
          >
            لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ
          </p>
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-white/40" />
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] font-extrabold text-white/80">
              UmrahMe × El Massa
            </p>
            <span className="h-px w-6 bg-white/40" />
          </div>
        </div>

        {/* Image window spacer */}
        <div className="flex-shrink-0" style={{ height: 'clamp(120px, 28vw, 170px)' }} />

        {/* White Form Sheet */}
        <div
          className="relative flex flex-col flex-1 px-6 pb-8 bg-white"
          style={{ paddingTop: '24px', marginTop: '-16px', borderRadius: '24px 24px 0 0', zIndex: 1 }}
        >
          <div className="text-center mb-5 space-y-1">
            <h2 className="font-display font-black text-2xl text-stone-900 tracking-tight">
              Selamat Datang Jamaah!
            </h2>
            <p className="text-xs text-stone-500 font-normal">
              Cukup masukkan Nama Lengkap Anda untuk langsung masuk.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 flex-1">

            {/* Input Nama Jamaah (Single Input Login) */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 space-y-1.5 focus-within:border-pink-300 focus-within:bg-white transition-all">
              <label htmlFor="nama" className="font-sans text-[10px] uppercase tracking-wider font-extrabold text-pink-600 block">
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
                className="w-full bg-transparent text-sm font-bold text-stone-900 placeholder:text-stone-300 focus:outline-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-2xl px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-xs"
              >
                <span className="flex-none mt-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-[10px]">!</span>
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !nama.trim()}
              className="w-full h-12 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
              style={{
                background: loading || !nama.trim() ? '#d6d3d1' : 'linear-gradient(135deg, #e11d48 0%, #be185d 100%)',
              }}
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
        </div>
      </div>
    </div>
  );
}
