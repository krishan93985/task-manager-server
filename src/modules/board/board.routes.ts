import { Router } from 'express';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';

const router = Router();

// Dependency injection
const boardRepository = new BoardRepository();
const boardService = new BoardService(boardRepository);
const boardController = new BoardController(boardService);

// Error handling wrapper
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
router.post('/', asyncHandler(boardController.createBoard));
router.get('/', asyncHandler(boardController.getBoards));
router.get('/:id', asyncHandler(boardController.getBoardById));
router.patch('/:id', asyncHandler(boardController.updateBoard));
router.delete('/:id', asyncHandler(boardController.deleteBoard));

export const boardRouter = router; 