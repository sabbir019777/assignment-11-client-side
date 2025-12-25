// src/pages/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/api";
import { Search, Trash2, ShieldCheck, User, Mail, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users/all");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("ইউজার লিস্ট লোড করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleUpdate = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      setActionLoading(id);
      
      // ব্যাকএন্ডে PATCH রিকোয়েস্ট
      const res = await axiosInstance.patch(`/users/role/${id}`, { role: newRole });

      if (res.status === 200 || res.data.modifiedCount > 0) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
        toast.success(`ইউজার এখন ${newRole.toUpperCase()}`);
      }
    } catch (err) {
      // এই লগটি আপনাকে জানাবে আসল সমস্যা কোথায়
      console.error("DEBUG_ERROR:", err.response);
      
      const status = err.response?.status;
      if (status === 403) {
        toast.error("Forbidden: আপনার অ্যাডমিন পাওয়ার নেই!");
      } else if (status === 404) {
        toast.error("Error 404: ব্যাকএন্ডে রাস্তা খুঁজে পাওয়া যায়নি");
      } else {
        toast.error("রোল আপডেট করা সম্ভব হয়নি");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("আপনি কি নিশ্চিত?")) return;
    try {
      setActionLoading(id);
      await axiosInstance.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("Identity Removed");
    } catch (err) {
      toast.error("ডিলিট করা যায়নি");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-12 bg-[#01040D] min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl font-black uppercase tracking-tight">User <span className="text-[#40E0D0]">Matrix</span></h1>
        <input
          placeholder="Search Identity..."
          className="bg-[#0A0F1F] border border-white/10 py-3 px-4 rounded-xl outline-none focus:border-[#40E0D0]/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.div key={user._id} className="bg-[#0A0F1F] border border-white/5 p-6 rounded-[2.5rem] relative">
              <div className="flex items-center gap-5 mb-6">
                <img src={user.photoURL || "https://i.ibb.co/7zvZfJp/user.png"} className="w-16 h-16 rounded-2xl object-cover" alt="profile" />
                <div className="text-left">
                  <h2 className="font-bold text-lg truncate">{user.name || "Anonymous"}</h2>
                  <p className="text-gray-500 text-xs truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRoleUpdate(user._id, user.role)}
                  disabled={actionLoading === user._id}
                  className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest"
                >
                  {actionLoading === user._id ? "..." : (user.role === 'admin' ? 'Demote' : 'Make Admin')}
                </button>
                <button onClick={() => handleDeleteUser(user._id)} className="px-5 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminUsers;