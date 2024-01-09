import express from 'express';

import * as objekPajakController from '../controllers/objekPajakController';

const router = express.Router();

router.get('/pph21', objekPajakController.objekPajakPPh21List);
router.get('/pph23', objekPajakController.objekPajakPPh23List);
router.get('/pph4-ayat-2', objekPajakController.objekPajakPPh4Ayat2List);

export default router;
