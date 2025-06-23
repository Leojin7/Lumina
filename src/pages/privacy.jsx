import React, { useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

export default function PrivacyControls() {
  const [personalization, setPersonalization] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Privacy Dashboard</h1>
      <p className="text-blue-600 mb-8 text-sm font-medium cursor-pointer hover:underline">
        Manage your personal data and privacy settings
      </p>

      {/* Data Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Data Overview</h2>
        <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <div className="flex justify-between px-6 py-4">
            <span className="text-gray-600">Total Data Stored</span>
            <span className="text-gray-900 font-medium">5.2 GB</span>
          </div>
          <div className="flex justify-between px-6 py-4">
            <span className="text-gray-600">Data Last Updated</span>
            <span className="text-gray-900 font-medium">July 20, 2024</span>
          </div>
          <div className="flex justify-between px-6 py-4">
            <span className="text-gray-600">Account Creation Date</span>
            <span className="text-gray-900 font-medium">January 15, 2023</span>
          </div>
        </div>
      </section>

      {/* Data Management */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Data Management</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium text-gray-900">Export Data</div>
            <div className="text-blue-600 text-sm hover:underline cursor-pointer">
              Download a copy of all your data stored with Lumina
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-semibold text-sm">
            Export
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">Delete Account</div>
            <div className="text-blue-600 text-sm hover:underline cursor-pointer">
              Delete all data associated with your account
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-red-600 font-semibold text-sm">
            Delete
          </button>
        </div>
      </section>

      {/* Privacy Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Privacy Settings</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium text-gray-900">Personalization</div>
            <div className="text-blue-600 text-sm hover:underline cursor-pointer">
              Control how Lumina uses your data to personalize your experience
            </div>
          </div>
          {/* Toggle Switch */}
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${personalization ? "bg-blue-600" : "bg-gray-200"
              }`}
            onClick={() => setPersonalization(v => !v)}
            aria-label="Toggle personalization"
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-300 ${personalization ? "translate-x-6" : ""
                }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium text-gray-900">Communication Preferences</div>
            <div className="text-blue-600 text-sm hover:underline cursor-pointer">
              Manage your communication preferences
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-semibold text-sm">
            Manage
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">Connected Apps</div>
            <div className="text-blue-600 text-sm hover:underline cursor-pointer">
              View and manage your connected apps and services
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-semibold text-sm">
            Manage
          </button>
        </div>
      </section>
    </div>
  );
}
