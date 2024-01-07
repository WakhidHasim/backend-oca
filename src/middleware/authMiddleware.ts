require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

interface DecodeToken {
  user_id: string;
  idl: string;
}

interface RequestWithTokenInfo extends Request {
  tokenInfo?: DecodeToken;
}

export const authenticateJwtMiddleware = (
  req: RequestWithTokenInfo,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const secretKey = process.env.JWT_SECRET_KEY ?? '';

  jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.tokenInfo = decoded;
    next();
  });
};
