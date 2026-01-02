import { ITodoRepository } from "../interfaces/ITodoRepository";

export class DeleteTodo {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(todoId: number, userId: number) {
    const todo = await this.todoRepo.getTodoById(todoId, userId);

    if (!todo) {
      throw new Error("Todo not found or unauthorized");
    }
    await this.todoRepo.deleteTodo(todoId);
  }
}
