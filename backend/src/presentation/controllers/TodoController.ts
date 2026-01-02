import { Request, Response } from "express";
import { CreateTodo } from "../../application/usecases/CreateTodo";
import { GetTodos } from "../../application/usecases/GetTodos";
import { UpdateTodo } from "../../application/usecases/UpdateTodo";
import { DeleteTodo } from "../../application/usecases/DeleteTodo";
import { TodoRepository } from "../../infrastructure/repositories/TodoRepository";

const todoRepo = new TodoRepository();

export class TodoController {

static async create(req: Request, res: Response) {
  const { title } = req.body;
  const userId = (req as any).userId;

  const usecase = new CreateTodo(todoRepo);
  await usecase.execute(title, userId);

  res.json({ message: "Todo created" });
}

static async getTodos(req: Request, res: Response) {
  const userId = (req as any).userId;

  const usecase = new GetTodos(todoRepo);
  const todos = await usecase.execute(userId);

  res.json(todos);
}

static async update(req: Request, res: Response) {
  const todoId = Number(req.params.id);
  const { completed } = req.body;
  const userId = (req as any).userId;

  const usecase = new UpdateTodo(todoRepo);
  await usecase.execute(todoId, completed, userId);

  res.json({ message: "Todo updated" });
}

static async delete(req: Request, res: Response) {
  const todoId = Number(req.params.id);
  const userId = (req as any).userId;

  const usecase = new DeleteTodo(todoRepo);
  await usecase.execute(todoId, userId);

  res.json({ message: "Todo deleted" });
}
}
