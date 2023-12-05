import { prisma } from '../config/database';

type GetBankListParam = {
  kode_bank?: number;
  nama_bank?: string;
};

export const getBankList = async (data: GetBankListParam) => {
  const bankMap = {
    kodeBank: data?.kode_bank,
    namaBank: data?.nama_bank,
  };

  return prisma.bankTransfer.findMany({
    where: bankMap,
  });
};
