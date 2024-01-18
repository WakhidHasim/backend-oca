import { z } from 'zod';

export const createWajibPajakOrangPribadiValidation = z.object({
  nama: z.string(),
  email: z.string(),
  kewarganegaraan: z.string(),
  namaNegara: z.string(),
  idOrangPribadi: z.string(),
  namaIdentitas: z.string(),
  masaBerlakuPassport: z.date().optional(),
  npwp: z.string().optional(),
  namaNpwp: z.string().optional(),
  kotaNpwp: z.string().optional(),
  bankTransfer: z.string().optional(),
  noRekening: z.string().optional(),
  namaRekening: z.string().optional(),
  nip: z.string().optional(),
  statusPegawai: z.string().optional(),
  fileFotoNpwp: z.string().optional(),
  fileFotoIdOrangPribadi: z.string(),
  fileFotoBuktiRekening: z.string().optional(),
});
