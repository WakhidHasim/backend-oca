import express from 'express';

import * as objekPajakController from '../controllers/objekPajakController';

const router = express.Router();

router.get('/', objekPajakController.objekPajakList);

export default router;
