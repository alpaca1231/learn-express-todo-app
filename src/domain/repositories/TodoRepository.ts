import { Todo } from '@entities/Todo';

export interface TodoRepository {
  findById(id: string): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  save(todo: Todo): Promise<void>;
  deleteById(id: string): Promise<void>;
}
