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

