-- =============================================================
-- Umrahme — Tabel jurnal_entries (sinkronisasi teks jurnal)
-- Jalankan di Supabase SQL Editor
-- =============================================================

CREATE TABLE IF NOT EXISTS jurnal_entries (
  id            TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id     TEXT        NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nomor_jamaah  TEXT        NOT NULL,
  tanggal       TEXT        NOT NULL,   -- format YYYY-MM-DD
  judul         TEXT,
  isi           TEXT        NOT NULL,
  lokasi        TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jurnal_tenant_jamaah
  ON jurnal_entries(tenant_id, nomor_jamaah);

CREATE INDEX IF NOT EXISTS idx_jurnal_tanggal
  ON jurnal_entries(tenant_id, nomor_jamaah, tanggal DESC);

-- RLS
ALTER TABLE jurnal_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "jurnal_select_own" ON jurnal_entries;
CREATE POLICY "jurnal_select_own"
  ON jurnal_entries FOR SELECT USING (true);

DROP POLICY IF EXISTS "jurnal_all_anon" ON jurnal_entries;
CREATE POLICY "jurnal_all_anon"
  ON jurnal_entries FOR ALL USING (true) WITH CHECK (true);

-- =============================================================
-- SELESAI — refresh schema cache Supabase jika perlu:
-- Dashboard → API → "Reload schema"
-- =============================================================
