import { Request, Response } from 'express';

import * as kegiatanPenghasilanBadanService from '../services/kegiatanPenghasilanBadanService';
import HttpError from '../error/HttpError';

export const createKegiatanPenghasilanBadanPPh23 = async (
  req: Request,
  res: Response
) => {
  try {
    const kegaiatanPenghasilanBadanPPh23 =
      await kegiatanPenghasilanBadanService.createKegiatanPenghasilanBadanPPh23(
        req.body
      );
    res.json({
      status: {
        code: 200,
        description:
          'Data Kegiatan Penghasilan Badan PPh23 berhasil ditambahkan !',
      },
      result: kegaiatanPenghasilanBadanPPh23,
    });
  } catch (error) {
    console.log(Object.getPrototypeOf(error));
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({
        status: {
          code: error.statusCode,
          description: error.message,
        },
        result: null,
      });
    }

    const e = error as Error;
    console.log(e);
    res.status(500).json({
      status: {
        code: 500,
        description: e.message,
      },
      result: null,
    });
  }
};
