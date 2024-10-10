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
  const [todos, setTodos] = useState<Todos>([
    {
      id: "941cfe25-8b32-4999-a57f-3a4da450e1c2",
      title: "Todo Task 1",
      description: "Description for task 1",
      isCompleted: true,
      dueDate: new Date("2024-11-09T04:58:29.678Z"),
      createdAt: new Date("2024-10-08T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "77f94827-98e0-438d-99b4-9271d89f684f",
      title: "Todo Task 2",
      description: "",
      isCompleted: false,
      dueDate: new Date("2024-10-20T04:58:29.678Z"),
      createdAt: new Date("2024-09-19T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "a9e7d5ac-ea5b-4a17-a3e2-48157ed9f7f8",
      title: "Todo Task 3",
      description: "Description for task 3",
      isCompleted: true,
      dueDate: new Date("2024-10-21T04:58:29.678Z"),
      createdAt: new Date("2024-09-21T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "31c61955-d49c-4670-a105-03ba60f1eb05",
      title: "Todo Task 4",
      description: "",
      isCompleted: true,
      dueDate: new Date("2024-11-06T04:58:29.678Z"),
      createdAt: new Date("2024-09-20T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "a49f1bde-e113-47e5-941f-68526fdfbfaa",
      title: "Todo Task 5",
      description: "Description for task 5",
      isCompleted: true,
      dueDate: new Date("2024-10-24T04:58:29.678Z"),
      createdAt: new Date("2024-10-05T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "ef89d29b-718d-4673-b381-68de7656f491",
      title: "Todo Task 6",
      description: "",
      isCompleted: false,
      dueDate: new Date("2024-10-20T04:58:29.678Z"),
      createdAt: new Date("2024-09-18T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "930fe298-964d-441e-8806-1ba4b88de20e",
      title: "Todo Task 7",
      description: "Description for task 7",
      isCompleted: false,
      dueDate: new Date("2024-11-09T04:58:29.678Z"),
      createdAt: new Date("2024-09-12T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "1f5fde9d-72c8-465d-9e4f-b0fd4c8c6bba",
      title: "Todo Task 8",
      description: "",
      isCompleted: true,
      dueDate: new Date("2024-11-03T04:58:29.678Z"),
      createdAt: new Date("2024-09-13T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "d27d6674-a08e-4ac9-a532-462121fbbf87",
      title: "Todo Task 9",
      description: "Description for task 9",
      isCompleted: false,
      dueDate: new Date("2024-10-25T04:58:29.678Z"),
      createdAt: new Date("2024-09-13T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
    {
      id: "6ce717c5-013e-4e20-87d4-e6e32c65398c",
      title: "Todo Task 10",
      description: "",
      isCompleted: false,
      dueDate: new Date("2024-10-25T04:58:29.678Z"),
      createdAt: new Date("2024-10-04T04:58:29.678Z"),
      updatedAt: new Date("2024-10-10T04:58:29.678Z"),
    },
  ]);
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
