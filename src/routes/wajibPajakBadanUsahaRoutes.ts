import express from 'express';

import * as wajibPajakBadanUsahaController from '../controllers/wajibPajakBadanUsahaController';

const router = express.Router();

router.get('/', wajibPajakBadanUsahaController.wpbuList);

export default router;
