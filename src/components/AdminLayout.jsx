// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#01040D]">
        <div className="w-16 h-16 border-4 border-[#40E0D0] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_#40E0D0]"></div>
        <p className="text-[#40E0D0] font-black uppercase tracking-[0.3em] animate-pulse text-xs">
          Initializing System.......
        </p>
      </div>
    );
  }

  const masterAdminEmail = "admins@gmail.com"; 
  const isAdmin = user && (user.role === "admin" || user.email === masterAdminEmail);

  // যদি অ্যাডমিন না হয়, তবে লগইন পেজে পাঠিয়ে দেবে এবং সাইডবার দেখাবে না
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#01040D] overflow-hidden">
      
      {/* ১. সাইডবার এখানে স্থায়ীভাবে থাকবে */}
      <AdminSidebar />

      {/* ২. মেইন কন্টেন্ট এলাকা: সাইডবারের পাশে পেজগুলো এখানে লোড হবে */}
      <main className="flex-1 transition-all duration-500 md:ml-20 h-screen overflow-y-auto relative scrollbar-hide">
        
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#40E0D0]/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-[#FF00FF]/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

        {/* ৩. কন্টেন্ট কন্টেইনার: এখানে Outlet এর মাধ্যমে সব পেজ দেখা যাবে */}
        <div className="p-4 md:p-10 w-full max-w-full mx-auto">
           <Outlet /> 
        </div>
        
      </main>

    </div>
  );
};

export default AdminLayout;