import { Request, Response } from 'express';

import * as objekPajakService from '../services/objekPajakService';

export const objekPajakList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const objekPajakList = await objekPajakService.getObjekPajakList(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: objekPajakList,
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
