import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelAuth } from '../../context/TravelAuthContext';

export default function TravelLogin() {
  const navigate = useNavigate();
  const { login } = useTravelAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/travel', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Email atau password salah.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#fafaf9' }}>
      <div className="w-full max-w-sm overflow-hidden rounded-2xl" style={{ background: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%)' }} />
        <div className="px-8 pt-8 pb-9">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4" style={{ background: 'rgba(14,165,233,0.09)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <h1 className="font-bold leading-tight" style={{ fontSize: '22px', color: '#111827', letterSpacing: '-0.02em' }}>Portal Travel Agency</h1>
            <p className="text-[13px] mt-1" style={{ color: '#9ca3af' }}>Masuk untuk mengelola jamaah Anda.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: '#6b7280' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="travel@example.com"
                className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 focus:outline-none"
                style={{ border: '1px solid rgba(0,0,0,0.09)', background: '#fafaf9', color: '#111827', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)' }}
                onFocus={e => { e.currentTarget.style.border = '1px solid #0ea5e9'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)'; e.currentTarget.style.background = '#ffffff'; }}
                onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; }} />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: '#6b7280' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 focus:outline-none"
                style={{ border: '1px solid rgba(0,0,0,0.09)', background: '#fafaf9', color: '#111827', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)' }}
                onFocus={e => { e.currentTarget.style.border = '1px solid #0ea5e9'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)'; e.currentTarget.style.background = '#ffffff'; }}
                onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; }} />
            </div>
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', color: '#dc2626' }}>
                <svg className="flex-none mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full font-semibold text-sm rounded-xl py-3 transition-all duration-150 active:scale-[0.99] disabled:opacity-60"
              style={{ background: loading ? '#38bdf8' : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', color: '#ffffff', boxShadow: loading ? 'none' : '0 2px 8px rgba(14,165,233,0.30)', marginTop: '4px' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                  Masuk...
                </span>
              ) : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
