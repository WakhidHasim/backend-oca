import { Request, Response } from 'express';

import * as pengajuanAnggaranService from '../services/pengajuanAnggaranService';

export const pengajuanAnggaranList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const pengajuanAnggaranList =
      await pengajuanAnggaranService.getPengajuanAnggaranList(queryParameters);
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: pengajuanAnggaranList.map((data: any) => ({
        id_kegiatan_anggaran: data.idKegiatanAnggaran,
        tahun: data.tahun,
        kegiatan: data.kegiatan,
        no_pengajuan: data.noPengajuan,
        idl: data.idl,
        jumlah_pengajuan: data.jumlahPengajuan,
        metode_pengajuan: data.metodePengajuan,
        status_pengajuan: data.statusPengajuan,
        tanggal_pengajuan: data.tanggalPengajuan,
      })),
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: null,
    });
  }
};
