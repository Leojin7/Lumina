import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // login | signup | forgot

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl px-8 py-10 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {mode === "login" && "Sign in to Lumina"}
          {mode === "signup" && "Create your Lumina account"}
          {mode === "forgot" && "Reset your password"}
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            // Add real auth logic here
            alert("Demo only: Implement backend auth!");
          }}
        >
          {(mode === "login" || mode === "signup") && (
            <>
              <input
                type="email"
                placeholder="Email"
                required
                className="border rounded p-3 text-lg dark:bg-gray-800 dark:text-white"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="border rounded p-3 text-lg dark:bg-gray-800 dark:text-white"
              />
            </>
          )}
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="border rounded p-3 text-lg dark:bg-gray-800 dark:text-white"
            />
          )}
          {mode === "forgot" && (
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="border rounded p-3 text-lg dark:bg-gray-800 dark:text-white"
            />
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="bg-blue-600 text-white rounded p-3 font-bold text-lg hover:bg-blue-700 transition"
          >
            {mode === "login" && "Sign In"}
            {mode === "signup" && "Sign Up"}
            {mode === "forgot" && "Send Reset Link"}
          </motion.button>
        </form>
        <div className="mt-6 flex flex-col gap-2 text-center text-gray-500 dark:text-gray-300 text-sm">
          {mode === "login" && (
            <>
              <span>
                Don't have an account?{" "}
                <button className="text-blue-600 font-semibold" onClick={() => setMode("signup")}>
                  Sign up
                </button>
              </span>
              <button className="text-blue-600 font-semibold" onClick={() => setMode("forgot")}>
                Forgot password?
              </button>
            </>
          )}
          {mode === "signup" && (
            <span>
              Already have an account?{" "}
              <button className="text-blue-600 font-semibold" onClick={() => setMode("login")}>
                Sign in
              </button>
            </span>
          )}
          {mode === "forgot" && (
            <span>
              Remembered your password?{" "}
              <button className="text-blue-600 font-semibold" onClick={() => setMode("login")}>
                Sign in
              </button>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
