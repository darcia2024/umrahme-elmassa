// =============================================================
// Tipe data inti Umrahme.
// Semua konten app memakai tipe ini. Saat backend siap, cukup
// ganti sumber data di src/data/* dengan hasil fetch API yang
// mengembalikan bentuk yang sama — komponen UI tidak perlu diubah.
// =============================================================

/** Fase perjalanan jamaah. Logic transisi masih dummy untuk MVP. */
export type Fase = 'persiapan' | 'tanah-suci' | 'selesai';

/** Data jamaah yang disimpan setelah login via kode aktivasi. */
export interface Jamaah {
  nama: string;
  nomorJamaah: string; // contoh: "UMR-2026-0142"
  travel: string; // nama travel (white-label)
  kodeAktivasi: string;
  fase: Fase;

  accessToken?: string;

  // Data operasional perjalanan — sementara optional untuk kompatibilitas data lama
  rombongan?: string;
  nomorBus?: string;
  nomorKamar?: string;
  nomorPaspor?: string;
  hotelMakkah?: string;
  hotelMadinah?: string;
  pembimbingNama?: string;
  pembimbingWhatsapp?: string;
}

/** Kategori doa pada Kumpulan Doa (9 tahapan ibadah umrah). */
export type KategoriDoa =
  | 'persiapan'
  | 'madinah'
  | 'ihram'
  | 'makkah'
  | 'tawaf'
  | 'sai'
  | 'tahallul'
  | 'wada'
  | 'harian';

export interface Doa {
  id: string;
  kategori: KategoriDoa;
  judul: string;
  /** Teks Arab lengkap dengan harakat. */
  arab: string;
  /** Transliterasi Latin. */
  latin: string;
  /** Terjemahan bahasa Indonesia. */
  terjemahan: string;
  /** Penjelasan singkat makna doa. */
  arti?: string;
  /** Sumber hadits/ayat yang melandasi. */
  dalil?: string;
  /** Kapan & bagaimana doa ini dibaca dalam praktiknya. */
  cara?: string;
  /** Kapan tepatnya dalam rangkaian ibadah. */
  waktu?: string;
  /**
   * true bila konten masih perlu diverifikasi ulama sebelum production.
   * Field konten yang belum pasti dikosongkan, BUKAN dikarang.
   */
  perluVerifikasi?: boolean;
}

export type TipeLokasi = 'masjid' | 'sejarah';

/** Bagian fisik dari Ka'bah beserta keterangan posisi dan deskripsinya. */
export interface BagianKabah {
  nama: string;
  arab?: string;
  posisi: string;
  deskripsi: string;
}

/** Satu item dalam grup bagian Ka'bah (tanpa field posisi). */
export interface BagianKabahItem {
  nama: string;
  arab?: string;
  deskripsi: string;
  gambar?: string;   // path foto thumbnail mis. '/lokasi/kabah/multazam.jpg'; kosong = belum ada
}

/** Grup bagian Ka'bah (mis. "4 Sudut" dan "Bagian Penting Lainnya"). */
export interface BagianKabahGrup {
  judul: string;
  items: BagianKabahItem[];
}

/** Pintu/gerbang penting pada masjid besar. */
export interface PintuMasjid {
  nama: string;
  fungsi: string;
}

/** Satu sub-bagian sejarah berstruktur (heading + paragraf). */
export interface SejarahSeksi {
  judul: string;
  isi: string;
}

/** Tokoh penting yang terkait dengan lokasi. */
export interface TokohLokasi {
  nama: string;
  peran: string;
}

/** Dalil (ayat atau hadits) yang relevan. */
export interface DalilLokasi {
  sumber: string;
  teks: string;
}

export interface Lokasi {
  id: string;
  tipe: TipeLokasi;
  nama: string;
  namaArab?: string;
  kota: string;
  jarakKm: number;
  jamKunjungan: string;
  ringkas: string;
  /**
   * URL gambar lokasi. Kosongkan ("") jika belum tersedia.
   * Saat nanti ada gambar, isi dengan URL publik atau path /public/images/...
   */
  gambar?: string;
  /** Koordinat asli untuk deep-link Google Maps. WAJIB diisi. */
  koordinat: { lat: number; lng: number };
  /** Sejarah panjang dipecah jadi beberapa seksi berheading. */
  sejarahSeksi?: SejarahSeksi[];
  /** Tetap dipertahankan sebagai fallback / ringkasan sejarah. */
  sejarah: string;
  tokoh?: TokohLokasi[];
  keutamaan?: string[];
  dalil?: DalilLokasi[];
  adab?: string[];
  /** Catatan riwayat lemah / perlu di-flag. */
  catatan?: string;
  /** Daftar pintu/gerbang penting (hanya untuk masjid besar). */
  pintu?: PintuMasjid[];
  /** URL ke peta atau denah resmi. */
  petaResmiUrl?: string;
  /** Bagian-bagian fisik Ka'bah (atau lokasi dengan rincian bagian). */
  bagian?: BagianKabah[];
  /** Path 1 diagram visual semua bagian Ka'bah (mis. '/lokasi/kabah/diagram-bagian.jpg'). */
  diagramBagian?: string;
  /** Bagian Ka'bah dikelompokkan jadi 2 grup (Sudut & Bagian Lain). */
  bagianGrup?: BagianKabahGrup[];
  /** Pengantar daftar syuhada (khusus lokasi Makam Syuhada Badr). */
  syuhadaPengantar?: string;
  /** Daftar syuhada (khusus lokasi Makam Syuhada Badr). */
  syuhada?: SyuhadaItem[];
}

export interface SyuhadaItem {
  nama: string;
  golongan: string;
  konteks: string;
}

export type KategoriChecklist = 'dokumen' | 'kesehatan' | 'barang' | 'mental';

/** Segmen jamaah untuk Smart Packing Checklist */
export type KategoriJamaah = 'laki-laki' | 'perempuan' | 'lansia';

export interface ChecklistItem {
  id: string;
  kategori: KategoriChecklist;
  judul: string;
  catatan?: string;
  /** Window waktu indikatif, mis. "H-30" — ditampilkan sebagai metadata. */
  tenggat?: string;
  /**
   * Jika diisi, item hanya ditampilkan untuk segmen jamaah yang dipilih.
   * Jika tidak diisi (undefined) = tampil untuk semua.
   */
  untukKategori?: KategoriJamaah[];
}

export interface KategoriChecklistMeta {
  id: KategoriChecklist;
  judul: string;
  deskripsi: string;
}

/** Satu langkah pada Panduan Tata Cara Umrah. */
export interface TataCaraStep {
  nomor: number;
  judul: string;
  deskripsi: string;
  /** Route internal terkait, mis. "/ibadah/tawaf". */
  tautan?: string;
  tautanLabel?: string;
}

export type GenderLarangan = 'lakilaki' | 'perempuan' | 'umum';

export interface LaranganIhram {
  id: string;
  gender: GenderLarangan;
  judul: string;
  keterangan: string;
}

export interface IhramSection {
  id: string;
  judul: string;
  langkah: string[];
}

/** Satu entri jurnal perjalanan jamaah. */
export interface JurnalEntry {
  id: string;
  tanggal: string;       // ISO date string, mis. "2025-12-15"
  judul?: string;        // judul singkat opsional
  isi: string;           // catatan/tulisan, wajib ada
  fotoDataUrl?: string;  // base64 JPEG setelah di-resize, opsional
  lokasi?: string;       // tag lokasi bebas teks, opsional
}
