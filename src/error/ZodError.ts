import { ZodError } from 'zod';

export const handleZodError = (error: ZodError) => {
  const formattedErrors = error.errors.map((err) => {
    return `${err.path.join('.')} - ${err.message}`;
  });

  return formattedErrors.join('\n');
};
