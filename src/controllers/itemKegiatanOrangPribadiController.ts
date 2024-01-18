import { Request, Response } from 'express';
import BadRequestError from '../error/BadRequestError';

import * as itemKegiatanPenghasilanOrangPribadi from '../services/itemKegiatanOrangPribadiService';

export const createKegiatanPenghasilanOP = async (
  req: Request,
  res: Response
) => {
  try {
    const createPPh21 = await itemKegiatanPenghasilanOrangPribadi.createPPh21({
      ...req.body,
    });

    res.json({
      status: {
        code: 200,
        description: 'Ok',
      },
      result: createPPh21,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        status: {
          code: 400,
          description: 'Bad Request',
        },
        result: error.message,
      });
    }
  }
};

export const getAllPPh21 = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const getAllPPh21 = await itemKegiatanPenghasilanOrangPribadi.getAllPPh21(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: getAllPPh21,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        status: {
          code: 400,
          description: 'Bad Request',
        },
        result: error.message,
      });
      return;
    }

    // send to logger if needed
    console.log(error);

    return res.status(500).json({ message: 'internal server error' });
  }
};

export const deletePPh21 = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await itemKegiatanPenghasilanOrangPribadi.deletePPh21(id);

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: {
        message: 'Deleted successfully',
      },
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        status: {
          code: 400,
          description: 'Bad Request',
        },
        result: error.message,
      });
    }
  }
};
