// =============================================================
// TIPE KONFIGURASI TENANT (white-label)
// -------------------------------------------------------------
// Satu travel agency = satu objek TenantConfig. Field di sini
// sengaja dibatasi pada identitas & visual (nama, warna, logo),
// bukan fitur/struktur data — sesuai keputusan: white-label
// Level 1 (1 build per tenant via env var, config statis di
// repo, bukan multi-tenant database). Lihat README di folder
// ini untuk alur kerja menambah tenant baru.
// =============================================================

export interface TenantTheme {
  /** Warna primary (hex), menggantikan default biru sky #0ea5e9. */
  primary: string;
  /** Warna primary-deep untuk hover/active state. */
  primaryDeep: string;
}

export interface TenantConfig {
  /** ID unik tenant, dipakai sebagai key file & build. */
  id: string;
  /** Nama travel agency — tampil di Login, Sertifikat, sidebar, footer, title tab. */
  namaTravel: string;
  /** Tema warna tenant. */
  theme: TenantTheme;
  /** Path logo tenant, relatif dari /public (mis. "/logos/barakah-mulia.svg"). */
  logoPath: string;
  /** Path favicon khusus tenant. Jika kosong, fallback ke /favicon.svg bawaan. */
  faviconPath?: string;
  /** Judul tab browser & meta title. */
  pageTitle: string;
}
