import React, { useState } from "react";

const featured = [
  {
    title: "Productivity Boost",
    desc: "Enhance your productivity with these essential plugins.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Creative Tools",
    desc: "Unleash your creativity with these powerful tools.",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Communication Hub",
    desc: "Streamline your communication with these integrations.",
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80"
  }
];

const categories = [
  "Productivity", "Creativity", "Communication", "Education", "Entertainment", "Finance", "Health & Fitness", "Utilities"
];

const allPlugins = [
  {
    name: "Task Manager",
    desc: "Integrate your favorite task management tool.",
    category: "Productivity",
    rating: 4.5,
    installs: "10K+"
  },
  {
    name: "Note Taker",
    desc: "Seamlessly sync your notes across devices.",
    category: "Productivity",
    rating: 4.2,
    installs: "8K+"
  },
  {
    name: "Creative Suite",
    desc: "Access a suite of creative tools for design and editing.",
    category: "Creativity",
    rating: 4.8,
    installs: "5K+"
  },
  {
    name: "Communication Hub",
    desc: "Manage all your communication channels in one place.",
    category: "Communication",
    rating: 4.0,
    installs: "7K+"
  },
  {
    name: "Learning Platform",
    desc: "Access educational resources and courses.",
    category: "Education",
    rating: 4.6,
    installs: "3K+"
  }
];

export default function PluginMarketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredPlugins = allPlugins.filter(
    p =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedCategory || p.category === selectedCategory)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-6">
        <nav className="flex flex-col gap-1">
          <SidebarLink label="Overview" />
          <SidebarLink label="Installed" />
          <SidebarLink label="Browse" active />
          <SidebarLink label="My Plugins" />
          <SidebarLink label="Settings" />
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 px-10 py-8">
        <h1 className="text-3xl font-bold mb-1 text-gray-900">Browse Plugins</h1>
        <p className="text-gray-500 mb-8">Explore and install plugins to enhance Lumina’s capabilities.</p>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search plugins"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900"
          />
        </div>
        {/* Featured */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Featured</h2>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {featured.map((f, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-6 min-w-[260px] max-w-xs flex-shrink-0 shadow border border-blue-100">
                <img src={f.img} alt={f.title} className="w-20 h-28 object-cover mx-auto rounded-lg mb-4" />
                <div className="text-lg font-bold mb-1 text-gray-900">{f.title}</div>
                <div className="text-gray-600 text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* All Plugins Table */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-500 text-sm font-semibold border-b">
                <th className="py-3 px-4 text-left">Plugin</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Installs</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlugins.map((p, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="py-3 px-4 font-medium text-gray-900">{p.name}</td>
                  <td className="py-3 px-4 text-gray-700">{p.desc}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">{p.category}</td>
                  <td className="py-3 px-4">{p.rating}</td>
                  <td className="py-3 px-4">{p.installs}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:underline font-semibold">Install</button>
                  </td>
                </tr>
              ))}
              {filteredPlugins.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">No plugins found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors cursor-pointer mb-1 ${active
          ? "bg-blue-50 text-blue-700 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      {label}
    </div>
  );
}
