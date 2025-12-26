"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Mic, Video, Users, Sparkles, Tv, Music } from "lucide-react";
import { supabase, type News } from "@/lib/supabase";

type ActivityItem = {
  id: number;
  image: string;
  title: string;
  short_description: string;
  icon: React.ReactNode;
  className: string;
};

const activities: ActivityItem[] = [
  {
    id: 1,
    image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/photo-1507679799987-c73779587ccf.jpg",
    title: "TV Host",
    short_description: "Bringing stories to life on screen with charisma and professionalism",
    icon: <Tv className="w-6 h-6" />,
    className: "h-[400px] md:h-[500px]", // Uniform height for all items
  },
  {
    id: 2,
    image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/Baja-Beach-Fest-anuncia-la-fecha-de-su-edicion-2026-y-lanza-primeros-boletos-1280x720.jpg",
    title: "Event Master",
    short_description: "Orchestrating unforgettable moments at galas and celebrations",
    icon: <Mic className="w-6 h-6" />,
    className: "h-[400px] md:h-[500px]", // Uniform height for all items
  },
  {
    id: 3,
    image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/getty_499517325_111264.webp",
    title: "Conference Speaker",
    short_description: "Engaging audiences with dynamic presentations and insights",
    icon: <Users className="w-5 h-5" />,
    className: "h-[400px] md:h-[500px]", // Uniform height for all items
  },
  {
    id: 4,
    image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/nhung-loi-ich-bat-ngo-khi-to-chuc-hoat-dong-team-building.webp",
    title: "Team Building",
    short_description: "Creating connections and energizing corporate gatherings",
    icon: <Sparkles className="w-5 h-5" />,
    className: "h-[400px] md:h-[500px]", // Uniform height for all items
  },
  {
    id: 5,
    image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/3RDtYmUyrVsJZdBzD3rb6E.jpg",
    title: "Music Events",
    short_description: "Setting the stage for memorable musical experiences",
    icon: <Music className="w-5 h-5" />,
    className: "h-[400px] md:h-[500px]", // Uniform height for all items
  },
];

// Image Slider Component
function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/Concert.jpg", // Event Atmosphere
    "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/vecteezy_ai-generated-young-people-at-the-music-festival-with-fireworks_35849566.jpg", // Speaker/Mic
    "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/1-2-100301.jpg", // Gala/Stage
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={images[currentIndex]}
            alt={`Background ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.3 }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F2E9E4] z-0" />
    </div>
  );
}

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        setNewsError(null);

        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;

        setNews(data || []);
      } catch (err: any) {
        setNewsError(err.message || "Failed to fetch news");
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={{ backgroundColor: "#F2E9E4" }}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Image Slider */}
        <ImageSlider />
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none"
            style={{ color: "#0D0D0D" }}
          >
            MC DAO DUY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
            style={{ color: "#737272", fontFamily: "var(--font-inter), sans-serif" }}
          >
            Professional • Elegant • Versatile
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-all duration-300 group"
              style={{
                backgroundColor: "#403F3D",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2D2C2A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#403F3D";
              }}
            >
              Book Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Activity Gallery - Bento Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0D0D0D" }}
          >
            What I Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {activities.map((activity, index) => {
              // Map activity titles to route types
              const routeMap: Record<string, string> = {
                "TV Host": "tv-host",
                "Event Master": "event-speaker",
                "Conference Speaker": "conference-speaker",
                "Team Building": "team-building",
                "Music Events": "music-fest",
              };

              const activityRoute = routeMap[activity.title] || "";

              return (
                <Link
                  href={activityRoute ? `/activity/${activityRoute}` : "#"}
                  key={activity.id}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative group cursor-pointer overflow-hidden rounded-lg ${activity.className}`}
                    style={{ border: "1px solid #BFBCBA" }}
                  >
                    {/* Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay - Always visible but darker on hover */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/60 transition-all duration-300" />

                    {/* Content - Always visible */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                        <div
                          className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.25)",
                            backdropFilter: "blur(10px)",
                            color: "#FFFFFF",
                          }}
                        >
                          {activity.icon}
                          <span className="text-sm font-medium">{activity.title}</span>
                        </div>
                        <h3
                          className="font-playfair text-2xl md:text-3xl font-bold mb-2"
                          style={{ color: "#FFFFFF" }}
                        >
                          {activity.title}
                        </h3>
                        <p
                          className="text-sm md:text-base line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: "#FFFFFF" }}
                        >
                          {activity.short_description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 border-t" style={{ borderColor: "#BFBCBA" }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0D0D0D" }}
          >
            Latest News
          </motion.h2>

          {loadingNews ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: "#737272" }} />
              <p className="mt-4" style={{ color: "#737272" }}>
                Loading news...
              </p>
            </div>
          ) : newsError ? (
            <div className="text-center py-12">
              <p style={{ color: "#737272" }}>{newsError}</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: "#737272" }}>No news articles available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((article) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{ border: "1px solid #BFBCBA" }}
                >
                  {/* Thumbnail */}
                  {article.thumbnail_url ? (
                    <div className="relative w-full h-48">
                      <img
                        src={article.thumbnail_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-48 flex items-center justify-center"
                      style={{ backgroundColor: "#F2E9E4" }}
                    >
                      <Calendar className="w-12 h-12" style={{ color: "#BFBCBA" }} />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4" style={{ color: "#737272" }} />
                      <time className="text-sm" style={{ color: "#737272" }}>
                        {new Date(article.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h3
                      className="font-playfair text-xl font-bold mb-3 line-clamp-2"
                      style={{ color: "#0D0D0D" }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-sm line-clamp-3 mb-4"
                      style={{ color: "#737272" }}
                    >
                      {article.content}
                    </p>
                    <Link
                      href="/news"
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                      style={{ color: "#403F3D" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#2D2C2A";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#403F3D";
                      }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* View All Link */}
          {news.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#403F3D",
                  border: "1px solid #BFBCBA",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F2E9E4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
              >
                View All News
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
