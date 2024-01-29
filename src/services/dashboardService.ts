import { prisma } from '../config/database';

type GetKegiatanBadanUsaha = {
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
  status?: string;
  idl?: string;
};

type GetKegiatanOrangPribadi = {
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

export const countPph21Entry = async (data: GetKegiatanOrangPribadi) => {
  const pph21Entry = data;

  return prisma.kegiatanPenghasilanOP.count({
    where: {
      ...pph21Entry,
      status: 'Entry',
      idl: data.idl,
    },
  });
};

export const countPph21Verifikasi = async (data: GetKegiatanBadanUsaha) => {
  const pph21Verifikasi = data;

  return prisma.kegiatanPenghasilanOP.count({
    where: {
      ...pph21Verifikasi,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
};

export const countPph21Setor = async (data: GetKegiatanBadanUsaha) => {
  const pph23Entry = data;

  return prisma.kegiatanPenghasilanOP.count({
    where: {
      ...pph23Entry,
      status: 'Setor',
      idl: data.idl,
    },
  });
};

export const countPph23Entry = async (data: GetKegiatanBadanUsaha) => {
  const pph23Entry = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph23Entry,
      kodeJenisPajak: 2,
      status: 'Entry',
      idl: data.idl,
    },
  });
};

export const countPph23Verifikasi = async (data: GetKegiatanBadanUsaha) => {
  const pph23Verifikasi = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph23Verifikasi,
      kodeJenisPajak: 2,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
};

export const countPph23Setor = async (data: GetKegiatanBadanUsaha) => {
  const pph23Setor = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph23Setor,
      kodeJenisPajak: 2,
      status: 'Setor',
      idl: data.idl,
    },
  });
};

export const countPph4Entry = async (data: GetKegiatanBadanUsaha) => {
  const pph4Entry = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph4Entry,
      kodeJenisPajak: 3,
      status: 'Entry',
      idl: data.idl,
    },
  });
};

export const countPph4Verifikasi = async (data: GetKegiatanBadanUsaha) => {
  const pph4Verifikasi = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph4Verifikasi,
      kodeJenisPajak: 3,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
};

export const countPph4Setor = async (data: GetKegiatanBadanUsaha) => {
  const pph4Setor = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph4Setor,
      kodeJenisPajak: 3,
      status: 'Setor',
      idl: data.idl,
    },
  });
};

export const getAllPPh21Entry = async (
  data: GetKegiatanOrangPribadi,
  page: number,
  limit: number
) => {
  const kegiatanOrangPribadi = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanOP.count({
    where: {
      ...kegiatanOrangPribadi,
      status: 'Entry',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanOP.findMany({
    where: {
      ...kegiatanOrangPribadi,
      status: 'Entry',
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

export const getAllPPh21Verifikasi = async (
  data: GetKegiatanOrangPribadi,
  page: number,
  limit: number
) => {
  const kegiatanOrangPribadi = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanOP.count({
    where: {
      ...kegiatanOrangPribadi,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanOP.findMany({
    where: {
      ...kegiatanOrangPribadi,
      status: 'Verifikasi',
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

export const getAllPPh21Setor = async (
  data: GetKegiatanOrangPribadi,
  page: number,
  limit: number
) => {
  const kegiatanOrangPribadi = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanOP.count({
    where: {
      ...kegiatanOrangPribadi,
      status: 'Setor',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanOP.findMany({
    where: {
      ...kegiatanOrangPribadi,
      status: 'Setor',
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

export const getAllPPh23Entry = async (
  data: GetKegiatanBadanUsaha,
  page: number,
  limit: number
) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
      status: 'Entry',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
      status: 'Entry',
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

export const getAllPPh23Verifikasi = async (
  data: GetKegiatanBadanUsaha,
  page: number,
  limit: number
) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
      status: 'Verifikasi',
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

export const getAllPPh23Setor = async (
  data: GetKegiatanBadanUsaha,
  page: number,
  limit: number
) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
      status: 'Setor',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
      status: 'Setor',
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

export const getAllPPh4Ayat2Entry = async (
  data: GetKegiatanBadanUsaha,
  page: number,
  limit: number
) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
      status: 'Entry',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
      status: 'Entry',
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

export const getAllPPh4Ayat2Verifikasi = async (
  data: GetKegiatanBadanUsaha,
  page: number,
  limit: number
) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
      status: 'Verifikasi',
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

export const getAllPPh4Ayat2Setor = async (
  data: GetKegiatanBadanUsaha,
  page: number,
  limit: number
) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
      status: 'Setor',
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
      status: 'Setor',
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
