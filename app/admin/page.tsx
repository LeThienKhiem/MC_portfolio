"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Booking, type Media, type News } from "@/lib/supabase";

// Mark as dynamic to prevent static generation issues
export const dynamic = 'force-dynamic';
import { isAuthenticated, clearAuth } from "@/lib/auth";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Newspaper,
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
  LogOut,
} from "lucide-react";

type TabType = "bookings" | "media" | "news";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("bookings");
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Check authentication on mount
    if (!isAuthenticated()) {
      router.push("/admin/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push("/admin/login");
  };

  // Show loading while checking auth
  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F2E9E4" }}>
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "#737272" }} />
          <p style={{ color: "#737272" }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12" style={{ backgroundColor: "#F2E9E4" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "#403F3D", fontFamily: "var(--font-playfair), serif" }}
            >
              Admin Dashboard
            </h1>
            <p style={{ color: "#737272" }}>Manage bookings, media, and news</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#737272",
              border: "1px solid #BFBCBA",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F2E9E4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
            }}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b" style={{ borderColor: "#BFBCBA" }}>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-1 min-w-max">
              <TabButton
                icon={<LayoutDashboard className="w-4 h-4" />}
                label="Bookings"
                isActive={activeTab === "bookings"}
                onClick={() => setActiveTab("bookings")}
              />
              <TabButton
                icon={<ImageIcon className="w-4 h-4" />}
                label="Media Manager"
                isActive={activeTab === "media"}
                onClick={() => setActiveTab("media")}
              />
              <TabButton
                icon={<Newspaper className="w-4 h-4" />}
                label="News Editor"
                isActive={activeTab === "news"}
                onClick={() => setActiveTab("news")}
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "bookings" && <BookingsTab />}
        {activeTab === "media" && <MediaTab />}
        {activeTab === "news" && <NewsTab />}
      </div>
    </div>
  );
}

// Tab Button Component
function TabButton({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 relative"
      style={{
        color: isActive ? "#403F3D" : "#737272",
        borderBottom: isActive ? "2px solid #403F3D" : "2px solid transparent",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Bookings Tab
function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!supabase) {
      setError("Supabase not configured");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setBookings(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();

    if (!supabase) return;

    // Real-time subscription
    const channel = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, [fetchBookings]);

  const markAsFinished = async (id: number) => {
    if (!supabase) {
      alert("Supabase not configured");
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ is_finished: true })
        .eq("id", id);

      if (updateError) throw updateError;

      setBookings(
        bookings.map((booking) =>
          booking.id === id ? { ...booking, is_finished: true } : booking
        )
      );
    } catch (err: any) {
      alert(`Failed to update: ${err.message}`);
    }
  };

  return (
    <div>
      {error && (
        <div
          className="mb-6 p-4 rounded-lg flex items-center gap-3"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #BFBCBA" }}
        >
          <AlertCircle className="w-5 h-5" style={{ color: "#737272" }} />
          <p style={{ color: "#0D0D0D" }}>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "#737272" }} />
          <p style={{ color: "#737272" }}>Loading bookings...</p>
        </div>
      ) : (
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ border: "1px solid #BFBCBA" }}
        >
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p style={{ color: "#737272" }}>No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "#F2E9E4", borderBottom: "1px solid #BFBCBA" }}>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0D0D0D" }}>
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0D0D0D" }}>
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0D0D0D" }}>
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0D0D0D" }}>
                      Event Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0D0D0D" }}>
                      Notes
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0D0D0D" }}>
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: "#0D0D0D" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      style={{ borderBottom: "1px solid #BFBCBA" }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm" style={{ color: "#737272" }}>
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" style={{ color: "#737272" }} />
                          <span style={{ color: "#0D0D0D" }}>{booking.full_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4" style={{ color: "#737272" }} />
                          <span style={{ color: "#737272" }}>{booking.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: "#737272" }} />
                          <span style={{ color: "#0D0D0D" }}>
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {booking.notes ? (
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" style={{ color: "#737272" }} />
                            <span className="text-sm" style={{ color: "#737272" }}>
                              {booking.notes.length > 30
                                ? `${booking.notes.substring(0, 30)}...`
                                : booking.notes}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm" style={{ color: "#737272" }}>
                            No notes
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: booking.is_finished ? "#E8F5E9" : "#F2E9E4",
                            color: booking.is_finished ? "#2E7D32" : "#0D0D0D",
                            border: `1px solid ${booking.is_finished ? "#4CAF50" : "#BFBCBA"}`,
                          }}
                        >
                          {booking.is_finished ? "Completed" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => markAsFinished(booking.id)}
                          disabled={booking.is_finished}
                          className="text-xs px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: booking.is_finished ? "#BFBCBA" : "#403F3D",
                            color: "#FFFFFF",
                          }}
                        >
                          {booking.is_finished ? "Finished" : "Mark as Finished"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Media Tab
function MediaTab() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "image" as "image" | "video",
    category: "",
    caption: "",
  });

  const fetchMedia = useCallback(async () => {
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
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setMedia(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Auto-detect type based on file
      const isVideo = file.type.startsWith("video/");
      setFormData({ ...formData, type: isVideo ? "video" : "image" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase) {
      setError("Supabase not configured");
      return;
    }

    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    try {
      setError(null);
      setUploading(true);

      // Generate unique file path
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("images")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error("Failed to get public URL");
      }

      // Insert media record with public URL
      const { error: insertError } = await supabase.from("media").insert([
        {
          url: urlData.publicUrl,
          type: formData.type,
          category: formData.category || null,
          caption: formData.caption || null,
        },
      ]);

      if (insertError) throw insertError;

      // Reset form
      setFormData({ type: "image", category: "", caption: "" });
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Reset file input
      const fileInput = document.getElementById("file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      fetchMedia();
    } catch (err: any) {
      setError(err.message || "Failed to upload media");
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: number) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    if (!supabase) {
      alert("Supabase not configured");
      return;
    }

    try {
      // Get media item to extract file path
      const mediaItem = media.find((item) => item.id === id);
      
      if (mediaItem) {
        try {
          // Extract file path from URL if it's from Supabase Storage
          const url = new URL(mediaItem.url);
          
          // Check if URL is from Supabase Storage
          if (url.pathname.includes("/storage/v1/object/public/images/")) {
            // Extract path: public/filename from URL
            // URL format: https://[project].supabase.co/storage/v1/object/public/images/public/filename
            const pathMatch = url.pathname.match(/\/images\/(.+)$/);
            if (pathMatch) {
              const filePath = pathMatch[1];
              // Delete from storage
              const { error: storageError } = await supabase.storage
                .from("images")
                .remove([filePath]);
              
              if (storageError) {
                console.warn("Failed to delete from storage:", storageError);
                // Continue to delete from database even if storage delete fails
              }
            }
          }
        } catch (urlError) {
          // If URL parsing fails, it might be an external URL - just delete from database
          console.warn("Could not parse URL, deleting from database only:", urlError);
        }
      }

      // Delete from database
      const { error: deleteError } = await supabase.from("media").delete().eq("id", id);

      if (deleteError) throw deleteError;

      fetchMedia();
    } catch (err: any) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  const groupedMedia = media.reduce((acc, item) => {
    const cat = item.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, Media[]>);

  return (
    <div className="space-y-6">
      {/* Add Media Form */}
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ border: "1px solid #BFBCBA" }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D0D0D" }}>
          Add New Media
        </h2>
        {error && (
          <div
            className="mb-4 p-3 rounded-lg flex items-center gap-2"
            style={{ backgroundColor: "#F2E9E4", border: "1px solid #BFBCBA" }}
          >
            <AlertCircle className="w-4 h-4" style={{ color: "#737272" }} />
            <p className="text-sm" style={{ color: "#0D0D0D" }}>
              {error}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#0D0D0D" }}>
              File
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*,video/*"
              required
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: "#BFBCBA",
                backgroundColor: "#FFFFFF",
                color: "#0D0D0D",
              }}
              disabled={uploading}
            />
            {previewUrl && formData.type === "image" && (
              <div className="mt-4">
                <p className="text-sm mb-2" style={{ color: "#737272" }}>Preview:</p>
                <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border" style={{ borderColor: "#BFBCBA" }}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            {selectedFile && (
              <p className="mt-2 text-sm" style={{ color: "#737272" }}>
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#0D0D0D" }}>
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as "image" | "video" })
                }
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  borderColor: "#BFBCBA",
                  backgroundColor: "#FFFFFF",
                  color: "#0D0D0D",
                }}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#0D0D0D" }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  borderColor: "#BFBCBA",
                  backgroundColor: "#FFFFFF",
                  color: "#0D0D0D",
                }}
              >
                <option value="">Select a category</option>
                <option value="TV Host">TV Host</option>
                <option value="Event Master">Event Master</option>
                <option value="Conference Speaker">Conference Speaker</option>
                <option value="Team Building">Team Building</option>
                <option value="Music Fest">Music Fest</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#0D0D0D" }}>
              Caption
            </label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border resize-none"
              style={{
                borderColor: "#BFBCBA",
                backgroundColor: "#FFFFFF",
                color: "#0D0D0D",
              }}
              placeholder="Optional caption..."
            />
          </div>
          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#403F3D", color: "#FFFFFF" }}
          >
            {uploading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Media
              </>
            )}
          </button>
        </form>
      </div>

      {/* Media Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D0D0D" }}>
          Media Library
        </h2>
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "#737272" }} />
            <p style={{ color: "#737272" }}>Loading media...</p>
          </div>
        ) : Object.keys(groupedMedia).length === 0 ? (
          <div className="p-12 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #BFBCBA", borderRadius: "8px" }}>
            <p style={{ color: "#737272" }}>No media found. Add some media to get started.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedMedia).map(([category, items]) => (
              <div key={category}>
                <h3
                  className="text-lg font-semibold mb-3 px-3"
                  style={{ color: "#403F3D" }}
                >
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden shadow"
                      style={{ border: "1px solid #BFBCBA" }}
                    >
                      <div className="relative aspect-square">
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={item.caption || "Media"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23BFBCBA' width='100' height='100'/%3E%3Ctext fill='%23737272' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ backgroundColor: "#F2E9E4" }}
                          >
                            <span style={{ color: "#737272" }}>Video</span>
                          </div>
                        )}
                        <button
                          onClick={() => deleteMedia(item.id)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-white/90 hover:bg-white transition-colors"
                          style={{ color: "#737272" }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {item.caption && (
                        <div className="p-3">
                          <p className="text-sm" style={{ color: "#737272" }}>
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// News Tab
function NewsTab() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    thumbnail_url: "",
    content: "",
  });

  const fetchNews = useCallback(async () => {
    if (!supabase) {
      setError("Supabase not configured");
      setLoading(false);
      return;
    }

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
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase) {
      setError("Supabase not configured");
      return;
    }

    try {
      setError(null);

      const { error: insertError } = await supabase.from("news").insert([
        {
          title: formData.title,
          thumbnail_url: formData.thumbnail_url || null,
          content: formData.content,
        },
      ]);

      if (insertError) throw insertError;

      setFormData({ title: "", thumbnail_url: "", content: "" });
      fetchNews();
    } catch (err: any) {
      setError(err.message || "Failed to post news");
    }
  };

  const deleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    if (!supabase) {
      alert("Supabase not configured");
      return;
    }

    try {
      const { error: deleteError } = await supabase.from("news").delete().eq("id", id);

      if (deleteError) throw deleteError;

      fetchNews();
    } catch (err: any) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Post News Form */}
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ border: "1px solid #BFBCBA" }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D0D0D" }}>
          Post New Article
        </h2>
        {error && (
          <div
            className="mb-4 p-3 rounded-lg flex items-center gap-2"
            style={{ backgroundColor: "#F2E9E4", border: "1px solid #BFBCBA" }}
          >
            <AlertCircle className="w-4 h-4" style={{ color: "#737272" }} />
            <p className="text-sm" style={{ color: "#0D0D0D" }}>
              {error}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#0D0D0D" }}>
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: "#BFBCBA",
                backgroundColor: "#FFFFFF",
                color: "#0D0D0D",
              }}
              placeholder="Enter article title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#0D0D0D" }}>
              Thumbnail URL
            </label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: "#BFBCBA",
                backgroundColor: "#FFFFFF",
                color: "#0D0D0D",
              }}
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#0D0D0D" }}>
              Content
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 rounded-lg border resize-none"
              style={{
                borderColor: "#BFBCBA",
                backgroundColor: "#FFFFFF",
                color: "#0D0D0D",
              }}
              placeholder="Write your article content here..."
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            style={{ backgroundColor: "#403F3D", color: "#FFFFFF" }}
          >
            <Plus className="w-4 h-4" />
            Post News
          </button>
        </form>
      </div>

      {/* News List */}
      <div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D0D0D" }}>
          Published Articles
        </h2>
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "#737272" }} />
            <p style={{ color: "#737272" }}>Loading news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="p-12 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #BFBCBA", borderRadius: "8px" }}>
            <p style={{ color: "#737272" }}>No news articles yet. Post your first article!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-6"
                style={{ border: "1px solid #BFBCBA" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#0D0D0D" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "#737272" }}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    <p
                      className="text-sm line-clamp-3 mb-4"
                      style={{ color: "#737272" }}
                    >
                      {item.content}
                    </p>
                    {item.thumbnail_url && (
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => deleteNews(item.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ color: "#737272" }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
