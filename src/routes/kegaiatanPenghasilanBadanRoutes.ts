import express from 'express';

import * as kegiatanPenghasilanBadanController from '../controllers/kegiatanPenghasilanBadanController';

const router = express.Router();

router.post(
  '/pph23',
  kegiatanPenghasilanBadanController.createKegiatanPenghasilanBadanPPh23
);

export default router;
