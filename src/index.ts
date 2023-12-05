import express from 'express';

import { validationErrorHandler } from './middleware/errorMiddleware';

import bankRoutes from './routes/bankRoutes';
import negaraRoutes from './routes/negaraRoutes';
import wajibPajakOrangPribadiRoutes from './routes/wajibPajakOrangPribadiRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(validationErrorHandler);

app.use('/api/bank', bankRoutes);
app.use('/api/negara', negaraRoutes);
app.use('/api/wajib-pajak-orang-pribadi', wajibPajakOrangPribadiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
