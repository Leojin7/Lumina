import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineUpload, HiOutlinePlus } from "react-icons/hi";

export default function Files() {
  const [files, setFiles] = useState([
    { name: "Resume.pdf", size: "120 KB", date: "2025-06-20" }
  ]);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setFiles([{ name: file.name, size: `${Math.round(file.size / 1024)} KB`, date: new Date().toISOString().slice(0, 10) }, ...files]);
    }
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
          <HiOutlineUpload className="w-8 h-8 text-pink-500" />
          Files
        </h1>
        <label className="flex items-center gap-2 px-5 py-2 bg-pink-600 text-white rounded-full font-bold shadow-lg hover:bg-pink-700 transition cursor-pointer">
          <HiOutlinePlus className="w-5 h-5" /> Upload
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>
      <div className="bg-gradient-to-br from-pink-50/80 to-blue-50/70 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-lg p-6">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm font-semibold border-b">
              <th className="py-3 px-4 text-left">File Name</th>
              <th className="py-3 px-4 text-left">Size</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => (
              <tr key={i} className="border-b last:border-b-0">
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{file.name}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{file.size}</td>
                <td className="py-3 px-4 text-gray-400">{file.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
