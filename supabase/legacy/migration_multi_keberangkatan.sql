-- =============================================================
-- Umrahme — MIGRASI: Multi-Keberangkatan (Multi-Batch)
-- Jalankan SELURUH script ini di Supabase SQL Editor
-- =============================================================

-- ── 1. Kolom baru di tabel tenants ──────────────────────────
ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS slug                  TEXT,
  ADD COLUMN IF NOT EXISTS hero_image_url        TEXT,
  ADD COLUMN IF NOT EXISTS sertifikat_template_url TEXT,
  ADD COLUMN IF NOT EXISTS fase_override         TEXT
    CHECK (fase_override IN ('persiapan', 'tanah-suci', 'selesai'));

-- ── 2. Tabel keberangkatan (batch per tenant) ────────────────
CREATE TABLE IF NOT EXISTS keberangkatan (
  id                    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id             TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nama_batch            TEXT NOT NULL,
  tanggal_keberangkatan TEXT,          -- format YYYY-MM-DD
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

CREATE INDEX IF NOT EXISTS idx_keberangkatan_tenant_id ON keberangkatan(tenant_id);
CREATE INDEX IF NOT EXISTS idx_keberangkatan_aktif ON keberangkatan(tenant_id, aktif);

-- ── 3. Kolom baru di jamaah_accounts ────────────────────────
ALTER TABLE jamaah_accounts
  ADD COLUMN IF NOT EXISTS keberangkatan_id TEXT REFERENCES keberangkatan(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS nomor_paspor     TEXT,
  ADD COLUMN IF NOT EXISTS fase_override    TEXT
    CHECK (fase_override IN ('persiapan', 'tanah-suci', 'selesai'));

CREATE INDEX IF NOT EXISTS idx_jamaah_keberangkatan_id ON jamaah_accounts(keberangkatan_id);

-- ── 4. Kolom baru di agenda_items ───────────────────────────
ALTER TABLE agenda_items
  ADD COLUMN IF NOT EXISTS keberangkatan_id TEXT REFERENCES keberangkatan(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_agenda_keberangkatan_id ON agenda_items(keberangkatan_id);

-- ── 5. Kolom baru di travel_announcements ───────────────────
ALTER TABLE travel_announcements
  ADD COLUMN IF NOT EXISTS keberangkatan_id TEXT REFERENCES keberangkatan(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_announcements_keberangkatan_id ON travel_announcements(keberangkatan_id);

-- ── 6. RLS untuk tabel keberangkatan ────────────────────────
ALTER TABLE keberangkatan ENABLE ROW LEVEL SECURITY;

-- Semua orang bisa baca (frontend tidak pakai service role)
DROP POLICY IF EXISTS "keberangkatan_select_all" ON keberangkatan;
CREATE POLICY "keberangkatan_select_all"
  ON keberangkatan FOR SELECT USING (true);

-- Hanya anon/service role yang bisa insert/update/delete
-- (operasi ini dilakukan dari Travel Dashboard yang pakai anon key dengan trust penuh)
DROP POLICY IF EXISTS "keberangkatan_all_anon" ON keberangkatan;
CREATE POLICY "keberangkatan_all_anon"
  ON keberangkatan FOR ALL USING (true) WITH CHECK (true);

-- =============================================================
-- SELESAI — refresh schema cache Supabase jika perlu:
-- Dashboard → API → tombol "Reload schema"
-- =============================================================
