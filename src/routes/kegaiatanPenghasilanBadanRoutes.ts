import express from 'express';

import {
  createPPh23,
  getAllPph23,
  getPPh23ById,
  updatePPh23,
  deletePPh23,
  createPPh4Ayat2,
  getAllPPh4Ayat2,
  getPPh4Ayat2ById,
  updatePPh4Ayat2,
  deletePPh4Ayat2,
} from '../controllers/kegiatanPenghasilanBadanController';

const router = express.Router();

router.post('/pph23', createPPh23);

router.get('/pph23', getAllPph23);

router.get('/pph23/:kodeKegiatanBadan', getPPh23ById);

router.put('/pph23/:kodeKegiatanBadan', updatePPh23);

router.delete('/pph23/:kodeKegiatanBadan', deletePPh23);

router.post('/pph4', createPPh4Ayat2);

router.get('/pph4', getAllPPh4Ayat2);

router.get('/pph4/:kodeKegiatanBadan', getPPh4Ayat2ById);

router.put('/pph4/:kodeKegiatanBadan', updatePPh4Ayat2);

router.delete('/pph4/:kodeKegiatanBadan', deletePPh4Ayat2);

export default router;
