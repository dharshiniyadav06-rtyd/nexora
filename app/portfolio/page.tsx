"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { weddingStoriesData } from "@/services/mockData";
import { Camera, Heart, Share2, Eye, X, ZoomIn, Info, Sparkles, Filter } from "lucide-react";
import Link from "next/link";

interface GalleryItem {
  storyId: string;
  coupleName: string;
  location: string;
  date: string;
  id: string;
  url: string;
  category: string;
  lens: string;
  lighting: string;
  style: string;
}

export default function PortfolioPage() {
  const { favorites, toggleFavorite } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  
  // Lightbox State
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  // Extract all gallery images from stories data and attach parent story details
  const allImages: GalleryItem[] = [];
  weddingStoriesData.forEach((story) => {
    story.gallery.forEach((img) => {
      allImages.push({
        ...img,
        storyId: story.id,
        coupleName: story.coupleName,
        location: story.location,
        date: story.weddingDate
      });
    });
  });

  // Unique lists for filters
  const categories = ["All", "Wedding", "Bridal Portrait", "Baraat", "Reception", "Mehendi"];
  const styles = ["All", "Candid", "Luxury", "Editorial", "Traditional", "Documentary"];

  // Filter logic
  const filteredImages = allImages.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStyle = selectedStyle === "All" || item.style === selectedStyle;
    return matchesCat && matchesStyle;
  });

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12 font-poppins selection:bg-[#E5C687] selection:text-[#1F1713]">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3 mt-10">
        <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">
          Studio Galleries
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight text-white">
          Our Finest Memories
        </h1>
        <p className="max-w-xl text-sm text-[#F2E7D8]/80 leading-relaxed font-light font-inter">
          Discover timeless candid moments, royal silhouettes, and detailed stories beautifully captured across premium South Indian destinations.
        </p>
      </div>

      {/* Filter Trays */}
      <div className="flex flex-col gap-4 border-y border-[rgba(229,198,135,0.15)] py-6">
        {/* Category filter */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687] w-20">
            Category:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                  selectedCategory === cat
                    ? "gold-gradient border-transparent text-[#1F1713] shadow-md"
                    : "bg-[#2A1F1A] border-[rgba(229,198,135,0.2)] hover:border-[#E5C687]/50 text-[#F2E7D8]/80 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Style filter */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687] w-20">
            Style:
          </span>
          <div className="flex flex-wrap gap-2">
            {styles.map((sty) => (
              <button
                key={sty}
                onClick={() => setSelectedStyle(sty)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                  selectedStyle === sty
                    ? "gold-gradient border-transparent text-[#1F1713] shadow-md"
                    : "bg-[#2A1F1A] border-[rgba(229,198,135,0.2)] hover:border-[#E5C687]/50 text-[#F2E7D8]/80 hover:text-white"
                }`}
              >
                {sty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pinterest-inspired Grid */}
      {filteredImages.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => {
            const isFav = favorites.includes(img.id);
            return (
              <div
                key={img.id}
                className="break-inside-avoid glass-card rounded-cards overflow-hidden shadow-2xl hover:shadow-[0_8px_32px_rgba(229,198,135,0.15)] transition-all duration-300 group relative cursor-pointer border border-[rgba(229,198,135,0.1)] mb-6"
              >
                {/* Photo frame */}
                <div className="relative overflow-hidden" onClick={() => setActiveItem(img)}>
                  <img
                    src={img.url}
                    alt={img.coupleName}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1F1713]/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-[#E5C687] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300" />
                  </div>
                </div>

                {/* Info and action panel */}
                <div className="p-5 flex flex-col gap-2.5">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">
                        {img.category}
                      </span>
                      <h4 className="font-playfair text-base font-semibold text-white">
                        {img.coupleName}
                      </h4>
                    </div>

                    {/* Bookmark action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(img.id);
                      }}
                      className="text-[#F2E7D8]/60 hover:text-[#C94C4C] transition-colors p-1.5 rounded-full hover:bg-[#4B3628]/50"
                      aria-label="Save to favorites"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? "fill-[#C94C4C] text-[#C94C4C]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#F2E7D8]/70 font-light font-inter leading-relaxed flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#E5C687]" /> {img.location} ({img.style} style)
                  </p>

                  <div className="pt-3 border-t border-[rgba(229,198,135,0.15)] flex justify-between items-center text-[10px] text-[#F2E7D8]/50 font-light">
                    <span className="italic">{img.lens}</span>
                    <Link
                      href={`/stories/${img.storyId}`}
                      className="font-bold text-[#E5C687] hover:underline"
                    >
                      View Story →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center gap-4 glass-card rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl">
          <div className="bg-[#4B3628] p-4 rounded-full text-[#E5C687]">
            <X className="w-6 h-6" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-white">No Wedding Stories Found</h3>
          <p className="text-xs text-[#F2E7D8]/70 max-w-xs leading-relaxed">
            We couldn't find matches for your current category and style filters. Try resetting them or talk to our AI assistant.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedStyle("All");
            }}
            className="mt-2 gold-gradient text-[#1F1713] px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-md hover:opacity-95"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 9. LIGHTBOX DIALOG OVERLAY */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-[#1F1713]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 select-none animate-fade-in">
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:scale-105 transition-all focus:outline-none"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-6xl w-full flex flex-col md:flex-row glass-card rounded-cards overflow-hidden shadow-2xl h-[90vh] md:h-[80vh] border border-[rgba(229,198,135,0.2)]">
            {/* Left side image */}
            <div className="flex-1 bg-black flex items-center justify-center p-4 relative h-3/5 md:h-full overflow-hidden">
              <img
                src={activeItem.url}
                alt={activeItem.coupleName}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-4 left-4 bg-[#1F1713]/80 backdrop-blur-md text-[#E5C687] text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-sm select-none border border-[rgba(229,198,135,0.15)]">
                © LensCraft Studio Watermark Protected
              </div>
            </div>

            {/* Right side metadata */}
            <div className="w-full md:w-[350px] bg-[#1F1713] p-6 flex flex-col justify-between h-2/5 md:h-full overflow-y-auto border-t md:border-t-0 md:border-l border-[rgba(229,198,135,0.2)] font-poppins">
              <div className="flex flex-col gap-6">
                {/* Couple details */}
                <div className="flex flex-col gap-1 border-b border-[rgba(229,198,135,0.15)] pb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">
                    Featured Gallery Shot
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-white">
                    {activeItem.coupleName}
                  </h3>
                  <p className="text-[10px] text-[#F2E7D8]/60 font-light font-inter mt-1">
                    Wedding Date: {activeItem.date}
                  </p>
                </div>

                {/* Exif data */}
                <div className="flex flex-col gap-3.5 bg-[#4B3628]/45 border border-[rgba(229,198,135,0.15)] p-4 rounded-xl">
                  <h5 className="text-[10px] uppercase tracking-wider font-bold text-white flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#E5C687]" /> Technical Details
                  </h5>
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex justify-between border-b border-[rgba(229,198,135,0.08)] pb-1.5">
                      <span className="text-[#F2E7D8]/70">Camera & Lens</span>
                      <span className="font-medium text-white text-[10px] text-right italic max-w-[180px] truncate">{activeItem.lens}</span>
                    </div>
                    <div className="flex justify-between border-b border-[rgba(229,198,135,0.08)] pb-1.5">
                      <span className="text-[#F2E7D8]/70">Lighting Setup</span>
                      <span className="font-medium text-[10px] text-white">{activeItem.lighting}</span>
                    </div>
                    <div className="flex justify-between border-b border-[rgba(229,198,135,0.08)] pb-1.5">
                      <span className="text-[#F2E7D8]/70">Photo Category</span>
                      <span className="font-medium text-[10px] text-white">{activeItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#F2E7D8]/70">Creative Style</span>
                      <span className="font-medium text-[10px] text-white">{activeItem.style}</span>
                    </div>
                  </div>
                </div>

                {/* Description promo */}
                <div className="flex flex-col gap-2">
                  <h5 className="text-[10px] uppercase tracking-wider font-bold text-[#E5C687]">
                    Location & Venue
                  </h5>
                  <p className="text-xs text-[#F2E7D8]/80 leading-relaxed">
                    Captured at the majestic {activeItem.location}. The environment matches the client&apos;s preference for {activeItem.style.toLowerCase()} compositions.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-6 border-t border-[rgba(229,198,135,0.15)] pt-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite(activeItem.id)}
                    className="flex-1 border border-[rgba(229,198,135,0.2)] hover:bg-[#4B3628]/45 text-white py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors flex items-center justify-center gap-1.5 bg-[#1F1713]"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(activeItem.id) ? "fill-[#C94C4C] text-[#C94C4C]" : ""
                      }`}
                    />
                    {favorites.includes(activeItem.id) ? "Saved" : "Save Pin"}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex-1 gold-gradient text-[#1F1713] py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md hover:opacity-95"
                  >
                    <Share2 className="w-4 h-4 text-[#1F1713]" />
                    {shareCopied ? "Link Copied!" : "Share"}
                  </button>
                </div>

                <Link
                  href={`/stories/${activeItem.storyId}`}
                  onClick={() => setActiveItem(null)}
                  className="block text-center py-2.5 border border-[#E5C687] text-[#E5C687] hover:bg-[#E5C687]/15 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all"
                >
                  Explore Full Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End CTA Section */}
      <div className="border-t border-[rgba(229,198,135,0.15)] pt-20 mt-10 text-center flex flex-col items-center gap-5">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
          Ready to create your own beautiful wedding story?
        </h3>
        <p className="text-xs text-[#F2E7D8]/80 max-w-sm font-light leading-relaxed">
          Let&apos;s design a custom photography timeline tailored around your family rituals and budget preferences.
        </p>
        <div className="flex gap-4 mt-2">
          <Link
            href="/calendar"
            className="gold-gradient text-[#1F1713] px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold shadow-[0_4px_15px_rgba(229,198,135,0.3)] hover:opacity-95 transition-all"
          >
            Book Consultation
          </Link>
          <Link
            href="/packages"
            className="border border-[rgba(229,198,135,0.3)] hover:bg-[#4B3628]/35 text-[#E5C687] px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all"
          >
            Compare Packages
          </Link>
        </div>
      </div>

    </div>
  );
}
