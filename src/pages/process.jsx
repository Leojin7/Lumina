import React from "react";

export default function Processing() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Listening...</h2>
      <p className="mb-2 text-base font-medium">Processing your request</p>
      <div className="w-1/2 bg-gray-200 rounded h-2 mb-4">
        <div className="bg-[#111418] h-2 rounded" style={{ width: "50%" }}></div>
      </div>
      <p className="text-gray-500 text-center">Please speak clearly and concisely. Lumina is actively listening and will process your request as soon as you finish speaking.</p>
    </div>
  );
}
