import { Request, Response } from 'express';
import { TodoService } from '@domain/services/TodoService';
import { DueDate } from '@domain/valueObjects/DueDate';

export class TodoController {
  private readonly todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  public async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    }
  }

  public async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, dueDate: _dueDate } = req.body;
      const dueDate = new DueDate(_dueDate);

      // 今日より未来の日付であることを保証する
      dueDate.validate();

      await this.todoService.createTodo(id, title, dueDate);
      res.status(201).json({ message: 'Todo created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }

  public async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title, dueDate } = req.body;
      const { id } = req.params;
      await this.todoService.updateTodo(
        id,
        title,
        new DueDate(new Date(dueDate))
      );
      res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }

  public async completeTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.todoService.completeTodo(id);
      res.status(200).json({ message: 'Todo completed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to complete todo' });
    }
  }

  public async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.todoService.deleteTodo(id);
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
}
