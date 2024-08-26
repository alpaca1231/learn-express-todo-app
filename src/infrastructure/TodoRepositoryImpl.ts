import { TodoRepository } from '@domain/repositories/TodoRepository';
import { Todo } from '@domain/entities/Todo';
import { DueDate } from '@domain/valueObjects/DueDate';
import { Pool } from 'pg';
import { todo } from 'node:test';

export class PostgresTodoRepository implements TodoRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findById(id: string): Promise<Todo | null> {
    const result = await this.pool.query('SELECT * FROM tasks WHERE id = $1', [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new Todo(
      row.id,
      row.title,
      row.is_completed,
      new DueDate(new Date(row.due_date)),
      new Date(row.created_at),
      new Date(row.updated_at),
      row.deleted_at ? new Date(row.deleted_at) : null
    );
  }

  async findAll(): Promise<Todo[]> {
    const result = await this.pool.query('SELECT * FROM tasks');
    return result.rows.map(
      (row) =>
        new Todo(
          row.id,
          row.title,
          row.is_completed,
          new DueDate(new Date(row.due_date)),
          new Date(row.created_at),
          new Date(row.updated_at),
          row.deleted_at ? new Date(row.deleted_at) : null
        )
    );
  }

  async save(todo: Todo): Promise<void> {
    await this.pool.query(
      'INSERT INTO tasks (id, title, is_completed, due_date, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        todo.getId(),
        todo.getTitle(),
        todo.getIsCompleted(),
        todo.getDueDate().getDate(),
        todo.getCreatedAt(),
        todo.getUpdatedAt(),
        todo.getDeletedAt(),
      ]
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }
}
