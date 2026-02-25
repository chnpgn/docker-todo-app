import { useEffect, useState } from "react";
import "./App.css";

const API = process.env.REACT_APP_API_URL;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isCompleted: false }),
    });
    setTodos([...todos, await res.json()]);
    setTitle("");
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Docker To-Do App</h2>

      <div className="todo-input-row">
        <input
          className="todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
        />
        <button className="todo-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((t) => (
          <li className="todo-item" key={t.id}>
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
