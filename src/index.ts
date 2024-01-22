import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { authenticateJwtMiddleware } from './middleware/authMiddleware';
import { validationErrorHandler } from './middleware/errorMiddleware';

import dashboardRoutes from './routes/dashboardRoutes';
import agentRoutes from './routes/agentRoutes';
import bankRoutes from './routes/bankRoutes';
import negaraRoutes from './routes/negaraRoutes';
import objekPajakRoutes from './routes/objekPajakRoutes';
import pegawaiRoutes from './routes/pegawaiRoutes';
import wpopRoutes from './routes/wpopRoutes';
import pengajuanAnggaranRoutes from './routes/pengajuanAnggaranRoutes';
import jenisPenghasilanRoutes from './routes/jenisPenghasilanRoutes';
import wajibPajakBadanUsahaRoutes from './routes/wajibPajakBadanUsahaRoutes';
import wajibPajakOrangPribadiRoutes from './routes/wajibPajakOrangPribadiRoutes';
import kegiatanPenghasilanBadanRoutes from './routes/kegaiatanPenghasilanBadanRoutes';
import kegiatanPenghasilanOPRoutes from './routes/kegiatanPenghasilanOrangPribadiRoutes';
import itemKegiatanPenghasilanOPRoutes from './routes/itemKegiatanOrangPribadiRoutes';
import inventarisasiPajakRoutes from './routes/inventarisasiPajakRoutes';
// import uploadRoutes from './routes/uploadRoute';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(validationErrorHandler);

const allowlist = ['https://taon.qlm.one', 'http://localhost:5173'];

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

app.use('/api/agent/login', agentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/bank', bankRoutes);
app.use('/api/negara', negaraRoutes);
app.use('/api/jenis-penghasilan', jenisPenghasilanRoutes);
app.use('/api/objek-pajak', objekPajakRoutes);
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/wpop', wpopRoutes);
app.use(
  '/api/pengajuan-anggaran',

  pengajuanAnggaranRoutes
);
app.use(
  '/api/kegiatan-penghasilan-badan',

  kegiatanPenghasilanBadanRoutes
);
app.use(
  '/api/kegiatan-penghasilan-orang-pribadi',

  kegiatanPenghasilanOPRoutes
);
app.use(
  '/api/inventarisasi-pajak',

  inventarisasiPajakRoutes
);
app.use(
  '/api/pph21',

  itemKegiatanPenghasilanOPRoutes
);
app.use(
  '/api/wajib-pajak-badan-usaha',

  wajibPajakBadanUsahaRoutes
);
app.use(
  '/api/wajib-pajak-orang-pribadi',

  wajibPajakOrangPribadiRoutes
);
// app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
