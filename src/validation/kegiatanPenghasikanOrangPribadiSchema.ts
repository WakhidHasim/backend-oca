import { TypeOf, z } from 'zod';

export const createKegiatanOrangPribadiSchema = z.object({
  uraianKegiatan: z.string({
    required_error: 'Uraian Kegiatan harus diisi !',
  }),
  idKegiatanAnggaran: z.string({
    required_error: 'Id Kegiatan Anggaran harus diisi !',
  }),
  kodeJenisPenghasilan: z.number({
    required_error: 'Kode Jenis Penghasilan harus diisi !',
  }),
  picPencairanPenghasilan: z.string({
    required_error: 'PIC Pencairan Penghasilan harus diisi !',
  }),
  mintaBillingSendiri: z.boolean({
    required_error: 'Minta Billing Sendiri harus diisi !',
  }),
  idl: z.string({
    required_error: 'IDL harus diisi !',
  }),
});

export type CreateKegiatanOrangPribadiInput = TypeOf<
  typeof createKegiatanOrangPribadiSchema
>;
