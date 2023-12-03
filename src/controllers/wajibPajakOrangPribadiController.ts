import { Request, Response } from 'express';
import * as wajibPajakOrangPribadiService from '../services/wajibPajakOrangPribadiService';

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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
