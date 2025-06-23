import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import useTheme from "../hooks/useTheme";

export default function ThemeToggleButton() {
  const [theme, toggleTheme] = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <HiOutlineSun className="w-5 h-5" /> Light Mode
        </>
      ) : (
        <>
          <HiOutlineMoon className="w-5 h-5" /> Dark Mode
        </>
      )}
    </button>
  );
}
