import { TypeOf, z } from 'zod';

export const createWajibPajakBadanUsahaSchema = z.object({
  namaBadan: z.string({
    required_error: 'Nama Badan harus diisi !',
  }),
  email: z.string({
    required_error: 'Email harus diisi !',
  }),
  npwp: z.string().optional(),
  namaNpwp: z.string().optional(),
  kotaNpwp: z.string().optional(),
  bankTransfer: z.string().optional(),
  noRekening: z.string().optional(),
  namaRekening: z.string().optional(),
  namaNaraHubung: z.string({
    required_error: 'Nama Narahubung harus diisi !',
  }),
  kontakNaraHubung: z.string({
    required_error: 'Kontak Narahubung harus diisi !',
  }),
  adaSkbPPh23: z.string({
    required_error: 'Ada Skb PPh 23 harus diisi !',
  }),
  masaBerlakuBebasPPh23: z.string().optional(),
  fileFotoIdentitasBadan: z.string({
    required_error: 'File Foto Identitas Badan harus diisi !',
  }),
  fileFotoBuktiRekening: z.string({
    required_error: 'File Foto Bukti Rekening harus diisi !',
  }),
  fileFotoNpwp: z.string().optional(),
  fileSuratBebasPPh23: z.string().optional(),
  statusPkp: z.string({
    required_error: 'Status Pkp harus diisi !',
  }),
});

export type createWajibPajakBadanUsahaInput = TypeOf<
  typeof createWajibPajakBadanUsahaSchema
>;
