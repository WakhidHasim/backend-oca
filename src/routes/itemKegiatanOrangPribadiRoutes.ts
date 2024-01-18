import express from 'express';

import * as itemKegiatanPenghasilanOrangPribadiController from '../controllers/itemKegiatanOrangPribadiController';

const router = express.Router();

router.post(
  '/',
  itemKegiatanPenghasilanOrangPribadiController.createKegiatanPenghasilanOP
);

router.get('/', itemKegiatanPenghasilanOrangPribadiController.getAllPPh21);

router.delete(
  '/:id',
  itemKegiatanPenghasilanOrangPribadiController.deletePPh21
);

export default router;
