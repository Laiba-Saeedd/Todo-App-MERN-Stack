import { api } from "./api";
import { Todo } from "../types/Todo";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get("/todos", {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const createTodo = async (title: string) => {
  await api.post(
    "/todos",
    { title },
    { headers: getAuthHeader() }
  );
};

export const toggleTodoStatus = async (id: number, completed: boolean) => {
  await api.put(
    `/todos/${id}`,
    { completed },
    { headers: getAuthHeader() }
  );
};

export const deleteTodoById = async (id: number) => {
  await api.delete(`/todos/${id}`, {
    headers: getAuthHeader(),
  });
};
