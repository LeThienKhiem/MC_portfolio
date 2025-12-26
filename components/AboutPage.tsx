"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4 pb-20" style={{ backgroundColor: "#F2E9E4" }}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[80vh]">
          {/* Left: Portrait Image */}
          <div className="relative order-2 md:order-1">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              {/* Decorative Sunburst/Star Icon */}
              <motion.div
                className="absolute -top-8 -left-8 z-10"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 0L44.5 30.5L75 35L44.5 39.5L40 70L35.5 39.5L5 35L35.5 30.5L40 0Z"
                    fill="#D4AF37"
                    opacity="0.3"
                  />
                  <path
                    d="M40 15L42.25 30L57 32L42.25 34L40 49L37.75 34L23 32L37.75 30L40 15Z"
                    fill="#D4AF37"
                    opacity="0.5"
                  />
                </svg>
              </motion.div>

              {/* Portrait Image */}
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/bg42.jpg"
                  alt="MC Đào Duy"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2 relative z-10">
            {/* Large Overlapping Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none"
              style={{
                color: "#0D0D0D",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              ABOUT ME
            </motion.h1>

            {/* Alternative: DAO DUY headline (commented out, can be used instead) */}
            {/* <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none"
              style={{
                color: "#0D0D0D",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              DAO DUY
            </motion.h1> */}

            {/* Role Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#403F3D",
                  border: "1px solid #BFBCBA",
                }}
              >
                Professional MC / TV Host / Event Speaker
              </span>
            </motion.div>

            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#737272", fontFamily: "var(--font-inter), sans-serif" }}
              >
                With over a decade of experience in the entertainment industry, MC Đào Duy has
                established himself as one of Vietnam&apos;s most versatile and charismatic event hosts.
                His dynamic presence and exceptional ability to connect with audiences have made him
                a sought-after professional for everything from intimate corporate gatherings to
                grand-scale televised events.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#737272", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Known for his impeccable timing, warm personality, and bilingual capabilities, Đào
                Duy brings a unique blend of professionalism and genuine enthusiasm to every stage.
                Whether hosting a luxury gala, moderating a tech conference, or leading a team
                building event, he crafts memorable experiences that resonate long after the
                curtains close.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#737272", fontFamily: "var(--font-inter), sans-serif" }}
              >
                His versatility extends beyond traditional MC work—as a TV host, he has graced
                screens across the nation, bringing stories to life with his engaging storytelling
                and natural charisma. Each event becomes a canvas where professionalism meets
                passion, creating moments that audiences remember.
              </p>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center md:justify-start gap-4"
            >
              <a
                href="#"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#737272",
                  border: "1px solid #BFBCBA",
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#737272",
                  border: "1px solid #BFBCBA",
                }}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#737272",
                  border: "1px solid #BFBCBA",
                }}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#737272",
                  border: "1px solid #BFBCBA",
                }}
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#737272",
                  border: "1px solid #BFBCBA",
                }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

