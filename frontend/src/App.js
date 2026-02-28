import { useEffect, useState } from "react";
import "./App.css";

// Use relative path when behind Nginx reverse proxy
const API = process.env.REACT_APP_API_URL || "/api/todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch todos");
        return r.json();
      })
      .then(setTodos)
      .catch((err) => console.error(err));
  }, []);

  const addTodo = async () => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, isCompleted: false }),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
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
};

export default App;