import { Request, Response } from 'express';

import * as wajibPajakBadanUsahaService from '../services/wajibPajakBadanUsahaService';

export const wpbuList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const wpbuList = await wajibPajakBadanUsahaService.getWPBUList(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wpbuList,
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
