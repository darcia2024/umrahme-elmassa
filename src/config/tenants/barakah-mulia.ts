import type { TenantConfig } from '../tenant.types';

// =============================================================
// TENANT: barakah-mulia
// -------------------------------------------------------------
// Konfigurasi branding untuk Barakah Mulia Wisata.
// Deploy dengan: VITE_TENANT_ID=barakah-mulia
// =============================================================

const tenant: TenantConfig = {
  id: 'barakah-mulia',
  namaTravel: 'Barakah Mulia Wisata',
  theme: {
    primary: '#0ea5e9',
    primaryDeep: '#0284c7',
  },
  logoPath: '/logos/barakah-mulia.svg',
  pageTitle: 'Barakah Mulia Wisata — Pendamping Umrah Anda',
};

export default tenant;
