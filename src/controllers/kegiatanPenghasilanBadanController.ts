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

export const getKegiatanPenghasilanBadanPPh23 = async (
  req: Request,
  res: Response
) => {
  try {
    const queryParameters = req.query;
    const kegiatanPenghasilanBadanPPh23List =
      await kegiatanPenghasilanBadanService.getKegiatanPenghasilanBadanPPh23List(
        queryParameters
      );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: kegiatanPenghasilanBadanPPh23List,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateKegiatanPenghasilanPPh23 = async (
  req: Request,
  res: Response
) => {
  const { kodeKegiatanBadan } = req.params;
  try {
    const updateKegiatanPenghasilanPph23 =
      await kegiatanPenghasilanBadanService.updateKegiatanPenghasilanBadanPPh23(
        kodeKegiatanBadan,
        req.body
      );

    res.json({
      status: {
        code: 200,
        description: 'Kegiatan Penghasilan Badan PPh23 Berhasil Diupdate',
      },
      result: updateKegiatanPenghasilanPph23,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteKegiatanPenghasilanBadanPPh23 = async (
  req: Request,
  res: Response
) => {
  const { kodeKegiatanBadan } = req.params;
  try {
    await kegiatanPenghasilanBadanService.deleteKegiatanPenghasilanBadanPph23(
      kodeKegiatanBadan
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
