import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';
import { handleZodError } from '../error/ZodError';
import { DateTime } from 'luxon';

import { KegiatanPenghasilanBadan } from '../entities/kegiatanPenghasilanBadan';
import {
  createKegaiatanBadanUsahaSchema,
  updateKegiatanBadanUsahaSchema,
} from '../validation/kegiatanBadanUsahaSchema';

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
  penghasilan_diterima?: number;
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
    // const twoDigitYear: string = new Date().getFullYear().toString().slice(-2);
    // const countData = await prisma.kegiatanPenghasilanBadan.count();
    // const paddedNumber: string = padNumber(countData + 1, 5);
    // const code: string = `KBU${twoDigitYear}${paddedNumber}`;

    const dt = DateTime.utc()
    const date = dt.toISODate()

    const result = await prisma.$executeRawUnsafe(
      `SELECT MAX(running_code) as running_code FROM kegiatan_penghasilan_badan WHERE created_at::date BETWEEN ${date} AND ${date}`
    )

    let runningCode = 0
    if (result.running_code != null) {
      runningCode = Number(result.running_code)
    }

    return `KBU${dt.toFormat("yy")}${String(runningCode).padStart(5, "0")}`
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
    penghasilanDiterima: data.penghasilan_diterima,
    tanggalPotongPPh: data.tanggal_potong_pph,
    noRekening: data.no_rekening,
    namaRekening: data.nama_rekening,
    narahubung: data.narahubung,
    jenisDokumenTerkait: data.jenis_dokumen_terkait,
    noDokumenReferensi: data.no_dokumen_referensi,
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

  const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWPBadan: requestBody.kodeWPBadan },
  });

  const wajibPajakNpwp = wajibPajakBadanUsaha.npwp;

  const tarifNpwp = existingKodeObject.tarifNpwp;
  const tarifNonNpwp = existingKodeObject.tarifNonNpwp;

  let tarifPajak;

  if (wajibPajakNpwp === '0000000000000000' || wajibPajakNpwp == 'BELUM ADA') {
    tarifPajak = tarifNonNpwp;
  } else {
    tarifPajak = tarifNpwp;
  }

  const potonganPajak = (tarifPajak / 100) * requestBody.penghasilanBruto;

  const penghasilanDiterima = requestBody.penghasilanBruto - potonganPajak;

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
      potonganPajak: potonganPajak,
      penghasilanDiterima: penghasilanDiterima,
      tanggalPotongPPh: requestBody.tanggalPotongPPh,
      noRekening: requestBody.noRekening,
      namaRekening: requestBody.namaRekening,
      narahubung: requestBody.narahubung,
      jenisDokumenTerkait: requestBody.jenisDokumenTerkait,
      noDokumenReferensi: requestBody.noDokumenReferensi,
      fileBuktiPotong: requestBody.fileBuktiPotong,
      status: 'Entry',
    },
  });

  const tanggalTransaksi = craetePPh23.tanggalTransaksi
    .toISOString()
    .split('T')[0];

  const tanggalPotongPPh = craetePPh23.tanggalPotongPPh
    .toISOString()
    .split('T')[0];

  return {
    kode_kegiatan_badan: craetePPh23.kodeKegiatanBadan,
    tanggal_transaksi: tanggalTransaksi,
    uraian_kegiatan: craetePPh23.uraianKegiatan,
    id_kegiatan_anggaran: craetePPh23.idKegiatanAnggaran,
    kode_jenis_penghasilan: craetePPh23.kodeJenisPenghasilan,
    kode_jenis_pajak: craetePPh23.kodeJenisPajak,
    kode_wp_badan: craetePPh23.kodeWPBadan,
    npwp: wajibPajakNpwp,
    penghasilan_bruto: craetePPh23.penghasilanBruto,
    kode_objek: craetePPh23.kodeObjek,
    tarif_pajak: craetePPh23.tarifPajak,
    potongan_pajak: craetePPh23.potonganPajak,
    penghasilan_diterima: craetePPh23.penghasilanDiterima,
    tanggal_potong_pph: tanggalPotongPPh,
    no_rekening: craetePPh23.noRekening,
    nama_rekening: craetePPh23.namaRekening,
    narahubung: craetePPh23.narahubung,
    jenis_dokumen_terkait: craetePPh23.jenisDokumenTerkait,
    no_dokumen_referensi: craetePPh23.noDokumenReferensi,
    file_bukti_potong: craetePPh23.fileBuktiPotong,
    status: craetePPh23.status,
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
    penghasilanDiterima: data.penghasilan_diterima,
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

export const getKegiatanPenghasilanBadanPPh23ById = async (
  kodeKegiatanBadan: string
) => {
  try {
    const kegiatanPenghasilanBadan =
      await prisma.kegiatanPenghasilanBadan.findUnique({
        where: { kodeKegiatanBadan: kodeKegiatanBadan },
      });

    if (!kegiatanPenghasilanBadan) {
      throw new Error('Record not found');
    }

    const tanggalTransaksi = kegiatanPenghasilanBadan.tanggalTransaksi
      .toISOString()
      .split('T')[0];

    const tanggalPotongPPh = kegiatanPenghasilanBadan.tanggalPotongPPh
      .toISOString()
      .split('T')[0];

    return {
      kode_kegiatan_badan: kegiatanPenghasilanBadan.kodeKegiatanBadan,
      tanggal_transaksi: tanggalTransaksi,
      uraian_kegiatan: kegiatanPenghasilanBadan.uraianKegiatan,
      id_kegiatan_anggaran: kegiatanPenghasilanBadan.idKegiatanAnggaran,
      kode_jenis_penghasilan: kegiatanPenghasilanBadan.kodeJenisPenghasilan,
      kode_jenis_pajak: kegiatanPenghasilanBadan.kodeJenisPajak,
      kode_wp_badan: kegiatanPenghasilanBadan.kodeWPBadan,
      penghasilan_bruto: kegiatanPenghasilanBadan.penghasilanBruto,
      kode_objek: kegiatanPenghasilanBadan.kodeObjek,
      tarif_pajak: kegiatanPenghasilanBadan.tarifPajak,
      potongan_pajak: kegiatanPenghasilanBadan.potonganPajak,
      penghasilan_diterima: kegiatanPenghasilanBadan.penghasilanDiterima,
      tanggal_potong_pph: tanggalPotongPPh,
      no_rekening: kegiatanPenghasilanBadan.noRekening,
      nama_rekening: kegiatanPenghasilanBadan.namaRekening,
      narahubung: kegiatanPenghasilanBadan.narahubung,
      jenis_dokumen_terkait: kegiatanPenghasilanBadan.jenisDokumenTerkait,
      no_dokumen_referensi: kegiatanPenghasilanBadan.noDokumenReferensi,
      file_bukti_potong: kegiatanPenghasilanBadan.fileBuktiPotong,
      status: kegiatanPenghasilanBadan.status,
    };
  } catch (error) {
    console.error('Error retrieving Kegiatan Penghasilan Badan by ID:', error);
    throw error;
  }
};

export const updateKegiatanPenghasilanBadanPPh23 = async (
  kode_kegiatan_badan: string,
  data: UpdatePph23Pram
) => {
  const validator = updateKegiatanBadanUsahaSchema.safeParse({
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
    penghasilanDiterima: data.penghasilan_diterima,
    tanggalPotongPPh: data.tanggal_potong_pph,
    noRekening: data.no_rekening,
    namaRekening: data.nama_rekening,
    narahubung: data.narahubung,
    jenisDokumenTerkait: data.jenis_dokumen_terkait,
    noDokumenReferensi: data.no_dokumen_referensi,
    fileBuktiPotong: data.file_bukti_potong,
  });

  if (!validator.success)
    throw new BadRequestError(handleZodError(validator.error));

  const requestBody = validator.data as { [key: string]: any };

  const isoDateFields = ['tanggal_transaksi', 'tanggal_potong_pph'];

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

  const existingKodeObject = await prisma.objekPajak.findUnique({
    where: { kodeObjek: requestBody.kodeObjek },
  });

  if (!existingKodeObject) {
    throw new BadRequestError('Kode Objek tidak valid.');
  }

  const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWPBadan: requestBody.kodeWPBadan },
  });

  const wajibPajakNpwp = wajibPajakBadanUsaha.npwp;

  const tarifNpwp = existingKodeObject.tarifNpwp;
  const tarifNonNpwp = existingKodeObject.tarifNonNpwp;

  let tarifPajak;

  if (wajibPajakNpwp === '0000000000000000' || wajibPajakNpwp == 'BELUM ADA') {
    tarifPajak = tarifNonNpwp;
  } else {
    tarifPajak = tarifNpwp;
  }

  const potonganPajak = (tarifPajak / 100) * requestBody.penghasilanBruto;

  const penghasilanDiterima = requestBody.penghasilanBruto - potonganPajak;

  const updatekegiatanPenghasilanBadanPPh23 =
    await prisma.kegiatanPenghasilanBadan.update({
      where: { kodeKegiatanBadan: kode_kegiatan_badan },
      data: {
        kodeKegiatanBadan: data.kode_kegiatan_badan,
        tanggalTransaksi: requestBody.tanggal_transaksi,
        uraianKegiatan: data?.uraian_kegiatan,
        idKegiatanAnggaran: data?.id_kegiatan_anggaran,
        kodeJenisPenghasilan: data?.kode_jenis_penghasilan,
        kodeJenisPajak: data?.kode_jenis_pajak,
        kodeWPBadan: data?.kode_wp_badan,
        penghasilanBruto: data?.penghasilan_bruto,
        kodeObjek: data?.kode_objek,
        tarifPajak: tarifPajak,
        potongan_pajak: data?.potongan_pajak,
        penghasilan_diterima: penghasilanDiterima,
        tanggalPotongPPh: requestBody.tanggal_potong_pph,
        noRekening: data?.no_rekening,
        namaRekening: data?.nama_rekening,
        narahubung: data?.narahubung,
        jenisDokumenTerkait: data?.jenis_dokumen_terkait,
        noDokumenReferensi: data?.no_dokumen_referensi,
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
    potongan_pajak: updatekegiatanPenghasilanBadanPPh23.potonganPajak,
    penghasilan_diterima:
      updatekegiatanPenghasilanBadanPPh23.penghasilanDiterima,
    tanggal_potong_pph: updatekegiatanPenghasilanBadanPPh23.tanggalPotongPPh,
    no_rekening: updatekegiatanPenghasilanBadanPPh23.noRekening,
    nama_rekening: updatekegiatanPenghasilanBadanPPh23.namaRekening,
    narahubung: updatekegiatanPenghasilanBadanPPh23.narahubung,
    jenis_dokumen_terkait:
      updatekegiatanPenghasilanBadanPPh23.jenisDokumenTerkait,
    no_dokumen_referensi:
      updatekegiatanPenghasilanBadanPPh23.noDokumenReferensi,
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
