import { useState } from "react";
import { FullTodo, InputTodo, InputTodoSchema } from "../schemas/TodoSchema";
import { IndexSchema } from "../schemas/CommonSchema";

type Todos = FullTodo[];

type UseTodo = () => {
  todos: Todos;
  add: (inputTodo: InputTodo) => void;
  complete: (index: number) => void;
  unComplete: (index: number) => void;
  remove: (index: number) => void;
};

export const useTodo: UseTodo = () => {
  // const todos: Todos = [];
  const [todos, setTodos] = useState<Todos>([]);
  const add = (inputTodo: InputTodo) => {
    try {
      InputTodoSchema.parse(inputTodo);
      const newTodo = {
        ...inputTodo,
        id: crypto.randomUUID(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error(err);
    }
  };
  const complete = (index: number) => {
    try {
      IndexSchema.parse(index);
      todos[index].isCompleted = true;
    } catch (err) {
      console.error(err);
    }
  };
  const unComplete = (index: number) => {
    try {
      IndexSchema.parse(index);
      todos[index].isCompleted = false;
    } catch (err) {
      console.error(err);
    }
  };
  const remove = (index: number) => {
    try {
      IndexSchema.parse(index);
      todos.splice(index, 1);
    } catch (err) {
      console.error(err);
    }
  };
  return { todos, add, complete, unComplete, remove };
};
