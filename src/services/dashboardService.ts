import { prisma } from '../config/database';

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
  status?: string;
  idl?: string;
};

export const countPph23Entry = async (data: GetPph23List) => {
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

export const countPph23Verifikasi = async (data: GetPph23List) => {
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

export const countPph23Setor = async (data: GetPph23List) => {
  const pph23Setor = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph23Setor,
      kodeJenisPajak: 2,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
};

export const countPph4Entry = async (data: GetPph23List) => {
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

export const countPph4Verifikasi = async (data: GetPph23List) => {
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

export const countPph4Setor = async (data: GetPph23List) => {
  const pph4Setor = data;

  return prisma.kegiatanPenghasilanBadan.count({
    where: {
      ...pph4Setor,
      kodeJenisPajak: 3,
      status: 'Verifikasi',
      idl: data.idl,
    },
  });
};

export const pph23Entry = async (data: GetPph23List) => {
  const pph23Entry = data;

  return prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...pph23Entry,
      kodeJenisPajak: 2,
      status: 'Entry',
      idl: data.idl,
    },
  });
};
