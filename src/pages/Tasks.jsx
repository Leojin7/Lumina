import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { title: "Design Lumina UI", done: false }
  ]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (!newTask.trim()) return;
    setTasks([{ title: newTask, done: false }, ...tasks]);
    setNewTask("");
  }

  function toggleDone(idx) {
    setTasks(tasks.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  }

  function removeTask(idx) {
    setTasks(tasks.filter((_, i) => i !== idx));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <HiOutlineCheckCircle className="w-8 h-8 text-green-500" />
          Tasks
        </h1>
        <div className="flex gap-2">
          <input
            className="p-2 rounded-lg border border-green-200 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white shadow"
            placeholder="Add a task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
          />
          <button
            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition"
            onClick={addTask}
          >
            <HiOutlinePlus className="w-5 h-5" /> Add
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-50/80 to-blue-50/70 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-lg p-6">
        <ul className="space-y-4">
          {tasks.map((task, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <button
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition ${task.done
                      ? "bg-green-600 border-green-600"
                      : "bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-800"
                    }`}
                  onClick={() => toggleDone(i)}
                  aria-label="Toggle done"
                >
                  {task.done && <HiOutlineCheckCircle className="w-5 h-5 text-white" />}
                </button>
                <span className={`text-lg font-medium ${task.done ? "line-through text-gray-400" : "text-gray-900 dark:text-white"}`}>
                  {task.title}
                </span>
              </div>
              <button
                className="text-red-600 hover:text-red-800 font-bold ml-4"
                onClick={() => removeTask(i)}
                aria-label="Remove task"
              >
                <HiOutlineTrash className="w-5 h-5" />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
