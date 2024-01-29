import { Request, Response } from 'express';

import * as pegawaiService from '../services/pegawaiService';

export const pegawaiList = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    const { results, pagination } = await pegawaiService.getPegawaiList(
      {},
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
