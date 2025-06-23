import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWithLumina() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      setHistory([...history, { sender: "user", text: message }]);
      setMessage("");

      setTimeout(() => {
        setHistory(h => [...h, {
          sender: "lumina",
          text: "Lumina's AI response to: " + message
        }]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="flex flex-col items-center pt-10 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Chat with Lumina
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 mb-8"
      >
        Ask anything, or explore our examples below
      </motion.p>

      <div className="w-full bg-white rounded-xl shadow-xl p-6 mb-8">
        <div className="h-96 overflow-y-auto mb-4 p-2">
          <AnimatePresence>
            {history.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: msg.sender === "user" ? 100 : -100 }}
                className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <div className={`inline-block px-4 py-2 rounded-2xl max-w-md ${msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <motion.div layout className="flex gap-3">
          <motion.textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />

          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setMessage(""); setHistory([]); }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold"
            >
              Clear
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-bold"
            >
              Send
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
