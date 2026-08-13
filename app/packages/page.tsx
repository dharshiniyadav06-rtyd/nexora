"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { packagesData, PackageTier } from "@/services/mockData";
import { Check, X, Sparkles, Sliders, ChevronDown, ChevronUp, Bot, HelpCircle, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function PackagesPage() {
  const router = useRouter();
  const { toggleFavorite } = useApp();
  
  const [packages, setPackages] = useState<PackageTier[]>(packagesData);
  
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await fetch('/api/packages');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mappedPackages: PackageTier[] = data.map((pkg: any) => {
              let features: string[] = [];
              try {
                features = JSON.parse(pkg.included_services || '[]');
              } catch (e) {
                console.error('Failed to parse package features JSON:', e);
              }
              return {
                id: pkg.id,
                name: pkg.name,
                description: pkg.description,
                price: pkg.price,
                coverage: pkg.duration,
                photographers: pkg.photographer_count === 2 ? "1 Traditional + 1 Candid Photographer" :
                               pkg.photographer_count === 4 ? "2 Candid + 1 Traditional Photographer + 1 Videographer" :
                               pkg.photographer_count === 6 ? "2 Candid + 2 Traditional Photographers + 2 Cinematographers" :
                               "Chief Photographer + 3 Candid + 2 Traditional + 3 Cinematographers",
                features: features,
                recommended: pkg.id === 'pkg-platinum',
                deliveryTime: pkg.id === 'pkg-silver' ? '45 Days' : pkg.id === 'pkg-gold' ? '30 Days' : pkg.id === 'pkg-platinum' ? '20 Days' : '15 Days'
              };
            });
            setPackages(mappedPackages);
          }
        }
      } catch (err) {
        console.error('Failed to load packages:', err);
      }
    };
    loadPackages();
  }, []);

  // Package Compare Accordion Toggle
  const [showMatrix, setShowMatrix] = useState(false);

  // Simple Budget Calculator State
  const [hours, setHours] = useState(12);
  const [photographersCount, setPhotographersCount] = useState(2);
  const [videographersCount, setVideographersCount] = useState(1);
  const [albumType, setAlbumType] = useState("Linen"); // Linen, Leather, GlassBox, None
  const [travelDistance, setTravelDistance] = useState(0); // km
  const [accommodationRooms, setAccommodationRooms] = useState(0);
  const [droneNeeded, setDroneNeeded] = useState(false);
  const [preWeddingNeeded, setPreWeddingNeeded] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);

  // Computed Estimate Price
  const [breakdown, setBreakdown] = useState({
    photography: 0,
    videography: 0,
    drone: 0,
    albums: 0,
    travel: 0,
    accommodation: 0,
    addons: 0,
    subtotal: 0,
    taxes: 0,
    total: 0
  });

  const [matchedPackage, setMatchedPackage] = useState({
    name: "Gold",
    price: "₹2,20,000",
    confidence: 94,
    explanation: ""
  });

  const [estimateSaved, setEstimateSaved] = useState(false);

  // Fast and straightforward budget live calculation
  useEffect(() => {
    // 1. Base Photography calculation
    const photographyBase = hours * 6000 + (photographersCount - 1) * hours * 4000;
    
    // 2. Videography base
    const videographyBase = videographersCount * hours * 5000;

    // 3. Drone flat
    const droneCost = droneNeeded ? (hours > 8 ? 25000 : 15000) : 0;

    // 4. Album selection
    let albumCost = 0;
    if (albumType === "Linen") albumCost = 15000;
    if (albumType === "Leather") albumCost = 25000;
    if (albumType === "GlassBox") albumCost = 40000;

    // 5. Travel
    const travelCost = travelDistance * 30;

    // 6. Hotel rooms
    const hotelCost = accommodationRooms * 5000;

    // 7. Add-ons
    const preWeddingCost = preWeddingNeeded ? 25000 : 0;
    const expressCost = expressDelivery ? 15000 : 0;
    const addonsCost = preWeddingCost + expressCost;

    const subtotal = photographyBase + videographyBase + droneCost + albumCost + travelCost + hotelCost + addonsCost;
    const taxes = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + taxes;

    setBreakdown({
      photography: photographyBase,
      videography: videographyBase,
      drone: droneCost,
      albums: albumCost,
      travel: travelCost,
      accommodation: hotelCost,
      addons: addonsCost,
      subtotal,
      taxes,
      total
    });

    // Smart matched package recommendation logic
    let pkgName = "Gold";
    let confidence = 90;
    let explanation = "";

    if (total < 160000) {
      pkgName = "Silver";
      confidence = 92;
      explanation = "Silver is our curated tier for intimate celebrations, matching your requirements perfectly.";
    } else if (total >= 160000 && total < 300000) {
      pkgName = "Gold";
      confidence = 95;
      explanation = "Gold tier represents the ideal balance of extensive full-day candid coverage and cinematography.";
    } else if (total >= 300000 && total < 450000) {
      pkgName = "Platinum";
      confidence = 97;
      explanation = "Platinum package covers your multi-day traditional rituals, parent albums, and 4K aerial drone shots.";
    } else {
      pkgName = "Signature";
      confidence = 99;
      explanation = "Signature tier offers chief-photographer curation, custom glass packaging, and elite visual coverage.";
    }

    setMatchedPackage({
      name: pkgName,
      price: packages.find((p) => p.name === pkgName)?.price || "₹2,20,000",
      confidence,
      explanation
    });
  }, [
    hours,
    photographersCount,
    videographersCount,
    albumType,
    travelDistance,
    accommodationRooms,
    droneNeeded,
    preWeddingNeeded,
    expressDelivery
  ]);

  const handleSaveEstimate = () => {
    setEstimateSaved(true);
    setTimeout(() => setEstimateSaved(false), 3000);
  };

  const compareParameters = [
    { label: "Pricing Index", silver: "₹1,20,000", gold: "₹2,20,000", platinum: "₹3,50,000", signature: "₹5,00,000" },
    { label: "Coverage Hours", silver: "6 Hours", gold: "12 Hours", platinum: "Multi-Day (18 Hours)", signature: "Full Wedding Week" },
    { label: "Candid Shooters", silver: "1 Candid", gold: "2 Candid", platinum: "2 Candid + Lead", signature: "Chief + 3 Candid" },
    { label: "Traditional Shooters", silver: "1 Traditional", gold: "1 Traditional", platinum: "2 Traditional", signature: "2 Traditional" },
    { label: "Cinematography Film", silver: "No", gold: "Yes (3-5 mins)", platinum: "Yes (10-15 mins)", signature: "Yes (25-30 mins feature)" },
    { label: "Drone Aerials", silver: "No", gold: "Yes (Venue)", platinum: "Yes (Full 4K)", signature: "Yes (Curated reels)" },
    { label: "Live Streaming", silver: "No", gold: "Yes (1 Link)", platinum: "Yes (Multi-cam)", signature: "Yes (HD Satellite)" },
    { label: "Handcrafted Albums", silver: "1 Album (30 Pages)", gold: "1 Linen (40 Pages)", platinum: "2 Glass + 2 Minis", signature: "Bespoke Glass Box + parent copies" },
    { label: "Pre-Wedding Shoot", silver: "No", gold: "Add-on option", platinum: "Yes (Included)", signature: "Yes (Any South Indian Location)" }
  ];

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12 font-poppins selection:bg-[#E5C687] selection:text-[#1F1713]">
      
      {/* Header */}
      <div className="flex flex-col gap-3 mt-10">
        <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">
          Studio Pricing & Tiers
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight text-white">
          Choose the Perfect Photography Experience
        </h1>
        <p className="max-w-xl text-sm text-[#F2E7D8]/80 leading-relaxed font-light font-inter">
          Transparent, premium pricing tailored around your family requirements. Compare our tiers side-by-side or calculate your custom quote below.
        </p>
      </div>

      {/* STANDARD PACKAGE PRICE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`glass-card rounded-cards p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 border ${
              pkg.recommended
                ? "border-[#E5C687] shadow-[0_8px_32px_rgba(229,198,135,0.15)] scale-102 relative"
                : "border-[rgba(229,198,135,0.1)] hover:border-[#E5C687]/30"
            }`}
          >
            {pkg.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#E5C687] text-[#1F1713] px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3 fill-[#1F1713]" /> Recommended
              </span>
            )}
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2E7D8]/60">
                  {pkg.name} Tier
                </span>
                <span className="text-[10px] text-[#E5C687] italic">{pkg.deliveryTime} delivery</span>
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-3xl font-bold text-white">{pkg.price}</span>
                <span className="text-[10px] text-[#F2E7D8]/50">Flat Base Fee</span>
              </div>
              <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light min-h-[40px] border-b border-[rgba(229,198,135,0.15)] pb-3">
                {pkg.description}
              </p>
              
              <ul className="flex flex-col gap-2.5 text-xs text-white mt-1">
                <li className="font-semibold flex items-center gap-2 text-[#E5C687]">
                  <Check className="w-3.5 h-3.5 text-[#E5C687] shrink-0" />
                  <span>{pkg.coverage} duration</span>
                </li>
                <li className="font-light text-[#F2E7D8]/70 leading-relaxed border-b border-[rgba(229,198,135,0.1)] pb-2 italic">
                  {pkg.photographers}
                </li>
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="font-light text-[#F2E7D8]/75 flex items-start gap-2 leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#E5C687] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/calendar"
                className={`block text-center py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all ${
                  pkg.recommended
                    ? "gold-gradient text-[#1F1713] hover:opacity-95 shadow-md font-bold"
                    : "border border-[rgba(229,198,135,0.3)] hover:bg-[#4B3628]/45 text-[#E5C687]"
                }`}
              >
                Request Booking
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* MATRIX COMPARE SECTION */}
      <section className="glass-card p-6 md:p-8 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl">
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
        >
          <div className="flex flex-col gap-1">
            <h3 className="font-playfair text-xl font-bold text-white">
              Full Package Comparison Matrix
            </h3>
            <p className="text-xs text-[#F2E7D8]/60 font-light">
              Compare photographers, deliverables, and coverage limitations side-by-side.
            </p>
          </div>
          {showMatrix ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
        </button>

        {showMatrix && (
          <div className="mt-8 overflow-x-auto border border-[rgba(229,198,135,0.15)] rounded-xl select-none animate-scale-in bg-[#1F1713]/60">
            <table className="w-full text-left border-collapse text-xs font-poppins min-w-[700px]">
              <thead>
                <tr className="bg-[#2A1F1A]/70 border-b border-[rgba(229,198,135,0.15)] text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">
                  <th className="p-4">Parameters</th>
                  <th className="p-4 text-center">Silver</th>
                  <th className="p-4 text-center">Gold</th>
                  <th className="p-4 text-center">Platinum</th>
                  <th className="p-4 text-center">Signature</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(229,198,135,0.1)] text-[#F2E7D8]/80">
                {compareParameters.map((param, index) => (
                  <tr key={index} className="hover:bg-[#4B3628]/25 transition-colors">
                    <td className="p-4 font-semibold text-white">{param.label}</td>
                    <td className="p-4 text-center">{param.silver}</td>
                    <td className="p-4 text-center">{param.gold}</td>
                    <td className="p-4 text-center font-semibold text-[#E5C687]">{param.platinum}</td>
                    <td className="p-4 text-center">{param.signature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* MERGED INTERACTIVE BUDGET CALCULATOR SECTION */}
      <section id="calculator" className="grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-24">
        {/* Left Side: Form Inputs */}
        <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-cards flex flex-col gap-6 border border-[rgba(229,198,135,0.15)] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-[rgba(229,198,135,0.15)] pb-3">
            <Sliders className="w-5 h-5 text-[#E5C687]" />
            <h3 className="font-playfair text-xl font-bold text-white">Interactive Budget Calculator</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Coverage Hours */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase font-bold text-[#E5C687] tracking-wider">
                Coverage Duration: <span className="text-white font-semibold">{hours} Hours</span>
              </label>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-[#E5C687] cursor-pointer"
              />
            </div>

            {/* Print Album Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-[#F2E7D8]/70">Print Album Selection</label>
              <select
                value={albumType}
                onChange={(e) => setAlbumType(e.target.value)}
                className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all cursor-pointer"
              >
                <option value="None">No Hardcopy Album (Digital Only)</option>
                <option value="Linen">Standard Linen Album (30 Pages) - ₹15k</option>
                <option value="Leather">Premium Leatherette Album (40 Pages) - ₹25k</option>
                <option value="GlassBox">Exclusive Luxury Glass Box Set (40 Pages) - ₹40k</option>
              </select>
            </div>

            {/* Photographers count */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-[#F2E7D8]/70">Photographers Team</label>
              <select
                value={photographersCount}
                onChange={(e) => setPhotographersCount(Number(e.target.value))}
                className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all cursor-pointer"
              >
                <option value="1">1 Lead Photographer</option>
                <option value="2">2 Photographers (1 Lead + 1 Candid)</option>
                <option value="3">3 Photographers (2 Candid + 1 Trad)</option>
                <option value="4">4 Photographers (Chief + 3 Candid)</option>
              </select>
            </div>

            {/* Videographer count */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-[#F2E7D8]/70">Videographers Team</label>
              <select
                value={videographersCount}
                onChange={(e) => setVideographersCount(Number(e.target.value))}
                className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all cursor-pointer"
              >
                <option value="0">No Video Coverage</option>
                <option value="1">1 Cinematographer (Highlights)</option>
                <option value="2">2 Cinematographers (Teaser + Film)</option>
                <option value="3">3 Videographers (HD Multi-cam)</option>
              </select>
            </div>

            {/* Outstation travel */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase font-bold text-[#E5C687] tracking-wider">
                Travel Distance (Team Transit): <span className="text-white font-semibold">{travelDistance} km</span>
              </label>
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={travelDistance}
                onChange={(e) => setTravelDistance(Number(e.target.value))}
                className="w-full accent-[#E5C687] cursor-pointer"
              />
            </div>

            {/* Hotel accommodation */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase font-bold text-[#E5C687] tracking-wider">
                Hotel Rooms (for outstation staff): <span className="text-white font-semibold">{accommodationRooms} Rooms</span>
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={accommodationRooms}
                onChange={(e) => setAccommodationRooms(Number(e.target.value))}
                className="w-full accent-[#E5C687] cursor-pointer"
              />
            </div>

            {/* Checkbox additions */}
            <div className="flex flex-col gap-3 justify-center border-t border-[rgba(229,198,135,0.15)] pt-4 col-span-1 sm:col-span-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687] mb-1">
                Add-on Services
              </span>
              <div className="flex flex-wrap gap-6 text-[#F2E7D8]/90">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={droneNeeded}
                    onChange={(e) => setDroneNeeded(e.target.checked)}
                    className="w-4 h-4 rounded border-[rgba(229,198,135,0.3)] bg-[#1F1713] accent-[#E5C687] cursor-pointer"
                  />
                  Drone Aerial Coverage (+₹15K)
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={preWeddingNeeded}
                    onChange={(e) => setPreWeddingNeeded(e.target.checked)}
                    className="w-4 h-4 rounded border-[rgba(229,198,135,0.3)] bg-[#1F1713] accent-[#E5C687] cursor-pointer"
                  />
                  Pre-Wedding Couple Shoot (+₹25K)
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={expressDelivery}
                    onChange={(e) => setExpressDelivery(e.target.checked)}
                    className="w-4 h-4 rounded border-[rgba(229,198,135,0.3)] bg-[#1F1713] accent-[#E5C687] cursor-pointer"
                  />
                  Express 10-Day Delivery (+₹15K)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Recommendation & Invoice Summary */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 rounded-cards shadow-2xl flex flex-col justify-between gap-6 relative overflow-hidden border border-[#E5C687]/30 min-h-[350px]">
            {/* Luxury background layout */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4B3628] via-[#2A1F1A] to-[#1F1713] opacity-90 z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#E5C687]/15 via-transparent to-transparent opacity-85 z-0" />
            
            <div className="relative z-10 flex flex-col gap-6">
              {/* Live Price Estimation */}
              <div className="flex flex-col gap-1 border-b border-[rgba(229,198,135,0.15)] pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">
                  Estimated Price Summary
                </span>
                <span className="font-playfair text-4xl font-extrabold tracking-wide text-white">
                  ₹{breakdown.total.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#F2E7D8]/60">Including 18% GST (₹{breakdown.taxes.toLocaleString()})</span>
              </div>

              {/* Matched Package Recommendation result */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] text-[#F2E7D8]/70 uppercase font-bold tracking-wider">
                  <span>Matched Package suggestion</span>
                  <span className="text-[#4F7C57] font-semibold">{matchedPackage.confidence}% Match</span>
                </div>
                <div>
                  <h4 className="font-playfair text-2xl font-bold text-white">{matchedPackage.name} Tier</h4>
                  <p className="text-[10px] text-[#F2E7D8]/60 mt-0.5">{matchedPackage.price} Package starting base fee</p>
                </div>
                <p className="text-xs text-[#F2E7D8]/80 leading-relaxed font-light mt-1">
                  {matchedPackage.explanation}
                </p>
              </div>

              {/* Itemized invoice list preview details */}
              <div className="flex flex-col gap-2 text-[11px] font-light border-t border-[rgba(229,198,135,0.15)] pt-4 font-inter text-[#F2E7D8]/90">
                <div className="flex justify-between">
                  <span className="opacity-70">Team & Coverage Fee</span>
                  <span className="font-semibold text-white">₹{(breakdown.photography + breakdown.videography).toLocaleString()}</span>
                </div>
                {breakdown.albums > 0 && (
                  <div className="flex justify-between">
                    <span className="opacity-70">Hardcopy Print Album</span>
                    <span className="font-semibold text-white">₹{breakdown.albums.toLocaleString()}</span>
                  </div>
                )}
                {breakdown.travel + breakdown.accommodation > 0 && (
                  <div className="flex justify-between">
                    <span className="opacity-70">Transit & Rooms Expense</span>
                    <span className="font-semibold text-white">₹{(breakdown.travel + breakdown.accommodation).toLocaleString()}</span>
                  </div>
                )}
                {breakdown.addons > 0 && (
                  <div className="flex justify-between">
                    <span className="opacity-70">Requested Add-ons</span>
                    <span className="font-semibold text-[#E5C687]">₹{breakdown.addons.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 border-t border-[rgba(229,198,135,0.15)] pt-4">
              <button
                type="button"
                onClick={handleSaveEstimate}
                className="w-full gold-gradient text-[#1F1713] py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold hover:opacity-95 shadow-[0_4px_15px_rgba(229,198,135,0.3)] transition-all flex items-center justify-center gap-1.5"
              >
                {estimateSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Quote Saved
                  </>
                ) : (
                  "Get a Quote"
                )}
              </button>
              <Link
                href="/calendar"
                className="w-full text-center border border-[#E5C687]/40 hover:bg-[#E5C687]/15 text-[#E5C687] py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add-On Services list */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-playfair text-xl font-bold text-white">Custom Add-on Services</h3>
          <p className="text-xs text-[#F2E7D8]/60 font-light">Tailor your base package with our custom event additions.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-5 rounded-cards flex flex-col gap-2 shadow-2xl border border-[rgba(229,198,135,0.1)] hover:border-[#E5C687]/30 transition-all duration-300">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">Pre-Wedding Shoot</span>
            <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">3-4 hours outdoor portrait shoot at local venues.</p>
            <span className="font-playfair text-sm font-semibold text-white mt-2">₹25,000</span>
          </div>
          <div className="glass-card p-5 rounded-cards flex flex-col gap-2 shadow-2xl border border-[rgba(229,198,135,0.1)] hover:border-[#E5C687]/30 transition-all duration-300">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">Express delivery</span>
            <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">Receive all fully edited images within 7-10 days.</p>
            <span className="font-playfair text-sm font-semibold text-white mt-2">₹15,000</span>
          </div>
          <div className="glass-card p-5 rounded-cards flex flex-col gap-2 shadow-2xl border border-[rgba(229,198,135,0.1)] hover:border-[#E5C687]/30 transition-all duration-300">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">Parent Mini-Albums</span>
            <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">Two duplicate copies of the primary layout album.</p>
            <span className="font-playfair text-sm font-semibold text-white mt-2">₹12,000</span>
          </div>
          <div className="glass-card p-5 rounded-cards flex flex-col gap-2 shadow-2xl border border-[rgba(229,198,135,0.1)] hover:border-[#E5C687]/30 transition-all duration-300">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">Reels Package</span>
            <p className="text-xs text-[#F2E7D8]/70 leading-relaxed font-light">3 Instagram-ready reels edited and sent same-week.</p>
            <span className="font-playfair text-sm font-semibold text-white mt-2">₹10,000</span>
          </div>
        </div>
      </section>

    </div>
  );
}
