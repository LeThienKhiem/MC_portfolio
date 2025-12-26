"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase, type News } from "@/lib/supabase";
import { RefreshCw } from "lucide-react";

// Fallback images for news without thumbnails
const fallbackImages = [
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
];

export default function News() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setNews(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  return (
    <div className="min-h-screen pt-20 px-4 pb-20" style={{ backgroundColor: "#F2E9E4" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0D0D0D" }}>
          News
        </h1>
        <p className="text-lg mb-12" style={{ color: "#737272" }}>
          Stay updated with the latest insights and event coverage
        </p>

        {/* News Grid */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "#737272" }} />
            <p style={{ color: "#737272" }}>Loading news...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p style={{ color: "#737272" }}>{error}</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: "#737272" }}>No news articles available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => {
              const imageUrl =
                article.thumbnail_url || fallbackImages[index % fallbackImages.length];
              const excerpt = article.content.length > 150
                ? article.content.substring(0, 150) + "..."
                : article.content;

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white border rounded-lg overflow-hidden transition-all duration-300 group cursor-pointer"
                  style={{ borderColor: "#BFBCBA" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#D4AF37";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#BFBCBA";
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          fallbackImages[index % fallbackImages.length];
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{ color: "#737272", backgroundColor: "#F2E9E4" }}
                      >
                        {new Date(article.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-playfair text-xl font-bold mb-3 line-clamp-2"
                      style={{ color: "#0D0D0D" }}
                    >
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "#737272" }}
                    >
                      {excerpt}
                    </p>

                    {/* Read More Link */}
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm font-medium hover:underline transition-colors"
                      style={{ color: "#D4AF37" }}
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
