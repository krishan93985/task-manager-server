import { Board } from '@prisma/client';

export type CreateBoardDTO = {
  name: string;
  description?: string;
};

export type UpdateBoardDTO = {
  name?: string;
  description?: string;
};

export type BoardResponse = Omit<Board, 'updatedAt'> & {
  taskCount: number;
}; 