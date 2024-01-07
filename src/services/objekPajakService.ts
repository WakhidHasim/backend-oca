import { prisma } from '../config/database';

type GetObjekPajakParam = {
  kodeObjek?: string;
  kodeJenisPajakId?: number;
  objekPajak?: string;
  tarifNpwp?: number;
  tarifNonNpwp?: number;
};

export const getObjekPajakPPh23List = async (data: GetObjekPajakParam) => {
  const objekPajakList = data;

  return prisma.objekPajak.findMany({
    where: {
      ...objekPajakList,
      kodeJenisPajakId: 2,
    },
  });
};
