export enum Kewarganegaraan {
  WNI = 'WNI',
  WNA = 'WNA',
}

export enum StatusPegawai {
  Tetap = 'Tetap',
  TidakTetap = 'Tidak Tetap',
  BukanPegawai = 'Bukan Pegawai',
}

export type WajibPajakOrangPribadi = {
  kode_wpop: string;
  nama: string;
  email: string;
  password?: string;
  kewarganegaraan: Kewarganegaraan;
  nama_negara: string;
  id_orang_pribadi: string;
  nama_ktp: string;
  npwp: string;
  nama_npwp: string;
  kota_npwp: string;
  bank_transfer: string;
  no_rekening: string;
  nama_rekening: string;
  nip: string;
  status_pegawai: StatusPegawai;
  file_foto_npwp: string;
  file_foto_id_orang_pribadi: string;
  file_foto_bukti_rekening: string;
  is_approved: boolean;
};
