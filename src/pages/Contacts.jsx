import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineUserGroup, HiOutlinePlus } from "react-icons/hi";

export default function Contacts() {
  const [contacts, setContacts] = useState([
    { name: "Sundar Pichai", email: "sundar@google.com" }
  ]);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function addContact() {
    if (!name.trim() || !email.trim()) return;
    setContacts([{ name, email }, ...contacts]);
    setName(""); setEmail(""); setShowInput(false);
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
          <HiOutlineUserGroup className="w-8 h-8 text-blue-500" />
          Contacts
        </h1>
        <button
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition"
          onClick={() => setShowInput(v => !v)}
        >
          <HiOutlinePlus className="w-5 h-5" /> Add
        </button>
      </div>
      {showInput && (
        <div className="mb-6 flex gap-3">
          <input
            className="flex-1 p-3 rounded-lg border border-blue-200 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white shadow"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="flex-1 p-3 rounded-lg border border-blue-200 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white shadow"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            onClick={addContact}
          >
            Save
          </button>
        </div>
      )}
      <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/70 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-lg p-6">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm font-semibold border-b">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{c.name}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
