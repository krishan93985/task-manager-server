import prisma from '../../common/prisma/client';
import { CreateTaskDTO, UpdateTaskDTO } from './task.types';
import { TaskError } from '../../common/error/TaskError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class TaskRepository {
  async create(data: CreateTaskDTO) {
    try {
      return await prisma.task.create({
        data,
        include: {
          board: {
            select: {
              name: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2003') {
        throw TaskError.validation('Board not found');
      }
      throw error;
    }
  }

  async findAll(
    page: number,
    limit: number,
    status?: string,
    boardId?: string,
    search?: string
  ) {
    const skip = (page - 1) * limit;
    const where = {
      ...(status && { status }),
      ...(boardId && { boardId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const [data, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          board: {
            select: {
              name: true
            }
          }
        }
      }),
      prisma.task.count({ where })
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        board: {
          select: {
            name: true
          }
        }
      }
    });

    if (!task) {
      throw TaskError.notFound('Task not found');
    }

    return task;
  }

  async update(id: string, data: UpdateTaskDTO) {
    try {
      return await prisma.task.update({
        where: { id },
        data,
        include: {
          board: {
            select: {
              name: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw TaskError.notFound('Task not found');
      }
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2003') {
        throw TaskError.validation('Board not found');
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.task.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw TaskError.notFound('Task not found');
      }
      throw error;
    }
  }
} 