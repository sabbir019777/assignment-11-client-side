// src/components/DashboardSidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaClipboardList,
  FaUser,
  FaDollarSign,
  FaChartLine,
  FaCog,
  FaUsers,
  FaFlag,
  FaBars,
} from "react-icons/fa";

const DashboardSidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { name: "Dashboard Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Add Lesson", icon: <FaPlus />, path: "/dashboard/add-lesson" },
    { name: "My Lessons", icon: <FaClipboardList />, path: "/dashboard/my-lessons" },
    { name: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
    { name: "Pricing / Payment", icon: <FaDollarSign />, path: "/pricing" },
    { name: "Analytics", icon: <FaChartLine />, path: "/dashboard/analytics" },
    { name: "Settings", icon: <FaCog />, path: "/dashboard/settings" },
  ];

  const adminLinks = [
    { name: "Manage Users", icon: <FaUsers />, path: "/dashboard/admin/manage-users" },
    { name: "Manage Lessons", icon: <FaClipboardList />, path: "/dashboard/admin/manage-lessons" },
    { name: "Reported Lessons", icon: <FaFlag />, path: "/dashboard/admin/reported-lessons" },
    { name: "Admin Profile", icon: <FaUser />, path: "/dashboard/admin/profile" },
  ];

  const finalLinks = user?.role === "admin" ? [...links, ...adminLinks] : links;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50
      transition-all duration-300
      ${isOpen ? "w-72" : "w-20"}
      bg-gradient-to-b from-[#05070F] via-[#0B1230] to-[#02030A]
      border-r border-cyan-400/20
      shadow-[0_0_40px_#00E5FF22]
      backdrop-blur-xl
      flex flex-col justify-between`}
    >
      {/* ===== TOP ===== */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5">
          {isOpen && (
            <h1
              className="text-xl font-extrabold tracking-wide
              bg-gradient-to-r from-cyan-400 to-fuchsia-500
              bg-clip-text text-transparent"
            >
              Dashboard
            </h1>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl
            bg-white/5 border border-white/10
            text-cyan-300
            hover:shadow-[0_0_15px_#00E5FF77]
            hover:border-cyan-400/40
            transition"
          >
            <FaBars className={`${isOpen && "rotate-180"} transition`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex flex-col gap-2 px-3">
          {finalLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-4 py-3 rounded-2xl
                transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 text-white shadow-[0_0_25px_#00E5FF66]"
                    : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                }`
              }
            >
              {/* Active Indicator */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full
                ${
                  window.location.pathname === link.path
                    ? "bg-cyan-400 shadow-[0_0_15px_#00E5FF]"
                    : "opacity-0 group-hover:opacity-100 bg-cyan-400/40"
                }`}
              />

              <span className="text-lg">{link.icon}</span>
              {isOpen && (
                <span className="whitespace-nowrap font-medium">
                  {link.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="px-4 py-4 text-xs text-slate-400 border-t border-white/10">
        {isOpen ? "© 2025 Digital Life Lessons" : "© 2025"}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
