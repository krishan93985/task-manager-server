import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z.string().min(1, 'Board name is required').max(100, 'Board name is too long'),
  description: z.string().max(50, 'Description is too long').optional(),
});

export const updateBoardSchema = createBoardSchema.partial();

export const boardIdSchema = z.object({
  id: z.string().uuid('Invalid board ID'),
});

export const boardQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
}); 