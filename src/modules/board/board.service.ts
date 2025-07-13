import { BoardRepository } from './board.repository';
import { CreateBoardDTO, UpdateBoardDTO } from './board.types';

export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async createBoard(data: CreateBoardDTO) {
    return this.boardRepository.create(data);
  }

  async getBoards(page: number, limit: number, search?: string) {
    return this.boardRepository.findAll(page, limit, search);
  }

  async getBoardById(id: string) {
    return this.boardRepository.findById(id);
  }

  async updateBoard(id: string, data: UpdateBoardDTO) {
    return this.boardRepository.update(id, data);
  }

  async deleteBoard(id: string) {
    await this.boardRepository.delete(id);
  }
} 