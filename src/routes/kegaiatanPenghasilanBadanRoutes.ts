import express from 'express';

import * as kegiatanBadanUsahaController from '../controllers/kegiatanPenghasilanBadanController';

const router = express.Router();

router.post('/pph23', kegiatanBadanUsahaController.createPPh23);

router.get('/pph23', kegiatanBadanUsahaController.getAllPph23);

router.get(
  '/pph23/:kodeKegiatanBadan',
  kegiatanBadanUsahaController.getPPh23ById
);

router.put(
  '/pph23/:kodeKegiatanBadan',
  kegiatanBadanUsahaController.updatePPh23
);

router.delete(
  '/pph23/:kodeKegiatanBadan',
  kegiatanBadanUsahaController.deletePPh23
);

router.post('/pph4', kegiatanBadanUsahaController.createPPh4Ayat2);

router.get('/pph4', kegiatanBadanUsahaController.getAllPPh4Ayat2);

router.get(
  '/pph4/:kodeKegiatanBadan',
  kegiatanBadanUsahaController.getPPh4Ayat2ById
);

router.delete(
  '/pph4/:kodeKegiatanBadan',
  kegiatanBadanUsahaController.deletePPh4Ayat2
);

export default router;
