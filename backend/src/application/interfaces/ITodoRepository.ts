export interface ITodoRepository {
  create(todo: { userId: number; title: string }): Promise<void>;
  getTodoById(todoId: number, userId: number): Promise<any>;
  getTodosByUser(userId: number): Promise<any[]>;
  updateTodoStatus(id: number, completed: boolean): Promise<void>;
  deleteTodo(id: number): Promise<void>;
}
