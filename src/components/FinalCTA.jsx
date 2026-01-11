// src/components/FinalCTA.jsx
import React, { useState } from "react";
import { FaFingerprint, FaShieldAlt, FaBook, FaGlobe, FaChevronRight, FaLock } from "react-icons/fa";

const FinalCTA = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  const legalContent = {
    privacy: {
      id: "P-772",
      title: "Privacy Shield",
      desc: "Your data is encrypted at the neural level. We prioritize your privacy in the Digital Archive system with zero-knowledge protocols.",
      links: [
        { name: "Privacy Policy", url: "https://privacy.org" },
        { name: "Global Security", url: "https://staysafeonline.org" }
      ],
      icon: <FaFingerprint className="text-[#40E0D0]" />
    },
    terms: {
      id: "T-808",
      title: "Service Terms",
      desc: "By interfacing with the system, you agree to follow the collective evolution and decentralized data integrity protocols.",
      links: [
        { name: "System Rules", url: "https://www.w3.org" },
        { name: "Ethical Tech", url: "https://humanetech.com" }
      ],
      icon: <FaShieldAlt className="text-[#FF00FF]" />
    },
    lessons: {
      id: "L-101",
      title: "Digital Wisdom",
      desc: "Access the decentralized library of human experiences stored securely within our global neural node network.",
      links: [
        { name: "Wisdom Hub", url: "https://www.mindful.org" },
        { name: "Neural Insights", url: "https://digitallifelessons.com" }
      ],
      icon: <FaBook className="text-[#40E0D0]" />
    }
  };

  return (
    <section className="mb-40 py-24 relative overflow-hidden bg-[#020202]">
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#40E0D0]/30 to-transparent"></div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#40E0D0]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <FaLock className="text-[#40E0D0] text-[10px]" />
            <span className="text-[#40E0D0] font-mono text-[10px] uppercase tracking-[0.3em]">Secure Interface</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Protocols</span>
          </h2>
          <p className="mt-4 text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">Internal Directive: Final_Uplink_v9</p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row border border-white/10 rounded-[3.5rem] bg-gradient-to-br from-[#080808] to-black backdrop-blur-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <aside className="w-full lg:w-[38%] bg-white/[0.01] border-r border-white/10 p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#40E0D0]/10 blur-3xl rounded-full"></div>
            
            <div className="mb-12 relative">
              <span className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.5em] block mb-2">Navigation</span>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">LEGAL CENTER</h3>
            </div>

            <nav className="space-y-4 relative">
              {Object.keys(legalContent).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full group flex items-center justify-between p-6 rounded-[2rem] transition-all duration-700 border ${
                    activeTab === key 
                    ? "bg-gradient-to-r from-[#40E0D0]/20 to-transparent border-[#40E0D0]/40 text-white shadow-[0_0_25px_rgba(64,224,208,0.15)]" 
                    : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center font-mono text-[9px] ${activeTab === key ? "border-[#40E0D0] text-[#40E0D0]" : ""}`}>
                      {legalContent[key].id.split('-')[1]}
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs">{legalContent[key].title}</span>
                  </div>
                  <FaChevronRight className={`text-[10px] transition-all duration-500 ${activeTab === key ? "translate-x-0 opacity-100 text-[#40E0D0]" : "-translate-x-4 opacity-0"}`} />
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1 p-10 lg:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF00FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="mb-10 relative inline-block">
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-20"></div>
                <div className="relative p-5 bg-black border border-white/10 rounded-2xl shadow-xl">
                  {legalContent[activeTab].icon}
                </div>
              </div>

        
              <h2 className="text-4xl md:text-6xl font-[1000] text-white uppercase italic leading-[0.85] mb-8 tracking-tighter">
                {legalContent[activeTab].title.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] bg-[size:200%] animate-gradient-slow">
                  {legalContent[activeTab].title.split(' ')[1]}
                </span>
              </h2>

              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-12 max-w-xl italic border-l-2 border-[#40E0D0]/20 pl-6">
                {legalContent[activeTab].desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {legalContent[activeTab].links.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-[#40E0D0]/50 hover:bg-white/[0.07] transition-all duration-500 group/link shadow-lg"
                  >
                    <div className="flex flex-col">
                        <span className="text-gray-500 font-mono text-[8px] uppercase tracking-widest mb-1">External_Link</span>
                        <span className="text-white font-black uppercase text-[11px] tracking-widest">{link.name}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover/link:bg-[#40E0D0] group-hover/link:border-[#40E0D0] transition-all duration-500">
                        <FaGlobe className="text-[12px] text-gray-400 group-hover/link:text-black" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </main>
        </div>

        <div className="mt-12 flex justify-center opacity-20">
            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-[1em]">All Rights Reserved // Digital_Life_Lessons_Core_2026</p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          animation: gradient-slow 8s ease infinite;
        }
      `}} />

    </section>
  );
};

export default FinalCTA;