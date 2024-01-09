import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authenticateJwtMiddleware } from './middleware/authMiddleware';
import { validationErrorHandler } from './middleware/errorMiddleware';

import agentRoutes from './routes/agentRoutes';
import bankRoutes from './routes/bankRoutes';
import negaraRoutes from './routes/negaraRoutes';
import objekPajakRoutes from './routes/objekPajakRoutes';
import pengajuanAnggaranRoutes from './routes/pengajuanAnggaranRoutes';
import jenisPenghasilanRoutes from './routes/jenisPenghasilanRoutes';
import wajibPajakBadanUsahaRoutes from './routes/wajibPajakBadanUsahaRoutes';
import wajibPajakOrangPribadiRoutes from './routes/wajibPajakOrangPribadiRoutes';
import kegiatanPenghasilanBadanRoutes from './routes/kegaiatanPenghasilanBadanRoutes';
import kegiatanPenghasilanOPRoutes from './routes/kegiatanPenghasilanOrangPribadiRoutes';
import uploadRoutes from './routes/uploadRoute';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(validationErrorHandler);

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/api/agent/login', agentRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/negara', negaraRoutes);
app.use('/api/jenis-penghasilan', jenisPenghasilanRoutes);
app.use('/api/objek-pajak', objekPajakRoutes);
app.use('/api/pengajuan-anggaran', pengajuanAnggaranRoutes);
app.use('/api/kegiatan-penghasilan-badan', kegiatanPenghasilanBadanRoutes);
app.use('/api/kegiatan-penghasilan-orang-pribadi', kegiatanPenghasilanOPRoutes);
app.use('/api/pph21', kegiatanPenghasilanOPRoutes);
app.use('/api/wajib-pajak-badan-usaha', wajibPajakBadanUsahaRoutes);
app.use('/api/wajib-pajak-orang-pribadi', wajibPajakOrangPribadiRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
