import React from 'react';
import { useState, useEffect, useRef, useCallback, type FormEvent, type ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { useTravelAuth } from '../../context/TravelAuthContext';
import TravelLayout from '../../components/travel/TravelLayout';
import {
  fetchKeberangkatan, createKeberangkatan, updateKeberangkatan, deleteKeberangkatan,
  fetchJamaah, createJamaah, updateJamaah, deleteJamaah, bulkInsertJamaah,
  fetchAgenda, createAgenda, deleteAgenda, bulkInsertAgenda,
  fetchAnnouncements, createAnnouncement, deleteAnnouncement,
  type KeberangkatanRow, type JamaahAccountRow, type AgendaItemRow, type TravelAnnouncementRow,
  supabase,
} from '../../lib/supabase';

/* ─── Helpers ─────────────────────────────────────────────────────── */

function normalizePhone(val: string) {
  return val.replace(/[^\d+]/g, '');
}

function formatTanggal(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

function formatDatetime(iso: string) {
  return new Date(iso).toLocaleString('id-ID', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

/* ─── Styled primitives ───────────────────────────────────────────── */

const inputBase: React.CSSProperties = {
  border: '1px solid rgba(0,0,0,0.09)',
  background: '#fafaf9',
  color: '#111827',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
};

const PRIMARY = '#0ea5e9';
const PRIMARY_DEEP = '#0284c7';
const PRIMARY_BG = 'rgba(14,165,233,0.07)';
const PRIMARY_BORDER = 'rgba(14,165,233,0.18)';

const StyledInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function StyledInput(props, ref) {
    return (
      <input
        {...props}
        ref={ref}
        className={`w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 focus:outline-none ${props.className ?? ''}`}
        style={{ ...inputBase, ...props.style }}
        onFocus={e => { e.currentTarget.style.border = `1px solid ${PRIMARY}`; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)'; e.currentTarget.style.background = '#ffffff'; props.onFocus?.(e); }}
        onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; props.onBlur?.(e); }}
      />
    );
  }
);

function StyledTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 focus:outline-none resize-none ${props.className ?? ''}`}
      style={{ ...inputBase, ...props.style }}
      onFocus={e => { e.currentTarget.style.border = `1px solid ${PRIMARY}`; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)'; e.currentTarget.style.background = '#ffffff'; props.onFocus?.(e); }}
      onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; props.onBlur?.(e); }}
    />
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: '#6b7280' }}>{children}</label>;
}

/* ─── Constants ───────────────────────────────────────────────────── */

const FASE_OPTIONS: { value: JamaahAccountRow['fase']; label: string }[] = [
  { value: 'persiapan', label: 'Persiapan' },
  { value: 'tanah-suci', label: 'Di Tanah Suci' },
  { value: 'selesai', label: 'Selesai' },
];

type TabId = 'keberangkatan' | 'jamaah' | 'agenda' | 'pengumuman';

const TABS: { id: TabId; label: string }[] = [
  { id: 'keberangkatan', label: 'Keberangkatan' },
  { id: 'jamaah', label: 'Jamaah' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'pengumuman', label: 'Pengumuman' },
];

/* ─── Component ───────────────────────────────────────────────────── */

export default function TravelDashboard() {
  const { tenant } = useTravelAuth();

  const [activeTab, setActiveTab] = useState<TabId>('keberangkatan');
  const [copied, setCopied] = useState(false);

  const slugUrl = tenant?.slug ? `${window.location.origin}/t/${tenant.slug}` : null;

  const handleCopySlug = useCallback(() => {
    if (!slugUrl) return;
    navigator.clipboard.writeText(slugUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [slugUrl]);

  /* ── Keberangkatan ───────────────────────────────────────────────── */
  const [keberangkatanList, setKeberangkatanList] = useState<KeberangkatanRow[]>([]);
  const [keberangkatanLoading, setKeberangkatanLoading] = useState(false);
  const [selectedKeberangkatan, setSelectedKeberangkatan] = useState('');

  const [kbFormOpen, setKbFormOpen] = useState(false);
  const [kbEditId, setKbEditId] = useState<string | null>(null);
  const [kbNamaBatch, setKbNamaBatch] = useState('');
  const [kbTanggalBerangkat, setKbTanggalBerangkat] = useState('');
  const [kbTanggalPulang, setKbTanggalPulang] = useState('');
  const [kbHotelMakkah, setKbHotelMakkah] = useState('');
  const [kbHotelMadinah, setKbHotelMadinah] = useState('');
  const [kbMeetingPoint, setKbMeetingPoint] = useState('');
  const [kbGuideName, setKbGuideName] = useState('');
  const [kbGuideWhatsapp, setKbGuideWhatsapp] = useState('');
  const [kbTourLeaderName, setKbTourLeaderName] = useState('');
  const [kbTourLeaderWhatsapp, setKbTourLeaderWhatsapp] = useState('');
  const [kbEmergencyNote, setKbEmergencyNote] = useState('');
  const [kbFaseOverride, setKbFaseOverride] = useState('');
  const [kbAktif, setKbAktif] = useState(true);
  const [kbSaving, setKbSaving] = useState(false);
  const [kbError, setKbError] = useState('');

  /* ── Jamaah ──────────────────────────────────────────────────────── */
  const [jamaahList, setJamaahList] = useState<JamaahAccountRow[]>([]);
  const [jamaahLoading, setJamaahLoading] = useState(false);

  const [jmNama, setJmNama] = useState('');
  const [jmNomorJamaah, setJmNomorJamaah] = useState('');
  const [jmRombongan, setJmRombongan] = useState('');
  const [jmBus, setJmBus] = useState('');
  const [jmKamar, setJmKamar] = useState('');
  const [jmPaspor, setJmPaspor] = useState('');
  const [jmFase, setJmFase] = useState<JamaahAccountRow['fase']>('persiapan');
  const [jmSubmitting, setJmSubmitting] = useState(false);
  const [jmError, setJmError] = useState('');
  const [showDetailJamaah, setShowDetailJamaah] = useState(false);
  const namaRef = useRef<HTMLInputElement>(null);

  const [editingJamaahId, setEditingJamaahId] = useState<string | null>(null);
  const [editNama, setEditNama] = useState('');
  const [editNomorJamaah, setEditNomorJamaah] = useState('');
  const [editRombongan, setEditRombongan] = useState('');
  const [editPaspor, setEditPaspor] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  const [importOpen, setImportOpen] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState('');
  const [importPreview, setImportPreview] = useState<Array<{ nama: string; nomor_jamaah: string; rombongan: string; nomor_paspor: string }>>([]);
  const [importSaving, setImportSaving] = useState(false);
  const importFileRef = useRef<HTMLInputElement>(null);

  const [agImportOpen, setAgImportOpen] = useState(false);
  const [agImportLoading, setAgImportLoading] = useState(false);
  const [agImportError, setAgImportError] = useState('');
  const [agImportPreview, setAgImportPreview] = useState<Array<{ tanggal: string; jam_mulai: string; judul: string; lokasi: string; deskripsi: string }>>([]);
  const [agImportSaving, setAgImportSaving] = useState(false);
  const agImportFileRef = useRef<HTMLInputElement>(null);

  /* ── Agenda ──────────────────────────────────────────────────────── */
  const [agendaItems, setAgendaItems] = useState<AgendaItemRow[]>([]);
  const [agendaLoading, setAgendaLoading] = useState(false);
  const [agJudul, setAgJudul] = useState('');
  const [agTanggal, setAgTanggal] = useState('');
  const [agJam, setAgJam] = useState('');
  const [agDeskripsi, setAgDeskripsi] = useState('');
  const [agLokasi, setAgLokasi] = useState('');
  const [agSubmitting, setAgSubmitting] = useState(false);
  const [agError, setAgError] = useState('');

  /* ── Agenda inline edit ──────────────────────────────────────────── */
  const [agEditingId, setAgEditingId] = useState<string | null>(null);
  const [agEditFields, setAgEditFields] = useState({ tanggal: '', jam_mulai: '', judul: '', deskripsi: '', lokasi: '', urutan: 0 });
  const [agEditSaving, setAgEditSaving] = useState(false);
  const [agEditError, setAgEditError] = useState('');
  const [agEditSuccess, setAgEditSuccess] = useState('');

  /* ── Pengumuman ───────────────────────────────────────────────────── */
  const [announcements, setAnnouncements] = useState<TravelAnnouncementRow[]>([]);
  const [annLoading, setAnnLoading] = useState(false);
  const [annLabel, setAnnLabel] = useState('Info');
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annImportant, setAnnImportant] = useState(false);
  const [annSubmitting, setAnnSubmitting] = useState(false);
  const [annError, setAnnError] = useState('');

  /* ── Loaders ─────────────────────────────────────────────────────── */

  const loadKeberangkatan = useCallback(async () => {
    if (!tenant?.id) return;
    setKeberangkatanLoading(true);
    fetchKeberangkatan(tenant.id).then(list => {
      setKeberangkatanList(list);
      if (list.length > 0 && !selectedKeberangkatan) setSelectedKeberangkatan(list[0].id);
    }).catch(() => {}).finally(() => setKeberangkatanLoading(false));
  }, [tenant?.id, selectedKeberangkatan]);

  const loadJamaah = useCallback(async () => {
    if (!tenant?.id || !selectedKeberangkatan) return;
    setJamaahLoading(true);
    fetchJamaah(selectedKeberangkatan).then(setJamaahList).catch(() => {}).finally(() => setJamaahLoading(false));
  }, [tenant?.id, selectedKeberangkatan]);

  const loadAgenda = useCallback(async () => {
    if (!tenant?.id || !selectedKeberangkatan) return;
    setAgendaLoading(true);
    fetchAgenda(selectedKeberangkatan).then(setAgendaItems).catch(() => {}).finally(() => setAgendaLoading(false));
  }, [tenant?.id, selectedKeberangkatan]);

  const loadAnnouncements = useCallback(async () => {
    if (!tenant?.id || !selectedKeberangkatan) return;
    setAnnLoading(true);
    fetchAnnouncements(selectedKeberangkatan).then(setAnnouncements).catch(() => {}).finally(() => setAnnLoading(false));
  }, [tenant?.id, selectedKeberangkatan]);

  useEffect(() => {
    if (tenant?.id) loadKeberangkatan();
  }, [tenant?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedKeberangkatan) {
      loadJamaah();
      loadAgenda();
      loadAnnouncements();
    }
  }, [selectedKeberangkatan, loadJamaah, loadAgenda, loadAnnouncements]);

  // Clear agenda inline-edit state when the selected batch changes
  useEffect(() => {
    setAgEditingId(null);
    setAgEditError('');
    setAgEditSuccess('');
  }, [selectedKeberangkatan]);

  /* ── Keberangkatan handlers ──────────────────────────────────────── */

  function openKbForm(kb?: KeberangkatanRow) {
    if (kb) {
      setKbEditId(kb.id);
      setKbNamaBatch(kb.nama_batch);
      setKbTanggalBerangkat(kb.tanggal_keberangkatan ?? '');
      setKbTanggalPulang(kb.tanggal_kepulangan ?? '');
      setKbHotelMakkah(kb.hotel_makkah ?? '');
      setKbHotelMadinah(kb.hotel_madinah ?? '');
      setKbMeetingPoint(kb.meeting_point ?? '');
      setKbGuideName(kb.guide_name ?? '');
      setKbGuideWhatsapp(kb.guide_whatsapp ?? '');
      setKbTourLeaderName(kb.tour_leader_name ?? '');
      setKbTourLeaderWhatsapp(kb.tour_leader_whatsapp ?? '');
      setKbEmergencyNote(kb.emergency_note ?? '');
      setKbFaseOverride(kb.fase_override ?? '');
      setKbAktif(kb.aktif ?? true);
    } else {
      setKbEditId(null);
      setKbNamaBatch(''); setKbTanggalBerangkat(''); setKbTanggalPulang('');
      setKbHotelMakkah(''); setKbHotelMadinah(''); setKbMeetingPoint('');
      setKbGuideName(''); setKbGuideWhatsapp('');
      setKbTourLeaderName(''); setKbTourLeaderWhatsapp('');
      setKbEmergencyNote(''); setKbFaseOverride(''); setKbAktif(true);
    }
    setKbError('');
    setKbFormOpen(true);
  }

  async function handleSaveKeberangkatan(e: FormEvent) {
    e.preventDefault();
    if (!tenant?.id) return;
    if (!kbNamaBatch.trim()) { setKbError('Nama batch wajib diisi.'); return; }
    setKbSaving(true); setKbError('');
    try {
      const payload = {
        nama_batch: kbNamaBatch.trim(),
        tanggal_keberangkatan: kbTanggalBerangkat || null,
        tanggal_kepulangan: kbTanggalPulang || null,
        hotel_makkah: kbHotelMakkah.trim() || null,
        hotel_madinah: kbHotelMadinah.trim() || null,
        meeting_point: kbMeetingPoint.trim() || null,
        guide_name: kbGuideName.trim() || null,
        guide_whatsapp: kbGuideWhatsapp.trim() || null,
        tour_leader_name: kbTourLeaderName.trim() || null,
        tour_leader_whatsapp: kbTourLeaderWhatsapp.trim() || null,
        emergency_note: kbEmergencyNote.trim() || null,
        fase_override: (kbFaseOverride || null) as 'persiapan' | 'tanah-suci' | 'selesai' | null,
        aktif: kbAktif,
      };
      if (kbEditId) {
        await updateKeberangkatan(kbEditId, payload);
      } else {
        const newKb = await createKeberangkatan(tenant.id, payload);
        setSelectedKeberangkatan(newKb.id);
      }
      setKbFormOpen(false);
      await loadKeberangkatan();
    } catch (err: unknown) { setKbError(err instanceof Error ? err.message : 'Gagal menyimpan.'); }
    setKbSaving(false);
  }

  async function handleDeleteKeberangkatan(kbId: string, nama: string) {
    if (!window.confirm(`Hapus batch "${nama}"? Semua jamaah, agenda, dan pengumuman batch ini juga akan terpengaruh.`)) return;
    await deleteKeberangkatan(kbId);
    setKeberangkatanList(prev => {
      const next = prev.filter(k => k.id !== kbId);
      if (selectedKeberangkatan === kbId) setSelectedKeberangkatan(next[0]?.id ?? '');
      return next;
    });
  }

  /* ── Jamaah handlers ─────────────────────────────────────────────── */

  /* ── Auto-generate Jamaah Account ────────────────────────────── */
  const [accountModal, setAccountModal] = useState<{
    nama: string;
    nomorJamaah: string;
    kodeAktivasi: string;
    travel: string;
    link: string;
  } | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  function generateAutoNomorJamaah() {
    const d = new Date();
    const yr = d.getFullYear();
    const mo = (d.getMonth() + 1).toString().padStart(2, '0');
    const rnd = Math.floor(100 + Math.random() * 900);
    return `JM-${yr}${mo}-${rnd}`;
  }

  async function handleAddJamaah(e: FormEvent) {
    e.preventDefault();
    if (!tenant?.id || !selectedKeberangkatan) return;
    setJmError('');
    if (!jmNama.trim()) { setJmError('Nama jamaah wajib diisi.'); return; }
    
    const finalNomorJamaah = jmNomorJamaah.trim() || generateAutoNomorJamaah();
    setJmSubmitting(true);
    try {
      await createJamaah(tenant.id, selectedKeberangkatan, {
        nama: jmNama.trim(),
        nomor_jamaah: finalNomorJamaah,
        rombongan: jmRombongan.trim() || null,
        nomor_bus: jmBus.trim() || null,
        nomor_kamar: jmKamar.trim() || null,
        nomor_paspor: jmPaspor.trim() || null,
        fase: jmFase,
      });

      setAccountModal({
        nama: jmNama.trim(),
        nomorJamaah: finalNomorJamaah,
        kodeAktivasi: tenant.activation_code || 'DEMO01',
        travel: tenant.nama_travel,
        link: `${window.location.origin}/login`,
      });

      setJmNama(''); setJmNomorJamaah(''); setJmRombongan(''); setJmBus(''); setJmKamar(''); setJmPaspor(''); setJmFase('persiapan');
      await loadJamaah();
      namaRef.current?.focus();
    } catch (err: unknown) { setJmError(err instanceof Error ? err.message : 'Gagal menambah jamaah.'); }
    setJmSubmitting(false);
  }

  async function handleDeleteJamaah(jamaahId: string, nama: string) {
    if (!tenant?.id || !window.confirm(`Hapus jamaah "${nama}"? Jamaah ini tidak bisa login lagi.`)) return;
    await deleteJamaah(tenant.id, jamaahId);
    setJamaahList(prev => prev.filter(j => j.id !== jamaahId));
  }

  async function handleUpdateJamaahFase(jamaahId: string, val: string) {
    if (!tenant?.id) return;
    const fase_override = (val === '' ? null : val) as JamaahAccountRow['fase'] | null;
    await updateJamaah(tenant.id, jamaahId, { fase_override } as Partial<JamaahAccountRow>);
    setJamaahList(prev => prev.map(j => j.id === jamaahId ? { ...j, fase_override } : j));
  }

  function startEditJamaah(j: JamaahAccountRow) {
    setEditingJamaahId(j.id);
    setEditNama(j.nama);
    setEditNomorJamaah(j.nomor_jamaah);
    setEditRombongan(j.rombongan ?? '');
    setEditPaspor(j.nomor_paspor ?? '');
    setEditError('');
  }

  function cancelEditJamaah() { setEditingJamaahId(null); setEditError(''); }

  async function saveEditJamaah(jamaahId: string) {
    if (!tenant?.id) return;
    if (!editNama.trim()) { setEditError('Nama wajib diisi.'); return; }
    if (!editNomorJamaah.trim()) { setEditError('No. Jamaah wajib diisi.'); return; }
    setEditSaving(true); setEditError('');
    try {
      const payload = {
        nama: editNama.trim(), nomor_jamaah: editNomorJamaah.trim(),
        rombongan: editRombongan.trim() || null, nomor_paspor: editPaspor.trim() || null,
      };
      await updateJamaah(tenant.id, jamaahId, payload as Partial<JamaahAccountRow>);
      setJamaahList(prev => prev.map(j => j.id === jamaahId ? { ...j, ...payload } : j));
      setEditingJamaahId(null);
    } catch (err: unknown) { setEditError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan.'); }
    setEditSaving(false);
  }

  async function handleImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(''); setImportLoading(true); setImportPreview([]);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      let result: Array<{ nama?: unknown; nomor_jamaah?: unknown; rombongan?: unknown; nomor_paspor?: unknown }> = [];

      if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const resp = await fetch('/api/ai-extract-jamaah', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'excel', rows }),
        });
        const json = await resp.json() as { error?: string; jamaah?: typeof result };
        if (!resp.ok) throw new Error(json.error || 'Gagal ekstrak Excel.');
        result = json.jamaah ?? [];
      } else if (ext === 'pdf' || ['png', 'jpg', 'jpeg', 'webp'].includes(ext || '')) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const resp = await fetch('/api/ai-extract-jamaah', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'pdf', fileBase64: base64, mimeType: file.type }),
        });
        const json = await resp.json() as { error?: string; jamaah?: typeof result };
        if (!resp.ok) throw new Error(json.error || 'Gagal ekstrak PDF.');
        result = json.jamaah ?? [];
      } else {
        throw new Error('Format tidak didukung. Pakai Excel (.xlsx/.csv) atau PDF.');
      }

      const preview = (result || []).map((j, idx) => ({
        nama: String(j.nama ?? '').trim(),
        nomor_jamaah: String(j.nomor_jamaah ?? String(idx + 1).padStart(3, '0')).trim(),
        rombongan: String(j.rombongan ?? '').trim(),
        nomor_paspor: String(j.nomor_paspor ?? '').trim(),
      })).filter(j => j.nama);

      if (preview.length === 0) throw new Error('Tidak ada data jamaah terbaca. Cek format file.');
      setImportPreview(preview);
    } catch (err: unknown) { setImportError(err instanceof Error ? err.message : 'Gagal memproses file.'); }
    finally { setImportLoading(false); if (importFileRef.current) importFileRef.current.value = ''; }
  }

  function updatePreviewRow(idx: number, field: string, value: string) {
    setImportPreview(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  }

  function removePreviewRow(idx: number) {
    setImportPreview(prev => prev.filter((_, i) => i !== idx));
  }

  async function confirmImport() {
    if (!tenant?.id || !selectedKeberangkatan || importPreview.length === 0) return;
    const invalid = importPreview.some(r => !r.nama.trim() || !r.nomor_jamaah.trim());
    if (invalid) { setImportError('Semua baris harus punya Nama & No. Jamaah.'); return; }
    setImportSaving(true); setImportError('');
    try {
      const payload = importPreview.map(r => ({
        nama: r.nama.trim(), nomor_jamaah: r.nomor_jamaah.trim(),
        rombongan: r.rombongan.trim() || null, nomor_paspor: r.nomor_paspor.trim() || null,
        fase: 'persiapan',
      }));
      const { inserted } = await bulkInsertJamaah(tenant.id, selectedKeberangkatan, payload);
      setImportPreview([]); setImportOpen(false);
      await loadJamaah();
      alert(`${inserted} jamaah berhasil diimport.`);
    } catch (err: unknown) { setImportError(err instanceof Error ? err.message : 'Gagal menyimpan data.'); }
    setImportSaving(false);
  }

  /* ── Agenda handlers ─────────────────────────────────────────────── */

  async function handleAgImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !tenant?.id) return;
    if (!selectedKeberangkatan) { setAgImportError('Pilih keberangkatan dulu.'); return; }
    setAgImportError(''); setAgImportLoading(true); setAgImportPreview([]);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      let result: Array<{ tanggal?: string; jam_mulai?: string; judul?: string; lokasi?: string; deskripsi?: string }> = [];
      if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: 'array' });
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
        const { data: { session: agSession1 } } = await supabase.auth.getSession();
        const agAuth1: Record<string, string> = agSession1?.access_token ? { Authorization: `Bearer ${agSession1.access_token}` } : {};
        const resp = await fetch('/api/ai-extract-agenda', { method: 'POST', headers: { 'Content-Type': 'application/json', ...agAuth1 }, body: JSON.stringify({ mode: 'excel', rows }) });
        const json = await resp.json() as { error?: string; agenda?: typeof result };
        if (!resp.ok) throw new Error(json.error || 'Gagal ekstrak Excel.');
        result = json.agenda ?? [];
      } else if (ext === 'pdf' || ['png', 'jpg', 'jpeg', 'webp'].includes(ext || '')) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const { data: { session: agSession2 } } = await supabase.auth.getSession();
        const agAuth2: Record<string, string> = agSession2?.access_token ? { Authorization: `Bearer ${agSession2.access_token}` } : {};
        const resp = await fetch('/api/ai-extract-agenda', { method: 'POST', headers: { 'Content-Type': 'application/json', ...agAuth2 }, body: JSON.stringify({ mode: 'pdf', fileBase64: base64, mimeType: file.type }) });
        const json = await resp.json() as { error?: string; agenda?: typeof result };
        if (!resp.ok) throw new Error(json.error || 'Gagal ekstrak PDF.');
        result = json.agenda ?? [];
      } else {
        throw new Error('Format tidak didukung. Pakai Excel, CSV, PDF, atau gambar.');
      }
      const preview = (result || []).map(a => ({
        tanggal: String(a.tanggal ?? '').trim(),
        jam_mulai: String(a.jam_mulai ?? '').trim(),
        judul: String(a.judul ?? '').trim(),
        lokasi: String(a.lokasi ?? '').trim(),
        deskripsi: String(a.deskripsi ?? '').trim(),
      })).filter(a => a.judul);
      if (preview.length === 0) throw new Error('Tidak ada agenda terbaca. Cek file atau format.');
      setAgImportPreview(preview);
    } catch (err: unknown) {
      setAgImportError(err instanceof Error ? err.message : 'Gagal memproses file.');
    } finally {
      setAgImportLoading(false);
      if (agImportFileRef.current) agImportFileRef.current.value = '';
    }
  }

  function updateAgPreviewRow(idx: number, field: string, value: string) {
    setAgImportPreview(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  }

  function removeAgPreviewRow(idx: number) {
    setAgImportPreview(prev => prev.filter((_, i) => i !== idx));
  }

  async function confirmAgImport() {
    if (agImportPreview.length === 0 || !selectedKeberangkatan || !tenant?.id) return;
    const invalid = agImportPreview.some(a => !a.judul.trim() || !a.tanggal.trim());
    if (invalid) { setAgImportError('Setiap agenda wajib punya tanggal & judul.'); return; }
    if (!window.confirm(`Ini akan menambahkan ${agImportPreview.length} agenda baru ke batch ini. Lanjutkan?`)) return;
    setAgImportSaving(true); setAgImportError('');
    try {
      const payload = agImportPreview.map(a => ({
        tanggal: a.tanggal.trim(),
        jam_mulai: a.jam_mulai.trim() || null,
        judul: a.judul.trim(),
        lokasi: a.lokasi.trim() || null,
        deskripsi: a.deskripsi.trim() || null,
        urutan: 0,
      }));
      const { inserted } = await bulkInsertAgenda(tenant.id, selectedKeberangkatan, payload);
      setAgImportPreview([]); setAgImportOpen(false);
      await loadAgenda();
      alert(`${inserted} agenda berhasil ditambahkan.`);
    } catch (err: unknown) {
      setAgImportError(err instanceof Error ? err.message : 'Gagal menyimpan.');
    } finally { setAgImportSaving(false); }
  }

  async function handleAddAgenda(e: FormEvent) {
    e.preventDefault();
    if (!tenant?.id || !selectedKeberangkatan) return;
    setAgError('');
    if (!agJudul.trim() || !agTanggal) { setAgError('Tanggal dan judul wajib diisi.'); return; }
    setAgSubmitting(true);
    try {
      await createAgenda(tenant.id, selectedKeberangkatan, {
        tanggal: agTanggal, jam_mulai: agJam || null,
        judul: agJudul.trim(), deskripsi: agDeskripsi.trim() || null,
        lokasi: agLokasi.trim() || null, urutan: 0,
      });
      setAgJudul(''); setAgTanggal(''); setAgJam(''); setAgDeskripsi(''); setAgLokasi('');
      await loadAgenda();
    } catch (err: unknown) { setAgError(err instanceof Error ? err.message : 'Gagal menambah agenda.'); }
    setAgSubmitting(false);
  }

  async function handleDeleteAgenda(agendaId: string, judul: string) {
    if (!tenant?.id || !window.confirm(`Hapus agenda "${judul}"?`)) return;
    await deleteAgenda(tenant.id, agendaId);
    await loadAgenda();
  }

  function handleStartAgEdit(item: AgendaItemRow) {
    setAgEditingId(item.id);
    setAgEditFields({
      tanggal: item.tanggal,
      jam_mulai: item.jam_mulai?.slice(0, 5) ?? '',
      judul: item.judul,
      deskripsi: item.deskripsi ?? '',
      lokasi: item.lokasi ?? '',
      urutan: item.urutan,
    });
    setAgEditError('');
    setAgEditSuccess('');
  }

  function handleCancelAgEdit() {
    setAgEditingId(null);
    setAgEditError('');
  }

  async function handleSaveAgEdit() {
    if (!agEditingId || !tenant?.id || !selectedKeberangkatan) return;
    if (!agEditFields.tanggal.trim() || !agEditFields.judul.trim()) {
      setAgEditError('Tanggal dan judul wajib diisi.');
      return;
    }
    setAgEditSaving(true);
    setAgEditError('');
    try {
      const { error } = await supabase
        .from('agenda_items')
        .update({
          tanggal: agEditFields.tanggal.trim(),
          jam_mulai: agEditFields.jam_mulai.trim() || null,
          judul: agEditFields.judul.trim(),
          deskripsi: agEditFields.deskripsi.trim() || null,
          lokasi: agEditFields.lokasi.trim() || null,
          urutan: agEditFields.urutan,
        })
        .eq('id', agEditingId)
        .eq('tenant_id', tenant.id)
        .eq('keberangkatan_id', selectedKeberangkatan);
      if (error) throw error;
      setAgEditingId(null);
      await loadAgenda();
      setAgEditSuccess('Agenda berhasil diperbarui.');
      setTimeout(() => setAgEditSuccess(''), 3000);
    } catch (err: unknown) {
      setAgEditError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan.');
    } finally {
      setAgEditSaving(false);
    }
  }

  /* ── Pengumuman handlers ──────────────────────────────────────────── */

  async function handleAddAnnouncement(e: FormEvent) {
    e.preventDefault();
    if (!tenant?.id || !selectedKeberangkatan) return;
    setAnnError('');
    if (!annTitle.trim() || !annContent.trim()) { setAnnError('Judul dan isi pengumuman wajib diisi.'); return; }
    setAnnSubmitting(true);
    try {
      await createAnnouncement(tenant.id, selectedKeberangkatan, {
        label: annLabel.trim() || 'Info', title: annTitle.trim(),
        content: annContent.trim(), important: annImportant,
      });
      setAnnLabel('Info'); setAnnTitle(''); setAnnContent(''); setAnnImportant(false);
      await loadAnnouncements();
    } catch (err: unknown) { setAnnError(err instanceof Error ? err.message : 'Gagal membuat pengumuman.'); }
    setAnnSubmitting(false);
  }

  async function handleDeleteAnnouncement(annId: string, title: string) {
    if (!tenant?.id || !window.confirm(`Hapus pengumuman "${title}"?`)) return;
    await deleteAnnouncement(tenant.id, annId);
    await loadAnnouncements();
  }

  /* ── Guard: no tenant ────────────────────────────────────────────── */

  if (!tenant) {
    return (
      <TravelLayout>
        <div className="py-20 text-center">
          <p className="text-[15px] font-semibold" style={{ color: '#374151' }}>
            Akun ini belum terhubung ke tenant manapun.
          </p>
          <p className="text-[13px] mt-1" style={{ color: '#9ca3af' }}>
            Hubungi administrator untuk menghubungkan akun Anda ke travel agency.
          </p>
        </div>
      </TravelLayout>
    );
  }

  /* ── Render ──────────────────────────────────────────────────────── */

  return (
    <TravelLayout>

      {/* ── Header Tenant ── */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 font-extrabold">
                UmrahMe × El Massa System
              </span>
            </div>
            <h1 className="font-bold" style={{ fontSize: '26px', color: '#111827', letterSpacing: '-0.02em' }}>
              {tenant.nama_travel}
            </h1>
            <p className="text-[12px] text-stone-500 font-normal mt-0.5">
              Portal Manajerial Travel & Otomatisasi Akun Jamaah Digital UmrahMe
            </p>
          </div>
          <div className="rounded-2xl px-5 py-3 text-center" style={cardStyle}>
            <p className="font-mono text-[26px] font-bold" style={{ color: '#111827', letterSpacing: '-1px' }}>
              {jamaahList.length}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] mt-0.5" style={{ color: '#9ca3af' }}>
              {selectedKeberangkatan ? 'Jamaah Batch Ini' : 'Total Jamaah'}
            </p>
          </div>
        </div>

        {/* Kode aktivasi */}
        <div className="mt-4 inline-flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: 'rgba(14,165,233,0.06)', border: PRIMARY_BORDER }}>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: PRIMARY }}>
              Kode Aktivasi Jamaah
            </p>
            <p className="font-mono text-[20px] font-bold tracking-[0.12em]" style={{ color: PRIMARY_DEEP, letterSpacing: '0.1em' }}>
              {tenant.activation_code}
            </p>
          </div>
          <div className="h-10 w-px" style={{ background: PRIMARY_BORDER }} />
          <p className="text-[12px] max-w-[220px]" style={{ color: '#0369a1' }}>
            Bagikan kode ini ke jamaah untuk login ke aplikasi.
          </p>
        </div>

        {/* Link slug branded */}
        {slugUrl && (
          <div className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)' }}>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: '#059669' }}>
                Link Login Branded
              </p>
              <p className="font-mono text-[12px] font-semibold truncate mt-0.5" style={{ color: '#047857' }}>
                {slugUrl}
              </p>
            </div>
            <button onClick={handleCopySlug}
              className="flex-none flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold transition-all active:scale-95"
              style={{ background: copied ? 'rgba(16,185,129,0.18)' : 'rgba(16,185,129,0.12)', color: '#059669', border: '1px solid rgba(16,185,129,0.22)' }}>
              {copied ? (
                <><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Tersalin!</>
              ) : (
                <><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Salin Link</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── Tab Bar ── */}
      <div className="sticky top-0 z-10 mb-6 overflow-x-auto" style={{ background: '#f9f7f3' }}>
        <div className="flex gap-1 px-1 py-1.5 w-max min-w-full"
          style={{ background: 'rgba(0,0,0,0.04)', borderRadius: '14px' }}>
          {TABS.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
                className="relative flex-none whitespace-nowrap transition-all duration-200"
                style={{
                  padding: '7px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 500,
                  border: 'none',
                  cursor: 'pointer',
                  color: active ? '#1e1b4b' : '#6b7280',
                  background: active ? '#ffffff' : 'transparent',
                  boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10), 0 0.5px 1px rgba(0,0,0,0.06)' : 'none',
                  letterSpacing: active ? '-0.01em' : '0',
                }}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          TAB: KEBERANGKATAN
      ══════════════════════════════════════════════ */}
      {activeTab === 'keberangkatan' && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Batch Keberangkatan</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: PRIMARY_BG, color: PRIMARY }}>{keberangkatanList.length} batch</span>
            <button type="button" onClick={() => openKbForm()}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150"
              style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#ffffff' }}>
              + Tambah Batch
            </button>
          </div>

          {kbFormOpen && (
            <form onSubmit={handleSaveKeberangkatan} className="rounded-2xl px-6 py-6 mb-5"
              style={{ ...cardStyle, border: `1px solid ${PRIMARY_BORDER}` }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: PRIMARY }}>
                {kbEditId ? 'Edit Batch' : 'Batch Baru'}
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Nama Batch <span style={{ color: '#f87171' }}>*</span></p>
                  <StyledInput type="text" value={kbNamaBatch} onChange={e => setKbNamaBatch(e.target.value)} placeholder="cth. Batch 1 — Februari 2025" maxLength={120} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Tgl Keberangkatan</p><StyledInput type="date" value={kbTanggalBerangkat} onChange={e => setKbTanggalBerangkat(e.target.value)} /></div>
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Tgl Kepulangan</p><StyledInput type="date" value={kbTanggalPulang} onChange={e => setKbTanggalPulang(e.target.value)} /></div>
                </div>
                <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)' }} />
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Hotel Makkah</p><StyledInput type="text" value={kbHotelMakkah} onChange={e => setKbHotelMakkah(e.target.value)} placeholder="Nama hotel & kamar" maxLength={120} /></div>
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Hotel Madinah</p><StyledInput type="text" value={kbHotelMadinah} onChange={e => setKbHotelMadinah(e.target.value)} placeholder="Nama hotel & kamar" maxLength={120} /></div>
                </div>
                <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Titik Kumpul</p><StyledInput type="text" value={kbMeetingPoint} onChange={e => setKbMeetingPoint(e.target.value)} placeholder="Cth: Lobby terminal 2" maxLength={160} /></div>
                <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)' }} />
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Nama Muthowwif</p><StyledInput type="text" value={kbGuideName} onChange={e => setKbGuideName(e.target.value)} placeholder="Ust. Ahmad" maxLength={80} /></div>
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>WA Muthowwif</p><StyledInput type="text" value={kbGuideWhatsapp} onChange={e => setKbGuideWhatsapp(normalizePhone(e.target.value))} placeholder="628xxxxxxxxxx" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Nama Tour Leader</p><StyledInput type="text" value={kbTourLeaderName} onChange={e => setKbTourLeaderName(e.target.value)} placeholder="Bpk. Budi" maxLength={80} /></div>
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>WA Tour Leader</p><StyledInput type="text" value={kbTourLeaderWhatsapp} onChange={e => setKbTourLeaderWhatsapp(normalizePhone(e.target.value))} placeholder="628xxxxxxxxxx" /></div>
                </div>
                <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Catatan Darurat</p><StyledTextarea rows={2} value={kbEmergencyNote} onChange={e => setKbEmergencyNote(e.target.value)} placeholder="Instruksi jika jamaah tersesat..." /></div>
                <div>
                  <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Override Fase</p>
                  <select value={kbFaseOverride} onChange={e => setKbFaseOverride(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-[13px] focus:outline-none"
                    style={{ ...inputBase }}>
                    <option value="">Auto (dari tanggal)</option>
                    {FASE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={kbAktif} onChange={e => setKbAktif(e.target.checked)} className="w-4 h-4 rounded" />
                  <span className="text-[12px] font-medium" style={{ color: '#374151' }}>Batch aktif (terlihat di login jamaah)</span>
                </label>
              </div>
              {kbError && <p className="mt-3 text-[12px]" style={{ color: '#dc2626' }}>{kbError}</p>}
              <div className="flex items-center gap-3 pt-5">
                <button type="submit" disabled={kbSaving}
                  className="px-6 py-2.5 text-[12px] font-semibold rounded-xl disabled:opacity-60"
                  style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#ffffff' }}>
                  {kbSaving ? 'Menyimpan...' : (kbEditId ? 'Simpan Perubahan' : 'Buat Batch')}
                </button>
                <button type="button" onClick={() => setKbFormOpen(false)}
                  className="px-5 py-2.5 text-[12px] font-medium rounded-xl" style={{ color: '#6b7280', border: '1px solid rgba(0,0,0,0.1)' }}>
                  Batal
                </button>
              </div>
            </form>
          )}

          {keberangkatanLoading && (
            <p className="text-[12px] py-8 text-center" style={{ color: '#9ca3af' }}>Memuat batch...</p>
          )}

          {!keberangkatanLoading && keberangkatanList.length === 0 && (
            <div className="py-12 text-center rounded-2xl" style={{ border: '1px dashed rgba(0,0,0,0.12)' }}>
              <p className="text-[13px]" style={{ color: '#9ca3af' }}>Belum ada batch keberangkatan.</p>
              <p className="text-[12px] mt-1" style={{ color: '#d1d5db' }}>Klik "+ Tambah Batch" untuk memulai.</p>
            </div>
          )}

          <div className="space-y-3">
            {keberangkatanList.map(kb => (
              <div key={kb.id} className="rounded-2xl px-5 py-4"
                style={{ ...cardStyle, border: selectedKeberangkatan === kb.id ? `1.5px solid ${PRIMARY_BORDER}` : undefined }}>
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-[14px]" style={{ color: '#111827' }}>{kb.nama_batch}</p>
                      {kb.aktif ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>Aktif</span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.05)', color: '#9ca3af' }}>Nonaktif</span>
                      )}
                      {selectedKeberangkatan === kb.id && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: PRIMARY_BG, color: PRIMARY }}>Dipilih</span>
                      )}
                    </div>
                    {(kb.tanggal_keberangkatan || kb.tanggal_kepulangan) && (
                      <p className="text-[11px] mt-0.5" style={{ color: '#6b7280' }}>
                        {kb.tanggal_keberangkatan ? new Date(kb.tanggal_keberangkatan + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                        {' → '}
                        {kb.tanggal_kepulangan ? new Date(kb.tanggal_kepulangan + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </p>
                    )}
                    {kb.hotel_makkah && <p className="text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>🕌 {kb.hotel_makkah}</p>}
                  </div>
                  <div className="flex items-center gap-2 flex-none">
                    <button type="button" onClick={() => setSelectedKeberangkatan(kb.id)}
                      className="text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all"
                      style={{ background: selectedKeberangkatan === kb.id ? PRIMARY_BG : 'rgba(0,0,0,0.04)', color: selectedKeberangkatan === kb.id ? PRIMARY : '#6b7280' }}>
                      Pilih
                    </button>
                    <button type="button" onClick={() => openKbForm(kb)}
                      className="text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all"
                      style={{ background: 'rgba(0,0,0,0.04)', color: '#374151' }}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteKeberangkatan(kb.id, kb.nama_batch)}
                      className="text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all"
                      style={{ color: '#dc2626' }}>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          TAB: JAMAAH
      ══════════════════════════════════════════════ */}
      {activeTab === 'jamaah' && (
        <div>
          {/* Keberangkatan selector */}
          {keberangkatanList.length > 0 && (
            <div className="mb-5 flex items-center gap-3">
              <label className="font-mono text-[10px] uppercase tracking-widest flex-none" style={{ color: '#6b7280' }}>Batch:</label>
              <select value={selectedKeberangkatan} onChange={e => setSelectedKeberangkatan(e.target.value)}
                className="flex-1 rounded-xl px-3 py-2 text-[13px] focus:outline-none"
                style={{ ...inputBase, maxWidth: '360px' }}>
                {keberangkatanList.map(kb => (
                  <option key={kb.id} value={kb.id}>{kb.nama_batch}</option>
                ))}
              </select>
            </div>
          )}
          {!selectedKeberangkatan && (
            <div className="mb-5 rounded-xl px-4 py-3 text-[12px]" style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', color: '#d97706' }}>
              Buat batch keberangkatan dulu di tab <strong>Keberangkatan</strong> sebelum menambah jamaah.
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Daftar Jamaah & Status Akun UmrahMe</h2>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  🟢 {jamaahList.length} Akun UmrahMe Aktif
                </span>
              </div>
              <p className="text-[12px] text-stone-500 font-normal mt-0.5">
                Semua jamaah terdaftar otomatis memiliki akun digital UmrahMe dan dapat login cukup dengan memasukkan nama.
              </p>
            </div>

            <button type="button" onClick={() => { setImportOpen(o => !o); setImportError(''); setImportPreview([]); }}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150"
              style={{ background: PRIMARY_BG, color: PRIMARY, border: PRIMARY_BORDER }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Import Excel/PDF
            </button>
          </div>

          {/* Import panel */}
          {importOpen && (
            <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: `1px solid ${PRIMARY_BORDER}` }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: PRIMARY }}>Import Jamaah dengan AI</p>
              <p className="text-[12px] mb-4" style={{ color: '#6b7280' }}>
                Upload file Excel (.xlsx/.csv) atau PDF berisi daftar jamaah. AI akan membaca & merapikan datanya, lalu Anda bisa review sebelum menyimpan.
              </p>

              {importPreview.length === 0 ? (
                <div>
                  <button type="button" onClick={() => importFileRef.current?.click()} disabled={importLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl transition-all disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#fff' }}>
                    {importLoading ? 'AI sedang membaca...' : 'Pilih File'}
                  </button>
                  <input ref={importFileRef} type="file" accept=".xlsx,.xls,.csv,application/pdf,image/png,image/jpeg,image/webp" onChange={handleImportFile} className="hidden" />
                  <p className="mt-2 text-[10px]" style={{ color: '#9ca3af' }}>Format: Excel, CSV, atau PDF. Maks ~10MB.</p>
                </div>
              ) : (
                <div>
                  <p className="text-[12px] font-semibold mb-2" style={{ color: '#374151' }}>{importPreview.length} jamaah terbaca — review & edit sebelum simpan:</p>
                  <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                    <table className="w-full text-[12px]">
                      <thead><tr style={{ background: '#fafaf9' }}>
                        {['Nama', 'No. Jamaah', 'Rombongan', 'No. Paspor', ''].map(h => (
                          <th key={h} className="text-left px-3 py-2 font-mono text-[10px] uppercase" style={{ color: '#9ca3af' }}>{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {importPreview.map((r, idx) => (
                          <tr key={idx} style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                            <td className="px-2 py-1.5"><input value={r.nama} onChange={e => updatePreviewRow(idx, 'nama', e.target.value)} className="w-full rounded px-2 py-1 text-[12px]" style={{ border: '1px solid rgba(0,0,0,0.1)' }} /></td>
                            <td className="px-2 py-1.5"><input value={r.nomor_jamaah} onChange={e => updatePreviewRow(idx, 'nomor_jamaah', e.target.value)} className="w-full rounded px-2 py-1 text-[12px] font-mono" style={{ border: '1px solid rgba(0,0,0,0.1)' }} /></td>
                            <td className="px-2 py-1.5"><input value={r.rombongan} onChange={e => updatePreviewRow(idx, 'rombongan', e.target.value)} className="w-full rounded px-2 py-1 text-[12px]" style={{ border: '1px solid rgba(0,0,0,0.1)' }} /></td>
                            <td className="px-2 py-1.5"><input value={r.nomor_paspor} onChange={e => updatePreviewRow(idx, 'nomor_paspor', e.target.value)} className="w-full rounded px-2 py-1 text-[12px] font-mono" style={{ border: '1px solid rgba(0,0,0,0.1)' }} /></td>
                            <td className="px-2 py-1.5 text-right"><button type="button" onClick={() => removePreviewRow(idx)} className="text-[11px] px-2 py-1 rounded" style={{ color: '#dc2626' }}>Hapus</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button type="button" onClick={confirmImport} disabled={importSaving}
                      className="px-5 py-2.5 text-[12px] font-semibold rounded-xl disabled:opacity-60"
                      style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#fff' }}>
                      {importSaving ? 'Menyimpan...' : `Simpan ${importPreview.length} Jamaah`}
                    </button>
                    <button type="button" onClick={() => { setImportPreview([]); setImportError(''); }}
                      className="px-5 py-2.5 text-[12px] font-semibold rounded-xl" style={{ color: '#6b7280', border: '1px solid rgba(0,0,0,0.1)' }}>
                      Batal / Pilih Ulang
                    </button>
                  </div>
                </div>
              )}
              {importError && <p className="mt-3 text-[12px]" style={{ color: '#dc2626' }}>{importError}</p>}
            </div>
          )}

          {/* Form tambah jamaah cepat */}
          {selectedKeberangkatan && (
            <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#fff' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: '#6b7280' }}>Tambah Jamaah (Akun UmrahMe Auto-Generate)</p>
              <form onSubmit={handleAddJamaah}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <FieldLabel>Nama Jamaah *</FieldLabel>
                    <StyledInput ref={namaRef} type="text" value={jmNama} onChange={e => setJmNama(e.target.value)} placeholder="cth. Budi Santoso" required />
                  </div>
                  <div className="sm:w-56">
                    <div className="flex items-center justify-between mb-1">
                      <FieldLabel>Nomor / ID Jamaah</FieldLabel>
                      <button
                        type="button"
                        onClick={() => setJmNomorJamaah(generateAutoNomorJamaah())}
                        className="text-[10px] font-bold text-pink-600 hover:text-pink-700 underline"
                      >
                        ⚡ Auto ID
                      </button>
                    </div>
                    <StyledInput type="text" value={jmNomorJamaah} onChange={e => setJmNomorJamaah(e.target.value)} placeholder="Opsional (Auto-generate)" />
                  </div>
                  <button type="submit" disabled={jmSubmitting}
                    className="flex-none rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_DEEP})` }}>
                    {jmSubmitting ? 'Generating…' : '⚡ + Tambah & Generate Akun'}
                  </button>
                </div>

                <button type="button" onClick={() => setShowDetailJamaah(v => !v)}
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium" style={{ color: PRIMARY }}>
                  {showDetailJamaah ? '− Sembunyikan detail' : '+ Detail opsional (rombongan, bus, kamar, paspor, fase)'}
                </button>

                {showDetailJamaah && (
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div><FieldLabel>Rombongan</FieldLabel><StyledInput type="text" value={jmRombongan} onChange={e => setJmRombongan(e.target.value)} placeholder="A / 1" /></div>
                    <div><FieldLabel>No. Bus</FieldLabel><StyledInput type="text" value={jmBus} onChange={e => setJmBus(e.target.value)} placeholder="3" /></div>
                    <div><FieldLabel>No. Kamar</FieldLabel><StyledInput type="text" value={jmKamar} onChange={e => setJmKamar(e.target.value)} placeholder="812" /></div>
                    <div><FieldLabel>No. Paspor</FieldLabel><StyledInput type="text" value={jmPaspor} onChange={e => setJmPaspor(e.target.value)} placeholder="C1234567" /></div>
                    <div className="col-span-2 sm:col-span-1">
                      <FieldLabel>Fase</FieldLabel>
                      <select value={jmFase} onChange={e => setJmFase(e.target.value as JamaahAccountRow['fase'])}
                        className="w-full rounded-xl px-3 py-2.5 text-[14px] focus:outline-none"
                        style={{ border: '1px solid rgba(0,0,0,0.15)', ...inputBase }}>
                        {FASE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {jmError && <p className="mt-2 text-[12px]" style={{ color: '#dc2626' }}>{jmError}</p>}
              </form>
            </div>
          )}

          {/* List jamaah */}
          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            {jamaahLoading ? (
              <div className="py-8 text-center font-mono text-[12px]" style={{ color: '#d1d5db' }}>Memuat...</div>
            ) : !selectedKeberangkatan ? (
              <div className="py-8 text-center text-[13px]" style={{ color: '#9ca3af' }}>Pilih batch keberangkatan untuk melihat jamaah.</div>
            ) : jamaahList.length === 0 ? (
              <div className="py-8 text-center text-[13px]" style={{ color: '#9ca3af' }}>Belum ada jamaah terdaftar di batch ini.</div>
            ) : (
              <ul className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                {jamaahList.map((j) => {
                  const isEditing = editingJamaahId === j.id;
                  const chips = [
                    j.rombongan ? `Romb. ${j.rombongan}` : null,
                    j.nomor_bus ? `Bus ${j.nomor_bus}` : null,
                    j.nomor_kamar ? `Kmr ${j.nomor_kamar}` : null,
                    j.nomor_paspor ? j.nomor_paspor : null,
                  ].filter(Boolean) as string[];

                  if (isEditing) {
                    return (
                      <li key={j.id} className="px-5 py-4" style={{ background: `rgba(14,165,233,0.03)` }}>
                        <div className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4">
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>Nama</p>
                            <input value={editNama} onChange={e => setEditNama(e.target.value)}
                              className="w-full rounded-lg px-2 py-1.5 text-[13px] focus:outline-none"
                              style={{ border: `1px solid ${PRIMARY_BORDER}`, background: '#fff', color: '#111827' }} />
                          </div>
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>No. Jamaah</p>
                            <input value={editNomorJamaah} onChange={e => setEditNomorJamaah(e.target.value)}
                              className="w-full rounded-lg px-2 py-1.5 text-[12px] font-mono focus:outline-none"
                              style={{ border: `1px solid ${PRIMARY_BORDER}`, background: '#fff', color: '#374151' }} />
                          </div>
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>Rombongan</p>
                            <input value={editRombongan} onChange={e => setEditRombongan(e.target.value)} placeholder="—"
                              className="w-full rounded-lg px-2 py-1.5 text-[12px] focus:outline-none"
                              style={{ border: `1px solid ${PRIMARY_BORDER}`, background: '#fff', color: '#374151' }} />
                          </div>
                          <div>
                            <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>No. Paspor</p>
                            <input value={editPaspor} onChange={e => setEditPaspor(e.target.value)} placeholder="—"
                              className="w-full rounded-lg px-2 py-1.5 text-[12px] font-mono focus:outline-none"
                              style={{ border: `1px solid ${PRIMARY_BORDER}`, background: '#fff', color: '#374151' }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button type="button" onClick={() => saveEditJamaah(j.id)} disabled={editSaving}
                            className="font-mono text-[11px] px-4 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-60"
                            style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#fff' }}>
                            {editSaving ? 'Menyimpan...' : 'Simpan'}
                          </button>
                          <button type="button" onClick={cancelEditJamaah} disabled={editSaving}
                            className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                            style={{ color: '#9ca3af', border: '1px solid rgba(0,0,0,0.07)' }}>
                            Batal
                          </button>
                        </div>
                        {editError && <p className="mt-1 text-[12px]" style={{ color: '#dc2626' }}>{editError}</p>}
                      </li>
                    );
                  }

                  return (
                    <li key={j.id} className="flex items-center gap-3 px-5 py-3.5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13px] font-semibold" style={{ color: '#111827' }}>{j.nama}</span>
                          <span className="font-mono text-[11px]" style={{ color: '#6b7280' }}>{j.nomor_jamaah}</span>
                          <span className="inline-flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Akun UmrahMe Aktif
                          </span>
                        </div>
                        {chips.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {chips.map(chip => (
                              <span key={chip} className="font-mono text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.04)', color: '#6b7280' }}>{chip}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <select value={j.fase_override ?? ''} onChange={e => handleUpdateJamaahFase(j.id, e.target.value)}
                        className="hidden sm:block text-[11px] rounded-lg px-2 py-1 focus:outline-none transition-all flex-none"
                        style={{ border: '1px solid rgba(0,0,0,0.09)', background: '#fafaf9', color: '#374151' }}>
                        <option value="">Auto</option>
                        {FASE_OPTIONS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                      </select>
                      <div className="flex items-center gap-1.5 flex-none">
                        <button
                          type="button"
                          onClick={() => setAccountModal({
                            nama: j.nama,
                            nomorJamaah: j.nomor_jamaah,
                            kodeAktivasi: tenant.activation_code || 'DEMO01',
                            travel: tenant.nama_travel,
                            link: `${window.location.origin}/login`,
                          })}
                          className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        >
                          🔑 Akun WA
                        </button>
                        <button type="button" onClick={() => startEditJamaah(j)}
                          className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                          style={{ color: PRIMARY, border: `1px solid ${PRIMARY_BORDER}` }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = PRIMARY_BG; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDeleteJamaah(j.id, j.nama)}
                          className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                          style={{ color: '#9ca3af', border: '1px solid rgba(0,0,0,0.07)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(220,38,38,0.25)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.05)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.07)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                          Hapus
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          TAB: AGENDA
      ══════════════════════════════════════════════ */}
      {activeTab === 'agenda' && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Agenda Perjalanan</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: PRIMARY_BG, color: PRIMARY }}>{agendaItems.length} item</span>
            {selectedKeberangkatan && (
              <button type="button" onClick={() => { setAgImportOpen(o => !o); setAgImportError(''); setAgImportPreview([]); }}
                className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150"
                style={{ background: PRIMARY_BG, color: PRIMARY, border: `1px solid ${PRIMARY_BORDER}` }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Susun Itinerary dengan AI
              </button>
            )}
          </div>

          {/* Keberangkatan selector */}
          {keberangkatanList.length > 0 && (
            <div className="mb-5 flex items-center gap-3">
              <label className="font-mono text-[10px] uppercase tracking-widest flex-none" style={{ color: '#6b7280' }}>Batch:</label>
              <select value={selectedKeberangkatan} onChange={e => setSelectedKeberangkatan(e.target.value)}
                className="flex-1 rounded-xl px-3 py-2 text-[13px] focus:outline-none"
                style={{ ...inputBase, maxWidth: '360px' }}>
                {keberangkatanList.map(kb => (
                  <option key={kb.id} value={kb.id}>{kb.nama_batch}</option>
                ))}
              </select>
            </div>
          )}

          {!selectedKeberangkatan ? (
            <div className="mb-5 rounded-xl px-4 py-3 text-[12px]" style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', color: '#d97706' }}>
              Pilih batch keberangkatan untuk mengelola agenda.
            </div>
          ) : (
            <>
              {/* AI Import Panel */}
              {agImportOpen && (
                <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: `1px solid ${PRIMARY_BORDER}` }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: PRIMARY }}>Susun Itinerary dengan AI</p>
                  <p className="text-[12px] mb-4" style={{ color: '#6b7280' }}>
                    Upload file Excel, CSV, PDF, atau foto jadwal — AI ekstrak & susun itinerary otomatis. Review sebelum menyimpan.
                  </p>
                  {agImportPreview.length === 0 ? (
                    <div>
                      <button type="button" onClick={() => agImportFileRef.current?.click()} disabled={agImportLoading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl transition-all disabled:opacity-60"
                        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#fff' }}>
                        {agImportLoading ? 'AI sedang membaca...' : 'Pilih File'}
                      </button>
                      <input ref={agImportFileRef} type="file" accept=".xlsx,.xls,.csv,application/pdf,image/png,image/jpeg,image/webp" onChange={handleAgImportFile} className="hidden" />
                      <p className="mt-2 text-[10px]" style={{ color: '#9ca3af' }}>Format: Excel, CSV, PDF, PNG, JPG, WebP.</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] font-semibold" style={{ color: '#374151' }}>{agImportPreview.length} agenda terbaca — review & edit sebelum simpan:</p>
                        <button type="button" onClick={() => setAgImportPreview([])} className="text-[11px]" style={{ color: '#9ca3af' }}>Ulangi</button>
                      </div>
                      <div className="overflow-x-auto rounded-xl mb-3" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                        <table className="w-full text-[11px]">
                          <thead>
                            <tr style={{ background: '#fafaf9', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                              {['Tanggal', 'Jam', 'Judul', 'Lokasi', 'Deskripsi', ''].map(h => (
                                <th key={h} className="text-left font-mono uppercase tracking-wider px-3 py-2" style={{ color: '#9ca3af', fontSize: '10px' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {agImportPreview.map((row, idx) => (
                              <tr key={idx} style={{ borderBottom: idx < agImportPreview.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                                <td className="px-2 py-1.5"><input className="w-28 rounded px-2 py-1 text-[11px] focus:outline-none" style={{ ...inputBase }} value={row.tanggal} onChange={e => updateAgPreviewRow(idx, 'tanggal', e.target.value)} /></td>
                                <td className="px-2 py-1.5"><input className="w-20 rounded px-2 py-1 text-[11px] focus:outline-none" style={{ ...inputBase }} value={row.jam_mulai} onChange={e => updateAgPreviewRow(idx, 'jam_mulai', e.target.value)} /></td>
                                <td className="px-2 py-1.5"><input className="w-44 rounded px-2 py-1 text-[11px] focus:outline-none" style={{ ...inputBase }} value={row.judul} onChange={e => updateAgPreviewRow(idx, 'judul', e.target.value)} /></td>
                                <td className="px-2 py-1.5"><input className="w-32 rounded px-2 py-1 text-[11px] focus:outline-none" style={{ ...inputBase }} value={row.lokasi} onChange={e => updateAgPreviewRow(idx, 'lokasi', e.target.value)} /></td>
                                <td className="px-2 py-1.5"><input className="w-40 rounded px-2 py-1 text-[11px] focus:outline-none" style={{ ...inputBase }} value={row.deskripsi} onChange={e => updateAgPreviewRow(idx, 'deskripsi', e.target.value)} /></td>
                                <td className="px-2 py-1.5"><button type="button" onClick={() => removeAgPreviewRow(idx)} className="text-[11px] px-2 py-1 rounded" style={{ color: '#dc2626' }}>Hapus</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {agImportError && <p className="text-[12px] mb-2" style={{ color: '#dc2626' }}>{agImportError}</p>}
                      <div className="flex gap-2">
                        <button type="button" onClick={confirmAgImport} disabled={agImportSaving}
                          className="px-5 py-2.5 text-[12px] font-semibold rounded-xl disabled:opacity-60"
                          style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#fff' }}>
                          {agImportSaving ? 'Menyimpan...' : `Simpan ${agImportPreview.length} Agenda`}
                        </button>
                        <button type="button" onClick={() => { setAgImportOpen(false); setAgImportPreview([]); }}
                          className="px-4 py-2.5 text-[12px] rounded-xl" style={{ border: '1px solid rgba(0,0,0,0.1)', color: '#6b7280' }}>
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                  {agImportError && agImportPreview.length === 0 && <p className="mt-2 text-[12px]" style={{ color: '#dc2626' }}>{agImportError}</p>}
                </div>
              )}

              <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: `1px solid ${PRIMARY_BORDER}` }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: '#6b7280' }}>Tambah Agenda Baru</p>
                <form onSubmit={handleAddAgenda} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Tanggal <span style={{ color: '#f87171' }}>*</span></p><StyledInput type="date" value={agTanggal} onChange={e => setAgTanggal(e.target.value)} required /></div>
                    <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Jam Mulai</p><StyledInput type="time" value={agJam} onChange={e => setAgJam(e.target.value)} /></div>
                  </div>
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Judul Kegiatan <span style={{ color: '#f87171' }}>*</span></p><StyledInput type="text" value={agJudul} onChange={e => setAgJudul(e.target.value)} placeholder="Cth: Perjalanan ke Madinah" required /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Lokasi</p><StyledInput type="text" value={agLokasi} onChange={e => setAgLokasi(e.target.value)} placeholder="Bandara Soekarno-Hatta" /></div>
                    <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Deskripsi</p><StyledTextarea rows={1} value={agDeskripsi} onChange={e => setAgDeskripsi(e.target.value)} placeholder="Keterangan tambahan..." /></div>
                  </div>
                  {agError && <p className="text-[12px]" style={{ color: '#dc2626' }}>{agError}</p>}
                  <button type="submit" disabled={agSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl transition-all duration-150 disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#ffffff', boxShadow: '0 2px 8px rgba(14,165,233,0.22)' }}>
                    {agSubmitting ? (
                      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    )}
                    Tambah Agenda
                  </button>
                </form>
              </div>

              {agEditSuccess && (
                <div className="mb-3 rounded-xl px-4 py-2.5 text-[12px] font-medium flex items-center gap-2"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#059669' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {agEditSuccess}
                </div>
              )}

              <div className="rounded-2xl overflow-hidden" style={cardStyle}>
                {agendaLoading ? (
                  <div className="py-10 text-center font-mono text-[12px]" style={{ color: '#d1d5db' }}>Memuat agenda...</div>
                ) : agendaItems.length === 0 ? (
                  <div className="py-10 text-center"><p className="text-[13px]" style={{ color: '#9ca3af' }}>Belum ada agenda.</p></div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#fafaf9' }}>
                        {['Tanggal', 'Jam', 'Judul', 'Lokasi', ''].map(h => (
                          <th key={h} className="text-left font-mono text-[10px] uppercase tracking-[0.12em] px-5 py-3" style={{ color: '#9ca3af' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {agendaItems.map((item, i) => (
                        <React.Fragment key={item.id}>
                          {/* Read-only row */}
                          <tr style={{ borderBottom: agEditingId === item.id ? 'none' : (i < agendaItems.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none') }}>
                            <td className="px-5 py-3.5 text-[13px] font-medium whitespace-nowrap" style={{ color: '#374151' }}>{formatTanggal(item.tanggal)}</td>
                            <td className="px-5 py-3.5 font-mono text-[12px]" style={{ color: '#6b7280' }}>{item.jam_mulai ? item.jam_mulai.slice(0, 5) : '—'}</td>
                            <td className="px-5 py-3.5">
                              <p className="text-[13px] font-semibold" style={{ color: '#111827' }}>{item.judul}</p>
                              {item.deskripsi && <p className="text-[11px] mt-0.5" style={{ color: '#9ca3af' }}>{item.deskripsi}</p>}
                            </td>
                            <td className="px-5 py-3.5 text-[12px]" style={{ color: '#6b7280' }}>{item.lokasi ?? '—'}</td>
                            <td className="px-5 py-3.5 text-right">
                              <button type="button"
                                onClick={() => agEditingId === item.id ? handleCancelAgEdit() : handleStartAgEdit(item)}
                                disabled={agEditSaving}
                                className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-40"
                                style={agEditingId === item.id
                                  ? { color: PRIMARY, border: `1px solid ${PRIMARY_BORDER}`, background: PRIMARY_BG }
                                  : { color: '#6b7280', border: '1px solid rgba(0,0,0,0.09)' }}
                                onMouseEnter={e => { if (agEditingId !== item.id && !agEditSaving) { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; (e.currentTarget as HTMLButtonElement).style.borderColor = PRIMARY_BORDER; (e.currentTarget as HTMLButtonElement).style.background = PRIMARY_BG; } }}
                                onMouseLeave={e => { if (agEditingId !== item.id && !agEditSaving) { (e.currentTarget as HTMLButtonElement).style.color = '#6b7280'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.09)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; } }}>
                                {agEditingId === item.id ? 'Tutup' : 'Edit'}
                              </button>
                            </td>
                          </tr>
                          {/* Inline edit row */}
                          {agEditingId === item.id && (
                            <tr style={{ borderBottom: i < agendaItems.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                              <td colSpan={5} style={{ padding: '16px 20px 20px', background: 'var(--surface-1, #f8fafc)', borderTop: `1px solid ${PRIMARY_BORDER}` }}>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Tanggal <span style={{ color: '#f87171' }}>*</span></p>
                                    <StyledInput type="date" value={agEditFields.tanggal} onChange={e => setAgEditFields(f => ({ ...f, tanggal: e.target.value }))} />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Jam Mulai</p>
                                    <StyledInput type="time" value={agEditFields.jam_mulai} onChange={e => setAgEditFields(f => ({ ...f, jam_mulai: e.target.value }))} />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Urutan</p>
                                    <StyledInput type="number" value={agEditFields.urutan} onChange={e => setAgEditFields(f => ({ ...f, urutan: Number(e.target.value) }))} />
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Judul Kegiatan <span style={{ color: '#f87171' }}>*</span></p>
                                  <StyledInput type="text" value={agEditFields.judul} onChange={e => setAgEditFields(f => ({ ...f, judul: e.target.value }))} />
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Lokasi</p>
                                    <StyledInput type="text" value={agEditFields.lokasi} onChange={e => setAgEditFields(f => ({ ...f, lokasi: e.target.value }))} />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Deskripsi</p>
                                    <StyledTextarea rows={2} value={agEditFields.deskripsi} onChange={e => setAgEditFields(f => ({ ...f, deskripsi: e.target.value }))} />
                                  </div>
                                </div>
                                {agEditError && <p className="text-[12px] mb-2" style={{ color: '#dc2626' }}>{agEditError}</p>}
                                <div className="flex items-center gap-2">
                                  <button type="button" onClick={handleSaveAgEdit} disabled={agEditSaving}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150 disabled:opacity-60"
                                    style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#fff', boxShadow: '0 2px 6px rgba(14,165,233,0.22)' }}>
                                    {agEditSaving && <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>}
                                    {agEditSaving ? 'Menyimpan...' : 'Simpan'}
                                  </button>
                                  <button type="button" onClick={handleCancelAgEdit} disabled={agEditSaving}
                                    className="px-4 py-2 text-[12px] rounded-xl transition-all duration-150"
                                    style={{ border: '1px solid rgba(0,0,0,0.1)', color: '#6b7280' }}>
                                    Batal
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          TAB: PENGUMUMAN
      ══════════════════════════════════════════════ */}
      {activeTab === 'pengumuman' && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Pengumuman Travel</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: PRIMARY_BG, color: PRIMARY }}>{announcements.length} item</span>
          </div>

          {/* Keberangkatan selector */}
          {keberangkatanList.length > 0 && (
            <div className="mb-5 flex items-center gap-3">
              <label className="font-mono text-[10px] uppercase tracking-widest flex-none" style={{ color: '#6b7280' }}>Batch:</label>
              <select value={selectedKeberangkatan} onChange={e => setSelectedKeberangkatan(e.target.value)}
                className="flex-1 rounded-xl px-3 py-2 text-[13px] focus:outline-none"
                style={{ ...inputBase, maxWidth: '360px' }}>
                {keberangkatanList.map(kb => (
                  <option key={kb.id} value={kb.id}>{kb.nama_batch}</option>
                ))}
              </select>
            </div>
          )}

          {!selectedKeberangkatan ? (
            <div className="mb-5 rounded-xl px-4 py-3 text-[12px]" style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', color: '#d97706' }}>
              Pilih batch keberangkatan untuk mengelola pengumuman.
            </div>
          ) : (
            <>
              <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: `1px solid ${PRIMARY_BORDER}` }}>
                <form onSubmit={handleAddAnnouncement} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Label</p><StyledInput type="text" value={annLabel} onChange={e => setAnnLabel(e.target.value)} placeholder="Info / Penting / Darurat" /></div>
                    <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Judul <span style={{ color: '#f87171' }}>*</span></p><StyledInput type="text" value={annTitle} onChange={e => setAnnTitle(e.target.value)} required placeholder="Perubahan jadwal..." maxLength={120} /></div>
                  </div>
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Isi Pengumuman <span style={{ color: '#f87171' }}>*</span></p><StyledTextarea rows={3} value={annContent} onChange={e => setAnnContent(e.target.value)} required placeholder="Detail pengumuman untuk jamaah..." maxLength={1000} /></div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={annImportant} onChange={e => setAnnImportant(e.target.checked)} className="rounded" />
                    <span className="text-[12px]" style={{ color: '#374151' }}>Tandai sebagai penting</span>
                  </label>
                  {annError && <p className="text-[12px]" style={{ color: '#dc2626' }}>{annError}</p>}
                  <button type="submit" disabled={annSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl transition-all duration-150 disabled:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DEEP} 100%)`, color: '#ffffff', boxShadow: '0 2px 8px rgba(14,165,233,0.22)' }}>
                    {annSubmitting ? 'Mengirim...' : 'Kirim Pengumuman'}
                  </button>
                </form>
              </div>

              <div className="rounded-2xl overflow-hidden" style={cardStyle}>
                {annLoading ? (
                  <div className="py-8 text-center font-mono text-[12px]" style={{ color: '#d1d5db' }}>Memuat...</div>
                ) : announcements.length === 0 ? (
                  <div className="py-8 text-center text-[13px]" style={{ color: '#9ca3af' }}>Belum ada pengumuman.</div>
                ) : (
                  <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                    {announcements.map(ann => (
                      <div key={ann.id} className="px-5 py-4 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                              style={{ background: ann.important ? 'rgba(239,68,68,0.08)' : PRIMARY_BG, color: ann.important ? '#dc2626' : PRIMARY }}>
                              {ann.label}
                            </span>
                            <span className="font-mono text-[10px]" style={{ color: '#9ca3af' }}>{formatDatetime(ann.published_at)}</span>
                          </div>
                          <p className="text-[13px] font-semibold truncate" style={{ color: '#111827' }}>{ann.title}</p>
                          <p className="text-[12px] mt-0.5 line-clamp-2" style={{ color: '#6b7280' }}>{ann.content}</p>
                        </div>
                        <button type="button" onClick={() => handleDeleteAnnouncement(ann.id, ann.title)}
                          className="flex-none font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                          style={{ color: '#9ca3af', border: '1px solid rgba(0,0,0,0.07)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(220,38,38,0.25)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.05)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.07)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── MODAL OTOMATIS GENERATE AKUN UMRAHME ── */}
      {accountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs font-sans">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5 animate-fade-up">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="h-14 w-14 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center mx-auto shadow-xs">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display font-black text-xl text-stone-900 leading-tight">
                Akun UmrahMe Berhasil Di-generate! 🎉
              </h3>
              <p className="text-xs text-stone-500 font-normal">
                Akun digital jamaah aktif otomatis di sistem {accountModal.travel}.
              </p>
            </div>

            {/* Detail Credential Box */}
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-4 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-normal">Nama Jamaah:</span>
                <strong className="text-stone-900 font-extrabold">{accountModal.nama}</strong>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-normal">ID / Nomor Jamaah:</span>
                <strong className="text-pink-600 font-mono font-bold">{accountModal.nomorJamaah}</strong>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-500 font-normal">Kode Aktivasi Travel:</span>
                <strong className="text-stone-900 font-mono font-bold">{accountModal.kodeAktivasi}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-normal">Link Login Akses:</span>
                <a href={accountModal.link} target="_blank" rel="noreferrer" className="text-pink-600 font-bold truncate max-w-[200px] hover:underline">
                  {accountModal.link}
                </a>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Assalamu'alaikum Wr. Wb. Bpk/Ibu *${accountModal.nama}*,\n\nBerikut kredensial Akun Digital UmrahMe resmi dari *${accountModal.travel}*:\n\n👤 *Nama*: ${accountModal.nama}\n💳 *ID Jamaah*: ${accountModal.nomorJamaah}\n🔑 *Kode Aktivasi*: ${accountModal.kodeAktivasi}\n🌐 *Link Login*: ${accountModal.link}\n\nSilakan masukkan Nama & Kode Aktivasi di atas untuk mengakses Kartu Digital, Jadwal, & Panduan Umrah Anda.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Kirim Akun via WhatsApp Jamaah</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = `Assalamu'alaikum Wr. Wb. Bpk/Ibu *${accountModal.nama}*,\nBerikut kredensial Akun Digital UmrahMe resmi dari *${accountModal.travel}*:\n\n👤 Nama: ${accountModal.nama}\n💳 ID Jamaah: ${accountModal.nomorJamaah}\n🔑 Kode Aktivasi: ${accountModal.kodeAktivasi}\n🌐 Link Login: ${accountModal.link}`;
                    navigator.clipboard.writeText(text);
                    setCopyStatus(true);
                    setTimeout(() => setCopyStatus(false), 2000);
                  }}
                  className="flex-1 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 text-xs font-semibold transition"
                >
                  {copyStatus ? '✓ Tersalin!' : '📋 Salin Teks Kredensial'}
                </button>
                <button
                  type="button"
                  onClick={() => setAccountModal(null)}
                  className="h-10 px-5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </TravelLayout>
  );
}
