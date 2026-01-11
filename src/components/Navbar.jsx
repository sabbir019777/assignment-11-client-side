// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaConnectdevelop, FaSun, FaMoon } from "react-icons/fa"; 
import { toast } from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext"; 

const Navbar = ({ user, logout }) => {
  const { theme, toggleTheme } = useTheme(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const masterAdminEmail = "admins@gmail.com";
  const managerEmail = "manager@gmail.com";

 
  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.email === masterAdminEmail || user.role === "admin") return "/dashboard/admin";
    if (user.email === managerEmail || user.role === "manager") return "/dashboard/manager";
    return "/dashboard/dashboardhome";
  };

  const forceScrollTop = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    forceScrollTop();
  }, [pathname]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 uppercase tracking-wide transition-all duration-300 text-base font-bold italic
     ${
       isActive
         ? "text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-400/10 rounded-md after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-cyan-600 dark:after:bg-cyan-400"
         : "text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
     }`;

  return (
    <nav className="bg-white/90 dark:bg-[#05070F]/80 backdrop-blur-md border-b border-gray-200 dark:border-cyan-400/20 shadow-md dark:shadow-[0_0_20px_#00E5FF44] sticky top-0 z-50 w-full transition-colors duration-300">
      <div className="w-full max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* --- Logo --- */}
        <Link
          to="/"
          onClick={forceScrollTop} 
          className="flex items-center gap-2 text-2xl font-bold italic bg-gradient-to-r from-cyan-600 to-fuchsia-600 dark:from-cyan-400 dark:to-fuchsia-500 text-transparent bg-clip-text drop-shadow-sm dark:drop-shadow-[0_0_10px_#00F6FF]"
        >
          <FaConnectdevelop className="text-cyan-600 dark:text-cyan-400 text-3xl" />
          Digital Life Lessons
        </Link>

        {/* --- Desktop Menu --- */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink to="/" onClick={forceScrollTop} className={navLinkClass}>Home</NavLink>
          <NavLink to="/public-lessons" onClick={forceScrollTop} className={navLinkClass}>Public Lessons</NavLink>

          {!user && (
            <NavLink to="/about" onClick={forceScrollTop} className={navLinkClass}>About</NavLink>
          )}

          {user && (
            <>
              <NavLink to="/dashboard/add-lesson" onClick={forceScrollTop} className={navLinkClass}>Add Lesson</NavLink>
              <NavLink to="/dashboard/my-lessons" onClick={forceScrollTop} className={navLinkClass}>My Lessons</NavLink>
              <NavLink to="/dashboard/favourites" onClick={forceScrollTop} className={navLinkClass}>My Favourites</NavLink>
             
              <NavLink to={getDashboardLink()} onClick={forceScrollTop} className={navLinkClass}>Dashboard</NavLink>
            </>
          )}

          {user && !user.isPremium && (
            <NavLink to="/pricing" onClick={forceScrollTop} className={navLinkClass}>Upgrade</NavLink>
          )}
        </div>

        {/* --- Right Side --- */}
        <div className="hidden lg:flex items-center space-x-4">
          
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-yellow-500 dark:text-cyan-400 hover:scale-110 transition-transform shadow-md border border-gray-200 dark:border-white/10"
            title="Toggle Theme"
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {!user ? (
            <>
              <Link to="/login" onClick={forceScrollTop} className="px-6 py-2.5 text-base bg-gradient-to-r from-cyan-500 to-fuchsia-600 dark:from-cyan-400 dark:to-fuchsia-500 text-white dark:text-black rounded-lg font-bold italic shadow-lg hover:opacity-90 transition">
                Login
              </Link>
              <Link to="/register" onClick={forceScrollTop} className="px-6 py-2.5 text-base border border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-300 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-black transition font-bold italic">
                Signup
              </Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                onClick={toggleDropdown}
                className="w-12 h-12 rounded-full border-2 border-cyan-500 dark:border-cyan-400 cursor-pointer object-cover shadow-md"
                alt="user"
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0A0F1F] rounded-xl shadow-2xl border border-gray-200 dark:border-cyan-400/40 overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-cyan-400/20 bg-gray-50 dark:bg-cyan-400/5">
                    <p className="text-gray-800 dark:text-cyan-300 font-bold text-lg italic truncate">{user.displayName}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400 italic truncate">{user.email}</p>
                  </div>

                  <div className="py-2">
                    <Link to="/" onClick={forceScrollTop} className="block px-5 py-3 text-base text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-cyan-400/10 transition italic">Home</Link>
                    <Link to="/dashboard/profile" onClick={forceScrollTop} className="block px-5 py-3 text-base text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-cyan-400/10 transition italic">Profile</Link>
                    <Link to={getDashboardLink()} onClick={forceScrollTop} className="block px-5 py-3 text-base text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-cyan-400/10 transition italic">Dashboard</Link>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      toast.success("Logged out successfully!");
                      forceScrollTop();
                    }}
                    className="w-full text-left px-5 py-4 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 border-t border-gray-200 dark:border-cyan-400/20 font-bold text-base italic transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- Mobile Menu Toggle --- */}
        <div className="lg:hidden flex items-center gap-4 z-50">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-yellow-500 dark:text-cyan-400 border border-gray-300 dark:border-white/10">
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button onClick={toggleMobileMenu} className="p-2 text-cyan-600 dark:text-cyan-300">
            {mobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#070B15]/95 border-b border-gray-200 dark:border-cyan-400/30 backdrop-blur-xl shadow-2xl flex flex-col py-6">
          <NavLink to="/" onClick={forceScrollTop} className={navLinkClass}>Home</NavLink>
          <NavLink to="/public-lessons" onClick={forceScrollTop} className={navLinkClass}>Public Lessons</NavLink>
          {user && (
            <NavLink to={getDashboardLink()} onClick={forceScrollTop} className={navLinkClass}>Dashboard</NavLink>
          )}
          <div className="mt-6 px-6 space-y-4">
            {!user ? (
              <Link to="/login" onClick={forceScrollTop} className="block w-full py-3 text-center text-white bg-cyan-500 rounded-lg font-bold italic">Login</Link>
            ) : (
              <button onClick={() => { logout(); toast.success("Logged out successfully!"); forceScrollTop(); }} className="block w-full py-3 text-center text-red-500 border border-red-400/30 rounded-lg font-bold italic">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;