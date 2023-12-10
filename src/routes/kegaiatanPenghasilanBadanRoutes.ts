import express from 'express';

import * as kegiatanPenghasilanBadanController from '../controllers/kegiatanPenghasilanBadanController';

const router = express.Router();

router.post(
  '/pph23',
  kegiatanPenghasilanBadanController.createKegiatanPenghasilanBadanPPh23
);
router.get(
  '/pph23',
  kegiatanPenghasilanBadanController.getKegiatanPenghasilanBadanPPh23
);
router.put(
  '/pph23/:kodeKegiatanBadan',
  kegiatanPenghasilanBadanController.updateKegiatanPenghasilanPPh23
);

router.delete(
  '/pph23/:kodeKegiatanBadan',
  kegiatanPenghasilanBadanController.deleteKegiatanPenghasilanBadanPPh23
);

export default router;
