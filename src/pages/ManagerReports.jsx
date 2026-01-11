import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaDownload, FaClipboardList, FaCheckCircle, FaExclamationCircle, FaCalendarAlt, FaFilter, FaSort, FaSortUp, FaSortDown, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManagerReports = () => {
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [visibleCount, setVisibleCount] = useState(5);
  

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


  const allChartData = {
    "Last 7 Days": [
      { name: 'Mon', performance: 4000, tasks: 240 },
      { name: 'Tue', performance: 3000, tasks: 139 },
      { name: 'Wed', performance: 2000, tasks: 980 },
      { name: 'Thu', performance: 2780, tasks: 390 },
      { name: 'Fri', performance: 1890, tasks: 480 },
      { name: 'Sat', performance: 2390, tasks: 380 },
      { name: 'Sun', performance: 3490, tasks: 430 },
    ],
    "Last 30 Days": [
      { name: 'Week 1', performance: 12000, tasks: 800 },
      { name: 'Week 2', performance: 15000, tasks: 1100 },
      { name: 'Week 3', performance: 9000, tasks: 750 },
      { name: 'Week 4', performance: 17000, tasks: 1300 },
    ],
    "This Month": [
      { name: 'Week 1', performance: 5000, tasks: 300 },
      { name: 'Week 2', performance: 7500, tasks: 450 },
      { name: 'Week 3', performance: 6200, tasks: 400 },
      { name: 'Week 4', performance: 8900, tasks: 600 },
    ],
    "This Year": [
      { name: 'Jan', performance: 45000, tasks: 3000 },
      { name: 'Feb', performance: 38000, tasks: 2800 },
      { name: 'Mar', performance: 52000, tasks: 4100 },
      { name: 'Apr', performance: 49000, tasks: 3900 },
      { name: 'May', performance: 61000, tasks: 4800 },
      { name: 'Jun', performance: 55000, tasks: 4300 },
      { name: 'Jul', performance: 67000, tasks: 5100 },
      { name: 'Aug', performance: 72000, tasks: 5600 },
      { name: 'Sep', performance: 63000, tasks: 4900 },
      { name: 'Oct', performance: 75000, tasks: 5900 },
      { name: 'Nov', performance: 81000, tasks: 6200 },
      { name: 'Dec', performance: 90000, tasks: 7000 },
    ]
  };

  const currentData = allChartData[timeRange] || allChartData["Last 7 Days"];

  const stats = useMemo(() => {
    const totalTasks = currentData.reduce((acc, curr) => acc + curr.tasks, 0);
    const completed = Math.floor(totalTasks * 0.7); 
    const pending = totalTasks - completed;
    return { totalTasks, completed, pending };
  }, [currentData]);


  const recentReports = useMemo(() => {
    const baseData = [
      { id: "R-101", user: "Rahim Ahmed", type: "Weekly Summary", date: "2023-10-24", status: "Approved" },
      { id: "R-102", user: "Karim Uddin", type: "Bug Report", date: "2023-10-23", status: "Pending" },
      { id: "R-103", user: "Sabbir Hasan", type: "Performance Review", date: "2023-10-22", status: "Approved" },
      { id: "R-104", user: "Tamim Iqbal", type: "Client Feedback", date: "2023-10-21", status: "Rejected" },
      { id: "R-105", user: "Nasir Hossain", type: "Security Audit", date: "2023-10-20", status: "Pending" },
    ];
    for (let i = 6; i <= 30; i++) {
      baseData.push({
        id: `R-1${i < 10 ? '0' + i : i}`,
        user: `Team Member ${i}`,
        type: i % 2 === 0 ? "Daily Report" : "Project Update",
        date: `2023-10-${30 - (i % 30) || 1}`,
        status: i % 3 === 0 ? "Rejected" : i % 2 === 0 ? "Approved" : "Pending"
      });
    }
    return baseData;
  }, []);


  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedReports = useMemo(() => {
    let sortableItems = [...recentReports];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [recentReports, sortConfig]);

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <FaSort className="text-gray-600 opacity-50" />;
    return sortConfig.direction === 'asc' ? <FaSortUp className="text-cyan-400" /> : <FaSortDown className="text-cyan-400" />;
  };

  const pieData = [
    { name: 'Development', value: 400 },
    { name: 'Design', value: 300 },
    { name: 'Marketing', value: 300 },
    { name: 'Testing', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  const handleViewAll = () => {
    setVisibleCount(prev => prev + 20);
    toast.success("Loaded more reports!");
  };

  const handleShowLess = () => {
    setVisibleCount(5);
    toast.success("List collapsed!");
 
  };

  return (
    <div className="p-6 min-h-screen text-white animate-fadeIn pb-20">
      
      {/* Header & Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Analytics & Reports
          </h2>
          <p className="text-gray-400 mt-1 flex items-center gap-2">
            <FaCalendarAlt className="text-sm" /> Showing data for: <span className="text-cyan-400 font-bold">{timeRange}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select 
              className="appearance-none bg-[#1e1b2c] border border-gray-600 text-gray-300 py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:border-cyan-500 cursor-pointer hover:bg-[#252136] transition font-bold"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none" />
          </div>

         
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1e1b2c] p-6 rounded-2xl border border-blue-500/20 shadow-xl">
          <p className="text-gray-400 text-sm uppercase tracking-wider">Total Tasks</p>
          <h4 className="text-3xl font-bold mt-2">{stats.totalTasks.toLocaleString()}</h4>
        </div>
        <div className="bg-[#1e1b2c] p-6 rounded-2xl border border-green-500/20 shadow-xl">
          <p className="text-gray-400 text-sm uppercase tracking-wider">Completed</p>
          <h4 className="text-3xl font-bold mt-2">{stats.completed.toLocaleString()}</h4>
        </div>
        <div className="bg-[#1e1b2c] p-6 rounded-2xl border border-red-500/20 shadow-xl">
          <p className="text-gray-400 text-sm uppercase tracking-wider">Pending</p>
          <h4 className="text-3xl font-bold mt-2">{stats.pending.toLocaleString()}</h4>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-[#1e1b2c] p-6 rounded-2xl border border-gray-700 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-gray-200">
             Performance Trend ({timeRange})
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart key={timeRange} data={currentData}>
                <defs>
                  <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                <Area type="monotone" dataKey="performance" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                <Area type="monotone" dataKey="tasks" stroke="#82ca9d" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e1b2c] p-6 rounded-2xl border border-gray-700 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-gray-200">Task Distribution</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Report Logs - SORTABLE TABLE */}
      <div id="logs-table" className="bg-[#1e1b2c] rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-200">Recent Logs</h3>
          
          {/* Action Buttons for Table */}
          <div className="flex gap-3">
             {visibleCount < sortedReports.length && (
                <button 
                  onClick={handleViewAll}
                  className="flex items-center gap-2 text-cyan-400 text-sm font-bold hover:underline bg-cyan-500/10 px-3 py-1 rounded-lg hover:bg-cyan-500/20 transition"
                >
                  <FaAngleDown /> View All (+20)
                </button>
             )}
             
             {visibleCount > 5 && (
                <button 
                  onClick={handleShowLess}
                  className="flex items-center gap-2 text-red-400 text-sm font-bold hover:underline bg-red-500/10 px-3 py-1 rounded-lg hover:bg-red-500/20 transition"
                >
                  <FaAngleUp /> Show Less
                </button>
             )}
          </div>

        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#262335] text-gray-400">
                <th onClick={() => handleSort('id')} className="p-4 cursor-pointer hover:text-white transition group select-none">
                  <div className="flex items-center gap-2">Report ID {getSortIcon('id')}</div>
                </th>
                <th onClick={() => handleSort('user')} className="p-4 cursor-pointer hover:text-white transition group select-none">
                  <div className="flex items-center gap-2">User {getSortIcon('user')}</div>
                </th>
                <th onClick={() => handleSort('type')} className="p-4 cursor-pointer hover:text-white transition group select-none">
                  <div className="flex items-center gap-2">Type {getSortIcon('type')}</div>
                </th>
                <th onClick={() => handleSort('status')} className="p-4 cursor-pointer hover:text-white transition group select-none">
                  <div className="flex items-center gap-2">Status {getSortIcon('status')}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedReports.slice(0, visibleCount).map((report) => (
                <tr key={report.id} className="border-b border-gray-800 text-gray-300 hover:bg-gray-700/30 transition">
                  <td className="p-4 text-cyan-400 font-mono">{report.id}</td>
                  <td className="p-4 font-bold">{report.user}</td>
                  <td className="p-4">{report.type}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      report.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                      report.status === 'Rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;