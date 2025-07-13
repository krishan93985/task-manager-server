import prisma from '../../common/prisma/client';
import { CreateBoardDTO, UpdateBoardDTO } from './board.types';
import { TaskError } from '../../common/error/TaskError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class BoardRepository {
  async create(data: CreateBoardDTO) {
    return prisma.board.create({
      data,
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    });
  }

  async findAll(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    const [data, total] = await Promise.all([
      prisma.board.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { tasks: true }
          }
        }
      }),
      prisma.board.count({ where })
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
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    });

    if (!board) {
      throw TaskError.notFound('Board not found');
    }

    return board;
  }

  async update(id: string, data: UpdateBoardDTO) {
    try {
      return await prisma.board.update({
        where: { id },
        data,
        include: {
          _count: {
            select: { tasks: true }
          }
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw TaskError.notFound('Board not found');
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.board.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw TaskError.notFound('Board not found');
      }
      throw error;
    }
  }
} 