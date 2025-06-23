import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/chat", label: "Chat" },
  { to: "/processing", label: "Processing" },
  { to: "/image-analysis", label: "Image Analysis" },
  { to: "/plugins", label: "Plugins" },
  { to: "/privacy", label: "Privacy" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sign out handler (replace with your real logic)
  const handleSignOut = () => {
    setShowDropdown(false);
    alert("Signed out! (Replace with your real sign-out logic)");
    // You can also navigate to a login page:
    // navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-8 md:px-12 lg:px-16 py-5 bg-white dark:bg-gray-900 shadow-sm transition-all duration-200">
      {/* Logo Section */}
      <div className="flex items-center gap-5 text-gray-900 dark:text-white">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <g clipPath="url(#clip0_6_330)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                fill="white"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_330">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Lumina
        </h2>
      </div>

      {/* Navigation Section */}
      <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-12">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-2xl p-2 shadow-inner">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${location.pathname === link.to
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md transform scale-105"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation Toggle (you can implement this later) */}
      <div className="lg:hidden">
        <button className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Bell (optional addition) */}
        <button className="hidden md:flex items-center justify-center w-11 h-11 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5M15 17l-3.5-3.5M15 17H9a6 6 0 010-12h3m6 6v6a3 3 0 11-6 0v-6" />
          </svg>
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgaOl4wXNGY9eRnEEG-FZENiIWurpMoNosQqxfC-320WOe8aEIFjtlhPOTY8jgAAeUFfOzTNWcG8mmm99WmTTkvdtkJWb3_5dSAbTR00E8_mE3hatDzq2-UFO1R6raZwneTp-cC5Dckkx8U1zKV5cMBc8HbCVBH5w2izsSeaYWJ3ste1jtL1sLWvrbFS4q1imFrtDlJilZ2QGNLJQyklpVNLDmvGYQA0gu7IQBH9Jiye7DGYX1QYZTc2ShwXXUsNqLHPP3iPLRduOP"
              alt="User avatar"
              className="w-12 h-12 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700 shadow-md group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-200"
            />
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Lumina User</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">user@email.com</div>
            </div>
            <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Enhanced Dropdown Menu */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-16 z-50 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgaOl4wXNGY9eRnEEG-FZENiIWurpMoNosQqxfC-320WOe8aEIFjtlhPOTY8jgAAeUFfOzTNWcG8mmm99WmTTkvdtkJWb3_5dSAbTR00E8_mE3hatDzq2-UFO1R6raZwneTp-cC5Dckkx8U1zKV5cMBc8HbCVBH5w2izsSeaYWJ3ste1jtL1sLWvrbFS4q1imFrtDlJilZ2QGNLJQyklpVNLDmvGYQA0gu7IQBH9Jiye7DGYX1QYZTc2ShwXXUsNqLHPP3iPLRduOP"
                    alt="User avatar"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white dark:border-gray-800 shadow-md"
                  />
                  <div>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">Lumina User</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">user@email.com</div>
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Online
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-3">
                {[
                  { to: "/dashboard", label: "Dashboard", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" },
                  { to: "/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
                  { to: "/profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-4 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-150 group"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Sign Out Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-4 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-150 group font-medium"
                >
                  <div className="w-5 h-5">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
