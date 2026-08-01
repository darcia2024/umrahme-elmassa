import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { signOut, email } = useAdminAuth();
  const location = useLocation();

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
            to="/admin"
            className="flex items-center gap-2 transition-all duration-150 hover:opacity-75"
            style={{ color: '#4338ca' }}
          >
            <GearIcon />
            <span className="font-bold text-[13px] tracking-tight" style={{ color: '#1a1a2e' }}>
              Admin Panel
            </span>
          </Link>

          <div className="h-4 w-px" style={{ background: 'rgba(0,0,0,0.09)' }} />

          <nav className="flex items-center gap-1">
            <Link
              to="/admin"
              className="relative px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150"
              style={
                location.pathname === '/admin'
                  ? { color: '#4338ca', background: 'rgba(67,56,202,0.07)' }
                  : { color: '#6b7280' }
              }
            >
              Daftar Tenant
              {location.pathname === '/admin' && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: '#4338ca' }}
                />
              )}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {email && (
            <span
              className="font-mono text-[11px] hidden sm:block px-2 py-1 rounded-md"
              style={{ color: '#9ca3af', background: 'rgba(0,0,0,0.03)', letterSpacing: '0.01em' }}
            >
              {email}
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
