import styled from "styled-components";
import { FullTodo } from "../../schemas/TodoSchema";
import { UseTodo } from "../../hooks/useTodo";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef } from "react";

const TodoItem = ({
  todo,
  index,
  complete,
  unComplete,
  remove,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  todo: FullTodo;
  index: number;
  complete: ReturnType<UseTodo>["complete"];
  unComplete: ReturnType<UseTodo>["unComplete"];
  remove: ReturnType<UseTodo>["remove"];
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}) => {
  const { title, description, isCompleted, dueDate } = todo;
  const dueDateText = `${dueDate.getFullYear()}年${dueDate.getMonth()}月${dueDate.getDate()}日まで`;
  const accordionRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    console.log("ll");
    console.log(accordionRef.current?.open);
  }, []);
  console.log(accordionRef.current?.open);
  return (
    <STodo
      ref={accordionRef}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
    >
      <STodoMain description={description}>
        <STodoMainTop isCompleted={isCompleted}>
          <div>
            <div>
              <MdDragIndicator />
            </div>
            <h3>{title}</h3>
          </div>
          <STodoMainAction>
            <input
              type="checkbox"
              aria-selected={isCompleted}
              checked={isCompleted}
              onChange={() =>
                isCompleted ? unComplete(index) : complete(index)
              }
            />
            <MdDelete size={20} onClick={() => remove(index)} />
          </STodoMainAction>
        </STodoMainTop>
        <STodoMainBottom>
          <p>{dueDateText}</p>
          {description && (
            <SExpansionIcon
              isOpen={accordionRef.current?.open as boolean}
              size={20}
            />
          )}
        </STodoMainBottom>
      </STodoMain>

      {description && (
        <STodoSub>
          <h4>詳細</h4>
          <p>{description}</p>
        </STodoSub>
      )}
    </STodo>
  );
};

export default TodoItem;
const STodo = styled.details`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0.12rem 0.2rem;
`;

const STodoMain = styled.summary<{ description?: string }>`
  list-style: none;
  cursor: ${({ description }) => (description ? "pointer" : "default")};
`;

const STodoMainTop = styled.div<{ isCompleted: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 0.2rem;
    max-width: calc(100% - 70px);
    > h3 {
      font-size: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: ${({ isCompleted }) => (isCompleted ? ".7" : 1)};
      position: relative;
      &::after {
        content: "";
        width: calc(100% + 10px);
        position: absolute;
        top: 50%;
        left: 0;
        background-color: black;
        height: 2px;
        transform: translate(-5px, -50%);
        display: ${({ isCompleted }) => (isCompleted ? "black" : "none")};
      }
    }
  }
`;

const SExpansionIcon = styled(IoIosArrowDown)<{ isOpen: boolean }>`
  transition: transform 0.3s;
  ${STodo}[open] & {
    transform: rotate(180deg);
  }
`;

const STodoMainBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > p {
    color: red;
    font-size: 0.6rem;
    font-family: "Roboto", sans-serif;
  }
`;

const STodoMainAction = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.3rem;
`;

const STodoSub = styled.div`
  > h4 {
    font-weight: 550;
    color: gray;
  }
  > p {
    color: #242424;
    font-size: 0.8rem;
  }
`;
