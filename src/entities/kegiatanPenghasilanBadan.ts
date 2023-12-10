export type KegiatanPenghasilanBadan = {
  kode_kegiatan_badan: string;
  tanggal_transaksi: Date;
  uraian_kegiatan: string;
  id_kegiatan_anggaran: string;
  kode_jenis_penghasilan: number;
  kode_jenis_pajak: number;
  kode_wp_badan: string;
  penghasilan_bruto: number;
  kode_objek: string;
  tarif_pajak: number;
  tanggal_potong_pph: Date;
  tanggal_setor_pph: Date;
  tanggal_bayar_pph: Date;
  no_rekening: string;
  nama_rekening: string;
  narahubung: string;
  file_bukti_potong: string;
};
