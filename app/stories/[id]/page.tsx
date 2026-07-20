"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { weddingStoriesData } from "@/services/mockData";
import { Camera, Calendar, ArrowLeft, Heart, Share2, Award, Clock, Users, Check, Sparkles } from "lucide-react";

export default function StoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { favorites, toggleFavorite } = useApp();
  const [shareCopied, setShareCopied] = useState(false);

  // Find the story matching the ID
  const story = weddingStoriesData.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#1F1713] p-6 text-center text-white font-poppins">
        <h2 className="font-playfair text-2xl font-bold">Story Not Found</h2>
        <p className="text-xs text-[#F2E7D8]/60">The requested wedding story has been archived or does not exist.</p>
        <Link href="/" className="text-xs font-semibold text-[#E5C687] uppercase tracking-wider underline">
          Return Home
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(story.id);

  const handleShare = () => {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="flex flex-col bg-[#1F1713] font-poppins selection:bg-[#E5C687] selection:text-[#1F1713] pb-24 text-white">
      {/* 1. IMMERSIVE HERO BANNER */}
      <section className="h-[80vh] relative flex items-end justify-start overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${story.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1713] via-[#1F1713]/40 to-black/60" />
        
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 bg-[#1F1713]/60 backdrop-blur-md border border-[rgba(229,198,135,0.2)] text-[#E5C687] px-4 py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-[#4B3628]/80 transition-all font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Hero details Overlay */}
        <div className="relative z-10 p-8 md:p-16 max-w-4xl flex flex-col gap-4 text-white">
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#E5C687]/15 text-[#E5C687] border border-[rgba(229,198,135,0.3)] text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {story.title}
          </h1>
          <p className="text-xs md:text-sm font-light font-inter opacity-90 flex flex-wrap gap-4 items-center mt-1">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#E5C687]" /> {story.weddingDate}</span>
            <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-[#E5C687]" /> {story.venue}, {story.location}</span>
          </p>
        </div>
      </section>

      {/* 2. STORY INTRODUCTION */}
      <section className="py-20 max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[rgba(229,198,135,0.15)]">
        <div className="md:col-span-2 flex flex-col gap-5">
          <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">
            The Couple&apos;s Journey
          </span>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white">
            &ldquo;Our Love Story&rdquo;
          </h2>
          <p className="text-sm text-[#F2E7D8]/80 leading-relaxed font-light font-inter">
            {story.coupleIntroduction}
          </p>
          <div className="text-sm text-[#F2E7D8] leading-relaxed italic bg-[#2A1F1A]/55 p-5 border-l-2 border-[#E5C687] rounded-r-2xl border-y border-r border-[rgba(229,198,135,0.1)]">
            &ldquo;{story.testimonial.quote}&rdquo;
            <span className="block mt-2 font-poppins text-[10px] uppercase font-bold text-[#E5C687] not-italic">— {story.testimonial.author}</span>
          </div>
        </div>

        {/* Quick event overview facts card */}
        <div className="glass-card p-6 rounded-cards shadow-2xl h-fit flex flex-col gap-6 border border-[rgba(229,198,135,0.15)]">
          <h4 className="font-playfair text-sm font-bold text-white uppercase tracking-wider border-b border-[rgba(229,198,135,0.15)] pb-3">
            Wedding Overview
          </h4>
          <div className="flex flex-col gap-4 text-xs text-[#F2E7D8]/80">
            <div className="flex items-center justify-between">
              <span className="opacity-70">Photography Style</span>
              <span className="font-semibold text-white">{story.style}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">Coverage Period</span>
              <span className="font-semibold text-white">{story.packageUsed.coverage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-70">Assigned Package</span>
              <span className="font-semibold text-[#E5C687]">{story.packageUsed.name}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => toggleFavorite(story.id)}
              className="flex-grow border border-[rgba(229,198,135,0.2)] hover:bg-[#4B3628]/45 text-[#E5C687] py-2.5 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 bg-[#1F1713]"
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-[#C94C4C] text-[#C94C4C]" : ""}`} />
              {isFav ? "Saved" : "Save Story"}
            </button>
            <button
              onClick={handleShare}
              className="flex-grow gold-gradient text-[#1F1713] py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md hover:opacity-95"
            >
              <Share2 className="w-3.5 h-3.5 text-[#1F1713]" />
              {shareCopied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </section>

      {/* 3. VERTICAL TIMELINE NARRATIVE */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-12 w-full">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">Editorial Narrative</span>
          <h2 className="font-playfair text-3xl font-bold text-white">Interactive Event Timeline</h2>
          <p className="text-xs text-[#F2E7D8]/60 max-w-sm mt-1 font-light">
            Follow the chronological visual walkthrough of the ceremony&apos;s key milestones.
          </p>
        </div>

        <div className="relative border-l border-[rgba(229,198,135,0.15)] ml-4 md:ml-32 pl-8 md:pl-12 flex flex-col gap-16 py-8">
          {story.timeline.map((event, index) => (
            <div key={index} className="relative flex flex-col md:flex-row gap-8 items-start group">
              
              {/* Chronological Time marker on the left (Desktop) */}
              <div className="hidden md:block absolute -left-44 text-right w-32 font-playfair text-lg font-bold text-[#E5C687] mt-1">
                {event.time}
              </div>

              {/* Central vertical track dot */}
              <div className="absolute -left-12.5 md:-left-16.5 top-2.5 w-8 h-8 rounded-full border-4 border-[#1F1713] bg-[#E5C687] shadow-lg flex items-center justify-center text-[#1F1713] z-10 transition-transform group-hover:scale-110">
                <span className="text-[10px] font-extrabold">{index + 1}</span>
              </div>

              {/* Card layout */}
              <div className="flex-1 glass-card border border-[rgba(229,198,135,0.1)] rounded-cards overflow-hidden shadow-2xl group-hover:shadow-[0_8px_32px_rgba(229,198,135,0.15)] transition-all duration-300 flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-48 shrink-0 relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-widest text-[#E5C687]">
                    {event.time}
                  </span>
                  <h3 className="font-playfair text-base font-bold text-white group-hover:text-[#E5C687] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light font-inter">
                    {event.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. BEHIND THE SCENES */}
      <section className="py-20 bg-[#2A1F1A]/40 border-y border-[rgba(229,198,135,0.15)]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">Authentic Credibility</span>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white">Behind The Scenes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {story.behindTheScenes.map((bts, index) => (
              <div key={index} className="flex flex-col gap-3 group" style={{ contentVisibility: 'auto' }}>
                <div className="h-64 rounded-images overflow-hidden border border-[rgba(229,198,135,0.1)] shadow-2xl relative">
                  <img
                    src={bts.image}
                    alt={bts.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <span className="font-poppins text-xs font-semibold text-white group-hover:text-[#E5C687] transition-colors tracking-wide">
                  {bts.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VENDORS PARTNERS */}
      <section className="py-20 max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">Vendor Networks</span>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white">Associated Partners</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card border border-[rgba(229,198,135,0.1)] p-5 rounded-cards text-center flex flex-col gap-1.5 shadow-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2E7D8]/60">Venue</span>
            <p className="font-playfair text-sm font-semibold text-white leading-relaxed">{story.vendors.venue}</p>
          </div>
          <div className="glass-card border border-[rgba(229,198,135,0.1)] p-5 rounded-cards text-center flex flex-col gap-1.5 shadow-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2E7D8]/60">Decoration</span>
            <p className="font-playfair text-sm font-semibold text-white leading-relaxed">{story.vendors.decorator}</p>
          </div>
          <div className="glass-card border border-[rgba(229,198,135,0.1)] p-5 rounded-cards text-center flex flex-col gap-1.5 shadow-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2E7D8]/60">Makeup Artist</span>
            <p className="font-playfair text-sm font-semibold text-white leading-relaxed">{story.vendors.makeup}</p>
          </div>
          <div className="glass-card border border-[rgba(229,198,135,0.1)] p-5 rounded-cards text-center flex flex-col gap-1.5 shadow-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2E7D8]/60">Event Planner</span>
            <p className="font-playfair text-sm font-semibold text-white leading-relaxed">{story.vendors.planner}</p>
          </div>
        </div>
      </section>

      {/* 6. CONVERSION CTA SECTION */}
      <section className="mt-16 mx-4 md:mx-12">
        <div className="max-w-4xl mx-auto glass-card border border-[rgba(229,198,135,0.2)] p-8 md:p-12 rounded-cards shadow-2xl text-center flex flex-col items-center gap-6">
          <span className="bg-[#E5C687]/15 border border-[rgba(229,198,135,0.3)] text-[#E5C687] text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded">
            Book Similar Style
          </span>
          <h2 className="font-playfair text-3xl font-bold text-white">Let&apos;s Tell Your Story Next</h2>
          <p className="text-xs text-[#F2E7D8]/80 max-w-md leading-relaxed font-light">
            Loved the {story.style.toLowerCase()} approach and cinematic coverage for {story.coupleName}? Lock in a consultation slot to outline your customized plan today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
            <Link
              href="/calendar"
              className="gold-gradient text-[#1F1713] px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:opacity-95"
            >
              Book Consultation
            </Link>
            <Link
              href="/packages"
              className="border border-[rgba(229,198,135,0.3)] hover:bg-[#4B3628]/35 text-[#E5C687] px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Compare Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
