import { Request, Response, NextFunction, Express } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import BadRequestError from '../error/BadRequestError';

import * as inventarisasiPajakService from '../services/inventarisasiPajakService';

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/inventarisasi_pajak/';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploadFileBukti = multer({
  storage: storageFile,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const createInventarisasiPajak = async (req: Request, res: Response) => {
  try {
    const controller = async () => {
      if (!req.file) return res.status(400).json({ message: 'file required' });

      const file = req.file;

      const inventarisasiPajak =
        await inventarisasiPajakService.createInventarisasiPajak({
          ...req.body,
          nominalDPP: Number(req.body?.nominalDPP),
          nominalPajak: Number(req.body?.nominalPajak),
          fileBukti: file.filename,
        });

      res.json({
        status: {
          code: 200,
          description: 'Ok',
        },
        result: inventarisasiPajak,
      });
    };

    const fileBukti = uploadFileBukti.single('fileBukti');

    fileBukti(req, res, controller);
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

    console.log(error);

    return res.status(500).json({ message: 'internal server error' });
  }
};

export const getAllInventarisasiPajak = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;

    const getAllInventarisasiPajak =
      await inventarisasiPajakService.getAllInventarisasiPajak(queryParameters);
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: getAllInventarisasiPajak,
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

export const inventarisasiPajakById = async (req: Request, res: Response) => {
  try {
    const { idInventarisasiPajak } = req.params;
    const inventarisasiPajakById =
      await inventarisasiPajakService.getInventarisasiPajakById(
        idInventarisasiPajak
      );

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: inventarisasiPajakById,
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

    console.log(error);

    return res.status(500).json({ message: 'internal server error' });
  }
};

export const updateInventarisasiPajak = async (req: Request, res: Response) => {
  try {
    const { idInventarisasiPajak } = req.params;

    const getInventarisasiPajakId =
      await inventarisasiPajakService.getInventarisasiPajakById(
        idInventarisasiPajak
      );

    if (!getInventarisasiPajakId) {
      return res.status(404).json({
        status: {
          code: 404,
          description: 'Not Found',
        },
        result: 'InventarisasiPajak not found',
      });
    }

    const controller = async () => {
      if (!req.file) return res.status(400).json({ message: 'file required' });

      const body = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      let FileBuktiName = getInventarisasiPajakId.fileBukti;

      if (files['fileBukti']?.[0]?.filename) {
        FileBuktiName = files['fileBukti'][0].filename;

        const filePath = path.join(
          'public/kegiatan_penghasilan_badan/pph23/invoice',
          getInventarisasiPajakId.invoice
        );
        fs.unlinkSync(filePath);
      }

      const updatedKegiatanOP =
        await inventarisasiPajakService.updateInventarisasiPajak(
          idInventarisasiPajak,
          body,
          parseInt(body?.nominalDPP),
          parseInt(body?.nominalPajak),
          FileBuktiName
        );

      res.json({
        status: {
          code: 200,
          description: 'OK',
        },
        result: updatedKegiatanOP,
      });
    };
    const fileBukti = uploadFileBukti.single('fileBukti');

    fileBukti(req, res, controller);
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

    console.log(error);

    return res.status(500).json({ message: 'internal server error' });
  }
};

export const deleteInventarisasiPajak = async (req: Request, res: Response) => {
  try {
    const { idInventarisasiPajak } = req.params;

    const getInventarisasiPajakById =
      await inventarisasiPajakService.getInventarisasiPajakById(
        idInventarisasiPajak
      );

    await inventarisasiPajakService.deleteInventarisasiPajak(
      idInventarisasiPajak
    );

    if (getInventarisasiPajakById && getInventarisasiPajakById.invoice) {
      const filePath = path.join(
        'public/inventarisasi_pajak',
        getInventarisasiPajakById.fileBukti
      );
      fs.unlinkSync(filePath);
    }

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
      return;
    }

    console.log(error);

    return res.status(500).json({ message: 'internal server error' });
  }
};
