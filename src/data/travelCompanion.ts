import { fetchAnnouncements, type KeberangkatanRow, type TravelAnnouncementRow } from '../lib/supabase';
import type { Fase } from '../types';

export type TravelAnnouncement = {
  id: string;
  label: string;
  title: string;
  content: string;
  important?: boolean;
  publishedAt: string;
};

export type TravelOperationalInfo = {
  groupCode: string;
  busNumber: string;
  roomNumber: string;
  hotelMakkah: string;
  hotelMadinah: string;
  meetingPoint: string;
  guideName: string;
  guideRole: string;
  guideWhatsapp: string;
  tourLeaderName: string;
  tourLeaderRole: string;
  tourLeaderWhatsapp: string;
  travelWhatsapp: string;
  emergencyNote: string;
};

export type DailyInstruction = {
  id: string;
  title: string;
  meetingTime: string;
  meetingPoint: string;
  dressCode: string;
  bringItems: string[];
  note: string;
};

const DEFAULT_OPERATIONAL_INFO: TravelOperationalInfo = {
  groupCode: 'Rombongan Al-Fajr 2026',
  busNumber: 'Bus 2',
  roomNumber: '714',
  hotelMakkah: 'Al Marwa Rayhaan by Rotana, Makkah',
  hotelMadinah: 'Dar Al Iman InterContinental, Madinah',
  meetingPoint: 'Lobby utama hotel — lantai dasar dekat resepsionis',
  guideName: 'Ust. Ahmad Fauzi, Lc.',
  guideRole: 'Muthowwif Rombongan',
  guideWhatsapp: '6281312345678',
  tourLeaderName: 'Bpk. Hendra Setiawan',
  tourLeaderRole: 'Tour Leader',
  tourLeaderWhatsapp: '6281298765432',
  travelWhatsapp: '622150001234',
  emergencyNote:
    'Jika tersesat atau memerlukan bantuan mendesak, tetap tenang dan hubungi Ust. Ahmad Fauzi. Tunjukkan Kartu Jamaah Digital kepada petugas masjid atau polisi terdekat.',
};

type JamaahOperationalFields = {
  rombongan?: string | null;
  nomorBus?: string | null;
  nomorKamar?: string | null;
} | null | undefined;

export function getOperationalInfo(
  keberangkatan: KeberangkatanRow | null,
  jamaah?: JamaahOperationalFields,
): TravelOperationalInfo {
  if (!keberangkatan) {
    return {
      ...DEFAULT_OPERATIONAL_INFO,
      groupCode: jamaah?.rombongan ?? DEFAULT_OPERATIONAL_INFO.groupCode,
      busNumber: jamaah?.nomorBus ?? DEFAULT_OPERATIONAL_INFO.busNumber,
      roomNumber: jamaah?.nomorKamar ?? DEFAULT_OPERATIONAL_INFO.roomNumber,
    };
  }
  return {
    groupCode: jamaah?.rombongan ?? DEFAULT_OPERATIONAL_INFO.groupCode,
    busNumber: jamaah?.nomorBus ?? DEFAULT_OPERATIONAL_INFO.busNumber,
    roomNumber: jamaah?.nomorKamar ?? DEFAULT_OPERATIONAL_INFO.roomNumber,
    hotelMakkah: keberangkatan.hotel_makkah ?? DEFAULT_OPERATIONAL_INFO.hotelMakkah,
    hotelMadinah: keberangkatan.hotel_madinah ?? DEFAULT_OPERATIONAL_INFO.hotelMadinah,
    meetingPoint: keberangkatan.meeting_point ?? DEFAULT_OPERATIONAL_INFO.meetingPoint,
    guideName: keberangkatan.guide_name ?? DEFAULT_OPERATIONAL_INFO.guideName,
    guideRole: 'Muthowwif Rombongan',
    guideWhatsapp: keberangkatan.guide_whatsapp ?? DEFAULT_OPERATIONAL_INFO.guideWhatsapp,
    tourLeaderName: keberangkatan.tour_leader_name ?? DEFAULT_OPERATIONAL_INFO.tourLeaderName,
    tourLeaderRole: 'Tour Leader',
    tourLeaderWhatsapp: keberangkatan.tour_leader_whatsapp ?? DEFAULT_OPERATIONAL_INFO.tourLeaderWhatsapp,
    travelWhatsapp: keberangkatan.guide_whatsapp ?? DEFAULT_OPERATIONAL_INFO.travelWhatsapp,
    emergencyNote: keberangkatan.emergency_note ?? DEFAULT_OPERATIONAL_INFO.emergencyNote,
  };
}

export function getTodayInstruction(_tenantId?: string | null): DailyInstruction {
  return {
    id: 'instruction-1',
    title: 'Persiapan kegiatan hari ini',
    meetingTime: '04.30',
    meetingPoint: 'Lobby utama hotel',
    dressCode: 'Pakaian ihram / seragam sesuai arahan pembimbing',
    bringItems: ['Sandal', 'Tas kecil', 'Kartu jamaah', 'Botol minum'],
    note: 'Tetap bersama rombongan dan ikuti arahan pembimbing.',
  };
}

function rowToAnnouncement(row: TravelAnnouncementRow): TravelAnnouncement {
  return {
    id: row.id,
    label: row.label,
    title: row.title,
    content: row.content,
    important: row.important,
    publishedAt: row.published_at,
  };
}

export async function getLatestAnnouncement(keberangkatanId: string | null): Promise<TravelAnnouncement | null> {
  if (!keberangkatanId) return null;
  try {
    const rows = await fetchAnnouncements(keberangkatanId);
    if (!rows.length) return null;
    return rowToAnnouncement(rows[0]);
  } catch {
    return null;
  }
}

export async function getAllAnnouncements(keberangkatanId: string | null): Promise<TravelAnnouncement[]> {
  if (!keberangkatanId) return [];
  try {
    const rows = await fetchAnnouncements(keberangkatanId);
    return rows.map(rowToAnnouncement);
  } catch {
    return [];
  }
}

export function getFocusByFase(fase: Fase): {
  title: string; description: string; ctaLabel: string; ctaTo: string;
} {
  if (fase === 'tanah-suci') {
    return {
      title: 'Fokus ibadah hari ini',
      description: "Ikuti arahan pembimbing, buka panduan ibadah, dan gunakan counter saat tawaf atau sa'i.",
      ctaLabel: 'Buka Navigator',
      ctaTo: '/ibadah/navigator',
    };
  }
  if (fase === 'selesai') {
    return {
      title: 'Jaga kenangan perjalanan',
      description: 'Lengkapi jurnal, simpan sertifikat, dan terus jaga amal setelah pulang.',
      ctaLabel: 'Buka Jurnal',
      ctaTo: '/profil/jurnal',
    };
  }
  return {
    title: 'Persiapkan keberangkatan',
    description: 'Lengkapi checklist, dokumen, perlengkapan, dan pahami tata cara umrah sebelum berangkat.',
    ctaLabel: 'Cek Persiapan',
    ctaTo: '/profil/persiapan',
  };
}

export function whatsappLink(phone: string, message = "Assalamu'alaikum, saya butuh bantuan selama perjalanan umrah."): string {
  const clean = phone.replace(/\D/g, '');
  const normalized = clean.startsWith('0') ? `62${clean.slice(1)}` : clean;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
