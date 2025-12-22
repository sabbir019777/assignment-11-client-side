// src/components/AdminLayout.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth"; 
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  const { user, loading } = useAuth();


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#01040D]">
        <div className="w-16 h-16 border-4 border-[#40E0D0] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_#40E0D0]"></div>
        <p className="text-[#40E0D0] font-black uppercase tracking-[0.3em] animate-pulse text-xs">
          Initializing Systems...
        </p>
      </div>
    );
  }


  const masterAdminEmail = "admins@gmail.com"; 

  const isAdmin = user && (user.role === "admin" || user.email === masterAdminEmail);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#01040D] overflow-hidden">
      


      <AdminSidebar />

 
      <main className="flex-1 ml-64 h-screen overflow-y-auto relative scrollbar-hide">
        

        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#40E0D0]/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-[#FF00FF]/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

       
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
           <Outlet />
        </div>
        
      </main>

    </div>
  );
};

export default AdminLayout;