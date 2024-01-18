import { z } from 'zod';

export const createItemKegiatanPenghasilanOrangPribadiSchema = z.object({
  kodeKegiatanOP: z.string(),
  kodeWPOP: z.string(),
  penghasilanBruto: z.number(),
  kodeObjek: z.string(),
  metodePotong: z.string(),
});
