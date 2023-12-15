import { Request, Response } from 'express';

import * as jenisPenghasilanService from '../services/jenisPenghasilanService';

export const jenisPenghasilanListPPh23 = async (
  req: Request,
  res: Response
) => {
  try {
    const queryParameters = req.query;
    const jenisPenghasilanList =
      await jenisPenghasilanService.getJenisPenghasilanPPh23List(
        queryParameters
      );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: jenisPenghasilanList.map((data: any) => ({
        kode_jenis_penghasilan: data.kodeJenisPenghasilan,
        kode_akun: data.kodeAkun,
        jenis_pajak_terkait: data.jenisPajakTerkait,
        jenis_penghasilan: data.jenisPenghasilan,
      })),
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: null,
    });
  }
};
