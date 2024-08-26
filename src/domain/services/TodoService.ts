import { TodoRepository } from '@repositories/TodoRepository';
import { Todo } from '@entities/Todo';
import { DueDate } from '@valueObjects/DueDate';

export class TodoService {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  public async createTodo(
    id: string,
    title: string,
    dueDate: DueDate
  ): Promise<void> {
    const todo = new Todo(
      id,
      title,
      false, // isCompletedは初期値false
      dueDate,
      new Date(), // createdAt
      new Date(), // updatedAt
      null // deletedAtは初期値null
    );
    await this.todoRepository.save(todo);
  }

  public async updateTodo(
    id: string,
    title: string,
    dueDate: DueDate
  ): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.updateTitle(title);
    todo.updateDueDate(dueDate);
    await this.todoRepository.save(todo);
  }

  public async completeTodo(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.complete();
    await this.todoRepository.save(todo);
  }

  public async deleteTodo(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    await this.todoRepository.deleteById(id); // 論理削除
  }

  public async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }
}
