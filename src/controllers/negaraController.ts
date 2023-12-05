import { Request, Response } from 'express';

import * as negaraService from '../services/negaraService';

export const getNegaraList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const negaraList = await negaraService.getNegaraList(queryParameters);
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: negaraList,
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
