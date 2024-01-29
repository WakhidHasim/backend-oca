import express from 'express';

import * as itemKegiatanPenghasilanOrangPribadiController from '../controllers/itemKegiatanOrangPribadiController';

const router = express.Router();

router.post('/', itemKegiatanPenghasilanOrangPribadiController.createPPh21);

router.get('/', itemKegiatanPenghasilanOrangPribadiController.getAllPPh21);

router.delete(
  '/:KodeItemKegiatanOP',
  itemKegiatanPenghasilanOrangPribadiController.deletePPh21
);

export default router;
