export interface Video {
  id: string;
  youtubeId: string;
  type: string;
  category: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  publishDate: string;
  viewCount: string;
  duration: string;
}

export interface Short {
  id: string;
  youtubeId: string;
  title: string;
  thumbnail: string;
  viewCount: string;
  likeCount: string;
  category: string;
}

export interface Service {
  title: string;
  description: string;
  iconName: string; // Used to fetch matching Lucide icon
  stats: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  metricLabel: string;
  type: "video" | "text";
  youtubeEmbedId?: string;
  avatarUrl: string;
}

export interface Partner {
  name: string;
  role: string;
  logoUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  readTime: string;
}

export interface StudioPhoto {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}
