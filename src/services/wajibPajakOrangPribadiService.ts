import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import {
  Kewarganegaraan,
  StatusPegawai,
  WajibPajakOrangPribadi,
} from '../entities/wajibPajakOrangPribadi';
import { createWajibPajakOrangPribadiValidation } from '../validation/wajibPajakOrangPribadiValidation';

type CreateWajibPajakOrangPribadiParams = Omit<
  WajibPajakOrangPribadi,
  'password'
>;

const padNumber = (number: number, length: number): string => {
  let str: string = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};

const generateCodeWajibPajakOrangPribadi = async (): Promise<string> => {
  try {
    const twoDigitYear: string = new Date().getFullYear().toString().slice(-2);
    const countData = await prisma.wajibPajakOrangPribadi.count();
    const paddedNumber: string = padNumber(countData + 1, 5);
    const code: string = `OP${twoDigitYear}${paddedNumber}`;
    return code;
  } catch (error) {
    console.error('Error generating WPOP code:', error);
    throw error;
  }
};

export const createWajibPajakOrangPribadi = async (
  data: CreateWajibPajakOrangPribadiParams
) => {
  const validator = createWajibPajakOrangPribadiValidation.safeParse({
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
    namaRekening: data.nama_rekening,
    nip: data.nip,
    statusPegawai: data.status_pegawai,
    fileFotoNpwp: data.file_foto_npwp,
    fileFotoIdOrangPribadi: data.file_foto_id_orang_pribadi,
    fileFotoBuktiRekening: data.file_foto_bukti_rekening,
    isApproved: data.is_approved,
  });

  if (!validator.success) throw new BadRequestError(validator.error.message);

  const requestBody = validator.data;

  const kewarganegaraanString =
    Kewarganegaraan[
      requestBody.kewarganegaraan as keyof typeof Kewarganegaraan
    ];

  if (!Object.values(Kewarganegaraan).includes(kewarganegaraanString)) {
    throw new BadRequestError('Nilai kewarganegaraan tidak valid.');
  }

  const statusPegawaiString =
    StatusPegawai[requestBody.statusPegawai as keyof typeof StatusPegawai];

  if (!Object.values(StatusPegawai).includes(statusPegawaiString)) {
    throw new BadRequestError('Nilai status pegawai tidak valid.');
  }

  const kodeWPOP = await generateCodeWajibPajakOrangPribadi();
  const existingData = await prisma.wajibPajakOrangPribadi.findUnique({
    where: { kodeWPOP: kodeWPOP },
  });

  if (existingData) {
    throw new BadRequestError('Kode WPOP sudah ada dalam database.');
  }

  const createWajibPajakOrangPribadi =
    await prisma.wajibPajakOrangPribadi.create({
      data: {
        kodeWPOP: kodeWPOP,
        nama: requestBody.nama,
        email: requestBody.email,
        kewarganegaraan: requestBody.kewarganegaraan,
        namaNegara: requestBody.namaNegara,
        idOrangPribadi: requestBody.idOrangPribadi,
        namaKtp: requestBody.namaKtp,
        npwp: requestBody.npwp,
        namaNpwp: requestBody.namaNpwp,
        kotaNpwp: requestBody.kotaNpwp,
        bankTransfer: requestBody.bankTransfer,
        noRekening: requestBody.noRekening,
        namaRekening: requestBody.namaRekening,
        nip: requestBody.nip,
        statusPegawai: requestBody.statusPegawai,
        fileFotoNpwp: requestBody.fileFotoNpwp,
        fileFotoIdOrangPribadi: requestBody.fileFotoIdOrangPribadi,
        fileFotoBuktiRekening: requestBody.fileFotoBuktiRekening,
        isApproved: true,
      },
    });

  return {
    kode_wpop: createWajibPajakOrangPribadi.kodeWPOP,
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
