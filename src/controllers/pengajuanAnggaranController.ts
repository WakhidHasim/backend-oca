import { Request, Response } from 'express';

import * as pengajuanAnggaranService from '../services/pengajuanAnggaranService';

export const pengajuanAnggaranList = async (req: Request, res: Response) => {
  try {
    const { idl, page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    const { results, pagination } =
      await pengajuanAnggaranService.getPengajuanAnggaranList(
        { idl: idl as string },
        pageNumber,
        limitNumber
      );

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: results,
      pagination,
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
