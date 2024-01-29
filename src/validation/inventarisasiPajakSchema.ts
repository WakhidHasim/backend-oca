import { z } from 'zod';

export const createInventarisasiPajakSchema = z.object({
  uraianKegiatan: z.string({
    required_error: 'Uraian Kegiatan harus diisi !',
  }),
  idKegiatanAnggaran: z.string({
    required_error: 'Id Kegiatan Anggaran harus diisi !',
  }),
  nominalDPP: z.number({
    required_error: 'Nominal DPP harus diisi !',
  }),
  kodeObjek: z.string({
    required_error: 'Kode Objek harus diisi !',
  }),
  nominalPajak: z.number({
    required_error: 'Nominal Pajak harus diisi !',
  }),
  fileBukti: z.string({
    required_error: 'File Bukti harus diisi !',
  }),
  npwpPemotong: z.string().optional(),
  namaPemotong: z.string().optional(),
  idl: z.string({
    required_error: 'IDL harus diisi !',
  }),
});
