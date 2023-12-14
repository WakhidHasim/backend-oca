export enum JenisDokumen {
  faktur_pajak = 'Faktur Pajak',
  invoice = 'Invoice',
  bukti_pembayaran = 'Bukti Pembayaran',
}

export enum Status {
  entry = 'Entry',
  verifikasi = 'Verifikasi',
  setor = 'Setor',
  terlapor = 'Terlapor',
  selesai = 'Selesai',
}

export type KegiatanPenghasilanBadan = {
  kode_kegiatan_badan: string;
  tanggal_transaksi: Date;
  uraian_kegiatan: string;
  id_kegiatan_anggaran: string;
  no_dokumen_referensi: string;
  jenis_dokumen_terkait: JenisDokumen;
  kode_jenis_penghasilan: number;
  kode_jenis_pajak: number;
  kode_wp_badan: string;
  penghasilan_bruto: number;
  kode_objek: string;
  tarif_pajak: number;
  potongan_pajak: number;
  penghasilan_diterima: number;
  tanggal_potong_pph: Date;
  no_rekening: string;
  nama_rekening: string;
  narahubung: string;
  file_bukti_potong: string;
  status: Status;
};
