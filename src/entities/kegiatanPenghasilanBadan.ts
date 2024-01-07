export enum Status {
  entry = 'Entry',
  verifikasi = 'Verifikasi',
  setor = 'Di Setor',
  terlapor = 'Terlapor DJP',
  selesai = 'Selesai',
}

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
  tarifPajak: number;
  potonganPajak: number;
  penghasilanDiterima: number;
  noRekening: string;
  namaRekening: string;
  bankTransfer: string;
  narahubung: string;
  invoice: string;
  fakturPajak: string;
  dokumenKerjasamaKegiatan: string;
  status: Status;
  idl: string;
  npwp: string;
};
