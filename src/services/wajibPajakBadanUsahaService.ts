import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { WajibPajakBadanUsaha } from '../entities/wajibPajakBadanUsaha';
import { createWajibPajakBadanUsahaSchema } from '../validation/wajibPajakBadanUsahaSchema';

type CreateWPBUParam = WajibPajakBadanUsaha;
type UpdateWPBUParam = WajibPajakBadanUsaha;

type GetWajibPajakBadanUsahaParam = {
  kodeWPBadan?: string;
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

export const createWPBU = async (data: CreateWPBUParam) => {
  try {
    const requestBody = createWajibPajakBadanUsahaSchema.parse(data);

    const craeteWPBU = await prisma.wajibPajakBadanUsaha.create({
      data: {
        ...requestBody,
      },
    });

    return craeteWPBU;
  } catch (error) {
    console.error('Error creating Wajib Pajak Badan Usaha:', error);
    throw error;
  }
};

export const getAllWPBU = async (data: GetWajibPajakBadanUsahaParam) => {
  const wpbuList = data;

  return prisma.wajibPajakBadanUsaha.findMany({
    where: {
      ...wpbuList,
    },
  });
};

export const getWPBUById = async (kodeWPBadan: string) => {
  try {
    const wpbu = await prisma.wajibPajakBadanUsaha.findUnique({
      where: { kodeWPBadan },
    });

    if (!wpbu) {
      throw new BadRequestError('Kegiatan Penghasilan Badan tidak ditemukan');
    }

    return wpbu;
  } catch (error) {
    console.error(
      'Error getting Kegiatan Penghasilan Badan Usaha by ID:',
      error
    );
    throw error;
  }
};

export const updateWPBU = async (
  kodeWPBadan: string,
  updatedData: Partial<UpdateWPBUParam>,
  fileFotoIdentitasBadan: string,
  fileFotoBuktiRekening: string,
  fileFotoNpwp: string,
  fileSuratBebasPPh23: string
) => {
  try {
    const wpbu = await prisma.wajibPajakBadanUsaha.findFirst({
      where: { kodeWPBadan },
    });

    if (!wpbu) {
      throw new BadRequestError('Kode Badan Usaha tidak ditemukan.');
    }

    const updatedKegiatanBadanUsaha = await prisma.wajibPajakBadanUsaha.update({
      where: { kodeWPBadan },
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

export const deleteWPBU = async (kodeWPBadan: string) => {
  try {
    const deletedWPBU = await prisma.wajibPajakBadanUsaha.delete({
      where: { kodeWPBadan },
    });

    return deletedWPBU;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};
