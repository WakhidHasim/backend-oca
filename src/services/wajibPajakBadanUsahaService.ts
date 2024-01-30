import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { WajibPajakBadanUsaha } from '../entities/wajibPajakBadanUsaha';

type CreateWPBUParam = WajibPajakBadanUsaha;
type UpdateWPBUParam = WajibPajakBadanUsaha;

type GetWajibPajakBadanUsahaParam = {
  kodeWajibPajakBadanUsaha?: string;
  namaBadan?: string;
  email?: string;
  npwp?: string;
  namaNpwp?: string;
  kotaNpwp?: string;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  namaNaraHubung?: string;
  kontakNaraHubung?: string;
  adaSkbPPh23?: boolean;
  masaBerlakuBebasPPh23?: Date;
  fileFotoIdentitasBadan?: string;
  fileFotoBuktiRekening?: string;
  fileFotoNpwp?: string;
  fileSuratBebasPPh23?: string;
  statusPkp?: string;
};

export const createWPBU = async (input: CreateWPBUParam) => {
  const requestBody = input;

  const craeteWPBU = await prisma.wajibPajakBadanUsaha.create({
    data: {
      ...requestBody,
    },
  });

  return craeteWPBU;
};

export const getAllWPBU = async (
  data: GetWajibPajakBadanUsahaParam,
  page: number,
  limit: number
) => {
  const wpbuList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.wajibPajakBadanUsaha.count();
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.wajibPajakBadanUsaha.findMany({
    where: {
      ...wpbuList,
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

export const getWPBUById = async (kodeWajibPajakBadanUsaha: string) => {
  const wpbu = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWajibPajakBadanUsaha },
  });

  if (!wpbu) {
    throw new BadRequestError(
      'Kegiatan Wajib Pajak Badan Usaha tidak ditemukan'
    );
  }

  return wpbu;
};

export const updateWPBU = async (
  kodeWajibPajakBadanUsaha: string,
  updatedData: Partial<UpdateWPBUParam>,
  fileFotoIdentitasBadan: string,
  fileFotoBuktiRekening: string,
  fileFotoNpwp: string,
  fileSuratBebasPPh23: string
) => {
  try {
    const wpbu = await prisma.wajibPajakBadanUsaha.findFirst({
      where: { kodeWajibPajakBadanUsaha },
    });

    if (!wpbu) {
      throw new BadRequestError('Kode Badan Usaha tidak ditemukan.');
    }

    const updatedKegiatanBadanUsaha = await prisma.wajibPajakBadanUsaha.update({
      where: { kodeWajibPajakBadanUsaha },
      data: {
        namaBadan: updatedData.namaBadan,
        email: updatedData.email,
        npwp: updatedData.npwp,
        namaNpwp: updatedData.namaNpwp,
        kotaNpwp: updatedData.kotaNpwp,
        bankTransfer: updatedData.bankTransfer,
        noRekening: updatedData.noRekening,
        namaRekening: updatedData.namaRekening,
        namaNaraHubung: updatedData.namaNaraHubung,
        kontakNaraHubung: updatedData.kontakNaraHubung,
        adaSkbPPh23: updatedData.adaSkbPPh23,
        masaBerlakuBebasPPh23: updatedData.masaBerlakuBebasPPh23,
        fileFotoIdentitasBadan: fileFotoIdentitasBadan,
        fileFotoBuktiRekening: fileFotoBuktiRekening,
        fileFotoNpwp: fileFotoNpwp,
        fileSuratBebasPPh23: fileSuratBebasPPh23,
        statusPkp: updatedData.statusPkp,
      },
    });

    return updatedKegiatanBadanUsaha;
  } catch (error) {
    console.error('Error updating Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};

export const deleteWPBU = async (kodeWajibPajakBadanUsaha: string) => {
  try {
    const deletedWPBU = await prisma.wajibPajakBadanUsaha.delete({
      where: { kodeWajibPajakBadanUsaha },
    });

    return deletedWPBU;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};
