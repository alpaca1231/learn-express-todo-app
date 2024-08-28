import { Router } from 'express';
import { TodoController } from '@interfaces/controllers/TodoController';
import { TodoService } from '@domain/services/TodoService';
import { PostgresTodoRepository } from '@infrastructure/TodoRepositoryImpl';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const todoRepository = new PostgresTodoRepository(pool);
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

const router = Router();

router.get('/todos', todoController.getAllTodos.bind(todoController));
router.post('/todos', todoController.createTodo.bind(todoController));
router.put('/todos/:id', todoController.updateTodo.bind(todoController));
router.delete('/todos/:id', todoController.deleteTodo.bind(todoController));

export default router;
