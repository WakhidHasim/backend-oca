import { Request, Response, NextFunction, Express } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import BadRequestError from '../error/BadRequestError';

import * as wajibPajakOrangPribadiService from '../services/wajibPajakOrangPribadiService';

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
  try {
    uploadFieldsWPOP(req, res, async (err) => {
      handleFileUploadErrors(err, req, res, async () => {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        const fileFotoNpwp = files['fileFotoNpwp']?.[0];
        const fileFotoIdOrangPribadi = files['fileFotoIdOrangPribadi']?.[0];
        const fileFotoBuktiRekening = files['fileFotoBuktiRekening']?.[0];

        const createWPOP = await wajibPajakOrangPribadiService.createWPOP({
          ...req.body,
          fileFotoNpwp: fileFotoNpwp?.filename,
          fileFotoIdOrangPribadi: fileFotoIdOrangPribadi?.filename,
          fileFotoBuktiRekening: fileFotoBuktiRekening?.filename,
        });

        res.json({
          status: {
            code: 200,
            description: 'Ok',
          },
          result: createWPOP,
        });
      });
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

export const wpopList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const wpop = await wajibPajakOrangPribadiService.getWPOPList(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wpop,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      status: {
        code: 500,
        description: 'Internal Server Error',
      },
      result: null,
    });
  }
};
