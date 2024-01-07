import { Request, Response, Express } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import BadRequestError from '../error/BadRequestError';

import * as kegiatanPenghasilanBadanService from '../services/kegiatanPenghasilanBadanService';

const storageFilePPh23 = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'invoice') {
      const path = 'public/kegiatan_penghasilan_badan/pph23/invoice'
      fs.mkdirSync(path, { recursive: true })

      cb(null, path);
    } else if (file.fieldname === 'fakturPajak') {
      const path = 'public/kegiatan_penghasilan_badan/pph23/faktur_pajak'
      fs.mkdirSync(path, { recursive: true })

      cb(null, path);
    } else if (file.fieldname === 'dokumenKerjasamaKegiatan') {
      const path = 'public/kegiatan_penghasilan_badan/pph23/dokumen_kerjasama_kegiatan'
      fs.mkdirSync(path, { recursive: true })

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
      const path = 'public/kegiatan_penghasilan_badan/pph4_ayat_2/invoice'
      fs.mkdirSync(path, { recursive: true })

      cb(null, path);
    } else if (file.fieldname === 'fakturPajak') {
      const path = 'public/kegiatan_penghasilan_badan/pph4_ayat_2/faktur_pajak'
      fs.mkdirSync(path, { recursive: true })

      cb(null, path);
    } else if (file.fieldname === 'dokumenKerjasamaKegiatan') {
      const path = 'public/kegiatan_penghasilan_badan/pph4_ayat_2/dokumen_kerjasama_kegiatan'
      fs.mkdirSync(path, { recursive: true })

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

//
export const createPPh23 = async (req: Request, res: Response) => {
  try {
    uploadFieldsPPh23(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const invoiceFile = files['invoice']?.[0];
      const fakturPajakFile = files['fakturPajak']?.[0];
      const dokumenKerjasamaKegiatanFile =
        files['dokumenKerjasamaKegiatan']?.[0];

      const createPPh23 = await kegiatanPenghasilanBadanService.createPPh23({
        ...req.body,
        kodeJenisPenghasilan: Number(req.body?.kodeJenisPenghasilan),
        penghasilanBruto: Number(req.body?.penghasilanBruto),
        invoice: invoiceFile?.filename,
        fakturPajak: fakturPajakFile?.filename,
        dokumenKerjasamaKegiatan: dokumenKerjasamaKegiatanFile?.filename,
      });

      res.json({
        status: {
          code: 200,
          description: 'Ok',
        },
        result: createPPh23,
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
    }

    console.log(error)

    return res.status(500).json({ message: "internal server error" })
  }
};

export const getAllPph23 = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const getAllPPh23 = await kegiatanPenghasilanBadanService.getAllPPh23(
      queryParameters
    );
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: getAllPPh23,
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
    }

    // send to logger if needed
    console.log(error)

    return res.status(500).json({ message: "internal server error" })
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
    }

    console.log(error)

    return res.status(500).json({ message: "internal server error" })
  }
};

export const updatePPh23 = async (req: Request, res: Response) => {
  try {
    const { kodeKegiatanBadan } = req.params;

    const getPPh23ById = await kegiatanPenghasilanBadanService.getPPh23ById(
      kodeKegiatanBadan
    );

    if (getPPh23ById) {
      const updatedData = req.body;

      let invoiceFile = '';
      let fakturPajakFile = '';
      let dokumenKerjasamaKegiatanFile = '';

      const handleFileUpload = async (fieldName: string, filePath: string) => {
        if (filePath) {
          await uploadFieldsPPh23(req, res, (err: any) => {
            if (err) {
              throw new Error('File upload error: ' + err.message);
            }

            const files = req.files as {
              [fieldname: string]: Express.Multer.File[];
            };
            if (fieldName === 'invoice') {
              invoiceFile = files['invoice']?.[0]?.filename;
            } else if (fieldName === 'fakturPajak') {
              fakturPajakFile = files['fakturPajak']?.[0]?.filename;
            } else if (fieldName === 'dokumenKerjasamaKegiatan') {
              dokumenKerjasamaKegiatanFile =
                files['dokumenKerjasamaKegiatan']?.[0]?.filename;
            }
          });
        }
      };

      if (updatedData.invoice) {
        if (getPPh23ById && getPPh23ById.invoice) {
          const filePath = path.join(
            'public/kegiatan_penghasilan_badan/pph23/invoice',
            getPPh23ById.invoice
          );
          fs.unlinkSync(filePath);
        }
        await handleFileUpload('invoice', updatedData.invoice);
      } else {
        invoiceFile = getPPh23ById.invoice;
      }

      if (updatedData.fakturPajak) {
        if (getPPh23ById && getPPh23ById.fakturPajak) {
          const filePath = path.join(
            'public/kegiatan_penghasilan_badan/pph23/faktur_pajak',
            getPPh23ById.fakturPajak
          );
          fs.unlinkSync(filePath);
        }
        await handleFileUpload('fakturPajak', updatedData.fakturPajak);
      } else {
        fakturPajakFile = getPPh23ById.fakturPajak;
      }

      if (updatedData.dokumenKerjasamaKegiatan) {
        if (getPPh23ById && getPPh23ById.dokumenKerjasamaKegiatan) {
          const filePath = path.join(
            'public/kegiatan_penghasilan_badan/pph23/dokumen_kerjasama_kegiatan',
            getPPh23ById.dokumenKerjasamaKegiatan
          );
          fs.unlinkSync(filePath);
        }
        await handleFileUpload(
          'dokumenKerjasamaKegiatan',
          updatedData.dokumenKerjasamaKegiatan
        );
      } else {
        dokumenKerjasamaKegiatanFile = getPPh23ById.dokumenKerjasamaKegiatan;
      }

      const updatedKegiatanOP =
        await kegiatanPenghasilanBadanService.updatePPh23(
          kodeKegiatanBadan,
          updatedData,
          parseInt(updatedData?.kodeJenisPenghasilan),
          parseInt(updatedData?.penghasilanBruto),
          invoiceFile,
          fakturPajakFile,
          dokumenKerjasamaKegiatanFile
        );

      res.json({
        status: {
          code: 200,
          description: 'OK',
        },
        result: updatedKegiatanOP,
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
    }

    console.log(error)

    return res.status(500).json({ message: "internal server error" })
  }
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
    }

    console.log(error)

    return res.status(500).json({ message: "internal server error" })
  }
};

// PPh 4 ayat 2
export const createPPh4Ayat2 = async (req: Request, res: Response) => {
  try {
    uploadFieldsPPh4(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const invoiceFile = files['invoice']?.[0];
      const fakturPajakFile = files['fakturPajak']?.[0];
      const dokumenKerjasamaKegiatanFile =
        files['dokumenKerjasamaKegiatan']?.[0];

      const createPPh4Ayat2 =
        await kegiatanPenghasilanBadanService.createPPh4Ayat2({
          ...req.body,
          kodeJenisPenghasilan: Number(req.body?.kodeJenisPenghasilan),
          penghasilanBruto: Number(req.body?.penghasilanBruto),
          invoice: invoiceFile?.filename,
          fakturPajak: fakturPajakFile?.filename,
          dokumenKerjasamaKegiatan: dokumenKerjasamaKegiatanFile?.filename,
        });

      res.json({
        status: {
          code: 200,
          description: 'Ok',
        },
        result: createPPh4Ayat2,
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
    }
    console.log(error)

    return res.status(500).json({ message: "internal server error" })
  }
};

export const getAllPPh4Ayat2 = async (req: Request, res: Response) => {
  try {
    const queryParameters = req.query;
    const getAllPPhAyat2 =
      await kegiatanPenghasilanBadanService.getAllPPh4Ayat2(queryParameters);
    res.json({
      status: {
        code: 200,
        description: 'OK',
      },
      result: getAllPPhAyat2,
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
    }

    console.log(error)

    return res.status(500).json({ message: "internal server error" })
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
    }

    console.log(error)

    return res.status(500).json({ message: "internal server error" })
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
    }

    console.log(error)

    return res.status(500).json({ message: "internal server error" })
  }
};
