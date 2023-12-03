import express from 'express';

import { validationErrorHandler } from './middleware/errorMiddleware';

import wajibPajakOrangPribadiRoutes from './routes/wajibPajakOrangPribadiRoutes';

const app = express();
const PORT = 3000;

app.use(validationErrorHandler);

app.use('/wajib-pajak-orang-pribadi', wajibPajakOrangPribadiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
