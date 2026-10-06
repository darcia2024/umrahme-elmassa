# Integrasi dengan El Massa Web (sistem staf)

UmrahMe dan El Massa Web memakai **satu project Supabase**. El Massa Web (repo
`elmassa-administration`) memiliki skema dan datanya; UmrahMe hanya membaca lewat anon key dan fungsi
RPC. Dokumen sisi sana: `docs/INTEGRASI-UMRAHME.md` di repo El Massa Web. Kalau dua dokumen berbeda,
yang di El Massa Web yang benar.

## Yang dibaca UmrahMe

| Data | Cara baca | Catatan |
|---|---|---|
| Tenant (nama, warna, logo, hero) | `tenants` (anon select) | Tema aplikasi mengikuti `primary_color` / `primary_deep_color` baris tenant |
| Batch keberangkatan | `keberangkatan` (anon select) | Diselaraskan El Massa Web dengan paketnya: nama, tanggal, hotel |
| Login jamaah | RPC `jamaah_login(p_kode, p_nama)` | Kode aktivasi diambil dari tenant (`/t/<slug>`; `/login` memakai `VITE_DEFAULT_TENANT_SLUG`) |
| Token pendataan | RPC `jamaah_pendataan_token(p_kode, p_nama)` | `null` kalau akun belum tertaut ke profil; token hanya di memori, tidak pernah ditampilkan |
| Status kelengkapan | `GET {VITE_ELMASSA_WEB_URL}/api/pendataan/<token>` | Dipakai apa adanya; aturannya ada di El Massa Web, jangan dihitung ulang di sini |

UmrahMe tidak boleh membaca atau menulis `jamaah_profiles` / `jamaah_documents`, dan tidak memakai service role.

## Pengenal bersama
- Tenant: `el-massa`, slug `elmassa`, halaman login jamaah `/t/elmassa`.
- Origin UmrahMe harus ada di `UMRAHME_ORIGINS` El Massa Web (sekarang `https://umrahme-elmassa.vercel.app`), kalau tidak status kelengkapan gagal karena CORS.
- Logo tenant: `logo_url` menunjuk berkas di `public/logos/`; versi putih memakai nama `<logo>-putih.<ext>` (konvensi, opsional).

## Skema database
Dimiliki El Massa Web (`scratch/*.mjs` di repo itu). `supabase-migration.sql` dan `supabase/legacy/` di repo ini
hanya arsip dari monorepo lama; jangan dijalankan ke project yang sekarang.

## Belum ada di database (kode UmrahMe sudah memanggilnya)
RPC `jurnal_list` / `jurnal_create` / `jurnal_delete` dan `jamaah_data_get` / `jamaah_data_set`, juga tabel
`jurnal_entries` dan `jamaah_data`, tidak ada di project sekarang. Halaman Jurnal dan sinkron data per jamaah
karena itu belum berfungsi. Itu perlu skrip skema di repo El Massa Web sebelum diaktifkan.
