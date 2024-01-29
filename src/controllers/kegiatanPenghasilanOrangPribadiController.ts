import { Request, Response } from 'express';
import moment from 'moment-timezone';
import BadRequestError from '../error/BadRequestError';

import * as kegiatanPenghasilanOPService from '../services/kegiatanPenghasilanOrangPribadiService';
import {
  createKegiatanOrangPribadiSchema,
  CreateKegiatanOrangPribadiInput,
} from '../validation/kegiatanPenghasikanOrangPribadiSchema';
import { KegiatanPenghasilanOrangPribadi } from '../entities/kegiatanPenghasilanOrangPribadi';

export const createKegiatanPenghasilanOP = async (
  req: Request<{}, {}, CreateKegiatanOrangPribadiInput>,
  res: Response
) => {
  try {
    const validationResult = createKegiatanOrangPribadiSchema.safeParse(
      req.body
    );

    if (validationResult.success) {
      const body = validationResult.data;

      const completeRequest: KegiatanPenghasilanOrangPribadi = {
        tanggalInput: moment().tz('Asia/Jakarta').format(),
        kodeJenisPajak: 1,
        ...body,
      };

      const createKegiatanPenghasilanOP =
        await kegiatanPenghasilanOPService.createKegiatanPenghasilanOrangPribadi(
          completeRequest
        );

      res.json({
        status: {
          code: 200,
          description: 'Ok',
        },
        result: createKegiatanPenghasilanOP,
      });
    } else {
      res.status(400).json({
        status: {
          code: 400,
          description: 'Bad Request',
        },
        result: validationResult.error.errors,
      });
    }
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({
        status: {
          code: 400,
          description: 'Bad Request',
        },
        result: error.message,
      });
    } else {
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};

export const getKegiatanPenghasilanOrangPribadiList = async (
  req: Request,
  res: Response
) => {
  const { idl, page, limit } = req.query;
  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;

  const { results, pagination } =
    await kegiatanPenghasilanOPService.getKegiatanPenghasilanOPList(
      { idl: idl as string },
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
