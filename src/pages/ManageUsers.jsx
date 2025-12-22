import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Loader2, ShieldCheck, User, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { getAllUsers, deleteUser, updateUserRole } from "../utils/api"; 
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      setActionLoading(userToDelete.id);
      await deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete.id));
      toast.success("User removed from matrix");
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setActionLoading(null);
      setModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleRoleUpdate = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      setActionLoading(id);
      await updateUserRole(id, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
      toast.success(`Access level changed to ${newRole.toUpperCase()}`);
    } catch (err) {
      toast.error("Role update failed");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-blue-900 text-white selection:bg-cyan-500/30">
      
      {/* ১. হেডার সেকশন */}
      <div className="flex flex-col items-center mb-16 relative">
        <div className="absolute top-0 w-72 h-72 bg-cyan-500/10 blur-[120px] -z-10" />
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md"
        >
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-cyan-400">System Directory</span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-black mb-6 text-center tracking-tighter"
          style={{ textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
        >
          NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">DATABASE</span>
        </motion.h1>

        {/* সার্চ বার */}
        <div className="relative w-full max-w-2xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex items-center bg-[#0a0f18] border border-white/10 rounded-2xl overflow-hidden">
            <Search className="ml-6 w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
            <input
              placeholder="Query Identity or Credentials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 py-5 bg-transparent outline-none text-lg font-medium placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-6">
          <div className="relative">
             <Loader2 className="w-16 h-16 text-cyan-500 animate-spin" />
             <div className="absolute inset-0 blur-xl bg-cyan-500/20 animate-pulse" />
          </div>
          <p className="text-cyan-500 font-mono text-[10px] tracking-[0.5em] animate-pulse">SYNCHRONIZING_MATRIX...</p>
        </div>
      ) : (
        /* ২. কার্ড গ্রিড (সাইজ বড় করা হয়েছে) */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div 
                key={user._id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* কার্ড ব্যাকগ্রাউন্ড গ্লো */}
                <div className={`absolute -inset-0.5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm ${user.role === 'admin' ? 'bg-fuchsia-500/30' : 'bg-cyan-500/30'}`} />
                
                <div className="relative bg-[#0a0f18]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] overflow-hidden">
                  
                  {/* ইউজার প্রোফাইল সেকশন */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <img
                          src={user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`}
                          className="w-20 h-20 rounded-3xl object-cover border-2 border-white/10 group-hover:border-cyan-400 transition-colors duration-500 shadow-2xl"
                          alt="avatar"
                        />
                        <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-lg border border-white/10 ${user.role === 'admin' ? 'bg-fuchsia-500' : 'bg-cyan-500'}`}>
                          {user.role === 'admin' ? <ShieldCheck className="w-3 h-3 text-white" /> : <User className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <div className="max-w-[180px]">
                        <h2 className="font-black text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors truncate">
                          {user.name || "Unknown Entity"}
                        </h2>
                        <p className="text-xs font-mono text-gray-500 truncate mt-1">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* ডিটেইলস প্যানেল */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 px-5 py-4 rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Auth Priority</span>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${user.role === 'admin' ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.1)]' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'}`}>
                        {user.role?.toUpperCase()}
                      </span>
                    </div>

                    {/* অ্যাকশন বাটন */}
                    <div className="flex gap-3 pt-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setUserToDelete({ id: user._id, name: user.name });
                          setModalOpen(true);
                        }}
                        className="p-4 bg-red-500/5 hover:bg-red-500/20 text-red-500 rounded-2xl border border-red-500/20 transition-all flex items-center justify-center group/del"
                      >
                        <Trash2 className="w-5 h-5 group-hover/del:animate-bounce" />
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRoleUpdate(user._id, user.role)}
                        disabled={actionLoading === user._id}
                        className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all border ${
                          user.role === 'admin' 
                          ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                          : 'bg-cyan-500 border-cyan-400 text-[#020617] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                        }`}
                      >
                        {actionLoading === user._id ? (
                          <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                          <>
                            {user.role === 'admin' ? 'Revoke Protocol' : 'Upgrade Access'}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড এলিমেন্ট */}
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <ShieldCheck className="w-32 h-32 -mr-10 -mt-10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        loading={actionLoading === userToDelete?.id}
        title="CRITICAL_ACTION_REQUIRED"
        message={`Are you prepared to permanently terminate the entity "${userToDelete?.name}" from the central neural network?`}
      />
    </div>
  );
};

export default ManageUsers;