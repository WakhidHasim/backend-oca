import { Request, Response } from 'express';

import * as bankService from '../services/bankService';

export const getBankList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const bankList = await bankService.getBankList(queryParameters);
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: bankList,
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
