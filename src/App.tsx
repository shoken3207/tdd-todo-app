import { useState } from "react";
import "./App.css";
import RegisterTodo from "./components/registerTodo/RegisterTodo";
import TodoList from "./components/todoList/TodoList";
import { useTodo } from "./hooks/useTodo";
import DialogWrapper from "./components/DialogWrapper/DialogWrapper";
import styled from "styled-components";

function App() {
  const { todos, add, complete, unComplete, remove } = useTodo();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SContainer>
      <button onClick={() => setIsOpen(true)}>タスクを追加</button>
      <DialogWrapper
        dialogTitle="タスクを追加"
        dialogDescription="タスクのタイトル、締切日の入力は必須です。"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="560px"
      >
        <RegisterTodo add={add} onClose={() => setIsOpen(false)} />
      </DialogWrapper>
      <TodoList
        todos={todos}
        complete={complete}
        unComplete={unComplete}
        remove={remove}
      />
    </SContainer>
  );
}

export default App;

const SContainer = styled.div`
  width: 100%;
  max-width: 860px;
  margin: 2rem auto;
`;
