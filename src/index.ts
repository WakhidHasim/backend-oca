import express from 'express';

import { authenticateJwtMiddleware } from './middleware/authMiddleware';
import { validationErrorHandler } from './middleware/errorMiddleware';

import agentRoutes from './routes/agentRoutes';
import bankRoutes from './routes/bankRoutes';
import negaraRoutes from './routes/negaraRoutes';
import objekPajakRoutes from './routes/objekPajakRoutes';
import pengajuanAnggaranRoutes from './routes/pengajuanAnggaranRoutes';
import wajibPajakBadanUsahaRoutes from './routes/wajibPajakBadanUsahaRoutes';
import wajibPajakOrangPribadiRoutes from './routes/wajibPajakOrangPribadiRoutes';
import kegiatanPenghasilanBadanRoutes from './routes/kegaiatanPenghasilanBadanRoutes';
import uploadRoutes from './routes/uploadRoute';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(validationErrorHandler);

app.use('/api/agent/login', agentRoutes);
app.use('/api/bank', authenticateJwtMiddleware, bankRoutes);
app.use('/api/negara', authenticateJwtMiddleware, negaraRoutes);
app.use('/api/objek-pajak-pph23', authenticateJwtMiddleware, objekPajakRoutes);
app.use(
  '/api/pengajuan-anggaran',
  authenticateJwtMiddleware,
  pengajuanAnggaranRoutes
);
app.use(
  '/api/kegiatan-penghasilan-badan',
  authenticateJwtMiddleware,
  kegiatanPenghasilanBadanRoutes
);
app.use(
  '/api/wajib-pajak-badan-usaha',
  authenticateJwtMiddleware,
  wajibPajakBadanUsahaRoutes
);
app.use('/api/wajib-pajak-orang-pribadi', wajibPajakOrangPribadiRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
