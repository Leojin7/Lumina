import React, { useState } from "react";
import api from "../../services/api";

export default function TaskForm({ onAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post("/tasks", { title });    // Create task[3]
      onAdded(data);
      setTitle("");
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <button type="submit">Add Task</button>
    </form>
  );
}
