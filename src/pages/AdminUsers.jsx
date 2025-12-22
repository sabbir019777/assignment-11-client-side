// src/pages/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminUserRow from "../components/AdminUserRow";
import axiosInstance from "../utils/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {

      const res = await axiosInstance.get("/users"); 
      
      
      const fetchedData = res.data?.data || res.data || [];
      setUsers(Array.isArray(fetchedData) ? fetchedData : []);
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "ইউজার লিস্ট লোড করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleUserDeleted = (userId) => {
    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleRoleUpdated = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="p-4 md:p-8 bg-[#01040D] min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          User <span className="text-[#40E0D0]">Management</span>
        </h1>
        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-1">Control access and user roles</p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/5 bg-[#0A0F1F] shadow-2xl">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-white/5 text-left text-[10px] uppercase tracking-widest text-gray-400">
              <th className="px-6 py-4 font-black">User Info</th>
              <th className="px-6 py-4 font-black text-center">Current Role</th>
              <th className="px-6 py-4 font-black text-center">Subscription</th>
              <th className="px-6 py-4 font-black text-center">Lessons</th>
              <th className="px-6 py-4 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-20">
                  <div className="inline-block w-8 h-8 border-4 border-[#40E0D0] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs mt-2 text-gray-500 animate-pulse uppercase tracking-widest">Loading Records...</p>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-20 text-gray-500 text-sm italic">
                  No users found in database.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <AdminUserRow
                  key={user._id}
                  userData={user}
                  onDeleted={handleUserDeleted}
                  onRoleUpdated={handleRoleUpdated}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;