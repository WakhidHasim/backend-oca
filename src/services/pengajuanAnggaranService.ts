import { prisma } from '../config/database';

type GetPengajuanAnggaranParam = {
  idKegiatanAnggaran?: string;
  tahun?: string;
  kegiatan?: string;
  noPengajuan?: string;
  idl?: string;
  jumlahPengajuan?: number;
  metodePengajuan?: string;
  statusPengajuan?: string;
  tanggalPengajuan?: string;
};

export const getPengajuanAnggaranList = async (
  data: GetPengajuanAnggaranParam,
  page: number,
  limit: number
) => {
  const pengajuanAnggaranList = data;

  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.pengajuanAnggaran.count({
    where: {
      ...pengajuanAnggaranList,
      idl: data.idl,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.pengajuanAnggaran.findMany({
    where: {
      ...pengajuanAnggaranList,
      idl: data.idl,
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
