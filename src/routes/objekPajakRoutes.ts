import express from 'express';

import * as objekPajakController from '../controllers/objekPajakController';

const router = express.Router();

router.get('/', objekPajakController.objekPajakPPh23List);

export default router;
