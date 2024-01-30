import express from 'express';

import * as wajibPajakOrangPribadiController from '../controllers/wajibPajakOrangPribadiController';

const router = express.Router();

router.post('/', wajibPajakOrangPribadiController.createWPOP);

router.get('/', wajibPajakOrangPribadiController.wpopList);

router.get(
  '/:kodeWajibPajakOrangPribadi',
  wajibPajakOrangPribadiController.getWPOPyId
);

export default router;
