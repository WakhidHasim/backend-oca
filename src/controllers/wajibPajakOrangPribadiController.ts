import { Request, Response } from 'express';
import * as wajibPajakOrangPribadiService from '../services/wajibPajakOrangPribadiService';
import HttpError from '../error/HttpError';

export const createWajibPajakOrangPribadi = async (
  req: Request,
  res: Response
) => {
  try {
    const wajibPajakOrangPribadi =
      await wajibPajakOrangPribadiService.createWajibPajakOrangPribadi(
        req.body
      );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wajibPajakOrangPribadi,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    const e = error as Error
    console.log(e)
    res.status(500).json({ error: e.message });
  }
};
