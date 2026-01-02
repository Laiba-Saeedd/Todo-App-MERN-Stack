"use client";

import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";

export default function Todos() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [title, setTitle] = useState("");

  const submit = async () => {
    await addTodo(title);
    setTitle("");
  };

  return (
    <div className="min-h-screen flex justify-center pt-20 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h1 className="text-xl font-bold mb-4">My Todos</h1>

        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 rounded"
            placeholder="New todo"
          />
          <button
            onClick={submit}
            className="bg-indigo-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />

                <input
                  value={todo.title}
                  readOnly
                  className={`border px-2 py-1 rounded w-56 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                />
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
