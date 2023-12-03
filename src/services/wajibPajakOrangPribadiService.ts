import { prisma } from '../config/database';

import { WajibPajakOrangPribadi } from '../entities/wajibPajakOrangPribadi';
import { createWajibPajakOrangPribadiValidation } from '../validation/wajibPajakOrangPribadiValidation';

type CreateWajibPajakOrangPribadiParams = Omit<
  WajibPajakOrangPribadi,
  'password'
>;
export const createWajibPajakOrangPribadi = async (
  data: CreateWajibPajakOrangPribadiParams
) => {
  const createWajibPajakOrangPribadiMap =
    createWajibPajakOrangPribadiValidation.parse({
      kodeWPOP: data.kode_wpop,
      nama: data.nama,
      email: data.email,
      kewarganegaraan: data.kewarganegaraan,
      namaNegara: data.nama_negara,
      idOrangPribadi: data.id_orang_pribadi,
      namaKtp: data.nama_ktp,
      npwp: data.npwp,
      namaNpwp: data.nama_npwp,
      kotaNpwp: data.kota_npwp,
      bankTransfer: data.bank_transfer,
      noRekening: data.no_rekening,
      nip: data.nip,
      statusPegawai: data.status_pegawai,
      fileFotoNpwp: data.file_foto_npwp,
      fileFotoIdOrangPribadi: data.file_foto_id_orang_pribadi,
      fileFotoBuktiRekening: data.file_foto_bukti_rekening,
      isApproved: true,
    });

  const date = new Date();
  const shortYear = date.getFullYear();
  const twoDigitYear = shortYear.toString().substr(-2);

  let number = 0;
  const generateKodeWPOP = 'OP' + twoDigitYear + '0000' + number++;

  const createWajibPajakOrangPribadi =
    await prisma.wajibPajakOrangPribadi.create({
      data: {
        kodeWPOP: generateKodeWPOP,
        nama: createWajibPajakOrangPribadiMap.nama,
        email: createWajibPajakOrangPribadiMap.email,
        kewarganegaraan: createWajibPajakOrangPribadiMap.kewarganegaraan,
        namaNegara: createWajibPajakOrangPribadiMap.namaNegara,
        idOrangPribadi: createWajibPajakOrangPribadiMap.idOrangPribadi,
        namaKtp: createWajibPajakOrangPribadiMap.namaKtp,
        npwp: createWajibPajakOrangPribadiMap.npwp,
        namaNpwp: createWajibPajakOrangPribadiMap.namaNpwp,
        kotaNpwp: createWajibPajakOrangPribadiMap.kotaNpwp,
        bankTransfer: createWajibPajakOrangPribadiMap.bankTransfer,
        noRekening: createWajibPajakOrangPribadiMap.noRekening,
        namaRekening: createWajibPajakOrangPribadiMap.namaRekening,
        nip: createWajibPajakOrangPribadiMap.nip,
        statusPegawai: createWajibPajakOrangPribadiMap.statusPegawai,
        fileFotoNpwp: createWajibPajakOrangPribadiMap.fileFotoNpwp,
        fileFotoIdOrangPribadi:
          createWajibPajakOrangPribadiMap.fileFotoIdOrangPribadi,
        fileFotoBuktiRekening:
          createWajibPajakOrangPribadiMap.fileFotoBuktiRekening,
        statusWpop: true,
      },
    });

  return {
    nama: createWajibPajakOrangPribadi.nama,
    email: createWajibPajakOrangPribadi.email,
    kewarganegaraan: createWajibPajakOrangPribadi.kewarganegaraan,
    nama_negara: createWajibPajakOrangPribadi.namaNegara,
    id_orang_pribadi: createWajibPajakOrangPribadi.idOrangPribadi,
    nama_ktp: createWajibPajakOrangPribadi.namaKtp,
    npwp: createWajibPajakOrangPribadi.npwp,
    nama_npwp: createWajibPajakOrangPribadi.namaNpwp,
    kota_npwp: createWajibPajakOrangPribadi.kotaNpwp,
    bank_transfer: createWajibPajakOrangPribadi.bankTransfer,
    no_rekening: createWajibPajakOrangPribadi.noRekening,
    nama_rekening: createWajibPajakOrangPribadi.namaRekening,
    nip: createWajibPajakOrangPribadi.nip,
    status_pegawai: createWajibPajakOrangPribadi.statusPegawai,
    file_foto_npwp: createWajibPajakOrangPribadi.fileFotoNpwp,
    file_foto_id_orang_pribadi:
      createWajibPajakOrangPribadi.fileFotoIdOrangPribadi,
    file_foto_bukti_rekening:
      createWajibPajakOrangPribadi.fileFotoBuktiRekening,
  };
};
