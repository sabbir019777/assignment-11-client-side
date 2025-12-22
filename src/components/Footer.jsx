// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";

import { FaSquareXTwitter } from "react-icons/fa6"; // Twitter/X Icon

import { toast } from "react-hot-toast";

const Footer = () => {
  const year = new Date().getFullYear();

  const contactEmail = "support@digitallifelessons.com";
  const websiteName = "Digital Life Lessons";
  const shortLogoText = "DL";

  const [subEmail, setSubEmail] = useState("");

  const socialLinks = [
    { icon: <FaSquareXTwitter size={18} />, href: "#" },
    { icon: <FaFacebookF size={16} />, href: "#" },
    { icon: <FaLinkedinIn size={16} />, href: "#" },
    { icon: <FaInstagram size={16} />, href: "#" },
  ];

  // Logic remains exactly the same
  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!subEmail) return toast.error("⚠️ Please enter your email!");
    if (!/\S+@\S+\.\S+/.test(subEmail))
      return toast.error("❌ Please enter a valid email!");

    toast.success("🎉 Subscribed Successfully!");
    setSubEmail("");
  };

  // Modernized FooterLink Component
  const FooterLink = ({ to, children }) => (
    <li className="flex items-center group">
      <FaChevronRight className="text-fuchsia-400 opacity-80 group-hover:opacity-100 transition w-3 h-3 mr-2 group-hover:translate-x-0.5" />
      <Link
        to={to}
        className="text-slate-300 text-base font-light hover:text-cyan-300 transition-all duration-300 border-b border-transparent hover:border-cyan-300/50"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <footer
      className="
        relative 
        bg-[#070211] 
        text-slate-200 
        font-sans 
        border-t border-fuchsia-500/30 
        overflow-hidden
      "
    >
      {/* Background Cyberpunk Gradient/Glow Effect */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_80%,#8A4DFF33_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_20%,#00F6FF22_0%,transparent_50%)]" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Optional: Subtle Noise Texture for Retro-Futurism */}
      <div className="absolute inset-0 bg-repeat opacity-[0.05]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")'}}></div>


      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-16 z-20">
        {/* LOGO + ABOUT */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-4 group">
            <div
              className="
                w-16 h-16 rounded-3xl 
                bg-gradient-to-br from-cyan-400 to-fuchsia-600
                shadow-[0_0_20px_#8A4DFFaa]
                flex items-center justify-center 
                transition-all duration-500
                group-hover:shadow-[0_0_35px_#00F6FFff] group-hover:rotate-6
              "
            >
              <span className="text-[#070211] font-black text-3xl tracking-wider -mt-1">
                {shortLogoText}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-cyan-300 group-hover:text-fuchsia-400 transition">
              {websiteName}
            </h2>
          </Link>

          <p className="text-slate-400 text-sm leading-relaxed max-w-xs pt-2 border-t border-fuchsia-400/20 font-bold">
            A futuristic sanctuary for wisdom. Capture moments, reflect on life,
            and grow with the power of shared experiences.
          </p>

          {/* Social Icons - Unique Hover Effect */}
          <div className="flex gap-4 pt-4">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="
                  p-3 rounded-xl bg-[#0B1220] 
                  text-cyan-300
                  transition-all duration-300
                  shadow-[0_0_15px_#00F6FF33]
                  hover:bg-fuchsia-500 hover:text-white
                  hover:shadow-[0_0_25px_#8A4DFFFF]
                  transform hover:-translate-y-1
                "
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-6">
          <h4 className="text-lg font-extrabold text-fuchsia-400 mb-5 border-b-2 border-cyan-400/30 pb-2 uppercase tracking-widest">
            Navigation
          </h4>
          <ul className="space-y-3">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/public-lessons">Public Lessons</FooterLink>
            <FooterLink to="/dashboard/add-lesson">Add Lesson</FooterLink>
            <FooterLink to="/dashboard/my-lessons">My Dashboard</FooterLink>
            <FooterLink to="/pricing">Upgrade-Premium</FooterLink>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="space-y-6">
          <h4 className="text-lg font-extrabold text-fuchsia-400 mb-5 border-b-2 border-cyan-400/30 pb-2 uppercase tracking-widest">
            Resources
          </h4>
          <ul className="space-y-3">
            <FooterLink to="/dashboard/profile">
              Profile
            </FooterLink>
            <FooterLink to="/dashboard/update-profile">Update-Profile</FooterLink>
            <FooterLink to="/dashboard/favourites">Favourites</FooterLink>
            <FooterLink to="/public-lessons">Privacy Policy</FooterLink>
            <FooterLink to="/dashboard/my-lessons">Help Center</FooterLink>
          </ul>
        </div>

        {/* CONTACT + SUBSCRIBE - Modernized Design */}
        <div className="space-y-6">
          <h4 className="text-lg font-extrabold text-fuchsia-400 mb-5 border-b-2 border-cyan-400/30 pb-2 uppercase tracking-widest">
            Stay Connected
          </h4>

          {/* Contact Card */}
          <div
            className="
              flex items-start gap-4 p-5 rounded-xl
              bg-[#0A041A]/70
              border border-cyan-400/30
              shadow-[0_0_25px_#00F6FF15]
              backdrop-blur-sm
            "
          >
            <FaEnvelope className="text-fuchsia-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <span className="text-xs text-fuchsia-300 uppercase font-semibold tracking-wider">
                Support Beacon
              </span>
              <a
                href={`mailto:${contactEmail}`}
                className="block text-cyan-400 text-lg font-medium hover:text-cyan-600 transition"
              >
               Share Your Email
              </a>
            </div>
          </div>

          {/* Subscribe Form - Highly Styled */}
          <form
            onSubmit={handleSubscribe}
            className="
              flex flex-col gap-3 p-4 rounded-xl 
              bg-[#0A041A]/70 
              border border-fuchsia-400/30 
              shadow-[0_0_20px_#8A4DFF15] 
              backdrop-blur-sm
            "
          >
            <input
              type="email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              placeholder="Enter your transmission channel (email)..."
              className="
                p-3 rounded-lg 
                bg-[#070211] 
                border-2 border-cyan-400/50
                text-sm text-slate-300
                focus:ring-2 focus:ring-fuchsia-400 
                focus:border-fuchsia-400
                transition duration-300
                placeholder-slate-500
              "
            />

            <button
              type="submit"
              className="
                px-6 py-3 rounded-lg font-bold text-base
                bg-gradient-to-r from-cyan-400 to-fuchsia-500
                text-[#070211]
                shadow-[0_0_25px_#1DEFFFaa]
                hover:scale-[1.02] hover:shadow-[0_0_35px_#8A4DFFFF]
                active:scale-[0.98]
                transition-all duration-300
                uppercase tracking-widest
              "
            >
               Subscription
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM BAR - Refined */}
      <div className="border-t border-fuchsia-400/30 py-4 mt-8 bg-[#04010A]/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm text-slate-500 gap-3">
          <div className='font-light'>
            &copy; {year} <span className="text-cyan-300 font-medium">{websiteName}</span>. All rights reserved by the Digital Archive.
          </div>

          <div className="flex gap-8 font-light">
            <Link className="hover:text-fuchsia-400 transition" to="/about">
              About
            </Link>
            <Link className="hover:text-fuchsia-400 transition" to="/contact">
              Contacts
            </Link>
            <Link className="hover:text-fuchsia-400 transition" to="/sitemap">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;