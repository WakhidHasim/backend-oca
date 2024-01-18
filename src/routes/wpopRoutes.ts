import express from 'express';

import * as wpopController from '../controllers/wpopController';

const router = express.Router();

router.get('/', wpopController.wpopList);

export default router;
