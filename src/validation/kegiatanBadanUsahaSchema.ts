import { TypeOf, z } from 'zod';

export const createKegiatanBadanUsahaSchema = z.object({
  uraianKegiatan: z.string({
    required_error: 'Uraian Kegiatan harus diisi !',
  }),
  idKegiatanAnggaran: z.string({
    required_error: 'Id Kegiatan Anggaran harus diisi !',
  }),
  kodeJenisPenghasilan: z.number({
    required_error: 'Kode Jenis Penghasilan harus diisi !',
  }),
  kodeWPBadan: z.string({
    required_error: 'Kode WP Badan harus diisi !',
  }),
  penghasilanBruto: z.number({
    required_error: 'Penghasilan Bruto harus diisi !',
  }),
  kodeObjek: z.string({
    required_error: 'Kode Objek harus diisi !',
  }),
  invoice: z.string({
    required_error: 'Invoice harus diisi !',
  }),
  fakturPajak: z.string().optional(),
  dokumenKerjasamaKegiatan: z.string({
    required_error: 'Dokumen Kerjasama Kegiatan harus diisi !',
  }),
  pic: z.string({
    required_error: 'PIC harus diisi !',
  }),
  idl: z.string({
    required_error: 'IDL harus diisi !',
  }),
});

export type CreateKegiatanBadanUsahaInput = TypeOf<
  typeof createKegiatanBadanUsahaSchema
>;
