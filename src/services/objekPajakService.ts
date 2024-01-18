import { prisma } from '../config/database';

type GetObjekPajakParam = {
  kodeObjek?: string;
  kodeJenisPajakId?: number;
  objekPajak?: string;
  tarifNpwp?: number;
  tarifNonNpwp?: number;
};

export const getObjekPajakPPh21List = async (data: GetObjekPajakParam) => {
  const objekPajakList = data;

  return prisma.objekPajak.findMany({
    where: {
      ...objekPajakList,
      kodeJenisPajakId: 1,
    },
  });
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

export const getObjekPajakPPh4Ayat2List = async (data: GetObjekPajakParam) => {
  const objekPajakList = data;

  return prisma.objekPajak.findMany({
    where: {
      ...objekPajakList,
      kodeJenisPajakId: 3,
    },
  });
};

export const getObjekPajakList = async (data: GetObjekPajakParam) => {
  const objekPajakList = data;

  return prisma.objekPajak.findMany({
    where: {
      ...objekPajakList,
    },
  });
};
