import { z } from 'zod';

export const createWajibPajakOrangPribadiSchema = z.object({
  nama: z.string({
    required_error: 'Nama harus diisi !',
  }),
  email: z.string({
    required_error: 'Email harus diisi !',
  }),
  kewarganegaraan: z.string({
    required_error: 'Kewarganegaraan harus diisi !',
  }),
  namaNegara: z.string({
    required_error: 'Nama Negara harus diisi !',
  }),
  idOrangPribadi: z.string({
    required_error: 'ID Orang Pribadi harus diisi !',
  }),
  namaIdentitas: z.string({
    required_error: 'Nama Identitas harus diisi',
  }),
  masaBerlakuPassport: z.string().optional(),
  npwp: z.string().optional(),
  namaNpwp: z.string().optional(),
  kotaNpwp: z.string().optional(),
  bankTransfer: z.string().optional(),
  noRekening: z.string().optional(),
  namaRekening: z.string().optional(),
  nip: z.string().optional(),
  statusPegawai: z.string().optional(),
  fileFotoNpwp: z.string().optional(),
  fileFotoIdOrangPribadi: z.string({
    required_error: 'File Foto ID Orang Pribadi harus diisi !',
  }),
  fileFotoBuktiRekening: z.string().optional(),
});
