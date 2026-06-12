import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. YouTube & Shorts Feed API
// Preseeded actual Resolution Promotions & ResSports content
const YOUTUBE_VIDEOS = [
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

const YOUTUBE_SHORTS = [
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

// Combine standard endpoints
app.get("/api/videos", (req, res) => {
  res.json({
    videos: YOUTUBE_VIDEOS,
    channelUrl: "https://www.youtube.com/@ResSports",
    channelName: "Resolution Sports"
  });
});

app.get("/api/shorts", (req, res) => {
  res.json({
    shorts: YOUTUBE_SHORTS,
    channelUrl: "https://www.youtube.com/@ResSports",
    channelName: "Resolution Sports"
  });
});

// 2. Mount Dev Sever Middlewares or Serve Production Bundle
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Resolution Promotions Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
