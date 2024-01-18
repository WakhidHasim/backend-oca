import express from 'express';

import {
  createKegiatanPenghasilanOP,
  getKegiatanPenghasilanOrangPribadiList,
  getKegiatanPenghasilanOPById,
  updateKegiatanPenghasilanOP,
  deleteKegiatanPenghasilanOP,
} from '../controllers/kegiatanPenghasilanOrangPribadiController';

const router = express.Router();

router.post('/', createKegiatanPenghasilanOP);

router.get('/', getKegiatanPenghasilanOrangPribadiList);

router.get('/:kodeKegiatanOP', getKegiatanPenghasilanOPById);

router.put('/:kodeKegiatanOP', updateKegiatanPenghasilanOP);

router.delete('/:kodeKegiatanOP', deleteKegiatanPenghasilanOP);

export default router;
