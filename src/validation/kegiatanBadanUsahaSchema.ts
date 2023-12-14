import { z } from 'zod';

const customDateTransformer = (value: string) => new Date(value);

export const createKegaiatanBadanUsahaSchema = z.object({
  tanggalTransaksi: z.string().transform(customDateTransformer),
  uraianKegiatan: z.string().max(200),
  idKegiatanAnggaran: z.string().max(20),
  kodeJenisPenghasilan: z.number(),
  kodeWPBadan: z.string(),
  penghasilanBruto: z.number(),
  kodeObjek: z.string().max(20),
  tanggalPotongPPh: z.string().transform(customDateTransformer),
  noRekening: z.string().max(30),
  namaRekening: z.string().max(100),
  narahubung: z.string().max(100),
  jenisDokumenTerkait: z.string(),
  noDokumenReferensi: z.string(),
  fileBuktiPotong: z.string().max(255), // NOTE: this contain only filename of uploaded content
  kodePeriodeOtorisasi: z.string().optional(),
});

export const updateKegiatanBadanUsahaSchema = z.object({
  tanggalTransaksi: z.string().transform(customDateTransformer).optional(),
  uraianKegiatan: z.string().max(200).optional(),
  idKegiatanAnggaran: z.string().max(20).optional(),
  kodeJenisPenghasilan: z.number().optional(),
  kodeWPBadan: z.string().optional(),
  penghasilanBruto: z.number().optional(),
  kodeObjek: z.string().max(20).optional(),
  tanggalPotongPPh: z.string().transform(customDateTransformer).optional(),
  noRekening: z.string().max(30).optional(),
  namaRekening: z.string().max(100).optional(),
  narahubung: z.string().max(100).optional(),
  jenisDokumenTerkait: z.string().optional(),
  noDokumenReferensi: z.string().optional(),
  fileBuktiPotong: z.string().max(255).optional(),
  kodePeriodeOtorisasi: z.string().optional(),
});
