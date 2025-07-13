import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { createTaskSchema, updateTaskSchema, taskIdSchema, taskQuerySchema } from './task.schema';
import { TaskError } from '../../common/error/TaskError';

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask = async (req: Request, res: Response) => {
    const validatedData = createTaskSchema.parse(req.body);
    const task = await this.taskService.createTask(validatedData);
    res.status(201).json(task);
  };

  getTasks = async (req: Request, res: Response) => {
    const { page, limit, status, boardId, search } = taskQuerySchema.parse(req.query);
    const tasks = await this.taskService.getTasks(page, limit, status, boardId, search);
    res.json(tasks);
  };

  getTaskById = async (req: Request, res: Response) => {
    const { id } = taskIdSchema.parse(req.params);
    const task = await this.taskService.getTaskById(id);
    res.json(task);
  };

  updateTask = async (req: Request, res: Response) => {
    const { id } = taskIdSchema.parse(req.params);
    const validatedData = updateTaskSchema.parse(req.body);
    
    if (Object.keys(validatedData).length === 0) {
      throw TaskError.validation('No valid fields to update');
    }

    const task = await this.taskService.updateTask(id, validatedData);
    res.json(task);
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = taskIdSchema.parse(req.params);
    await this.taskService.deleteTask(id);
    res.status(204).send();
  };
} 