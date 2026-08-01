import { useState, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { doaById, kategoriDoaMeta } from '../data/doa';
import PageHeader from '../components/PageHeader';
import MihrabCard from '../components/MihrabCard';
import EmptyState from '../components/EmptyState';
import { IconChevron, IconDoa } from '../components/icons';

function Accordion({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-surface-bone">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
          {label}
        </span>
        <IconChevron
          className={`h-4 w-4 flex-none text-ash transition-transform ${
            open ? 'rotate-90' : ''
          }`}
        />
      </button>
      {open ? (
        <div className="px-4 pb-4 text-[15px] leading-relaxed text-body animate-fade-up">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default function DoaDetail() {
  const { id } = useParams();
  const doa = id ? doaById(id) : undefined;

  if (!doa) {
    return (
      <div>
        <PageHeader title="Doa" eyebrow="Kumpulan Doa" backTo="/doa" />
        <EmptyState
          icon={<IconDoa className="h-7 w-7" />}
          title="Doa tidak ditemukan"
          desc="Doa yang Anda cari mungkin telah dipindahkan."
        />
      </div>
    );
  }

  const katMeta = kategoriDoaMeta.find((k) => k.id === doa.kategori);
  const adaBacaan = Boolean(doa.arab || doa.latin || doa.terjemahan);

  return (
    <div>
      <PageHeader
        title={doa.judul}
        eyebrow={katMeta?.judul ?? 'Doa'}
        backTo={`/doa?kategori=${doa.kategori}`}
      />

      <div className="space-y-3 px-5 pt-4 pb-8">
        {adaBacaan ? (
          <MihrabCard bodyClassName="px-5 pb-6 pt-3">
            {doa.arab ? (
              <p className="text-center font-arab text-[34px] leading-[2] text-gold" dir="rtl">
                {doa.arab}
              </p>
            ) : null}
            {doa.latin ? (
              <p className="mt-4 text-center text-[15px] italic leading-relaxed text-body">
                {doa.latin}
              </p>
            ) : null}
            {doa.terjemahan ? (
              <p className="mt-3 text-center text-sm leading-relaxed text-charcoal">
                "{doa.terjemahan}"
              </p>
            ) : null}
          </MihrabCard>
        ) : (
          <div className="rounded-md border border-gold/20 bg-gold/5 px-5 py-6 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-gold">
              Konten dalam peninjauan
            </p>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Teks bacaan doa ini belum ditampilkan karena masih perlu diverifikasi oleh
              ustadz sebelum dipublikasikan. Lihat catatan praktik di bawah.
            </p>
          </div>
        )}

        {doa.perluVerifikasi ? (
          <p className="rounded-md border border-gold/20 bg-gold/5 px-4 py-2.5 text-center text-xs leading-relaxed text-gold">
            Sumber masih perlu verifikasi ulama sebelum dijadikan rujukan pasti.
          </p>
        ) : null}

        <div className="mt-1 space-y-2.5">
          {doa.arti ? <Accordion label="Arti / Makna">{doa.arti}</Accordion> : null}
          {doa.dalil ? <Accordion label="Dalil & Sumber">{doa.dalil}</Accordion> : null}
          {doa.cara ? <Accordion label="Cara Mengamalkan">{doa.cara}</Accordion> : null}
          {doa.waktu ? <Accordion label="Waktu Membaca">{doa.waktu}</Accordion> : null}
        </div>
      </div>
    </div>
  );
}
