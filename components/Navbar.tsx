"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.gallery", href: "/gallery" },
  { key: "nav.news", href: "/news" },
  { key: "nav.booking", href: "/booking" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showLanguageMenu && !target.closest(".language-menu-container")) {
        setShowLanguageMenu(false);
      }
    };

    if (showLanguageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguageMenu]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b"
          : "bg-transparent"
      }`}
      style={{ borderColor: isScrolled ? "#BFBCBA" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-playfair text-2xl font-bold" style={{ color: "#D4AF37" }}>
              MC
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ 
                    color: isActive ? "#D4AF37" : "#737272"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#0D0D0D";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#737272";
                  }}
                >
                  {t(link.key)}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher - Desktop Only */}
          <div className="hidden md:block relative language-menu-container">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              style={{
                color: "#737272",
                backgroundColor: showLanguageMenu ? "#F2E9E4" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!showLanguageMenu) e.currentTarget.style.color = "#0D0D0D";
              }}
              onMouseLeave={(e) => {
                if (!showLanguageMenu) e.currentTarget.style.color = "#737272";
              }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase">{language}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageMenu ? "rotate-180" : ""}`} />
            </button>

            {/* Language Dropdown */}
            {showLanguageMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-32 rounded-lg shadow-lg overflow-hidden z-50"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #BFBCBA",
                }}
                onMouseLeave={() => setShowLanguageMenu(false)}
              >
                <button
                  onClick={() => {
                    setLanguage("vi");
                    setShowLanguageMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50"
                  style={{
                    color: language === "vi" ? "#D4AF37" : "#0D0D0D",
                    backgroundColor: language === "vi" ? "#F2E9E4" : "transparent",
                  }}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  onClick={() => {
                    setLanguage("en");
                    setShowLanguageMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50"
                  style={{
                    color: language === "en" ? "#D4AF37" : "#0D0D0D",
                    backgroundColor: language === "en" ? "#F2E9E4" : "transparent",
                  }}
                >
                  🇬🇧 English
                </button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button & Language */}
          <div className="md:hidden flex items-center gap-4">
            {/* Language Switcher Mobile */}
            <div className="relative language-menu-container">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1 px-2 py-1 rounded transition-colors"
                style={{ color: "#737272" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#0D0D0D"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#737272"}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>

              {/* Language Dropdown Mobile */}
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-32 rounded-lg shadow-lg overflow-hidden z-50"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #BFBCBA",
                  }}
                  onMouseLeave={() => setShowLanguageMenu(false)}
                >
                  <button
                    onClick={() => {
                      setLanguage("vi");
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm transition-colors"
                    style={{
                      color: language === "vi" ? "#D4AF37" : "#0D0D0D",
                      backgroundColor: language === "vi" ? "#F2E9E4" : "transparent",
                    }}
                  >
                    🇻🇳 Tiếng Việt
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm transition-colors"
                    style={{
                      color: language === "en" ? "#D4AF37" : "#0D0D0D",
                      backgroundColor: language === "en" ? "#F2E9E4" : "transparent",
                    }}
                  >
                    🇬🇧 English
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="transition-colors"
              style={{ color: "#737272" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#0D0D0D"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#737272"}
              aria-label="Menu"
            >
              {showMobileMenu ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{ borderColor: "#BFBCBA", backgroundColor: isScrolled ? "#FFFFFF" : "#F2E9E4" }}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium transition-colors"
                    style={{
                      color: isActive ? "#D4AF37" : "#737272",
                      backgroundColor: isActive ? "#F2E9E4" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#0D0D0D";
                        e.currentTarget.style.backgroundColor = "#F2E9E4";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#737272";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

