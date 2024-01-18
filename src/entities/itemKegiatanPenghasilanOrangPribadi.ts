export type ItemKegiatanPenghasilanOrangPribadi = {
  id: string;
  kodeKegiatanOP: string;
  kodeWPOP: string;
  statusPegawai: string;
  npwp?: string;
  lapisan?: number;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  penghasilanBruto: number;
  kodeObjek: string;
  tarifBerlaku: number;
  potonganPajak: number;
  penghasilanDiterima: number;
  metodePotong: string;
  fileBuktiPotong?: string;
  status: string;
};
