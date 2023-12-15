import { Request, Response } from 'express';

import * as objekPajakService from '../services/objekPajakService';

export const objekPajakPPh23List = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const objekPajakList = await objekPajakService.getObjekPajakPPh23List(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: objekPajakList.map((data: any) => ({
        kode_objek: data.kodeObjek,
        kode_jenis_pajak_id: data.kodeJenisPajakId,
        objek_pajak: data.objekPajak,
        tarif_npwp: data.tarifNpwp,
        tarif_non_npwp: data.tarifNonNpwp,
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
