import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: "📊" },
    { title: "My Matches", path: "/my-matches", icon: "👤" },
    { title: "My Requests", path: "/my-requests", icon: "✉️" },
    { title: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-blue">SkillSwap</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 hover:bg-gray-light transition-colors ${
                isActive ? "bg-gray-light border-r-4 border-blue" : ""
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
