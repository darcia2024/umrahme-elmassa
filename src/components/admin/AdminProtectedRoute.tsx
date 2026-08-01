import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { email, isAdmin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#fafaf9' }}>
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" style={{ color: '#4338ca' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: '#9ca3af' }}>Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  if (!email || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
