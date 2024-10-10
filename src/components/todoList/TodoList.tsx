import styled from "styled-components";
import { UseTodo } from "../../hooks/useTodo";
import { FullTodo } from "../../schemas/TodoSchema";
import TodoItem from "../todoItem/TodoItem";
import { useState } from "react";

const TodoList = ({
  todos,
  complete,
  unComplete,
  remove,
}: {
  todos: FullTodo[];
  complete: ReturnType<UseTodo>["complete"];
  unComplete: ReturnType<UseTodo>["unComplete"];
  remove: ReturnType<UseTodo>["remove"];
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const updatedTodos = [...todos];
    const draggedTodo = updatedTodos[draggedIndex];
    updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(index, 0, draggedTodo);
  };
  return (
    <STodoList>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          complete={complete}
          unComplete={unComplete}
          remove={remove}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </STodoList>
  );
};

export default TodoList;

const STodoList = styled.div`
  width: 100%;
  max-width: 560px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
`;
