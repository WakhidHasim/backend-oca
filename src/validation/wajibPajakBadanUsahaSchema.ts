import { z } from 'zod';

export const createWajibPajakBadanUsahaSchema = z.object({
  namaBadan: z.string(),
  email: z.string(),
  npwp: z.string().optional(),
  namaNpwp: z.string().optional(),
  kotaNpwp: z.string().optional(),
  bankTransfer: z.string().optional(),
  noRekening: z.string().optional(),
  namaRekening: z.string().optional(),
  namaNaraHubung: z.string(),
  kontakNaraHubung: z.string(),
  adaSkbPPh23: z.string(),
  masaBerlakuBebasPPh23: z.date().optional(),
  fileFotoIdentitasBadan: z.string(),
  fileFotoBuktiRekening: z.string(),
  fileFotoNpwp: z.string().optional(),
  fileSuratBebasPPh23: z.string().optional(),
  statusPkp: z.string(),
});
