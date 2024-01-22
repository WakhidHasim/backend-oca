import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import { KegiatanPenghasilanBadan } from '../entities/kegiatanPenghasilanBadan';

// pph 23
type CreatePph23Param = KegiatanPenghasilanBadan;
type UpdatePph23Param = KegiatanPenghasilanBadan;

type GetPph23List = {
  kodeKegiatanBadan?: string;
  tanggalInput?: Date;
  uraianKegiatan?: string;
  idKegiatanAnggaran?: string;
  kodeJenisPenghasilan?: number;
  kodeJenisPajak?: number;
  pic?: string;
  kodeWPBadan?: string;
  penghasilanBruto?: number;
  kodeObjek?: string;
  tarifPajak?: number;
  potonganPajak?: number;
  penghasilanDiterima?: number;
  noRekening?: string;
  namaRekening?: string;
  bankTransfer?: string;
  narahubung?: string;
  invoice?: string;
  fakturPajak?: string;
  dokumenKerjasamaKegiatan?: string;
  status?: string;
  idl?: string;
};

export const createPPh23 = async (input: CreatePph23Param) => {
  const requestBody = input;

  const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
    where: { idKegiatanAnggaran: requestBody.idKegiatanAnggaran },
  });

  if (!PengajuanAnggaran) {
    throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
  }

  const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
    where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
  });

  if (!jenisPenghasilan) {
    throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
  }

  const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWPBadan: requestBody.kodeWPBadan },
  });

  if (!wajibPajakBadanUsaha) {
    throw new BadRequestError('Kode WP Badan tidak ditemukan.');
  }

  const objekPajak = await prisma.objekPajak.findUnique({
    where: { kodeObjek: requestBody.kodeObjek },
  });

  if (!objekPajak) {
    throw new BadRequestError('Kode Objek tidak ditemukan.');
  }

  const satuanKerja = await prisma.satuanKerja.findUnique({
    where: { idl: requestBody.idl },
  });

  if (!satuanKerja) {
    throw new BadRequestError('IDL tidak ditemukan.');
  }

  const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
  const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
  const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
  const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
  const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;
  const wajibPajakBadanUsahaAdaSkbPPh23 = wajibPajakBadanUsaha.adaSkbPPh23;

  const tarifNpwp = objekPajak.tarifNpwp;
  const tarifNonNpwp = objekPajak.tarifNonNpwp;

  let tarifPajak;
  let potonganPajak;

  if (wajibPajakBadanUsahaAdaSkbPPh23 === 'ya') {
    tarifPajak = 0;
    potonganPajak = 0;
  } else {
    if (
      wajibPajakBadanUsahaNPWP === '0000000000000000' ||
      wajibPajakBadanUsahaNPWP === 'BELUM ADA'
    ) {
      tarifPajak = tarifNonNpwp;
    } else {
      tarifPajak = tarifNpwp;
    }

    potonganPajak = (tarifPajak / 100) * requestBody.penghasilanBruto;
  }

  const penghasilanDiterima = requestBody.penghasilanBruto - potonganPajak;

  const craetePPh23 = await prisma.kegiatanPenghasilanBadan.create({
    data: {
      ...requestBody,
      npwp: wajibPajakBadanUsahaNPWP,
      noRekening: wajibPajakBadanUsahaNoRekening,
      namaRekening: wajibPajakBadanUsahaNamaRekening,
      bankTransfer: wajibPajakBadanUsahaBankTransfter,
      narahubung: wajibPajakBadanUsahaNarahubung,
      tarifPajak: tarifPajak,
      potonganPajak: potonganPajak,
      penghasilanDiterima: penghasilanDiterima,
    },
  });

  return craetePPh23;
};

export const getAllPPh23 = async (
  data: GetPph23List
  // page: number,
  // limit: number
) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  // const take = limit;
  // const skip = (page - 1) * limit;

  return prisma.kegiatanPenghasilanBadan.findMany({
    // skip: skip,
    // take: take,
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 2,
      idl: data.idl,
    },
  });
};

export const getPPh23ById = async (kodeKegiatanBadan: string) => {
  const kegiatanPenghasilanBadanUsaha =
    await prisma.kegiatanPenghasilanBadan.findUnique({
      where: { kodeKegiatanBadan },
    });

  if (!kegiatanPenghasilanBadanUsaha) {
    throw new BadRequestError('Kegiatan Penghasilan Badan tidak ditemukan');
  }

  return kegiatanPenghasilanBadanUsaha;
};

// export const updatePPh23 = async (
//   kodeKegiatanBadan: string,
//   updatedData: Partial<UpdatePph23Param>
// ) => {
//   const getPPh23ById = await prisma.kegiatanPenghasilanBadan.findFirst({
//     where: { kodeKegiatanBadan },
//   });

//   if (!getPPh23ById) {
//     throw new BadRequestError('Kode Kegiatan Badan tidak ditemukan.');
//   }

//   const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
//     where: { idKegiatanAnggaran: updatedData.idKegiatanAnggaran },
//   });

//   if (!PengajuanAnggaran) {
//     throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
//   }

//   const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
//     where: { kodeJenisPenghasilan: updatedData.kodeJenisPenghasilan },
//   });

//   if (!jenisPenghasilan) {
//     throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
//   }

//   const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
//     where: { kodeWPBadan: updatedData.kodeWPBadan },
//   });

//   if (!wajibPajakBadanUsaha) {
//     throw new BadRequestError('Kode WP Badan tidak ditemukan.');
//   }

//   const objekPajak = await prisma.objekPajak.findUnique({
//     where: { kodeObjek: updatedData.kodeObjek },
//   });

//   if (!objekPajak) {
//     throw new BadRequestError('Kode Objek tidak ditemukan.');
//   }

//   const satuanKerja = await prisma.satuanKerja.findUnique({
//     where: { idl: updatedData.idl },
//   });

//   if (!satuanKerja) {
//     throw new BadRequestError('IDL tidak ditemukan.');
//   }

//   const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
//   const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
//   const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
//   const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
//   const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;
//   const wajibPajakBadanUsahaAdaSkbPPh23 = wajibPajakBadanUsaha.adaSkbPPh23;

//   const tarifNpwp = objekPajak.tarifNpwp;
//   const tarifNonNpwp = objekPajak.tarifNonNpwp;

//   let tarifPajak;
//   let potonganPajak;
//   const penghasilanBruto = updatedData.penghasilanBruto || 0;

//   if (wajibPajakBadanUsahaAdaSkbPPh23 === 'ya') {
//     tarifPajak = 0;
//     potonganPajak = 0;
//   } else {
//     if (
//       wajibPajakBadanUsahaNPWP === '0000000000000000' ||
//       wajibPajakBadanUsahaNPWP === 'BELUM ADA'
//     ) {
//       tarifPajak = tarifNonNpwp;
//     } else {
//       tarifPajak = tarifNpwp;
//     }

//     potonganPajak = (tarifPajak / 100) * penghasilanBruto;
//   }

//   const penghasilanDiterima = penghasilanBruto - potonganPajak;

//   const updatedKegiatanBadanUsaha =
//     await prisma.kegiatanPenghasilanBadan.update({
//       where: { kodeKegiatanBadan },
//       data: {
//         ...updatedData,
//         npwp: wajibPajakBadanUsahaNPWP,
//         noRekening: wajibPajakBadanUsahaNoRekening,
//         namaRekening: wajibPajakBadanUsahaNamaRekening,
//         bankTransfer: wajibPajakBadanUsahaBankTransfter,
//         narahubung: wajibPajakBadanUsahaNarahubung,
//         tarifPajak: tarifPajak,
//         potonganPajak: potonganPajak,
//         penghasilanDiterima: penghasilanDiterima,
//       },
//     });

//   return updatedKegiatanBadanUsaha;
// };

export const updatePPh23 = async (
  kodeKegiatanBadan: string,
  updatedData: Partial<UpdatePph23Param>,
  kodeJenisPenghasilan: number,
  penghasilanBruto: number,
  invoiceFile: string,
  fakturPajakFile: string,
  dokumenKerjasamaKegiatanFile: string
) => {
  const getPPh23ById = await prisma.kegiatanPenghasilanBadan.findFirst({
    where: { kodeKegiatanBadan },
  });

  if (!getPPh23ById) {
    throw new BadRequestError('Kode Kegiatan Badan tidak ditemukan.');
  }

  const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
    where: { idKegiatanAnggaran: updatedData.idKegiatanAnggaran },
  });

  if (!PengajuanAnggaran) {
    throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
  }

  const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
    where: { kodeJenisPenghasilan: kodeJenisPenghasilan },
  });

  if (!jenisPenghasilan) {
    throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
  }

  const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWPBadan: updatedData.kodeWPBadan },
  });

  if (!wajibPajakBadanUsaha) {
    throw new BadRequestError('Kode Wajib Pajak Badan tidak valid.');
  }

  const objekPajak = await prisma.objekPajak.findUnique({
    where: { kodeObjek: updatedData.kodeObjek },
  });

  if (!objekPajak) {
    throw new BadRequestError('Kode Objek tidak valid.');
  }

  const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
  const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
  const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
  const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
  const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;
  const wajibPajakBadanUsahaAdaSkbPPh23 = wajibPajakBadanUsaha.adaSkbPPh23;

  const tarifNpwp = objekPajak.tarifNpwp;
  const tarifNonNpwp = objekPajak.tarifNonNpwp;

  let tarifPajak;
  let potonganPajak;

  if (wajibPajakBadanUsahaAdaSkbPPh23 === 'ya') {
    tarifPajak = 0;
    potonganPajak = 0;
  } else {
    if (
      wajibPajakBadanUsahaNPWP === '0000000000000000' ||
      wajibPajakBadanUsahaNPWP === 'BELUM ADA'
    ) {
      tarifPajak = tarifNonNpwp;
    } else {
      tarifPajak = tarifNpwp;
    }

    potonganPajak = (tarifPajak / 100) * penghasilanBruto;
  }

  const penghasilanDiterima = penghasilanBruto - potonganPajak;

  const updatedKegiatanBadanUsaha =
    await prisma.kegiatanPenghasilanBadan.update({
      where: { kodeKegiatanBadan },
      data: {
        uraianKegiatan: updatedData.uraianKegiatan,
        idKegiatanAnggaran: updatedData.idKegiatanAnggaran,
        kodeWPBadan: updatedData.kodeWPBadan,
        kodeObjek: updatedData.kodeObjek,
        pic: updatedData.pic,
        kodeJenisPenghasilan: kodeJenisPenghasilan,
        penghasilanBruto: penghasilanBruto,
        invoice: invoiceFile,
        fakturPajak: fakturPajakFile,
        dokumenKerjasamaKegiatan: dokumenKerjasamaKegiatanFile,

        npwp: wajibPajakBadanUsahaNPWP,
        noRekening: wajibPajakBadanUsahaNoRekening,
        namaRekening: wajibPajakBadanUsahaNamaRekening,
        bankTransfer: wajibPajakBadanUsahaBankTransfter,
        narahubung: wajibPajakBadanUsahaNarahubung,
        tarifPajak: tarifPajak,
        potonganPajak: potonganPajak,
        penghasilanDiterima: penghasilanDiterima,
      },
    });

  return updatedKegiatanBadanUsaha;
};

export const deletePPh23 = async (kodeKegiatanBadan: string) => {
  const deletedKegiatanBadanUsaha =
    await prisma.kegiatanPenghasilanBadan.delete({
      where: { kodeKegiatanBadan },
    });

  return deletedKegiatanBadanUsaha;
};

// PPh 4 Ayat 2
type CreatePph4Param = KegiatanPenghasilanBadan;
type UpdatePph4Param = KegiatanPenghasilanBadan;

type GetPph4List = {
  kodeKegiatanBadan?: string;
  tanggalInput?: Date;
  uraianKegiatan?: string;
  idKegiatanAnggaran?: string;
  kodeJenisPenghasilan?: number;
  kodeJenisPajak?: number;
  pic?: string;
  kodeWPBadan?: string;
  penghasilanBruto?: number;
  kodeObjek?: string;
  tarifPajak?: number;
  potonganPajak?: number;
  penghasilanDiterima?: number;
  noRekening?: string;
  namaRekening?: string;
  bankTransfer?: string;
  narahubung?: string;
  invoice?: string;
  fakturPajak?: string;
  dokumenKerjasamaKegiatan?: string;
  status?: string;
  idl?: string;
};

export const createPPh4Ayat2 = async (input: CreatePph4Param) => {
  const requestBody = input;

  const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
    where: { idKegiatanAnggaran: requestBody.idKegiatanAnggaran },
  });

  if (!PengajuanAnggaran) {
    throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
  }

  const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
    where: { kodeJenisPenghasilan: requestBody.kodeJenisPenghasilan },
  });

  if (!jenisPenghasilan) {
    throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
  }

  const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
    where: { kodeWPBadan: requestBody.kodeWPBadan },
  });

  if (!wajibPajakBadanUsaha) {
    throw new BadRequestError('Kode WP Badan tidak ditemukan.');
  }

  const objekPajak = await prisma.objekPajak.findUnique({
    where: { kodeObjek: requestBody.kodeObjek },
  });

  if (!objekPajak) {
    throw new BadRequestError('Kode Objek tidak ditemukan.');
  }

  const satuanKerja = await prisma.satuanKerja.findUnique({
    where: { idl: requestBody.idl },
  });

  if (!satuanKerja) {
    throw new BadRequestError('IDL tidak ditemukan.');
  }

  const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
  const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
  const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
  const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
  const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;

  const tarifNpwp = objekPajak.tarifNpwp;
  const tarifNonNpwp = objekPajak.tarifNonNpwp;

  let tarifPajak;

  if (
    wajibPajakBadanUsahaNPWP === '0000000000000000' ||
    wajibPajakBadanUsahaNPWP == 'BELUM ADA'
  ) {
    tarifPajak = tarifNonNpwp;
  } else {
    tarifPajak = tarifNpwp;
  }

  const penghasilanBruto = requestBody.penghasilanBruto || 0;

  const potonganPajak = (tarifPajak / 100) * penghasilanBruto;

  const penghasilanDiterima = penghasilanBruto - potonganPajak;

  const craetePPh4 = await prisma.kegiatanPenghasilanBadan.create({
    data: {
      ...requestBody,
      npwp: wajibPajakBadanUsahaNPWP,
      noRekening: wajibPajakBadanUsahaNoRekening,
      namaRekening: wajibPajakBadanUsahaNamaRekening,
      bankTransfer: wajibPajakBadanUsahaBankTransfter,
      narahubung: wajibPajakBadanUsahaNarahubung,
      tarifPajak: tarifPajak,
      potonganPajak: potonganPajak,
      penghasilanDiterima: penghasilanDiterima,
    },
  });

  return craetePPh4;
};

export const getAllPPh4Ayat2 = async (data: GetPph4List) => {
  const kegiatanPenghasilanBadanUsahaList = data;

  return prisma.kegiatanPenghasilanBadan.findMany({
    where: {
      ...kegiatanPenghasilanBadanUsahaList,
      kodeJenisPajak: 3,
    },
  });
};

export const getPPh4Ayat2ById = async (kodeKegiatanBadan: string) => {
  const kegiatanPenghasilanBadanUsaha =
    await prisma.kegiatanPenghasilanBadan.findUnique({
      where: { kodeKegiatanBadan },
    });

  if (!kegiatanPenghasilanBadanUsaha) {
    throw new BadRequestError('Kegiatan Penghasilan Badan tidak ditemukan');
  }

  return kegiatanPenghasilanBadanUsaha;
};

export const updatePPh4Ayat2 = async (
  kodeKegiatanBadan: string,
  updatedData: Partial<UpdatePph4Param>,
  kodeJenisPenghasilan: number,
  penghasilanBruto: number,
  invoiceFile: string,
  fakturPajakFile: string,
  dokumenKerjasamaKegiatanFile: string
) => {
  try {
    const getPPh23ById = await prisma.kegiatanPenghasilanBadan.findFirst({
      where: { kodeKegiatanBadan },
    });

    if (!getPPh23ById) {
      throw new BadRequestError('Kode Kegiatan Badan tidak ditemukan.');
    }

    const PengajuanAnggaran = await prisma.PengajuanAnggaran.findUnique({
      where: { idKegiatanAnggaran: updatedData.idKegiatanAnggaran },
    });

    if (!PengajuanAnggaran) {
      throw new BadRequestError('ID Kegiatan Anggaran tidak ditemukan.');
    }

    const jenisPenghasilan = await prisma.jenisPenghasilan.findUnique({
      where: { kodeJenisPenghasilan: kodeJenisPenghasilan },
    });

    if (!jenisPenghasilan) {
      throw new BadRequestError('Kode Jenis Penghasilan tidak ditemukan.');
    }

    const wajibPajakBadanUsaha = await prisma.wajibPajakBadanUsaha.findUnique({
      where: { kodeWPBadan: updatedData.kodeWPBadan },
    });

    if (!wajibPajakBadanUsaha) {
      throw new BadRequestError('Kode Wajib Pajak Badan tidak valid.');
    }

    const objekPajak = await prisma.objekPajak.findUnique({
      where: { kodeObjek: updatedData.kodeObjek },
    });

    if (!objekPajak) {
      throw new BadRequestError('Kode Objek tidak valid.');
    }

    const wajibPajakBadanUsahaNPWP = wajibPajakBadanUsaha.npwp;
    const wajibPajakBadanUsahaNoRekening = wajibPajakBadanUsaha.noRekening;
    const wajibPajakBadanUsahaNamaRekening = wajibPajakBadanUsaha.namaRekening;
    const wajibPajakBadanUsahaBankTransfter = wajibPajakBadanUsaha.bankTransfer;
    const wajibPajakBadanUsahaNarahubung = wajibPajakBadanUsaha.namaNaraHubung;

    const tarifNpwp = objekPajak.tarifNpwp;
    const tarifNonNpwp = objekPajak.tarifNonNpwp;

    let tarifPajak;

    if (
      wajibPajakBadanUsahaNPWP === '0000000000000000' ||
      wajibPajakBadanUsahaNPWP == 'BELUM ADA'
    ) {
      tarifPajak = tarifNonNpwp;
    } else {
      tarifPajak = tarifNpwp;
    }

    const penghasilanBrutoVal = penghasilanBruto || 0;
    const potonganPajak = (tarifPajak / 100) * penghasilanBrutoVal;
    const penghasilanDiterima = penghasilanBrutoVal - potonganPajak;

    const updatedKegiatanBadanUsaha =
      await prisma.kegiatanPenghasilanBadan.update({
        where: { kodeKegiatanBadan },
        data: {
          uraianKegiatan: updatedData.uraianKegiatan,
          idKegiatanAnggaran: updatedData.idKegiatanAnggaran,
          kodeWPBadan: updatedData.kodeWPBadan,
          kodeObjek: updatedData.kodeObjek,
          pic: updatedData.pic,
          kodeJenisPenghasilan: kodeJenisPenghasilan,
          penghasilanBruto: penghasilanBruto,
          invoice: invoiceFile,
          fakturPajak: fakturPajakFile,
          dokumenKerjasamaKegiatan: dokumenKerjasamaKegiatanFile,

          npwp: wajibPajakBadanUsahaNPWP,
          noRekening: wajibPajakBadanUsahaNoRekening,
          namaRekening: wajibPajakBadanUsahaNamaRekening,
          bankTransfer: wajibPajakBadanUsahaBankTransfter,
          narahubung: wajibPajakBadanUsahaNarahubung,
          tarifPajak: tarifPajak,
          potonganPajak: potonganPajak,
          penghasilanDiterima: penghasilanDiterima,
        },
      });

    return updatedKegiatanBadanUsaha;
  } catch (error) {
    console.error('Error updating Kegiatan Penghasilan Badan Usaha:', error);
    throw error;
  }
};

export const deletePPh4Ayat2 = async (kodeKegiatanBadan: string) => {
  const deletedKegiatanBadanUsaha =
    await prisma.kegiatanPenghasilanBadan.delete({
      where: { kodeKegiatanBadan },
    });

  return deletedKegiatanBadanUsaha;
};
