// src/pages/Blog.jsx
import React, { useState } from "react";
import { FaClock, FaUser, FaBrain, FaHashtag, FaTimes, FaExpandAlt } from "react-icons/fa";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Resilient Mindset",
      excerpt: "Your past struggles are the blueprints for future strength. Learn to adapt and thrive.",
      description: "A resilient mindset is not something you are born with; it is something you build through the fire of experience. Every time you face a challenge in life, your neural pathways are being re-coded to handle more. In our Digital Life Lessons archive, we believe that sharing these moments of survival creates a global network of strength. When you reflect on your journey, you realize that your deepest failures were actually your greatest teachers. Stay strong, keep evolving, and remember: the digital legacy you leave today will be the light for someone lost tomorrow.",
      author: "Dr. Neural",
      date: "Jan 08, 2026",
      category: "Mind",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800"
    },
    {
      id: 2,
      title: "Digital Detox",
      excerpt: "Disconnect from the noise to reconnect with your soul's true purpose and wisdom.",
      description: "In an age of constant connectivity, the loudest noise often comes from our screens. But wisdom speaks in whispers. To hear it, you must initiate a digital detox protocol. By stepping away from the data stream, you allow your core essence to synchronize with reality. This project is a sanctuary where you can store those moments of clarity. Don't let the algorithm dictate your happiness. Reclaim your time, reflect on your true self, and upload only what is meaningful to the collective consciousness.",
      author: "Alpha",
      date: "Jan 05, 2026",
      category: "Well",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
    },
    {
      id: 3,
      title: "Collective Wisdom",
      excerpt: "One shared lesson can illuminate the path for thousands. Your experience matters.",
      description: "The power of humanity lies in our ability to transmit knowledge across generations. Your life lesson, no matter how small it seems to you, could be the missing piece of someone else's puzzle. By contributing to this decentralized library, you are participating in the evolution of human intelligence. Every story told is a bridge built. Be the mentor you wish you had. Share your light, archive your wisdom, and let's build a future where no one has to struggle through the same darkness alone.",
      author: "Legacy",
      date: "Jan 02, 2026",
      category: "Inno",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
    },
    {
      id: 4,
      title: "Neural Synergy",
      excerpt: "Bridge the gap between human intuition and digital memory to preserve your legacy.",
      description: "We are at the frontier of a new era where human thought and digital archives merge. This synergy is not about losing our humanity, but about amplifying it. Imagine a world where your life's greatest realizations are never lost. Neural Synergy is about optimizing that bridge. Use this platform to architect your digital legacy. Your intuition is the compass, and our archive is the map. Together, we are ensuring that human wisdom survives the test of time and technology.",
      author: "Keeper",
      date: "Dec 30, 2025",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800"
    },
    {
      id: 5,
      title: "Failure to Fuel",
      excerpt: "Every mistake is a data point in your journey toward mastery. Embrace the errors.",
      description: "Stop fearing your mistakes. In the grand system of life, every error is simply a signal for correction. When you fail, you are actually gathering the most valuable data points for your future success. This platform encourages you to share those failures. Why? Because when we normalize the struggle, we accelerate the growth of the entire community. Turn your setbacks into a fuel source. Archive your mistakes, analyze the feedback, and relaunch yourself with more power than ever before.",
      author: "Mentor",
      date: "Dec 28, 2025",
      category: "Growth",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"
    },
    {
      id: 6,
      title: "Silent Reflection",
      excerpt: "Wisdom often speaks in whispers. Find clarity in the silence of your digital vault.",
      description: "In the rush of daily life, we forget to look inward. A silent reflection is a system reboot for the soul. Use your digital vault as a space for quiet contemplation. What have you learned this week? What made you smile? What made you grow? By documenting these reflections, you create a tangible record of your mental evolution. Wisdom isn't found in the fast lane; it's found in the moments when you pause. Take a breath, reflect, and let your journey unfold with intention.",
      author: "ZenNode",
      date: "Dec 25, 2025",
      category: "Spirit",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"
    },
    {
      id: 7,
      title: "The Legacy Protocol",
      excerpt: "Write your story today so it becomes the lighthouse for someone lost tomorrow.",
      description: "What will remain of your thoughts 100 years from now? The Legacy Protocol is our commitment to preserving the human narrative. Your life is a unique transmission of data, filled with emotions, lessons, and breakthroughs. Don't let it vanish into the void. By archiving your story today, you are providing a lighthouse for future generations. Your experiences are the most valuable assets you own. Secure them here, and let your legacy inspire the world forever.",
      author: "ArchiveMaster",
      date: "Dec 22, 2025",
      category: "Legacy",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800"
    },
    {
      id: 8,
      title: "Future Evolution",
      excerpt: "Step into the next version of yourself by auditing the lessons of your past.",
      description: "The only constant in life is change, but the only way to evolve is through conscious reflection. To step into the next version of yourself, you must audit the lessons of your past. Our archive provides the tools for this audit. Look back at your saved lessons, see how far you've come, and use that momentum to propel yourself forward. Evolution is a choice. Choose to learn, choose to grow, and choose to be a part of the global wisdom revolution. Your future self is waiting.",
      author: "Nexus",
      date: "Dec 20, 2025",
      category: "Future",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#01040D] text-white pt-20 pb-40 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#40E0D0]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF00FF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
            <FaBrain className="text-[#40E0D0] text-[8px]" />
            <span className="text-[#40E0D0] font-mono text-[8px] uppercase tracking-[0.3em]">Intelligence Feed</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Wisdom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Archives</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Decrypted data nodes of human experience</p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="group relative flex flex-col bg-[#05070F] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#40E0D0]/40 h-full shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-transparent z-10 opacity-70"></div>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-mono text-[#40E0D0] uppercase tracking-widest">
                    <FaHashtag size={6} className="inline mr-1" />{blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-gray-500 text-[8px] font-mono uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><FaUser size={8} className="text-[#FF00FF]" /> {blog.author}</span>
                  <span className="flex items-center gap-1"><FaClock size={8} className="text-[#40E0D0]" /> {blog.date}</span>
                </div>
                <h2 className="text-lg font-black uppercase italic mb-3 leading-tight group-hover:text-[#40E0D0] transition-colors">{blog.title}</h2>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3">{blog.excerpt}</p>
                
                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="mt-auto py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-white uppercase tracking-widest hover:bg-[#40E0D0] hover:text-black hover:font-bold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaExpandAlt size={10} /> View Transmission
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Full Project View Modal --- */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-black/80 animate-fadeIn">
          <div className="relative bg-[#05070F] border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(64,224,208,0.2)] flex flex-col md:flex-row">
            
            {/* Modal Close Button */}
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-red-500 rounded-full transition-colors text-white"
            >
              <FaTimes size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-4 text-[#40E0D0] text-[10px] font-mono uppercase tracking-[0.3em] mb-6">
                <span>{selectedBlog.category}</span>
                <span className="w-10 h-[1px] bg-white/20"></span>
                <span>{selectedBlog.date}</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                {selectedBlog.title}
              </h2>

              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-10 font-light first-letter:text-5xl first-letter:font-black first-letter:text-[#40E0D0] first-letter:mr-3 first-letter:float-left">
                {selectedBlog.description}
              </p>

              <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#40E0D0] to-[#FF00FF] flex items-center justify-center font-black text-black text-xs">
                    {selectedBlog.author[0]}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Decrypted By</p>
                    <p className="text-sm font-bold text-white">{selectedBlog.author}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#FF00FF] hover:text-white transition-all"
                >
                  Close Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #40E0D0;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default Blog;