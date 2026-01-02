import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import {
  getTodos,
  createTodo,
  toggleTodoStatus,
  deleteTodoById,
} from "../services/todoService";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    if (!title.trim()) return;
    await createTodo(title);
    loadTodos();
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    await toggleTodoStatus(id, !completed);
    loadTodos();
  };

  const deleteTodo = async (id: number) => {
    await deleteTodoById(id);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
