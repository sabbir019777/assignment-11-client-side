import React from "react";
import useAuth from "../hooks/useAuth"; 
import { Bar } from "react-chartjs-2";
import { FaUsers, FaBookOpen, FaFlag, FaCrown, FaChartBar, FaSatellite, FaShieldAlt } from "react-icons/fa";

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

  if (loadingAuth) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0f172a] overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div className="w-20 h-20 border-4 border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent rounded-full animate-spin"></div>
         <p className="mt-6 text-cyan-400 font-mono text-sm animate-pulse tracking-[0.5em] uppercase font-bold">System Initializing...</p>
      </div>
    );
  }

  const isAdmin = user?.role === "admin" || user?.email === "admins@gmail.com";
  
  if (!user || !isAdmin) {
      return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#020617] text-red-500 font-mono p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#020617] to-[#020617]"></div>
            <FaShieldAlt className="text-6xl mb-6 animate-bounce" />
            <h1 className="text-4xl font-black mb-2 tracking-tighter">ACCESS DENIED</h1>
            <p className="text-sm opacity-70 uppercase tracking-[0.3em] border-t border-red-500/30 pt-4 mt-2">Insufficient Clearance Level</p>
        </div>
      );
  }
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
        legend: { display: false },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#22d3ee',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(34, 211, 238, 0.2)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
                label: function(context) {
                    return `Activity: ${context.parsed.y} Units`;
                }
            }
        }
    },
    scales: {
      x: { 
          grid: { display: false }, 
          ticks: { color: "#94a3b8", font: { family: "'JetBrains Mono', monospace", size: 11 } } 
      },
      y: { 
          grid: { color: "rgba(255,255,255,0.05)", borderDash: [5, 5] }, 
          border: { display: false },
          ticks: { color: "#94a3b8", font: { family: "'JetBrains Mono', monospace", size: 11 }, padding: 10 } 
      }
    },
    animation: {
        duration: 2000,
        easing: 'easeOutQuart'
    }
  };

  const lessonsGraph = {
    labels: graphData.map(d => d.date),
    datasets: [{
      label: "Activity",
      data: graphData.map(d => d.count),
      backgroundColor: "#22d3ee", 
      hoverBackgroundColor: "#67e8f9",
      borderRadius: 8,
      barThickness: 45, 
      borderSkipped: false,
    }],
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-300 p-4 md:p-8 relative overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none fixed"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none fixed"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none fixed"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
              <span className="text-xs font-bold tracking-[0.4em] text-cyan-500/70 uppercase font-mono">System Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
              ADMIN<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.PANEL</span>
            </h1>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <div className="px-5 py-2 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-md shadow-[0_0_15px_-5px_#22d3ee]">
                <p className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> Secure Connection
                </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="cyan" trend="+12%" />
          <StatCard label="Active Lessons" value={stats.totalLessons} icon={<FaBookOpen />} color="purple" trend="+5%" />
          <StatCard label="Reports" value={stats.totalReported} icon={<FaFlag />} color="red" trend="-2%" />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
          {/* Chart Section */}
          <div className="lg:col-span-8 bg-[#1e293b]/50 border border-white/5 rounded-[2rem] p-8 relative backdrop-blur-xl shadow-2xl">
             <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaChartBar className="text-cyan-400" /> Weekly Analytics
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest">Data Synchronization Active</p>
                </div>
                <div className="flex gap-2">
                    <span className="h-3 w-3 bg-cyan-500 rounded-full"></span>
                    <span className="h-3 w-3 bg-slate-700 rounded-full"></span>
                </div>
             </div>
             <div className="h-[300px] w-full">
               <Bar data={lessonsGraph} options={chartOptions} />
             </div>
          </div>

          {/* Top Contributors Section */}
          <div className="lg:col-span-4 bg-[#1e293b]/50 border border-white/5 rounded-[2rem] p-8 relative backdrop-blur-xl shadow-2xl flex flex-col">
             <div className="flex items-center gap-3 mb-8">
                 <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <FaCrown className="text-yellow-500" />
                 </div>
                 <div>
                    <h2 className="text-lg font-bold text-white">Top Agents</h2>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Contribution Matrix</p>
                 </div>
             </div>

             <div className="space-y-3 flex-grow overflow-y-auto custom-scrollbar pr-2">
               {stats.topContributors.map((c, idx) => (
                 <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group cursor-pointer hover:border-cyan-500/30 hover:shadow-[0_0_15px_-5px_rgba(34,211,238,0.3)]">
                    <div className="flex items-center gap-4">
                       <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-mono font-bold text-xs ${idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-slate-700/50 text-slate-400'}`}>
                           {idx+1}
                       </div>
                       <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{c.name}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-500 group-hover:text-white transition-colors">
                        {c.lessonsCreated} <span className="text-[9px] opacity-50">PTS</span>
                    </div>
                 </div>
               ))}
             </div>
             
             <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <p className="text-[10px] text-cyan-500/50 font-mono uppercase tracking-[0.2em] animate-pulse">Live Updating...</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component Improved
const StatCard = ({ label, value, icon, color, trend }) => {
  const colorStyles = {
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", shadow: "group-hover:shadow-cyan-500/20" },
    purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", shadow: "group-hover:shadow-purple-500/20" },
    red: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", shadow: "group-hover:shadow-red-500/20" }
  };
  
  const theme = colorStyles[color];

  return (
    <div className={`relative group p-6 rounded-[2rem] bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-opacity-50 ${theme.shadow} hover:shadow-2xl`}>
      
      {/* Glow Effect */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${theme.bg}`}></div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
           <div className={`p-3.5 rounded-2xl border ${theme.bg} ${theme.border} ${theme.text}`}>
              {React.cloneElement(icon, { size: 20 })}
           </div>
           <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <FaSatellite className={`text-[10px] ${theme.text}`} />
                <span className={`text-[10px] font-mono font-bold ${trend.includes('+') ? 'text-green-400' : 'text-red-400'}`}>{trend}</span>
           </div>
        </div>
        
        <div>
            <h3 className="text-5xl font-black text-white tracking-tight mb-1">{value}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHouse;