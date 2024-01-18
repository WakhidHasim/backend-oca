import { Request, Response } from 'express';

import * as wpopService from '../services/wpopService';

export const wpopList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const wpop = await wpopService.getWPOPList(queryParameters);
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wpop,
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
