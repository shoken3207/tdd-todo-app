import { useState } from "react";
import "./App.css";
import RegisterTodo from "./components/registerTodo/RegisterTodo";
import TodoList from "./components/todoList/TodoList";
import { useTodo } from "./hooks/useTodo";
import DialogWrapper from "./components/DialogWrapper/DialogWrapper";

function App() {
  const { todos, add } = useTodo();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>タスクを追加</button>
      <DialogWrapper
        dialogTitle="タスクを追加"
        dialogDescription="タスクのタイトル、締切日の入力は必須です。"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <RegisterTodo add={add} />
      </DialogWrapper>
      <TodoList todos={todos} />
    </>
  );
}

export default App;
