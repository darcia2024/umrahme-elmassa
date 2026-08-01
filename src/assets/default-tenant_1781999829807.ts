import type { TenantConfig } from '../tenant.types';

// =============================================================
// TENANT: default
// -------------------------------------------------------------
// Branding netral untuk preview, development lokal, dan demo
// internal — BUKAN nama produk yang ditampilkan ke jamaah di
// produksi. Setiap deployment untuk travel agency nyata WAJIB
// menunjuk ke file tenant lain (lihat barakah-mulia.ts sebagai
// contoh), bukan ke file ini.
// =============================================================

const tenant: TenantConfig = {
  id: 'default',
  namaTravel: 'Travel Demo',
  theme: {
    primary: '#0ea5e9',
    primaryDeep: '#0284c7',
  },
  logoPath: '/logos/default.svg',
  pageTitle: 'Pendamping Umrah — Demo',
};

export default tenant;
