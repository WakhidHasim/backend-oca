import { Request, Response } from 'express';
import multer from 'multer';

import * as wajibPajakOrangPribadiService from '../services/wajibPajakOrangPribadiService';
import { uploadWpopDocument } from '../services/upload/uploadService';
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
        description: 'Data Wajib Pajak Orang Pribadi berhasil ditambahkan !',
      },
      result: wajibPajakOrangPribadi,
    });
  } catch (error) {
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

const multerUploadSomeDocument = multer();
/**
 * Handle operasi untuk upload dokumen tertentu
 *
 * NOTE: saat ini saya bikin contoh 'some_document'
 *
 * @param req Request
 * @param res Response
 * @returns void
 */
export const uploadSomeDocument = async (req: Request, res: Response) => {
  try {
    const controller = async () => {
      if (!req.file) return res.status(400).json({ message: 'file required' });

      const file = req.file;

      const path = 'registrasi_wajib_pajak';

      // call service
      await uploadWpopDocument(
        {
          file: {
            name: file.originalname,
            content: file.buffer,
          },
        },
        path
      );

      return res.status(200).json({ message: 'success' });
    };

    const multerHandler = multerUploadSomeDocument.single('document');
    multerHandler(req, res, controller);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'internal server error' });
  }
};
