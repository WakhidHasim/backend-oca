import { Request, Response, NextFunction, Express } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import moment from 'moment-timezone';
import BadRequestError from '../error/BadRequestError';
import {
  createWajibPajakBadanUsahaSchema,
  createWajibPajakBadanUsahaInput,
} from '../validation/wajibPajakBadanUsahaSchema';
import * as wajibPajakBadanUsahaService from '../services/wajibPajakBadanUsahaService';
import { WajibPajakBadanUsaha } from '../entities/wajibPajakBadanUsaha';

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'fileFotoIdentitasBadan') {
      const path = 'public/wpbu/identitas';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'fileFotoBuktiRekening') {
      const path = 'public/wpbu/rekening';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'fileFotoNpwp') {
      const path = 'public/wpbu/npwp';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'fileSuratBebasPPh23') {
      const path = 'public/wpbu/bebas';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'fileFotoIdentitasBadan') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'fileFotoBuktiRekening') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'fileFotoNpwp') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'fileSuratBebasPPh23') {
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
    file.fieldname === 'fileFotoIdentitasBadan' ||
    file.fieldname === 'fileFotoBuktiRekening' ||
    file.fieldname === 'fileFotoNpwp' ||
    file.fieldname === 'fileSuratBebasPPh23'
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

const uploadFieldsWPBU = upload.fields([
  { name: 'fileFotoIdentitasBadan', maxCount: 1 },
  { name: 'fileFotoBuktiRekening', maxCount: 1 },
  { name: 'fileFotoNpwp', maxCount: 1 },
  { name: 'fileSuratBebasPPh23', maxCount: 1 },
]);

const handleFileUploadErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    // Kesalahan Multer terjadi saat mengunggah
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

export const createWPBU = async (
  req: Request<{}, {}, createWajibPajakBadanUsahaInput>,
  res: Response
) => {
  uploadFieldsWPBU(req, res, async (err) => {
    handleFileUploadErrors(err, req, res, async () => {
      try {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        const fileFotoIdentitasBadan = files['fileFotoIdentitasBadan']?.[0];
        const fileFotoBuktiRekening = files['fileFotoBuktiRekening']?.[0];
        const fileFotoNpwp = files['fileFotoNpwp']?.[0];
        const fileSuratBebasPPh23 = files['fileSuratBebasPPh23']?.[0];

        const formattedDate = moment()
          .tz('Asia/Jakarta')
          .format('YYYY-MM-DDTHH:mm:ss');

        const body: WajibPajakBadanUsaha = {
          ...req.body,
          tanggalInput: formattedDate + '+07:00',
          fileFotoIdentitasBadan: fileFotoIdentitasBadan?.filename,
          fileFotoBuktiRekening: fileFotoBuktiRekening?.filename,
          fileFotoNpwp: fileFotoNpwp?.filename,
          fileSuratBebasPPh23: fileSuratBebasPPh23?.filename,
        };

        const validationResult =
          createWajibPajakBadanUsahaSchema.safeParse(body);

        if (validationResult.success) {
          const result = validationResult.data;

          const requestBody: WajibPajakBadanUsaha = {
            ...result,
            tanggalInput: body.tanggalInput,
            fileFotoIdentitasBadan: body.fileFotoIdentitasBadan,
            fileFotoBuktiRekening: body.fileFotoBuktiRekening,
            fileFotoNpwp: body.fileFotoNpwp,
            fileSuratBebasPPh23: body.fileSuratBebasPPh23,
          };

          const createWPBU = await wajibPajakBadanUsahaService.createWPBU(
            requestBody
          );

          res.json({
            status: {
              code: 200,
              description: 'Ok',
            },
            result: { ...createWPBU, tanggalInput: formattedDate + '+07:00' },
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

export const wpbuList = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const wpbuList = await wajibPajakBadanUsahaService.getAllWPBU(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wpbuList,
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

export const getWPBUyId = async (req: Request, res: Response) => {
  try {
    const { kodeWPBadan } = req.params;
    const wpbu = await wajibPajakBadanUsahaService.getWPBUById(kodeWPBadan);

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: wpbu,
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

export const updateWPBU = async (req: Request, res: Response) => {
  try {
    const { kodeWPBadan } = req.params;

    const wpbu = await wajibPajakBadanUsahaService.getWPBUById(kodeWPBadan);

    if (!wpbu || !wpbu.fileFotoIdentitasBadan) {
      return res.status(404).json({
        status: {
          code: 404,
          description: 'Not Found',
        },
        result: 'Pph23 not found',
      });
    }

    uploadFieldsWPBU(req, res, async (err: any) => {
      if (err) {
        throw new Error('File upload error: ' + err.message);
      }

      const body = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      let fileFotoIdentitasBadan = wpbu.fileFotoIdentitasBadan;
      let fileFotoBuktiRekening = wpbu.fileFotoBuktiRekening;
      let fileFotoNpwp = wpbu.fileFotoNpwp;
      let fileSuratBebasPPh23 = wpbu.fileSuratBebasPPh23;

      if (files['fileFotoIdentitasBadan']?.[0]?.filename) {
        fileFotoIdentitasBadan = files['fileFotoIdentitasBadan'][0].filename;

        // const filePath = path.join(
        //   'public/wpbu/identitas',
        //   wpbu.fileFotoIdentitasBadan
        // );
        // fs.unlinkSync(filePath);
      }

      if (files['fileFotoBuktiRekening']?.[0]?.filename) {
        fileFotoBuktiRekening = files['fileFotoBuktiRekening']?.[0]?.filename;

        // const filePath = path.join(
        //   'public/wpbu/rekening',
        //   wpbu.fileFotoBuktiRekening
        // );
        // fs.unlinkSync(filePath);
      }

      if (files['fileFotoNpwp']?.[0]?.filename) {
        fileFotoNpwp = files['fileFotoNpwp']?.[0]?.filename;

        // const filePath = path.join('public/wpbu/npwp', wpbu.fileFotoNpwp);
        // fs.unlinkSync(filePath);
      }

      if (files['fileSuratBebasPPh23']?.[0]?.filename) {
        fileSuratBebasPPh23 = files['fileSuratBebasPPh23']?.[0]?.filename;

        // const filePath = path.join(
        //   'public/wpbu/bebas',
        //   wpbu.fileSuratBebasPPh23
        // );
        // fs.unlinkSync(filePath);
      }

      const updatedKegiatanOP = await wajibPajakBadanUsahaService.updateWPBU(
        kodeWPBadan,
        body,
        fileFotoIdentitasBadan,
        fileFotoBuktiRekening,
        fileFotoNpwp,
        fileSuratBebasPPh23
      );

      res.json({
        status: {
          code: 200,
          description: 'OK',
        },
        result: updatedKegiatanOP,
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

export const deleteWPBU = async (req: Request, res: Response) => {
  try {
    const { kodeWPBadan } = req.params;

    const wpbu = await wajibPajakBadanUsahaService.getWPBUById(kodeWPBadan);

    await wajibPajakBadanUsahaService.deleteWPBU(kodeWPBadan);

    if (wpbu && wpbu.fileFotoIdentitasBadan) {
      const filePath = path.join(
        'public/wpbu/identitas',
        wpbu.fileFotoIdentitasBadan
      );
      fs.unlinkSync(filePath);
    }

    if (wpbu && wpbu.fileFotoBuktiRekening) {
      const filePath = path.join(
        'public/wpbu/rekening',
        wpbu.fileFotoBuktiRekening
      );
      fs.unlinkSync(filePath);
    }

    if (wpbu && wpbu.fileFotoNpwp) {
      const filePath = path.join('public/wpbu/npwp', wpbu.fileFotoNpwp);
      fs.unlinkSync(filePath);
    }

    if (wpbu && wpbu.fileSuratBebasPPh23) {
      const filePath = path.join('public/wpbu/bebas', wpbu.fileSuratBebasPPh23);
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
