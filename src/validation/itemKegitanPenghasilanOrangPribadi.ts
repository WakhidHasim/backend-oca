import { z } from 'zod';

export const createItemKegiatanPenghasilanOrangPribadiSchema = z.object({
  kodeKegiatanOP: z.string({
    required_error: 'Kode Kegiatan OP harus diisi !',
  }),
  kodeWajibPajakOrangPribadi: z.string({
    required_error: 'Kode Wajib Pajak Orang Pribadi harus diisi !',
  }),
  penghasilanBruto: z.number({
    required_error: 'Penghasilan Bruto harus diisi !',
  }),
  kodeObjek: z.string({
    required_error: 'Kode Objek harus diisi !',
  }),
  metodePotong: z.string({
    required_error: 'Metode Potong harus diisi !',
  }),
});
