import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useAuth from "../hooks/useAuth";

const UserDashboard = () => {
    const { user } = useAuth();


    const activityData = [
        { day: 'Sun', lessons: 1 },
        { day: 'Mon', lessons: 3 },
        { day: 'Tue', lessons: 2 },
        { day: 'Wed', lessons: 5 },
        { day: 'Thu', lessons: 4 },
        { day: 'Fri', lessons: 7 },
        { day: 'Sat', lessons: 2 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-4xl font-black text-white italic tracking-tighter">COMMAND <span className="text-cyan-400">CENTER</span></h1>
                <p className="text-gray-500 mt-1">Welcome, {user?.displayName}. Monitoring your contributions.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "My Lessons", value: "12", color: "border-cyan-500" },
                    { label: "Total Views", value: "1.2k", color: "border-purple-500" },
                    { label: "Profile Status", value: "Verified", color: "border-green-500" }
                ].map((card, i) => (
                    <div key={i} className={`p-6 bg-[#11111d] border-l-4 ${card.color} rounded-r-xl shadow-xl`}>
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{card.label}</p>
                        <h3 className="text-3xl font-bold mt-2 text-white">{card.value}</h3>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-[#11111d] rounded-2xl border border-white/5 shadow-2xl">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        Upload Activity (Weekly)
                    </h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorL" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis dataKey="day" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#0a0a0f', border: '1px solid #222', borderRadius: '8px'}}
                                    itemStyle={{color: '#22d3ee'}}
                                />
                                <Area type="monotone" dataKey="lessons" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorL)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;          