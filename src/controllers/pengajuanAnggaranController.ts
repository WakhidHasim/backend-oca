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
      result: pengajuanAnggaranList,
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
