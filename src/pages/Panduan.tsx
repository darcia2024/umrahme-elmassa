import React from 'react';
import { Link } from 'react-router-dom';
import { IconPanduan, IconPeta, IconManasikInteraktif } from '../components/icons';

export default function Panduan() {
  const items: {
    to: string;
    label: string;
    desc: string;
    Icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
    highlight?: boolean;
    badgeText?: string;
  }[] = [
    {
      to: '/panduan/manasik-interaktif',
      label: 'Manasik Interaktif',
      desc: 'Kenali, urutkan & uji pemahaman tata cara umrah secara interaktif.',
      Icon: IconManasikInteraktif,
      highlight: true,
      badgeText: 'Interaktif',
    },
    {
      to: '/panduan/tata-cara',
      label: 'Tata Cara Umrah',
      desc: 'Panduan lengkap: Miqat → Ihram → Tawaf → Sa’i → Tahallul.',
      Icon: IconPanduan,
      badgeText: 'Rukun Utama',
    },
    {
      to: '/panduan/ihram',
      label: 'Panduan Ihram',
      desc: 'Niat, larangan, serta petunjuk praktis cara memakai kain ihram.',
      Icon: IconPanduan,
    },
    {
      to: '/panduan/miqat',
      label: 'Panduan Miqat',
      desc: '5 titik miqat utama & aturan niat ihram sesuai ketentuan syariat.',
      Icon: IconPeta,
    },
    {
      to: '/panduan/faq-fikih',
      label: 'Tanya Jawab Fikih',
      desc: 'Solusi haid, batal wudhu, lupa putaran, pengguna kursi roda & kendala jamaah.',
      Icon: IconPanduan,
    },
    {
      to: '/panduan/glosarium',
      label: 'Glosarium Istilah',
      desc: 'Kamus istilah populer ibadah umrah: ihram, tahallul, raml, idthiba, dll.',
      Icon: IconPanduan,
    },
    {
      to: '/peta',
      label: 'Peta Lokasi Ziarah',
      desc: 'Navigasi 19 lokasi masjid utama & tempat bersejarah di Makkah & Madinah.',
      Icon: IconPeta,
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8 lg:p-10 font-sans">
      <div className="max-w-[1440px] mx-auto space-y-8">

        {/* Page Header */}
        <header className="border-b border-stone-200/60 pb-6 space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-pink-50 border border-pink-200 px-3 py-0.5 text-xs font-normal text-pink-700">
              Modul Panduan & Manasik
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
            Panduan Ibadah Umrah
          </h1>
          <p className="text-sm text-stone-500 font-normal">
            Pelajari setiap rukun, tata cara, niat, dan petunjuk praktis ibadah umrah dengan tenang sebelum berangkat.
          </p>
        </header>

        {/* Aesthetic Refined Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ to, label, desc, Icon, highlight, badgeText }) => (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs hover:border-pink-300 hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="space-y-4">
                {/* Icon & Badge Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-50 border border-stone-200/80 text-pink-600 group-hover:bg-pink-50 group-hover:border-pink-200 transition">
                    <Icon className="h-6 w-6" />
                  </div>
                  {badgeText && (
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-normal border ${
                        highlight
                          ? 'bg-pink-50 border-pink-200 text-pink-700'
                          : 'bg-stone-100 border-stone-200 text-stone-600'
                      }`}
                    >
                      {badgeText}
                    </span>
                  )}
                </div>

                {/* Card Title & Desc */}
                <div className="space-y-1.5">
                  <h2 className="font-display text-base font-extrabold text-stone-900 group-hover:text-pink-600 transition tracking-tight">
                    {label}
                  </h2>
                  <p className="text-xs text-stone-500 font-normal leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-normal text-pink-600 group-hover:translate-x-0.5 transition">
                <span>Pelajari Selengkapnya</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
