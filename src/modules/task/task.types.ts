import { Task } from '@prisma/client';

export enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export type CreateTaskDTO = {
  title: string;
  description?: string;
  status: TaskStatus;
  boardId: string;
};

export type UpdateTaskDTO = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  boardId?: string;
};

export type TaskResponse = Omit<Task, 'updatedAt'>; 