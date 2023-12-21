import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  addTodo: (todo: any) => {},
  updateTodo: (id: any, todo: any) => {},
  deleteTodo: (id: any) => {},
  toggleComplete: (id: any) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
