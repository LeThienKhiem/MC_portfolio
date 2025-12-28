"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Mic, Video, Users, Sparkles, Tv, Music } from "lucide-react";
import { supabase, type News } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

// Mark as dynamic to prevent static generation issues
export const dynamic = 'force-dynamic';

type ActivityItem = {
  id: number;
  image: string;
  title: string;
  short_description: string;
  icon: React.ReactNode;
  className: string;
};

// Activities will be created inside component to use translations

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
  const { t } = useLanguage();
  const [news, setNews] = useState<News[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number>(1); // Default open first one

  const activities: ActivityItem[] = [
    {
      id: 1,
      image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/photo-1507679799987-c73779587ccf.jpg",
      title: t("activity.tvHost"),
      short_description: t("activity.tvHostDesc"),
      icon: <Tv className="w-6 h-6" />,
      className: "", // No fixed height for masonry layout
    },
    {
      id: 2,
      image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/Baja-Beach-Fest-anuncia-la-fecha-de-su-edicion-2026-y-lanza-primeros-boletos-1280x720.jpg",
      title: t("activity.eventMaster"),
      short_description: t("activity.eventMasterDesc"),
      icon: <Mic className="w-6 h-6" />,
      className: "", // No fixed height for masonry layout
    },
    {
      id: 3,
      image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/getty_499517325_111264.webp",
      title: t("activity.conferenceSpeaker"),
      short_description: t("activity.conferenceSpeakerDesc"),
      icon: <Users className="w-5 h-5" />,
      className: "", // No fixed height for masonry layout
    },
    {
      id: 4,
      image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/nhung-loi-ich-bat-ngo-khi-to-chuc-hoat-dong-team-building.webp",
      title: t("activity.teamBuilding"),
      short_description: t("activity.teamBuildingDesc"),
      icon: <Sparkles className="w-5 h-5" />,
      className: "", // No fixed height for masonry layout
    },
    {
      id: 5,
      image: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/3RDtYmUyrVsJZdBzD3rb6E.jpg",
      title: t("activity.musicEvents"),
      short_description: t("activity.musicEventsDesc"),
      icon: <Music className="w-5 h-5" />,
      className: "", // No fixed height for masonry layout
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      if (!supabase) {
        setLoadingNews(false);
        setNewsError("Supabase not configured");
        return;
      }

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
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none"
            style={{ color: "#0D0D0D" }}
          >
            MC DAO DUY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
            style={{ color: "#737272" }}
          >
            {t("home.subtitle")}
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
              {t("home.bookNow")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Activity Gallery - Cinematic Expandable Gallery */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0D0D0D" }}
          >
            {t("home.whatIDo")}
          </motion.h2>

          {/* EXPANDABLE GALLERY CONTAINER */}
          <div className="flex flex-col md:flex-row h-auto md:h-[500px] gap-4 w-full">
            {activities.map((activity) => {
              // Map activity IDs to route types
              const routeMap: Record<number, string> = {
                1: "tv-host",
                2: "event-speaker",
                3: "conference-speaker",
                4: "team-building",
                5: "music-fest",
              };

              const activityRoute = routeMap[activity.id] || "";
              const isActive = activeId === activity.id;

              return (
                <Link
                  key={activity.id}
                  href={activityRoute ? `/activity/${activityRoute}` : "#"}
                  onMouseEnter={() => setActiveId(activity.id)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out shadow-xl
                    w-full h-[400px] grayscale-0 opacity-100
                    md:h-auto md:w-auto
                    ${isActive 
                      ? 'md:flex-[3] md:grayscale-0' 
                      : 'md:flex-[1] md:grayscale md:opacity-80 hover:md:opacity-100'}
                  `}
                >
                  {/* Background Image */}
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500
                    opacity-90 ${isActive ? 'md:opacity-90' : 'md:opacity-60'}
                  `}></div>

                  {/* Content Positioned at Bottom */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 whitespace-nowrap overflow-hidden">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`p-3 rounded-full backdrop-blur-md transition-all duration-500
                        bg-[#F2E9E4] text-[#0D0D0D]
                        ${isActive ? 'md:bg-[#F2E9E4] md:text-[#0D0D0D]' : 'md:bg-white/20 md:text-white'}
                      `}>
                        {activity.icon}
                      </span>
                      <h3 className={`text-xl md:text-3xl font-bold uppercase tracking-tighter text-white transition-all duration-300
                        opacity-100 translate-x-0 block
                        ${isActive ? 'md:opacity-100 md:translate-x-0' : 'md:opacity-80 md:-translate-x-2 md:hidden'}
                      `}>
                        {activity.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`text-gray-300 text-sm md:text-base font-light max-w-lg transition-all duration-500 delay-100 whitespace-normal
                      opacity-100 translate-y-0 visible h-auto
                      ${isActive ? 'md:opacity-100 md:translate-y-0 md:visible' : 'md:opacity-0 md:translate-y-4 md:invisible md:h-0'}
                    `}>
                      {activity.short_description || "Professional MC services tailored for your events."}
                    </p>
                  </div>
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
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ color: "#0D0D0D" }}
          >
            {t("home.latestNews")}
          </motion.h2>

          {loadingNews ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: "#737272" }} />
              <p className="mt-4" style={{ color: "#737272" }}>
                {t("common.loading")}
              </p>
            </div>
          ) : newsError ? (
            <div className="text-center py-12">
              <p style={{ color: "#737272" }}>{newsError}</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: "#737272" }}>{t("news.empty")}</p>
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
                      className="text-xl font-bold mb-3 line-clamp-2"
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
                      {t("common.readMore")}
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
                {t("common.viewAll")} {t("nav.news")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
