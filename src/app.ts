import express from 'express';
import cors from 'cors';
import { errorHandler } from './common/middlewares/errorHandler';
import { boardRouter } from './modules/board/board.routes';
import { taskRouter } from './modules/task/task.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boards', boardRouter);
app.use('/api/tasks', taskRouter);
app.use('/', (req, res) => {
  res.send('Hello World');
});

// Error handling
app.use(errorHandler);

export default app; 