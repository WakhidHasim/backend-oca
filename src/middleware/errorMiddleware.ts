import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const validationErrorHandler = (
  error: ZodError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const errorMessage = error.errors.map((err) => err.message).join(', ');
    res.status(400).json({ error: errorMessage });
  } else {
    if (!error) {
      next();
      return;
    }

    res
      .status(500)
      .json({
        errors: error.message,
      })
      .end();
  }
};
