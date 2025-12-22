import React, { useState } from "react";
import { auth } from "../Firebase/Firebase.config"; 
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLink, FaArrowLeft, FaSave, FaFingerprint } from "react-icons/fa";

const UpdateProfile = () => {
  const currentUser = auth.currentUser; 
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
        toast.success("SYSTEM IDENTITY OVERWRITTEN");
        navigate("/dashboard/profile");
        window.location.reload(); 
      } else {
        toast.error("NO_ACTIVE_SESSION_FOUND");
      }
    } catch (error) {
      toast.error("SYSTEM ERROR: FAILED TO UPDATE");
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white p-6 flex justify-center items-center relative overflow-hidden font-mono">
      {/* Background Tech Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#22d3ee 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}></div>
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full"></div>

      {/* Main Container */}
      <div className="w-full max-w-md relative">
        {/* Decorative Corners */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500 z-20"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500 z-20"></div>

        <div className="bg-[#0b0f1a]/80 backdrop-blur-2xl border border-white/10 rounded-sm p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-cyan-400 hover:text-white transition-all mb-4 text-[10px] tracking-[0.2em] uppercase"
              >
                <FaArrowLeft /> [ BACK_TO_TERMINAL ]
              </button>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white flex items-center gap-3">
                <span className="bg-cyan-500 text-black px-2 text-xl">U</span> 
                Update_Node
              </h2>
            </div>
            <FaFingerprint className="text-3xl text-cyan-500/30" />
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Display Name Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest flex justify-between">
                <span>Assign_Identity_Name</span>
                <span className="text-cyan-500/50">ID: {currentUser?.uid?.slice(0, 8)}</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500 group-focus-within:h-full transition-all"></div>
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/10 p-4 pl-12 outline-none transition-all focus:bg-white/10 font-bold"
                  placeholder="USERNAME_REQUIRED"
                  required
                />
              </div>
            </div>

            {/* Photo URL Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest">Avatar_Source_Link</label>
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-fuchsia-500"></div>
                <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-fuchsia-400" />
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full bg-white/5 border-b border-white/10 p-4 pl-12 outline-none transition-all focus:bg-white/10 font-bold"
                  placeholder="HTTPS://SOURCE_URL"
                />
              </div>
            </div>

            {/* Visual Preview Unit */}
            <div className="p-4 bg-black/40 border border-white/5 relative flex items-center gap-6 group">
              <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent"></div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-cyan-500/50 p-1">
                  <img 
                    src={photoURL || "/default-avatar.png"} 
                    alt="Preview" 
                    onError={(e) => e.target.src = "/default-avatar.png"}
                    className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 animate-pulse rounded-full"></div>
              </div>
              <div>
                <p className="text-[10px] text-cyan-400 mb-1 tracking-widest underline">LIVE_FEED_PREVIEW</p>
                <p className="text-sm font-bold truncate max-w-[150px]">{displayName || "WAITING_FOR_DATA..."}</p>
              </div>
            </div>

            {/* Execute Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full group relative py-5 uppercase font-black tracking-[0.3em] overflow-hidden transition-all duration-500 ${
                loading ? "cursor-wait opacity-50" : "hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              }`}
            >
              <div className="absolute inset-0 bg-cyan-500 group-hover:bg-fuchsia-600 transition-colors duration-500" 
                   style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 75%, 85% 100%, 0 100%, 0 25%)' }}></div>
              <span className="relative z-10 flex items-center justify-center gap-3 text-black">
                {loading ? (
                  "SYNCHRONIZING..."
                ) : (
                  <> <FaSave className="animate-bounce" /> Update Profile </>
                )}
              </span>
            </button>

          </form>
          
          {/* Bottom Decor */}
          <div className="mt-8 flex justify-between items-center opacity-30 text-[8px] tracking-[0.3em] uppercase">
            <span>Auth_Token: Active</span>
            <span>Ver: 2.0.45</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;