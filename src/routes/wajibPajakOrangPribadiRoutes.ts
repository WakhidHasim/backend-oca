import express from 'express';

import * as wajibPajakOrangPribadiController from '../controllers/wajibPajakOrangPribadiController';

const router = express.Router();

router.post('/', wajibPajakOrangPribadiController.createWajibPajakOrangPribadi);

export default router;
