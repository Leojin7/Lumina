import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";

export default function Notes() {
  const [notes, setNotes] = useState([
    { title: "Welcome to Lumina!", content: "This is your first note.", date: "2025-06-23" }
  ]);
  const [newNote, setNewNote] = useState("");
  const [showInput, setShowInput] = useState(false);

  function addNote() {
    if (!newNote.trim()) return;
    setNotes([
      { title: newNote.slice(0, 32), content: newNote, date: new Date().toISOString().slice(0, 10) },
      ...notes
    ]);
    setNewNote("");
    setShowInput(false);
  }

  function removeNote(index) {
    setNotes(notes.filter((_, i) => i !== index));
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
          <HiOutlinePencilAlt className="w-8 h-8 text-purple-500" />
          Notes
        </h1>
        <button
          className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-full font-bold shadow-lg hover:bg-purple-700 transition"
          onClick={() => setShowInput(v => !v)}
        >
          <HiOutlinePlus className="w-5 h-5" /> New Note
        </button>
      </div>
      {showInput && (
        <div className="mb-6">
          <textarea
            className="w-full p-3 rounded-lg border border-purple-200 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white shadow"
            rows={3}
            placeholder="Write your note..."
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
          />
          <button
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            onClick={addNote}
          >
            Save Note
          </button>
        </div>
      )}
      <div className="grid gap-6">
        {notes.map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gradient-to-br from-purple-50/80 to-blue-50/70 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-lg p-6"
          >
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">{note.title}</div>
            <div className="text-gray-700 dark:text-gray-200 mb-2">{note.content}</div>
            <div className="text-xs text-gray-400">{note.date}</div>
            <button
              className="mt-3 px-4 py-1 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
              onClick={() => removeNote(i)}
            >
              Remove
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
