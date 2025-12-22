// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Navbar = ({ user, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 uppercase tracking-wide transition-all duration-300
     ${
       isActive
         ? "text-cyan-400 font-semibold bg-cyan-400/10 rounded-md after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-cyan-400 after:shadow-[0_0_8px_#00F6FF]"
         : "text-slate-300 hover:text-cyan-400"
     }`;

  return (
    <nav className="bg-[#05070F]/80 backdrop-blur-md border-b border-cyan-400/20 shadow-[0_0_20px_#00E5FF44] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_#00F6FF]"
        >
          Digital Life Lessons
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/dashboard/add-lesson" className={navLinkClass}>Add Lesson</NavLink>
          <NavLink to="/dashboard/my-lessons" className={navLinkClass}>My Lessons</NavLink>
          <NavLink to="/public-lessons" className={navLinkClass}>Public Lessons</NavLink>
          <NavLink to="/dashboard/favourites" className={navLinkClass}>My Favourites</NavLink>
          <NavLink to="/dashboard/dashboardhome" className={navLinkClass}>Dashboard</NavLink>
          
          {/* ✅ Admin Only Desktop Links (Updated to match Nested Routes in App.jsx) */}
          
          {user && user.role === "admin" && (
            <>
              <NavLink to="/dashboard/admin" end className={navLinkClass}>Admin Home</NavLink>
              <NavLink to="/dashboard/admin/users" className={navLinkClass}>Manage Users</NavLink>
              <NavLink to="/dashboard/admin/lessons" className={navLinkClass}>Manage Lessons</NavLink>
            </>
          )}

          {user && !user.isPremium && (
            <NavLink to="/pricing" className={navLinkClass}>Upgrade</NavLink>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black rounded-lg font-bold shadow-[0_0_10px_#00E5FFaa]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-400 hover:text-black transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                onClick={toggleDropdown}
                className="w-11 h-11 rounded-full border-2 border-cyan-400 cursor-pointer shadow-[0_0_15px_#00F6FF77]"
                alt="user"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0A0F1F]/90 rounded-xl shadow-[0_0_20px_#00E5FF55] border border-cyan-400/30 backdrop-blur-md">
                  <p className="px-4 py-2 text-cyan-300 font-semibold border-b border-cyan-400/20">
                    {user.displayName}
                  </p>

                  {[
                    { to: "/", label: "Home" },
                    { to: "/dashboard/profile", label: "Profile" },
                    { to: "/dashboard/add-lesson", label: "Add Lesson" },
                    { to: "/dashboard/my-lessons", label: "My Lessons" },
                    { to: "/dashboard/favourites", label: "My Favourites" },
                    { to: "/public-lessons", label: "Public Lessons" },
                    { to: "/dashboard/dashboardhome", label: "Dashboard" },
                   
                    ...(user.role === "admin" ? [
                      { to: "/dashboard/admin", label: "Admin Panel" },
                      { to: "/dashboard/admin/users", label: "Manage Users" },
                      { to: "/dashboard/admin/reports", label: "Reported Lessons" }
                    ] : []),
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="block px-4 py-2 text-slate-300 hover:bg-[#0D152A] hover:text-cyan-300"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {user && !user.isPremium && (
                    <Link
                      to="/pricing"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-green-400 font-bold hover:bg-[#0D152A]"
                    >
                      Upgrade Account
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      toast.success("Logged out successfully!");
                      closeMenus();
                    }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#0D152A] border-t border-cyan-400/20"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-cyan-300">
          <button onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070B15]/90 border-t border-cyan-300/20 backdrop-blur-lg">
          {[
            { to: "/", label: "Home" },
            { to: "/dashboard/add-lesson", label: "Add Lesson" },
            { to: "/dashboard/my-lessons", label: "My Lessons" },
            { to: "/public-lessons", label: "Public Lessons" },
            { to: "/dashboard/dashboardhome", label: "Dashboard" },
            
            ...(user?.role === "admin" ? [
              { to: "/dashboard/admin", label: "Admin Panel" },
              { to: "/dashboard/admin/users", label: "Manage Users" },
              { to: "/dashboard/admin/reports", label: "Reported Lessons" }
            ] : []),
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenus}
              className={({ isActive }) =>
                `block px-6 py-3 transition ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-300 border-l-4 border-cyan-400"
                    : "text-slate-300 hover:bg-[#0D152A] hover:text-cyan-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={closeMenus}
                className="block px-6 py-3 text-cyan-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenus}
                className="block px-6 py-3 text-cyan-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                toast.success("Logged out successfully!");
                closeMenus();
              }}
              className="block w-full text-left px-6 py-3 text-red-400"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;