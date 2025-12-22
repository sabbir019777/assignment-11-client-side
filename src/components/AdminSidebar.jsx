import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
import { 
  RiDashboard3Line, 
  RiUserSettingsLine, 
  RiBookOpenLine, 
  RiFlagLine, 
  RiUserLine, 
  RiLogoutBoxRLine,
  RiShieldFlashLine
} from "react-icons/ri";
import toast from "react-hot-toast";

const AdminSidebar = () => {
  const { logout } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="fixed left-4 top-4 bottom-4 z-50 flex group">
      
      <div className="relative w-20 group-hover:w-72 h-full bg-[#0a0f18]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Futuristic Background Glow */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#40E0D0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* ১. লোগো সেকশন */}

        <div className="h-28 flex items-center px-6 shrink-0">
          <div className="relative min-w-[48px] h-12 flex justify-center items-center bg-gradient-to-tr from-[#40E0D0]/20 to-transparent rounded-xl border border-[#40E0D0]/30 shadow-[0_0_15px_rgba(64,224,208,0.2)]">
             <RiShieldFlashLine className="text-2xl text-[#40E0D0] animate-pulse" />
          </div>
          <div className="ml-5 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <span className="text-xs font-bold tracking-[0.3em] text-[#40E0D0]/60 uppercase">Digital</span>
            <h2 className="text-xl font-black tracking-tighter text-white">
              Life <span className="text-[#40E0D0] drop-shadow-[0_0_8px_#40E0D0]">Lessons</span>
            </h2>
          </div>
        </div>

        {/* ২. ন্যাভিগেশন লিংকস */}

        <nav className="flex-1 px-3 space-y-2 overflow-y-auto no-scrollbar relative">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group/item flex items-center h-14 rounded-2xl transition-all duration-500 relative overflow-hidden ${
                  isActive 
                  ? "bg-gradient-to-r from-[#40E0D0]/20 to-transparent text-[#40E0D0] border-l-4 border-[#40E0D0]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                }`}
              >
                <div className={`min-w-[64px] flex justify-center text-2xl transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover/item:scale-110'}`}>
                  {item.icon}
                </div>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">
                  {item.name}
                </span>
                {isActive && (
                  <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-[#40E0D0]/10 to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ৩. লগআউট সেকশন (নিচে প্যাডিং দিয়ে সাজানো) */}

        <div className="p-4 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className="relative w-full h-14 flex items-center group/btn overflow-hidden rounded-2xl transition-all duration-300 bg-gradient-to-r from-red-500/5 to-transparent hover:from-red-500/20 border border-red-500/10 hover:border-red-500/40"
          >
            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover/btn:h-8 bg-red-500 transition-all duration-300 shadow-[0_0_15px_#ef4444]" />
            <div className="relative min-w-[56px] flex justify-center items-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 group-hover/btn:scale-150 transition-all duration-500">
                  <RiLogoutBoxRLine className="text-red-500/20 blur-[2px]" />
              </div>
              <RiLogoutBoxRLine className="relative text-xl text-red-500 transition-transform duration-300 group-hover/btn:rotate-12" />
            </div>
            <div className="flex flex-col items-start opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 leading-none">
                Terminate
              </span>
              <span className="text-[8px] font-medium text-red-400/50 uppercase tracking-tighter mt-1">
                System Access
              </span>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all">
               <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminSidebar;