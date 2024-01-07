import { z } from 'zod';

export const createKegiatanBadanUsahaSchema = z.object({
  uraianKegiatan: z.string(),
  idKegiatanAnggaran: z.string(),
  kodeJenisPenghasilan: z.number(),
  kodeWPBadan: z.string(),
  penghasilanBruto: z.number(),
  kodeObjek: z.string(),
  invoice: z.string().optional(),
  fakturPajak: z.string().optional(),
  dokumenKerjasamaKegiatan: z.string().optional(),
  pic: z.string(),
});
