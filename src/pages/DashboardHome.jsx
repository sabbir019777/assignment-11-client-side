import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { axiosInstance } from "../utils/api";
import { auth } from "../Firebase/Firebase.config";
import toast from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
  FaChartLine,
  FaUsers,
  FaFlag,
  FaBookOpen,
  FaCrown,
  FaPlusCircle,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const { user, loading, refreshUserPlan, setUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState({ lessons: [], users: [] });
  const [loadingData, setLoadingData] = useState(true);
  const location = useLocation();

  const isAdmin = user?.role === "admin";
  const isOverviewPath =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/" ||
    location.pathname === "/dashboard/dashboardhome";

  useEffect(() => {
    if (!user || !isAdmin || !isOverviewPath) {
      setLoadingData(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [usersRes, lessonsRes, reportsRes, contributorsRes, todayRes] =
          await Promise.all([
            axiosInstance.get("/api/admin/total-users"),
            axiosInstance.get("/api/admin/total-lessons"),
            axiosInstance.get("/api/admin/reported-lessons-count"),
            axiosInstance.get("/api/admin/most-active-contributors"),
            axiosInstance.get("/api/admin/todays-lessons"),
          ]);

        setStats({
          totalUsers: usersRes.data.total || 0,
          totalLessons: lessonsRes.data.total || 0,
          totalReported: reportsRes.data.total || 0,
          topContributors: contributorsRes.data || [],
          todaysLessons: todayRes.data.total || 0,
        });

        setGraphData({
          lessons: lessonsRes.data.last7Days || [],
          users: usersRes.data.last7Days || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch admin data");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [user, isAdmin, isOverviewPath]);

  if (loading || (loadingData && isAdmin && isOverviewPath)) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] bg-[#0f172a]">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-indigo-400 font-medium animate-pulse tracking-widest">
          INITIALIZING INTERFACE......
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white">
        <h2 className="text-3xl font-black text-red-500 tracking-tighter">
          ACCESS RESTRICTED
        </h2>
        <p className="text-gray-400 mt-2">Authentication signature required.</p>
      </div>
    );
  }

  const lessonsGraph = {
    labels: graphData.lessons.map((d) => d.date),
    datasets: [
      {
        label: "Lessons Created",
        data: graphData.lessons.map((d) => d.count),
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "#6366f1",
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: "#6366f1",
      },
    ],
  };

  const usersGraph = {
    labels: graphData.users.map((d) => d.date),
    datasets: [
      {
        label: "New Users",
        data: graphData.users.map((d) => d.count),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      },
    ],
  };

  const isOverview =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/" ||
    location.pathname === "/dashboard/dashboardhome";

  // --- FUTURISTIC USER DASHBOARD ---
  if (!isAdmin && isOverview) {
    return (
      <div className="p-4 md:p-8 min-h-screen bg-[#0f172a] text-white">
        {/* Futuristic Loading Navbar when user state is updating */}
        {loading && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent backdrop-blur-sm">
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 animate-pulse"></div>
            <div className="flex items-center justify-center gap-3 px-4 py-3">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-xs font-mono text-cyan-300 tracking-widest uppercase">
                Syncing Status...
              </span>
            </div>
          </div>
        )}

        <header className="mb-10">
          <h1 className="text-5xl font-black mb-2 tracking-tight">
            Welcome,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {user.displayName || "User"}
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Your learning control center is active.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "My Library",
              icon: FaBookOpen,
              path: "/dashboard/my-lessons",
              color: "from-blue-600 to-indigo-600",
            },
            {
              label: "New Lesson",
              icon: FaPlusCircle,
              path: "/dashboard/add-lesson",
              color: "from-emerald-500 to-teal-600",
            },
            {
              label: "Profile",
              icon: FaUsers,
              path: "/dashboard/profile",
              color: "from-purple-600 to-pink-600",
            },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`relative group overflow-hidden p-8 rounded-3xl bg-gradient-to-br ${item.color} shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20`}
            >
              <item.icon className="text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold block">{item.label}</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </div>

        {/* Premium Card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-800/50 border border-slate-700 backdrop-blur-xl p-8 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <FaCrown className="text-yellow-400 text-3xl" />
                <span className="text-yellow-400 font-bold uppercase tracking-[0.3em]">
                  Lifetime Access
                </span>
              </div>
              <h3 className="text-4xl font-black mb-4">Upgrade to Premium</h3>
              <p className="text-slate-400 text-lg mb-6 max-w-md">
                One-time investment for infinite knowledge. Unlock all pro tools
                and ad-free experience forever.
              </p>
              <div className="flex items-center gap-6">
                {user?.isPremium ? (
                  <span className="text-5xl font-black text-yellow-400">
                    Lifetime Use
                  </span>
                ) : (
                  <>
                    <span className="text-5xl font-black text-white">
                      ৳1500
                    </span>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Dashboard Analytics</li>
                      <li>• Priority Listing</li>
                      <li>• Ad-Free Matrix</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={async () => {
                  if (user?.isPremium) {
                    toast.success("You have already upgraded ✅", {
                      id: "already-premium",
                    });
                    return;
                  }

                  try {
                    toast.loading("Encrypting Transaction...", {
                      id: "upgrade",
                    });

                    const base = (
                      import.meta.env.VITE_APP_API_URL || ""
                    ).replace(/\/$/, "");
                    let token = localStorage.getItem("token");
                    if (auth?.currentUser)
                      token = await auth.currentUser.getIdToken();

                    const resp = await fetch(`${base}/users/upgrade`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                      },
                      body: JSON.stringify({}),
                    });

                    const data = await resp.json().catch(() => ({}));
                    if (resp.ok && data?.user) {
                      
                      try {
                        if (setUser) {
                          setUser((prev) => ({
                            ...(prev || user || {}),
                            isPremium: true,
                            role: data?.user?.role,
                          }));
                        }
                      } catch (e) {
                        console.error("setUser failed:", e);
                      }

                      if (refreshUserPlan) await refreshUserPlan();

                      toast.success("Upgrade Successful! 🎉", {
                        id: "upgrade",
                      });
                    } else {
                      toast.error(data?.message || "Process Interrupted", {
                        id: "upgrade",
                      });
                    }
                  } catch (err) {
                    toast.error("System Error", { id: "upgrade" });
                  }
                }}
                className={`px-10 py-4 font-black rounded-2xl transition-all shadow-xl ${
                  user?.isPremium
                    ? "bg-green-500 text-black cursor-default"
                    : "bg-yellow-400 text-black hover:bg-green-300 hover:scale-105 shadow-yellow-500/20"
                }`}
              >
                {user?.isPremium ? "ALREADY PREMIUM" : "UPGRADE NOW"}
              </button>

              <button
                onClick={() => navigate("/pricing")}
                className="relative group px-10 py-4 font-black tracking-[0.2em] text-cyan-400 bg-transparent border border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50"></div>
                <span className="relative z-10 flex items-center justify-center gap-3 group-hover:scale-105 transition-transform">
                  <span className="text-[10px] opacity-50 font-mono">02//</span>
                  VIEW_DETAILS
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                </span>
              </button>

<div className="flex justify-center items-center mt-12 mb-8">
  <button
    onClick={() => navigate("/dashboard/admin")}
    className="group relative px-12 py-5 bg-transparent border-2 border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-indigo-400 hover:shadow-[0_0_35px_rgba(99,102,241,0.4)]"
  >
    {/* Futuristic Shimmer Light Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
    
    <span className="relative z-10 flex items-center gap-4 text-indigo-400 group-hover:text-white transition-colors duration-300">
      {/* Icon with background */}
      <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500 transition-colors">
        <FaCrown className="text-xl group-hover:rotate-12 transition-transform" />
      </div>
      
      {/* Text with letter spacing */}
      <span className="font-black tracking-[0.25em] text-sm uppercase">
        Launch Admin Panel
      </span>

      {/* Pulsing Status Indicator */}
      <div className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 shadow-[0_0_10px_#6366f1]"></span>
      </div>
    </span>

    {/* Background Slide Fill on Hover */}
    <div className="absolute inset-0 bg-indigo-600 -z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
  </button>
</div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- FUTURISTIC ADMIN DASHBOARD ---
  if (isAdmin && isOverview) {
    return (
      <div className="p-6 space-y-8 bg-[#f8fafc] min-h-screen text-slate-900">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              System <span className="text-indigo-600">Overview</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Global Administrator Command Center
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-sm">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
            Live System Status
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Users",
              val: stats?.totalUsers,
              icon: FaUsers,
              color: "blue",
            },
            {
              label: "Public Lessons",
              val: stats?.totalLessons,
              icon: FaBookOpen,
              color: "emerald",
            },
            {
              label: "Reported",
              val: stats?.totalReported,
              icon: FaFlag,
              color: "red",
            },
            {
              label: "Today's Lessons",
              val: stats?.todaysLessons,
              icon: FaChartLine,
              color: "amber",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-${s.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <s.icon className={`text-${s.color}-600 text-xl`} />
              </div>
              <h2 className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                {s.label}
              </h2>
              <p className="text-3xl font-black mt-1">{s.val || 0}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Growth Analytics
            </h2>
            <Bar
              data={lessonsGraph}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              User Inflow
            </h2>
            <Line
              data={usersGraph}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h2 className="text-2xl font-black text-slate-900">
              Elite Contributors
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {stats?.topContributors.map((c, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-5 hover:bg-slate-50 rounded-3xl transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700 font-bold text-lg">
                    {c.name}
                  </span>
                </div>
                <div className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-2xl font-black">
                  {c.lessonsCreated} Lessons
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardHome;
