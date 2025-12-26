"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.gallery": "Thư viện",
    "nav.news": "Tin tức",
    "nav.booking": "Đặt lịch",
    // Common
    "common.loading": "Đang tải...",
    "common.error": "Lỗi",
    "common.readMore": "Đọc thêm",
    "common.viewAll": "Xem tất cả",
    "common.back": "Quay lại",
    // Home Page
    "home.subtitle": "Chuyên nghiệp • Thanh lịch • Linh hoạt",
    "home.bookNow": "Đặt lịch ngay",
    "home.whatIDo": "Tôi Làm Gì",
    "home.latestNews": "Tin Tức Mới Nhất",
    // Activities
    "activity.tvHost": "Dẫn Chương Trình TV",
    "activity.tvHostDesc": "Mang những câu chuyện lên màn hình với sự lôi cuốn và chuyên nghiệp",
    "activity.eventMaster": "Bậc Thầy Sự Kiện",
    "activity.eventMasterDesc": "Tổ chức những khoảnh khắc khó quên tại các sự kiện gala và lễ kỷ niệm",
    "activity.conferenceSpeaker": "Diễn Giả Hội Nghị",
    "activity.conferenceSpeakerDesc": "Thu hút khán giả với các bài thuyết trình năng động và sâu sắc",
    "activity.teamBuilding": "Xây Dựng Đội Nhóm",
    "activity.teamBuildingDesc": "Tạo kết nối và năng lượng cho các buổi họp doanh nghiệp",
    "activity.musicEvents": "Sự Kiện Âm Nhạc",
    "activity.musicEventsDesc": "Tạo sân khấu cho những trải nghiệm âm nhạc đáng nhớ",
    // About Page
    "about.title": "VỀ TÔI",
    "about.role": "MC Chuyên Nghiệp / Dẫn Chương Trình TV / Diễn Giả Sự Kiện",
    "about.bio1": "Với hơn một thập kỷ kinh nghiệm trong ngành giải trí, MC Đào Duy đã khẳng định mình là một trong những người dẫn chương trình sự kiện linh hoạt và lôi cuốn nhất Việt Nam. Sự hiện diện năng động và khả năng kết nối đặc biệt với khán giả đã khiến anh trở thành chuyên gia được săn đón cho mọi thứ từ các buổi họp doanh nghiệp thân mật đến các sự kiện truyền hình quy mô lớn.",
    "about.bio2": "Được biết đến với khả năng nắm bắt thời điểm hoàn hảo, tính cách ấm áp và khả năng song ngữ, Đào Duy mang đến sự kết hợp độc đáo giữa chuyên nghiệp và nhiệt huyết chân thành cho mọi sân khấu. Dù là tổ chức một gala sang trọng, điều phối một hội nghị công nghệ, hay dẫn dắt một sự kiện team building, anh đều tạo ra những trải nghiệm đáng nhớ còn vang vọng lâu sau khi màn đóng lại.",
    "about.bio3": "Sự linh hoạt của anh vượt ra ngoài công việc MC truyền thống—với tư cách là người dẫn chương trình TV, anh đã xuất hiện trên màn hình khắp cả nước, mang những câu chuyện đến với cuộc sống bằng khả năng kể chuyện hấp dẫn và sự lôi cuốn tự nhiên. Mỗi sự kiện trở thành một bức tranh nơi chuyên nghiệp gặp gỡ đam mê, tạo ra những khoảnh khắc mà khán giả nhớ mãi.",
    // Gallery Page
    "gallery.title": "Thư Viện",
    "gallery.subtitle": "Khám phá bộ sưu tập các sự kiện đáng nhớ",
    "gallery.all": "Tất Cả",
    "gallery.tvHost": "Dẫn Chương Trình TV",
    "gallery.eventMaster": "Bậc Thầy Sự Kiện",
    "gallery.conferenceSpeaker": "Diễn Giả Hội Nghị",
    "gallery.teamBuilding": "Xây Dựng Đội Nhóm",
    "gallery.musicFest": "Lễ Hội Âm Nhạc",
    // News Page
    "news.title": "Tin Tức",
    "news.subtitle": "Cập nhật những thông tin và sự kiện mới nhất",
    "news.loading": "Đang tải tin tức...",
    "news.error": "Không thể tải tin tức",
    "news.empty": "Chưa có tin tức nào",
    // Booking Page
    "booking.title": "Đặt Lịch Sự Kiện",
    "booking.fullName": "Họ và Tên",
    "booking.fullNamePlaceholder": "Nhập họ và tên của bạn",
    "booking.phone": "Số Điện Thoại",
    "booking.phonePlaceholder": "Nhập số điện thoại",
    "booking.email": "Email",
    "booking.emailPlaceholder": "Nhập địa chỉ email",
    "booking.date": "Ngày Sự Kiện",
    "booking.notes": "Ghi Chú",
    "booking.notesPlaceholder": "Thông tin thêm về sự kiện của bạn (tùy chọn)",
    "booking.submit": "Gửi Yêu Cầu",
    "booking.submitting": "Đang gửi...",
    "booking.success": "Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm.",
    "booking.error": "Đã xảy ra lỗi. Vui lòng thử lại.",
    // Activity Detail Page
    "activity.back": "Quay Về Trang Chủ",
    "activity.loading": "Đang tải...",
    "activity.error": "Không thể tải hình ảnh",
    "activity.empty": "Chưa có hình ảnh nào cho danh mục này",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.gallery": "Gallery",
    "nav.news": "News",
    "nav.booking": "Booking",
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.readMore": "Read More",
    "common.viewAll": "View All",
    "common.back": "Back",
    // Home Page
    "home.subtitle": "Professional • Elegant • Versatile",
    "home.bookNow": "Book Now",
    "home.whatIDo": "What I Do",
    "home.latestNews": "Latest News",
    // Activities
    "activity.tvHost": "TV Host",
    "activity.tvHostDesc": "Bringing stories to life on screen with charisma and professionalism",
    "activity.eventMaster": "Event Master",
    "activity.eventMasterDesc": "Orchestrating unforgettable moments at galas and celebrations",
    "activity.conferenceSpeaker": "Conference Speaker",
    "activity.conferenceSpeakerDesc": "Engaging audiences with dynamic presentations and insights",
    "activity.teamBuilding": "Team Building",
    "activity.teamBuildingDesc": "Creating connections and energizing corporate gatherings",
    "activity.musicEvents": "Music Events",
    "activity.musicEventsDesc": "Setting the stage for memorable musical experiences",
    // About Page
    "about.title": "ABOUT ME",
    "about.role": "Professional MC / TV Host / Event Speaker",
    "about.bio1": "With over a decade of experience in the entertainment industry, MC Đào Duy has established himself as one of Vietnam's most versatile and charismatic event hosts. His dynamic presence and exceptional ability to connect with audiences have made him a sought-after professional for everything from intimate corporate gatherings to grand-scale televised events.",
    "about.bio2": "Known for his impeccable timing, warm personality, and bilingual capabilities, Đào Duy brings a unique blend of professionalism and genuine enthusiasm to every stage. Whether hosting a luxury gala, moderating a tech conference, or leading a team building event, he crafts memorable experiences that resonate long after the curtains close.",
    "about.bio3": "His versatility extends beyond traditional MC work—as a TV host, he has graced screens across the nation, bringing stories to life with his engaging storytelling and natural charisma. Each event becomes a canvas where professionalism meets passion, creating moments that audiences remember.",
    // Gallery Page
    "gallery.title": "Gallery",
    "gallery.subtitle": "Explore our portfolio of memorable events",
    "gallery.all": "All",
    "gallery.tvHost": "TV Host",
    "gallery.eventMaster": "Event Master",
    "gallery.conferenceSpeaker": "Conference Speaker",
    "gallery.teamBuilding": "Team Building",
    "gallery.musicFest": "Music Fest",
    // News Page
    "news.title": "News",
    "news.subtitle": "Stay updated with the latest insights and event coverage",
    "news.loading": "Loading news...",
    "news.error": "Failed to load news",
    "news.empty": "No news available",
    // Booking Page
    "booking.title": "Book Your Event",
    "booking.fullName": "Full Name",
    "booking.fullNamePlaceholder": "Enter your full name",
    "booking.phone": "Phone Number",
    "booking.phonePlaceholder": "Enter your phone number",
    "booking.email": "Email",
    "booking.emailPlaceholder": "Enter your email address",
    "booking.date": "Event Date",
    "booking.notes": "Notes",
    "booking.notesPlaceholder": "Additional information about your event (optional)",
    "booking.submit": "Submit Request",
    "booking.submitting": "Submitting...",
    "booking.success": "Booking submitted successfully! We'll contact you soon.",
    "booking.error": "An error occurred. Please try again.",
    // Activity Detail Page
    "activity.back": "Back to Home",
    "activity.loading": "Loading...",
    "activity.error": "Failed to load images",
    "activity.empty": "No images available for this category",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

