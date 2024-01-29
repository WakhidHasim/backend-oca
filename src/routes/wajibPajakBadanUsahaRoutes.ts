import express from 'express';

import * as wajibPajakBadanUsahaController from '../controllers/wajibPajakBadanUsahaController';

const router = express.Router();

router.post('/', wajibPajakBadanUsahaController.createWPBU);

router.get('/', wajibPajakBadanUsahaController.wpbuList);

router.get(
  '/:kodeWajibPajakBadanUsaha',
  wajibPajakBadanUsahaController.getWPBUyId
);

router.put(
  '/:kodeWajibPajakBadanUsaha',
  wajibPajakBadanUsahaController.updateWPBU
);

router.delete(
  '/:kodeWajibPajakBadanUsaha',
  wajibPajakBadanUsahaController.deleteWPBU
);

export default router;
