import { Router } from 'express';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';

const router = Router();

// Dependency injection
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Error handling wrapper
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
router.post('/', asyncHandler(taskController.createTask));
router.get('/', asyncHandler(taskController.getTasks));
router.get('/:id', asyncHandler(taskController.getTaskById));
router.patch('/:id', asyncHandler(taskController.updateTask));
router.delete('/:id', asyncHandler(taskController.deleteTask));

export const taskRouter = router; 