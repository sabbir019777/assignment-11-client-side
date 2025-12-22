// src/pages/dashboard/adminhouse/AdminHouse.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"; 
import { Bar } from "react-chartjs-2";
import { axiosInstance } from "../utils/api"; 
import { FaUsers, FaBookOpen, FaFlag, FaBolt, FaCrown, FaChartBar, FaSatellite, FaMicrochip } from "react-icons/fa";

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
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    totalReported: 0,
    topContributors: [],
    todaysLessons: 0,
  });
  
  const [graphData, setGraphData] = useState({ lessons: [], users: [] });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (loadingAuth) return;
    if (!user || user.role !== "admin") {
      setLoadingData(false); 
      return;
    }

    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [usersRes, lessonsRes, reportsRes, contributorsRes, todayRes] =
          await Promise.all([
            axiosInstance.get("/admin/total-users").catch(() => ({ data: { total: 0, last7Days: [] } })),
            axiosInstance.get("/admin/total-lessons").catch(() => ({ data: { total: 0, last7Days: [] } })),
            axiosInstance.get("/admin/reported-lessons-count").catch(() => ({ data: { total: 0 } })),
            axiosInstance.get("/admin/most-active-contributors").catch(() => ({ data: [] })),
            axiosInstance.get("/admin/todays-lessons").catch(() => ({ data: { total: 0 } })),
          ]);

        setStats({
          totalUsers: usersRes.data?.total || 0,
          totalLessons: lessonsRes.data?.total || 0,
          totalReported: reportsRes.data?.total || 0,
          topContributors: Array.isArray(contributorsRes.data) ? contributorsRes.data : [],
          todaysLessons: todayRes.data?.total || 0,
        });

        setGraphData({
          lessons: lessonsRes.data?.last7Days || [], 
          users: usersRes.data?.last7Days || [],
        });
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [user, loadingAuth]);

  if (loadingAuth || loadingData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#020617]">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-32 h-32 border border-cyan-500/20 rounded-full animate-ping"></div>
          <div className="w-20 h-20 border-r-2 border-b-2 border-cyan-400 rounded-full animate-spin"></div>
          <FaMicrochip className="absolute text-cyan-400 text-xl animate-pulse" />
        </div>     
        <p className="mt-10 text-cyan-400 font-mono text-[10px] tracking-[0.7em] animate-pulse uppercase">Link Established. Syncing.....</p>
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
    labels: graphData.lessons.length > 0 ? graphData.lessons.map(d => d.date) : ["-"],
    datasets: [{
      data: graphData.lessons.map(d => d.count),
      backgroundColor: "#40E0D0",
      borderRadius: 2,
      barThickness: 12,
    }],
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 p-4 md:p-10 relative overflow-hidden font-sans">
      {/* Hyper-Futuristic Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'linear-gradient(#40E0D0 1px, transparent 1px), linear-gradient(90deg, #40E0D0 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-white/5 pb-10">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-cyan-500"></span>
              <span className="text-[10px] font-black tracking-[0.4em] text-cyan-500/80 uppercase">Root: /Admin/Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-[ -0.05em] text-white">
              CORE<span className="text-cyan-400">.</span>OS
            </h1>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
             <div className="px-6 py-2 border border-cyan-500/20 rounded-full bg-cyan-500/5 backdrop-blur-md">
                <p className="text-[9px] text-gray-500 uppercase font-mono">Status: Secure</p>
                <p className="text-xs font-bold text-cyan-400 font-mono tracking-tighter italic uppercase">Authenticated</p>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Users Matrix" value={stats.totalUsers} icon={<FaUsers />} color="cyan" />
          <StatCard label="Active Modules" value={stats.totalLessons} icon={<FaBookOpen />} color="purple" />
          <StatCard label="Threat Flags" value={stats.totalReported} icon={<FaFlag />} color="red" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Activity Data - Takes 8 columns */}
          <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-[2rem] p-8 relative group overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
                   <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Analytics Stream</h2>
                </div>
                <div className="h-[1px] flex-grow mx-8 bg-white/5"></div>
                <FaChartBar className="text-cyan-500/40 text-sm" />
             </div>
             <div className="h-[350px]">
               <Bar data={lessonsGraph} options={chartOptions} />
             </div>
          </div>

          {/* Top Operators - Takes 4 columns */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden flex flex-col shadow-2xl">
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8 flex items-center gap-3">
               <FaCrown className="text-yellow-500/50" /> Lead Operators
             </h2>
             <div className="space-y-4 flex-grow">
               {stats.topContributors.map((c, idx) => (
                 <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300 group/item">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-mono text-cyan-500/40 font-bold italic">#{idx+1}</span>
                       <span className="text-xs font-bold tracking-wider group-hover/item:text-cyan-400 transition-colors uppercase">{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-black text-cyan-400">{c.lessonsCreated} UNIT</span>
                 </div>
               ))}
               {stats.topContributors.length === 0 && <p className="text-center py-20 text-[10px] font-mono tracking-widest opacity-20 uppercase">Data Stream Empty</p>}
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
    cyan: "border-cyan-500/20 shadow-cyan-500/5",
    purple: "border-purple-500/20 shadow-purple-500/5",
    red: "border-red-500/20 shadow-red-500/5"
  };

  const textMap = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    red: "text-red-400"
  };

  return (
    <div className={`relative group p-8 rounded-[2.5rem] bg-white/[0.02] border ${colorMap[color]} backdrop-blur-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2`}>

      {/* Scan Line Animation */}

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent -translate-y-full group-hover:animate-scan"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
           <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${textMap[color]}`}>
              {React.cloneElement(icon, { size: 16 })}
           </div>
           <FaSatellite className="text-[10px] text-gray-600" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{label}</p>
        <div className="flex items-end gap-2">
          {/* Value Logic: Just the number, no extra leading zeros if it's already a number */}
          <h3 className={`text-6xl font-black tracking-tighter ${textMap[color]}`}>
             {value}
          </h3>
          <span className="text-[10px] mb-2 font-mono font-bold opacity-30 italic">INDEX</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHouse;