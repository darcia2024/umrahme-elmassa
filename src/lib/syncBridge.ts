export type SyncUpdatePayload = {
  id: string;
  nomorJamaah: string;
  nama: string;
  kamar?: string;
  bus?: string;
  flight?: string;
  rombongan?: string;
  eVisa?: string;
  timestamp: number;
};

export const SYNC_JAMAAH_KEY = "el_massa_jamaah_live_updates";
export const SYNC_PAYMENT_KEY = "umrahme_payment_uploads";

/**
 * Listener di UmrahMe untuk menerima pembaruan 0-detik dari El Massa Web Admin
 */
export function listenForAdminJamaahUpdates(onUpdate: (data: SyncUpdatePayload) => void) {
  function handleStorage(e: StorageEvent) {
    if (e.key === SYNC_JAMAAH_KEY && e.newValue) {
      try {
        const payload: SyncUpdatePayload = JSON.parse(e.newValue);
        onUpdate(payload);
      } catch (err) {
        console.warn("Parsing sync update failed", err);
      }
    }
  }

  function handleCustomEvent(e: Event) {
    const customEv = e as CustomEvent<SyncUpdatePayload>;
    if (customEv.detail) {
      onUpdate(customEv.detail);
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener("el_massa_jamaah_update", handleCustomEvent);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("el_massa_jamaah_update", handleCustomEvent);
  };
}

/**
 * Broadcast dari UmrahMe ke El Massa Web (cth: Upload Struk Bayar Jamaah)
 */
export function broadcastPaymentUploadFromJamaah(nama: string, nominal: string, bookingCode: string) {
  const payload = {
    id: String(Date.now()),
    nama,
    nominal,
    bookingCode,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(SYNC_PAYMENT_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent("umrahme_payment_upload", { detail: payload }));
  } catch (err) {
    console.warn("Broadcast payment upload failed", err);
  }
}
