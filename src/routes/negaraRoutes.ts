import express from 'express';

import * as negaraController from '../controllers/negaraController';

const router = express.Router();

router.get('/', negaraController.getNegaraList);

export default router;
