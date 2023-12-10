import express from 'express';

import * as pengajuanAnggaranController from '../controllers/pengajuanAnggaranController';

const router = express.Router();

router.get('/', pengajuanAnggaranController.pengajuanAnggaranList);

export default router;
