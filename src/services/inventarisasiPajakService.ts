import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { InventarisasiPajak } from '../entities/inventarisasiPajak';

type CreateInventarisasiPajakParam = InventarisasiPajak;
type UpdateInventarisasiPajakParam = InventarisasiPajak;

type GetInventarisasiPajakList = {
  idInventarisasiPajak?: string;
  uraianKegiatan?: string;
  idKegiatanAnggaran?: string;
  nominalDPP?: number;
  kodeObjek?: string;
  nominalPajak?: number;
  fileBukti?: string;
  npwpPemotong?: string;
  namaPemotong?: string;
  idl?: string;
};

export const createInventarisasiPajak = async (
  input: CreateInventarisasiPajakParam
) => {
  // const requestBody = createInventarisasiPajakSchema.parse(input);

  const pengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
    where: { idKegiatanAnggaran: input.idKegiatanAnggaran },
  });

  if (!pengajuanAnggaran) {
    throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
  }

  const objekPajak = await prisma.objekPajak.findUnique({
    where: { kodeObjek: input.kodeObjek },
  });

  if (!objekPajak) {
    throw new BadRequestError('Kode Objek tidak ditemukan.');
  }

  const createdInventarisasiPajak = await prisma.inventarisasiPajak.create({
    data: input,
  });

  return createdInventarisasiPajak;
};

export const getAllInventarisasiPajak = async (
  data: GetInventarisasiPajakList,
  page: number,
  limit: number
) => {
  const inventarisasiPajakList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.inventarisasiPajak.count({
    where: {
      ...inventarisasiPajakList,
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.inventarisasiPajak.findMany({
    where: {
      ...inventarisasiPajakList,
    },
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

export const getInventarisasiPajakById = async (
  idInventarisasiPajak: string
) => {
  try {
    const inventarisasiPajak = await prisma.inventarisasiPajak.findUnique({
      where: { idInventarisasiPajak },
    });

    if (!inventarisasiPajak) {
      throw new BadRequestError('Inventarisasi Pajak tidak ditemukan');
    }

    return inventarisasiPajak;
  } catch (error) {
    console.error(
      'Error getting Kegiatan Penghasilan Badan Usaha by ID:',
      error
    );
    throw error;
  }
};

export const updateInventarisasiPajak = async (
  idInventarisasiPajak: string,
  updatedData: Partial<UpdateInventarisasiPajakParam>,
  nominalDPP: number,
  nominalPajak: number,
  fileBukti: string
) => {
  try {
    const getInventarisasiPajakById = await prisma.inventarisasiPajak.findFirst(
      {
        where: { idInventarisasiPajak },
      }
    );

    if (!getInventarisasiPajakById) {
      throw new BadRequestError('Id Inventarisasi Pajak tidak ditemukan.');
    }

    const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
      where: { idKegiatanAnggaran: updatedData.idKegiatanAnggaran },
    });

    if (!PengajuanAnggaran) {
      throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
    }

    const objekPajak = await prisma.objekPajak.findUnique({
      where: { kodeObjek: updatedData.kodeObjek },
    });

    if (!objekPajak) {
      throw new BadRequestError('Kode Objek tidak valid.');
    }

    const updateInventarisasiPajak = await prisma.inventarisasiPajak.update({
      where: { idInventarisasiPajak },
      data: {
        uraianKegiatan: updatedData.uraianKegiatan,
        idKegiatanAnggaran: updatedData.idKegiatanAnggaran,
        nominalDPP: nominalDPP,
        kodeObjek: updatedData.kodeObjek,
        nominalPajak: nominalPajak,
        fileBukti: fileBukti,
        npwpPemotong: updatedData.npwpPemotong,
        namaPemotong: updatedData.namaPemotong,
      },
    });

    return updateInventarisasiPajak;
  } catch (error) {
    console.error('Error updating Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};

export const deleteInventarisasiPajak = async (
  idInventarisasiPajak: string
) => {
  try {
    const deletedInventarisasiPajak = await prisma.inventarisasiPajak.delete({
      where: { idInventarisasiPajak },
    });

    return deletedInventarisasiPajak;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};
