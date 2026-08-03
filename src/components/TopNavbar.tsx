import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlobalSearch from './GlobalSearch';

export default function TopNavbar() {
  const { jamaah, tenant } = useAuth();
  const location = useLocation();

  if (!jamaah) return null;

  const navs = [
    { to: '/beranda', label: 'Overview', activePaths: ['/beranda'] },
    { to: '/profil/kartu', label: 'Transparansi Berkas', activePaths: ['/profil/kartu', '/profil'] },
    { to: '/panduan', label: 'Panduan Ibadah', activePaths: ['/panduan', '/ibadah'] },
    { to: '/doa', label: 'Buku Doa', activePaths: ['/doa'] },
  ];

  return (
    <header className="flex items-center justify-between gap-4 w-full font-sans">
      
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 flex-none">
        <img
          src={tenant?.logo_url || "/logo-elmassa.png"}
          alt={tenant?.nama_travel || "Travel Logo"}
          className="h-9 w-auto object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/favicon.png';
          }}
        />
        <span className="font-extrabold text-base tracking-tight text-stone-900 font-display">
          UmrahMe <span className="text-xs font-normal text-pink-600">× {tenant?.nama_travel || "Travel"}</span>
        </span>
      </div>

      {/* Center Pill Nav Bar (Selected Page in PINK) */}
      <div className="flex items-center gap-1.5 bg-stone-100/80 p-1.5 rounded-full border border-stone-200 shadow-2xs">
        {navs.map(({ to, label, activePaths }) => {
          const isActive = activePaths.some(p => location.pathname.startsWith(p));
          return (
            <Link
              key={to}
              to={to}
              className={`px-4 py-1.5 rounded-full text-xs font-normal transition whitespace-nowrap ${
                isActive
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-pink-600'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right Search & Profile Badge */}
      <div className="flex items-center gap-3 flex-none">
        <div className="w-60">
          <GlobalSearch />
        </div>
        <div className="flex items-center gap-2.5 bg-stone-100/90 p-1.5 pr-4 rounded-full border border-stone-200 shadow-2xs">
          <div className="h-8 w-8 rounded-full bg-pink-500 text-white font-normal text-xs flex items-center justify-center shadow-2xs">
            {jamaah.nama.charAt(0).toUpperCase()}
          </div>
          <div className="text-left min-w-0">
            <p className="text-xs font-black text-stone-900 leading-tight truncate max-w-[130px] font-display">{jamaah.nama}</p>
            <p className="text-[10px] text-pink-600 font-mono leading-tight">{jamaah.kodeAktivasi || jamaah.nomorJamaah}</p>
          </div>
        </div>
      </div>

    </header>
  );
}
