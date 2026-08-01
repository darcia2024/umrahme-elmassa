import React, { useState } from "react";

export function UploadBuktiBayar() {
  const [bookingCode, setBookingCode] = useState("BK-202607-001");
  const [customerName, setCustomerName] = useState("H. Rusli Suparman");
  const [amount, setAmount] = useState("50000000");
  const [paymentType, setPaymentType] = useState("DP");
  const [bankDestination, setBankDestination] = useState("BCA - 8440-888-999 a.n PT AL MASSA AZKA WISATA");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs space-y-3 font-sans max-w-full overflow-hidden">
      
      {/* Toast Notifikasi Berhasil */}
      {isSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
              ✓
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold truncate">Bukti Transfer Dikirim ke Admin!</p>
              <p className="text-[10px] text-emerald-700 truncate">
                Admin sedang memverifikasi Kuitansi KW-202607-001.
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-extrabold text-stone-900 tracking-tight truncate">
          Upload Bukti Setoran Pembayaran
        </h3>
        <p className="text-[10px] text-stone-400 mt-0.5 truncate">
          Kirim bukti transfer bank ke Keuangan PT. Al Massa Azka Wisata.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          
          {/* Kode Booking */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Kode Booking</label>
            <input
              type="text"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-mono font-bold text-stone-900 outline-none focus:border-brand-pink"
              required
            />
          </div>

          {/* Nama Jamaah */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Nama Jamaah</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-bold text-stone-900 outline-none focus:border-brand-pink"
              required
            />
          </div>

          {/* Nominal Transfer */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Nominal Setoran (Rp)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-mono font-bold text-stone-900 outline-none focus:border-brand-pink"
              required
            />
          </div>

          {/* Tipe Pembayaran */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Jenis Setoran</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full h-10 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-bold text-stone-900 outline-none focus:border-brand-pink"
            >
              <option value="DP">Uang Muka (DP)</option>
              <option value="Cicilan">Cicilan Ke-2</option>
              <option value="Pelunasan">Pelunasan Lunas</option>
            </select>
          </div>

        </div>

        {/* Bank Tujuan */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Rekening Bank Tujuan Transfer</label>
          <input
            type="text"
            readOnly
            value={bankDestination}
            className="w-full h-10 rounded-xl border border-stone-200 bg-amber-50/60 px-3 text-xs font-bold text-amber-900 outline-none cursor-default"
          />
        </div>

        {/* Upload File Dropzone */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">File Struk / Bukti Transfer (JPG/PNG/PDF)</label>
          <div className="relative border-2 border-dashed border-stone-200 rounded-xl p-4 text-center bg-stone-50 hover:bg-stone-100 transition cursor-pointer">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-1">
              <span className="text-xl">📄</span>
              <p className="text-xs font-bold text-stone-700">
                {fileName ? `File Terpilih: ${fileName}` : "Klik di sini atau seret foto bukti transfer Anda"}
              </p>
              <p className="text-[10px] text-stone-400">Maksimal 5 MB • Format JPG, PNG, PDF</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-11 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-xs hover:bg-emerald-700 active:scale-95 transition cursor-pointer"
        >
          Kirim Bukti Pembayaran Ke Admin El Massa →
        </button>

      </form>
    </div>
  );
}
