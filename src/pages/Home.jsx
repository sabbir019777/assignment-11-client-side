// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import {
  getFeaturedLessons,
  getTopContributors,
  getMostSavedLessons,
} from "../utils/api";

import { useAuth } from "../contexts/AuthContext";

import HeroSlider from "../components/HeroSlider";
import FeaturedLessonCard from "../components/FeaturedLessonCard";
import TopContributorCard from "../components/TopContributorCard";
import BenefitCard from "../components/BenefitCard";
import MostSavedLessonCard from "../components/MostSavedLessonCard";
import LoadingSpinner from "../components/LoadingSpinner";

// Static Data: Back-up contributors
const STATIC_CONTRIBUTORS = [
  { uid: "st-1", name: "Sabbir Ahmed", weeklyLessons: 1, photoURL: "https://i.pravatar.cc/150?u=sajib" },
  { uid: "st-2", name: "Tamim Iqbal", weeklyLessons: 1, photoURL: "https://i.pravatar.cc/150?u=tahmid" },
  { uid: "st-3", name: "Anika Tabassum", weeklyLessons: 1, photoURL: "https://i.pravatar.cc/150?u=anika" },
  { uid: "st-4", name: "Karim Ullah", weeklyLessons: 1, photoURL: "https://i.pravatar.cc/150?u=karim" },
  { uid: "st-5", name: "Jasim Uddin", weeklyLessons: 1, photoURL: "https://i.pravatar.cc/150?u=jasim" },
];

const SLIDE_DATA = [
  {
    title: "Your life's lessons can be someone else's inspiration.",
    description: "Every struggle you've overcome is a roadmap for someone else. Share your journey today.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&h=600&fit=crop",
    button: "Add Lesson",
    link: "/dashboard/add-lesson",
  },
  {
    title: "Unlock Deep Insights Through Premium Lessons.",
    description: "Get exclusive access to high-value life experiences and expert-level personal growth tips.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1600&h=600&fit=crop",
    button: "Go Premium",
    link: "/pricing",
  },
  {
    title: "Build Your Personal Treasury of Knowledge.",
    description: "Save meaningful lessons and organize your wisdom in one secure, digital space.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1600&h=600&fit=crop",
    button: "My Lessons",
    link: "/dashboard/my-lessons",
  },
  {
    title: "Learn From a Global Community of Mentors.",
    description: "Explore diverse perspectives and find solutions to life's challenges from people worldwide.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&h=600&fit=crop",
    button: "Public Lessons",
    link: "/public-lessons",
  },
  {
    title: "Master Your Mindset and Personal Growth.",
    description: "Reflect on daily experiences to develop critical thinking and emotional resilience.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&h=600&fit=crop",
    button: "Dashboard",
    link: "/dashboard/dashboardhome",
  }
];

const BENEFITS = [
  { title: "Value of Experience", description: "Every life event teaches us something new.", type: "wisdom" },
  { title: "Error Correction", description: "Strategies for moving forward by learning from mistakes.", type: "correction" },
  { title: "Mental Growth", description: "Analyze the past for mental stability.", type: "growth" },
  { title: "Community Connection", description: "Helping to build an educated society.", type: "community" },
  { title: "Time Mastery", description: "Utilize time effectively through lessons.", type: "time" },
  { title: "Track Progress", description: "Monitor your learning journey.", type: "progress" },
  { title: "Deep Reflection", description: "Develop critical thinking through shared journeys.", type: "reflection" },
  { title: "Resilient Mindset", description: "Strong mindset during crises.", type: "mindset" },
];

const Home = () => {
  const { user } = useAuth();
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [mostSavedLessons, setMostSavedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [featuredRes, contributorsRes, mostSavedRes] = await Promise.all([
          getFeaturedLessons().catch(() => []),
          getTopContributors().catch(() => []),
          getMostSavedLessons().catch(() => []),
        ]);

        setFeaturedLessons(featuredRes || []);
        setMostSavedLessons(mostSavedRes || []);
        setTopContributors(contributorsRes || []);
        
      } catch (error) {
        console.error("Home fetch error:", error);
      } finally {
        // লোডিং টাইম ১ সেকেন্ড (১০০০ মিলি-সেকেন্ড) বাড়ানো হয়েছে
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchHomeData();
  }, []);

  // ডুপ্লিকেট মুক্ত ৫ জন কন্ট্রিবিউটর লজিক
  const displayContributors = (() => {
    const uniqueUsers = [];
    const seenIds = new Set();

    const validApiData = (topContributors || []).filter(c => 
      (c.name || c.displayName) && (c.photoURL || c.photo)
    );

    validApiData.forEach(c => {
      const id = c.uid || c._id;
      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        uniqueUsers.push(c);
      }
    });

    if (uniqueUsers.length < 5) {
      STATIC_CONTRIBUTORS.forEach(sc => {
        if (!seenIds.has(sc.uid) && uniqueUsers.length < 5) {
          seenIds.add(sc.uid);
          uniqueUsers.push(sc);
        }
      });
    }

    return uniqueUsers.slice(0, 5);
  })();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#01040D] text-white overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#40E0D0]/10 blur-[150px] rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-6">
        
        <section className="mb-24 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
          <HeroSlider slides={SLIDE_DATA} />
        </section>

        {/* Trending Lessons Section */}
        <section className="mb-32 relative">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Trending <span className="text-[#40E0D0]">Lessons</span>
            </h3>
            <p className="text-gray-400 mt-2 font-mono text-sm tracking-widest uppercase">Most saved by community</p>
            <div className="w-24 h-1 bg-[#40E0D0] mx-auto mt-4 rounded-full shadow-[0_0_10px_#40E0D0]"></div>
          </div>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={mostSavedLessons.length > 5} 
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="pb-12"
          >
            {mostSavedLessons.map((lesson) => (
              <SwiperSlide key={lesson._id} className="max-w-[350px] md:max-w-[420px] px-4">
                <MostSavedLessonCard lesson={lesson} user={user} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Featured Lessons Section */}
        <section className="mb-24 px-2 relative">
          <div className="flex flex-col items-center justify-center mb-20">
            <div className="relative group">
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-7xl md:text-9xl font-black text-white/[0.03] select-none tracking-[0.2em] uppercase italic pointer-events-none">
                SYSTEM
              </span>

              <h3 className="relative z-10 text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter text-center">
                Featured 
                <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] drop-shadow-[0_0_20px_rgba(64,224,208,0.4)]">
                  Lessons
                </span>
              </h3>

              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#40E0D0]"></div>
                <div className="w-2 h-2 bg-[#40E0D0] rounded-full animate-ping"></div>
                <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#40E0D0]"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredLessons && featuredLessons.length > 0 ? (
              featuredLessons.map((lesson) => (
                <FeaturedLessonCard key={lesson._id} lesson={lesson} user={user} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-[#40E0D020] rounded-[3rem] bg-white/5 backdrop-blur-md">
                <p className="text-gray-400 font-mono italic tracking-[0.3em] text-xs uppercase">
                  Synchronizing Wisdom... <span className="text-[#40E0D0]">Awaiting New Lessons</span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Why Wisdom Matters Section */}
        <section className="mb-24 relative py-20 rounded-[4rem] border border-white/20 bg-gray-900/40 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="relative z-10 text-center mb-16 px-4">
            <h3 className="text-3xl md:text-6xl font-black uppercase italic text-white">
              Why <span className="text-[#40E0D0]">Wisdom</span> Matters
            </h3>
            <div className="w-24 h-1.5 bg-[#40E0D0]/50 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-10">
            <div className="flex overflow-hidden group">
              <div className="flex animate-scroll-smooth-left whitespace-nowrap">
                {[...BENEFITS, ...BENEFITS].map((benefit, index) => (
                  <div key={`left-${index}`} className="flex-shrink-0">
                    <BenefitCard {...benefit} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex overflow-hidden group">
              <div className="flex animate-scroll-smooth-right whitespace-nowrap">
                {[...BENEFITS, ...BENEFITS].map((benefit, index) => (
                  <div key={`right-${index}`} className="flex-shrink-0">
                    <BenefitCard {...benefit} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Master Contributors Section */}
        <section className="mb-32 relative px-2">
          <div className="relative z-10 text-center mb-20">
            <div className="inline-block">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white italic">
                Master <span className="text-[#40E0D0] drop-shadow-[0_0_15px_#40E0D0]">Contributors</span>
              </h3>
              <div className="flex items-center mt-4">
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#FF00FF] to-transparent rounded-full shadow-[0_0_10px_#FF00FF]"></div>
              </div>
              <p className="mt-4 text-gray-400 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
                Champions of the Wisdom Network
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 relative z-10">
            {displayContributors.map((contributor, index) => (
              <TopContributorCard 
                key={contributor.uid || contributor._id || `contributor-${index}`} 
                contributor={contributor} 
                index={index} 
              />
            ))}
          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-smooth-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-smooth-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-smooth-left {
          animation: scroll-smooth-left 140s linear infinite;
        }
        .animate-scroll-smooth-right {
          animation: scroll-smooth-right 140s linear infinite;
        }
        .group:hover .animate-scroll-smooth-left, 
        .group:hover .animate-scroll-smooth-right {
          animation-play-state: paused;
        }
        .swiper-pagination-bullet {
          background: #40E0D0 !important;
        }
      `}} />
    </div>
  );
};

export default Home;