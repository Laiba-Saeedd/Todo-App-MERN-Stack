import { ITodoRepository } from "../interfaces/ITodoRepository";

export class GetTodos {
  constructor(private todoRepo: ITodoRepository) {}

  async execute(userId: number) {
    return await this.todoRepo.getTodosByUser(userId);
  }
}
