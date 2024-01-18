import { prisma } from '../config/database';

import { WajibPajakOrangPribadi } from '../entities/wajibPajakOrangPribadi';
import { createWajibPajakOrangPribadiValidation } from '../validation/wajibPajakOrangPribadiValidation';

type CreateWPOPParams = WajibPajakOrangPribadi;

type GetWajibPajakOrangPribadiParam = {
  kodeWPOP?: string;
  nama?: string;
  email?: string;
  kewarganegaraan?: string;
  namaNegara?: string;
  idOrangPribadi?: string;
  namaIdentitas?: string;
  masaBerlakuPassport?: Date;
  npwp?: string;
  namaNpwp?: string;
  kotaNpwp?: string;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  nip?: string;
  statusPegawai?: string;
  fileFotoNpwp?: string;
  fileFotoIdOrangPribadi?: string;
  fileFotoBuktiRekening?: string;
  isApproved?: boolean;
};

export const createWPOP = async (data: CreateWPOPParams) => {
  try {
    const requestBody = createWajibPajakOrangPribadiValidation.parse(data);

    const craeteWPOP = await prisma.wajibPajakOrangPribadi.create({
      data: {
        ...requestBody,
        isApproved: true,
      },
    });

    return craeteWPOP;
  } catch (error) {
    console.error('Error creating Wajib Pajak Orang Pribadi:', error);
    throw error;
  }
};

export const getWPOPList = async (data: GetWajibPajakOrangPribadiParam) => {
  const wpop = data;

  return prisma.wajibPajakOrangPribadi.findMany({
    where: {
      ...wpop,
    },
  });
};
