import { prisma } from '../config/database';

type GetObjekPajakParam = {
  kode_objek?: string;
  kode_jenis_pajak_id?: number;
  objek_pajak?: string;
  tarif_npwp?: number;
  tarif_non_npwp?: number;
};

export const getObjekPajakPPh23List = async (data: GetObjekPajakParam) => {
  const objekPajakList = {
    kodeObjek: data?.kode_objek,
    kodeJenisPajakId: data?.kode_jenis_pajak_id,
    objekPajak: data?.objek_pajak,
    tarifNpwp: data?.tarif_npwp,
    tarifNonNpwp: data?.tarif_non_npwp,
  };

  return prisma.objekPajak.findMany({
    where: objekPajakList,
    kodeJenisPajakId: 2,
  });
};
