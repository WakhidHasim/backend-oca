import { Request, Response, NextFunction, Express } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import moment from 'moment-timezone';
import BadRequestError from '../error/BadRequestError';

import * as kegiatanPenghasilanBadanService from '../services/kegiatanPenghasilanBadanService';
import {
  createKegiatanBadanUsahaSchema,
  CreateKegiatanBadanUsahaInput,
} from '../validation/kegiatanBadanUsahaSchema';
import { KegiatanPenghasilanBadan } from '../entities/kegiatanPenghasilanBadan';

type updateKegiatanPenghasilanBadan = Omit<
  KegiatanPenghasilanBadan,
  'kodeKegiatanBadan' | 'tanggalInput' | 'kodeJenisPajak' | 'status'
>;

const storageFilePPh23 = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'invoice') {
      const path = 'public/kegiatan_penghasilan_badan/pph23/invoice';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'fakturPajak') {
      const path = 'public/kegiatan_penghasilan_badan/pph23/faktur_pajak';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'dokumenKerjasamaKegiatan') {
      const path =
        'public/kegiatan_penghasilan_badan/pph23/dokumen_kerjasama_kegiatan';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'invoice') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'fakturPajak') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'dokumenKerjasamaKegiatan') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});

const storageFilePPh4 = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'invoice') {
      const path = 'public/kegiatan_penghasilan_badan/pph4_ayat_2/invoice';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'fakturPajak') {
      const path = 'public/kegiatan_penghasilan_badan/pph4_ayat_2/faktur_pajak';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    } else if (file.fieldname === 'dokumenKerjasamaKegiatan') {
      const path =
        'public/kegiatan_penghasilan_badan/pph4_ayat_2/dokumen_kerjasama_kegiatan';
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'invoice') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'fakturPajak') {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === 'dokumenKerjasamaKegiatan') {
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
    file.fieldname === 'invoice' ||
    file.fieldname === 'fakturPajak' ||
    file.fieldname === 'dokumenKerjasamaKegiatan'
  ) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
}

const uploadPPh23 = multer({
  storage: storageFilePPh23,
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

const uploadPPh4 = multer({
  storage: storageFilePPh4,
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

const uploadFieldsPPh23 = uploadPPh23.fields([
  { name: 'invoice', maxCount: 1 },
  { name: 'fakturPajak', maxCount: 1 },
  { name: 'dokumenKerjasamaKegiatan', maxCount: 1 },
]);

const uploadFieldsPPh4 = uploadPPh4.fields([
  { name: 'invoice', maxCount: 1 },
  { name: 'fakturPajak', maxCount: 1 },
  { name: 'dokumenKerjasamaKegiatan', maxCount: 1 },
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

export const createPPh23 = async (
  req: Request<{}, {}, CreateKegiatanBadanUsahaInput>,
  res: Response
) => {
  uploadFieldsPPh23(req, res, async (err) => {
    handleFileUploadErrors(err, req, res, async () => {});
    try {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const invoiceFile = files['invoice']?.[0];
      const fakturPajakFile = files['fakturPajak']?.[0];
      const dokumenKerjasamaKegiatanFile =
        files['dokumenKerjasamaKegiatan']?.[0];

      const formattedDate = moment()
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ss');

      const body: KegiatanPenghasilanBadan = {
        ...req.body,
        tanggalInput: formattedDate + '+07:00',
        kodeJenisPajak: 2,
        status: 'Entry',
        kodeJenisPenghasilan: Number(req.body?.kodeJenisPenghasilan),
        penghasilanBruto: Number(req.body?.penghasilanBruto),
        invoice: invoiceFile?.filename,
        fakturPajak: fakturPajakFile?.filename,
        dokumenKerjasamaKegiatan: dokumenKerjasamaKegiatanFile?.filename,
      };
      const validationResult = createKegiatanBadanUsahaSchema.safeParse(body);

      if (validationResult.success) {
        const result = validationResult.data;

        const requestBody: KegiatanPenghasilanBadan = {
          ...result,
          tanggalInput: body.tanggalInput,
          kodeJenisPajak: body.kodeJenisPajak,
          status: body.status,
          invoice: body.invoice,
          fakturPajak: body.fakturPajak,
          dokumenKerjasamaKegiatan: body.dokumenKerjasamaKegiatan,
        };

        const createPPh23 = await kegiatanPenghasilanBadanService.createPPh23(
          requestBody
        );

        res.json({
          status: {
            code: 200,
            description: 'Ok',
          },
          result: { ...createPPh23, tanggalInput: formattedDate + '+07:00' },
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
};

export const getAllPph23 = async (req: Request, res: Response) => {
  try {
    const { idl, page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    const { results, pagination } =
      await kegiatanPenghasilanBadanService.getAllPPh23(
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
      console.log(error.message);
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};

export const getPPh23ById = async (req: Request, res: Response) => {
  try {
    const { kodeKegiatanBadan } = req.params;
    const getPPh23ById = await kegiatanPenghasilanBadanService.getPPh23ById(
      kodeKegiatanBadan
    );

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: getPPh23ById,
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
    } else {
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};

export const updatePPh23 = async (req: Request, res: Response) => {
  const { kodeKegiatanBadan } = req.params;

  const getPPh23ById = await kegiatanPenghasilanBadanService.getPPh23ById(
    kodeKegiatanBadan
  );

  if (!getPPh23ById || !getPPh23ById.invoice) {
    return res.status(404).json({
      status: {
        code: 404,
        description: 'Not Found',
      },
      result: 'Pph23 not found',
    });
  }

  await uploadFieldsPPh23(req, res, async (err: any) => {
    handleFileUploadErrors(err, req, res, async () => {});
    try {
      const body = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      let invoiceFileName = getPPh23ById.invoice;
      let fakturPajakFileName = getPPh23ById.fakturPajak;
      let dokumenKerjasamaKegiatanFileName =
        getPPh23ById.dokumenKerjasamaKegiatan;

      if (files['invoice']?.[0]?.filename) {
        invoiceFileName = files['invoice'][0].filename;

        const filePath = path.join(
          'public/kegiatan_penghasilan_badan/pph23/invoice',
          getPPh23ById.invoice
        );
        fs.unlinkSync(filePath);
      }

      if (files['fakturPajak']?.[0]?.filename) {
        fakturPajakFileName = files['fakturPajak']?.[0]?.filename;

        const filePath = path.join(
          'public/kegiatan_penghasilan_badan/pph23/faktur_pajak',
          getPPh23ById.fakturPajak
        );
        fs.unlinkSync(filePath);
      }

      if (files['dokumenKerjasamaKegiatan']?.[0]?.filename) {
        dokumenKerjasamaKegiatanFileName =
          files['dokumenKerjasamaKegiatan']?.[0]?.filename;

        const filePath = path.join(
          'public/kegiatan_penghasilan_badan/pph23/dokumen_kerjasama_kegiatan',
          getPPh23ById.dokumenKerjasamaKegiatan
        );
        fs.unlinkSync(filePath);
      }

      const updatedKegiatanOP =
        await kegiatanPenghasilanBadanService.updatePPh23(
          kodeKegiatanBadan,
          body,
          parseInt(body?.kodeJenisPenghasilan),
          parseInt(body?.penghasilanBruto),
          invoiceFileName,
          fakturPajakFileName,
          dokumenKerjasamaKegiatanFileName
        );

      res.json({
        status: {
          code: 200,
          description: 'OK',
        },
        result: updatedKegiatanOP,
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
      } else {
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

export const deletePPh23 = async (req: Request, res: Response) => {
  try {
    const { kodeKegiatanBadan } = req.params;

    const getPPh23ById = await kegiatanPenghasilanBadanService.getPPh23ById(
      kodeKegiatanBadan
    );

    await kegiatanPenghasilanBadanService.deletePPh23(kodeKegiatanBadan);

    if (getPPh23ById && getPPh23ById.invoice) {
      const filePath = path.join(
        'public/kegiatan_penghasilan_badan/pph23/invoice',
        getPPh23ById.invoice
      );
      fs.unlinkSync(filePath);
    }

    if (getPPh23ById && getPPh23ById.fakturPajak) {
      const filePath = path.join(
        'public/kegiatan_penghasilan_badan/pph23/faktur_pajak',
        getPPh23ById.fakturPajak
      );
      fs.unlinkSync(filePath);
    }

    if (getPPh23ById && getPPh23ById.dokumenKerjasamaKegiatan) {
      const filePath = path.join(
        'public/kegiatan_penghasilan_badan/pph23/dokumen_kerjasama_kegiatan',
        getPPh23ById.dokumenKerjasamaKegiatan
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
    } else {
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};

// PPh 4 ayat 2
export const createPPh4Ayat2 = async (req: Request, res: Response) => {
  uploadFieldsPPh4(req, res, async (err) => {
    handleFileUploadErrors(err, req, res, async () => {});
    try {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const invoiceFile = files['invoice']?.[0];
      const fakturPajakFile = files['fakturPajak']?.[0];
      const dokumenKerjasamaKegiatanFile =
        files['dokumenKerjasamaKegiatan']?.[0];

      const formattedDate = moment()
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DDTHH:mm:ss');

      const body: KegiatanPenghasilanBadan = {
        ...req.body,
        tanggalInput: formattedDate + '+07:00',
        kodeJenisPajak: 3,
        status: 'Entry',
        kodeJenisPenghasilan: Number(req.body?.kodeJenisPenghasilan),
        penghasilanBruto: Number(req.body?.penghasilanBruto),
        invoice: invoiceFile?.filename,
        fakturPajak: fakturPajakFile?.filename,
        dokumenKerjasamaKegiatan: dokumenKerjasamaKegiatanFile?.filename,
      };
      const validationResult = createKegiatanBadanUsahaSchema.safeParse(body);

      if (validationResult.success) {
        const result = validationResult.data;

        const requestBody: KegiatanPenghasilanBadan = {
          ...result,
          tanggalInput: body.tanggalInput,
          kodeJenisPajak: body.kodeJenisPajak,
          status: body.status,
          invoice: body.invoice,
          fakturPajak: body.fakturPajak,
          dokumenKerjasamaKegiatan: body.dokumenKerjasamaKegiatan,
        };

        const craetePPh4 =
          await kegiatanPenghasilanBadanService.createPPh4Ayat2(requestBody);

        res.json({
          status: {
            code: 200,
            description: 'Ok',
          },
          result: { ...craetePPh4, tanggalInput: formattedDate + '+07:00' },
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
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(400).json({
          status: {
            code: 400,
            description: 'Bad Request',
          },
          result: error.message,
        });
      } else {
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

export const getAllPPh4Ayat2 = async (req: Request, res: Response) => {
  try {
    const { idl, page, limit } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    const { results, pagination } =
      await kegiatanPenghasilanBadanService.getAllPPh4Ayat2(
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
    } else {
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};

export const getPPh4Ayat2ById = async (req: Request, res: Response) => {
  try {
    const { kodeKegiatanBadan } = req.params;
    const getPPh4Ayat2ById =
      await kegiatanPenghasilanBadanService.getPPh4Ayat2ById(kodeKegiatanBadan);

    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: getPPh4Ayat2ById,
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
    } else {
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};

export const updatePPh4Ayat2 = async (req: Request, res: Response) => {
  try {
    const { kodeKegiatanBadan } = req.params;

    const getPPh4Ayat2ById =
      await kegiatanPenghasilanBadanService.getPPh4Ayat2ById(kodeKegiatanBadan);

    if (!getPPh4Ayat2ById || !getPPh4Ayat2ById.invoice) {
      return res.status(404).json({
        status: {
          code: 404,
          description: 'Not Found',
        },
        result: 'Pph23 not found',
      });
    }

    uploadFieldsPPh23(req, res, async (err: any) => {
      if (err) {
        throw new Error('File upload error: ' + err.message);
      }

      const body = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      let invoiceFileName = getPPh4Ayat2ById.invoice;
      let fakturPajakFileName = getPPh4Ayat2ById.fakturPajak;
      let dokumenKerjasamaKegiatanFileName =
        getPPh4Ayat2ById.dokumenKerjasamaKegiatan;

      if (files['invoice']?.[0]?.filename) {
        invoiceFileName = files['invoice'][0].filename;

        const filePath = path.join(
          'public/kegiatan_penghasilan_badan/pph4_ayat_2/invoice',
          getPPh4Ayat2ById.invoice
        );
        fs.unlinkSync(filePath);
      }

      if (files['fakturPajak']?.[0]?.filename) {
        fakturPajakFileName = files['fakturPajak']?.[0]?.filename;

        const filePath = path.join(
          'public/kegiatan_penghasilan_badan/pph4_ayat_2/faktur_pajak',
          getPPh4Ayat2ById.fakturPajak
        );
        fs.unlinkSync(filePath);
      }

      if (files['dokumenKerjasamaKegiatan']?.[0]?.filename) {
        dokumenKerjasamaKegiatanFileName =
          files['dokumenKerjasamaKegiatan']?.[0]?.filename;

        const filePath = path.join(
          'public/kegiatan_penghasilan_badan/pph4_ayat_2/dokumen_kerjasama_kegiatan',
          getPPh4Ayat2ById.dokumenKerjasamaKegiatan
        );
        fs.unlinkSync(filePath);
      }

      const updatedKegiatanOP =
        await kegiatanPenghasilanBadanService.updatePPh4Ayat2(
          kodeKegiatanBadan,
          body,
          parseInt(body?.kodeJenisPenghasilan),
          parseInt(body?.penghasilanBruto),
          invoiceFileName,
          fakturPajakFileName,
          dokumenKerjasamaKegiatanFileName
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
    } else {
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};

export const deletePPh4Ayat2 = async (req: Request, res: Response) => {
  try {
    const { kodeKegiatanBadan } = req.params;

    const getPPh4Ayat2ById =
      await kegiatanPenghasilanBadanService.getPPh4Ayat2ById(kodeKegiatanBadan);

    await kegiatanPenghasilanBadanService.deletePPh4Ayat2(kodeKegiatanBadan);

    if (getPPh4Ayat2ById && getPPh4Ayat2ById.invoice) {
      const filePath = path.join(
        'public/kegiatan_penghasilan_badan/pph4_ayat_2/invoice',
        getPPh4Ayat2ById.invoice
      );
      fs.unlinkSync(filePath);
    }

    if (getPPh4Ayat2ById && getPPh4Ayat2ById.fakturPajak) {
      const filePath = path.join(
        'public/kegiatan_penghasilan_badan/pph4_ayat_2/faktur_pajak',
        getPPh4Ayat2ById.fakturPajak
      );
      fs.unlinkSync(filePath);
    }

    if (getPPh4Ayat2ById && getPPh4Ayat2ById.dokumenKerjasamaKegiatan) {
      const filePath = path.join(
        'public/kegiatan_penghasilan_badan/pph4_ayat_2/dokumen_kerjasama_kegiatan',
        getPPh4Ayat2ById.dokumenKerjasamaKegiatan
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
    } else {
      res.status(500).json({
        status: {
          code: 500,
          description: 'Internal Server Error',
        },
        result: 'Internal Server Error',
      });
    }
  }
};
