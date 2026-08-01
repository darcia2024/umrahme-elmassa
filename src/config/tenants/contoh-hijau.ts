import type { TenantConfig } from '../tenant.types';

// =============================================================
// TENANT: contoh-hijau
// -------------------------------------------------------------
// Tenant contoh dengan warna kontras (hijau emerald) untuk
// membuktikan sistem theming bekerja — bukan untuk produksi.
// Deploy dengan: VITE_TENANT_ID=contoh-hijau
// =============================================================

const tenant: TenantConfig = {
  id: 'contoh-hijau',
  namaTravel: 'Zamzam Barokah Travel',
  theme: {
    primary: '#059669',
    primaryDeep: '#047857',
  },
  logoPath: '/logos/contoh-hijau.svg',
  pageTitle: 'Zamzam Barokah Travel — Pendamping Umrah Anda',
};

export default tenant;
