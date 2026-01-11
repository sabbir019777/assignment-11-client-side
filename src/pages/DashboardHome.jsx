import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FaSortAmountDown, FaSortAmountUp, FaEye, FaArrowDown, FaArrowUp, FaBookOpen, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import useAuth from "../hooks/useAuth";

const UserDashboard = () => {
    const { user } = useAuth();
    const [viewCount, setViewCount] = useState(3); 
    const [sortOrder, setSortOrder] = useState('desc'); 


    const activityData = [
        { day: 'Sun', lessons: 2 },
        { day: 'Mon', lessons: 5 },
        { day: 'Tue', lessons: 3 },
        { day: 'Wed', lessons: 8 },
        { day: 'Thu', lessons: 6 },
        { day: 'Fri', lessons: 9 },
        { day: 'Sat', lessons: 4 },
    ];

    
    const initialHistory = [
        { id: 1, title: "React Hooks Deep Dive", date: "2025-01-10", score: "95%", status: "Completed" },
        { id: 2, title: "Advanced CSS Grid", date: "2025-01-09", score: "88%", status: "Completed" },
        { id: 3, title: "Node.js Basics", date: "2025-01-08", score: "Pending", status: "In Progress" },
        { id: 4, title: "MongoDB Aggregation", date: "2025-01-07", score: "92%", status: "Completed" },
        { id: 5, title: "Tailwind Architecture", date: "2025-01-06", score: "Pending", status: "In Progress" },
        { id: 6, title: "Firebase Auth", date: "2025-01-05", score: "100%", status: "Completed" },
        { id: 7, title: "Next.js Routing", date: "2025-01-04", score: "85%", status: "Completed" },
        { id: 8, title: "Redux Toolkit", date: "2025-01-03", score: "Pending", status: "In Progress" },
    ];

 
    const processedHistory = useMemo(() => {
        let data = [...initialHistory];
        
    
        if (sortOrder === 'asc') {
            data.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

       
        return data.slice(0, viewCount);
    }, [sortOrder, viewCount]);

    // --- Handlers ---
    const handleViewMore = () => {
        if (viewCount >= initialHistory.length) {
            setViewCount(3); 
        } else {
            setViewCount(prev => prev + 3); 
        }
    };

    const toggleSort = () => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            {/* --- Header --- */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                        COMMAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">CENTER</span>
                    </h1>
                    <p className="text-gray-400 mt-2 font-mono text-sm">
                        // User: <span className="text-cyan-400">{user?.displayName}</span> // Status: Online
                    </p>
                </div>
                <div className="bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/30">
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest animate-pulse">Live Monitoring</span>
                </div>
            </div>

            {/* --- Overview Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "My Lessons", value: "12", icon: <FaBookOpen/>, color: "from-cyan-500 to-blue-500" },
                    { label: "Total Views", value: "1.2k", icon: <FaEye/>, color: "from-purple-500 to-pink-500" },
                    { label: "Completion Rate", value: "85%", icon: <FaChartLine/>, color: "from-green-500 to-emerald-500" }
                ].map((card, i) => (
                    <div key={i} className="relative group overflow-hidden rounded-2xl bg-[#1a1a2e] border border-white/5 hover:border-white/10 transition-all duration-300">
                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${card.color}`}></div>
                        <div className="p-6 relative z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">{card.label}</p>
                                    <h3 className="text-4xl font-black text-white">{card.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl bg-white/5 text-white opacity-50 group-hover:opacity-100 transition-opacity`}>
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                        {/* Glow Effect */}
                        <div className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${card.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    </div>
                ))}
            </div>

            {/* --- Charts Section --- */}
            <div className="p-6 bg-[#11111d] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50"></div>
                
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                    <span className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400"><FaChartLine /></span>
                    Weekly Activity Analysis
                </h3>
                
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData}>
                            <defs>
                                <linearGradient id="colorL" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'}}
                                itemStyle={{color: '#22d3ee', fontWeight: 'bold'}}
                                cursor={{stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '5 5'}}
                            />
                            <Area type="monotone" dataKey="lessons" stroke="#22d3ee" strokeWidth={4} fillOpacity={1} fill="url(#colorL)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* --- Recent History Table (Sort & View More) --- */}
            <div className="bg-[#11111d] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaBookOpen className="text-purple-400"/> Recent Lesson History
                    </h3>
                    
                    {/* Sort Button */}
                    <button 
                        onClick={toggleSort}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-cyan-400"
                    >
                        {sortOrder === 'desc' ? <FaSortAmountDown size={14}/> : <FaSortAmountUp size={14}/>}
                        Sort by Date
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">Lesson Name</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Score</th>
                                <th className="p-4 font-semibold text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {processedHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 font-medium text-white group-hover:text-cyan-400 transition-colors">
                                        {item.title}
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">{item.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            item.score === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-400'
                                        }`}>
                                            {item.score}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className={`w-2 h-2 rounded-full ${item.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            <span className="text-sm text-gray-300">{item.status}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* View More / Show Less Button */}
                <div className="p-4 border-t border-white/10 bg-white/5 flex justify-center">
                    <button 
                        onClick={handleViewMore}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group"
                    >
                        {viewCount >= initialHistory.length ? (
                            <>Show Less <FaArrowUp className="group-hover:-translate-y-1 transition-transform"/></>
                        ) : (
                            <>View More History <FaArrowDown className="group-hover:translate-y-1 transition-transform"/></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;