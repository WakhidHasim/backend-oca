import { Request, Response, NextFunction, Express } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import moment from 'moment-timezone';
import BadRequestError from '../error/BadRequestError';

import * as inventarisasiPajakService from '../services/inventarisasiPajakService';
import { createInventarisasiPajakSchema } from '../validation/inventarisasiPajakSchema';
import { InventarisasiPajak } from '../entities/inventarisasiPajak';

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

const handleFileUploadErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer Error:', err.message);
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'File upload error: ' + err.message,
    });
  } else if (err) {
    console.error('Unknown Error:', err.message);
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'Unknown error occurred during file upload.',
    });
  } else {
    next();
  }
};

export const createInventarisasiPajak = async (req: Request, res: Response) => {
  const fileBukti = uploadFileBukti.single('fileBukti');
  fileBukti(req, res, async (err: any) => {
    try {
      if (err) {
        return handleFileUploadErrors(err, req, res, () => {});
      }

      if (!req.file) {
        return res.status(400).json({ message: 'File required' });
      }

      const file = req.file;

      const inputDate = moment()
        .tz('Asia/Jakarta')
        .format();

      const body: InventarisasiPajak = {
        ...req.body,
        tanggalInput: inputDate,
        nominalDPP: Number(req.body?.nominalDPP),
        nominalPajak: Number(req.body?.nominalPajak),
        fileBukti: file.filename,
      };

      const validationResult = createInventarisasiPajakSchema.safeParse(body);

      if (validationResult.success) {
        const result = validationResult.data;

        const requestBody: InventarisasiPajak = {
          ...result,
          tanggalInput: body.tanggalInput,
          nominalDPP: body.nominalDPP,
          nominalPajak: body.nominalPajak,
          fileBukti: body.fileBukti,
        };

        const inventarisasiPajak =
          await inventarisasiPajakService.createInventarisasiPajak(requestBody);

        res.json({
          status: {
            code: 200,
            description: 'Ok',
          },
          result: {
            ...inventarisasiPajak,
            tanggalInput: inputDate,
          },
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
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        return res.status(400).json({
          status: {
            code: 400,
            description: 'Bad Request',
          },
          result: error.message,
        });
      } else {
        console.log('error message:', error.message);
        res.status(500).json({
          status: {
            code: 500,
            description: 'Internal Server Error',
          },
          result: 'Internal Server Error',
        });
      }
    }
  });
};

export const getAllInventarisasiPajak = async (req: Request, res: Response) => {
  try {
    const { idl, page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    const { results, pagination } =
      await inventarisasiPajakService.getAllInventarisasiPajak(
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
