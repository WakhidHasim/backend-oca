import express from 'express';

import * as bankController from '../controllers/bankController';

const router = express.Router();

router.get('/', bankController.getBankList);

export default router;
