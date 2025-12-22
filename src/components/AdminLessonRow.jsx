// src/components/AdminLessonRow.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { adminDeleteLesson, toggleFeatured, resolveReport } from "../utils/api"; 
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { format } from "date-fns";
import { FaTrash, FaCheckCircle, FaStar, FaRegStar } from "react-icons/fa";

const AdminLessonRow = ({ lesson, onDeleted, onResolved, isReportedPage = false }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(lesson.isFeatured || false);


  const handleDelete = async () => {
    setLoading(true);
    try {
      await adminDeleteLesson(lesson._id); 
      toast.success("Lesson permanently deleted!");
      onDeleted(lesson._id);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };


  const handleToggleFeatured = async () => {
    try {
      const newStatus = !isFeatured;
      await toggleFeatured(lesson._id, newStatus); 
      setIsFeatured(newStatus);
      toast.success(newStatus ? "Marked as Featured" : "Removed from Featured");
    } catch (err) {
      toast.error("Failed to update featured status");
    }
  };

 
  const handleResolve = async () => {
    try {
      await resolveReport(lesson._id);
      onResolved(lesson._id); 
      toast.success("Report resolved and cleared!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to mark resolved");
    }
  };

  const reportCount = lesson.reportedCount || lesson.reports?.length || 0;
  const hasReports = reportCount > 0;

  return (
    <>
      <tr
        className={`
          transition-all duration-300 border-b border-white/5
          ${hasReports && isReportedPage
            ? "bg-red-500/5 hover:bg-red-500/10"
            : "hover:bg-white/5"}
        `}
      >
        {/* Title & Featured Badge */}

        <td className="px-4 py-4">
          <div className="flex flex-col">
            <span className="font-bold text-white flex items-center gap-2">
              {lesson.title || "Untitled"}
              {isFeatured && <FaStar className="text-yellow-400 text-xs" title="Featured" />}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">{lesson._id}</span>
          </div>
        </td>

        {/* Category */}

        <td className="px-4 py-4">
          <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest
            bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
            {lesson.category || "N/A"}
          </span>
        </td>

        {/* Creator */}

        <td className="px-4 py-4 text-gray-300 text-sm">
          {lesson.creatorName || "Unknown"}
        </td>

        {/* Reports Status */}

        <td className="px-4 py-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold
                ${hasReports
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-green-500/20 text-green-400 border border-green-500/30"}
              `}
            >
              {reportCount} Reports
            </span>
          </div>
        </td>

        {/* Visibility */}

        <td className="px-4 py-4">
           <span className={`text-xs font-bold uppercase ${lesson.accessLevel === 'premium' ? 'text-fuchsia-400' : 'text-emerald-400'}`}>
              {lesson.accessLevel || "Free"}
           </span>
        </td>

        {/* Date */}

        <td className="px-4 py-4 text-gray-400 text-xs font-mono">
          {lesson.createdAt ? format(new Date(lesson.createdAt), "dd MMM yyyy") : "N/A"}
        </td>

        {/* Actions */}

        <td className="px-4 py-4">
          <div className="flex gap-2 justify-end">
            {!isReportedPage && (
              <button
                onClick={handleToggleFeatured}
                className={`p-2 rounded-lg transition-all border ${
                  isFeatured 
                  ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-500" 
                  : "bg-slate-800 border-white/10 text-gray-400 hover:text-yellow-400"
                }`}
                title={isFeatured ? "Unfeature" : "Make Featured"}
              >
                {isFeatured ? <FaStar /> : <FaRegStar />}
              </button>
            )}

            {isReportedPage && (
              <button
                onClick={handleResolve}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold
                  bg-emerald-500/10 text-emerald-500 border border-emerald-500/20
                  hover:bg-emerald-500 hover:text-white transition-all"
              >
                <FaCheckCircle /> Resolve
              </button>
            )}

            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={loading}
              className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20
                hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
              title="Delete Lesson"
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>

      {/* Modal - Adjusted prop name to match your ManageUsers logic */}
      
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={loading}
        title="Confirm Destruction"
        message={`Are you sure you want to delete "${lesson.title}"? This is a permanent action.`}
      />
    </>
  );
};

export default AdminLessonRow;