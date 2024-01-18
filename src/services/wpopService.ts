import { prisma } from '../config/database';

type GetWPOPParam = {
  kodeWPOP?: string;
  nama?: string;
  email?: string;
  kewarganegaraan?: string;
  namaNegara?: string;
  idOrangPribadi?: string;
  namaIdentitas?: string;
  masaBerlakuPassport?: Date;
  npwp?: string;
  namaNpwp?: string;
  kotaNpwp?: string;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  nip?: string;
  statusPegawai?: string;
  fileFotoNpwp?: string;
  fileFotoIdOrangPribadi?: string;
  fileFotoBuktiRekening?: string;
  isApproved?: boolean;
};

export const getWPOPList = async (data: GetWPOPParam) => {
  const wpop = data;

  return prisma.wajibPajakOrangPribadi.findMany({
    where: {
      ...wpop,
    },
  });
};
