import express from 'express';

import * as jenisPenghasilanController from '../controllers/jenisPenghasilanController';

const router = express.Router();

router.get('/', jenisPenghasilanController.jenisPenghasilanListPPh23);

export default router;
