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

/* --- Existing Components --- */
import HeroSlider from "../components/HeroSlider";
import FeaturedLessonCard from "../components/FeaturedLessonCard";
import TopContributorCard from "../components/TopContributorCard";
import BenefitCard from "../components/BenefitCard";
import MostSavedLessonCard from "../components/MostSavedLessonCard";
import Stats from "../components/Stats";
import LessonCategories from "../components/LessonCategories";
import UserTestimonials from "../components/UserTestimonials";
import FaqSection from "../components/FaqSection";
import Newsletter from "../components/Newsletter";
import FinalCTA from "../components/FinalCTA";

// --- FORCED DUMMY DATA ---
const FALLBACK_LESSONS = [
  {
    _id: "69615be9aa79e564e2311456",
    title: "The Silent Growth",
    description: "Real growth happens in silence. Learn how to cultivate patience and resilience.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
    category: "Mindset",
    rating: "5.0",
    price: 0,
    location: "Global",
    accessLevel: "Free",
    createdAt: new Date().toISOString(),
    creatorName: "System AI",
    isDummy: true 
  },
  {
    _id: "69615be9aa79e564e2311450",
    title: "Digital Legacy",
    description: "How to leave a digital footprint that inspires future generations.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600",
    category: "Tech",
    rating: "4.9",
    price: 0,
    location: "Vault",
    accessLevel: "Free",
    createdAt: new Date().toISOString(),
    creatorName: "System AI",
    isDummy: true
  }
];

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
        const [featuredRes, contributorsRes, mostSavedRes] = await Promise.all([
          getFeaturedLessons().catch(() => []),
          getTopContributors().catch(() => []),
          getMostSavedLessons().catch(() => []),
        ]);

        let finalFeatured = featuredRes || [];
        if (finalFeatured.length > 0 && finalFeatured.length < 8) {
           const needed = 8 - finalFeatured.length;
           for(let i=0; i < needed; i++) {
             finalFeatured.push(FALLBACK_LESSONS[i % FALLBACK_LESSONS.length]);
           }
        }

        setFeaturedLessons(finalFeatured);
        setMostSavedLessons(mostSavedRes || []);
        setTopContributors(contributorsRes || []);
        
      } catch (error) {
        console.error("Home fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const displayContributors = (() => {
    const uniqueUsers = [];
    const seenIds = new Set();
    const validApiData = (topContributors || []).filter(c => (c.name || c.displayName) && (c.photoURL || c.photo));
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

  return (
    // Main Background: Light Mode uses light gray, Dark Mode uses dark navy
    <div className="min-h-screen bg-gray-50 dark:bg-[#01040D] text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      
      {/* Background Glow - only for Dark Mode */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden dark:block">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#40E0D0]/10 blur-[150px] rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-6">
        
        {/* --- SECTION 1: HERO --- */}
        <section className="mb-24 rounded-[3rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
          <HeroSlider slides={SLIDE_DATA} />
        </section>

        {/* --- SECTION 2: STATS --- */}
        <Stats />

        {/* --- SECTION 3: TRENDING LESSONS --- */}
        <section className="mb-32 relative">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white">
              Trending <span className="text-cyan-600 dark:text-[#40E0D0]">Lessons</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-mono text-sm tracking-widest uppercase">Most saved by community</p>
            <div className="w-24 h-1 bg-cyan-600 dark:bg-[#40E0D0] mx-auto mt-4 rounded-full shadow-[0_0_10px_#40E0D0]"></div>
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

        {/* --- SECTION 4: FEATURED LESSONS --- */}
        <section className="mb-24 px-6 relative">
          <div className="flex flex-col items-center justify-center mb-20">
            <div className="relative group text-center">
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl md:text-9xl font-black text-gray-200 dark:text-white/[0.03] select-none tracking-[0.2em] uppercase italic pointer-events-none">
                SYSTEM
              </span>
              <h3 className="relative z-10 text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter text-center text-gray-900 dark:text-white">
                Featured 
                <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-[#40E0D0] dark:to-[#FF00FF] drop-shadow-md dark:drop-shadow-[0_0_20px_rgba(64,224,208,0.4)]">
                  Lessons
                </span>
              </h3>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-cyan-600 dark:to-[#40E0D0]"></div>
                <div className="w-2 h-2 bg-cyan-600 dark:bg-[#40E0D0] rounded-full animate-ping"></div>
                <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-cyan-600 dark:to-[#40E0D0]"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredLessons && featuredLessons.length > 0 ? (
              featuredLessons.slice(0, 8).map((lesson, index) => ( 
                <FeaturedLessonCard 
                  key={`${lesson._id}-${index}`} 
                  lesson={lesson} 
                  user={user} 
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-gray-200 dark:border-[#40E0D020] rounded-[3rem] bg-white dark:bg-white/5 backdrop-blur-md">
                <p className="text-gray-500 dark:text-gray-400 font-mono italic tracking-[0.3em] text-xs uppercase">
                  Synchronizing Wisdom... <span className="text-cyan-600 dark:text-[#40E0D0]">Awaiting New Lessons</span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* --- SECTION 5: CATEGORIES --- */}
        <LessonCategories />

        {/* --- SECTION 6: WHY WISDOM MATTERS --- */}
        <section className="mb-24 relative py-20 rounded-[4rem] border border-gray-200 dark:border-white/20 bg-white dark:bg-gray-900/40 overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="relative z-10 text-center mb-16 px-4">
            <h3 className="text-4xl md:text-6xl font-black uppercase italic text-gray-900 dark:text-white">
              Why <span className="text-cyan-600 dark:text-[#40E0D0]">Wisdom</span> Matters
            </h3>
            <div className="w-24 h-1.5 bg-cyan-600/50 dark:bg-[#40E0D0]/50 mx-auto mt-6 rounded-full"></div>
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

        {/* --- SECTION 7: TESTIMONIALS --- */}
        <UserTestimonials />

        {/* --- SECTION 8: MASTER CONTRIBUTORS --- */}
        <section className="mb-32 relative px-2">
          <div className="relative z-10 text-center mb-20">
            <div className="inline-block">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-gray-900 dark:text-white italic">
                Master <span className="text-cyan-600 dark:text-[#40E0D0] dark:drop-shadow-[0_0_15px_#40E0D0]">Contributors</span>
              </h3>
              <div className="flex items-center mt-4">
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-fuchsia-600 dark:via-[#FF00FF] to-transparent rounded-full shadow-md dark:shadow-[0_0_10px_#FF00FF]"></div>
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
                Champions of the Wisdoms Network
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

        {/* --- SECTION 9: FAQ --- */}
        <FaqSection />

        {/* --- SECTION 10: NEWSLETTER --- */}
        <Newsletter />

        {/* --- SECTION 11: FINAL CTA --- */}
        <FinalCTA />

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