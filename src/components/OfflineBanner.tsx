import { useEffect, useState } from 'react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-ink/90 px-4 py-1.5 text-center font-mono text-[11px] text-white backdrop-blur">
      Mode Offline — konten panduan &amp; doa tetap bisa diakses
    </div>
  );
}
