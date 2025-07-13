import { Request, Response, NextFunction } from 'express';
import { TaskError } from '../error/TaskError';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', error);

  if (error instanceof TaskError) {
    return res.status(error.statusCode).json({
      error: error.message,
      ...(error.metadata && { metadata: error.metadata }),
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          error: 'A record with this value already exists',
        });
      case 'P2025':
        return res.status(404).json({
          error: 'Record not found',
        });
      default:
        return res.status(500).json({
          error: 'Database error occurred',
        });
    }
  }

  // Default error
  return res.status(500).json({
    error: 'Internal server error',
  });
}; 