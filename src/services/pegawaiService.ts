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

export const getPegawaiList = async (data: GetPegawaiParam) => {
  const pegawai = data;

  return prisma.pegawai.findMany({
    where: {
      ...pegawai,
    },
  });
};
