"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Mic, Video, Users, Sparkles, Tv, Music } from "lucide-react";
import { supabase, type News, type Media } from "@/lib/supabase";
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

type ImageItem = {
  id: number;
  src: string;
  category: string;
  title: string;
};

// Fallback gallery images (same as Gallery page)
const fallbackGalleryImages: ImageItem[] = [
  {
    id: 1,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/daoduymc.png",
    category: "TV Host",
    title: "Television Studio",
  },
  {
    id: 2,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/mcdaoduy-1-ngoisao.vn_1.jpg",
    category: "TV Host",
    title: "On-Air Presentation",
  },
  {
    id: 3,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/mcdaoduy-5-ngoisao.vn_1.jpg",
    category: "Event Master",
    title: "Elegant Gala Evening",
  },
  {
    id: 4,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/vui-fest-fpt.jpg",
    category: "Event Master",
    title: "Luxury Event Setup",
  },
  {
    id: 5,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/sddefault.jpg",
    category: "Event Master",
    title: "Formal Dinner Event",
  },
  {
    id: 6,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/469176626_122124140288551154_3107982728511076430_n.jpg",
    category: "Conference Speaker",
    title: "Business Conference",
  },
  {
    id: 7,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/3RDtYmUyrVsJZdBzD3rb6E.jpg",
    category: "Conference Speaker",
    title: "Professional Speaking",
  },
  {
    id: 8,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/1-2-100301.jpg",
    category: "Conference Speaker",
    title: "Corporate Presentation",
  },
  {
    id: 9,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/Baja-Beach-Fest-anuncia-la-fecha-de-su-edicion-2026-y-lanza-primeros-boletos-1280x720.jpg",
    category: "Team Building",
    title: "Team Activity",
  },
  {
    id: 10,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/Concert.jpg",
    category: "Team Building",
    title: "Group Engagement",
  },
  {
    id: 11,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/getty_499517325_111264.webp",
    category: "Team Building",
    title: "Corporate Team Event",
  },
  {
    id: 12,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/nhung-loi-ich-bat-ngo-khi-to-chuc-hoat-dong-team-building.webp",
    category: "Team Building",
    title: "Interactive Workshop",
  },
];

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
  const [galleryImages, setGalleryImages] = useState<ImageItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

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

  useEffect(() => {
    const fetchImages = async () => {
      console.log("Fetching images for Home Gallery...");

      try {
        setLoadingGallery(true);

        // Try to fetch from Supabase first
        if (supabase) {
          const { data, error } = await supabase
            .from("media")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(12);

          if (error) {
            console.error("Error fetching images from Supabase:", error);
            console.log("Using fallback gallery images");
            // Use fallback images if Supabase fails
            setGalleryImages(fallbackGalleryImages.slice(0, 12));
          } else if (data && data.length > 0) {
            console.log("Found images from Supabase:", data.length);
            // Map Media data to ImageItem format (matching Gallery page structure)
            const mappedImages: ImageItem[] = data.map((item: Media) => ({
              id: item.id,
              src: item.url, // Map url to src
              category: item.category || "Gallery",
              title: item.caption || item.category || "Gallery Image",
            }));
            setGalleryImages(mappedImages);
          } else {
            console.log("No images found in Supabase 'media' table. Using fallback images.");
            // Use fallback images if database is empty
            setGalleryImages(fallbackGalleryImages.slice(0, 12));
          }
        } else {
          console.log("Supabase not configured. Using fallback gallery images");
          // Use fallback images if Supabase is not configured
          setGalleryImages(fallbackGalleryImages.slice(0, 12));
        }
      } catch (err: any) {
        console.error("Failed to fetch gallery images:", err);
        console.log("Using fallback gallery images due to error");
        // Use fallback images on any error
        setGalleryImages(fallbackGalleryImages.slice(0, 12));
      } finally {
        setLoadingGallery(false);
      }
    };

    fetchImages();
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

      {/* WHAT I DO SECTION - Editorial Zig-Zag Layout */}
      <section className="py-24 px-6 md:px-12 bg-[#F2E9E4] overflow-hidden">
        <div className="container mx-auto space-y-24 md:space-y-32">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] mb-6 tracking-tight">
              {t("home.whatIDo")}
            </h2>
            <p className="text-gray-600 text-lg">
              Sự chuyên nghiệp và tận tâm trong từng khoảnh khắc, mang đến thành công cho mọi sự kiện.
            </p>
          </motion.div>

          {/* ZIG-ZAG LIST */}
          {activities.map((item, index) => {
            // Map activity IDs to route types
            const routeMap: Record<number, string> = {
              1: "tv-host",
              2: "event-speaker",
              3: "conference-speaker",
              4: "team-building",
              5: "music-fest",
            };

            const activityRoute = routeMap[item.id] || "";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* IMAGE SIDE (50%) */}
                <div className="w-full md:w-1/2 group">
                  <Link
                    href={activityRoute ? `/activity/${activityRoute}` : "#"}
                    className="block overflow-hidden rounded-3xl shadow-2xl relative"
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[300px] md:h-[400px] object-cover transform transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Small Icon Badge */}
                    <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg text-[#0D0D0D]">
                      {item.icon}
                    </div>
                  </Link>
                </div>

                {/* TEXT SIDE (50%) */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#0D0D0D] mb-4 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {item.short_description ||
                      "Mô tả chi tiết về dịch vụ này sẽ giúp khách hàng hiểu rõ hơn về giá trị mà bạn mang lại."}
                  </p>

                  <Link
                    href={activityRoute ? `/activity/${activityRoute}` : "#"}
                    className="inline-flex items-center gap-2 text-[#0D0D0D] font-bold uppercase tracking-widest border-b-2 border-[#0D0D0D] pb-1 hover:text-gray-600 hover:border-gray-400 transition-all"
                  >
                    {t("common.readMore")}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
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

      {/* Image Gallery Section - Masonry Layout */}
      <section className="py-20 px-4 md:px-8 bg-[#F2E9E4]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D0D0D] tracking-tight mb-2">
              THƯ VIỆN HÌNH ẢNH
            </h2>
            <p className="text-[#737272] text-lg">Những khoảnh khắc đáng nhớ</p>
          </motion.div>

          {loadingGallery ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" style={{ color: "#737272" }} />
              <p className="mt-4" style={{ color: "#737272" }}>
                {t("common.loading")}
              </p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: "#737272" }}>Chưa có hình ảnh nào</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="columns-2 md:columns-4 gap-4 space-y-4"
            >
              {galleryImages.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="break-inside-avoid relative group rounded-xl overflow-hidden mb-4 cursor-zoom-in shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium px-2 text-center">
                      {img.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
