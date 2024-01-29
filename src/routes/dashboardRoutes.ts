import express from 'express';

import * as dashboardController from '../controllers/dashboardController';

const router = express.Router();

router.get('/pph21-entry', dashboardController.countPph21Entry);
router.get('/pph21-verif', dashboardController.countPph21Verifikasi);
router.get('/pph21-setor', dashboardController.countPph21Setor);
router.get('/pph23-entry', dashboardController.countPph23Entry);
router.get('/pph23-verif', dashboardController.countPph23Verifikasi);
router.get('/pph23-setor', dashboardController.countPph23Setor);
router.get('/pph4-entry', dashboardController.countPph4Entry);
router.get('/pph4-verif', dashboardController.countPph4Verifikasi);
router.get('/pph4-setor', dashboardController.countPph4Setor);

export default router;
