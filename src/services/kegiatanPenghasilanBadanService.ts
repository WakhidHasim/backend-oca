import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';
import { handleZodError } from '../error/ZodError';

import { KegiatanPenghasilanBadan } from '../entities/kegiatanPenghasilanBadan';
import { createKegaiatanBadanUsahaSchema } from '../validation/kegiatanBadanUsahaSchema';

type CreatePph23Param = KegiatanPenghasilanBadan;
type UpdatePph23Pram = KegiatanPenghasilanBadan;

type GetPph23Pram = {
  kode_kegiatan_badan?: string;
  tanggal_transaksi?: Date;
  uraian_kegiatan?: string;
  id_kegiatan_anggaran?: string;
  kode_jenis_penghasilan?: number;
  kode_jenis_pajak?: number;
  kode_wp_badan?: string;
  penghasilan_bruto?: number;
  kode_objek?: string;
  tarif_pajak?: number;
  tanggal_potong_pph?: Date;
  tanggal_setor_pph?: Date;
  tanggal_bayar_pph?: Date;
  no_rekening?: string;
  nama_rekening?: string;
  narahubung?: string;
  file_bukti_potong?: string;
};

const padNumber = (number: number, length: number): string => {
  let str: string = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};

const generateKodeKegiatanBadan = async (): Promise<string> => {
  try {
    const twoDigitYear: string = new Date().getFullYear().toString().slice(-2);
    const countData = await prisma.kegiatanPenghasilanBadan.count();
    const paddedNumber: string = padNumber(countData + 1, 5);
    const code: string = `KBU${twoDigitYear}${paddedNumber}`;
    return code;
  } catch (error) {
    console.error('Error generating Kode Kegiatan Badan:', error);
    throw error;
  }
};

export const createKegiatanPenghasilanBadanPPh23 = async (
  data: CreatePph23Param
) => {
  const validator = createKegaiatanBadanUsahaSchema.safeParse({
    kodeKegiatanBadan: data.kode_kegiatan_badan,
    tanggalTransaksi: data.tanggal_transaksi,
    uraianKegiatan: data.uraian_kegiatan,
    idKegiatanAnggaran: data.id_kegiatan_anggaran,
    kodeJenisPenghasilan: data.kode_jenis_penghasilan,
    kodeJenisPajak: data.kode_jenis_pajak,
    kodeWPBadan: data.kode_wp_badan,
    penghasilanBruto: data.penghasilan_bruto,
    kodeObjek: data.kode_objek,
    tarifPajak: data.tarif_pajak,
    tanggalPotongPPh: data.tanggal_potong_pph,
    tanggalSetorPPh: data.tanggal_setor_pph,
    tanggalBayarPPh: data.tanggal_bayar_pph,
    noRekening: data.no_rekening,
    namaRekening: data.nama_rekening,
    narahubung: data.narahubung,
    fileBuktiPotong: data.file_bukti_potong,
  });

  if (!validator.success)
    throw new BadRequestError(handleZodError(validator.error));

  const requestBody = validator.data;

  const kodeKegiatanBadan = await generateKodeKegiatanBadan();
  const existingKodeKegiatanBadan =
    await prisma.kegiatanPenghasilanBadan.findUnique({
      where: { kodeKegiatanBadan: kodeKegiatanBadan },
    });

  if (existingKodeKegiatanBadan) {
    throw new BadRequestError('Kode Kegiatan Badan sudah ada dalam database.');
  }

  const existingKodeJenisPenghasilan = await prisma.jenisPenghasilan.findUnique(
    {
      where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
    }
  );

  if (!existingKodeJenisPenghasilan) {
    throw new BadRequestError(
      'Kode Jenis Penghasilan tidak valid atau tidak ditemukan.'
    );
  }

  const existingKodeWPBadan = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWPBadan: requestBody.kodeWPBadan },
  });

  if (!existingKodeWPBadan) {
    throw new BadRequestError('Kode WP Badan tidak valid.');
  }

  const existingKodeObject = await prisma.objekPajak.findUnique({
    where: { kodeObjek: requestBody.kodeObjek },
  });

  if (!existingKodeObject) {
    throw new BadRequestError('Kode Objek tidak valid.');
  }

  const tarifPajak = 0.02 * requestBody.penghasilanBruto;

  const craetePPh23 = await prisma.kegiatanPenghasilanBadan.create({
    data: {
      kodeKegiatanBadan: kodeKegiatanBadan,
      tanggalTransaksi: requestBody.tanggalTransaksi,
      uraianKegiatan: requestBody.uraianKegiatan,
      idKegiatanAnggaran: requestBody.idKegiatanAnggaran,
      kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan,
      kodeJenisPajak: 2,
      kodeWPBadan: requestBody.kodeWPBadan,
      penghasilanBruto: requestBody.penghasilanBruto,
      kodeObjek: requestBody.kodeObjek,
      tarifPajak: tarifPajak,
      tanggalPotongPPh: requestBody.tanggalPotongPPh,
      tanggalSetorPPh: requestBody.tanggalSetorPPh,
      tanggalBayarPPh: requestBody.tanggalBayarPPh,
      noRekening: requestBody.noRekening,
      namaRekening: requestBody.namaRekening,
      narahubung: requestBody.narahubung,
      fileBuktiPotong: requestBody.fileBuktiPotong,
    },
  });

  return {
    kode_kegiatan_badan: craetePPh23.kodeKegiatanBadan,
    tanggal_transaksi: craetePPh23.tanggalTransaksi,
    uraian_kegiatan: craetePPh23.uraianKegiatan,
    id_kegiatan_anggaran: craetePPh23.idKegiatanAnggaran,
    kode_jenis_penghasilan: craetePPh23.kodeJenisPenghasilan,
    kode_jenis_pajak: craetePPh23.kodeJenisPajak,
    kode_wp_badan: craetePPh23.kodeWPBadan,
    penghasilan_bruto: craetePPh23.penghasilanBruto,
    kode_objek: craetePPh23.kodeObjek,
    tarif_pajak: craetePPh23.tarifPajak,
    tanggal_potong_pph: craetePPh23.tanggalPotongPPh,
    tanggal_setor_pph: craetePPh23.tanggalSetorPPh,
    tanggal_bayar_pph: craetePPh23.tanggalBayarPPh,
    no_rekening: craetePPh23.noRekening,
    nama_rekening: craetePPh23.namaRekening,
    narahubung: craetePPh23.narahubung,
    file_bukti_potong: craetePPh23.fileBuktiPotong,
  };
};

export const getKegiatanPenghasilanBadanPPh23List = async (
  data: GetPph23Pram
) => {
  const kegiatanPenghasilanBadanPPh23List = {
    kodeKegiatanBadan: data?.kode_kegiatan_badan,
    tanggalTransaksi: data?.tanggal_transaksi,
    uraianKegiatan: data?.uraian_kegiatan,
    idKegiatanAnggaran: data?.id_kegiatan_anggaran,
    kodeJenisPenghasilan: data?.kode_jenis_penghasilan,
    kodeJenisPajak: data?.kode_jenis_pajak,
    kodeWPBadan: data?.kode_wp_badan,
    penghasilanBruto: data?.penghasilan_bruto,
    kodeObjek: data?.kode_objek,
    tarifPajak: data?.tarif_pajak,
    tanggalPotongPPh: data?.tanggal_potong_pph,
    tanggalSetorPPh: data?.tanggal_setor_pph,
    tanggalBayarPPh: data?.tanggal_bayar_pph,
    noRekening: data?.no_rekening,
    namaRekening: data?.nama_rekening,
    narahubung: data?.narahubung,
    fileBuktiPotong: data?.file_bukti_potong,
  };

  return prisma.kegiatanPenghasilanBadan.findMany({
    where: kegiatanPenghasilanBadanPPh23List,
  });
};

export const updateKegiatanPenghasilanBadanPPh23 = async (
  kode_kegiatan_badan: string,
  data: UpdatePph23Pram
) => {
  const validator = createKegaiatanBadanUsahaSchema.safeParse({
    kodeKegiatanBadan: data.kode_kegiatan_badan,
    tanggalTransaksi: data.tanggal_transaksi,
    uraianKegiatan: data.uraian_kegiatan,
    idKegiatanAnggaran: data.id_kegiatan_anggaran,
    kodeJenisPenghasilan: data.kode_jenis_penghasilan,
    kodeJenisPajak: data.kode_jenis_pajak,
    kodeWPBadan: data.kode_wp_badan,
    penghasilanBruto: data.penghasilan_bruto,
    kodeObjek: data.kode_objek,
    tarifPajak: data.tarif_pajak,
    tanggalPotongPPh: data.tanggal_potong_pph,
    tanggalSetorPPh: data.tanggal_setor_pph,
    tanggalBayarPPh: data.tanggal_bayar_pph,
    noRekening: data.no_rekening,
    namaRekening: data.nama_rekening,
    narahubung: data.narahubung,
    fileBuktiPotong: data.file_bukti_potong,
  });

  if (!validator.success)
    throw new BadRequestError(handleZodError(validator.error));

  const requestBody = validator.data as { [key: string]: any };

  const isoDateFields = [
    'tanggal_transaksi',
    'tanggal_potong_pph',
    'tanggal_setor_pph',
    'tanggal_bayar_pph',
  ];

  isoDateFields.forEach((field) => {
    if (requestBody[field] instanceof Date) {
      requestBody[field] = requestBody[field].toISOString();
    }
  });

  const existingKodeJenisPenghasilan = await prisma.jenisPenghasilan.findUnique(
    {
      where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
    }
  );

  if (!existingKodeJenisPenghasilan) {
    throw new BadRequestError(
      'Kode Jenis Penghasilan tidak valid atau tidak ditemukan.'
    );
  }

  const existingKodeWPBadan = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWPBadan: requestBody.kodeWPBadan },
  });

  if (!existingKodeWPBadan) {
    throw new BadRequestError('Kode WP Badan tidak valid.');
  }

  const existingKodeObject = await prisma.objekPajak.findUnique({
    where: { kodeObjek: requestBody.kodeObjek },
  });

  if (!existingKodeObject) {
    throw new BadRequestError('Kode Objek tidak valid.');
  }

  const tarifPajak = 0.02 * requestBody.penghasilanBruto;

  const updatekegiatanPenghasilanBadanPPh23 =
    await prisma.kegiatanPenghasilanBadan.update({
      where: { kodeKegiatanBadan: kode_kegiatan_badan },
      data: {
        kodeKegiatanBadan: data?.kode_kegiatan_badan,
        tanggalTransaksi: requestBody.tanggal_transaksi,
        uraianKegiatan: data?.uraian_kegiatan,
        idKegiatanAnggaran: data?.id_kegiatan_anggaran,
        kodeJenisPenghasilan: data?.kode_jenis_penghasilan,
        kodeJenisPajak: data?.kode_jenis_pajak,
        kodeWPBadan: data?.kode_wp_badan,
        penghasilanBruto: data?.penghasilan_bruto,
        kodeObjek: data?.kode_objek,
        tarifPajak: tarifPajak,
        tanggalPotongPPh: requestBody.tanggal_potong_pph,
        tanggalSetorPPh: requestBody.tanggal_setor_pph,
        tanggalBayarPPh: requestBody.tanggal_bayar_pph,
        noRekening: data?.no_rekening,
        namaRekening: data?.nama_rekening,
        narahubung: data?.narahubung,
        fileBuktiPotong: data?.file_bukti_potong,
      },
    });

  if (!updatekegiatanPenghasilanBadanPPh23) {
    return null;
  }

  return {
    kode_kegiatan_badan: updatekegiatanPenghasilanBadanPPh23.kodeKegiatanBadan,
    tanggal_transaksi: updatekegiatanPenghasilanBadanPPh23.tanggalTransaksi,
    uraian_kegiatan: updatekegiatanPenghasilanBadanPPh23.uraianKegiatan,
    id_kegiatan_anggaran:
      updatekegiatanPenghasilanBadanPPh23.idKegiatanAnggaran,
    kode_jenis_penghasilan:
      updatekegiatanPenghasilanBadanPPh23.kodeJenisPenghasilan,
    kode_jenis_pajak: updatekegiatanPenghasilanBadanPPh23.kodeJenisPajak,
    kode_wp_badan: updatekegiatanPenghasilanBadanPPh23.kodeWPBadan,
    penghasilan_bruto: updatekegiatanPenghasilanBadanPPh23.penghasilanBruto,
    kode_objek: updatekegiatanPenghasilanBadanPPh23.kodeObjek,
    tarif_pajak: updatekegiatanPenghasilanBadanPPh23.tarifPajak,
    tanggal_potong_pph: updatekegiatanPenghasilanBadanPPh23.tanggalPotongPPh,
    tanggal_setor_pph: updatekegiatanPenghasilanBadanPPh23.tanggalSetorPPh,
    tanggal_bayar_pph: updatekegiatanPenghasilanBadanPPh23.tanggalBayarPPh,
    no_rekening: updatekegiatanPenghasilanBadanPPh23.noRekening,
    nama_rekening: updatekegiatanPenghasilanBadanPPh23.namaRekening,
    narahubung: updatekegiatanPenghasilanBadanPPh23.narahubung,
    file_bukti_potong: updatekegiatanPenghasilanBadanPPh23.fileBuktiPotong,
  };
};

export const deleteKegiatanPenghasilanBadanPph23 = async (
  kode_kegiatan_badan: string
) => {
  const existingRecord = await prisma.kegiatanPenghasilanBadan.findUnique({
    where: { kodeKegiatanBadan: kode_kegiatan_badan },
  });

  if (!existingRecord) {
    throw new Error('Record to delete does not exist');
  }
  const deleteKegiatanPenghasilanBadanPPh23 =
    await prisma.kegiatanPenghasilanBadan.delete({
      where: { kodeKegiatanBadan: kode_kegiatan_badan },
    });

  return !!deleteKegiatanPenghasilanBadanPPh23;
};
