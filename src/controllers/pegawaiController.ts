import { Request, Response } from 'express';

import * as pegawaiService from '../services/pegawaiService';

export const pegawaiList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const pegawai = await pegawaiService.getPegawaiList(queryParameters);
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: pegawai,
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
