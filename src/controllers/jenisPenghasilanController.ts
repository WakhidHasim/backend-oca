import { Request, Response } from 'express';

import * as jenisPenghasilanService from '../services/jenisPenghasilanService';

export const jenisPenghasilanListPPh21 = async (
  req: Request,
  res: Response
) => {
  try {
    const queryParameters = req.query;
    const jenisPenghasilanList =
      await jenisPenghasilanService.getJenisPenghasilanPPh21List(
        queryParameters
      );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: jenisPenghasilanList,
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

export const jenisPenghasilanListPPh23 = async (
  req: Request,
  res: Response
) => {
  try {
    const queryParameters = req.query;
    const jenisPenghasilanList =
      await jenisPenghasilanService.getJenisPenghasilanPPh23List(
        queryParameters
      );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: jenisPenghasilanList,
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

export const jenisPenghasilanListPPh4Ayat2 = async (
  req: Request,
  res: Response
) => {
  try {
    const queryParameters = req.query;
    const jenisPenghasilanList =
      await jenisPenghasilanService.getJenisPenghasilanPPh4Ayat2List(
        queryParameters
      );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: jenisPenghasilanList,
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
