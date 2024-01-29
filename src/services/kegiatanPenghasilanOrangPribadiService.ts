import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { KegiatanPenghasilanOrangPribadi } from '../entities/kegiatanPenghasilanOrangPribadi';

type createKegiatanOrangPribadi = KegiatanPenghasilanOrangPribadi;
type updateKegiatanOrangPribadi = KegiatanPenghasilanOrangPribadi;
type getListOpParam = {
  kodeKegiatanOP?: string;
  tanggalInput?: Date;
  uraianKegiatan?: string;
  idKegiatanAnggaran?: string;
  kodeJenisPenghasilan?: number;
  kodeJenisPajak?: number;
  picPencairanPenghasilan?: string;
  mintaBillingSendiri?: boolean;
  idl?: string;
};

export const createKegiatanPenghasilanOrangPribadi = async (
  input: createKegiatanOrangPribadi
) => {
  const requestBody = input;

  const pengajuanAnggaran = await prisma.pengajuanAnggaran.findUnique({
    where: { idKegiatanAnggaran: requestBody.idKegiatanAnggaran },
  });

  if (!pengajuanAnggaran) {
    throw new BadRequestError('Id Kegiatan Anggaran tidak ditemukan.');
  }

  const satuanKerja = await prisma.satuanKerja.findUnique({
    where: { idl: requestBody.idl },
  });

  if (!satuanKerja) {
    throw new BadRequestError('IDL tidak ditemukan.');
  }

  const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
    where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
  });

  if (!jenisPenghasilan) {
    throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
  }

  const createKegiatanOrangPribadi = await prisma.kegiatanPenghasilanOP.create({
    data: requestBody,
  });

  return {
    kodeKegiatanOP: createKegiatanOrangPribadi.kodeKegiatanOP,
    tanggalInput: createKegiatanOrangPribadi.tanggalInput,
    uraianKegiatan: createKegiatanOrangPribadi.uraianKegiatan,
    idKegiatanAnggaran: createKegiatanOrangPribadi.idKegiatanAnggaran,
    kodeJenisPenghasilan: createKegiatanOrangPribadi.kodeJenisPenghasilan,
    picPencairanPenghasilan: createKegiatanOrangPribadi.picPencairanPenghasilan,
    mintaBillingSendiri: createKegiatanOrangPribadi.mintaBillingSendiri,
    idl: createKegiatanOrangPribadi.idl,
  };
};

export const getKegiatanPenghasilanOPList = async (
  data: getListOpParam,
  page: number,
  limit: number
) => {
  const kegiatanPenghasilanOrangPribadiList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanOP.count({
    where: {
      ...kegiatanPenghasilanOrangPribadiList,
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanOP.findMany({
    where: {
      ...kegiatanPenghasilanOrangPribadiList,
      idl: data.idl,
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

export const updateKegiatanPenghasilanOP = async (
  kodeKegiatanOP: string,
  updatedData: Partial<updateKegiatanOrangPribadi>
) => {
  if (!kodeKegiatanOP) {
    throw new BadRequestError('Kode Kegiatan OP tidak ditemukan');
  }

  const pengajuanAnggaran = await prisma.pengajuanAnggaran.findUnique({
    where: { idKegiatanAnggaran: updatedData.idKegiatanAnggaran },
  });

  if (!pengajuanAnggaran) {
    throw new BadRequestError('Id Kegiatan Anggaran tidak ditemukan.');
  }

  const satuanKerja = await prisma.satuanKerja.findUnique({
    where: { idl: updatedData.idl },
  });

  if (!satuanKerja) {
    throw new BadRequestError('IDL tidak ditemukan.');
  }

  const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
    where: { kodeJenisPenghasilan: updatedData.kodeJenisPenghasilan },
  });

  if (!jenisPenghasilan) {
    throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
  }

  const updatedKegiatanOP = await prisma.kegiatanPenghasilanOP.update({
    where: { kodeKegiatanOP },
    data: {
      ...updatedData,
    },
  });

  return updatedKegiatanOP;
};

export const deleteKegiatanPenghasilanOP = async (kodeKegiatanOP: string) => {
  try {
    const deletedKegiatanOP = await prisma.kegiatanPenghasilanOP.delete({
      where: { kodeKegiatanOP },
    });

    return deletedKegiatanOP;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan OP:', error);
    throw error;
  }
};

export const getKegiatanPenghasilanOPById = async (kodeKegiatanOP: string) => {
  try {
    const kegiatanPenghasilanOrangPribadi =
      await prisma.kegiatanPenghasilanOP.findUnique({
        where: { kodeKegiatanOP },
      });

    if (!kegiatanPenghasilanOrangPribadi) {
      throw new Error('Kegiatan Penghasilan OP tidak ditemukan');
    }

    return kegiatanPenghasilanOrangPribadi;
  } catch (error) {
    console.error('Error getting Kegiatan Penghasilan OP by ID:', error);
    throw error;
  }
};
