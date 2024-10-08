import "./App.css";
import { useTodo } from "./hooks/useTodo";

function App() {
  const { add } = useTodo();
  const handleClick = () => {
    add({ title: "aa", dueDate: new Date(), description: "jjj" });
  };

  return (
    <>
      <button onClick={handleClick}>button</button>
    </>
  );
}

export default App;
