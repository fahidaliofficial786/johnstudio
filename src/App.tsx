/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mic, FileText, Share2, Sparkles, Tv, Award, 
  Linkedin, Youtube, Camera, Play, Calendar, 
  ChevronLeft, ChevronRight, Clock, Eye, ThumbsUp, 
  Check, CheckCircle, Menu, X, ArrowRight, Video,
  Volume2, ExternalLink, Loader2
} from "lucide-react";

import { Video as VideoType, Short as ShortType } from "./types";
import { SERVICES, TESTIMONIALS, PARTNERS, BLOG_POSTS, STUDIO_PHOTOS, YOUTUBE_VIDEOS, YOUTUBE_SHORTS } from "./data";

export default function App() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active video states
  const [videosList, setVideosList] = useState<VideoType[]>(YOUTUBE_VIDEOS);
  const [shortsList, setShortsList] = useState<ShortType[]>(YOUTUBE_SHORTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePodcastVideo, setActivePodcastVideo] = useState<VideoType | null>(
    YOUTUBE_VIDEOS.find((v: VideoType) => v.id === "v2_podcast_john") || YOUTUBE_VIDEOS[0] || null
  );
  
  // Interactive Modal States
  const [activePlayEmbedId, setActivePlayEmbedId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Studio studio gallery state
  const [studioActiveIdx, setStudioActiveIdx] = useState(0);

  // Stats Counters state animations
  const [yearsCounter, setYearsCounter] = useState(1);
  const [subscribersCounter, setSubscribersCounter] = useState(1);

  // Fetch YouTube data from custom proxy or seed
  useEffect(() => {
    async function fetchFeeds() {
      try {
        const vResponse = await fetch("/api/videos");
        const vData = await vResponse.json();
        if (vData && vData.videos) {
          setVideosList(vData.videos);
          // Auto-select second episode as default because John's podcast is featured
          const podcastEp = vData.videos.find((v: VideoType) => v.id === "v2_podcast_john");
          setActivePodcastVideo(podcastEp || vData.videos[0]);
        }

        const sResponse = await fetch("/api/shorts");
        const sData = await sResponse.json();
        if (sData && sData.shorts) {
          setShortsList(sData.shorts);
        }
      } catch (err) {
        console.error("Failed to load backend feeds, using seeds", err);
      }
    }
    fetchFeeds();
  }, []);

  // Soft stats counter trigger
  useEffect(() => {
    const yearsInterval = setInterval(() => {
      setYearsCounter((prev) => {
        if (prev >= 17) {
          clearInterval(yearsInterval);
          return 17;
        }
        return prev + 1;
      });
    }, 100);

    const subInterval = setInterval(() => {
      setSubscribersCounter((prev) => {
        if (prev >= 1300) {
          clearInterval(subInterval);
          return 1300;
        }
        return prev + 65;
      });
    }, 40);

    return () => {
      clearInterval(yearsInterval);
      clearInterval(subInterval);
    };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingModalOpen(false);
      setBookingName("");
      setBookingEmail("");
      setBookingDate("");
      setBookingTime("");
      setBookingNotes("");
    }, 4000);
  };

  // Video filter categories
  const categories = ["All", "Podcast", "Marketing", "Sports & Community", "AI Marketing", "Local Branding"];

  const filteredVideos = videosList.filter(video => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Podcast") return video.type === "podcast";
    if (selectedCategory === "Marketing") return video.type === "marketing";
    return video.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#07091B] text-gray-100 font-sans antialiased selection:bg-brand-royal selection:text-white">
      
      {/* -------------------- NAVIGATION HEADER -------------------- */}
      <header id="app_header" className="sticky top-0 z-50 w-full bg-[#07091B]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with real URL */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <img 
              src="https://f852c55a.delivery.rocketcdn.me/wp-content/uploads/2021/09/Resolution-Promotions-Header-Logo.png" 
              alt="Resolution Promotions Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#podcast" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Podcast</a>
            <a href="#shorts" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Shorts</a>
            <a href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">What We Do</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Success Stories</a>
            <a href="#insights" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Blog</a>
            <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Meet John</a>
            <a href="#studio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Studio Tour</a>
          </nav>

          {/* CTA Link Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-royal to-indigo-600 hover:from-indigo-600 hover:to-brand-royal transition-all duration-300 text-sm font-semibold text-white shadow-md shadow-brand-navy/50 tracking-wide cursor-pointer"
            >
              Book Strategy Call
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden justify-center rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/5 bg-[#090C25] px-4 py-6 space-y-4"
            >
              <nav className="flex flex-col gap-4">
                <a href="#podcast" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Podcast</a>
                <a href="#shorts" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Shorts</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">What We Do</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Success Stories</a>
                <a href="#insights" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Blog</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Meet John</a>
                <a href="#studio" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Studio Tour</a>
              </nav>
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setIsBookingModalOpen(true); }}
                  className="w-full text-center px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm cursor-pointer"
                >
                  Book Strategy Call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* -------------------- HERO SECTION (VIDEO STYLE) -------------------- */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Modern video-style podcast studio background with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="Podcast Production Studio Background" 
            className="w-full h-full object-cover scale-105 filter brightness-35 contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Ambient lighting overlays representing spotlights */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07091B] via-transparent to-[#07091B]/55" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-royal/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-royal/20 border border-brand-royal/30 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-6"
          >
            <Tv className="w-3.5 h-3.5" /> High-End Content Marketing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8.5xl font-extrabold font-display tracking-tight text-white leading-tight uppercase"
          >
            Get Your <span className="text-stroke">Time</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">Back</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mt-6 font-sans font-light leading-relaxed"
          >
            We create high-end content, build authority, and execute modern marketing strategies so you can focus entirely on running your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
          >
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-royal to-indigo-600 hover:from-indigo-600 hover:to-brand-royal text-white font-bold tracking-wide transition-all shadow-xl shadow-brand-navy/60 hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-blue-200" />
              Book a Strategy Call
            </button>
            <a
              href="#podcast"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm text-gray-200 font-bold tracking-wide transition-all hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 text-gray-300 fill-gray-300" />
              Watch Our Podcast
            </a>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 w-full max-w-4xl"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090C25]/60 hover:bg-[#090C25]/85 border border-white/5 shadow-2xl backdrop-blur-sm flex flex-col items-center select-none group transition-all duration-300">
              <span className="text-3xl sm:text-4.5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-300 group-hover:scale-105 transition-transform duration-300">
                {yearsCounter}+
              </span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">Years Experience</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#090C25]/60 hover:bg-[#090C25]/85 border border-white/5 shadow-2xl backdrop-blur-sm flex flex-col items-center select-none group transition-all duration-300">
              <span className="text-3xl sm:text-4.5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-300 group-hover:scale-105 transition-transform duration-300">
                {subscribersCounter}+
              </span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">YouTube Subs</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#090C25]/60 hover:bg-[#090C25]/85 border border-white/5 shadow-2xl backdrop-blur-sm flex flex-col items-center select-none group transition-all duration-300">
              <span className="text-3xl sm:text-4.5xl font-bold font-display text-stroke tracking-wide text-white group-hover:scale-105 transition-transform duration-300">Hundreds</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">Videos Produced</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#090C25]/60 hover:bg-[#090C25]/85 border border-white/5 shadow-2xl backdrop-blur-sm flex flex-col items-center select-none group transition-all duration-300">
              <span className="text-3xl sm:text-4.5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-300 group-hover:scale-105 transition-transform duration-300">100%</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1">Trusted Locally</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* -------------------- PARTNERS MARQUEE WALL -------------------- */}
      <section className="py-12 border-y border-white/5 bg-[#040614] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
            Trusted by the community, youth athletics & local leaders
          </p>
        </div>
        
        {/* Animated Scrolling Logo Marquee */}
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#040614] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#040614] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex whitespace-nowrap gap-12 py-3">
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div 
                key={index} 
                className="inline-flex flex-col items-center justify-center min-w-[200px] hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                <div className="h-14 w-32 rounded-lg overflow-hidden border border-white/5 bg-white/2 flex items-center justify-center p-1.5 filter grayscale hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-cover rounded"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-2">{partner.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- FEATURED PODCAST SECTION -------------------- */}
      <section id="podcast" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#07091B] to-[#040614]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-semibold text-blue-300 uppercase tracking-widest">
                <Mic className="w-3.5 h-3.5" /> High Production Value
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-display uppercase tracking-wide text-white mt-3">
                The Resolution Podcast
              </h2>
              <p className="text-gray-400 mt-2 text-md font-sans max-w-xl">
                Giving local businesses and sports organizations concrete visibility shortcuts. Play directly below or browse show archives.
              </p>
            </div>
            <a 
              href="https://www.youtube.com/@ResSports" 
              target="_blank" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border border-[#FF0000]/30 transition-all text-xs font-bold text-white uppercase tracking-widest cursor-pointer"
              referrerPolicy="no-referrer"
            >
              <Youtube className="w-4 h-4 fill-white" /> Subscribe to @ResSports
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Player Frame */}
            <div className="lg:col-span-8 space-y-4">
              <div 
                id="main_podcast_player_container" 
                className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5 group"
              >
                {activePodcastVideo ? (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${activePodcastVideo.youtubeId}?autoplay=0&rel=0`} 
                    title={activePodcastVideo.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center flex-col p-6">
                    <Loader2 className="w-10 h-10 text-brand-royal animate-spin mb-4" />
                    <p className="text-gray-400 text-sm">Synchronizing latest show segment...</p>
                  </div>
                )}
              </div>

              {activePodcastVideo && (
                <div className="p-5 rounded-2xl bg-[#090C25]/80 border border-white/5 shadow-lg">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                      {activePodcastVideo.category}
                    </span>
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Published: {activePodcastVideo.publishDate}
                    </span>
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {activePodcastVideo.viewCount} views
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-3 font-sans leading-tight">
                    {activePodcastVideo.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    This episode discusses custom marketing loops, building authority without exhausting your team, and how modern video podcasts serve as the core visibility seed. Recorded right here is our premium Jersey Shore studio!
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar List Selector */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-white/5 bg-[#090C25]/60 p-4 shadow-lg backdrop-blur-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
                  Episodes & Strategy Guides
                </h4>
                
                {/* Category filters */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {categories.slice(0, 4).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat 
                          ? "bg-brand-royal text-white" 
                          : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1 no-scrollbar">
                  {filteredVideos.map((video) => (
                    <div 
                      key={video.id}
                      onClick={() => setActivePodcastVideo(video)}
                      className={`p-2.5 rounded-xl border flex gap-3 transition-all cursor-pointer group ${
                        activePodcastVideo?.id === video.id
                          ? "bg-brand-royal/10 border-brand-royal/40" 
                          : "bg-black/20 hover:bg-white/5 border-white/5"
                      }`}
                    >
                      <div className="w-24 shrink-0 aspect-video rounded-lg overflow-hidden bg-black relative border border-white/5">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform font-light duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute right-1 bottom-1 px-1 rounded bg-black/75 text-[9px] font-mono text-gray-200">
                          {video.duration}
                        </div>
                        {activePodcastVideo?.id === video.id && (
                          <div className="absolute inset-0 bg-brand-royal/40 flex items-center justify-center">
                            <Volume2 className="w-4 h-4 text-white animate-pulse" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-blue-300 uppercase block tracking-wider">
                          {video.category}
                        </span>
                        <h5 className="text-[11px] sm:text-xs font-semibold text-gray-200 line-clamp-2 leading-tight group-hover:text-white transition-colors">
                          {video.title}
                        </h5>
                        <span className="text-[9px] font-mono text-gray-400 block mt-1">
                          {video.publishDate}
                        </span>
                      </div>
                    </div>
                  ))}

                  {filteredVideos.length === 0 && (
                    <p className="text-xs text-gray-500 text-center py-6">No videos found matching category.</p>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------- YOUTUBE SHORTS SECTION (NETFLIX STYLE) -------------------- */}
      <section id="shorts" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#040614] overflow-hidden border-t border-white/5">
        
        {/* Glow behind shorts */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-royal/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#FF0000]/15 text-[10px] font-bold text-[#FF0000] uppercase tracking-widest border border-[#FF0000]/20">
                <Video className="w-3 h-3 text-[#FF0000] fill-current" /> Auto Shorts Feed
              </span>
              <h2 className="text-3xl sm:text-4.5xl font-bold font-display uppercase tracking-wide text-white mt-2">
                Latest YouTube Shorts
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Bite-sized visual strategies extracted effortlessly. Sweep right to inspect.
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const el = document.getElementById("shorts_wrapper");
                  if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer"
                aria-label="Previous shorts"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("shorts_wrapper");
                  if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer"
                aria-label="Next shorts"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrolling Container */}
          <div 
            id="shorts_wrapper"
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            {shortsList.map((short) => (
              <div 
                key={short.id} 
                className="snap-start shrink-0 w-64 aspect-[9/16] rounded-2xl bg-black overflow-hidden relative border border-white/5 shadow-lg group"
              >
                {/* Thumbnail backdrop */}
                <img 
                  src={short.thumbnail} 
                  alt={short.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
                
                {/* Floating tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-bold text-teal-300 uppercase tracking-widest font-mono">
                    {short.category}
                  </span>
                </div>

                {/* Video Info Card bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-white leading-snug line-clamp-3">
                    {short.title}
                  </h3>
                  
                  {/* Views & Likes stats ticker */}
                  <div className="flex items-center justify-between text-[10px] text-gray-300 font-mono pt-1 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-gray-400" /> {short.viewCount} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-red-400" /> {short.likeCount} likes
                    </span>
                  </div>

                  {/* Intersecting action overlay triggers direct popup or YouTube follow-through */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActivePlayEmbedId(short.youtubeId)}
                      className="flex-1 py-1.5 rounded bg-brand-royal text-[10px] font-bold text-white text-center hover:bg-indigo-600 transition-colors uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 fill-white" /> Live Play
                    </button>
                    <a 
                      href={`https://www.youtube.com/shorts/${short.youtubeId}`}
                      target="_blank"
                      className="px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer"
                      title="Watch on YouTube"
                      referrerPolicy="no-referrer"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Hover Visual Glow Effect */}
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 through-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------- SERVICES SECTION ("WHAT WE DO") -------------------- */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#040614] to-[#07091B]">
        <div className="max-w-7xl mx-auto text-center">
          
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" /> Premium Services
          </span>
          <h2 className="text-4xl sm:text-5.5xl font-bold font-display uppercase tracking-wide text-white mt-3">
            What We Do
          </h2>
          <p className="text-gray-400 mt-2 text-md font-sans max-w-xl mx-auto">
            Eliminate traditional visual & operational bottlenecks. Resolution Promotions organizes your brand visibility comprehensively.
          </p>

          {/* Services Grid (6 premium cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 text-left">
            {SERVICES.map((srv, idx) => {
              // Icon mapping switcher
              let IconComp = ToolIcon(srv.iconName);

              return (
                <div 
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-[#090C25]/40 hover:bg-[#090C25]/80 border border-white/5 hover:border-blue-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-brand-royal/10 border border-brand-royal/20 flex items-center justify-center text-blue-400 group-hover:bg-brand-royal group-hover:text-white transition-all duration-300">
                      {IconComp}
                    </div>

                    <h3 className="text-xl font-bold text-white font-sans tracking-tight">
                      {srv.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Features checklist */}
                    <ul className="space-y-2 pt-2">
                      {srv.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 mt-0.5 text-blue-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 space-y-1">
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono">Proven Impact:</span>
                    <p className="text-xs font-semibold text-blue-300">{srv.stats}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* -------------------- SUCCESS STORIES & CASE STUDIES -------------------- */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#040614]">
        
        {/* Glow behind section */}
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          
          <div className="text-center md:text-left mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300 uppercase tracking-widest">
              <CheckCircle className="w-3.5 h-3.5" /> High-impact reviews
            </span>
            <h2 className="text-4xl sm:text-5.5xl font-bold font-display uppercase tracking-wide text-white mt-3">
              Success Stories
            </h2>
            <p className="text-gray-400 mt-2 text-md font-sans max-w-xl">
              How we help youth tournament directors, NJ contractors, and local storefronts build high dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#090C25]/80 to-[#12183F]/30 border border-white/5 flex flex-col justify-between shadow-2xl relative"
              >
                <div className="space-y-6">
                  {/* Metric Box */}
                  <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-center flex flex-col select-none">
                    <span className="text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white leading-none">
                      {test.metric}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-gray-400 mt-1 tracking-widest leading-none">
                      {test.metricLabel}
                    </span>
                  </div>

                  {/* Play video if available otherwise show citation icon */}
                  {test.type === "video" && test.youtubeEmbedId ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/5 group">
                      <img 
                        src={`https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400`} 
                        alt="Play testimonial" 
                        className="w-full h-full object-cover filter brightness-40 group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={() => setActivePlayEmbedId(test.youtubeEmbedId!)}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        title="Watch video testimonial"
                      >
                        <span className="w-12 h-12 rounded-full bg-brand-royal hover:bg-indigo-600 flex items-center justify-center text-white shadow-xl transform group-hover:scale-105 transition-all">
                          <Play className="w-5 h-5 fill-white translate-x-0.5" />
                        </span>
                      </button>
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-gray-300">
                        Video Testimonial
                      </span>
                    </div>
                  ) : null}

                  <p className="text-gray-300 text-sm leading-relaxed font-light italic">
                    "{test.quote}"
                  </p>
                </div>

                {/* Author profile */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img 
                      src={test.avatarUrl} 
                      alt={test.clientName} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{test.clientName}</h4>
                    <span className="text-[10px] text-gray-400 mt-1 block leading-none">{test.role}, <strong className="text-gray-300 font-medium">{test.company}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------- STUDIO TOUR GALLERY -------------------- */}
      <section id="studio" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#07091B] to-[#040614]">
        <div className="max-w-7xl mx-auto text-center">
          
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300 uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" /> Behind The Scenes
          </span>
          <h2 className="text-4xl sm:text-5.5xl font-bold font-display uppercase tracking-wide text-white mt-3">
            Step Inside the Production Studio
          </h2>
          <p className="text-gray-400 mt-2 text-md font-sans max-w-xl mx-auto">
            Our state-of-the-art Jersey Shore location hosts multiple custom-crafted acoustic stages, multiple camera setups, and advanced digital control.
          </p>

          {/* Large slider card container */}
          <div className="max-w-4xl mx-auto mt-14 rounded-2xl overflow-hidden border border-white/5 bg-[#090C25]/85 shadow-2xl flex flex-col md:flex-row">
            
            {/* Gallery Active Photo */}
            <div className="md:w-3/5 aspect-[4/3] relative bg-black shrink-0 border-r border-white/5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={studioActiveIdx}
                  src={STUDIO_PHOTOS[studioActiveIdx].imageUrl} 
                  alt={STUDIO_PHOTOS[studioActiveIdx].title} 
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 text-[9px] font-bold text-gray-200 uppercase tracking-widest font-mono border border-white/10">
                Stage {studioActiveIdx + 1} of {STUDIO_PHOTOS.length}
              </div>
            </div>

            {/* Gallery Info Drawer */}
            <div className="p-6 sm:p-8 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Active Showcase</span>
                
                <h3 className="text-2xl font-bold font-display text-white tracking-wide">
                  {STUDIO_PHOTOS[studioActiveIdx].title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  {STUDIO_PHOTOS[studioActiveIdx].description}
                </p>
              </div>

              {/* Slider switch controls */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                <div className="flex gap-2">
                  {STUDIO_PHOTOS.map((_, pidx) => (
                    <button 
                      key={pidx}
                      onClick={() => setStudioActiveIdx(pidx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        studioActiveIdx === pidx ? "bg-blue-400 w-5" : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Select studio photo ${pidx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-1">
                  <button 
                    onClick={() => setStudioActiveIdx((prev) => (prev === 0 ? STUDIO_PHOTOS.length - 1 : prev - 1))}
                    className="w-8 h-8 rounded border border-white/10 bg-white/3 hover:bg-white/10 text-gray-300 flex items-center justify-center cursor-pointer"
                    aria-label="Previous studio photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setStudioActiveIdx((prev) => (prev === STUDIO_PHOTOS.length - 1 ? 0 : prev + 1))}
                    className="w-8 h-8 rounded border border-white/10 bg-white/3 hover:bg-white/10 text-gray-300 flex items-center justify-center cursor-pointer"
                    aria-label="Next studio photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* -------------------- MEET THE FOUNDER SECTION (JOHN ARCHIBALD) -------------------- */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black/40 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Portrait Layout Placeholder */}
            <div className="md:col-span-5 relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-royal to-blue-500 opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#090C25] border border-white/10 shadow-2xl">
                <img 
                  src="https://johnarchibald.com/wp-content/uploads/2024/12/John-Archibald-Nasdaq-1.jpg" 
                  alt="John Archibald - Founder and CEO" 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel text-left">
                  <h4 className="text-md font-bold text-white">John Archibald</h4>
                  <span className="text-xs text-gray-300">Founder & Producer</span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="md:col-span-7 text-left space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300 uppercase tracking-widest">
                  <Award className="w-3.5 h-3.5" /> Founder & CEO
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold font-display uppercase tracking-wide text-white mt-3">
                  Meet John Archibald
                </h2>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                John Archibald founded Resolution Promotions in 2008 with a simple, disruptive vision: help New Jersey businesses and regional leagues capture maximum digital visibility without drowning in operational work. 
              </p>
              
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Under John's leadership, the agency has built an advanced content machine, scaling youth sports tournaments to tens of thousands of simultaneous viewers, producing hundreds of professional video podcasts, and advising local contractors, services, and storefronts on automated lead captures and social feeds.
              </p>

              <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 mt-0.5 text-blue-400 shrink-0 animate-pulse" />
                <p className="text-xs text-gray-300">
                  <strong className="text-white block font-semibold mb-0.5">The Arch Principle:</strong>
                  "We believe your time is your most finite resource. As a business owner, you should spend your energy closing deals and refining services — while we execute a flawless content conveyor belt on your behalf."
                </p>
              </div>

              {/* Action buttons with socials */}
              <div className="flex flex-wrap gap-4 items-center pt-2">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white tracking-wide transition-all shadow-md cursor-pointer"
                >
                  Schedule Meeting with John
                </button>
                
                <div className="flex items-center gap-2">
                  <a 
                    href="https://www.linkedin.com" 
                    target="_blank" 
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    title="LinkedIn profile"
                    referrerPolicy="no-referrer"
                  >
                    <Linkedin className="w-4 h-4 fill-current" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@ResSports" 
                    target="_blank" 
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    title="YouTube Channel"
                    referrerPolicy="no-referrer"
                  >
                    <Youtube className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* -------------------- LATEST INSIGHTS BLOG GRID -------------------- */}
      <section id="insights" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#040614]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300 uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" /> Latest Insights
            </span>
            <h2 className="text-4xl sm:text-5.5xl font-bold font-display uppercase tracking-wide text-white mt-3">
              Agency Insights & Tactics
            </h2>
            <p className="text-gray-400 mt-2 text-md font-sans max-w-xl mx-auto">
              Read exact blueprints regarding local SEO, video-first indexing standards, and podcast automations compiled directly by our creative squad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.id}
                className="rounded-2xl border border-white/5 bg-[#090C25]/40 hover:bg-[#090C25]/80 overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-black border-b border-white/5">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-black/75 border border-white/10 text-[9px] font-bold text-blue-300 uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 text-left">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-sans group-hover:text-blue-300 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 text-left">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors cursor-pointer">
                    Read Full Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------- CALL TO ACTION BANNER -------------------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-[#12183F] via-brand-navy to-[#07091B] border-t border-white/10 overflow-hidden text-center">
        
        {/* Spot ambient lighting for extreme polish */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-royal/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-blue-200 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Claim Your Authority
          </span>

          <h2 className="text-5xl sm:text-7xl font-extrabold font-display tracking-tight text-white uppercase leading-none">
            Ready To Become The <br className="hidden sm:inline" />
            <span className="text-stroke">Authority</span> In Your Industry?
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Stop chasing fragmented, low-yield marketing trends and start building a high-conversion content engine that runs entirely on autopilot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-brand-navy font-bold tracking-wide transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              Schedule Strategy Call
            </button>
            <a
              href="#podcast"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm text-gray-200 font-bold tracking-wide transition-all hover:-translate-y-0.5"
            >
              Watch The Podcast
            </a>
          </div>

        </div>
      </section>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="bg-[#040611] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand/About Col */}
          <div className="md:col-span-5 space-y-4">
            <img 
              src="https://f852c55a.delivery.rocketcdn.me/wp-content/uploads/2021/09/Resolution-Promotions-Header-Logo.png" 
              alt="Resolution Promotions Brand Logo" 
              className="h-12 w-auto object-contain filter"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed font-light">
              Resolution Promotions is a leading Jersey Shore digital marketing & podcast production agency founded by John Archibald. We give business owners their finite time back by automating high-end layouts and micro-video assets.
            </p>
            <span className="block text-[10px] text-gray-500 font-mono">
              © {new Date().getFullYear()} Resolution Promotions, LLC. All rights reserved.
            </span>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-2.5 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Sponsorships</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#podcast" className="hover:text-white transition-colors">The Resolution Podcast</a></li>
              <li><a href="https://www.youtube.com/@ResSports" target="_blank" className="hover:text-white transition-colors">Sports Broadcasting</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#studio" className="hover:text-white transition-colors">Studio Rentals</a></li>
            </ul>
          </div>

          <div className="md:col-span-2.5 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Digital Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Podcast Production</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Content Marketing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Social Media Flow</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Content Systems</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Connect</h4>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com" className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-royal transition-all" title="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              <a href="https://www.youtube.com/@ResSports" className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-royal transition-all" title="Youtube"><Youtube className="w-4 h-4" /></a>
            </div>
            <div className="space-y-1 pt-2">
              <span className="block text-[11px] font-semibold text-gray-300">HQ: Jersey Shore, NJ</span>
              <span className="block text-[10px] font-mono text-gray-400">Archibald Consulting Services</span>
            </div>
          </div>

        </div>
      </footer>

      {/* -------------------- PLAY DIRECT EMBED MODEL -------------------- */}
      <AnimatePresence>
        {activePlayEmbedId && (() => {
          const isShort = shortsList.some(s => s.youtubeId === activePlayEmbedId);
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePlayEmbedId(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md cursor-pointer"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className={
                  isShort 
                    ? "relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-[#07091B] shadow-2xl flex flex-col cursor-default"
                    : "relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#07091B] shadow-2xl cursor-default"
                }
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActivePlayEmbedId(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/10 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>

                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${activePlayEmbedId}?autoplay=1&rel=0`} 
                  title="Direct Embed Player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="w-full h-full"
                />
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* -------------------- BOOKING MODAL (TACTICAL CALENDLY STYLE) -------------------- */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0F1332] via-[#10143a] to-[#040612] shadow-2xl p-6 sm:p-8"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Success Screen inside dialog */}
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white uppercase tracking-wide">
                    Strategy Call Slotted!
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                    Excellent choice. John Archibald or a senior strategist has received your information. A calendar validation link along with a custom strategy deck invitation has been dispatched to <strong className="text-white">{bookingEmail}</strong>.
                  </p>
                  <p className="text-xs text-blue-400 animate-pulse pt-2">
                    Preparing validation details...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5 text-left">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Direct Booking Desk</span>
                    <h3 className="text-2xl font-bold font-display text-white mt-1">Book Your Strategy Session</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Let's coordinate on structural branding, local search supremacy, and production setup.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="client_name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Your Name *
                      </label>
                      <input 
                        id="client_name"
                        type="text" 
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="John Archibald"
                        className="w-full bg-black/20 border border-white/15 focus:border-blue-500/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="client_email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Your Work Email *
                      </label>
                      <input 
                        id="client_email"
                        type="email" 
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="ceo@firm.com"
                        className="w-full bg-black/20 border border-white/15 focus:border-blue-500/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Date and Time selectors */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="client_date" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Preferred Date *
                        </label>
                        <input 
                          id="client_date"
                          type="date" 
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#1B2463] border border-white/15 focus:border-blue-500/50 rounded-lg px-3 py-2 text-xs text-white outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="client_time" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Preferred Time *
                        </label>
                        <select 
                          id="client_time"
                          required
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-[#1B2463] border border-white/15 focus:border-blue-500/50 rounded-lg px-3 py-2 text-xs text-white outline-none transition-all"
                        >
                          <option value="" disabled>Select time...</option>
                          <option value="09:00 AM">09:00 AM EST</option>
                          <option value="11:30 AM">11:30 AM EST</option>
                          <option value="01:30 PM">01:30 PM EST</option>
                          <option value="03:00 PM">03:00 PM EST</option>
                          <option value="04:30 PM">04:30 PM EST</option>
                        </select>
                      </div>
                    </div>

                    {/* Growth constraints notes */}
                    <div className="space-y-1.5">
                      <label htmlFor="client_notes" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        What constraints or goals should we highlight?
                      </label>
                      <textarea 
                        id="client_notes"
                        rows={3}
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="e.g., We need to launch a new trade show show or update soccer broadcasting setup..."
                        className="w-full bg-black/20 border border-white/15 focus:border-blue-500/50 rounded-lg px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-royal to-indigo-600 hover:from-indigo-600 hover:to-brand-royal text-sm font-bold text-white uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-950/40"
                  >
                    Lock Strategy Session Slot
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Inline Dynamic Tool Icon selector helper
function ToolIcon(name: string) {
  switch (name) {
    case "Mic":
      return <Mic className="w-5 h-5" />;
    case "FileText":
      return <FileText className="w-5 h-5" />;
    case "Share2":
      return <Share2 className="w-5 h-5" />;
    case "Sparkles":
      return <Sparkles className="w-5 h-5 animate-pulse" />;
    case "Tv":
      return <Tv className="w-5 h-5" />;
    case "Award":
      return <Award className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
}
