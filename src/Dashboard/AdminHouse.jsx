import React, { useEffect, useState } from "react";
import  useAuth  from "../hooks/useAuth"; 
import { Bar } from "react-chartjs-2";
import { FaUsers, FaBookOpen, FaFlag, FaCrown, FaChartBar, FaSatellite, FaMicrochip } from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminHouse = () => {
  const { user, loading: loadingAuth } = useAuth();
  
  // ১. স্যাম্পল ডাটা (Hardcoded)
  const stats = {
    totalUsers: 125,
    totalLessons: 54,
    totalReported: 32,
    topContributors: [
       { name: "Cyber_Admin", lessonsCreated: 40 },
       { name: "Root_User", lessonsCreated: 32 },
       { name: "Net_Hunter", lessonsCreated: 25 },
       { name: "System_X", lessonsCreated: 18 },
       { name: "Alpha_Node", lessonsCreated: 10 }
    ],
  };
  
  const graphData = [
     { date: "Sat", count: 12 }, { date: "Sun", count: 19 }, { date: "Mon", count: 8 },
     { date: "Tue", count: 15 }, { date: "Wed", count: 10 }, { date: "Thu", count: 24 }, { date: "Fri", count: 20 }
  ];

  // ২. লোডিং স্ক্রিন (ইউজার ডাটা আসা পর্যন্ত ওয়েট করবে)
  if (loadingAuth) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#020617]">
         <div className="w-16 h-16 border-r-2 border-b-2 border-cyan-400 rounded-full animate-spin"></div>
         <p className="mt-4 text-cyan-400 font-mono text-xs animate-pulse uppercase tracking-[0.3em]">Initializing Core...</p>
      </div>
    );
  }

  // ৩. সিকিউরিটি চেক: অ্যাডমিন না হলে ব্ল্যাঙ্ক স্ক্রিন আসবে না, বরং মেসেজ দিবে
  const isAdmin = user?.role === "admin" || user?.email === "admins@gmail.com";
  
  if (!user || !isAdmin) {
      return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#020617] text-red-500 font-mono p-4 text-center">
            <FaFlag className="text-4xl mb-4" />
            <h1 className="text-2xl font-black mb-2">ACCESS DENIED</h1>
            <p className="text-xs opacity-70 uppercase tracking-widest">Your clearance level is insufficient.</p>
        </div>
      );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#475569", font: { size: 10 } } },
      y: { grid: { color: "rgba(255,255,255,0.02)" }, ticks: { color: "#475569", font: { size: 10 } } }
    }
  };

  const lessonsGraph = {
    labels: graphData.map(d => d.date),
    datasets: [{
      data: graphData.map(d => d.count),
      backgroundColor: "#40E0D0",
      borderRadius: 2,
      barThickness: 12,
    }],
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 p-4 md:p-10 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none fixed"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none fixed" style={{ backgroundImage: 'linear-gradient(#40E0D0 1px, transparent 1px), linear-gradient(90deg, #40E0D0 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute -top-[20%] -left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none fixed"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-cyan-500"></span>
              <span className="text-[10px] font-black tracking-[0.3em] text-cyan-500/80 uppercase">Root: /Admin/Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic text-white leading-none">
              CORE<span className="text-cyan-400">.</span>OS
            </h1>
          </div>
          <div className="mt-6 lg:mt-0 px-6 py-2 border border-cyan-500/20 rounded-full bg-cyan-500/5 backdrop-blur-md">
            <p className="text-[9px] text-gray-500 uppercase font-mono">Status: Secure</p>
            <p className="text-[10px] font-bold text-cyan-400 font-mono italic uppercase">Authenticated</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Users Matrix" value={stats.totalUsers} icon={<FaUsers />} color="cyan" />
          <StatCard label="Active Modules" value={stats.totalLessons} icon={<FaBookOpen />} color="purple" />
          <StatCard label="Threat Flags" value={stats.totalReported} icon={<FaFlag />} color="red" />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 relative group overflow-hidden">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Analytics Stream</h2>
                <FaChartBar className="text-cyan-500/40 text-sm" />
             </div>
             <div className="h-[250px] md:h-[350px]">
               <Bar data={lessonsGraph} options={chartOptions} />
             </div>
          </div>

          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden flex flex-col">
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-3">
               <FaCrown className="text-yellow-500/50" /> Lead Operators
             </h2>
             <div className="space-y-4 flex-grow">
               {stats.topContributors.map((c, idx) => (
                 <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5 group/item">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-mono text-cyan-500/40 font-bold italic">#{idx+1}</span>
                       <span className="text-[11px] font-bold tracking-wider text-white uppercase">{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-black text-cyan-400">{c.lessonsCreated} UNIT</span>
                 </div>
               ))}
             </div>
             <div className="mt-8 pt-6 border-t border-white/5 text-[9px] font-mono text-slate-600 flex justify-between uppercase">
                <span>Ref: Admin_Node</span>
                <span className="animate-pulse">Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  const colorMap = {
    cyan: "border-cyan-500/20 text-cyan-400",
    purple: "border-purple-500/20 text-purple-400",
    red: "border-red-500/20 text-red-400"
  };

  return (
    <div className={`relative group p-8 rounded-[2.5rem] bg-white/[0.02] border ${colorMap[color]} backdrop-blur-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 w-full`}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -translate-y-full group-hover:animate-scan"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
           <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
              {React.cloneElement(icon, { size: 18 })}
           </div>
           <FaSatellite className="text-[10px] text-gray-600" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{label}</p>
        <div className="flex items-end gap-2">
          <h3 className="text-6xl font-black tracking-tighter italic">
             {value}
          </h3>
          <span className="text-[10px] mb-2 font-mono font-bold opacity-30 italic">INDEX</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHouse;