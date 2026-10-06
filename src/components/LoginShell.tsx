import type { ReactNode } from 'react';
import loginBg from '@assets/el_massa_login.png';

/**
 * Bingkai halaman login jamaah (/login dan /t/:slug).
 *
 * Di HP semuanya harus muat satu layar tanpa scroll: poster mengisi sisa tinggi
 * dan dipotong dari atas (logo & judul poster tetap terlihat), form di bawahnya
 * memakai ukuran seringkas mungkin. Dari md ke atas jadi dua kolom seperti biasa.
 */
export default function LoginShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col bg-[#831843] p-3 font-sans sm:p-8 md:items-center md:justify-center">
      <div className="flex w-full max-w-4xl flex-1 flex-col gap-4 rounded-[28px] bg-white p-3 shadow-[0_32px_128px_rgba(0,0,0,0.5)] sm:gap-8 sm:rounded-[32px] sm:p-8 md:grid md:flex-none md:grid-cols-12 md:items-stretch">

        <div className="relative min-h-[150px] flex-1 overflow-hidden rounded-[20px] bg-stone-100 sm:rounded-[24px] md:col-span-5 md:min-h-[460px] md:flex-none">
          <img
            src={loginBg}
            alt="El Massa Login Hero"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>

        <div className="flex flex-col justify-center space-y-4 px-2 pb-2 sm:space-y-6 sm:px-6 sm:py-4 md:col-span-7">
          <div className="space-y-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-[#be185d] sm:flex">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.4 7.2L20 8L16 12L17.2 17.6L12 15L6.8 17.6L8 12L4 8L9.6 7.2L12 2Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Selamat Datang</h2>
              <p className="mt-1 text-xs font-normal text-stone-500">Cukup masukkan nama Anda untuk masuk.</p>
            </div>
          </div>

          <hr className="hidden border-stone-100 sm:block" />

          {children}
        </div>
      </div>
    </div>
  );
}
