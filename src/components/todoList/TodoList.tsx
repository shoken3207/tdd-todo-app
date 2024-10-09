import { FullTodo } from "../../schemas/TodoSchema";
import TodoItem from "../todoItem/TodoItem";

const TodoList = ({ todos }: { todos: FullTodo[] }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
