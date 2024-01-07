import express from 'express';

import * as kegiatanPenghasilanOPController from '../controllers/kegiatanPenghasilanOrangPribadiController';

const router = express.Router();

router.post('/', kegiatanPenghasilanOPController.createKegiatanPenghasilanOP);

router.get(
  '/',
  kegiatanPenghasilanOPController.getKegiatanPenghasilanOrangPribadiList
);

router.get(
  '/:kodeKegiatanOP',
  kegiatanPenghasilanOPController.getKegiatanPenghasilanOPById
);

router.put(
  '/:kodeKegiatanOP',
  kegiatanPenghasilanOPController.updateKegiatanPenghasilanOP
);

router.delete(
  '/:kodeKegiatanOP',
  kegiatanPenghasilanOPController.deleteKegiatanPenghasilanOP
);

export default router;
