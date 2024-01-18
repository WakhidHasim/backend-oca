import express from 'express';

import * as wajibPajakBadanUsahaController from '../controllers/wajibPajakBadanUsahaController';

const router = express.Router();

router.post('/', wajibPajakBadanUsahaController.createWPBU);

router.get('/', wajibPajakBadanUsahaController.wpbuList);

router.get('/:kodeWPBadan', wajibPajakBadanUsahaController.getWPBUyId);

router.put('/:kodeWPBadan', wajibPajakBadanUsahaController.updateWPBU);

router.delete('/:kodeWPBadan', wajibPajakBadanUsahaController.deleteWPBU);

export default router;
