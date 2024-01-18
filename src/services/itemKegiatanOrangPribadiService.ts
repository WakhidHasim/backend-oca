import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { ItemKegiatanPenghasilanOrangPribadi } from '../entities/itemKegiatanPenghasilanOrangPribadi';
import { createItemKegiatanPenghasilanOrangPribadiSchema } from '../validation/itemKegitanPenghasilanOrangPribadi';

type CreateItemKegiatanOrangPribadiParam = ItemKegiatanPenghasilanOrangPribadi;

type GetItemKegiatanOrangPribadiList = {
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
  data: CreateItemKegiatanOrangPribadiParam
) => {
  try {
    const requestBody =
      createItemKegiatanPenghasilanOrangPribadiSchema.parse(data);

    const kegiatanOp = await prisma.kegiatanPenghasilanOP.findUnique({
      where: { kodeKegiatanOP: requestBody.kodeKegiatanOP },
    });

    if (!kegiatanOp) {
      throw new BadRequestError('Kode Kegiatan OP tidak ditemukan.');
    }

    const wpop = await prisma.wajibPajakOrangPribadi.findUnique({
      where: { kodeWPOP: requestBody.kodeWPOP },
    });

    if (!wpop) {
      throw new BadRequestError('Kode WPOP tidak ditemukan.');
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
        status: 'Entry',
      },
    });

    return createPPh21;
  } catch (error) {
    console.error('Error creating Inventarisasi Pajak:', error);
    throw error;
  }
};

export const getAllPPh21 = async (data: GetItemKegiatanOrangPribadiList) => {
  const pph21List = data;

  return prisma.itemKegiatanPenghasilanOP.findMany({
    where: {
      ...pph21List,
    },
  });
};

export const deletePPh21 = async (id: string) => {
  try {
    const deletedPPh21 = await prisma.itemKegiatanPenghasilanOP.delete({
      where: { id },
    });

    return deletedPPh21;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan OP:', error);
    throw error;
  }
};
