import { Request, Response } from 'express';
import multer from 'multer';
import HttpError from '../error/HttpError';
import * as pph23Service from '../services/agent/pph23Service';

const uploadFiles = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// export const createPPh23 = async (req: Request, res: Response) => {
//   try {
//     const controller = async () => {
//       const { invoice, fakturPajak, dokumenKerjasamaKegiatan } =
//         req.files || {};

//       if (!invoice || !fakturPajak || !dokumenKerjasamaKegiatan) {
//         return res.status(400).json({
//           message:
//             'All files (invoice, fakturPajak, dokumenKerjasamaKegiatan) are required',
//         });
//       }

//       const invoiceBase64 = invoice[0].buffer.toString('base64');
//       const fakturPajakBase64 = fakturPajak[0].buffer.toString('base64');
//       const dokumenKerjasamaBase64 =
//         dokumenKerjasamaKegiatan[0].buffer.toString('base64');

//       const createPPh23 = await pph23Service.createPPh23({
//         ...req.body,
//         invoice: invoiceBase64,
//         fakturPajak: fakturPajakBase64,
//         dokumenKerjasamaKegiatan: dokumenKerjasamaBase64,
//       });

//       res.json({
//         status: {
//           code: 200,
//           description: 'Ok',
//         },
//         result: createPPh23,
//       });
//     };

//     const multerHandler = uploadFiles.fields([
//       { name: 'invoice', maxCount: 1 },
//       { name: 'fakturPajak', maxCount: 1 },
//       { name: 'dokumenKerjasamaKegiatan', maxCount: 1 },
//     ]);
//     multerHandler(req, res, controller);
//   } catch (error) {
//     console.error(error);

//     if (error instanceof HttpError) {
//       return res.status(error.statusCode).json({
//         status: {
//           code: error.statusCode,
//           description: error.message,
//         },
//         result: null,
//       });
//     }

//     const e = error as Error;
//     console.error(e);
//     res.status(500).json({
//       status: {
//         code: 500,
//         description: e.message,
//       },
//       result: null,
//     });
//   }
// };
