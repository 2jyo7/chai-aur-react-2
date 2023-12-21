"use client";

import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { TodoProvider } from "@/contexts/TodoContext";
import { useEffect, useState } from "react";

export default function Page() {
  const [todos, setTodos] = useState<any>([]);

  const addTodo = (todo: any) => {
    setTodos((prev: any) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id: any, todo: any) => {
    setTodos((prev: any) =>
      prev.map((prevTodo: any) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id: any) => {
    setTodos((prev: any) => prev.filter((todo: any) => todo.id !== id));
  };

  const toggleComplete = (id: any) => {
    //console.log(id);
    setTodos((prev: any) =>
      prev.map((prevTodo: any) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")!);
    console.log("todos ", todos);

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo: any) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}
