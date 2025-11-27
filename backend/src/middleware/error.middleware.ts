import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation error',
      details: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err.message.includes('already exists')) {
    res.status(409).json({ error: err.message });
    return;
  }

  if (err.message.includes('not found') || err.message.includes('Invalid email or password')) {
    res.status(404).json({ error: err.message });
    return;
  }

  if (err.message.includes('Invalid') || err.message.includes('expired')) {
    res.status(401).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
};
