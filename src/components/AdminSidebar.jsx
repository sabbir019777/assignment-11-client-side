import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
import { 
  RiDashboard3Line, 
  RiUserSettingsLine, 
  RiBookOpenLine, 
  RiFlagLine, 
  RiUserLine, 
  RiLogoutBoxRLine,
  RiShieldFlashLine,
  RiMenu4Line, 
  RiCloseLine  
} from "react-icons/ri";
import toast from "react-hot-toast";

const AdminSidebar = () => {
  const { user, logout, loading } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/admin", icon: <RiDashboard3Line /> },
    { name: "Manage Users", path: "/dashboard/admin/users", icon: <RiUserSettingsLine /> },
    { name: "Lessons Control", path: "/dashboard/admin/lessons", icon: <RiBookOpenLine /> },
    { name: "Reported", path: "/dashboard/admin/reports", icon: <RiFlagLine /> },
    { name: "Admin Profile", path: "/dashboard/admin/profile", icon: <RiUserLine /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("System Access Terminated");
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  if (loading) return null;

  // অ্যাডমিন চেক এবং লগআউট করলে যেন অদৃশ্য হয়ে যায় সেই লজিক
  const masterAdminEmail = "admins@gmail.com";
  const isAdmin = user && (user.role === "admin" || user.email === masterAdminEmail);

  if (!user || !isAdmin) return null;

  return (
    <>
      {/* মোবাইল টগল বাটন - Hamburger/Cross কালার সায়ান করা হয়েছে */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-[60] md:hidden p-2.5 bg-white/10 border border-white/20 rounded-xl text-[#40E0D0] active:scale-95 transition-all shadow-lg"
      >
        {isMobileOpen ? (
          <RiCloseLine size={22} className="text-gray-black" />
        ) : (
          <RiMenu4Line size={22} className="text-red-950" />
        )}
      </button>

      {/* মোবাইল ওভারলে */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden transition-opacity duration-300"
        />
      )}

      {/* মেইন সাইডবার কন্টেইনার */}
      <div className={`
        fixed z-50 flex group h-[calc(100vh-32px)]
        top-4 bottom-4 
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        
        /* মোবাইল মোড */
        ${isMobileOpen ? 'left-4' : '-left-[120%]'} 
        w-64 

        /* ডেক্সটপ স্লিম মোড */
        md:left-4 
        md:w-16 
        md:hover:w-64 
      `}>
        
        <div className="relative w-full h-full bg-[#0a0f18]/15 border border-white/10 rounded-[2rem] flex flex-col shadow-lg overflow-hidden hover:bg-[#0a0f18]/30 transition-all duration-700">
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#40E0D0]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* লোগো সেকশন */}
          <div className="h-20 flex items-center px-3 shrink-0">
            <div className="relative min-w-[38px] h-[38px] flex justify-center items-center bg-[#40E0D0]/10 rounded-xl border border-white/20 shadow-md">
                <RiShieldFlashLine className="text-xl text-[#40E0D0] animate-pulse" />
            </div>
            <div className="ml-4 flex flex-col md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
              {/* Digital লোগো কালার সায়ান করা হয়েছে */}
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#40E0D0] uppercase">Digital</span>
              <h2 className="text-base font-black tracking-tighter text-white whitespace-nowrap drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                Life <span className="text-[#40E0D0]">Lessons</span>
              </h2>
            </div>
          </div>

          {/* ন্যাভিগেশন লিংকস */}
          <nav className="flex-1 px-2 space-y-1.5 overflow-y-auto no-scrollbar relative">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`group/item flex items-center h-11 rounded-xl transition-all duration-500 relative overflow-hidden ${
                    isActive 
                    ? "bg-[#40E0D0]/25 text-white border-l-4 border-[#40E0D0]" 
                    : "text-gray-200 hover:text-white hover:bg-[#40E0D0]/10 border-l-4 border-transparent"
                  }`}
                >
                  <div className={`min-w-[42px] flex justify-center text-xl transition-all duration-500 ${isActive ? 'text-[#40E0D0] scale-110' : 'group-hover/item:text-[#40E0D0] group-hover/item:scale-110'}`}>
                    {item.icon}
                  </div>
                  <span className={`ml-3 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${isActive ? 'text-white' : 'group-hover/item:text-[#40E0D0]'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* লগআউট সেকশন */}
          <div className="p-2.5 mt-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="relative w-full h-11 flex items-center group/btn overflow-hidden rounded-xl transition-all duration-300 bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/40"
            >
              <div className="relative min-w-[42px] flex justify-center items-center">
                <RiLogoutBoxRLine className="relative text-lg text-red-400 group-hover/btn:text-red-500 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
              </div>
              <div className="flex flex-col items-start md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ml-2">
                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-red-400 leading-none group-hover/btn:text-red-500">
                  Terminate
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminSidebar;