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
  tanggalPengajuan?: Date;
};

export const getPengajuanAnggaranList = async (
  data: GetPengajuanAnggaranParam
) => {
  const pengajuanAnggaranList = data;

  return prisma.pengajuanAnggaran.findMany({
    where: {
      ...pengajuanAnggaranList,
      idl: '211.03',
    },
  });
};
