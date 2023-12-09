import express from 'express';
import { agentLoginController } from '../controllers/agentLoginConrroller';

const router = express.Router();

router.post('/', agentLoginController);

export default router;
