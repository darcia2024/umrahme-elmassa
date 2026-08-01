# Menambah Tenant Baru & Setup Akun Travel Agency

---

## Setup Akun Travel Agency (dilakukan oleh super admin)

### Langkah 1: Buat akun di Supabase Auth
Masuk ke Supabase Dashboard → Authentication → Users → klik **Add user**.
Isi email dan password untuk akun travel agency tersebut.
Catat `user_id` (UUID) yang muncul setelah user dibuat.

### Langkah 2: Hubungkan akun ke tenant
Jalankan SQL berikut di Supabase SQL Editor:

```sql
insert into tenant_users (user_id, tenant_id)
values ('<uuid-user-travel-agency>', '<uuid-tenant-mereka>');
```

Ganti:
- `<uuid-user-travel-agency>` → UUID dari step 1
- `<uuid-tenant-mereka>` → UUID tenant yang ada di tabel `tenants`

### Langkah 3: Verifikasi
Travel agency bisa login di `/travel/login` dengan email + password yang dibuat tadi.
Dashboard `/travel` akan menampilkan nama travel mereka + kode aktivasi + daftar jamaah.

### Catatan keamanan
- Isolasi data dijamin DUA LAPIS: RLS di database + query frontend selalu filter by `tenant_id` dari context (bukan dari URL/input user).
- Akun travel agency TIDAK bisa akses `/admin` — route admin menggunakan `AdminAuthContext` terpisah.

---

## Menambah Tenant Baru (konfigurasi frontend)

1. Duplikat `barakah-mulia.ts` → beri nama sesuai ID tenant (mis. `nama-travel.ts`).
2. Isi semua field: `id`, `namaTravel`, `theme`, `logoPath`, `pageTitle`.
3. Daftarkan di `index.ts` — import file baru, tambahkan ke objek `registry`.
4. Upload logo SVG ke `public/logos/<id-tenant>.svg`.
5. Set environment variable `VITE_TENANT_ID=<id-tenant>` di platform deploy.
6. Build & deploy — satu build = satu tenant.
