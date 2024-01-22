import express from 'express';

import * as dashboardController from '../controllers/dashboardController';

const router = express.Router();

router.get('/pph23-entry', dashboardController.countPph23Entry);
router.get('/pph23-verif', dashboardController.countPph23Verifikasi);
router.get('/pph23-setor', dashboardController.countPph23Setor);

export default router;
