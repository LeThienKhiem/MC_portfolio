"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type ImageItem = {
  id: number;
  src: string;
  category: string;
  title: string;
};

const galleryImages: ImageItem[] = [
  // TV Host
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
  // Event Master
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
  // Conference Speaker
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
  // Team Building
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
  // Music Fest
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop",
    category: "Music Fest",
    title: "Concert Stage",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop",
    category: "Music Fest",
    title: "Live Performance",
  },
  {
    id: 15,
    src: "https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/vecteezy_ai-generated-young-people-at-the-music-festival-with-fireworks_35849566.jpg",
    category: "Music Fest",
    title: "Musical Celebration",
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(t("gallery.all"));
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const categories = [
    t("gallery.all"),
    t("gallery.tvHost"),
    t("gallery.eventMaster"),
    t("gallery.conferenceSpeaker"),
    t("gallery.teamBuilding"),
    t("gallery.musicFest"),
  ];

  // Map translated categories to original category names
  const categoryTranslationMap: Record<string, string> = {
    [t("gallery.all")]: "All",
    [t("gallery.tvHost")]: "TV Host",
    [t("gallery.eventMaster")]: "Event Master",
    [t("gallery.conferenceSpeaker")]: "Conference Speaker",
    [t("gallery.teamBuilding")]: "Team Building",
    [t("gallery.musicFest")]: "Music Fest",
  };

  const reverseCategoryMap: Record<string, string> = {
    "All": t("gallery.all"),
    "TV Host": t("gallery.tvHost"),
    "Event Master": t("gallery.eventMaster"),
    "Conference Speaker": t("gallery.conferenceSpeaker"),
    "Team Building": t("gallery.teamBuilding"),
    "Music Fest": t("gallery.musicFest"),
  };

  const filteredImages =
    activeCategory === t("gallery.all")
      ? galleryImages
      : galleryImages.filter((img) => {
          const originalCategory = categoryTranslationMap[activeCategory] || activeCategory;
          return img.category === originalCategory;
        });

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen pt-20 px-4 pb-20" style={{ backgroundColor: "#F2E9E4" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0D0D0D" }}>
          {t("gallery.title")}
        </h1>
        <p className="text-lg mb-8" style={{ color: "#737272" }}>
          {t("gallery.subtitle")}
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b pb-4" style={{ borderColor: "#BFBCBA" }}>
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{ color: isActive ? "#D4AF37" : "#737272" }}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#D4AF37" }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p style={{ color: "#737272" }}>No images found in this category.</p>
              </div>
            ) : (
              filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white font-medium text-center px-4">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-6xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-foreground hover:text-gold transition-colors z-10"
                  aria-label="Close lightbox"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Image */}
                <div className="relative w-full h-full">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain max-h-[90vh] rounded-lg"
                  />
                </div>

                {/* Image Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="font-playfair text-2xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
                    {selectedImage.title}
                  </h3>
                  <p style={{ color: "#A1A1AA" }}>{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
