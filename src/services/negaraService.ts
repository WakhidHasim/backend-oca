import { prisma } from '../config/database';

type GetNegaraListParam = {
  kode_negara?: string;
  nama_negara?: string;
};

export const getNegaraList = async (data: GetNegaraListParam) => {
  const negaraMap = {
    kodeNegara: data?.kode_negara,
    namaNegara: data?.nama_negara,
  };

  return prisma.negara.findMany({
    where: negaraMap,
  });
};
