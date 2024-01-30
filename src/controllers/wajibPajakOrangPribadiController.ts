import { Request, Response, NextFunction, Express } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import moment from 'moment-timezone';
import BadRequestError from '../error/BadRequestError';
import { createWajibPajakOrangPribadiSchema } from '../validation/wajibPajakOrangPribadiSchema';
import * as wajibPajakOrangPribadiService from '../services/wajibPajakOrangPribadiService';
import { WajibPajakOrangPribadi } from '../entities/wajibPajakOrangPribadi';

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'fileFotoNpwp') {
      const path = 'public/wpop/npwp';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'fileFotoIdOrangPribadi') {
      const path = 'public/wpop/id';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'fileFotoBuktiRekening') {
      const path = 'public/wpop/rekening';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'fileFotoNpwp') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'fileFotoIdOrangPribadi') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'fileFotoBuktiRekening') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});

function checkFileType(
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, isPdf: boolean) => void
) {
  if (
    file.fieldname === 'fileFotoNpwp' ||
    file.fieldname === 'fileFotoIdOrangPribadi' ||
    file.fieldname === 'fileFotoBuktiRekening'
  ) {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storageFile,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, (error, isPdf) => {
      if (error) {
        return cb(error);
      }
      cb(null, isPdf);
    });
  },
});

const uploadFieldsWPOP = upload.fields([
  { name: 'fileFotoNpwp', maxCount: 1 },
  { name: 'fileFotoIdOrangPribadi', maxCount: 1 },
  { name: 'fileFotoBuktiRekening', maxCount: 1 },
]);

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

export const createWPOP = async (req: Request, res: Response) => {
  uploadFieldsWPOP(req, res, async (err) => {
    handleFileUploadErrors(err, req, res, async () => {
      try {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        const fileFotoNpwp = files['fileFotoNpwp']?.[0];
        const fileFotoIdOrangPribadi = files['fileFotoIdOrangPribadi']?.[0];
        const fileFotoBuktiRekening = files['fileFotoBuktiRekening']?.[0];

        const formattedDate = moment()
          .tz('Asia/Jakarta')
          .format('YYYY-MM-DDTHH:mm:ss');

        const body: WajibPajakOrangPribadi = {
          ...req.body,
          tanggalInput: formattedDate + '+07:00',
          isApproved: true,
          fileFotoNpwp: fileFotoNpwp?.filename,
          fileFotoIdOrangPribadi: fileFotoIdOrangPribadi?.filename,
          fileFotoBuktiRekening: fileFotoBuktiRekening?.filename,
        };

        const validationResult =
          createWajibPajakOrangPribadiSchema.safeParse(body);

        if (validationResult.success) {
          const result = validationResult.data;

          const requestBody: WajibPajakOrangPribadi = {
            ...result,
            tanggalInput: body.tanggalInput,
            isApproved: body.isApproved,
            fileFotoNpwp: body.fileFotoNpwp,
            fileFotoIdOrangPribadi: body.fileFotoIdOrangPribadi,
            fileFotoBuktiRekening: body.fileFotoBuktiRekening,
          };

          const createWPOP = await wajibPajakOrangPribadiService.createWPOP(
            requestBody
          );

          res.json({
            status: {
              code: 200,
              description: 'Ok',
            },
            result: { ...createWPOP, tanggalInput: formattedDate + '+07:00' },
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
          res.status(400).json({
            status: {
              code: 400,
              description: 'Bad Request',
            },
            result: error.message,
          });
          return;
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
  });
};

export const wpopList = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    const { results, pagination } =
      await wajibPajakOrangPribadiService.getWPOPList(
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
  } catch (error: any) {
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: 'internal server error',
    });
  }
};

export const getWPOPyId = async (req: Request, res: Response) => {
  try {
    const { kodeWajibPajakOrangPribadi } = req.params;
    const wpop = await wajibPajakOrangPribadiService.getWPOPById(
      kodeWajibPajakOrangPribadi
    );

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wpop,
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
