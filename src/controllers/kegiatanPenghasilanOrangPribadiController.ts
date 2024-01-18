import { Request, Response } from 'express';
import { prisma } from '../config/database';
import BadRequestError from '../error/BadRequestError';

import * as kegiatanPenghasilanOPService from '../services/kegiatanPenghasilanOrangPribadiService';
import {
  createKegiatanOrangPribadiSchema,
  CreateKegiatanOrangPribadiInput,
} from '../validation/kegiatanPenghasikanOrangPribadiSchema';
import { KegiatanPenghasilanOrangPribadi } from '../entities/kegiatanPenghasilanOrangPribadi';

const generateKodeKegiatanOP = async () => {
  const currentYear = new Date().getFullYear();
  const startDateOfYear = new Date(`${currentYear}-01-01`);
  const endDateOfYear = new Date(`${currentYear}-12-31`);

  const countData = await prisma.kegiatanPenghasilanOP.count({
    where: {
      tanggalInput: {
        gte: startDateOfYear,
        lte: endDateOfYear,
      },
    },
  });

  const isNewYear = countData === 0;
  const formattedCount = isNewYear
    ? '00001'
    : (countData + 1).toString().padStart(5, '0');

  const yearInTwoDigits = currentYear.toString().substr(-2);

  return `KOP${yearInTwoDigits}${formattedCount}`;
};

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
        kodeKegiatanOP: await generateKodeKegiatanOP(),
        tanggalInput: new Date(),
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
      console.error('Unexpected error:', error);
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
