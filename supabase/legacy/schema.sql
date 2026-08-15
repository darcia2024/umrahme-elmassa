-- =============================================================
-- Umrahme — Dokumentasi Skema Database (Supabase)
-- File ini HANYA dokumentasi — jalankan migration_multi_keberangkatan.sql
-- untuk menerapkan perubahan ke Supabase.
-- =============================================================

-- Tabel tenant (satu tenant = satu travel umrah)
CREATE TABLE tenants (
  id                      TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  activation_code         TEXT NOT NULL UNIQUE,
  slug                    TEXT,                            -- URL-friendly alias (mis. "tunastours")
  nama_travel             TEXT NOT NULL,
  primary_color           TEXT NOT NULL DEFAULT '#0ea5e9',
  primary_deep_color      TEXT NOT NULL DEFAULT '#0284c7',
  logo_url                TEXT,
  page_title              TEXT NOT NULL DEFAULT 'Pendamping Umrah',
  tanggal_keberangkatan   TEXT,                            -- warisan; gunakan keberangkatan.tanggal_*
  tanggal_kepulangan      TEXT,
  hotel_makkah            TEXT,
  hotel_madinah           TEXT,
  meeting_point           TEXT,
  guide_name              TEXT,
  guide_whatsapp          TEXT,
  tour_leader_name        TEXT,
  tour_leader_whatsapp    TEXT,
  emergency_note          TEXT,
  fase_override           TEXT CHECK (fase_override IN ('persiapan', 'tanah-suci', 'selesai')),
  hero_image_url          TEXT,
  sertifikat_template_url TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Batch keberangkatan per tenant (multi-batch)
CREATE TABLE keberangkatan (
  id                    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id             TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nama_batch            TEXT NOT NULL,
  tanggal_keberangkatan TEXT,
  tanggal_kepulangan    TEXT,
  hotel_makkah          TEXT,
  hotel_madinah         TEXT,
  meeting_point         TEXT,
  guide_name            TEXT,
  guide_whatsapp        TEXT,
  tour_leader_name      TEXT,
  tour_leader_whatsapp  TEXT,
  emergency_note        TEXT,
  fase_override         TEXT CHECK (fase_override IN ('persiapan', 'tanah-suci', 'selesai')),
  aktif                 BOOLEAN NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Akun jamaah (satu jamaah per batch keberangkatan)
CREATE TABLE jamaah_accounts (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id         TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  keberangkatan_id  TEXT REFERENCES keberangkatan(id) ON DELETE SET NULL,
  nama              TEXT NOT NULL,
  nomor_jamaah      TEXT NOT NULL,
  rombongan         TEXT,
  nomor_bus         TEXT,
  nomor_kamar       TEXT,
  nomor_paspor      TEXT,
  fase              TEXT NOT NULL DEFAULT 'persiapan'
                      CHECK (fase IN ('persiapan', 'tanah-suci', 'selesai')),
  fase_override     TEXT CHECK (fase_override IN ('persiapan', 'tanah-suci', 'selesai')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agenda perjalanan per batch
CREATE TABLE agenda_items (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id         TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  keberangkatan_id  TEXT REFERENCES keberangkatan(id) ON DELETE SET NULL,
  tanggal           TEXT NOT NULL,
  jam_mulai         TEXT,
  judul             TEXT NOT NULL,
  deskripsi         TEXT,
  lokasi            TEXT,
  urutan            INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pengumuman dari travel ke jamaah per batch
CREATE TABLE travel_announcements (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id         TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  keberangkatan_id  TEXT REFERENCES keberangkatan(id) ON DELETE SET NULL,
  label             TEXT NOT NULL DEFAULT 'Info',
  title             TEXT NOT NULL,
  content           TEXT NOT NULL,
  important         BOOLEAN NOT NULL DEFAULT false,
  published_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Relasi user ↔ tenant
CREATE TABLE tenant_users (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id    TEXT NOT NULL,
  tenant_id  TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Akun admin super
CREATE TABLE admin_users (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Akun travel
CREATE TABLE travel_users (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  tenant_id     TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
