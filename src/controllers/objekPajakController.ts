import { Request, Response } from 'express';

import * as objekPajakService from '../services/objekPajakService';

export const objekPajakPPh21List = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const objekPajakList = await objekPajakService.getObjekPajakPPh21List(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: objekPajakList,
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

export const objekPajakPPh23List = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const objekPajakList = await objekPajakService.getObjekPajakPPh23List(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: objekPajakList,
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

export const objekPajakPPh4Ayat2List = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const objekPajakList = await objekPajakService.getObjekPajakPPh4Ayat2List(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: objekPajakList,
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
