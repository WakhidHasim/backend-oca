// errorMiddleware.ts

import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import HttpError from '../error/HttpError';

export const validationErrorHandler = (
  error: ZodError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const errorMessage = error.errors.map((err) => err.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  } else if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ error: error.message });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
