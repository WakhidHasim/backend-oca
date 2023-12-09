import express from 'express';

import { authenticateJwtMiddleware } from './middleware/authMiddleware';
import { validationErrorHandler } from './middleware/errorMiddleware';

import agentRoutes from './routes/agentRoutes';
import bankRoutes from './routes/bankRoutes';
import negaraRoutes from './routes/negaraRoutes';
import wajibPajakOrangPribadiRoutes from './routes/wajibPajakOrangPribadiRoutes';
import uploadRoutes from './routes/uploadRoute';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(validationErrorHandler);

app.use('/api/agent/login', agentRoutes);
app.use('/api/bank', authenticateJwtMiddleware, bankRoutes);
app.use('/api/negara', authenticateJwtMiddleware, negaraRoutes);
app.use('/api/wajib-pajak-orang-pribadi', wajibPajakOrangPribadiRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
