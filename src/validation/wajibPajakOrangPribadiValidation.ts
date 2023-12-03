import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png'];

export const createWajibPajakOrangPribadiValidation = z.object({
  nama: z.string().max(100).min(1),
  email: z.string().max(200).email(),
  password: z.string().max(255).optional(),
  kewarganegaraan: z.string().max(5),
  namaNegara: z.string().max(100),
  idOrangPribadi: z.number().max(30),
  namaKtp: z.string().max(100).min(1),
  npwp: z.number().max(30).optional(),
  namaNpwp: z.string().max(100).min(1).optional(),
  kotaNpwp: z.string().max(500).optional(),
  bankTransfer: z.string().max(50).optional(),
  noRekening: z.number().max(30).optional(),
  namaRekening: z.string().max(100).optional(),
  nip: z.string().max(50).optional(),
  statusPegawai: z.string().max(30),
  fileFotoNpwp: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, and .png formats are supported.'
    ),
  fileFotoIdOrangPribadi: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, and .png formats are supported.'
    ),
  fileFotoBuktiRekening: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, and .png formats are supported.'
    ),
  isApproved: z.boolean(),
});
