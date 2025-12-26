"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { supabase, type Media } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

// Mark as dynamic to prevent static generation issues
export const dynamic = 'force-dynamic';

type ActivityType = "tv-host" | "event-speaker" | "conference-speaker" | "team-building" | "music-fest";

type ThemeConfig = {
  vibe: string;
  background: string;
  textColor: string;
  accentColor: string;
  layout: "grid" | "masonry" | "carousel" | "bold-grid";
  headerFont: "serif" | "sans";
};

const themeConfig: Record<ActivityType, ThemeConfig> = {
  "conference-speaker": {
    vibe: "Professional & Elegant",
    background: "#F2E9E4",
    textColor: "#0D0D0D",
    accentColor: "#403F3D",
    layout: "grid",
    headerFont: "serif",
  },
  "event-speaker": {
    vibe: "Professional & Elegant",
    background: "#F2E9E4",
    textColor: "#0D0D0D",
    accentColor: "#403F3D",
    layout: "grid",
    headerFont: "serif",
  },
  "team-building": {
    vibe: "Energetic & Colorful",
    background: "#FFFFFF",
    textColor: "#0D0D0D",
    accentColor: "#FFB800",
    layout: "masonry",
    headerFont: "sans",
  },
  "music-fest": {
    vibe: "Dark & Hype",
    background: "#1a1a1a",
    textColor: "#FFFFFF",
    accentColor: "#FF00FF",
    layout: "bold-grid",
    headerFont: "sans",
  },
  "tv-host": {
    vibe: "Cinematic & Studio",
    background: "#0D0D0D",
    textColor: "#FFFFFF",
    accentColor: "#FFFFFF",
    layout: "carousel",
    headerFont: "sans",
  },
};

const activityTitles: Record<ActivityType, string> = {
  "tv-host": "TV Host",
  "event-speaker": "Event Master",
  "conference-speaker": "Conference Speaker",
  "team-building": "Team Building",
  "music-fest": "Music Fest",
};

const activityDescriptions: Record<ActivityType, string> = {
  "tv-host":
    "Bringing stories to life on screen with charisma, professionalism, and an engaging presence that captivates audiences across the nation.",
  "event-speaker":
    "Orchestrating unforgettable moments at galas, celebrations, and special events with elegance, timing, and genuine warmth.",
  "conference-speaker":
    "Delivering powerful presentations and moderating discussions at corporate conferences with authority, clarity, and audience engagement.",
  "team-building":
    "Creating dynamic, interactive experiences that energize teams, build connections, and transform corporate gatherings into memorable adventures.",
  "music-fest":
    "Setting the stage for electrifying musical experiences, keeping the energy high and the crowd engaged from the first beat to the final encore.",
};

const categoryMapping: Record<ActivityType, string> = {
  "tv-host": "TV Host",
  "event-speaker": "Event Master",
  "conference-speaker": "Conference Speaker",
  "team-building": "Team Building",
  "music-fest": "Music Fest",
};

export default function ActivityDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const type = params?.type as ActivityType;

  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const theme = themeConfig[type] || themeConfig["conference-speaker"];
  
  const activityTitleMap: Record<ActivityType, string> = {
    "tv-host": t("activity.tvHost"),
    "event-speaker": t("activity.eventMaster"),
    "conference-speaker": t("activity.conferenceSpeaker"),
    "team-building": t("activity.teamBuilding"),
    "music-fest": t("activity.musicEvents"),
  };

  const activityDescMap: Record<ActivityType, string> = {
    "tv-host": t("activity.tvHostDesc"),
    "event-speaker": t("activity.eventMasterDesc"),
    "conference-speaker": t("activity.conferenceSpeakerDesc"),
    "team-building": t("activity.teamBuildingDesc"),
    "music-fest": t("activity.musicEventsDesc"),
  };

  const title = activityTitleMap[type] || "Activity";
  const description = activityDescMap[type] || "";
  const category = categoryMapping[type] || "";

  useEffect(() => {
    if (!type || !themeConfig[type as ActivityType]) {
      router.push("/");
      return;
    }

    const fetchMedia = async () => {
      if (!supabase) {
        setError("Supabase not configured");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("media")
          .select("*")
          .eq("category", category)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setMedia(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch media");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [type, category, router]);

  // Carousel navigation for TV Host
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  if (!type || !themeConfig[type as ActivityType]) {
    return null;
  }

  return (
    <div
      className="min-h-screen pt-20 px-4 pb-20"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 font-medium transition-colors"
          style={{ color: theme.textColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          {t("activity.back")}
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 ${
              theme.headerFont === "serif" ? "font-playfair" : ""
            }`}
            style={{ color: theme.textColor }}
          >
            {title}
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl leading-relaxed"
            style={{ color: theme.textColor, opacity: 0.8 }}
          >
            {description}
          </p>
        </motion.div>

        {/* Gallery Section */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw
              className="w-8 h-8 animate-spin mx-auto mb-4"
              style={{ color: theme.textColor }}
            />
            <p style={{ color: theme.textColor, opacity: 0.7 }}>{t("activity.loading")}</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <AlertCircle
              className="w-8 h-8 mx-auto mb-4"
              style={{ color: theme.textColor }}
            />
            <p style={{ color: theme.textColor, opacity: 0.7 }}>{error || t("activity.error")}</p>
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: theme.textColor, opacity: 0.7 }}>
              {t("activity.empty")}
            </p>
          </div>
        ) : (
          <>
            {theme.layout === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-lg"
                    style={{ border: `1px solid ${theme.accentColor}20` }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.caption || title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {item.caption && (
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <p className="text-sm" style={{ color: "#FFFFFF" }}>
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {theme.layout === "masonry" && (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="break-inside-avoid mb-6 relative group overflow-hidden rounded-lg"
                    style={{
                      border: `3px solid ${index % 3 === 0 ? "#FFB800" : index % 3 === 1 ? "#00A8FF" : "#FF6B35"}`,
                    }}
                  >
                    <img
                      src={item.url}
                      alt={item.caption || title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.caption && (
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm"
                      >
                        <p className="text-sm font-medium" style={{ color: "#0D0D0D" }}>
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {theme.layout === "carousel" && (
              <div className="relative">
                <div className="relative h-[70vh] overflow-hidden rounded-lg">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={media[currentImageIndex]?.url}
                      alt={media[currentImageIndex]?.caption || title}
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  {media[currentImageIndex]?.caption && (
                    <div
                      className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent"
                    >
                      <p className="text-lg" style={{ color: "#FFFFFF" }}>
                        {media[currentImageIndex].caption}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  style={{ color: "#FFFFFF" }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  style={{ color: "#FFFFFF" }}
                >
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </button>
                <div className="flex justify-center gap-2 mt-6">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "w-8" : ""
                      }`}
                      style={{
                        backgroundColor:
                          index === currentImageIndex ? theme.accentColor : theme.textColor + "40",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {theme.layout === "bold-grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {media.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative group overflow-hidden ${
                      index === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        index === 0 ? "h-[600px]" : "h-[300px]"
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.caption || title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <p
                              className="text-xl font-bold"
                              style={{ color: theme.accentColor }}
                            >
                              {item.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

