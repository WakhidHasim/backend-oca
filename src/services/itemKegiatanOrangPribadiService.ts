import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { ItemKegiatanPenghasilanOrangPribadi } from '../entities/itemKegiatanPenghasilanOrangPribadi';
import { createItemKegiatanPenghasilanOrangPribadiSchema } from '../validation/itemKegitanPenghasilanOrangPribadi';

type CreateItemKegiatanOrangPribadiParam = ItemKegiatanPenghasilanOrangPribadi;

type GetPPh21 = {
  id?: string;
  kodeKegiatanOP?: string;
  kodeWPOP?: string;
  statusPegawai?: string;
  npwp?: string;
  lapisan?: number;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  penghasilanBruto?: number;
  kodeObjek?: string;
  tarifBerlaku?: number;
  potonganPajak?: number;
  penghasilanDiterima?: number;
  metodePotong?: string;
  fileBuktiPotong?: string;
  status?: string;
};

export const createPPh21 = async (
  input: CreateItemKegiatanOrangPribadiParam
) => {
  const requestBody = input;

  const kegiatanOp = await prisma.kegiatanPenghasilanOP.findUnique({
    where: { kodeKegiatanOP: requestBody.kodeKegiatanOP },
  });

  if (!kegiatanOp) {
    throw new BadRequestError('Kode Kegiatan OP tidak ditemukan.');
  }

  const wpop = await prisma.wajibPajakOrangPribadi.findUnique({
    where: {
      kodeWajibPajakOrangPribadi: requestBody.kodeWajibPajakOrangPribadi,
    },
  });

  if (!wpop) {
    throw new BadRequestError(
      'Kode Wajib Pajak Orang Pribadi tidak ditemukan.'
    );
  }

  const objekPajak = await prisma.objekPajak.findUnique({
    where: { kodeObjek: requestBody.kodeObjek },
  });

  if (!objekPajak) {
    throw new BadRequestError('Kode Objek tidak ditemukan.');
  }

  const wpopNpwp = wpop.npwp;
  const wpopStatus = wpop.statusPegawai;
  const wpopNoRekening = wpop.noRekening;
  const wpopNamaRekening = wpop.namaRekening;
  const wpopBankTransfter = wpop.bankTransfer;

  const tarifNpwp = objekPajak.tarifNpwp;
  const tarifNonNpwp = objekPajak.tarifNonNpwp;

  let tarifPajak;

  if (wpopNpwp === '0000000000000000' || wpopNpwp == 'BELUM ADA') {
    tarifPajak = (tarifNonNpwp / 100) * (50 / 100);
  } else {
    tarifPajak = tarifNpwp / 100;
  }

  const penghasilanBruto = requestBody.penghasilanBruto || 0;
  const potonganPajak = tarifPajak * penghasilanBruto;
  const penghasilanDiterima = penghasilanBruto - potonganPajak;

  const createPPh21 = await prisma.itemKegiatanPenghasilanOP.create({
    data: {
      ...requestBody,
      statusPegawai: wpopStatus,
      npwp: wpopNpwp,
      noRekening: wpopNoRekening,
      namaRekening: wpopNamaRekening,
      bankTransfer: wpopBankTransfter,
      tarifBerlaku: tarifPajak,
      potonganPajak: potonganPajak,
      penghasilanDiterima: penghasilanDiterima,
    },
  });

  return createPPh21;
};

export const getAllPPh21 = async (
  data: GetPPh21,
  page: number,
  limit: number
) => {
  const pph21List = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.itemKegiatanPenghasilanOP.count({
    where: {
      ...pph21List,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.itemKegiatanPenghasilanOP.findMany({
    where: {
      ...pph21List,
    },
    orderBy: {
      tanggalInput: 'desc',
    },
    skip,
    take,
  });

  return {
    results,
    pagination: {
      totalCount,
      totalPage,
      currentPage,
    },
  };
};

export const getPPh21ById = async (KodeItemKegiatanOP: string) => {
  const PPh21 = await prisma.itemKegiatanPenghasilanOP.findUnique({
    where: { KodeItemKegiatanOP },
  });

  if (!PPh21) {
    throw new Error('Kode Item Kegiatan Penghasilan OP tidak ditemukan');
  }

  return PPh21;
};

export const deletePPh21 = async (KodeItemKegiatanOP: string) => {
  try {
    const deletedPPh21 = await prisma.itemKegiatanPenghasilanOP.delete({
      where: { KodeItemKegiatanOP },
    });

    return deletedPPh21;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan OP:', error);
    throw error;
  }
};
