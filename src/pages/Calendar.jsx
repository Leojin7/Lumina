import React from "react";
import { motion } from "framer-motion";
import { HiOutlineCalendar, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = new Date();

export default function Calendar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <div className="bg-gradient-to-br from-blue-50/80 to-purple-100/70 dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HiOutlineCalendar className="w-8 h-8 text-blue-500" />
            Calendar
          </h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 shadow">
              <HiOutlineChevronLeft className="w-6 h-6 text-gray-500" />
            </button>
            <button className="p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 shadow">
              <HiOutlineChevronRight className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(day => (
            <div key={day} className="text-center text-gray-500 font-semibold">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              className={`h-16 flex items-center justify-center rounded-xl cursor-pointer transition border border-transparent
                ${i + 1 === today.getDate() ? "bg-blue-600 text-white font-bold shadow-lg" : "bg-white/80 dark:bg-gray-900/80 hover:bg-blue-50 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200"}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
