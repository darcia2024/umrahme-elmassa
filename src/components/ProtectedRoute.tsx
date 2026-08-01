import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

// Membungkus halaman dalam app. Jika belum login → lempar ke /login,
// menyimpan lokasi tujuan agar bisa kembali setelah login.
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
