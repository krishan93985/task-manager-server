import { z } from 'zod';
import { TaskStatus } from './task.types';

const taskStatus = z.enum(Object.values(TaskStatus) as [TaskStatus, ...TaskStatus[]]);

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100, 'Task title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  status: taskStatus,
  boardId: z.string().uuid('Invalid board ID'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100, 'Task title is too long').optional(),
  description: z.string().max(500, 'Description is too long').optional(),
  status: taskStatus.optional(),
  boardId: z.string().uuid('Invalid board ID').optional(),
});

export const taskIdSchema = z.object({
  id: z.string().uuid('Invalid task ID'),
});

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: taskStatus.optional(),
  boardId: z.string().uuid('Invalid board ID').optional(),
  search: z.string().optional(),
}); 