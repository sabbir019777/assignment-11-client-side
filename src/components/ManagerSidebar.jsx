import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaChartLine, FaUsersCog, FaFileAlt, FaUserCircle, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const ManagerSidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard Home",
      path: "/dashboard/manager",
      icon: <FaChartLine />,
    },
    {
      name: "Team Management",
      path: "/dashboard/manager/team", 
      icon: <FaUsersCog />,
    },
    {
      name: "Performance Reports",
      path: "/dashboard/manager/reports", 
      icon: <FaFileAlt />,
    },
    {
      name: "My Profile",
      path: "/dashboard/profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-[#1e1b2c] border-r border-purple-500/30 text-white transition-all duration-300 z-50">
      <div className="p-6 flex flex-col h-full">
        {/* Logo Section */}
        <div className="mb-10 text-center">
          <h2 className="hidden md:block text-xl font-bold text-purple-400 tracking-widest uppercase">
            Manager Pro
          </h2>
          <div className="md:hidden text-2xl text-purple-400 font-bold">M</div>
        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 space-y-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600 shadow-lg shadow-purple-500/40 text-white"
                    : "text-gray-400 hover:bg-purple-500/10 hover:text-purple-300"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:block font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto space-y-4 border-t border-gray-700 pt-6">
          <Link
            to="/"
            className="flex items-center gap-4 p-3 text-gray-400 hover:text-cyan-400 transition"
          >
            <FaHome className="text-xl" />
            <span className="hidden md:block font-medium">Back to Home</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="hidden md:block font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerSidebar;