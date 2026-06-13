import { Service, Testimonial, Partner, BlogPost, StudioPhoto, Video as VideoType, Short as ShortType } from "./types";

export const PARTNERS: Partner[] = [
  {
    name: "Jersey Premier Soccer Cup",
    role: "Soccer Organizations",
    logoUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=200&h=100"
  },
  {
    name: "Shoreline Coffee Co.",
    role: "Local Coffee Shops",
    logoUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=200&h=100"
  },
  {
    name: "Atlantic Coastal Real Estate",
    role: "Local Businesses",
    logoUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200&h=100"
  },
  {
    name: "Ocean City Youth Athletic League",
    role: "Community Organizations",
    logoUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=200&h=100"
  },
  {
    name: "Coastal CrossFit & Fitness",
    role: "Local Businesses",
    logoUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=200&h=100"
  },
  {
    name: "Cape May Community Alliance",
    role: "Community Organizations",
    logoUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=200&h=100"
  }
];

export const SERVICES: Service[] = [
  {
    title: "Podcast Production",
    description: "Professional podcast recording, editing, publishing, and promotion. We turn your ideas into a polished, high-authority talk show.",
    iconName: "Mic",
    stats: "Over 500+ episodes produced and distributed globally.",
    features: ["Acoustically optimized studio session", "4K multi-camera video recording", "Professional subtitle editing & sound mastering", "Short-form content extraction"]
  },
  {
    title: "Content Marketing",
    description: "Create content that attracts and converts customers. We build high-value blogs, landing pages, newsletters, and lead-generating assets.",
    iconName: "FileText",
    stats: "+220% average increase in organic website traffic.",
    features: ["SEO-driven content strategic plan", "High-conversion copy & copywriting", "Email newsletter automation", "Lead magnet setup & promotion"]
  },
  {
    title: "Social Media Management",
    description: "Consistent visibility across all major platforms. Keep your brand relevant, active, and top-of-mind for your local customers.",
    iconName: "Share2",
    stats: "Hundreds of active posts published every single month.",
    features: ["Platform-optimized scheduling", "Short-form video layout & content strategy", "Community engagement & comment handling", "Targeted local brand visibility"]
  },
  {
    title: "AI Marketing Systems",
    description: "Automations and AI-powered workflows to optimize lead generation, review acquisition, and content distribution without the headache.",
    iconName: "Sparkles",
    stats: "Saves customers an average of 15+ hours per week.",
    features: ["Custom AI client lead routing", "Automated review generation engines", "AI content creation toolchains", "Fast automatic customer follow-up plans"]
  },
  {
    title: "Video Production",
    description: "Professional business video creation. From commercial showcases, drone footage, to founder reels that establish unmatched authority.",
    iconName: "Tv",
    stats: "2,000+ custom promotional video assets delivered.",
    features: ["Cinema-grade camera kits & drone", "Visual branding style integration", "Scriptwriting & storyboarding coaching", "High-conversion call-to-actions"]
  },
  {
    title: "Local Business Branding",
    description: "Increase local authority and market visibility. Stand out from regional competitors and become the immediate go-to choice.",
    iconName: "Award",
    stats: "Top local contractor & service provider choice in NJ.",
    features: ["Logo optimization & design visual standard", "Local directory and Google Maps search dominance", "Sponsorship & community partnership setup", "In-person event coverage & PR"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test1",
    clientName: "David Rossi",
    role: "Executive Director",
    company: "Shore Soccer League",
    quote: "Resolution Promotions transformed our visibility. They took charge of our tournament media coverage, livestreamed final games, and generated over 50,000 views in just one weekend. John and his team gave us our sanity back!",
    metric: "50K+ Views",
    metricLabel: "Tournament Reach In 48h",
    type: "video",
    youtubeEmbedId: "vx-y5pqrsyA", // Play locally or standard embed
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "test2",
    clientName: "Sarah Jenkins",
    role: "Founder & Lead Baker",
    company: "Ocean Cupcakes",
    quote: "We didn't know how to run a social media pipeline. Resolution Promotions took over. Now our local NJ cafe has lines out the door every weekend. They film in our shop for 2 hours once a month, and we get amazing content all month long.",
    metric: "+180%",
    metricLabel: "Monthly Cafe Sales Increase",
    type: "text",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "test3",
    clientName: "Mark Archibald",
    role: "President",
    company: "Archibald Builders & Renovations",
    quote: "Working with Resolution Promotions on our company branding and local SEO was the best decision we ever made. They set up our local commercial reel and we closed three high-end kitchen remodels in the first month from it.",
    metric: "3x Return",
    metricLabel: "Campaign Ad Spend ROI",
    type: "video",
    youtubeEmbedId: "BJq6sY6UvTs",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post1",
    title: "How to Build a High-Authority Local Service Podcast on a Budget",
    category: "Podcast production",
    date: "June 05, 2026",
    excerpt: "Want to bring in premium clients? Starting a dedicated interview show with local builders, community leaders, and founders is the ultimate shortcut.",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read"
  },
  {
    id: "post2",
    title: "VeeMedia & HubSpot: Why Video-First Content is Dominating Google SEO in 2026",
    category: "Content marketing",
    date: "May 22, 2026",
    excerpt: "If you are not embedding high-quality, transcript-enriched video content on your blog sections, you are missing out on 80% of current organic mobile search streams because of new visual indexing algorithms.",
    imageUrl: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=600",
    readTime: "7 min read"
  },
  {
    id: "post3",
    title: "AI Workflows for Non-Tech Small Businesses: Ultimate Time Saving Hacks",
    category: "AI Marketing systems",
    date: "April 18, 2026",
    excerpt: "Learn how the team at Resolution Promotions configures automated multi-channel scheduling, automatic transcript writing, and live lead follow-ups to save up to 15 hours a week.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read"
  }
];

export const STUDIO_PHOTOS: StudioPhoto[] = [
  {
    id: "p1",
    title: "The Main Broadcast Desk",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
    description: "Fully acoustic-padded visual setup featuring premium Shure mics, customizable RGB studio ambient rigs, and multi-cam focal points."
  },
  {
    id: "p2",
    title: "Cinema-Grade Control Desk",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
    description: "Equipped with live switching desks, Rodecaster audio hubs, and low-latency local streaming feeds for instant live broadcast delivery."
  },
  {
    id: "p3",
    title: "Cozy Interview Corner",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    description: "An alternate, warm, casual lounge visual setting. Features beautiful leather armchairs and soft golden studio lights for conversational shows."
  },
  {
    id: "p4",
    title: "Local Production Rig",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    description: "Our high-octane local mobile field production kit for stadium soccer, community festivals, and on-location company spotlights."
  }
];

export const YOUTUBE_VIDEOS: VideoType[] = [
  {
    id: "v2_podcast_john",
    youtubeId: "vx-y5pqrsyA",
    type: "podcast",
    category: "Marketing Strategy",
    title: "Talking Digital Marketing, AI and Social Media | CEO John Archibald",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/vx-y5pqrsyA",
    publishDate: "2026-06-02",
    viewCount: "1,150",
    duration: "42:15"
  },
  {
    id: "v1_sports_highlights",
    youtubeId: "MIuEClONdSQ",
    type: "podcast",
    category: "Sports & Community",
    title: "Netflix Fort Monmouth | New Site Renderings",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/MIuEClONdSQ",
    publishDate: "2026-05-18",
    viewCount: "3,420",
    duration: "12:45"
  },
  {
    id: "v3_marketing_trends",
    youtubeId: "BJq6sY6UvTs",
    type: "marketing",
    category: "AI Marketing",
    title: "Garden State Car Wash - Howell Township & Middletown, New Jersey",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/BJq6sY6UvTs",
    publishDate: "2026-06-08",
    viewCount: "870",
    duration: "18:30"
  },
  {
    id: "v4_sports_soccer",
    youtubeId: "pA3iaVpdxlA",
    type: "podcast",
    category: "Sports & Community",
    title: "Duke's Tavern & Tap - Where Value Meets Quality",
    thumbnail: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/pA3iaVpdxlA",
    publishDate: "2026-05-29",
    viewCount: "1,890",
    duration: "31:10"
  },
  {
    id: "v5_studio_tour",
    youtubeId: "wQDAcVEcNBw",
    type: "marketing",
    category: "Studio & Production",
    title: "Key Stats About Entrepreneurship",
    thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/wQDAcVEcNBw",
    publishDate: "2026-04-12",
    viewCount: "2,430",
    duration: "14:22"
  },
  {
    id: "v6_branding_guide",
    youtubeId: "_JdrDB3-uC8",
    type: "marketing",
    category: "Local Branding",
    title: "Welcome Emails - Answer These 3 Questions",
    thumbnail: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/_JdrDB3-uC8",
    publishDate: "2026-06-10",
    viewCount: "940",
    duration: "21:05"
  },
  {
    id: "v7_linkedin_serious",
    youtubeId: "OFCkQh55gEQ",
    type: "marketing",
    category: "AI Marketing",
    title: "Why Your Business Needs to Take LinkedIn More Seriously",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/OFCkQh55gEQ",
    publishDate: "2026-06-11",
    viewCount: "740",
    duration: "10:15"
  },
  {
    id: "v8_video_power",
    youtubeId: "KgEx3Sap_9U",
    type: "marketing",
    category: "Studio & Production",
    title: "The Power of Video Marketing",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    embedUrl: "https://www.youtube.com/embed/KgEx3Sap_9U",
    publishDate: "2026-06-12",
    viewCount: "680",
    duration: "8:45"
  }
];

export const YOUTUBE_SHORTS: ShortType[] = [
  {
    id: "s1",
    youtubeId: "i5e-5qA10tY",
    title: "You're Never Out of the Game ⚽",
    thumbnail: "https://img.youtube.com/vi/i5e-5qA10tY/hqdefault.jpg",
    viewCount: "12.4K",
    likeCount: "1.2K",
    category: "Shorts"
  },
  {
    id: "s2",
    youtubeId: "rvyKW8umD68",
    title: "Playing the Game of Marketing 🎙️",
    thumbnail: "https://img.youtube.com/vi/rvyKW8umD68/hqdefault.jpg",
    viewCount: "8.9K",
    likeCount: "940",
    category: "Production"
  },
  {
    id: "s3",
    youtubeId: "tqBHDy095wo",
    title: "Real Life Marketing Opportunities 📈",
    thumbnail: "https://img.youtube.com/vi/tqBHDy095wo/hqdefault.jpg",
    viewCount: "15.3K",
    likeCount: "1.7K",
    category: "AI automation"
  },
  {
    id: "s4",
    youtubeId: "tm9RtmlJeNo",
    title: "Our Door Is Officially Official 🌩️",
    thumbnail: "https://img.youtube.com/vi/tm9RtmlJeNo/hqdefault.jpg",
    viewCount: "21.6K",
    likeCount: "2.4K",
    category: "Sports"
  },
  {
    id: "s5",
    youtubeId: "sqn9KRJ13Ak",
    title: "Down to the Minor Details 🖼️",
    thumbnail: "https://img.youtube.com/vi/sqn9KRJ13Ak/hqdefault.jpg",
    viewCount: "11.1K",
    likeCount: "880",
    category: "Workflow"
  },
  {
    id: "s6",
    youtubeId: "mUX8eF3JByI",
    title: "Making the HQ Officially Official 🌩️",
    thumbnail: "https://img.youtube.com/vi/mUX8eF3JByI/hqdefault.jpg",
    viewCount: "18.2K",
    likeCount: "1.9K",
    category: "Shorts"
  },
  {
    id: "s7",
    youtubeId: "Oap41c8GXZk",
    title: "New Carpet at the Headquarters 🏢",
    thumbnail: "https://img.youtube.com/vi/Oap41c8GXZk/hqdefault.jpg",
    viewCount: "9.5K",
    likeCount: "750",
    category: "Workflow"
  },
  {
    id: "s8",
    youtubeId: "kY5bIB7qZHg",
    title: "Carpet Transformation 👀",
    thumbnail: "https://img.youtube.com/vi/kY5bIB7qZHg/hqdefault.jpg",
    viewCount: "14.2K",
    likeCount: "1.1K",
    category: "Production"
  }
];

