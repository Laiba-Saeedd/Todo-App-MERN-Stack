"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 🔹 Todo entity (Application layer)
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 🔹 Use cases (Application layer)
const todoUseCases = {
  fetchTodos: async (token: string): Promise<Todo[]> => {
    const res = await fetch("/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
  },

  addTodo: async (token: string, text: string): Promise<Todo> => {
    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return res.json();
  },

  toggleTodo: async (token: string, id: number) => {
    await fetch(`http://localhost:5000/api/todos/${id}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteTodo: async (token: string, id: number) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

// 🔹 Presentation layer (React page)
export default function TodoPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      router.replace("/login"); 
      return;
    }

    // fetch todos
    todoUseCases
      .fetchTodos(token)
      .then(setTodos)
      .catch(() => {
        localStorage.removeItem("jwtToken");
        router.replace("/login");
      });
  }, []);

  // 🔹 Add todo
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      const newTodo = await todoUseCases.addTodo(token, input);
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Toggle todo
  const handleToggle = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      await todoUseCases.toggleTodo(token, id);
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete todo
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      await todoUseCases.deleteTodo(token, id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">My Todo List</h1>

        {/* Add Todo */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 rounded"
            placeholder="Add new task"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        {/* Todo Items */}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <span
                className={`cursor-pointer flex-1 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.text}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
