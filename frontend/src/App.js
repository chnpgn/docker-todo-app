import { useEffect, useState } from "react";
import "./App.css";

// Use relative path when behind Nginx reverse proxy
const API = process.env.REACT_APP_API_URL || "/api/todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch todos");
        return r.json();
      })
      .then(setTodos)
      .catch(console.error);
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, isCompleted: false }),
      });

      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const updated = { ...todo, isCompleted: !todo.isCompleted };

      await fetch(`${API}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const updateTodo = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);

      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...todo,
          title: editTitle,
        }),
      });

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: editTitle } : t)),
      );

      cancelEdit();
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
          <li
            key={t.id}
            className={`todo-item ${t.isCompleted ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={t.isCompleted}
              onChange={() => toggleCompleted(t)}
            />

            {editingId === t.id ? (
              <>
                <input
                  className="todo-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => updateTodo(t.id)}>💾</button>
                <button onClick={cancelEdit}>❌</button>
              </>
            ) : (
              <>
                <span>{t.title}</span>
                <div className="todo-actions">
                  <button onClick={() => startEdit(t)}>✏️</button>
                  <button onClick={() => deleteTodo(t.id)}>🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
