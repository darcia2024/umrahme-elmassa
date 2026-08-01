import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTravelAuth } from '../../context/TravelAuthContext';

function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function TravelLayout({ children }: { children: ReactNode }) {
  const { signOut, tenant } = useTravelAuth();
  const location = useLocation();
  const accentColor = tenant?.primary_color ?? '#4338ca';

  return (
    <div className="min-h-screen" style={{ background: '#fafaf9' }}>
      <header
        className="bg-white border-b px-5 py-0 flex items-center justify-between"
        style={{
          borderColor: 'rgba(0,0,0,0.07)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
          height: '52px',
        }}
      >
        <div className="flex items-center gap-6">
          <Link
            to="/travel"
            className="flex items-center gap-2 transition-all duration-150 hover:opacity-75"
            style={{ color: accentColor }}
          >
            <IconUsers />
            <span className="font-bold text-[13px] tracking-tight" style={{ color: '#1a1a2e' }}>
              {tenant?.nama_travel ?? 'Portal Travel'}
            </span>
          </Link>

          <div className="h-4 w-px" style={{ background: 'rgba(0,0,0,0.09)' }} />

          <nav className="flex items-center gap-1">
            <Link
              to="/travel"
              className="relative px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150"
              style={
                location.pathname === '/travel'
                  ? { color: accentColor, background: `${accentColor}12` }
                  : { color: '#6b7280' }
              }
            >
              Jamaah Saya
              {location.pathname === '/travel' && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: accentColor }}
                />
              )}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {tenant?.nama_travel && (
            <span
              className="font-mono text-[11px] hidden sm:block px-2 py-1 rounded-md"
              style={{ color: '#9ca3af', background: 'rgba(0,0,0,0.03)', letterSpacing: '0.01em' }}
            >
              {tenant.nama_travel}
            </span>
          )}
          <button
            onClick={signOut}
            className="text-[12px] font-medium px-3 py-1.5 rounded-md border transition-all duration-150"
            style={{
              borderColor: 'rgba(0,0,0,0.10)',
              color: '#6b7280',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#f3f4f6';
              (e.currentTarget as HTMLButtonElement).style.color = '#374151';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#6b7280';
            }}
          >
            Keluar
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-10">
        {children}
      </main>
    </div>
  );
}
