import { Request, Response } from 'express';
import { BoardService } from './board.service';
import { createBoardSchema, updateBoardSchema, boardIdSchema, boardQuerySchema } from './board.schema';
import { TaskError } from '../../common/error/TaskError';

export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  createBoard = async (req: Request, res: Response) => {
    const validatedData = createBoardSchema.parse(req.body);
    const board = await this.boardService.createBoard(validatedData);
    res.status(201).json(board);
  };

  getBoards = async (req: Request, res: Response) => {
    const { page, limit, search } = boardQuerySchema.parse(req.query);
    const boards = await this.boardService.getBoards(page, limit, search);
    res.json(boards);
  };

  getBoardById = async (req: Request, res: Response) => {
    const { id } = boardIdSchema.parse(req.params);
    const board = await this.boardService.getBoardById(id);
    res.json(board);
  };

  updateBoard = async (req: Request, res: Response) => {
    const { id } = boardIdSchema.parse(req.params);
    const validatedData = updateBoardSchema.parse(req.body);
    
    if (Object.keys(validatedData).length === 0) {
      throw TaskError.validation('No valid fields to update');
    }

    const board = await this.boardService.updateBoard(id, validatedData);
    res.json(board);
  };

  deleteBoard = async (req: Request, res: Response) => {
    const { id } = boardIdSchema.parse(req.params);
    await this.boardService.deleteBoard(id);
    res.status(204).send();
  };
} 