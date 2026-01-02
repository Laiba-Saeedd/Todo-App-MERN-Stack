import { Todo } from "../entities/Todo";
import { ITodoRepository } from "../interfaces/ITodoRepository";

export class CreateTodo {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(title: string, userId: number): Promise<void> {
    const todo = new Todo(title, userId);
    await this.todoRepo.create(todo);
  }
}
