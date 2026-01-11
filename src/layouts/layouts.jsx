import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, PlusSquare, BookOpen, UserCircle, LogOut, ChevronRight, Menu, X, Users, ClipboardList } from "lucide-react";
import useAuth from "../hooks/useAuth";

const UserLayout = () => {
    const { logOut, user } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

   
    const isManager = user && user.email === "manager@gmail.com";


    const userMenus = [
        { name: "Dashboard", path: "/dashboard/dashboardhome", icon: <LayoutDashboard size={24} /> },
        { name: "Add Lesson", path: "/dashboard/add-lesson", icon: <PlusSquare size={24} /> },
        { name: "My Lessons", path: "/dashboard/my-lessons", icon: <BookOpen size={24} /> },
        { name: "Profile", path: "/dashboard/profile", icon: <UserCircle size={24} /> },
    ];


    const managerMenus = [
        { name: "Manager Home", path: "/dashboard/manager", icon: <LayoutDashboard size={24} /> },
        { name: "Team Management", path: "/dashboard/manager/team", icon: <Users size={24} /> },
        { name: "Reports", path: "/dashboard/manager/reports", icon: <ClipboardList size={24} /> },
        { name: "Profile", path: "/dashboard/profile", icon: <UserCircle size={24} /> },
    ];


    const menus = isManager ? managerMenus : userMenus;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex min-h-screen bg-[#02040a] text-white font-sans relative overflow-hidden">
            
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-[-5%] left-[-2%] w-[45%] h-[45%] bg-cyan-500/[0.03] blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[35%] h-[35%] bg-blue-600/[0.03] blur-[100px] rounded-full"></div>
            </div>

            {/* DESKTOP SIDEBAR */}
            <aside 
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`hidden md:flex fixed left-0 top-0 h-full z-50 flex-col border-r border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
                ${isExpanded ? "w-72 bg-[#02040a]/60 shadow-[20px_0_50px_rgba(0,0,0,0.3)]" : "w-20 bg-transparent border-white/5"}
                backdrop-blur-[0px]`} 
            >
                <div className="h-24 flex items-center px-6 shrink-0 border-b border-white/10 relative overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                        <span className="text-cyan-400 font-black text-xl italic">D</span>
                    </div>
                    <h2 className={`ml-4 text-xl font-black tracking-tight whitespace-nowrap transition-all duration-500 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                        {isManager ? "MANAGER" : "DIGITAL"}<span className="text-cyan-400 italic">{isManager ? "PRO" : "LIFE"}</span>
                    </h2>
                </div>

                <nav className="flex-1 px-3 mt-8 space-y-2 overflow-hidden">
                 
                    {menus.map((menu) => (
                        <NavLink
                            key={menu.name}
                            to={menu.path}
                            className={({ isActive }) =>
                                `flex items-center h-14 px-3 rounded-2xl transition-all duration-300 group relative overflow-hidden
                                ${isActive 
                                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.05)]" 
                                    : "text-white/50 hover:text-white hover:bg-white/5"}`
                            }
                        >
                            <div className="shrink-0 flex items-center justify-center w-8">
                                {menu.icon}
                            </div>
                            <span className={`ml-4 font-bold text-sm tracking-widest uppercase whitespace-nowrap transition-all duration-500 ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                                {menu.name}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 relative overflow-hidden">
                    <button onClick={logOut} className="flex items-center w-full h-14 px-3 rounded-2xl transition-all duration-300 group hover:bg-red-500/10 text-red-500/60 hover:text-red-500">
                        <div className="shrink-0 flex items-center justify-center w-8"><LogOut size={24} /></div>
                        <div className={`ml-4 flex flex-col items-start overflow-hidden transition-all duration-500 ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                            <span className="text-xs font-black uppercase tracking-widest text-white/90">{user?.displayName?.split(" ")[0]}</span>
                            <span className="text-[10px] font-bold text-red-500 mt-0.5">Logout</span>
                        </div>
                    </button>
                </div>
            </aside>

            {/* MOBILE DROPDOWN */}
            <div className="md:hidden fixed top-4 left-4 z-[100]" ref={mobileMenuRef}>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 bg-[#0a0c14]/80 border border-white/10 rounded-xl backdrop-blur-md shadow-lg text-cyan-400 active:scale-95 transition-transform"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {isMobileMenuOpen && (
                    <div className="absolute top-16 left-0 w-64 bg-[#0a0c14]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-4">
                        <div className="flex items-center gap-3 mb-6 p-2 border-b border-white/10">
                            <div className="w-10 h-10 rounded-full border border-cyan-500/50 flex items-center justify-center bg-cyan-500/10 text-cyan-400 font-bold">
                                {user?.displayName?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{user?.displayName?.split(" ")[0]}</p>
                                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{isManager ? "Manager" : "User"}</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            {menus.map((menu) => (
                                <NavLink
                                    key={menu.name}
                                    to={menu.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-white/60 hover:text-white hover:bg-white/5"}`
                                    }
                                >
                                    {menu.icon}
                                    <span className="text-xs font-bold uppercase tracking-widest">{menu.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col transition-all duration-500 relative z-10 md:ml-20 ml-0">
                <main className="flex-1 p-4 md:p-12 pt-20 md:pt-12 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet /> 
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserLayout;