import express from 'express';

import * as inventarisasiPajakController from '../controllers/inventarisasiPajakController';

const router = express.Router();

router.post('/', inventarisasiPajakController.createInventarisasiPajak);

router.get('/', inventarisasiPajakController.getAllInventarisasiPajak);

router.get(
  '/:idInventarisasiPajak',
  inventarisasiPajakController.inventarisasiPajakById
);

router.put(
  '/:idInventarisasiPajak',
  inventarisasiPajakController.updateInventarisasiPajak
);

router.delete(
  '/:idInventarisasiPajak',
  inventarisasiPajakController.deleteInventarisasiPajak
);

export default router;
