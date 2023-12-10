import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import * as kegiatanPenghasilanBadanService from '../services/kegiatanPenghasilanBadanService';
import HttpError from '../error/HttpError';

const storageFileBuktiPotong = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath =
      'public/kegiatan_penghasilan_badan/pph23/file_bukti_potong';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploadFileBuktiPotong = multer({
  storage: storageFileBuktiPotong,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});
export const createKegiatanPenghasilanBadanPPh23 = async (
  req: Request,
  res: Response
) => {
  try {
    const controller = async () => {
      if (!req.file) return res.status(400).json({ message: "file required" })

      const file = req.file

      const kegaiatanPenghasilanBadanPPh23 =
        await kegiatanPenghasilanBadanService.createKegiatanPenghasilanBadanPPh23({
          ...req.body,
          penghasilan_bruto: Number(req.body?.penghasilan_bruto),
          kode_jenis_penghasilan: Number(req.body?.kode_jenis_penghasilan),
          file_bukti_potong: file.filename
        }
        );

      res.json({
        status: {
          code: 200,
          description:
            'Data Kegiatan Penghasilan Badan PPh23 berhasil ditambahkan !',
        },
        result: kegaiatanPenghasilanBadanPPh23,
      });
    }

    const multerHandler = uploadFileBuktiPotong.single("file_bukti_potong")
    multerHandler(req, res, controller)
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
