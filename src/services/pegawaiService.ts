import { prisma } from '../config/database';

type GetPegawaiParam = {
  nip?: string;
  nama?: string;
  email?: string;
  nik?: string;
  namaKtp?: string;
  npwp?: string;
  namaNpwp?: string;
  jenkel?: string;
  statusNikah?: string;
  jumlahTanggungan?: number;
  tglMasuk?: Date;
  tglBerakhir?: Date;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  statusPegawai?: string;
  satker?: string;
};

export const getPegawaiList = async (
  data: GetPegawaiParam,
  page: number,
  limit: number
) => {
  const pegawai = data;
  const take = limit;
  const skip = (page - 1) * limit;
  const totalCount = await prisma.pegawai.count({
    where: {
      ...pegawai,
    },
  });
  const totalPage = Math.ceil(totalCount / limit);
  const currentPage = page || 0;

  const results = await prisma.pegawai.findMany({
    where: {
      ...pegawai,
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
