import { ITodoRepository } from "../interfaces/ITodoRepository";

export class UpdateTodo {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(todoId: number, completed: boolean, userId: number) {
   const todo = await this.todoRepo.getTodoById(todoId, userId);
if (!todo) throw new Error("Todo not found or unauthorized");
    await this.todoRepo.updateTodoStatus(todoId, completed);
    return { ...todo, completed };
  }
}
