import { Request, Response } from 'express';
import { handleAgentLogin } from '../services/auth/agentAuthService';

export const agentLoginController = async (req: Request, res: Response) => {
  try {
    const { user_id, password } = req.body;
    const token = await handleAgentLogin({ user_id, password }, res);
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};
