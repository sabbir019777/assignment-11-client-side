// src/components/Newsletter.jsx
import React, { useState } from "react";
import { FaArrowRight, FaBolt, FaSatellite, FaCheckCircle, FaTimes } from "react-icons/fa";

const Newsletter = () => {
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState("");

  const handleConnect = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setShowToast(true);
      setEmail("");
    
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <section className="mb-32 px-4 relative flex flex-col items-center">
      
      {/* --- Title Section (Moved to Top Center) --- */}
      <div className="text-center mb-16 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
          <FaBolt className="text-[#FF00FF] animate-pulse text-xs" />
          <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">Neural Uplink Ready</span>
        </div>
        <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
          Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] drop-shadow-[0_0_15px_rgba(64,224,208,0.3)]">Uplink</span>
        </h3>
        <p className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-[0.4em]">Global Transmission Network</p>
      </div>

      {/* --- Floating Energy Ring (Animation) --- */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none">
        <div className="absolute inset-0 border-2 border-[#40E0D0]/20 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-10 border border-[#FF00FF]/30 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#40E0D0]/5 to-[#FF00FF]/5 blur-[120px] rounded-full"></div>
      </div>

      {/* --- Main Portal Card --- */}
      <div className="relative z-10 w-full max-w-4xl bg-[#050505]/80 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 md:p-20 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-20 flex flex-col items-center">
          <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-2xl text-center mb-12">
            Receive weekly transmissions directly to your neural-link. Join 10,000+ users receiving encrypted wisdom.
          </p>

          <form 
            className="w-full max-w-2xl flex flex-col md:flex-row gap-4" 
            onSubmit={handleConnect}
          >
            <div className="relative flex-1 group/input">
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="USERID@EMAIL.COM" 
                className="w-full px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-[#40E0D0] focus:bg-white/[0.05] transition-all font-mono text-sm tracking-widest" 
              />
            </div>

            <button 
              type="submit" 
              className="px-12 py-5 bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] p-[1px] rounded-2xl group/btn overflow-hidden transition-all active:scale-95 shadow-[0_0_20px_rgba(64,224,208,0.2)]"
            >
              <div className="w-full h-full bg-black rounded-[15px] px-6 flex items-center justify-center gap-3 transition-all group-hover/btn:bg-transparent">
                <span className="text-white group-hover/btn:text-black font-black uppercase tracking-[0.2em] text-sm">
                  Connect
                </span>
                <FaArrowRight className="text-[#40E0D0] group-hover/btn:text-black transition-transform group-hover/btn:translate-x-2" />
              </div>
            </button>
          </form>

          <div className="mt-10 flex justify-center items-center gap-6 font-mono text-[9px] text-gray-600 uppercase tracking-widest">
            <span>Encrypted 256-bit</span>
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            <span>Ver: 9.0.4</span>
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            <span>Secure Node</span>
          </div>
        </div>
      </div>

      {/* --- Cyber Toast Notification --- */}
      {showToast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-slide-in">
          <div className="bg-[#050505] border-2 border-[#40E0D0] rounded-2xl p-6 shadow-[0_0_30px_#40E0D044] flex items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#40E0D0]"></div>
            <FaCheckCircle className="text-[#40E0D0] text-2xl animate-pulse" />
            <div>
              <h4 className="text-white font-black uppercase tracking-tighter text-sm">Uplink Success</h4>
              <p className="text-gray-500 font-mono text-[10px] uppercase">Connection Established</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="ml-4 text-gray-600 hover:text-white transition-colors"
            >
              <FaTimes size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Decorative Bottom Tag */}
    <div className="absolute -bottom-6 px-8 py-2 bg-[#3290b0] border border-white/10 rounded-full text-black/80 font-mono text-[10px] font-bold uppercase tracking-[0.4em] shadow-[0_0_10px_rgba(64,224,208,0.2)] z-30">
  Active Connection Protocol
</div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}} />

    </section>
  );
};

export default Newsletter;