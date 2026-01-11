// src/pages/About.jsx
import React, { useState, useEffect } from "react";
import { FaBrain, FaRocket, FaUsers, FaShieldAlt, FaFingerprint, FaConnectdevelop } from "react-icons/fa";

const About = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const values = [
    {
      icon: <FaBrain className="text-[#40E0D0]" />,
      title: "Neural Wisdom",
      desc: "We transform human life experiences into digital insights and lessons so that future generations can evolve through collective knowledge."
    },
    {
      icon: <FaShieldAlt className="text-[#FF00FF]" />,
      title: "Data Integrity",
      desc: "Your memories and lessons are safe with us. Our system utilizes advanced encryption protocols to protect your intellectual legacy."
    },
    {
      icon: <FaRocket className="text-[#40E0D0]" />,
      title: "Future Ready",
      desc: "We empower individuals to face the challenges of the digital age by building a strong foundation of shared human experiences."
    },
    {
      icon: <FaUsers className="text-[#FF00FF]" />,
      title: "Global Node",
      desc: "A decentralized global network where people from every corner of the world transmit their most valuable life lessons."
    }
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500", label: "Collaboration" },
    { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500", label: "Security" },
    { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=500", label: "AI Integration" },
    { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500", label: "Innovation" }
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-[#01040D] flex flex-col items-center justify-center">
        <div className="relative">
          <FaConnectdevelop className="text-[#40E0D0] text-6xl animate-spin-slow shadow-[0_0_30px_#40E0D0]" />
          <div className="absolute inset-0 bg-[#40E0D0] blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <p className="mt-8 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.8em] animate-pulse">
          Establishing Neural Link...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#01040D] text-white pt-20 pb-40 overflow-hidden relative animate-in fade-in duration-1000">
      
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#40E0D0]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#FF00FF]/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <FaFingerprint className="text-[#40E0D0] text-xs" />
            <span className="text-[#40E0D0] font-mono text-[10px] uppercase tracking-[0.5em]">Origin: Project_Wisdom</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter leading-none mb-8">
            Decoding <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Human Journey</span>
          </h1>
          <p className="max-w-2xl text-gray-500 text-lg md:text-xl font-light leading-relaxed italic">
            Digital Life Lessons is more than a platform; it is a decentralized digital archive where the profound experiences of humanity are preserved to inspire and guide.
          </p>
        </div>

        {/* --- Gallery & Mission Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-40 items-center">
          <div className="grid grid-cols-2 gap-4 relative group">
            <div className="absolute -inset-4 bg-[#40E0D0]/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            {galleryImages.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl border border-white/10 relative transition-transform duration-500 hover:scale-[1.02] ${i === 1 || i === 2 ? "translate-y-6" : ""}`}>
                 <img src={img.url} alt={img.label} className="w-full h-48 md:h-64 object-cover" />
              </div>
            ))}
          </div>
          
          <div className="space-y-10 lg:pl-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Our <span className="text-[#40E0D0]">Mission</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-[#FF00FF] pl-8">
              We believe that every person carries at least one story that can change another life. Our mission is to aggregate those invaluable lessons into a digital library that evolves and enriches human civilization through time.
            </p>
            <div className="flex gap-6">
               <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center flex-1 shadow-2xl">
                  <h4 className="text-[#40E0D0] font-bold text-2xl mb-1">10k+</h4>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest">Active Nodes</p>
               </div>
               <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center flex-1 shadow-2xl">
                  <h4 className="text-[#FF00FF] font-bold text-2xl mb-1">50k+</h4>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest">Wisdom Packets</p>
               </div>
            </div>
          </div>
        </div>

        {/* --- Values Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {values.map((val, i) => (
            <div key={i} className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.05] hover:border-[#40E0D0]/30 transition-all duration-500 group shadow-lg">
              <div className="text-3xl mb-6 group-hover:rotate-12 transition-transform">
                {val.icon}
              </div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-4 text-sm">{val.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-mono">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* --- Bottom CTA: System Sync --- */}
        <div className="relative text-center py-24 border border-white/10 rounded-[5rem] bg-gradient-to-br from-[#40E0D0]/5 to-transparent overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          
          <h3 className="relative z-10 text-4xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter">
            Join the Global <br /> <span className="text-[#40E0D0]">Neural</span> Collective
          </h3>

          <div className="mt-8 text-gray-600 font-mono text-[9px] uppercase tracking-[0.5em]">
             System Status: Ready for Transmission // 2026
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default About;