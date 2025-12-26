"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ImageItem = {
  id: number;
  src: string;
  category: string;
  title: string;
};

const categories = ["All", "TV Host", "Event Master", "Conference Speaker", "Team Building", "Music Fest"];

const galleryImages: ImageItem[] = [
  // TV Host
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1475721027760-f7560cb6e7e8?q=80&w=1770&auto=format&fit=crop",
    category: "TV Host",
    title: "Television Studio",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1475721027760-f7560cb6e7e8?q=80&w=1770&auto=format&fit=crop",
    category: "TV Host",
    title: "On-Air Presentation",
  },
  // Event Master
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1769&auto=format&fit=crop",
    category: "Event Master",
    title: "Elegant Gala Evening",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1769&auto=format&fit=crop",
    category: "Event Master",
    title: "Luxury Event Setup",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1769&auto=format&fit=crop",
    category: "Event Master",
    title: "Formal Dinner Event",
  },
  // Conference Speaker
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1475721027760-f7560cb6e7e8?q=80&w=1770&auto=format&fit=crop",
    category: "Conference Speaker",
    title: "Business Conference",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1475721027760-f7560cb6e7e8?q=80&w=1770&auto=format&fit=crop",
    category: "Conference Speaker",
    title: "Professional Speaking",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1475721027760-f7560cb6e7e8?q=80&w=1770&auto=format&fit=crop",
    category: "Conference Speaker",
    title: "Corporate Presentation",
  },
  // Team Building
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1770&auto=format&fit=crop",
    category: "Team Building",
    title: "Team Activity",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1770&auto=format&fit=crop",
    category: "Team Building",
    title: "Group Engagement",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1770&auto=format&fit=crop",
    category: "Team Building",
    title: "Corporate Team Event",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1770&auto=format&fit=crop",
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
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop",
    category: "Music Fest",
    title: "Musical Celebration",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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
          Gallery
        </h1>
        <p className="text-lg mb-8" style={{ color: "#737272" }}>
          Explore our portfolio of memorable events
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
            {filteredImages.map((image) => (
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
                    <p className="text-foreground font-medium text-center px-4">
                      {image.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
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
