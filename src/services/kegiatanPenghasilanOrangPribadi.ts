import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { KegiatanPenghasilanOrangPribadi } from '../entities/kegiatanPenghasilanOrangPribadi';
import { createKegiatanOrangPribaiSchema } from '../validation/kegiatanPenghasikanOrangPribadiSchema';

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
  data: createKegiatanOrangPribadi
) => {
  try {
    const requestBody = createKegiatanOrangPribaiSchema.parse(data);

    const pengajuanAnggaran = await prisma.pengajuanAnggaran.findUnique({
      where: { idKegiatanAnggaran: requestBody.idKegiatanAnggaran },
    });

    if (!pengajuanAnggaran) {
      throw new BadRequestError('Id Kegiatan Anggaran tidak ditemukan.');
    }

    // const satuanKerja = await prisma.satuanKerja.findUnique({
    //   where: { idl: requestBody.idl },
    // });

    // if (!satuanKerja) {
    //   throw new BadRequestError('IDL tidak ditemukan.');
    // }

    const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
      where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
    });

    if (!jenisPenghasilan) {
      throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
    }

    const createKegiatanOrangPribadi =
      await prisma.kegiatanPenghasilanOP.create({
        data: {
          ...requestBody,
          tanggalInput: new Date(),
          kodeJenisPajak: 1,
          idl: '211.01',
        },
      });

    return {
      kodeKegiatanOP: createKegiatanOrangPribadi.kodeKegiatanOP,
      tanggalInput: createKegiatanOrangPribadi.tanggalInput,
      uraianKegiatan: createKegiatanOrangPribadi.uraianKegiatan,
      kodeJenisPenghasilan: createKegiatanOrangPribadi.kodeJenisPenghasilan,
      picPencairanPenghasilan:
        createKegiatanOrangPribadi.picPencairanPenghasilan,
      mintaBillingSendiri: createKegiatanOrangPribadi.mintaBillingSendiri,
      idl: createKegiatanOrangPribadi.idl,
    };
  } catch (error) {
    console.error('Error creating Kegiatan Penghasilan Orang Pribadi:', error);
    throw error;
  }
};

export const getKegiatanPenghasilanOPList = async (data: getListOpParam) => {
  const kegiatanPenghasilanOrangPribadiList = data;

  return prisma.kegiatanPenghasilanOP.findMany({
    where: kegiatanPenghasilanOrangPribadiList,
  });
};

export const updateKegiatanPenghasilanOP = async (
  kodeKegiatanOP: string,
  updatedData: Partial<updateKegiatanOrangPribadi>
) => {
  try {
    if (!kodeKegiatanOP) {
      throw new Error('Kode Kegiatan OP tidak ditemukan');
    }

    const updatedKegiatanOP = await prisma.kegiatanPenghasilanOP.update({
      where: { kodeKegiatanOP },
      data: {
        ...updatedData,
      },
    });

    return updatedKegiatanOP;
  } catch (error) {
    console.error('Error updating Kegiatan Penghasilan OP:', error);
    throw error;
  }
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
