import { useState } from "react";
import { FullTodo, InputTodo, InputTodoSchema } from "../schemas/TodoSchema";
import { IndexSchema } from "../schemas/CommonSchema";

type Todos = FullTodo[];

export type UseTodo = () => {
  todos: Todos;
  add: (inputTodo: InputTodo) => void;
  complete: (index: number) => void;
  unComplete: (index: number) => void;
  remove: (index: number) => void;
};

export const useTodo: UseTodo = () => {
  const [todos, setTodos] = useState<Todos>([]);
  const add = (inputTodo: InputTodo) => {
    try {
      InputTodoSchema.parse(inputTodo);
      const newTodo = {
        ...inputTodo,
        dueDate: new Date(inputTodo.dueDate),
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
      const copyTodos = [...todos];
      copyTodos[index].isCompleted = true;
      setTodos(copyTodos);
    } catch (err) {
      console.error(err);
    }
  };
  const unComplete = (index: number) => {
    try {
      IndexSchema.parse(index);
      const copyTodos = [...todos];
      copyTodos[index].isCompleted = false;
      setTodos(copyTodos);
    } catch (err) {
      console.error(err);
    }
  };
  const remove = (index: number) => {
    try {
      IndexSchema.parse(index);
      const copyTodos = [...todos];
      copyTodos.splice(index, 1);
      setTodos(copyTodos);
    } catch (err) {
      console.error(err);
    }
  };
  return { todos, add, complete, unComplete, remove };
};
