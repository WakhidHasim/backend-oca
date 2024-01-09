import { z } from 'zod';

export const createKegiatanOrangPribaiSchema = z.object({
  uraianKegiatan: z.string(),
  idKegiatanAnggaran: z.string(),
  kodeJenisPenghasilan: z.number(),
  picPencairanPenghasilan: z.string(),
  mintaBillingSendiri: z.boolean(),
  idl: z.string(),
});
