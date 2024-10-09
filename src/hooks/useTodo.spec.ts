import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import { useTodo } from "./useTodo";
import { act } from "react";
import { InputTodo } from "../schemas/TodoSchema";

const addTodoAndVerify = ({ addArgs }: { addArgs: InputTodo }) => {
  const { title, description, dueDate } = addArgs;
  const { result } = renderHook(() => useTodo());
  act(() => {
    result.current.add(addArgs);
  });
  expect(result.current.todos).toHaveLength(1);
  expect(result.current.todos[0].title).toStrictEqual(title);
  expect(result.current.todos[0].dueDate).toStrictEqual(new Date(dueDate));

  if (description === undefined) {
    expect(result.current.todos[0]).not.toHaveProperty("description");
  } else {
    expect(result.current.todos[0].description).toStrictEqual(description);
  }
};
const today = new Date();
const inputTodo: InputTodo = {
  title: "領収書を郵送する",
  description: "先週の懇親会",
  dueDate: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
};

test("初期状態の確認", () => {
  const { result } = renderHook(() => useTodo());
  expect(result.current.todos).toHaveLength(0);
});

test("無効な入力でTodoを追加", () => {
  const { result } = renderHook(() => useTodo());
  act(() => {
    result.current.add({ ...inputTodo, title: "" });
  });
  expect(result.current.todos).toHaveLength(0);
});

test("descriptionを入力せずにTodoを追加", () => {
  const { title, dueDate } = inputTodo;
  addTodoAndVerify({ addArgs: { title, dueDate } });
});

test("descriptionを含めてTodoを追加", () => {
  addTodoAndVerify({ addArgs: inputTodo });
});

test("未完了のタスクを完了", () => {
  const { result } = renderHook(useTodo);
  act(() => {
    result.current.add(inputTodo);
  });
  act(() => {
    result.current.complete(0);
  });
  expect(result.current.todos[0].isCompleted).toStrictEqual(true);
});

test("完了のタスクを完了", () => {
  const { result } = renderHook(useTodo);
  act(() => {
    result.current.add(inputTodo);
  });
  act(() => {
    result.current.complete(0);
  });
  act(() => {
    result.current.complete(0);
  });
  expect(result.current.todos[0].isCompleted).toStrictEqual(true);
});

test("未完了のタスクを未完了", () => {
  const { result } = renderHook(useTodo);
  act(() => {
    result.current.add(inputTodo);
  });
  act(() => {
    result.current.unComplete(0);
  });
  expect(result.current.todos[0].isCompleted).toStrictEqual(false);
});

test("完了のタスクを未完了", () => {
  const { result } = renderHook(useTodo);
  act(() => {
    result.current.add(inputTodo);
  });
  act(() => {
    result.current.complete(0);
  });
  act(() => {
    result.current.unComplete(0);
  });
  expect(result.current.todos[0].isCompleted).toStrictEqual(false);
});

test("タスクを削除", () => {
  const { result } = renderHook(useTodo);
  act(() => {
    result.current.add(inputTodo);
  });
  act(() => {
    result.current.remove(0);
  });
  expect(result.current.todos).toHaveLength(0);
});

test("存在しないタスクを削除", () => {
  const { result } = renderHook(() => useTodo());
  act(() => {
    result.current.add(inputTodo);
  });

  act(() => {
    result.current.remove(1);
  });

  expect(result.current.todos).toHaveLength(1);
});
