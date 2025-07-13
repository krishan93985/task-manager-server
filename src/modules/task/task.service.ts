import { TaskRepository } from './task.repository';
import { CreateTaskDTO, UpdateTaskDTO } from './task.types';

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(data: CreateTaskDTO) {
    return this.taskRepository.create(data);
  }

  async getTasks(
    page: number,
    limit: number,
    status?: string,
    boardId?: string,
    search?: string
  ) {
    return this.taskRepository.findAll(page, limit, status, boardId, search);
  }

  async getTaskById(id: string) {
    return this.taskRepository.findById(id);
  }

  async updateTask(id: string, data: UpdateTaskDTO) {
    return this.taskRepository.update(id, data);
  }

  async deleteTask(id: string) {
    await this.taskRepository.delete(id);
  }
} 