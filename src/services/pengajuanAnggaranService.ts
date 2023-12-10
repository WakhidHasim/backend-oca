import { prisma } from '../config/database';

type GetPengajuanAnggaranParam = {
  id_kegiatan_anggaran?: string;
  tahun?: Date;
  kegiatan?: string;
  no_pengajuan?: string;
  idl?: string;
  jumlah_pengajuan?: number;
  metode_pengajuan?: string;
  status_pengajuan?: string;
  tanggal_pengajuan?: Date;
};

export const getPengajuanAnggaranList = async (
  data: GetPengajuanAnggaranParam
) => {
  const pengajuanAnggaranList = {
    idKegiatanAnggaran: data?.id_kegiatan_anggaran,
    tahun: data?.tahun,
    kegiatan: data?.kegiatan,
    noPengajuan: data?.no_pengajuan,
    idl: data?.idl,
    jumlahPengajuan: data?.jumlah_pengajuan,
    metodePengajuan: data?.metode_pengajuan,
    statusPengajuan: data?.status_pengajuan,
    tanggalPengajuan: data?.tanggal_pengajuan,
  };

  return prisma.pengajuanAnggaran.findMany({
    where: pengajuanAnggaranList,
  });
};
