import { ITodoRepository } from "../../application/interfaces/ITodoRepository";
import { db } from "../db/mysql";

export class TodoRepository implements ITodoRepository {
  async create(todo: { userId: number; title: string }): Promise<void> {
    await db.query("INSERT INTO todos (user_id, title) VALUES (?, ?)", [todo.userId, todo.title]);
  }

  async getTodoById(todoId: number, userId: number): Promise<any> {
    const [rows] = await db.query(
      "SELECT * FROM todos WHERE id = ? AND user_id = ?",
      [todoId, userId]
    ) as any[];
    return rows[0];
  }

  async getTodosByUser(userId: number): Promise<any[]> {
    const [rows] = await db.query("SELECT * FROM todos WHERE user_id = ?", [userId]) as any[];
    return rows;
  }

  async updateTodoStatus(id: number, completed: boolean): Promise<void> {
    await db.query("UPDATE todos SET completed = ? WHERE id = ?", [completed, id]);
  }

  async deleteTodo(id: number): Promise<void> {
    await db.query("DELETE FROM todos WHERE id = ?", [id]);
  }
}
