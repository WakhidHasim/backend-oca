import express from 'express';

import * as jenisPenghasilanController from '../controllers/jenisPenghasilanController';

const router = express.Router();

router.get('/pph21', jenisPenghasilanController.jenisPenghasilanListPPh21);
router.get('/pph23', jenisPenghasilanController.jenisPenghasilanListPPh23);
router.get(
  '/pph4-ayat-2',
  jenisPenghasilanController.jenisPenghasilanListPPh4Ayat2
);

export default router;
