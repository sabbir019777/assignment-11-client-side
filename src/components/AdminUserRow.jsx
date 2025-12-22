// src/components/AdminUserRow.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; 
import { updateUserRole, deleteUser } from "../utils/api"; 

const AdminUserRow = ({ userData, onDeleted, onRoleUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(userData._id);
      toast.success("User deleted successfully!");
      onDeleted(userData._id);
      setShowDeleteModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    setLoading(true);
    try {
      const newRole = userData.role === "admin" ? "user" : "admin";
      await updateUserRole(userData._id, newRole);
      toast.success(`Role changed to ${newRole}`);
      onRoleUpdated(userData._id, newRole);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
        <td className="px-6 py-4 font-bold text-gray-200">{userData.name}</td>
        <td className="px-6 py-4 text-gray-400 text-sm">{userData.email}</td>
        <td className="px-6 py-4 text-center">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              userData.role === "admin" 
              ? "bg-[#40E0D0]/10 text-[#40E0D0] border border-[#40E0D0]/20" 
              : "bg-gray-500/10 text-gray-400"
            }`}
          >
            {userData.role}
          </span>
        </td>
        <td className="px-6 py-4 text-center text-xs text-gray-500">
          {userData.isPremium ? "💎 PREMIUM" : "FREE"}
        </td>
        <td className="px-6 py-4 text-center font-mono text-gray-400">
          {userData.contributions || 0}
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleRoleChange}
              disabled={loading}
              className="bg-white/5 hover:bg-[#40E0D0] hover:text-black text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all disabled:opacity-50"
            >
              {userData.role === "admin" ? "Demote" : "Make Admin"}
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={loading}
              className="bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Confirm Delete Modal */}
      
      {showDeleteModal && (
        <ConfirmDeleteModal
          title="Security Authorization"
          message={`Terminate access for "${userData.name}"? All associated data will be purged.`}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      )}
    </>
  );
};

export default AdminUserRow;