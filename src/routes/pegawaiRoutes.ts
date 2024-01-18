import express from 'express';

import * as pegawaiController from '../controllers/pegawaiController';

const router = express.Router();

router.get('/', pegawaiController.pegawaiList);

export default router;
