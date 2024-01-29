import { Request, Response } from 'express';
import BadRequestError from '../error/BadRequestError';
import moment from 'moment-timezone';
import * as itemKegiatanPenghasilanOrangPribadi from '../services/itemKegiatanOrangPribadiService';
import { createItemKegiatanPenghasilanOrangPribadiSchema } from '../validation/itemKegitanPenghasilanOrangPribadi';
import { ItemKegiatanPenghasilanOrangPribadi } from '../entities/itemKegiatanPenghasilanOrangPribadi';

export const createPPh21 = async (req: Request, res: Response) => {
  try {
    const validationResult =
      createItemKegiatanPenghasilanOrangPribadiSchema.safeParse(req.body);

    if (validationResult.success) {
      const body = validationResult.data;

      const completeRequest: ItemKegiatanPenghasilanOrangPribadi = {
        ...body,
        tanggalInput: moment().tz('Asia/Jakarta').format(),
        status: 'Entry',
      };

      const createPPh21 = await itemKegiatanPenghasilanOrangPribadi.createPPh21(
        completeRequest
      );

      res.json({
        status: {
          code: 200,
          description: 'Ok',
        },
        result: createPPh21,
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
    }
  }
};

export const getAllPPh21 = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    const { results, pagination } =
      await itemKegiatanPenghasilanOrangPribadi.getAllPPh21(
        {},
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
    const { KodeItemKegiatanOP } = req.params;

    await itemKegiatanPenghasilanOrangPribadi.deletePPh21(KodeItemKegiatanOP);

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
