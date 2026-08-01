import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { urutanFase } from '../data/jamaah';
import { IconBeranda, IconPanduan, IconIbadah, IconDoa, IconProfil } from './icons';

const navItems = [
  { to: '/beranda', label: 'Beranda', Icon: IconBeranda, isIbadah: false },
  { to: '/panduan', label: 'Panduan', Icon: IconPanduan, isIbadah: false },
  { to: '/ibadah', label: 'Ibadah', Icon: IconIbadah, isIbadah: true },
  { to: '/doa', label: 'Doa', Icon: IconDoa, isIbadah: false },
  { to: '/profil', label: 'Profil', Icon: IconProfil, isIbadah: false },
];

export default function DesktopSidebar() {
  const { jamaah, tenant, logout } = useAuth();
  if (!jamaah) return null;

  const idxFase = urutanFase.findIndex((f) => f.id === jamaah.fase);

  return (
    <aside className="hidden lg:flex w-[260px] flex-none flex-col h-screen sticky top-0 border-r border-stone-200/80 bg-white overflow-y-auto z-20 font-sans">

      {/* Brand Header & Official Logo */}
      <div className="px-6 pt-6 pb-5 border-b border-stone-200/60 space-y-3">
        <img
          src="/logo-elmassa.png"
          alt="El Massa Tour & Travel"
          className="h-10 w-auto object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = tenant?.logo_url || '/favicon.png';
          }}
        />
        <div>
          <p className="text-[11px] uppercase tracking-widest text-stone-400 font-normal font-display">
            PENDAMPING UMRAH
          </p>
          <h1 className="font-display text-xl font-black text-stone-900 leading-tight tracking-tight mt-0.5">
            {tenant?.nama_travel ?? "El Massa"}
          </h1>
        </div>

        {/* Jamaah Profile Card Box (El Massa Pink Theme) */}
        <div className="mt-3 rounded-2xl border border-pink-200/80 bg-pink-50/70 p-3.5 space-y-2 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-pink-600 text-white shadow-2xs">
              <span className="font-display text-sm font-extrabold">
                {jamaah.nama.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black leading-tight text-stone-900 font-display">{jamaah.nama}</p>
              <p className="text-xs font-normal text-pink-700 mt-0.5">{jamaah.nomorJamaah}</p>
            </div>
          </div>
          <p className="text-xs text-stone-500 border-t border-pink-200/60 pt-2 font-normal">
            via <span className="text-pink-900 font-bold">El Massa</span>
          </p>
        </div>
      </div>

      {/* Navigation List (Refined Plus Jakarta Sans) */}
      <nav className="flex-1 px-4 py-4" aria-label="Navigasi utama">
        <ul className="space-y-1">
          {navItems.map(({ to, label, Icon, isIbadah }) => (
            <li key={to}>
              {isIbadah && <div className="my-2 border-t border-stone-200/60" aria-hidden />}

              <NavLink
                to={to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                    isActive
                      ? 'bg-pink-600 text-white font-extrabold shadow-xs font-display'
                      : 'text-stone-600 hover:bg-pink-50 hover:text-pink-600 font-normal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 flex-none transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-stone-400 group-hover:text-pink-600'
                      }`}
                    />
                    <span className="flex-1 text-sm tracking-tight">{label}</span>
                    {isIbadah && (
                      <span
                        className={`text-[10px] font-normal uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        AKTIF
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Fase Perjalanan + Logout Button (Plus Jakarta Sans System Font) */}
      <div className="px-6 py-5 border-t border-stone-200/60 space-y-4">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-widest text-stone-400 font-normal font-display">
            FASE PERJALANAN
          </p>
          <div className="space-y-3">
            {urutanFase.map((f, i) => {
              const done = i < idxFase;
              const active = i === idxFase;
              return (
                <div key={f.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 flex-none rounded-full transition-colors ${
                        active ? 'bg-[#0ea5e9]' : done ? 'bg-[#0ea5e9]/40' : 'bg-stone-300'
                      }`}
                    />
                    <span
                      className={`text-xs tracking-tight transition-colors ${
                        active ? 'font-extrabold text-stone-900 font-display' : done ? 'text-stone-600 font-normal' : 'text-stone-400 font-normal'
                      }`}
                    >
                      {f.label}
                    </span>
                  </div>
                  {active && (
                    <span className="h-2 w-2 flex-none rounded-full bg-[#0ea5e9] animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Outline Capsule Button (System Font Plus Jakarta Sans) */}
        <button
          type="button"
          onClick={logout}
          className="w-full py-2.5 rounded-full border border-stone-300 bg-white text-stone-700 font-sans text-xs uppercase font-normal tracking-wider hover:bg-stone-100 hover:text-stone-900 transition shadow-2xs"
        >
          KELUAR
        </button>
      </div>

    </aside>
  );
}
