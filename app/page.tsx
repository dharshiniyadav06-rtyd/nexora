"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { weddingStoriesData } from "@/services/mockData";
import { Camera, Calendar, ArrowRight, Sparkles, Star, Check, Users, ShieldCheck, Trophy, Sparkle } from "lucide-react";

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);

  // Parallax Hero Effect
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Wedding", image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=400" },
    { name: "Engagement", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400" },
    { name: "Reception", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" },
    { name: "Temple Wedding", image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=400" },
    { name: "Mehendi", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400" },
    { name: "Destination Wedding", image: "https://images.unsplash.com/photo-1544078751-58fed2b32c7a?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div className="flex flex-col bg-primary-bg overflow-hidden font-poppins selection:bg-champagne selection:text-[#1F1713]">
      
      {/* 1. HERO SECTION */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Parallax Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-75"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1600')`,
            transform: `translateY(${offsetY * 0.4}px) scale(1.05)`,
          }}
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-[#1F1713]/40 to-black/70" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl flex flex-col items-center gap-6">
          <span className="font-poppins text-xs tracking-[0.3em] text-[#E5C687] uppercase font-bold flex items-center gap-1.5 animate-pulse">
            <Sparkle className="w-3.5 h-3.5 fill-[#E5C687]" /> Premium South Indian Wedding Photography
          </span>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Capturing India's Most <br/>
            <span className="font-cormorant italic font-light text-[#E5C687]">Beautiful Love Stories</span>
          </h1>
          <p className="max-w-xl text-sm md:text-base leading-relaxed text-[#F2E7D8]/90 font-light font-inter tracking-wide">
            Timeless photography crafted with elegance, emotion, and luxury editorial authenticity. Relive your once-in-a-lifetime moments forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            <Link
              href="/calendar"
              className="gold-gradient hover:opacity-95 text-[#1F1713] px-8 py-4 rounded-buttons text-xs uppercase tracking-widest font-bold shadow-[0_4px_20px_rgba(229,198,135,0.4)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Consultation
            </Link>
            <Link
              href="/portfolio"
              className="border border-[#E5C687]/40 bg-[#4B3628]/35 hover:bg-[#4B3628]/60 backdrop-blur-md text-[#E5C687] px-8 py-4 rounded-buttons text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Explore Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-[10px] tracking-widest uppercase">
          <span className="w-[1px] h-10 bg-white/25 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-[#E5C687] animate-bounce" />
          </span>
          Scroll Down
        </div>
      </section>

      {/* 2. FEATURED PORTFOLIO PREVIEW */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">Curated Portfolios</span>
            <h2 className="font-playfair text-3xl font-bold text-white">Featured Portfolio Categories</h2>
          </div>
          <Link href="/portfolio" className="text-xs font-semibold uppercase tracking-widest text-[#E5C687] hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
            Explore Full Galleries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link key={i} href="/portfolio" className="group flex flex-col gap-3 items-center text-center">
              <div className="w-full aspect-square rounded-full overflow-hidden border border-[rgba(229,198,135,0.15)] shadow-xl group-hover:border-[#E5C687] transition-all duration-300 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-[#1F1713]/40 transition-colors" />
              </div>
              <span className="font-playfair text-xs tracking-wider font-semibold text-[#F2E7D8] group-hover:text-[#E5C687] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED WEDDING COLLECTION */}
      <section className="py-20 bg-[#2A1F1A]/30 border-y border-[rgba(229,198,135,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">Selected Memories</span>
              <h2 className="font-playfair text-3xl font-bold text-white">Featured Wedding Collection</h2>
            </div>
            <Link href="/portfolio" className="text-xs font-semibold uppercase tracking-widest text-[#E5C687] hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
              Explore All Stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weddingStoriesData.map((story) => (
              <div key={story.id} className="glass-card rounded-cards overflow-hidden shadow-2xl group hover:-translate-y-1 transition-all duration-300">
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-[#1F1713]/80 backdrop-blur-md text-[#E5C687] px-3 py-1 rounded-buttons text-[10px] uppercase font-semibold tracking-wider border border-[rgba(229,198,135,0.2)]">
                    {story.style}
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <span className="text-[10px] uppercase font-medium text-[#F2E7D8]/60 tracking-widest flex items-center gap-1">
                    <Camera className="w-3 h-3 text-[#E5C687]" /> {story.location}, {story.state}
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-white group-hover:text-[#E5C687] transition-colors">
                    {story.coupleName}
                  </h3>
                  <p className="text-xs text-[#F2E7D8]/70 leading-relaxed line-clamp-2 font-light">
                    {story.coupleIntroduction}
                  </p>
                  <div className="pt-4 border-t border-[rgba(229,198,135,0.15)] flex justify-between items-center">
                    <Link
                      href={`/stories/${story.id}`}
                      className="text-xs font-semibold text-[#E5C687] hover:underline flex items-center gap-1"
                    >
                      View Story Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PACKAGE PREVIEW (SHORT PREVIEW) */}
      <section className="py-20 max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6 text-center items-center">
        <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">Curated Tiers</span>
        <h2 className="font-playfair text-3xl font-bold text-white">Photography Packages</h2>
        <p className="text-sm text-[#F2E7D8]/80 max-w-2xl leading-relaxed font-light font-inter">
          We offer four thoughtfully designed luxury packages to match your celebration scale: **Silver**, **Gold**, **Platinum**, and **Signature**. Tiers start from ₹1,20,000 and include high-resolution digital captures, professional editing, custom printing, and cinematic wedding film options.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <Link
            href="/packages"
            className="gold-gradient hover:opacity-95 text-[#1F1713] px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-[0_4px_15px_rgba(229,198,135,0.3)] transition-all flex items-center justify-center gap-1.5"
          >
            Explore Packages <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/packages#calculator"
            className="border border-[#E5C687]/40 bg-[#4B3628]/30 hover:bg-[#4B3628]/60 text-[#E5C687] px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* 5. WHY CHOOSE LENSCRAFT */}
      <section className="py-20 bg-[#2A1F1A]/90 border-y border-[rgba(229,198,135,0.15)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">The LensCraft Difference</span>
            <h2 className="font-playfair text-3xl font-bold text-white leading-tight">
              A Premium Visual Storytelling Experience
            </h2>
            <p className="text-sm text-[#F2E7D8]/80 leading-relaxed font-light font-inter">
              We do not capture plain, posed templates. We craft cinematic editorials reflecting authentic intimacy, heritage architecture, and the vibrant colors of Indian celebrations.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-cards shadow-xl flex gap-4 border border-[rgba(229,198,135,0.15)]">
              <div className="bg-[#E5C687]/10 p-3 h-fit rounded-full text-[#E5C687]">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-playfair text-base font-bold text-white">Award-Winning Crew</h4>
                <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">
                  Top creative candid minds using elite lens setups to record emotional silhouettes.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-cards shadow-xl flex gap-4 border border-[rgba(229,198,135,0.15)]">
              <div className="bg-[#E5C687]/10 p-3 h-fit rounded-full text-[#E5C687]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-playfair text-base font-bold text-white">Premium Editorial Styling</h4>
                <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">
                  High-contrast color grading making every wedding photo feel like a luxury magazine page.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-cards shadow-xl flex gap-4 border border-[rgba(229,198,135,0.15)]">
              <div className="bg-[#E5C687]/10 p-3 h-fit rounded-full text-[#E5C687]">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-playfair text-base font-bold text-white">Dedicated Client Support</h4>
                <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">
                  Personalized schedule alignment, site walkthroughs, and custom parent album selections.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-cards shadow-xl flex gap-4 border border-[rgba(229,198,135,0.15)]">
              <div className="bg-[#E5C687]/10 p-3 h-fit rounded-full text-[#E5C687]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-playfair text-base font-bold text-white">Watermark & Secure Delivery</h4>
                <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">
                  Secure cloud galleries, parent duplicate copies, and express high-speed deliveries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOM TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12 w-full">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">Couples Praise</span>
          <h2 className="font-playfair text-3xl font-bold text-white">Reviews From Our Couples</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-cards shadow-2xl flex flex-col gap-6 justify-between border border-[rgba(229,198,135,0.1)]">
            <div className="flex flex-col gap-4">
              <div className="flex text-[#E5C687] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5C687] text-[#E5C687]" />
                ))}
              </div>
              <p className="font-cormorant italic text-lg leading-relaxed text-[#F2E7D8]">
                &ldquo;They didn&apos;t just take pictures; they captured our hearts. Every time we flip through the album, we relive the royal magic of Udaipur all over again. The staff was incredibly patient.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-[rgba(229,198,135,0.15)] pt-4">
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=100"
                alt="Ananya Sharma"
                className="w-10 h-10 object-cover rounded-full border border-[rgba(229,198,135,0.2)]"
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Ananya Sharma</span>
                <span className="text-[10px] text-[#F2E7D8]/60 uppercase tracking-wider">Udaipur Wedding</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-cards shadow-2xl flex flex-col gap-6 justify-between border border-[rgba(229,198,135,0.1)]">
            <div className="flex flex-col gap-4">
              <div className="flex text-[#E5C687] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5C687] text-[#E5C687]" />
                ))}
              </div>
              <p className="font-cormorant italic text-lg leading-relaxed text-[#F2E7D8]">
                &ldquo;They respected our sacred space, blended in with the family, and captured the true essence of our tradition without any artificial setup. The candid drone shots of the temple are fantastic.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-[rgba(229,198,135,0.15)] pt-4">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=100"
                alt="Meera Iyer"
                className="w-10 h-10 object-cover rounded-full border border-[rgba(229,198,135,0.2)]"
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Meera Iyer</span>
                <span className="text-[10px] text-[#F2E7D8]/60 uppercase tracking-wider">Tirupati Temple Wedding</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-cards shadow-2xl flex flex-col gap-6 justify-between border border-[rgba(229,198,135,0.1)]">
            <div className="flex flex-col gap-4">
              <div className="flex text-[#E5C687] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5C687] text-[#E5C687]" />
                ))}
              </div>
              <p className="font-cormorant italic text-lg leading-relaxed text-[#F2E7D8]">
                &ldquo;Our photos look like something out of a luxury magazine. The candid expressions caught in the beach breeze are priceless. I highly recommend their custom parent albums.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-[rgba(229,198,135,0.15)] pt-4">
              <img
                src="https://images.unsplash.com/photo-1544078751-58fed2b32c7a?auto=format&fit=crop&q=80&w=100"
                alt="Riya Sen"
                className="w-10 h-10 object-cover rounded-full border border-[rgba(229,198,135,0.2)]"
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Riya Sen</span>
                <span className="text-[10px] text-[#F2E7D8]/60 uppercase tracking-wider">Goa Beach Wedding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AI ASSISTANT CALL-TO-ACTION */}
      <section className="relative py-20 overflow-hidden border-t border-[rgba(229,198,135,0.15)]">
        {/* Luxury dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A1F1A] via-[#1F1713] to-[#4B3628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E5C687]/15 via-transparent to-transparent opacity-70 animate-pulse-glow" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center gap-5 text-center">
          <div className="bg-[#E5C687]/10 p-3.5 rounded-full mb-1 border border-[rgba(229,198,135,0.2)] animate-bounce">
            <Sparkles className="w-5 h-5 text-[#E5C687] fill-[#E5C687]" />
          </div>
          <h2 className="font-playfair text-3xl font-bold tracking-wide text-white">
            Need Help Choosing The Perfect Package?
          </h2>
          <p className="text-sm font-light leading-relaxed max-w-xl text-[#F2E7D8]/90 font-inter">
            Calculate your customized estimated budget instantly, look up real-time studio slots, or speak to our AI Consultant for a tailored response.
          </p>
          <div className="mt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/packages"
              className="gold-gradient hover:opacity-95 text-[#1F1713] px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-[0_4px_15px_rgba(229,198,135,0.4)]"
            >
              Explore Packages & Calculator
            </Link>
            <Link
              href="/calendar"
              className="border border-[#E5C687]/40 bg-[#4B3628]/30 hover:bg-[#4B3628]/60 text-[#E5C687] px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
