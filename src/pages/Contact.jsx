// src/pages/Contact.jsx
import React, { useRef } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 
import { toast } from "react-hot-toast";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message Transmitted to Neural Network!");
    formRef.current.reset();
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-[#40E0D0]" />,
      label: "Secure Mail",
      value: "uplink@digitallessons.com"
    },
    {
      icon: <FaPhoneAlt className="text-[#FF00FF]" />,
      label: "Support Beacon",
      value: "+880 1234 567 890"
    },
    {
      icon: <FaMapMarkerAlt className="text-[#40E0D0]" />,
      label: "Main Hub",
      value: "Dhaka, Bangladesh // Grid-77"
    }
  ];

  return (
    <div className="min-h-screen bg-[#01040D] text-white pt-20 pb-40 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#40E0D0]/5 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF00FF]/5 blur-[150px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Touch</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.4em]">Establish Communication Link</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black uppercase italic mb-6">System <span className="text-[#40E0D0]">Channels</span></h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Need technical assistance or want to share a legacy partnership? Our team is active 24/7 across the global wisdom network.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-[#40E0D0]/30 transition-all group shadow-xl">
                  <div className="text-2xl p-4 bg-black rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{info.label}</p>
                    <p className="text-white font-bold tracking-wide">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Nodes with Hover Effects */}
            <div className="flex flex-wrap gap-4 pt-6">
               {/* Facebook */}
               <a href="https://facebook.com" target="_blank" rel="noreferrer" 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-110 hover:shadow-[0_0_20px_#1877F266] transition-all duration-300">
                  <FaFacebook size={24} />
               </a>

               {/* Instagram */}
               <a href="https://instagram.com" target="_blank" rel="noreferrer" 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:scale-110 hover:shadow-[0_0_20px_#ee2a7b66] transition-all duration-300">
                  <FaInstagram size={24} />
               </a>

               {/* Discord */}
               <a href="https://discord.com" target="_blank" rel="noreferrer" 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-[#5865F2] hover:border-[#5865F2] hover:scale-110 hover:shadow-[0_0_20px_#5865F266] transition-all duration-300">
                  <FaDiscord size={24} />
               </a>

               {/* X (Twitter) */}
               <a href="https://x.com" target="_blank" rel="noreferrer" 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-black hover:border-white/40 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                  <FaXTwitter size={24} />
               </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-[#05070F] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono text-gray-500 ml-2 tracking-widest">Operator Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#40E0D0]/50 transition-all text-sm" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono text-gray-500 ml-2 tracking-widest">Neural ID</label>
                    <input type="email" placeholder="name@domain.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#40E0D0]/50 transition-all text-sm" required />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono text-gray-500 ml-2 tracking-widest">Subject</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#40E0D0]/50 transition-all text-gray-400 text-sm">
                      <option className="bg-[#05070F]">General Inquiry</option>
                      <option className="bg-[#05070F]">System Bug Report</option>
                      <option className="bg-[#05070F]">Premium Upgrade</option>
                    </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono text-gray-500 ml-2 tracking-widest">Transmission</label>
                  <textarea rows="4" placeholder="Enter data..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#40E0D0]/50 transition-all resize-none text-sm" required></textarea>
                </div>

                <button type="submit" className="w-full group/btn flex items-center justify-center gap-4 bg-gradient-to-r from-cyan-400 to-fuchsia-600 p-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:shadow-[0_0_30px_rgba(64,224,208,0.4)] transition-all active:scale-95">
                  <FaPaperPlane className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  Broadcast Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;