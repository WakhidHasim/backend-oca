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
  tanggalSetorPPh: z.string().transform(customDateTransformer),
  tanggalBayarPPh: z.string().transform(customDateTransformer),
  noRekening: z.string().max(30),
  namaRekening: z.string().max(100),
  narahubung: z.string().max(100),
  fileBuktiPotong: z.string().max(255),
  kodePeriodeOtorisasi: z.string().optional(),
});

export const updateKegaiatanBadanUsahaSchema = z.object({
  kodeKegiatanBadan: z.string().max(50),
  tanggalTransaksi: z.string().transform(customDateTransformer),
  uraianKegiatan: z.string().max(200),
  idKegiatanAnggaran: z.string().max(20),
  kodeJenisPenghasilan: z.number(),
  kodeWPBadan: z.string(),
  penghasilanBruto: z.number(),
  kodeObjek: z.string().max(20),
  tanggalPotongPPh: z.string().transform(customDateTransformer),
  tanggalSetorPPh: z.string().transform(customDateTransformer),
  tanggalBayarPPh: z.string().transform(customDateTransformer),
  noRekening: z.string().max(30),
  namaRekening: z.string().max(100),
  narahubung: z.string().max(100),
  fileBuktiPotong: z.string().max(255),
  kodePeriodeOtorisasi: z.string().optional(),
});
