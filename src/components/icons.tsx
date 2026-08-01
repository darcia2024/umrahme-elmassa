// =============================================================
// Ikon custom Umrahme — stroke 1.5, grid 24×24, konsisten.
// Semua ikon outline/stroke; detail islami hanya pada ikon tematik.
// =============================================================
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
});

// ── Navigasi Utama ──────────────────────────────────────────

// Beranda: siluet rumah minimalis — atap segitiga + dinding + pintu
export function IconBeranda(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M3 11.5 L12 3 L21 11.5" />
      <path d="M5.5 11 V21 H18.5 V11" />
      <path d="M10 21 V16 H14 V21" />
    </svg>
  );
}

// Panduan: buku tertutup — punggung spine + sampul lengkung + dua garis halaman
export function IconPanduan(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M6 3 V21" />
      <path d="M6 3 H17 A2 2 0 0 1 19 5 V19 A2 2 0 0 1 17 21 H6" />
      <path d="M9.5 9 H16" />
      <path d="M9.5 13 H14" />
    </svg>
  );
}

// Ibadah / Ka'bah: badan persegi + pita kiswah + pintu melengkung (untuk FAB)
export function IconIbadah(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4.5 7 H19.5 V21 H4.5 Z" />
      <path d="M4.5 12 H19.5" />
      <path d="M9.5 21 V18 A2.5 2.5 0 0 1 14.5 18 V21" />
    </svg>
  );
}

// Doa: mihrab arch — lengkung runcing khas relung sholat, ikon signature Umrahme
export function IconDoa(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M8 21 V13 C8 8 12 5.5 12 5.5 C12 5.5 16 8 16 13 V21" />
      <path d="M6 21 H18" />
      <path d="M9.5 16.5 Q12 14.5 14.5 16.5" />
    </svg>
  );
}

// Profil: siluet figur — kepala lingkaran + bahu melengkung halus
export function IconProfil(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 21 C4.5 16.5 8 14 12 14 C16 14 19.5 16.5 19.5 21" />
    </svg>
  );
}

// ── Ritual & Ibadah ─────────────────────────────────────────

// Tawaf: Ka'bah persegi kecil di tengah + dua lingkaran orbit konsentris
export function IconTawaf(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M10.5 10.5 H13.5 V13.5 H10.5 Z" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

// Sa'i: dua bukit (Shafa & Marwah) terhubung jalur S-curve bolak-balik
export function IconSai(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M2.5 16.5 Q4.5 11 7 16.5" />
      <path d="M17 16.5 Q19.5 11 21.5 16.5" />
      <path d="M7 16.5 C9 11.5 15 21.5 17 16.5" />
      <path d="M2 18 H22" />
    </svg>
  );
}

// Ritual Navigator: kompas — lingkaran + jarum N (solid) + jarum S (samar)
export function IconNavigator(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 4.5 L14 12 L12 10.5 L10 12 Z" />
      <path d="M12 19.5 L14 12 L12 13.5 L10 12 Z" strokeOpacity="0.35" />
    </svg>
  );
}

// Tahallul / Gunting: dua ring pegangan + dua bilah menyilang
export function IconScissors(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M9 5.5 L20.5 17" />
      <path d="M9 18.5 L20.5 7" />
    </svg>
  );
}

// Bulan Sabit: kresen geometris untuk jadwal sholat
export function IconMoon(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M21 12.79 A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79 Z" />
    </svg>
  );
}

// Ihram: dua helai kain (rida + izar) — siluet pakaian ihram minimalis
export function IconIhram(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M5 6 C7.5 5 10 4.5 12 4.5 C14 4.5 16.5 5 19 6 L18 12 H6 Z" />
      <path d="M6 12 H18 V20.5 H6 Z" />
      <path d="M9.5 6 V12" />
      <path d="M14.5 6 V12" />
    </svg>
  );
}

// ── Utilitas ──────────────────────────────────────────────────

// Kembali: chevron kiri
export function IconBack(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M15 5 L8 12 L15 19" />
    </svg>
  );
}

// Cari: lingkaran kaca pembesar + pegangan
export function IconSearch(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20 L16 16" />
    </svg>
  );
}

// Peta: pin lokasi dengan mini kubah islami di dalamnya
export function IconPeta(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 21.5 C8 18 5 14.5 5 9.5 A7 7 0 0 1 19 9.5 C19 14.5 16 18 12 21.5 Z" />
      <path d="M9.5 10.5 A2.5 2 0 0 0 14.5 10.5" />
      <path d="M9.5 10.5 H14.5" />
    </svg>
  );
}

// Centang
export function IconCheck(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4.5 12 L9.5 17 L19.5 6" />
    </svg>
  );
}

// Sertifikat / Medali: lingkaran + pita bercabang ke bawah
export function IconSertifikat(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="8.5" r="5" />
      <path d="M8 13 L6.5 21 L12 18.5 L17.5 21 L16 13" />
    </svg>
  );
}

// Chevron kanan
export function IconChevron(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M9 6 L15 12 L9 18" />
    </svg>
  );
}

// Reset: busur ¾ lingkaran + kepala panah rotasi
export function IconReset(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 8 A8 8 0 1 1 3 13" />
      <path d="M3 4.5 V8 H6.5" />
    </svg>
  );
}

// Bagikan: tiga node + dua garis penghubung
export function IconShare(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="M8.5 10.8 L15.5 7.2" />
      <path d="M8.5 13.2 L15.5 16.8" />
    </svg>
  );
}

// Unduh: panah ke bawah + garis landas
export function IconDownload(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 3 V15" />
      <path d="M7.5 11 L12 15.5 L16.5 11" />
      <path d="M4 20 H20" />
    </svg>
  );
}

// Jurnal: notebook — sampul + spine + tiga garis ruled
export function IconJurnal(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M5.5 3 H17 A2 2 0 0 1 19 5 V19 A2 2 0 0 1 17 21 H5.5 V3" />
      <path d="M5.5 3 V21" />
      <path d="M8.5 9 H16" />
      <path d="M8.5 12.5 H16" />
      <path d="M8.5 16 H13" />
    </svg>
  );
}

// Manasik Interaktif: buku + segitiga play — belajar interaktif
export function IconManasikInteraktif(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M5.5 3 H17 A2 2 0 0 1 19 5 V19 A2 2 0 0 1 17 21 H5.5 V3" />
      <path d="M5.5 3 V21" />
      <path d="M9.5 9.5 L16 12 L9.5 14.5 Z" />
    </svg>
  );
}
