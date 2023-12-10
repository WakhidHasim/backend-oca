import { prisma } from '../config/database';

type GetWajibPajakBadanUSahaParam = {
  kode_wpbadan?: string;
  nama_badan?: string;
  email?: string;
  npwp?: string;
  nama_npwp?: string;
  kota_npwp?: string;
  bank_transfer?: string;
  no_rekening?: string;
  nama_rekening?: string;
  nama_narahubung?: string;
  kontak_narahubung?: string;
  ada_skb_pph23?: boolean;
  masa_berlaku_bebas_pph23?: Date;
  file_foto_identitas_badan?: string;
  file_foto_bukti_rekening?: string;
  file_foto_npwp?: string;
  file_surat_bebas_pph23?: string;
  status_pkp?: string;
};

export const getWPBUList = async (data: GetWajibPajakBadanUSahaParam) => {
  const wpbuList = {
    kodeWPBadan: data?.kode_wpbadan,
    namaBadan: data?.nama_badan,
    email: data?.email,
    npwp: data?.npwp,
    namaNpwp: data?.nama_npwp,
    kotaNpwp: data?.kota_npwp,
    bankTransfer: data?.bank_transfer,
    noRekening: data?.no_rekening,
    namaRekening: data?.nama_rekening,
    namaNaraHubung: data?.nama_narahubung,
    kontakNaraHubung: data?.kontak_narahubung,
    adaSkbPPh23: data?.ada_skb_pph23,
    masaBerlakuBebasPPh23: data?.masa_berlaku_bebas_pph23,
    fileFotoIdentitasBadan: data?.file_foto_identitas_badan,
    fileFotoBuktiRekening: data?.file_foto_bukti_rekening,
    fileFotoNpwp: data?.file_foto_npwp,
    fileSuratBebasPPh23: data?.file_surat_bebas_pph23,
    statusPkp: data?.status_pkp,
  };

  return prisma.wajibPajakBadanUsaha.findMany({
    where: wpbuList,
  });
};
