import { Request, Response } from 'express';
import BadRequestError from '../error/BadRequestError';

import * as kegiatanPenghasilanOPService from '../services/kegiatanPenghasilanOrangPribadi';

export const createKegiatanPenghasilanOP = async (
  req: Request,
  res: Response
) => {
  try {
    const createKegiatanPenghasilanOP =
      await kegiatanPenghasilanOPService.createKegiatanPenghasilanOrangPribadi({
        ...req.body,
      });

    res.json({
      status: {
        code: 200,
        description: 'Ok',
      },
      result: createKegiatanPenghasilanOP,
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

export const getKegiatanPenghasilanOrangPribadiList = async (
  req: Request,
  res: Response
) => {
  try {
    const queryParameters = req.query;
    const kegiatanPenghasilanBadanOP =
      await kegiatanPenghasilanOPService.getKegiatanPenghasilanOPList(
        queryParameters
      );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: kegiatanPenghasilanBadanOP,
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

export const updateKegiatanPenghasilanOP = async (
  req: Request,
  res: Response
) => {
  try {
    const { kodeKegiatanOP } = req.params;
    const updatedData = req.body;

    const updatedKegiatanOP =
      await kegiatanPenghasilanOPService.updateKegiatanPenghasilanOP(
        kodeKegiatanOP,
        updatedData
      );

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: updatedKegiatanOP,
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

export const deleteKegiatanPenghasilanOP = async (
  req: Request,
  res: Response
) => {
  try {
    const { kodeKegiatanOP } = req.params;

    await kegiatanPenghasilanOPService.deleteKegiatanPenghasilanOP(
      kodeKegiatanOP
    );

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

export const getKegiatanPenghasilanOPById = async (
  req: Request,
  res: Response
) => {
  try {
    const { kodeKegiatanOP } = req.params;
    const kegiatanPenghasilanOP =
      await kegiatanPenghasilanOPService.getKegiatanPenghasilanOPById(
        kodeKegiatanOP
      );

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: kegiatanPenghasilanOP,
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
