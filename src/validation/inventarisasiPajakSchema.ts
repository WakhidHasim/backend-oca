import { z } from 'zod';

export const createInventarisasiPajakSchema = z.object({
  uraianKegiatan: z.string(),
  idKegiatanAnggaran: z.string(),
  nominalDPP: z.number(),
  kodeObjek: z.string(),
  nominalPajak: z.number(),
  fileBukti: z.string(),
  npwpPemotong: z.string().optional(),
  namaPemotong: z.string().optional(),
  idl: z.string(),
});
