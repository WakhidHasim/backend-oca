import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import {
  Status,
  KegiatanPenghasilanBadan,
} from '../entities/kegiatanPenghasilanBadan';
import { createKegiatanBadanUsahaSchema } from '../validation/kegiatanBadanUsahaSchema';

// pph 23
type CreatePph23Param = KegiatanPenghasilanBadan;
type UpdatePph23Param = KegiatanPenghasilanBadan;

type GetPph23List = {
  kodeKegiatanBadan?: string;
  tanggalInput?: Date;
  uraianKegiatan?: string;
  idKegiatanAnggaran?: string;
  kodeJenisPenghasilan?: number;
  kodeJenisPajak?: number;
  pic?: string;
  kodeWPBadan?: string;
  penghasilanBruto?: number;
  kodeObjek?: string;
  tarifPajak?: number;
  potonganPajak?: number;
  penghasilanDiterima?: number;
  noRekening?: string;
  namaRekening?: string;
  bankTransfer?: string;
  narahubung?: string;
  invoice?: string;
  fakturPajak?: string;
  dokumenKerjasamaKegiatan?: string;
  status?: Status;
  idl?: string;
};

export const createPPh23 = async (data: CreatePph23Param) => {
  try {
    const requestBody = createKegiatanBadanUsahaSchema.parse(data);

    const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
      where: { idKegiatanAnggaran: requestBody.idKegiatanAnggaran },
    });

    if (!PengajuanAnggaran) {
      throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
    }

    const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
      where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
    });

    if (!jenisPenghasilan) {
      throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
    }

    const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
      where: { kodeWPBadan: requestBody.kodeWPBadan },
    });

    if (!wajibPajakBadanUsaha) {
      throw new BadRequestError('Kode Wajib Pajak Badan tidak valid.');
    }

    const objekPajak = await prisma.objekPajak.findUnique({
      where: { kodeObjek: requestBody.kodeObjek },
    });

    if (!objekPajak) {
      throw new BadRequestError('Kode Objek tidak valid.');
    }

    const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
    const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
    const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
    const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
    const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;

    const tarifNpwp = objekPajak.tarifNpwp;
    const tarifNonNpwp = objekPajak.tarifNonNpwp;

    let tarifPajak;

    if (
      wajibPajakBadanUsahaNPWP === '0000000000000000' ||
      wajibPajakBadanUsahaNPWP == 'BELUM ADA'
    ) {
      tarifPajak = tarifNonNpwp;
    } else {
      tarifPajak = tarifNpwp;
    }

    const penghasilanBruto = requestBody.penghasilanBruto || 0;
    const potonganPajak = (tarifPajak / 100) * penghasilanBruto;
    const penghasilanDiterima = penghasilanBruto - potonganPajak;

    const craetePPh23 = await prisma.kegiatanPenghasilanBadan.create({
      data: {
        ...requestBody,
        tanggalInput: new Date(),
        kodeJenisPajak: 2,
        npwp: wajibPajakBadanUsahaNPWP,
        noRekening: wajibPajakBadanUsahaNoRekening,
        namaRekening: wajibPajakBadanUsahaNamaRekening,
        bankTransfer: wajibPajakBadanUsahaBankTransfter,
        narahubung: wajibPajakBadanUsahaNarahubung,
        tarifPajak: tarifPajak,
        potonganPajak: potonganPajak,
        penghasilanDiterima: penghasilanDiterima,
        status: 'Entry',
        idl: '211.01',
      },
    });

    return craetePPh23;
  } catch (error) {
    console.error('Error creating Kegiatan Penghasilan Badan PPh23:', error);
    throw error;
  }
};

export const getAllPPh23 = async (data: GetPph23List) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  return prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
    },
  });
};

export const getPPh23ById = async (kodeKegiatanBadan: string) => {
  try {
    const kegiatanPenghasilanBadanUsaha =
      await prisma.kegiatanPenghasilanBadan.findUnique({
        where: { kodeKegiatanBadan },
      });

    if (!kegiatanPenghasilanBadanUsaha) {
      throw new BadRequestError('Kegiatan Penghasilan Badan tidak ditemukan');
    }

    return kegiatanPenghasilanBadanUsaha;
  } catch (error) {
    console.error(
      'Error getting Kegiatan Penghasilan Badan Usaha by ID:',
      error
    );
    throw error;
  }
};

export const updatePPh23 = async (
  kodeKegiatanBadan: string,
  updatedData: Partial<UpdatePph23Param>,
  kodeJenisPenghasilan: number,
  penghasilanBruto: number,
  invoiceFile: string,
  fakturPajakFile: string,
  dokumenKerjasamaKegiatanFile: string
) => {
  try {
    const getPPh23ById = await prisma.kegiatanPenghasilanBadan.findUnique({
      where: { kodeKegiatanBadan },
    });

    if (!getPPh23ById) {
      throw new BadRequestError('Kode Kegiatan Badan tidak ditemukan.');
    }

    const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
      where: { idKegiatanAnggaran: updatedData.idKegiatanAnggaran },
    });

    if (!PengajuanAnggaran) {
      throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
    }

    const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
      where: { kodeJenisPenghasilan: kodeJenisPenghasilan },
    });

    if (!jenisPenghasilan) {
      throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
    }

    const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
      where: { kodeWPBadan: updatedData.kodeWPBadan },
    });

    if (!wajibPajakBadanUsaha) {
      throw new BadRequestError('Kode Wajib Pajak Badan tidak valid.');
    }

    const objekPajak = await prisma.objekPajak.findUnique({
      where: { kodeObjek: updatedData.kodeObjek },
    });

    if (!objekPajak) {
      throw new BadRequestError('Kode Objek tidak valid.');
    }

    const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
    const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
    const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
    const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
    const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;

    const tarifNpwp = objekPajak.tarifNpwp;
    const tarifNonNpwp = objekPajak.tarifNonNpwp;

    let tarifPajak;

    if (
      wajibPajakBadanUsahaNPWP === '0000000000000000' ||
      wajibPajakBadanUsahaNPWP == 'BELUM ADA'
    ) {
      tarifPajak = tarifNonNpwp;
    } else {
      tarifPajak = tarifNpwp;
    }

    const penghasilanBrutoVal = penghasilanBruto || 0;
    const potonganPajak = (tarifPajak / 100) * penghasilanBrutoVal;
    const penghasilanDiterima = penghasilanBrutoVal - potonganPajak;

    const updatedKegiatanBadanUsaha =
      await prisma.kegiatanPenghasilanBadan.update({
        where: { kodeKegiatanBadan },
        data: {
          uraianKegiatan: updatedData.uraianKegiatan,
          idKegiatanAnggaran: updatedData.idKegiatanAnggaran,
          kodeWPBadan: updatedData.kodeWPBadan,
          kodeObjek: updatedData.kodeObjek,
          pic: updatedData.pic,
          kodeJenisPenghasilan: kodeJenisPenghasilan,
          penghasilanBruto: penghasilanBruto,
          invoice: invoiceFile,
          fakturPajak: fakturPajakFile,
          dokumenKerjasamaKegiatan: dokumenKerjasamaKegiatanFile,

          npwp: wajibPajakBadanUsahaNPWP,
          noRekening: wajibPajakBadanUsahaNoRekening,
          namaRekening: wajibPajakBadanUsahaNamaRekening,
          bankTransfer: wajibPajakBadanUsahaBankTransfter,
          narahubung: wajibPajakBadanUsahaNarahubung,
          tarifPajak: tarifPajak,
          potonganPajak: potonganPajak,
          penghasilanDiterima: penghasilanDiterima,
        },
      });

    return updatedKegiatanBadanUsaha;
  } catch (error) {
    console.error('Error updating Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};

export const deletePPh23 = async (kodeKegiatanBadan: string) => {
  try {
    const deletedKegiatanBadanUsaha =
      await prisma.kegiatanPenghasilanBadan.delete({
        where: { kodeKegiatanBadan },
      });

    return deletedKegiatanBadanUsaha;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};

// PPh 4 Ayat 2
type CreatePph4Param = KegiatanPenghasilanBadan;
type UpdatePph4Param = KegiatanPenghasilanBadan;

type GetPph4List = {
  kodeKegiatanBadan?: string;
  tanggalInput?: Date;
  uraianKegiatan?: string;
  idKegiatanAnggaran?: string;
  kodeJenisPenghasilan?: number;
  kodeJenisPajak?: number;
  pic?: string;
  kodeWPBadan?: string;
  penghasilanBruto?: number;
  kodeObjek?: string;
  tarifPajak?: number;
  potonganPajak?: number;
  penghasilanDiterima?: number;
  noRekening?: string;
  namaRekening?: string;
  bankTransfer?: string;
  narahubung?: string;
  invoice?: string;
  fakturPajak?: string;
  dokumenKerjasamaKegiatan?: string;
  status?: Status;
  idl?: string;
};

export const createPPh4Ayat2 = async (data: CreatePph4Param) => {
  try {
    const requestBody = createKegiatanBadanUsahaSchema.parse(data);

    const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
      where: { idKegiatanAnggaran: requestBody.idKegiatanAnggaran },
    });

    if (!PengajuanAnggaran) {
      throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
    }

    // const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
    //   where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
    // });

    // if (!jenisPenghasilan) {
    //   throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
    // }

    const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
      where: { kodeWPBadan: requestBody.kodeWPBadan },
    });

    if (!wajibPajakBadanUsaha) {
      throw new BadRequestError('Kode WP Badan tidak valid.');
    }

    const objekPajak = await prisma.objekPajak.findUnique({
      where: { kodeObjek: requestBody.kodeObjek },
    });

    if (!objekPajak) {
      throw new BadRequestError('Kode Objek tidak valid.');
    }

    const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
    const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
    const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
    const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
    const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;

    const tarifNpwp = objekPajak.tarifNpwp;
    const tarifNonNpwp = objekPajak.tarifNonNpwp;

    let tarifPajak;

    if (
      wajibPajakBadanUsahaNPWP === '0000000000000000' ||
      wajibPajakBadanUsahaNPWP == 'BELUM ADA'
    ) {
      tarifPajak = tarifNonNpwp;
    } else {
      tarifPajak = tarifNpwp;
    }

    const penghasilanBruto = requestBody.penghasilanBruto || 0;

    const potonganPajak = (tarifPajak / 100) * penghasilanBruto;

    const penghasilanDiterima = penghasilanBruto - potonganPajak;

    const craetePPh4 = await prisma.kegiatanPenghasilanBadan.create({
      data: {
        ...requestBody,
        tanggalInput: new Date(),
        kodeJenisPajak: 3,
        npwp: wajibPajakBadanUsahaNPWP,
        noRekening: wajibPajakBadanUsahaNoRekening,
        namaRekening: wajibPajakBadanUsahaNamaRekening,
        bankTransfer: wajibPajakBadanUsahaBankTransfter,
        narahubung: wajibPajakBadanUsahaNarahubung,
        tarifPajak: tarifPajak,
        potonganPajak: potonganPajak,
        penghasilanDiterima: penghasilanDiterima,
        status: 'Entry',
      },
    });

    return craetePPh4;
  } catch (error) {
    console.error('Error creating Kegiatan Penghasilan Badan PPh23:', error);
    throw error;
  }
};

export const getAllPPh4Ayat2 = async (data: GetPph4List) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  return prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
    },
  });
};

export const getPPh4Ayat2ById = async (kodeKegiatanBadan: string) => {
  try {
    const kegiatanPenghasilanBadanUsaha =
      await prisma.kegiatanPenghasilanBadan.findUnique({
        where: { kodeKegiatanBadan },
      });

    if (!kegiatanPenghasilanBadanUsaha) {
      throw new BadRequestError('Kegiatan Penghasilan Badan tidak ditemukan');
    }

    return kegiatanPenghasilanBadanUsaha;
  } catch (error) {
    console.error(
      'Error getting Kegiatan Penghasilan Badan Usaha by ID:',
      error
    );
    throw error;
  }
};

export const deletePPh4Ayat2 = async (kodeKegiatanBadan: string) => {
  try {
    const deletedKegiatanBadanUsaha =
      await prisma.kegiatanPenghasilanBadan.delete({
        where: { kodeKegiatanBadan },
      });

    return deletedKegiatanBadanUsaha;
  } catch (error) {
    console.error('Error deleting Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};
