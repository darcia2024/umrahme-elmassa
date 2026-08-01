import React from 'react';
import { useState, useEffect, useRef, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  fetchTenant, createTenant, updateTenant,
  fetchAgenda, createAgenda, deleteAgenda,
  fetchAnnouncements, createAnnouncement, deleteAnnouncement,
  fetchJamaah, createJamaah, updateJamaah, deleteJamaah, bulkInsertJamaah,
  fetchTravelAccounts, createTravelAccount, revokeTravelAccess,
  fetchKeberangkatan, createKeberangkatan, updateKeberangkatan, deleteKeberangkatan,
  uploadLogo as apiUploadLogo,
  uploadHeroImage as apiUploadHeroImage,
  uploadSertifikatTemplate as apiUploadSertifikatTemplate,
  type TenantRow, type AgendaItemRow, type TravelAnnouncementRow, type JamaahAccountRow, type TenantUserRow, type KeberangkatanRow,
  type SertifikatLayout, type SertifikatField,
  DEFAULT_SERTIFIKAT_LAYOUT,
  supabase,
} from '../../lib/supabase';
import { darkenHex, generateActivationCode } from '../../lib/colorUtils';
import { PUBLIC_HOST, slugUrl } from '@/config/site';
import { insertAgendaDummy } from '../../data/agendaDummy';

const MAX_LOGO_SIZE = 1024 * 1024;

function isValidHex(val: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(val);
}

function normalizePhone(val: string) {
  return val.replace(/[^\d+]/g, '');
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: '#6b7280' }}>{children}</label>;
}

const inputBase: React.CSSProperties = {
  border: '1px solid rgba(0,0,0,0.09)',
  background: '#fafaf9',
  color: '#111827',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
};

const StyledInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function StyledInput(props, ref) {
    return (
      <input {...props} ref={ref}
        className={`w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 focus:outline-none ${props.className ?? ''}`}
        style={{ ...inputBase, ...props.style }}
        onFocus={e => { e.currentTarget.style.border = '1px solid #4338ca'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,56,202,0.10)'; e.currentTarget.style.background = '#ffffff'; props.onFocus?.(e); }}
        onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; props.onBlur?.(e); }} />
    );
  }
);

function StyledTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props}
      className={`w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 focus:outline-none resize-none ${props.className ?? ''}`}
      style={{ ...inputBase, ...props.style }}
      onFocus={e => { e.currentTarget.style.border = '1px solid #4338ca'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,56,202,0.10)'; e.currentTarget.style.background = '#ffffff'; props.onFocus?.(e); }}
      onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; props.onBlur?.(e); }} />
  );
}

function SectionDivider() { return <div style={{ height: '1px', background: 'rgba(0,0,0,0.04)' }} />; }

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
};

const FASE_OPTIONS: { value: JamaahAccountRow['fase']; label: string }[] = [
  { value: 'persiapan', label: 'Persiapan' },
  { value: 'tanah-suci', label: 'Di Tanah Suci' },
  { value: 'selesai', label: 'Selesai' },
];

type TabId = 'profil' | 'keberangkatan' | 'jamaah' | 'agenda' | 'pengumuman' | 'akun';

const TABS: { id: TabId; label: string }[] = [
  { id: 'profil', label: 'Profil & Branding' },
  { id: 'keberangkatan', label: 'Keberangkatan' },
  { id: 'jamaah', label: 'Jamaah' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'pengumuman', label: 'Pengumuman' },
  { id: 'akun', label: 'Akun Travel' },
];

function generatePassword(len = 14): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  return Array.from(crypto.getRandomValues(new Uint32Array(len)))
    .map((n) => chars[n % chars.length]).join('');
}

export default function AdminTenantForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'baru';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabId>('profil');

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [dateError, setDateError] = useState('');

  const [namaTravel, setNamaTravel] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#0ea5e9');
  const [primaryDeepColor, setPrimaryDeepColor] = useState('');
  const [heroTextColor, setHeroTextColor] = useState('#ffffff');
  const [pageTitle, setPageTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugCopied, setSlugCopied] = useState(false);
  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>('');
  const [existingHeroUrl, setExistingHeroUrl] = useState<string>('');
  const heroInputRef = useRef<HTMLInputElement>(null);
  const MAX_HERO_SIZE = 3 * 1024 * 1024;

  const [sertifikatFile, setSertifikatFile] = useState<File | null>(null);
  const [sertifikatPreview, setSertifikatPreview] = useState<string>('');
  const [existingSertifikatUrl, setExistingSertifikatUrl] = useState<string>('');
  const sertifikatInputRef = useRef<HTMLInputElement>(null);
  const MAX_SERTIFIKAT_SIZE = 5 * 1024 * 1024;
  const sertifikatCanvasRef = useRef<HTMLDivElement>(null);
  const [sertifikatLayout, setSertifikatLayout] = useState<SertifikatLayout>(DEFAULT_SERTIFIKAT_LAYOUT);
  const [selectedLayoutField, setSelectedLayoutField] = useState<string | null>(null);
  const [layoutSaving, setLayoutSaving] = useState(false);
  const [layoutSaveMsg, setLayoutSaveMsg] = useState('');

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

  const [agendaItems, setAgendaItems] = useState<AgendaItemRow[]>([]);
  const [agendaLoading, setAgendaLoading] = useState(false);
  const [agJudul, setAgJudul] = useState('');
  const [agTanggal, setAgTanggal] = useState('');
  const [agJam, setAgJam] = useState('');
  const [agDeskripsi, setAgDeskripsi] = useState('');
  const [agLokasi, setAgLokasi] = useState('');
  const [agSubmitting, setAgSubmitting] = useState(false);
  const [agError, setAgError] = useState('');
  const [dummyLoading, setDummyLoading] = useState(false);

  const [editingAgendaId, setEditingAgendaId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({ tanggal: '', jam_mulai: '', judul: '', deskripsi: '', lokasi: '', urutan: 0 });
  const [agEditSaving, setAgEditSaving] = useState(false);
  const [agEditError, setAgEditError] = useState('');
  const [agEditSuccess, setAgEditSuccess] = useState('');

  const [announcements, setAnnouncements] = useState<TravelAnnouncementRow[]>([]);
  const [annLoading, setAnnLoading] = useState(false);
  const [annLabel, setAnnLabel] = useState('Info');
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annImportant, setAnnImportant] = useState(false);
  const [annSubmitting, setAnnSubmitting] = useState(false);
  const [annError, setAnnError] = useState('');

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

  const [travelAccounts, setTravelAccounts] = useState<TenantUserRow[]>([]);
  const [travelAccountsLoading, setTravelAccountsLoading] = useState(false);
  const [taEmail, setTaEmail] = useState('');
  const [taPassword, setTaPassword] = useState('');
  const [taSubmitting, setTaSubmitting] = useState(false);
  const [taError, setTaError] = useState('');
  const [taSuccess, setTaSuccess] = useState('');

  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState('');
  const [ocrResult, setOcrResult] = useState<Record<string, string | null> | null>(null);

  const [importOpen, setImportOpen] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState('');
  const [importPreview, setImportPreview] = useState<Array<{ nama: string; nomor_jamaah: string; rombongan: string; nomor_paspor: string }>>([]);
  const [importSaving, setImportSaving] = useState(false);
  const importFileRef = useRef<HTMLInputElement>(null);

  const [agImportOpen, setAgImportOpen] = useState(false);
  const [agImportLoading, setAgImportLoading] = useState(false);
  const [agImportError, setAgImportError] = useState('');
  const [agImportPreview, setAgImportPreview] = useState<Array<{ tanggal: string; jam_mulai: string; judul: string; lokasi: string; deskripsi: string; urutan: number }>>([]);
  const [agImportSaving, setAgImportSaving] = useState(false);
  const agImportFileRef = useRef<HTMLInputElement>(null);

  const loadTravelAccounts = useCallback(async () => {
    if (!id || isNew) return;
    setTravelAccountsLoading(true);
    fetchTravelAccounts(id).then(setTravelAccounts).catch(() => {}).finally(() => setTravelAccountsLoading(false));
  }, [id, isNew]);

  const loadKeberangkatan = useCallback(async () => {
    if (!id || isNew) return;
    setKeberangkatanLoading(true);
    fetchKeberangkatan(id).then(list => {
      setKeberangkatanList(list);
      if (list.length > 0 && !selectedKeberangkatan) setSelectedKeberangkatan(list[0].id);
    }).catch(() => {}).finally(() => setKeberangkatanLoading(false));
  }, [id, isNew, selectedKeberangkatan]);

  const loadAgenda = useCallback(async () => {
    if (!id || isNew || !selectedKeberangkatan) return;
    setAgendaLoading(true);
    fetchAgenda(selectedKeberangkatan).then(setAgendaItems).catch(() => {}).finally(() => setAgendaLoading(false));
  }, [id, isNew, selectedKeberangkatan]);

  const loadAnnouncements = useCallback(async () => {
    if (!id || isNew || !selectedKeberangkatan) return;
    setAnnLoading(true);
    fetchAnnouncements(selectedKeberangkatan).then(setAnnouncements).catch(() => {}).finally(() => setAnnLoading(false));
  }, [id, isNew, selectedKeberangkatan]);

  const loadJamaah = useCallback(async () => {
    if (!id || isNew || !selectedKeberangkatan) return;
    setJamaahLoading(true);
    fetchJamaah(selectedKeberangkatan).then(setJamaahList).catch(() => {}).finally(() => setJamaahLoading(false));
  }, [id, isNew, selectedKeberangkatan]);

  useEffect(() => {
    if (!isNew && id) {
      fetchTenant(id)
        .then((t: TenantRow) => {
          setNamaTravel(t.nama_travel);
          setActivationCode(t.activation_code);
          setPrimaryColor(t.primary_color);
          setPrimaryDeepColor(t.primary_deep_color);
          setHeroTextColor(t.hero_text_color ?? '#ffffff');
          setPageTitle(t.page_title);
          setSlug(t.slug ?? '');
          setExistingLogoUrl(t.logo_url);
          setExistingHeroUrl(t.hero_image_url ?? '');
          setExistingSertifikatUrl(t.sertifikat_template_url ?? '');
          if (t.sertifikat_layout) setSertifikatLayout(t.sertifikat_layout);
        })
        .catch(err => setError(err instanceof Error ? err.message : 'Tenant tidak ditemukan.'))
        .finally(() => setLoading(false));
      loadKeberangkatan();
      loadTravelAccounts();
    }
  }, [id, isNew, loadKeberangkatan, loadTravelAccounts]);

  useEffect(() => {
    if (selectedKeberangkatan) {
      loadAgenda();
      loadAnnouncements();
      loadJamaah();
    }
  }, [selectedKeberangkatan, loadAgenda, loadAnnouncements, loadJamaah]);

  async function handleOcrPoster(file: File) {
    setOcrLoading(true);
    setOcrError('');
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data: { session: ocrSession } } = await supabase.auth.getSession();
      const ocrAuthHeader: Record<string, string> = ocrSession?.access_token ? { Authorization: `Bearer ${ocrSession.access_token}` } : {};
      const response = await fetch('/api/ai-ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...ocrAuthHeader },
        body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
      });

      const result = await response.json();
      if (!result.ok) throw new Error(result.error);

      const d = result.data as Record<string, string | null>;
      setOcrResult(d);

      if (d.nama_travel) { setNamaTravel(d.nama_travel); if (!pageTitle || pageTitle === buildDefaultTitle(namaTravel)) setPageTitle(buildDefaultTitle(d.nama_travel)); }
      if (d.tanggal_keberangkatan) setKbTanggalBerangkat(d.tanggal_keberangkatan);
      if (d.tanggal_kepulangan) setKbTanggalPulang(d.tanggal_kepulangan);
      if (d.hotel_makkah) setKbHotelMakkah(d.hotel_makkah);
      if (d.hotel_madinah) setKbHotelMadinah(d.hotel_madinah);
      if (d.guide_name) setKbGuideName(d.guide_name);
      if (d.guide_whatsapp) setKbGuideWhatsapp(d.guide_whatsapp);
      if (d.tour_leader_name) setKbTourLeaderName(d.tour_leader_name);
      if (d.tour_leader_whatsapp) setKbTourLeaderWhatsapp(d.tour_leader_whatsapp);
      if (d.meeting_point) setKbMeetingPoint(d.meeting_point);
      if (d.catatan) setKbEmergencyNote(d.catatan);
      setKbFormOpen(true);
      setActiveTab('keberangkatan');
    } catch (err) {
      setOcrError(err instanceof Error ? err.message : 'Gagal membaca poster.');
    } finally {
      setOcrLoading(false);
    }
  }

  function handleNamaChange(val: string) {
    setNamaTravel(val);
    if (!pageTitle || pageTitle === buildDefaultTitle(namaTravel)) setPageTitle(buildDefaultTitle(val));
  }

  function buildDefaultTitle(nama: string) { return nama ? `${nama} — Pendamping Umrah Anda` : ''; }
  function formatSlug(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  function handleColorChange(val: string) { setPrimaryColor(val); if (!primaryDeepColor) setPrimaryDeepColor(darkenHex(val)); }

  function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_LOGO_SIZE) { setError('Ukuran logo maksimal 1MB.'); return; }
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Logo harus berupa PNG, JPG, atau WEBP. SVG tidak diizinkan.');
      return;
    }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = ev => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleSertifikatChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SERTIFIKAT_SIZE) { setError('Ukuran template sertifikat maksimal 5MB.'); return; }
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Template sertifikat harus PNG, JPG, atau WEBP.');
      return;
    }
    setSertifikatFile(file);
    const reader = new FileReader();
    reader.onload = ev => setSertifikatPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function fontFamilyToCss(f: SertifikatField['fontFamily']): string {
    switch (f) {
      case 'display': return "'Bricolage Grotesque', sans-serif";
      case 'mono':    return "'JetBrains Mono', monospace";
      case 'arab':    return "'Amiri', serif";
      default:        return "'Inter', sans-serif";
    }
  }

  function startDrag(e: React.PointerEvent, key: string) {
    e.preventDefault();
    setSelectedLayoutField(key);
    const canvas = sertifikatCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    function move(ev: PointerEvent) {
      const x = Math.min(100, Math.max(0, ((ev.clientX - rect.left) / rect.width) * 100));
      const y = Math.min(100, Math.max(0, ((ev.clientY - rect.top) / rect.height) * 100));
      setSertifikatLayout(prev => ({
        fields: prev.fields.map(f => f.key === key ? { ...f, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 } : f),
      }));
    }
    function up() {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  function updateSelectedField(patch: Partial<SertifikatField>) {
    if (!selectedLayoutField) return;
    setSertifikatLayout(prev => ({
      fields: prev.fields.map(f => f.key === selectedLayoutField ? { ...f, ...patch } : f),
    }));
  }

  async function saveSertifikatLayout() {
    if (!id || isNew) return;
    setLayoutSaving(true);
    setLayoutSaveMsg('');
    try {
      await updateTenant(id, { sertifikat_layout: sertifikatLayout });
      setLayoutSaveMsg('Tata letak tersimpan ✓');
      setTimeout(() => setLayoutSaveMsg(''), 3000);
    } catch (err) {
      setLayoutSaveMsg(err instanceof Error ? err.message : 'Gagal menyimpan.');
    } finally {
      setLayoutSaving(false);
    }
  }

  const LAYOUT_PREVIEW_TEXT: Record<string, string> = {
    nama: 'Budi Santoso',
    nomor: 'TU-2026-001',
    tanggal: '15 Februari 2026',
    nomor_sertifikat: 'UMR/2026/00123',
    nama_travel: 'Nama Travel',
    judul: 'Sertifikat Umrah',
    subjudul: 'Dengan ini menerangkan bahwa',
    keterangan: 'telah menunaikan ibadah umrah',
  };

  function handleHeroChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_HERO_SIZE) { setError('Ukuran hero image maksimal 3MB.'); return; }
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Hero image harus berupa PNG, JPG, atau WEBP.');
      return;
    }
    setHeroFile(file);
    const reader = new FileReader();
    reader.onload = ev => setHeroPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setCodeError('');
    if (!isValidHex(primaryColor)) {
      setError('Warna primary harus berupa hex valid, contoh: #0ea5e9');
      return;
    }
    setSubmitting(true);
    try {
      let logoUrl = existingLogoUrl;
      if (logoFile) logoUrl = await apiUploadLogo(logoFile);
      let heroImageUrl = existingHeroUrl;
      if (heroFile) heroImageUrl = await apiUploadHeroImage(heroFile);
      let sertifikatTemplateUrl = existingSertifikatUrl;
      if (sertifikatFile) sertifikatTemplateUrl = await apiUploadSertifikatTemplate(sertifikatFile);
      const deepColor = primaryDeepColor || darkenHex(primaryColor);
      const finalTitle = pageTitle || buildDefaultTitle(namaTravel);
      const payload = {
        nama_travel: namaTravel.trim(),
        primary_color: primaryColor,
        primary_deep_color: deepColor,
        hero_text_color: heroTextColor,
        logo_url: logoUrl,
        hero_image_url: heroImageUrl || null,
        sertifikat_template_url: sertifikatTemplateUrl || null,
        page_title: finalTitle,
        slug: slug.trim() ? slug.trim() : null,
      };
      if (isNew) {
        await createTenant({ ...payload, activation_code: activationCode.trim().toUpperCase() });
        sessionStorage.setItem('admin_toast', `Tenant "${namaTravel}" berhasil dibuat.`);
      } else {
        await updateTenant(id!, payload);
        sessionStorage.setItem('admin_toast', `Tenant "${namaTravel}" berhasil diperbarui.`);
      }
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan.';
      if (/tenants_slug_unique|duplicate key|unique/i.test(msg)) {
        setError(`Slug "${slug}" sudah dipakai travel lain. Silakan pilih slug lain.`);
      } else {
        setError(msg);
      }
      setSubmitting(false);
    }
  }

  async function handleAddAgenda(e: FormEvent) {
    e.preventDefault();
    setAgError('');
    if (!selectedKeberangkatan) { setAgError('Pilih atau buat keberangkatan dulu sebelum menambah agenda.'); return; }
    if (!agJudul.trim() || !agTanggal) { setAgError('Tanggal dan judul wajib diisi.'); return; }
    setAgSubmitting(true);
    try {
      await createAgenda(id!, selectedKeberangkatan, { tanggal: agTanggal, jam_mulai: agJam || null, judul: agJudul.trim(), deskripsi: agDeskripsi.trim() || null, lokasi: agLokasi.trim() || null, urutan: 0 });
      setAgJudul(''); setAgTanggal(''); setAgJam(''); setAgDeskripsi(''); setAgLokasi('');
      await loadAgenda();
    } catch (err: unknown) { setAgError(err instanceof Error ? err.message : 'Gagal menambah agenda.'); }
    setAgSubmitting(false);
  }

  async function handleDeleteAgenda(agendaId: string, judul: string) {
    if (!window.confirm(`Hapus agenda "${judul}"?`)) return;
    await deleteAgenda(id!, agendaId);
    await loadAgenda();
  }

  function handleStartEdit(item: AgendaItemRow) {
    setEditingAgendaId(item.id);
    setEditFields({
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

  function handleCancelEdit() {
    setEditingAgendaId(null);
    setAgEditError('');
    setAgEditSuccess('');
  }

  async function handleSaveEdit() {
    if (!editingAgendaId || !id) return;
    if (!editFields.tanggal.trim() || !editFields.judul.trim()) {
      setAgEditError('Tanggal dan judul wajib diisi.');
      return;
    }
    setAgEditSaving(true);
    setAgEditError('');
    try {
      const { error } = await supabase
        .from('agenda_items')
        .update({
          tanggal: editFields.tanggal.trim(),
          jam_mulai: editFields.jam_mulai.trim() || null,
          judul: editFields.judul.trim(),
          deskripsi: editFields.deskripsi.trim() || null,
          lokasi: editFields.lokasi.trim() || null,
          urutan: editFields.urutan,
        })
        .eq('id', editingAgendaId)
        .eq('tenant_id', id)
        .eq('keberangkatan_id', selectedKeberangkatan);
      if (error) throw error;
      setEditingAgendaId(null);
      await loadAgenda();
      setAgEditSuccess('Agenda berhasil diperbarui.');
      setTimeout(() => setAgEditSuccess(''), 3000);
    } catch (err: unknown) {
      setAgEditError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan.');
    } finally {
      setAgEditSaving(false);
    }
  }

  async function handleInsertDummy() {
    if (!id || isNew) return;
    if (!window.confirm('Tambah itinerary demo (10 hari)? Ini akan menambah banyak agenda baru.')) return;
    setDummyLoading(true);
    const result = await insertAgendaDummy(id, selectedKeberangkatan);
    setDummyLoading(false);
    if (result.error) { setAgError(result.error); } else { await loadAgenda(); }
  }

  async function handleAddAnnouncement(e: FormEvent) {
    e.preventDefault();
    setAnnError('');
    if (!selectedKeberangkatan) { setAnnError('Pilih atau buat keberangkatan dulu sebelum menambah pengumuman.'); return; }
    if (!annTitle.trim() || !annContent.trim()) { setAnnError('Judul dan isi pengumuman wajib diisi.'); return; }
    setAnnSubmitting(true);
    try {
      await createAnnouncement(id!, selectedKeberangkatan, { label: annLabel.trim() || 'Info', title: annTitle.trim(), content: annContent.trim(), important: annImportant });
      setAnnLabel('Info'); setAnnTitle(''); setAnnContent(''); setAnnImportant(false);
      await loadAnnouncements();
    } catch (err: unknown) { setAnnError(err instanceof Error ? err.message : 'Gagal membuat pengumuman.'); }
    setAnnSubmitting(false);
  }

  async function handleDeleteAnnouncement(annId: string, title: string) {
    if (!window.confirm(`Hapus pengumuman "${title}"?`)) return;
    await deleteAnnouncement(id!, annId);
    await loadAnnouncements();
  }

  async function handleAddJamaah(e: FormEvent) {
    e.preventDefault();
    setJmError('');
    if (!jmNama.trim()) { setJmError('Nama jamaah wajib diisi.'); return; }
    if (!jmNomorJamaah.trim()) { setJmError('Nomor jamaah wajib diisi.'); return; }
    setJmSubmitting(true);
    try {
      await createJamaah(id!, selectedKeberangkatan, { nama: jmNama.trim(), nomor_jamaah: jmNomorJamaah.trim(), rombongan: jmRombongan.trim() || null, nomor_bus: jmBus.trim() || null, nomor_kamar: jmKamar.trim() || null, nomor_paspor: jmPaspor.trim() || null, fase: jmFase });
      setJmNama(''); setJmNomorJamaah(''); setJmRombongan(''); setJmBus(''); setJmKamar(''); setJmPaspor(''); setJmFase('persiapan');
      await loadJamaah();
      namaRef.current?.focus();
    } catch (err: unknown) { setJmError(err instanceof Error ? err.message : 'Gagal menambah jamaah.'); }
    setJmSubmitting(false);
  }

  async function handleDeleteJamaah(jamaahId: string, nama: string) {
    if (!window.confirm(`Hapus jamaah "${nama}"? Jamaah ini tidak bisa login lagi.`)) return;
    await deleteJamaah(id!, jamaahId);
    await loadJamaah();
  }

  async function handleUpdateJamaahFase(jamaahId: string, val: string) {
    const fase_override = (val === '' ? null : val) as JamaahAccountRow['fase'] | null;
    await updateJamaah(id!, jamaahId, { fase_override } as Partial<JamaahAccountRow>);
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

  function cancelEditJamaah() {
    setEditingJamaahId(null);
    setEditError('');
  }

  async function saveEditJamaah(jamaahId: string) {
    if (!editNama.trim()) { setEditError('Nama wajib diisi.'); return; }
    if (!editNomorJamaah.trim()) { setEditError('No. Jamaah wajib diisi.'); return; }
    setEditSaving(true);
    setEditError('');
    try {
      const payload = {
        nama: editNama.trim(),
        nomor_jamaah: editNomorJamaah.trim(),
        rombongan: editRombongan.trim() || null,
        nomor_paspor: editPaspor.trim() || null,
      };
      await updateJamaah(id!, jamaahId, payload as Partial<JamaahAccountRow>);
      setJamaahList(prev => prev.map(j => j.id === jamaahId ? { ...j, ...payload } : j));
      setEditingJamaahId(null);
    } catch (err: unknown) {
      setEditError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan.');
    } finally {
      setEditSaving(false);
    }
  }

  async function handleImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError('');
    setImportLoading(true);
    setImportPreview([]);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      let result: Array<{ nama?: unknown; nomor_jamaah?: unknown; rombongan?: unknown; nomor_paspor?: unknown }> = [];

      if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const { data: { session: importSession } } = await supabase.auth.getSession();
        const importAuthHeader: Record<string, string> = importSession?.access_token ? { Authorization: `Bearer ${importSession.access_token}` } : {};
        const resp = await fetch('/api/ai-extract-jamaah', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...importAuthHeader },
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
        const { data: { session: importSession2 } } = await supabase.auth.getSession();
        const importAuthHeader2: Record<string, string> = importSession2?.access_token ? { Authorization: `Bearer ${importSession2.access_token}` } : {};
        const resp = await fetch('/api/ai-extract-jamaah', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...importAuthHeader2 },
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
    } catch (err: unknown) {
      setImportError(err instanceof Error ? err.message : 'Gagal memproses file.');
    } finally {
      setImportLoading(false);
      if (importFileRef.current) importFileRef.current.value = '';
    }
  }

  function updatePreviewRow(idx: number, field: string, value: string) {
    setImportPreview(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  }

  function removePreviewRow(idx: number) {
    setImportPreview(prev => prev.filter((_, i) => i !== idx));
  }

  async function confirmImport() {
    if (importPreview.length === 0) return;
    const invalid = importPreview.some(r => !r.nama.trim() || !r.nomor_jamaah.trim());
    if (invalid) { setImportError('Semua baris harus punya Nama & No. Jamaah.'); return; }
    setImportSaving(true);
    setImportError('');
    try {
      const payload = importPreview.map(r => ({
        nama: r.nama.trim(),
        nomor_jamaah: r.nomor_jamaah.trim(),
        rombongan: r.rombongan.trim() || null,
        nomor_paspor: r.nomor_paspor.trim() || null,
        fase: 'persiapan',
      }));
      const { inserted } = await bulkInsertJamaah(id!, selectedKeberangkatan, payload);
      setImportPreview([]);
      setImportOpen(false);
      await loadJamaah();
      alert(`${inserted} jamaah berhasil diimport.`);
    } catch (err: unknown) {
      setImportError(err instanceof Error ? err.message : 'Gagal menyimpan data.');
    } finally {
      setImportSaving(false);
    }
  }

  async function handleAgImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
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
        const rawText1 = await resp.text();
        let json: { error?: string; items?: typeof result } = {};
        try { json = rawText1 ? JSON.parse(rawText1) : {}; } catch { throw new Error('Gagal memproses file, coba file yang lebih kecil atau format lain.'); }
        if (!resp.ok) throw new Error(json.error || 'Gagal ekstrak Excel.');
        result = json.items ?? [];
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
        const rawText2 = await resp.text();
        let json: { error?: string; items?: typeof result } = {};
        try { json = rawText2 ? JSON.parse(rawText2) : {}; } catch { throw new Error('Gagal memproses file, coba file yang lebih kecil atau format lain.'); }
        if (!resp.ok) throw new Error(json.error || 'Gagal ekstrak PDF.');
        result = json.items ?? [];
      } else {
        throw new Error('Format tidak didukung. Pakai Excel, CSV, PDF, atau gambar.');
      }
      const preview = (result || []).map((a, i) => ({
        tanggal: String(a.tanggal ?? '').trim(),
        jam_mulai: String(a.jam_mulai ?? '').trim(),
        judul: String(a.judul ?? '').trim(),
        lokasi: String(a.lokasi ?? '').trim(),
        deskripsi: String(a.deskripsi ?? '').trim(),
        urutan: typeof (a as any).urutan === 'number' ? (a as any).urutan : i + 1,
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
    if (agImportPreview.length === 0 || !selectedKeberangkatan) return;
    const invalid = agImportPreview.some(a => !a.judul.trim() || !a.tanggal.trim());
    if (invalid) { setAgImportError('Setiap agenda wajib punya tanggal & judul.'); return; }
    setAgImportSaving(true); setAgImportError('');
    try {
      const { data: { session: saveSession } } = await supabase.auth.getSession();
      const saveAuth: Record<string, string> = saveSession?.access_token
        ? { Authorization: `Bearer ${saveSession.access_token}` }
        : {};

      const items = agImportPreview.map(a => ({
        tanggal: a.tanggal.trim(),
        jam_mulai: a.jam_mulai.trim() || null,
        judul: a.judul.trim(),
        lokasi: a.lokasi.trim() || null,
        deskripsi: a.deskripsi.trim() || null,
        urutan: a.urutan,
      }));

      const saveResp = await fetch('/api/ai-extract-agenda/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...saveAuth },
        body: JSON.stringify({ tenant_id: id, keberangkatan_id: selectedKeberangkatan, items }),
      });
      const rawSave = await saveResp.text();
      let saveJson: { success?: boolean; count?: number; error?: string } = {};
      try { saveJson = rawSave ? JSON.parse(rawSave) : {}; } catch { throw new Error('Gagal menyimpan agenda.'); }
      if (!saveResp.ok) throw new Error(saveJson.error || 'Gagal menyimpan agenda.');

      setAgImportPreview([]); setAgImportOpen(false);
      await loadAgenda();
      alert(`${saveJson.count ?? items.length} agenda berhasil disimpan.`);
    } catch (err: unknown) {
      setAgImportError(err instanceof Error ? err.message : 'Gagal menyimpan.');
    } finally { setAgImportSaving(false); }
  }

  async function handleCreateTravelAccount(e: FormEvent) {
    e.preventDefault();
    setTaError(''); setTaSuccess('');
    if (!taEmail.trim()) { setTaError('Email wajib diisi.'); return; }
    if (taPassword.length < 8) { setTaError('Password minimal 8 karakter.'); return; }
    setTaSubmitting(true);
    try {
      const savedEmail = taEmail.trim();
      const savedPassword = taPassword;
      await createTravelAccount(id!, savedEmail, savedPassword);
      setTaEmail(''); setTaPassword('');
      setTaSuccess(`✓ Akun dibuat. Kirim ke travel — Email: ${savedEmail} | Password: ${savedPassword} | Login di: /travel/login`);
      await loadTravelAccounts();
    } catch (err: unknown) { setTaError(err instanceof Error ? err.message : 'Terjadi kesalahan.'); }
    setTaSubmitting(false);
  }

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
        const newKb = await createKeberangkatan(id!, payload);
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

  async function handleRevokeTravelAccess(mappingId: string, userId: string) {
    if (!window.confirm(`Cabut akses akun ini (user: ${userId.slice(0, 8)}...)? Akun travel tetap ada, hanya koneksi ke tenant ini yang dihapus.`)) return;
    await revokeTravelAccess(id!, mappingId);
    await loadTravelAccounts();
  }

  function formatTanggal(iso: string) { return new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); }
  function formatDatetime(iso: string) { return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }

  function SaveButton({ label }: { label?: string }) {
    return (
      <div className="flex items-center gap-3 pt-7">
        <button type="submit" disabled={submitting}
          className="font-semibold text-[13px] px-7 py-3 rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
          style={{ background: submitting ? '#6366f1' : 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#ffffff', boxShadow: submitting ? 'none' : '0 2px 8px rgba(67,56,202,0.26), 0 1px 2px rgba(67,56,202,0.18)' }}>
          {submitting
            ? <span className="flex items-center gap-2"><svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Menyimpan...</span>
            : (label ?? (isNew ? 'Buat Tenant' : 'Simpan Perubahan'))}
        </button>
        <button type="button" onClick={() => navigate('/admin')}
          className="text-[13px] font-medium px-4 py-3 rounded-xl transition-all duration-150"
          style={{ color: '#9ca3af' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#374151'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
          Batal
        </button>
      </div>
    );
  }

  if (loading) {
    return <AdminLayout><div className="font-mono text-[12px] py-16 text-center" style={{ color: '#d1d5db' }}>Memuat data tenant...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">

        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-1.5 text-[13px] font-medium transition-all duration-150" style={{ color: '#9ca3af' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#4338ca'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Kembali
          </button>
          <span style={{ color: '#e5e7eb' }}>|</span>
          <h1 className="font-bold leading-tight" style={{ fontSize: '22px', color: '#111827', letterSpacing: '-0.02em' }}>{isNew ? 'Tenant Baru' : 'Edit Tenant'}</h1>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', color: '#dc2626' }}>
            <svg className="flex-none mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            {error}
          </div>
        )}

        {/* ── Tab Bar ── */}
        <div className="sticky top-0 z-10 mb-6 overflow-x-auto" style={{ background: '#f9f7f3' }}>
          <div className="flex gap-1 px-1 py-1.5 w-max min-w-full"
            style={{ background: 'rgba(0,0,0,0.04)', borderRadius: '14px' }}>
            {TABS.map(t => {
              const disabled = isNew && t.id !== 'profil';
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => setActiveTab(t.id)}
                  className="relative flex-none whitespace-nowrap transition-all duration-200"
                  style={{
                    padding: '7px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: active ? 600 : 500,
                    border: 'none',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    color: disabled ? '#c4c4c4' : active ? '#1e1b4b' : '#6b7280',
                    background: active ? '#ffffff' : 'transparent',
                    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10), 0 0.5px 1px rgba(0,0,0,0.06)' : 'none',
                    letterSpacing: active ? '-0.01em' : '0',
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Hint untuk tenant baru ── */}
        {isNew && activeTab !== 'profil' && (
          <div className="py-16 text-center">
            <p className="text-[14px]" style={{ color: '#9ca3af' }}>
              Simpan tenant terlebih dahulu untuk mengelola <strong>{activeTab}</strong>.
            </p>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            TAB: PROFIL & BRANDING
        ══════════════════════════════════════════════ */}
        {activeTab === 'profil' && (
          <form onSubmit={handleSubmit} className="space-y-0">

            {/* ── TAB PROFIL ── */}
            <>
                {/* Import dari Poster */}
                <div className="rounded-t-2xl px-6 py-5 mb-0" style={{ background: 'rgba(67,56,202,0.03)', border: '2px dashed rgba(67,56,202,0.22)', borderRadius: '16px 16px 0 0' }}>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#4338ca' }}>
                    ✨ Import dari Poster
                  </p>
                  <p className="text-[12px] mb-3" style={{ color: '#6b7280' }}>
                    Upload foto poster/brosur keberangkatan — AI akan membaca dan mengisi form secara otomatis.
                  </p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleOcrPoster(file);
                    }}
                    className="hidden"
                    id="poster-upload"
                  />
                  <label
                    htmlFor="poster-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
                    style={{ background: '#4338ca', color: '#ffffff' }}
                  >
                    {ocrLoading ? '⏳ Membaca poster...' : '📎 Pilih Foto Poster'}
                  </label>
                  {ocrLoading && (
                    <p className="mt-2 text-[11px] animate-pulse" style={{ color: '#4338ca' }}>
                      AI sedang membaca poster, mohon tunggu...
                    </p>
                  )}
                  {ocrError && (
                    <p className="mt-2 text-[11px]" style={{ color: '#dc2626' }}>{ocrError}</p>
                  )}
                  {ocrResult && !ocrLoading && (
                    <p className="mt-2 text-[11px]" style={{ color: '#16a34a' }}>
                      ✓ Data berhasil diekstrak dan form telah diisi otomatis. Periksa dan sesuaikan jika perlu.
                    </p>
                  )}
                </div>

                <SectionDivider />

                {/* Kode Aktivasi */}
                <div className="px-6 py-6" style={cardStyle}>
                  <FieldLabel>Kode Aktivasi{!isNew && <span className="ml-2 normal-case" style={{ color: '#d1d5db', fontFamily: 'inherit', letterSpacing: 'normal', textTransform: 'none', fontSize: '10px' }}>(tidak dapat diubah)</span>}</FieldLabel>
                  {isNew ? (
                    <div className="flex gap-2">
                      <input type="text" value={activationCode} onChange={e => { setActivationCode(e.target.value.toUpperCase()); setCodeError(''); }} placeholder="Ketik atau klik Generate" maxLength={20} required
                        className="flex-1 font-mono rounded-xl px-4 py-3 text-sm uppercase transition-all duration-150 focus:outline-none" style={{ ...inputBase, letterSpacing: '0.08em' }}
                        onFocus={e => { e.currentTarget.style.border = '1px solid #4338ca'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,56,202,0.10)'; e.currentTarget.style.background = '#ffffff'; }}
                        onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; }} />
                      <button type="button" onClick={() => { setActivationCode(generateActivationCode()); setCodeError(''); }}
                        className="px-4 text-[12px] font-semibold rounded-xl transition-all duration-150 whitespace-nowrap"
                        style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.15)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.12)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.07)'; }}>Generate</button>
                    </div>
                  ) : (
                    <div className="font-mono text-sm px-4 py-3 rounded-xl" style={{ background: 'rgba(67,56,202,0.05)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.12)', letterSpacing: '0.08em' }}>{activationCode}</div>
                  )}
                  {codeError && <p className="mt-2 text-[12px]" style={{ color: '#dc2626' }}>{codeError}</p>}
                </div>

                <SectionDivider />

                {/* Nama Travel */}
                <div className="px-6 py-6" style={cardStyle}>
                  <FieldLabel>Nama Travel <span style={{ color: '#f87171' }}>*</span></FieldLabel>
                  <StyledInput type="text" value={namaTravel} onChange={e => handleNamaChange(e.target.value)} required placeholder="Barakah Mulia Wisata" maxLength={80} />
                </div>

                <SectionDivider />

                {/* Warna Brand */}
                <div className="px-6 py-6" style={cardStyle}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: '#6b7280' }}>Warna Brand</p>
                  <div className="rounded-xl p-4 space-y-5" style={{ background: '#fafaf9', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div>
                      <p className="text-[11px] font-semibold mb-2.5" style={{ color: '#374151' }}>Primary <span className="ml-2 font-normal" style={{ color: '#9ca3af' }}>— warna brand utama</span></p>
                      <div className="flex items-center gap-3">
                        <input type="color" value={primaryColor} onChange={e => handleColorChange(e.target.value)} className="h-10 w-14 rounded-lg cursor-pointer flex-none" style={{ border: '1px solid rgba(0,0,0,0.10)' }} />
                        <input type="text" value={primaryColor} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) handleColorChange(e.target.value); }} className="font-mono rounded-xl px-3 py-2.5 text-[13px] transition-all duration-150 focus:outline-none" style={{ ...inputBase, width: '120px', letterSpacing: '0.04em' }} onFocus={e => { e.currentTarget.style.border = '1px solid #4338ca'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,56,202,0.10)'; e.currentTarget.style.background = '#ffffff'; }} onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; }} />
                        <div className="flex-1 h-8 rounded-lg" style={{ background: primaryColor, opacity: 0.25 }} />
                      </div>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />
                    <div>
                      <p className="text-[11px] font-semibold mb-2.5" style={{ color: '#374151' }}>Primary-Deep <span className="ml-2 font-normal" style={{ color: '#9ca3af' }}>— hover/active (auto jika kosong)</span></p>

                      <div className="flex items-center gap-3">
                        <input type="color" value={primaryDeepColor || darkenHex(primaryColor)} onChange={e => setPrimaryDeepColor(e.target.value)} className="h-10 w-14 rounded-lg cursor-pointer flex-none" style={{ border: '1px solid rgba(0,0,0,0.10)' }} />
                        <input type="text" value={primaryDeepColor} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setPrimaryDeepColor(e.target.value); }} placeholder={darkenHex(primaryColor)} className="font-mono rounded-xl px-3 py-2.5 text-[13px] transition-all duration-150 focus:outline-none" style={{ ...inputBase, width: '120px', letterSpacing: '0.04em' }} onFocus={e => { e.currentTarget.style.border = '1px solid #4338ca'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,56,202,0.10)'; e.currentTarget.style.background = '#ffffff'; }} onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; }} />
                        {primaryDeepColor && (
                          <button type="button" onClick={() => setPrimaryDeepColor('')} className="text-[11px] transition-all duration-150" style={{ color: '#9ca3af' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#4338ca'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; }}>Reset ke auto</button>
                        )}
                      </div>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />
                    <div>
                      <p className="text-[11px] font-semibold mb-0.5" style={{ color: '#374151' }}>Warna Teks Header</p>
                      <p className="text-[11px] mb-2.5" style={{ color: '#9ca3af' }}>Warna tulisan nama jamaah, nama travel, dan fase di bagian atas aplikasi</p>
                      <div className="flex items-center gap-3">
                        <input type="color" value={heroTextColor} onChange={e => setHeroTextColor(e.target.value)} className="h-10 w-14 rounded-lg cursor-pointer flex-none" style={{ border: '1px solid rgba(0,0,0,0.10)' }} />
                        <input type="text" value={heroTextColor} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setHeroTextColor(e.target.value); }} className="font-mono rounded-xl px-3 py-2.5 text-[13px] transition-all duration-150 focus:outline-none" style={{ ...inputBase, width: '120px', letterSpacing: '0.04em' }} onFocus={e => { e.currentTarget.style.border = '1px solid #4338ca'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,56,202,0.10)'; e.currentTarget.style.background = '#ffffff'; }} onBlur={e => { e.currentTarget.style.border = '1px solid rgba(0,0,0,0.09)'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.background = '#fafaf9'; }} />
                        <div className="flex-1 h-8 rounded-lg border border-dashed" style={{ background: heroTextColor, borderColor: 'rgba(0,0,0,0.10)' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <SectionDivider />

                {/* Logo + Hero + Sertifikat */}
                <div className="px-6 py-6" style={cardStyle}>
                  <FieldLabel>Logo Tenant</FieldLabel>
                  <div className="flex items-start gap-4">
                    <div className="flex-none w-28 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-150" style={{ border: logoPreview || existingLogoUrl ? '1px solid rgba(0,0,0,0.08)' : '2px dashed rgba(0,0,0,0.12)', background: '#fafaf9', height: '72px' }} onClick={() => fileInputRef.current?.click()}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#4338ca'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = logoPreview || existingLogoUrl ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.12)'; }}>
                      {logoPreview ? <img src={logoPreview} alt="Preview" className="max-w-full max-h-full object-contain p-2" /> : existingLogoUrl ? <img src={existingLogoUrl} alt="Logo" className="max-w-full max-h-full object-contain p-2" /> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>}
                    </div>
                    <div className="flex-1">
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-xl transition-all duration-150" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.15)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.12)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.07)'; }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                        Pilih File
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogoChange} className="hidden" />
                      <p className="mt-2 text-[11px]" style={{ color: '#9ca3af' }}>PNG, JPG, WebP — maks. 1MB. SVG tidak didukung.</p>
                      {(logoPreview || existingLogoUrl) && (
                        <button type="button" onClick={() => { setLogoFile(null); setLogoPreview(null); setExistingLogoUrl(null); }} className="mt-1 text-[11px] transition-all duration-150" style={{ color: '#9ca3af' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; }}>Hapus logo</button>
                      )}
                    </div>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '0 -24px' }} />

                  {/* Hero Image */}
                  <div className="pt-5">
                    <label className="block text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>
                      Hero Image (Background Beranda)
                    </label>
                    {(heroPreview || existingHeroUrl) && (
                      <div className="mb-3 rounded-xl overflow-hidden" style={{ height: '120px' }}>
                        <img src={heroPreview || existingHeroUrl} alt="Hero preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => heroInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-xl transition-all duration-150" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.15)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.12)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.07)'; }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        {existingHeroUrl || heroPreview ? 'Ganti Hero Image' : 'Upload Hero Image'}
                      </button>
                      {(heroPreview || existingHeroUrl) && (
                        <button type="button" onClick={() => { setHeroFile(null); setHeroPreview(''); setExistingHeroUrl(''); }} className="text-[11px] transition-colors" style={{ color: '#f87171' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}>Hapus</button>
                      )}
                    </div>
                    <input ref={heroInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleHeroChange} className="hidden" />
                    <p className="mt-1.5 text-[10px]" style={{ color: '#9ca3af' }}>Maks 3MB · PNG, JPG, WEBP · Rekomendasi: 1200×600px landscape</p>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '20px -24px' }} />

                  {/* Template Sertifikat */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>
                      Template Sertifikat
                    </label>
                    {(sertifikatPreview || existingSertifikatUrl) && (
                      <div className="mb-3 rounded-xl overflow-hidden border border-slate-200" style={{ aspectRatio: '16/9', maxHeight: '120px' }}>
                        <img src={sertifikatPreview || existingSertifikatUrl} alt="Preview template sertifikat" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => sertifikatInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-xl transition-all duration-150" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.15)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.12)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.07)'; }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        {existingSertifikatUrl || sertifikatPreview ? 'Ganti Template' : 'Upload Template'}
                      </button>
                      {(sertifikatPreview || existingSertifikatUrl) && (
                        <button type="button" onClick={() => { setSertifikatFile(null); setSertifikatPreview(''); setExistingSertifikatUrl(''); }} className="text-[11px] transition-colors" style={{ color: '#f87171' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}>Hapus</button>
                      )}
                    </div>
                    <input ref={sertifikatInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleSertifikatChange} className="hidden" />
                    <p className="mt-1.5 text-[10px]" style={{ color: '#9ca3af' }}>Maks 5MB · PNG, JPG, WEBP · Rekomendasi: landscape 1200×848px</p>
                    <p className="mt-1 text-[10px]" style={{ color: '#d97706' }}>Pastikan template punya area kosong untuk nama jamaah di tengah</p>
                  </div>

                  {/* ── EDITOR TATA LETAK ─────────────────────── */}
                  {(existingSertifikatUrl || sertifikatPreview) && !isNew && (
                    <div className="mt-5">
                      <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '0 -24px 20px' }} />
                      <label className="block text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>
                        Tata Letak Sertifikat
                      </label>
                      <p className="mb-3 text-[10px]" style={{ color: '#6b7280' }}>Geser elemen teks di atas kanvas. Klik untuk memilih dan ubah propertinya.</p>

                      {/* Kanvas drag-drop */}
                      <div
                        ref={sertifikatCanvasRef}
                        onClick={() => setSelectedLayoutField(null)}
                        className="relative w-full overflow-hidden rounded-xl border cursor-crosshair select-none"
                        style={{ aspectRatio: '1.414 / 1', background: '#f3f0e8', borderColor: 'rgba(0,0,0,0.1)', containerType: 'inline-size' } as React.CSSProperties}
                      >
                        <img
                          src={sertifikatPreview || existingSertifikatUrl}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                        />
                        {sertifikatLayout.fields.filter(f => f.visible).map(f => (
                          <div
                            key={f.key}
                            onPointerDown={e => { e.stopPropagation(); startDrag(e, f.key); }}
                            onClick={e => { e.stopPropagation(); setSelectedLayoutField(f.key); }}
                            className="absolute cursor-move px-1"
                            style={{
                              left: `${f.x}%`,
                              top: `${f.y}%`,
                              transform: `translate(${f.align === 'center' ? '-50%' : f.align === 'right' ? '-100%' : '0'}, -50%)`,
                              fontSize: `${f.fontSize / 10}cqw`,
                              color: f.color,
                              fontWeight: f.bold ? 700 : 400,
                              fontFamily: fontFamilyToCss(f.fontFamily),
                              outline: selectedLayoutField === f.key ? '2px dashed #4338ca' : '1px dashed rgba(0,0,0,0.2)',
                              outlineOffset: '2px',
                              whiteSpace: 'nowrap',
                              userSelect: 'none',
                            }}
                          >
                            {LAYOUT_PREVIEW_TEXT[f.key] ?? f.label}
                          </div>
                        ))}
                      </div>

                      {/* Panel bawah: daftar field + properti */}
                      <div className="mt-3 flex gap-3 flex-wrap">

                        {/* Daftar field — checkbox aktifkan */}
                        <div className="flex-1 min-w-[140px] rounded-xl p-3" style={{ background: '#f9fafb', border: '1px solid rgba(0,0,0,0.07)' }}>
                          <p className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>Tampilkan elemen</p>
                          <div className="space-y-1.5">
                            {sertifikatLayout.fields.map(f => (
                              <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={f.visible}
                                  onChange={ch => {
                                    setSertifikatLayout(prev => ({
                                      fields: prev.fields.map(ff => ff.key === f.key ? { ...ff, visible: ch.target.checked } : ff),
                                    }));
                                    if (ch.target.checked) setSelectedLayoutField(f.key);
                                  }}
                                  className="rounded"
                                />
                                <span
                                  className="text-[12px] cursor-pointer"
                                  style={{ color: selectedLayoutField === f.key ? '#4338ca' : '#374151', fontWeight: selectedLayoutField === f.key ? 600 : 400 }}
                                  onClick={() => f.visible && setSelectedLayoutField(f.key)}
                                >
                                  {f.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Panel properti field terpilih */}
                        {selectedLayoutField && (() => {
                          const fld = sertifikatLayout.fields.find(f => f.key === selectedLayoutField);
                          if (!fld) return null;
                          return (
                            <div className="rounded-xl p-3 space-y-2.5" style={{ background: '#f9fafb', border: '1px solid rgba(0,0,0,0.07)', minWidth: '180px', flex: '1' }}>
                              <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: '#9ca3af' }}>{fld.label}</p>

                              <div>
                                <p className="text-[10px] mb-1" style={{ color: '#6b7280' }}>Ukuran Font ({fld.fontSize}px)</p>
                                <input
                                  type="range" min={8} max={80} value={fld.fontSize}
                                  onChange={e => updateSelectedField({ fontSize: Number(e.target.value) })}
                                  className="w-full accent-indigo-600"
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <p className="text-[10px]" style={{ color: '#6b7280' }}>Warna</p>
                                <input
                                  type="color" value={fld.color}
                                  onChange={e => updateSelectedField({ color: e.target.value })}
                                  className="h-7 w-10 cursor-pointer rounded"
                                  style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '1px 2px' }}
                                />
                              </div>

                              <div>
                                <p className="text-[10px] mb-1" style={{ color: '#6b7280' }}>Rata teks</p>
                                <div className="flex gap-1">
                                  {(['left', 'center', 'right'] as const).map(a => (
                                    <button key={a} type="button" onClick={() => updateSelectedField({ align: a })}
                                      className="flex-1 rounded px-1 py-1 text-[10px] font-medium transition"
                                      style={{ background: fld.align === a ? '#4338ca' : '#f3f4f6', color: fld.align === a ? '#fff' : '#374151', border: '1px solid', borderColor: fld.align === a ? '#4338ca' : 'rgba(0,0,0,0.1)' }}>
                                      {a === 'left' ? 'Kiri' : a === 'center' ? 'Tengah' : 'Kanan'}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-[10px] mb-1" style={{ color: '#6b7280' }}>Font</p>
                                <select value={fld.fontFamily} onChange={e => updateSelectedField({ fontFamily: e.target.value as SertifikatField['fontFamily'] })}
                                  className="w-full rounded-lg px-2 py-1.5 text-[11px]" style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#fff' }}>
                                  <option value="display">Display (Bricolage)</option>
                                  <option value="sans">Sans (Inter)</option>
                                  <option value="mono">Mono (JetBrains)</option>
                                  <option value="arab">Arab (Amiri)</option>
                                </select>
                              </div>

                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={fld.bold} onChange={e => updateSelectedField({ bold: e.target.checked })} className="rounded" />
                                <span className="text-[12px]" style={{ color: '#374151' }}>Tebal (Bold)</span>
                              </label>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Tombol simpan tata letak */}
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={saveSertifikatLayout}
                          disabled={layoutSaving}
                          className="rounded-xl px-4 py-2 text-[12px] font-semibold transition"
                          style={{ background: '#4338ca', color: '#fff', opacity: layoutSaving ? 0.7 : 1, cursor: layoutSaving ? 'not-allowed' : 'pointer' }}
                        >
                          {layoutSaving ? 'Menyimpan…' : 'Simpan Tata Letak'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSertifikatLayout(DEFAULT_SERTIFIKAT_LAYOUT); setSelectedLayoutField(null); }}
                          className="rounded-xl px-4 py-2 text-[12px] font-medium transition"
                          style={{ background: '#f3f4f6', color: '#374151', border: '1px solid rgba(0,0,0,0.1)' }}
                        >
                          Reset ke Default
                        </button>
                        {layoutSaveMsg && (
                          <span className="text-[11px] font-medium" style={{ color: layoutSaveMsg.includes('✓') ? '#16a34a' : '#dc2626' }}>
                            {layoutSaveMsg}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <SectionDivider />

                {/* Judul Halaman */}
                <div className="px-6 py-6" style={cardStyle}>
                  <FieldLabel>Judul Halaman</FieldLabel>
                  <StyledInput type="text" value={pageTitle} onChange={e => setPageTitle(e.target.value)} placeholder={buildDefaultTitle(namaTravel) || 'Nama Travel — Pendamping Umrah Anda'} />
                  <p className="mt-2 text-[11px]" style={{ color: '#9ca3af' }}>Muncul di tab browser jamaah. Kosongkan untuk pakai default.</p>
                </div>

                <SectionDivider />

                {/* Slug / Link Travel */}
                <div className="rounded-b-2xl px-6 py-6" style={cardStyle}>
                  <FieldLabel>Link Khusus Travel (Slug)</FieldLabel>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] flex-none" style={{ color: '#9ca3af' }}>{PUBLIC_HOST}/t/</span>
                    <StyledInput
                      type="text"
                      value={slug}
                      onChange={e => setSlug(formatSlug(e.target.value))}
                      placeholder="barakah-mulia"
                      maxLength={50}
                    />
                  </div>

                  {slug && (
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[12px] px-3 py-1.5 rounded-lg" style={{ background: 'rgba(67,56,202,0.06)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.12)' }}>
                        {PUBLIC_HOST}/t/{slug}
                      </span>
                      <button type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(slugUrl(slug));
                          setSlugCopied(true);
                          setTimeout(() => setSlugCopied(false), 1500);
                        }}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all"
                        style={{ color: '#4338ca', border: '1px solid rgba(67,56,202,0.2)' }}>
                        {slugCopied ? 'Tersalin ✓' : 'Salin Link'}
                      </button>
                    </div>
                  )}

                  <p className="mt-2 text-[11px]" style={{ color: '#9ca3af' }}>
                    Link yang travel sebarkan ke jamaah. Jamaah cukup klik &amp; isi nama — tanpa kode aktivasi.
                    Gunakan huruf kecil &amp; strip, contoh: <span className="font-mono">barakah-mulia</span>. Kosongkan jika tidak dipakai.
                  </p>
                </div>

                <SaveButton />
            </>

          </form>
        )}

        {/* ══════════════════════════════════════════════
            TAB: KEBERANGKATAN
        ══════════════════════════════════════════════ */}
        {activeTab === 'keberangkatan' && !isNew && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Batch Keberangkatan</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca' }}>{keberangkatanList.length} batch</span>
              <button type="button" onClick={() => openKbForm()}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150"
                style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#ffffff' }}>
                + Tambah Batch
              </button>
            </div>

            {kbFormOpen && (
              <form onSubmit={handleSaveKeberangkatan} className="rounded-2xl px-6 py-6 mb-5" style={{ ...cardStyle, border: '1px solid rgba(67,56,202,0.18)' }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: '#4338ca' }}>
                  {kbEditId ? 'Edit Batch' : 'Batch Baru'}
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Nama Batch <span style={{ color: '#f87171' }}>*</span></p>
                    <StyledInput type="text" value={kbNamaBatch} onChange={e => setKbNamaBatch(e.target.value)} placeholder="cth. Batch 1 — Februari 2025" maxLength={120} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Tgl Keberangkatan</p>
                      <StyledInput type="date" value={kbTanggalBerangkat} onChange={e => setKbTanggalBerangkat(e.target.value)} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Tgl Kepulangan</p>
                      <StyledInput type="date" value={kbTanggalPulang} onChange={e => setKbTanggalPulang(e.target.value)} />
                    </div>
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
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={kbAktif} onChange={e => setKbAktif(e.target.checked)} className="w-4 h-4 rounded" />
                      <span className="text-[12px] font-medium" style={{ color: '#374151' }}>Batch aktif (terlihat di login jamaah)</span>
                    </label>
                  </div>
                </div>
                {kbError && <p className="mt-3 text-[12px]" style={{ color: '#dc2626' }}>{kbError}</p>}
                <div className="flex items-center gap-3 pt-5">
                  <button type="submit" disabled={kbSaving}
                    className="px-6 py-2.5 text-[12px] font-semibold rounded-xl disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#ffffff' }}>
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
                <div key={kb.id} className="rounded-2xl px-5 py-4" style={{ ...cardStyle, border: selectedKeberangkatan === kb.id ? '1.5px solid rgba(67,56,202,0.35)' : undefined }}>
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
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(67,56,202,0.1)', color: '#4338ca' }}>Dipilih</span>
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
                        style={{ background: selectedKeberangkatan === kb.id ? 'rgba(67,56,202,0.1)' : 'rgba(0,0,0,0.04)', color: selectedKeberangkatan === kb.id ? '#4338ca' : '#6b7280' }}>
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
        {activeTab === 'jamaah' && !isNew && (
          <div>
            {/* Keberangkatan selector */}
            {keberangkatanList.length > 0 && (
              <div className="mb-5 flex items-center gap-3">
                <label className="font-mono text-[10px] uppercase tracking-widest flex-none" style={{ color: '#6b7280' }}>Batch:</label>
                <select value={selectedKeberangkatan} onChange={e => setSelectedKeberangkatan(e.target.value)}
                  className="flex-1 rounded-xl px-3 py-2 text-[13px] focus:outline-none" style={{ ...inputBase, maxWidth: '360px' }}>
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
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Daftar Jamaah</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca' }}>{jamaahList.length} jamaah</span>
              <button type="button" onClick={() => { setImportOpen(o => !o); setImportError(''); setImportPreview([]); }}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150"
                style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.15)' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Import dari Excel/PDF
              </button>
            </div>

            {/* Import panel */}
            {importOpen && (
              <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: '1px solid rgba(67,56,202,0.12)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: '#4338ca' }}>Import Jamaah dengan AI</p>
                </div>
                <p className="text-[12px] mb-4" style={{ color: '#6b7280' }}>
                  Upload file Excel (.xlsx/.csv) atau PDF berisi daftar jamaah. AI akan membaca & merapikan datanya, lalu Anda bisa review sebelum menyimpan.
                </p>

                {importPreview.length === 0 ? (
                  <div>
                    <button type="button" onClick={() => importFileRef.current?.click()} disabled={importLoading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl transition-all disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#fff' }}>
                      {importLoading ? 'AI sedang membaca...' : 'Pilih File'}
                    </button>
                    <input ref={importFileRef} type="file" accept=".xlsx,.xls,.csv,application/pdf,image/png,image/jpeg,image/webp" onChange={handleImportFile} className="hidden" />
                    <p className="mt-2 text-[10px]" style={{ color: '#9ca3af' }}>Format: Excel, CSV, atau PDF. Maks ~10MB.</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[12px] font-semibold" style={{ color: '#374151' }}>{importPreview.length} jamaah terbaca — review & edit sebelum simpan:</p>
                    </div>
                    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                      <table className="w-full text-[12px]">
                        <thead><tr style={{ background: '#fafaf9' }}>
                          {['Nama', 'No. Jamaah', 'Rombongan', 'No. Paspor', ''].map(h => <th key={h} className="text-left px-3 py-2 font-mono text-[10px] uppercase" style={{ color: '#9ca3af' }}>{h}</th>)}
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
                        style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#fff' }}>
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

            {/* Form tambah jamaah — cepat */}
            <div className="rounded-2xl border p-5 mb-4" style={{ borderColor: 'rgba(0,0,0,0.07)', background: '#fff' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: '#6b7280' }}>Tambah Jamaah</p>

              <form onSubmit={handleAddJamaah}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <FieldLabel>Nama Jamaah *</FieldLabel>
                    <StyledInput
                      ref={namaRef}
                      type="text"
                      value={jmNama}
                      onChange={e => setJmNama(e.target.value)}
                      placeholder="cth. Budi Santoso"
                      required
                    />
                  </div>
                  <div className="sm:w-44">
                    <FieldLabel>Nomor Jamaah *</FieldLabel>
                    <StyledInput
                      type="text"
                      value={jmNomorJamaah}
                      onChange={e => setJmNomorJamaah(e.target.value)}
                      placeholder="cth. TU-2026-001"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={jmSubmitting}
                    className="flex-none rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #4338ca, #4f46e5)' }}
                  >
                    {jmSubmitting ? 'Menyimpan…' : '+ Tambah'}
                  </button>
                </div>

                {/* Toggle detail opsional */}
                <button
                  type="button"
                  onClick={() => setShowDetailJamaah(v => !v)}
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium"
                  style={{ color: '#4338ca' }}
                >
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
                      <select
                        value={jmFase}
                        onChange={e => setJmFase(e.target.value as JamaahAccountRow['fase'])}
                        className="w-full rounded-xl px-3 py-2.5 text-[14px] focus:outline-none"
                        style={{ border: '1px solid rgba(0,0,0,0.15)', ...inputBase }}
                      >
                        {FASE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {jmError && <p className="mt-2 text-[12px]" style={{ color: '#dc2626' }}>{jmError}</p>}
              </form>
            </div>

            {/* List jamaah — compact rows + chips */}
            <div className="rounded-2xl overflow-hidden" style={cardStyle}>
              {jamaahLoading ? (
                <div className="py-8 text-center font-mono text-[12px]" style={{ color: '#d1d5db' }}>Memuat...</div>
              ) : jamaahList.length === 0 ? (
                <div className="py-8 text-center text-[13px]" style={{ color: '#9ca3af' }}>Belum ada jamaah terdaftar.</div>
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
                        <li key={j.id} className="px-5 py-4" style={{ background: 'rgba(67,56,202,0.03)' }}>
                          <div className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4">
                            <div>
                              <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>Nama</p>
                              <input value={editNama} onChange={e => setEditNama(e.target.value)}
                                className="w-full rounded-lg px-2 py-1.5 text-[13px] focus:outline-none"
                                style={{ border: '1px solid rgba(67,56,202,0.25)', background: '#fff', color: '#111827' }} />
                            </div>
                            <div>
                              <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>No. Jamaah</p>
                              <input value={editNomorJamaah} onChange={e => setEditNomorJamaah(e.target.value)}
                                className="w-full rounded-lg px-2 py-1.5 text-[12px] font-mono focus:outline-none"
                                style={{ border: '1px solid rgba(67,56,202,0.25)', background: '#fff', color: '#374151' }} />
                            </div>
                            <div>
                              <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>Rombongan</p>
                              <input value={editRombongan} onChange={e => setEditRombongan(e.target.value)} placeholder="—"
                                className="w-full rounded-lg px-2 py-1.5 text-[12px] focus:outline-none"
                                style={{ border: '1px solid rgba(67,56,202,0.25)', background: '#fff', color: '#374151' }} />
                            </div>
                            <div>
                              <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>No. Paspor</p>
                              <input value={editPaspor} onChange={e => setEditPaspor(e.target.value)} placeholder="—"
                                className="w-full rounded-lg px-2 py-1.5 text-[12px] font-mono focus:outline-none"
                                style={{ border: '1px solid rgba(67,56,202,0.25)', background: '#fff', color: '#374151' }} />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => saveEditJamaah(j.id)} disabled={editSaving}
                              className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-60"
                              style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#fff' }}>
                              {editSaving ? '...' : 'Simpan'}
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
                        {/* Kiri: nama + nomor + chips */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-[13px] font-semibold" style={{ color: '#111827' }}>{j.nama}</span>
                            <span className="font-mono text-[11px]" style={{ color: '#6b7280' }}>{j.nomor_jamaah}</span>
                          </div>
                          {chips.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {chips.map(chip => (
                                <span key={chip} className="font-mono text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.04)', color: '#6b7280' }}>
                                  {chip}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Tengah: dropdown fase */}
                        <select
                          value={j.fase_override ?? ''}
                          onChange={e => handleUpdateJamaahFase(j.id, e.target.value)}
                          className="hidden sm:block text-[11px] rounded-lg px-2 py-1 focus:outline-none transition-all flex-none"
                          style={{ border: '1px solid rgba(0,0,0,0.09)', background: '#fafaf9', color: '#374151' }}
                        >
                          <option value="">Auto</option>
                          {FASE_OPTIONS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>

                        {/* Kanan: tombol Edit & Hapus */}
                        <div className="flex items-center gap-1.5 flex-none">
                          <button type="button" onClick={() => startEditJamaah(j)}
                            className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                            style={{ color: '#4338ca', border: '1px solid rgba(67,56,202,0.2)' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.06)'; }}
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
        {activeTab === 'agenda' && !isNew && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Agenda Perjalanan</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca' }}>{agendaItems.length} item</span>
              {selectedKeberangkatan && (
                <button type="button" onClick={() => { setAgImportOpen(o => !o); setAgImportError(''); setAgImportPreview([]); }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150"
                  style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca', border: '1px solid rgba(67,56,202,0.15)' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Susun Itinerary dengan AI
                </button>
              )}
              <button type="button" onClick={handleInsertDummy} disabled={dummyLoading}
                className="ml-auto text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-60"
                style={{ color: '#6b7280', border: '1px solid rgba(0,0,0,0.10)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#4338ca'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(67,56,202,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#6b7280'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.10)'; }}>
                {dummyLoading ? 'Memasukkan...' : '+ Itinerary Demo'}
              </button>
            </div>

            {/* Keberangkatan selector */}
            {keberangkatanList.length > 0 && (
              <div className="mb-5 flex items-center gap-3">
                <label className="font-mono text-[10px] uppercase tracking-widest flex-none" style={{ color: '#6b7280' }}>Batch:</label>
                <select value={selectedKeberangkatan} onChange={e => setSelectedKeberangkatan(e.target.value)}
                  className="flex-1 rounded-xl px-3 py-2 text-[13px] focus:outline-none" style={{ ...inputBase, maxWidth: '360px' }}>
                  {keberangkatanList.map(kb => (
                    <option key={kb.id} value={kb.id}>{kb.nama_batch}</option>
                  ))}
                </select>
              </div>
            )}

            {!selectedKeberangkatan ? (
              <div className="rounded-2xl px-6 py-8 text-center" style={cardStyle}>
                <p className="text-[13px]" style={{ color: '#6b7280' }}>
                  Belum ada keberangkatan dipilih. Buat keberangkatan dulu di tab <strong>Keberangkatan</strong>,
                  lalu pilih untuk mengelola agenda.
                </p>
              </div>
            ) : (
              <>
                {/* AI Import Panel */}
                {agImportOpen && (
                  <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: '1px solid rgba(67,56,202,0.12)' }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: '#4338ca' }}>Susun Itinerary dengan AI</p>
                    <p className="text-[12px] mb-4" style={{ color: '#6b7280' }}>
                      Upload file Excel, CSV, PDF, atau foto jadwal — AI ekstrak & susun itinerary otomatis. Anda bisa review & edit sebelum menyimpan.
                    </p>
                    {agImportPreview.length === 0 ? (
                      <div>
                        <button type="button" onClick={() => agImportFileRef.current?.click()} disabled={agImportLoading}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl transition-all disabled:opacity-60"
                          style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#fff' }}>
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
                            style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#fff' }}>
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

            <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: '1px solid rgba(67,56,202,0.12)' }}>
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
                  style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#ffffff', boxShadow: '0 2px 8px rgba(67,56,202,0.22)' }}>
                  {agSubmitting ? <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
                  Tambah Agenda
                </button>
              </form>
            </div>

            {agEditSuccess && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-3 text-[12px] font-medium" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
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
                        <tr style={{ borderBottom: editingAgendaId === item.id ? 'none' : (i < agendaItems.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none') }}>
                          <td className="px-5 py-3.5 text-[13px] font-medium whitespace-nowrap" style={{ color: '#374151' }}>{formatTanggal(item.tanggal)}</td>
                          <td className="px-5 py-3.5 font-mono text-[12px]" style={{ color: '#6b7280' }}>{item.jam_mulai ? item.jam_mulai.slice(0, 5) : '—'}</td>
                          <td className="px-5 py-3.5"><p className="text-[13px] font-semibold" style={{ color: '#111827' }}>{item.judul}</p>{item.deskripsi && <p className="text-[11px] mt-0.5" style={{ color: '#9ca3af' }}>{item.deskripsi}</p>}</td>
                          <td className="px-5 py-3.5 text-[12px]" style={{ color: '#6b7280' }}>{item.lokasi ?? '—'}</td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button type="button" onClick={() => editingAgendaId === item.id ? handleCancelEdit() : handleStartEdit(item)}
                                className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                                style={{
                                  color: editingAgendaId === item.id ? '#4338ca' : '#9ca3af',
                                  border: editingAgendaId === item.id ? '1px solid rgba(67,56,202,0.25)' : '1px solid rgba(0,0,0,0.07)',
                                  background: editingAgendaId === item.id ? 'rgba(67,56,202,0.06)' : 'transparent',
                                }}
                                onMouseEnter={e => { if (editingAgendaId !== item.id) { (e.currentTarget as HTMLButtonElement).style.color = '#4338ca'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(67,56,202,0.25)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(67,56,202,0.06)'; } }}
                                onMouseLeave={e => { if (editingAgendaId !== item.id) { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.07)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; } }}>
                                {editingAgendaId === item.id ? 'Tutup' : 'Edit'}
                              </button>
                              <button type="button" onClick={() => handleDeleteAgenda(item.id, item.judul)}
                                className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                                style={{ color: '#9ca3af', border: '1px solid rgba(0,0,0,0.07)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(220,38,38,0.25)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.05)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.07)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>

                        {editingAgendaId === item.id && (
                          <tr style={{ borderBottom: i < agendaItems.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                            <td colSpan={5} style={{ background: '#f9f9f9', borderTop: '1px solid rgba(67,56,202,0.10)' }}>
                              <div className="px-5 py-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1" style={{ color: '#374151' }}>Tanggal <span style={{ color: '#f87171' }}>*</span></p>
                                    <input type="date" value={editFields.tanggal}
                                      onChange={e => setEditFields(f => ({ ...f, tanggal: e.target.value }))}
                                      className="w-full rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                                      style={{ ...inputBase, border: '1px solid rgba(0,0,0,0.09)' }} />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1" style={{ color: '#374151' }}>Jam Mulai</p>
                                    <input type="time" value={editFields.jam_mulai}
                                      onChange={e => setEditFields(f => ({ ...f, jam_mulai: e.target.value }))}
                                      className="w-full rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                                      style={{ ...inputBase }} />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1" style={{ color: '#374151' }}>Urutan</p>
                                    <input type="number" min={0} value={editFields.urutan}
                                      onChange={e => setEditFields(f => ({ ...f, urutan: Number(e.target.value) }))}
                                      className="w-full rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                                      style={{ ...inputBase }} />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[11px] font-semibold mb-1" style={{ color: '#374151' }}>Judul <span style={{ color: '#f87171' }}>*</span></p>
                                  <input type="text" value={editFields.judul}
                                    onChange={e => setEditFields(f => ({ ...f, judul: e.target.value }))}
                                    className="w-full rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                                    style={{ ...inputBase }} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1" style={{ color: '#374151' }}>Lokasi</p>
                                    <input type="text" value={editFields.lokasi}
                                      onChange={e => setEditFields(f => ({ ...f, lokasi: e.target.value }))}
                                      className="w-full rounded-xl px-3 py-2 text-[12px] focus:outline-none"
                                      style={{ ...inputBase }} />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold mb-1" style={{ color: '#374151' }}>Deskripsi</p>
                                    <textarea value={editFields.deskripsi} rows={2}
                                      onChange={e => setEditFields(f => ({ ...f, deskripsi: e.target.value }))}
                                      className="w-full rounded-xl px-3 py-2 text-[12px] focus:outline-none resize-none"
                                      style={{ ...inputBase }} />
                                  </div>
                                </div>
                                {agEditError && (
                                  <p className="text-[11px]" style={{ color: '#dc2626' }}>{agEditError}</p>
                                )}
                                <div className="flex items-center gap-2 pt-1">
                                  <button type="button" onClick={handleSaveEdit} disabled={agEditSaving}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold rounded-xl transition-all duration-150 disabled:opacity-60"
                                    style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#fff', boxShadow: '0 2px 6px rgba(67,56,202,0.20)' }}>
                                    {agEditSaving && <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>}
                                    {agEditSaving ? 'Menyimpan...' : 'Simpan'}
                                  </button>
                                  <button type="button" onClick={handleCancelEdit} disabled={agEditSaving}
                                    className="px-4 py-2 text-[12px] rounded-xl transition-all duration-150 disabled:opacity-60"
                                    style={{ border: '1px solid rgba(0,0,0,0.10)', color: '#6b7280', background: 'transparent' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                                    Batal
                                  </button>
                                </div>
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
        {activeTab === 'pengumuman' && !isNew && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Pengumuman Travel</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca' }}>{announcements.length} item</span>
            </div>
            <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: '1px solid rgba(67,56,202,0.12)' }}>
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
                  style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#ffffff', boxShadow: '0 2px 8px rgba(67,56,202,0.22)' }}>
                  Kirim Pengumuman
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
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full" style={{ background: ann.important ? 'rgba(239,68,68,0.08)' : 'rgba(67,56,202,0.07)', color: ann.important ? '#dc2626' : '#4338ca' }}>{ann.label}</span>
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
          </div>
        )}

        {/* ══════════════════════════════════════════════
            TAB: AKUN TRAVEL
        ══════════════════════════════════════════════ */}
        {activeTab === 'akun' && !isNew && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-bold" style={{ fontSize: '18px', color: '#111827', letterSpacing: '-0.02em' }}>Akun Travel Agency</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(67,56,202,0.07)', color: '#4338ca' }}>{travelAccounts.length} akun</span>
            </div>
            <div className="rounded-2xl px-6 py-6 mb-4" style={{ ...cardStyle, border: '1px solid rgba(67,56,202,0.12)' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: '#6b7280' }}>Buat Akun Login Travel Agency</p>
              <form onSubmit={handleCreateTravelAccount} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-[11px] font-semibold mb-1.5" style={{ color: '#374151' }}>Email <span style={{ color: '#f87171' }}>*</span></p><StyledInput type="email" value={taEmail} onChange={e => setTaEmail(e.target.value)} placeholder="travel@example.com" required /></div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[11px] font-semibold" style={{ color: '#374151' }}>Password <span style={{ color: '#f87171' }}>*</span></p>
                      <button type="button" onClick={() => setTaPassword(generatePassword())}
                        className="text-[11px] font-semibold px-3 py-1 rounded-lg"
                        style={{ color: '#4338ca', border: '1px solid rgba(67,56,202,0.2)', background: 'rgba(67,56,202,0.04)' }}>
                        Buat Password
                      </button>
                    </div>
                    <StyledInput type="text" value={taPassword} onChange={e => setTaPassword(e.target.value)} placeholder="Min 8 karakter" />
                  </div>
                </div>
                {taError && <p className="text-[12px]" style={{ color: '#dc2626' }}>{taError}</p>}
                {taSuccess && <p className="text-[12px]" style={{ color: '#059669' }}>{taSuccess}</p>}
                <button type="submit" disabled={taSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold rounded-xl transition-all duration-150 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 100%)', color: '#ffffff', boxShadow: '0 2px 8px rgba(67,56,202,0.22)' }}>
                  {taSubmitting ? 'Membuat...' : 'Buat Akun'}
                </button>
              </form>
            </div>
            <div className="rounded-2xl overflow-hidden" style={cardStyle}>
              {travelAccountsLoading ? (
                <div className="py-8 text-center font-mono text-[12px]" style={{ color: '#d1d5db' }}>Memuat...</div>
              ) : travelAccounts.length === 0 ? (
                <div className="py-8 text-center text-[13px]" style={{ color: '#9ca3af' }}>Belum ada akun travel agency.</div>
              ) : (
                <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                  {travelAccounts.map(acc => (
                    <div key={acc.id} className="px-5 py-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-[12px]" style={{ color: '#374151' }}>{acc.user_id.slice(0, 16)}...</p>
                        <p className="font-mono text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>Ditambahkan {formatDatetime(acc.created_at)}</p>
                      </div>
                      <button type="button" onClick={() => handleRevokeTravelAccess(acc.id, acc.user_id)}
                        className="font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all duration-150"
                        style={{ color: '#9ca3af', border: '1px solid rgba(0,0,0,0.07)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(220,38,38,0.25)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.05)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.07)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                        Cabut Akses
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
