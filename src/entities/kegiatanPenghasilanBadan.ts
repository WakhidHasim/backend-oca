export type KegiatanPenghasilanBadan = {
  kodeKegiatanBadan: string;
  tanggalInput: Date;
  uraianKegiatan: string;
  idKegiatanAnggaran: string;
  kodeJenisPenghasilan: number;
  kodeJenisPajak: number;
  pic: string;
  kodeWPBadan: string;
  penghasilanBruto: number;
  kodeObjek: string;
  invoice: string | Buffer;
  fakturPajak?: string | Buffer;
  dokumenKerjasamaKegiatan: string | Buffer;
  status: string;
  idl: string;
};
