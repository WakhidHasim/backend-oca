import { prisma } from '../config/database';

type GetJenisPenghasilanParam = {
  kode_jenis_penghasilan?: number;
  kode_akun?: number;
  jenis_pajak_terkait?: number;
  jenis_penghasilan?: string;
};

export const getJenisPenghasilanPPh23List = async (
  data: GetJenisPenghasilanParam
) => {
  const jenisPenghasilanList = {
    kodeJenisPenghasilan: data?.kode_jenis_penghasilan,
    kodeAkun: data?.kode_akun,
    jenisPajakTerkait: data?.jenis_pajak_terkait,
    jenisPenghasilan: data?.jenis_penghasilan,
  };

  return prisma.jenisPenghasilan.findMany({
    where: {
      ...jenisPenghasilanList,
      jenisPajakTerkait: 12,
    },
  });
};
