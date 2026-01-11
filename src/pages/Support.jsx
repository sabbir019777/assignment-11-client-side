// src/pages/Support.jsx
import React, { useState } from "react";
import { FaTerminal, FaUserShield, FaSatelliteDish, FaCogs, FaEnvelopeOpenText, FaChevronRight } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Support = () => {
  const [search, setSearch] = useState("");

  const helpNodes = [
    {
      id: "N-1",
      icon: <FaUserShield className="text-cyan-400" />,
      title: "Account Security",
      desc: "How to encrypt your profile and manage neural access keys.",
      tags: ["password", "security", "login"]
    },
    {
      id: "N-2",
      icon: <FaSatelliteDish className="text-fuchsia-500" />,
      title: "Transmission Error",
      desc: "Resolving uplink failures during wisdom data transfer.",
      tags: ["error", "upload", "sync"]
    },
    {
      id: "N-3",
      icon: <FaCogs className="text-yellow-400" />,
      title: "System Protocol",
      desc: "Understanding how the decentralized archive architecture works.",
      tags: ["how to", "system", "archive"]
    }
  ];


  const filteredNodes = helpNodes.filter(node => 
    node.title.toLowerCase().includes(search.toLowerCase()) || 
    node.tags.some(tag => tag.includes(search.toLowerCase()))
  );

  const handleSupportRequest = () => {
    toast.success("Connecting to Human Core... Opening Mailer");
    setTimeout(() => {
      window.location.href = "mailto:support@digitallifelessons.com?subject=Emergency System Support";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#02050E] text-slate-300 font-sans selection:bg-cyan-500/30">
      
      {/* --- Top Aesthetic Header --- */}
      <div className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f622_0%,transparent_50%)]"></div>
        
        <div className="relative z-10 text-center px-6">
          <div className="flex justify-center mb-6">
             <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl animate-bounce">
                <FaTerminal className="text-cyan-400 text-2xl" />
             </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
            Command <span className="text-cyan-400">Center</span>
          </h1>
          <p className="text-slate-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
            Human Experience Support Protocol // 2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-20 pb-40">
        
        {/* --- Floating Search Bar --- */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-[#0A0F1D] border border-white/10 p-2 rounded-3xl shadow-2xl backdrop-blur-xl flex items-center">
            <input 
              type="text" 
              placeholder="Type your query (e.g. security, sync)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-6 py-4 outline-none text-white font-mono text-sm uppercase tracking-widest placeholder:text-slate-700"
            />
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all tracking-tighter">
              Scan
            </button>
          </div>
        </div>

        {/* --- Help Nodes Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {filteredNodes.length > 0 ? (
            filteredNodes.map((node) => (
              <div key={node.id} className="group relative bg-[#0A0F1D] border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-8 right-10 text-[10px] font-mono text-slate-800">{node.id}</div>
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">
                  {node.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase italic">{node.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm mb-8">{node.desc}</p>
                
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
               <p className="font-mono text-slate-600 uppercase tracking-[0.5em]">No Intelligence Match Found</p>
            </div>
          )}
        </div>

        {/* --- Emergency Contact Section --- */}
        <div className="max-w-5xl mx-auto">
          <div className="relative p-1 rounded-[3rem] overflow-hidden bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
            <div className="bg-[#050A18] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
               {/* Internal Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[100px] pointer-events-none"></div>
               
               <FaEnvelopeOpenText className="mx-auto text-5xl text-fuchsia-500 mb-8" />
               <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-6 tracking-tighter">
                  Need a <span className="text-fuchsia-500">Human</span> Link?
               </h2>
               <p className="text-slate-500 max-w-xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
                  If our automated systems cannot resolve your synchronization error, initiate a direct transmission to our human core operators.
               </p>
               
               <button 
                 onClick={handleSupportRequest}
                 className="px-12 py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:shadow-[0_0_30px_#fff] transition-all active:scale-95"
               >
                  Initiate Uplink
               </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-32 text-center opacity-20">
           <p className="font-mono text-[10px] uppercase tracking-[1em]">End of Support Transmission // Global Node</p>
        </div>

      </div>
    </div>
  );
};

export default Support;