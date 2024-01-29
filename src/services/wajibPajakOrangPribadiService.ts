import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { WajibPajakOrangPribadi } from '../entities/wajibPajakOrangPribadi';

type CreateWPOPParams = WajibPajakOrangPribadi;

type GetWPOPParam = {
  kodeWajibPajakOrangPribadi?: string;
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

export const createWPOP = async (input: CreateWPOPParams) => {
  const requestBody = input;

  const craeteWPOP = await prisma.wajibPajakOrangPribadi.create({
    data: {
      ...requestBody,
    },
  });

  return craeteWPOP;
};

export const getWPOPList = async (data: GetWPOPParam) => {
  const wpop = data;

  return prisma.wajibPajakOrangPribadi.findMany({
    where: {
      ...wpop,
    },
  });
};

export const getWPOPById = async (kodeWajibPajakOrangPribadi: string) => {
  const wpop = await prisma.wajibPajakOrangPribadi.findUnique({
    where: { kodeWajibPajakOrangPribadi },
  });

  if (!wpop) {
    throw new BadRequestError(
      'Kegiatan Wajib Pajak Orang Pribadi tidak ditemukan'
    );
  }

  return wpop;
};
