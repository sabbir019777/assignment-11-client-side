
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FaqSection = () => {
  const faqs = [
    {
      q: "How do I transmit a lesson?",
      a: "Initiate the uplink sequence via your personal dashboard. Utilize the 'Transmit' module to securely broadcast your collective wisdom to our decentralized global neural network, ensuring your data reaches every active node instantly for shared growth."
    },
    {
      q: "Is the archive secure?",
      a: "Security is our core priority. Every data packet is layered with multi-stage quantum encryption and distributed across a peer-to-peer storage mesh, making it virtually immune to unauthorized access or system breaches within the archive."
    },
    {
      q: "Can I go Premium?",
      a: "Elevate your clearance level to 'Premium' through the central core interface. This protocol unlocks high-tier insights, deep-layer neural processing, and exclusive access to advanced cognitive archives reserved for evolved members."
    },
    {
      q: "What is the Sync Frequency?",
      a: "Our system maintains a continuous synchronization protocol. Data packets are updated across the decentralized network every 60 seconds, ensuring that all subscribers have real-time access to the latest wisdom transmissions globally."
    }
  ];

  return (
    <section className="mb-32 max-w-4xl mx-auto px-4 py-16">

      {/* --- Section Header --- */}
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-3">
          Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Protocols</span>
        </h3>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em]">Internal System Directives</p>
      </div>

      {/* --- FAQ Smaller Grid --- */}
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="group relative bg-[#0A0F1E]/60 border border-white/5 rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:border-[#40E0D0]/30"
          >
            {/* Animated Border Line (Hover) */}
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] group-hover:w-full transition-all duration-700"></div>

            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                  <span className="text-2xl md:text-3xl font-black text-white/10 group-hover:text-[#40E0D0] transition-colors">
                    0{i + 1}
                  </span>
                  <h5 className="text-lg md:text-xl font-bold text-gray-200 group-hover:text-white transition-all tracking-tight">
                    {item.q}
                  </h5>
                </div>

                {/* Icon Toggle */}
                <div className="text-[#FF00FF] group-hover:rotate-90 transition-transform duration-500 text-base">
                  <FaPlus className="group-hover:hidden" />
                  <FaMinus className="hidden group-hover:block" />
                </div>
              </div>

              {/* Description Reveal - Expanded max-height for longer text */}
              <div className="max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
                <p className="mt-6 text-gray-400 text-sm md:text-base font-light leading-relaxed border-l border-[#40E0D0]/50 pl-6 italic">
                  {item.a}
                </p>
              </div>
            </div>

            {/* Subtle Glow Overlay */}
            <div className="absolute inset-0 bg-[#40E0D0]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Note */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 font-mono text-[9px] uppercase tracking-[0.6em] animate-pulse">
          End of Protocol List // Status: Secure
        </p>
      </div>

    </section>
  );
};

export default FaqSection;