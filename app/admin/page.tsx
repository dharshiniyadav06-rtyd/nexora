"use client";

import React, { useState, useEffect } from "react";
import { useApp, Booking, RewardCampaign } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Users, Calendar, Camera, TrendingUp, Check, X, AlertCircle, FileSpreadsheet, Plus, Sparkles, CheckCircle2, DollarSign, RefreshCw, Settings, Gift, List, Eye } from "lucide-react";

export default function AdminDashboardPage() {
  const {
    bookings,
    updateBookingStatus,
    updatePaymentStatus,
    rewardConfig,
    updateRewardConfig,
    campaigns,
    addCampaign,
    toggleCampaign,
    rewardsBalance,
    rewardsEarned,
    rewardsRedeemed,
    earnCredits,
    redeemCredits,
    isLoggedIn,
    login,
    logout
  } = useApp();

  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await fetch('/api/admin/session');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user.role.toLowerCase() === 'admin') {
            setAuthorized(true);
            if (!isLoggedIn) {
              login(data.user.email, "Admin");
            }
          } else {
            setAuthorized(false);
            router.push('/login');
          }
        } else {
          setAuthorized(false);
          router.push('/login');
        }
      } catch (err) {
        console.error('Admin verification error:', err);
        setAuthorized(false);
        router.push('/login');
      }
    };
    verifyAdmin();
  }, [isLoggedIn, login, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const [activeTab, setActiveTab] = useState<"bookings" | "payments" | "rewards">("bookings");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // Simulated CMS Upload states
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("Wedding");
  const [lens, setLens] = useState("Sony FE 50mm f/1.2 GM");
  const [lighting, setLighting] = useState("Golden Hour Natural Light");
  const [style, setStyle] = useState("Candid");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Rewards Config edit state
  const [silverCred, setSilverCred] = useState(rewardConfig?.silverCredits || 200);
  const [goldCred, setGoldCred] = useState(rewardConfig?.goldCredits || 350);
  const [platCred, setPlatCred] = useState(rewardConfig?.platinumCredits || 500);
  const [sigCred, setSigCred] = useState(rewardConfig?.signatureCredits || 750);
  const [valRupees, setValRupees] = useState(rewardConfig?.creditValueInRupees || 10);
  const [configSaved, setConfigSaved] = useState(false);

  // New Campaign Form State
  const [campName, setCampName] = useState("");
  const [campMult, setCampMult] = useState(2);
  const [campDesc, setCampDesc] = useState("");
  const [campExpiry, setCampExpiry] = useState("2026-12-31");
  const [campAddedSuccess, setCampAddedSuccess] = useState(false);

  // Manual User Credit adjustments
  const [manualCreditAmount, setManualCreditAmount] = useState(100);
  const [manualSuccess, setManualSuccess] = useState(false);

  // Stats calculation
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "Pending Approval").length;
  
  // Calculate total revenue from completed/confirmed bookings
  const revenueTotal = bookings
    .filter((b) => b.paymentStatus === "Paid" || b.paymentStatus === "Partially Paid")
    .reduce((sum, b) => sum + b.totalPaid, 0);

  const filteredBookings = bookings.filter((b) => {
    if (selectedStatusFilter === "All") return true;
    return b.status === selectedStatusFilter;
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgUrl.trim()) return;

    setUploadError("");
    setUploadSuccess(false);
    setIsUploading(true);

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imgUrl,
          title: `${category} Photoshoot`,
          category: category,
          description: `${lens} with ${lighting}`,
          event_type: style,
          location: 'Chennai'
        })
      });

      const data = await res.json();

      if (res.ok) {
        setUploadSuccess(true);
        setImgUrl("");
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setUploadError(data.error || 'Failed to upload portfolio item.');
      }
    } catch (err: any) {
      console.error('Portfolio upload error:', err);
      setUploadError(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateRewardConfig({
      silverCredits: Number(silverCred),
      goldCredits: Number(goldCred),
      platinumCredits: Number(platCred),
      signatureCredits: Number(sigCred),
      creditValueInRupees: Number(valRupees)
    });
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleAddCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (campName.trim() && campDesc.trim()) {
      addCampaign({
        name: campName.trim(),
        multiplier: Number(campMult),
        description: campDesc.trim(),
        isActive: true,
        expiry: campExpiry
      });
      setCampName("");
      setCampDesc("");
      setCampAddedSuccess(true);
      setTimeout(() => setCampAddedSuccess(false), 3000);
    }
  };

  const handleAdjustCredits = (type: "add" | "deduct") => {
    if (type === "add") {
      earnCredits(Number(manualCreditAmount));
    } else {
      redeemCredits(Number(manualCreditAmount));
    }
    setManualSuccess(true);
    setTimeout(() => setManualSuccess(false), 3000);
  };

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1F1713] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#E5C687]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12 font-poppins selection:bg-[#E5C687] selection:text-[#1F1713] text-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mt-10 border-b border-[rgba(229,198,135,0.15)] pb-8 flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">
            Studio Operations
          </span>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
            Studio Admin Portal
          </h1>
          <p className="text-xs md:text-sm text-[#F2E7D8]/80 leading-relaxed font-light font-inter">
            Manage bookings status, verify client gateway payments, refund deposits, customize reward credit values, and dispatch promo codes.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-[#C94C4C] text-[#C94C4C] hover:bg-[#C94C4C]/10 px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
        >
          Log Out
        </button>
      </div>

      {/* 1. ANALYTICS METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        
        <div className="glass-card p-5 rounded-cards shadow-2xl flex gap-4 items-center border border-[rgba(229,198,135,0.1)]">
          <div className="bg-[#E5C687]/15 p-3 rounded-xl text-[#E5C687] shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#F2E7D8]/60 uppercase tracking-widest">Enquiries</span>
            <span className="font-playfair text-xl font-bold text-white">{totalBookings} total</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-cards shadow-2xl flex gap-4 items-center border border-[rgba(229,198,135,0.1)]">
          <div className="bg-[#4F7C57]/15 p-3 rounded-xl text-[#4F7C57] shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#F2E7D8]/60 uppercase tracking-widest">Revenue</span>
            <span className="font-playfair text-xl font-bold text-[#E5C687]">₹{revenueTotal.toLocaleString()}</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-cards shadow-2xl flex gap-4 items-center border border-[rgba(229,198,135,0.1)]">
          <div className="bg-[#E5C687]/15 p-3 rounded-xl text-[#E5C687] shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#F2E7D8]/60 uppercase tracking-widest">Pending Enq</span>
            <span className="font-playfair text-xl font-bold text-[#E5C687]">{pendingCount} requests</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-cards shadow-2xl flex gap-4 items-center border border-[rgba(229,198,135,0.1)]">
          <div className="bg-[#A97142]/15 p-3 rounded-xl text-[#A97142] shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#F2E7D8]/60 uppercase tracking-widest">Loyalty Users</span>
            <span className="font-playfair text-xl font-bold text-white">28 Active</span>
          </div>
        </div>

      </div>

      {/* Admin Dashboard tabs */}
      <div className="flex flex-col gap-8">
        <div className="flex border-b border-[rgba(229,198,135,0.15)] overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`py-3 px-4 sm:px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "bookings"
                ? "border-[#E5C687] text-[#E5C687]"
                : "border-transparent text-[#F2E7D8]/60 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" /> Bookings & CMS
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`py-3 px-4 sm:px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "payments"
                ? "border-[#E5C687] text-[#E5C687]"
                : "border-transparent text-[#F2E7D8]/60 hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4" /> Payments & Refunds
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`py-3 px-4 sm:px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "rewards"
                ? "border-[#E5C687] text-[#E5C687]"
                : "border-transparent text-[#F2E7D8]/60 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" /> Loyalty & Campaigns
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[400px]">
          
          {/* TAB 1: BOOKING & PORTFOLIO CMS */}
          {activeTab === "bookings" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Side - Bookings List (2/3 width) */}
              <div className="lg:col-span-2 glass-card p-6 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[rgba(229,198,135,0.15)] pb-4">
                  <h3 className="font-playfair text-xl font-bold text-white">
                    Client Enquiries & Requests
                  </h3>

                  {/* Filter buttons */}
                  <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider">
                    {["All", "Pending Approval", "Confirmed", "Cancelled"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedStatusFilter(f)}
                        className={`px-3 py-1.5 border rounded-full transition-all ${
                          selectedStatusFilter === f
                            ? "gold-gradient border-transparent text-[#1F1713] shadow-md"
                            : "bg-[#2A1F1A] border-[rgba(229,198,135,0.2)] hover:border-[#E5C687]/50 text-[#F2E7D8]/80 hover:text-white"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredBookings.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className="border border-[rgba(229,198,135,0.1)] p-5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#2A1F1A]/35 hover:bg-[#4B3628]/20 transition-all duration-300 animate-scale-in"
                      >
                        <div className="flex flex-col gap-1.5 text-xs font-light font-inter">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] text-[#E5C687] font-bold">
                              {b.id}
                            </span>
                            <span className="font-semibold text-white text-sm font-poppins">
                              {b.coupleName}
                            </span>
                            <span className="text-[10px] bg-[#4B3628] border border-[rgba(229,198,135,0.2)] text-[#F2E7D8]/80 px-2 py-0.5 rounded-full font-poppins tracking-wide font-medium">
                              {b.eventType}
                            </span>
                          </div>

                          <div className="text-[#F2E7D8]/80 leading-relaxed">
                            <span>Date: <strong className="text-white font-semibold">{b.date}</strong></span>
                            <span className="mx-2">|</span>
                            <span>Package: <strong className="text-[#E5C687] font-semibold">{b.packageName}</strong> ({b.price})</span>
                          </div>
                          
                          <div className="text-[10px] text-[#F2E7D8]/60 font-poppins">
                            Phone: {b.phone} | Email: {b.email}
                          </div>
                        </div>

                        {/* Actions buttons depending on status */}
                        <div className="flex gap-2 text-xs shrink-0 select-none">
                          {b.status === "Pending Approval" && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(b.id, "Confirmed")}
                                className="bg-[#4F7C57] hover:bg-[#4F7C57]/80 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-center gap-1 font-bold transition-all"
                                aria-label="Approve booking"
                              >
                                <Check className="w-4 h-4" /> Approve
                              </button>
                              <button
                                onClick={() => updateBookingStatus(b.id, "Cancelled")}
                                className="border border-[#C94C4C] hover:bg-[#C94C4C]/15 text-[#C94C4C] px-4 py-2 rounded-lg flex items-center justify-center gap-1 font-semibold transition-all"
                                aria-label="Cancel booking"
                              >
                                <X className="w-4 h-4" /> Decline
                              </button>
                            </>
                          )}

                          {b.status === "Confirmed" && (
                            <button
                              onClick={() => updateBookingStatus(b.id, "Editing In Progress")}
                              className="gold-gradient text-[#1F1713] px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-opacity hover:opacity-90 shadow-md"
                            >
                              Start Editing
                            </button>
                          )}

                          {b.status === "Editing In Progress" && (
                            <button
                              onClick={() => updateBookingStatus(b.id, "Completed")}
                              className="bg-[#E5C687] hover:bg-[#D4AF37] text-[#1F1713] px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-colors shadow-md"
                            >
                              Deliver Album
                            </button>
                          )}

                          {(b.status === "Completed" || b.status === "Cancelled") && (
                            <span className="text-[10px] text-[#F2E7D8]/40 uppercase tracking-widest font-semibold p-2">
                              Archived status
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-[#F2E7D8]/50 font-light font-inter">
                    No matching client bookings found for this filter.
                  </div>
                )}
              </div>

              {/* Right Side - CMS Portfolio Emulator (1/3 width) */}
              <div className="glass-card p-6 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-6">
                <h3 className="font-playfair text-xl font-bold text-white border-b border-[rgba(229,198,135,0.15)] pb-3">
                  Portfolio CMS Editor
                </h3>

                <form onSubmit={handleUpload} className="flex flex-col gap-4 text-xs font-light">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Image Source URL
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                      className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#E5C687] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Gallery Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all cursor-pointer"
                    >
                      <option value="Wedding">Wedding Rituals</option>
                      <option value="Bridal Portrait">Bridal Portrait</option>
                      <option value="Reception">Reception Stage</option>
                      <option value="Engagement">Engagement Rings</option>
                      <option value="Mehendi">Mehendi Designs</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Camera Lens GM config
                    </label>
                    <input
                      type="text"
                      value={lens}
                      onChange={(e) => setLens(e.target.value)}
                      className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Lighting setup
                    </label>
                    <input
                      type="text"
                      value={lighting}
                      onChange={(e) => setLighting(e.target.value)}
                      className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Editing Style
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all cursor-pointer"
                    >
                      <option value="Candid">Candid Romance</option>
                      <option value="Luxury">Luxury Fine-Art</option>
                      <option value="Editorial">Editorial Contrast</option>
                      <option value="Traditional">Traditional South Indian</option>
                    </select>
                  </div>

                  {uploadError && (
                    <div className="bg-[#C94C4C]/15 border border-[#C94C4C]/30 text-[#C94C4C] p-3.5 rounded-xl flex items-center gap-2 font-semibold animate-scale-in">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {uploadSuccess && (
                    <div className="bg-[#4F7C57]/15 border border-[#4F7C57]/30 text-[#4F7C57] p-3.5 rounded-xl flex items-center gap-2 font-semibold animate-scale-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Uploaded successfully to live portfolio index!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full gold-gradient text-[#1F1713] py-3 rounded-xl text-xs uppercase tracking-widest font-bold shadow-md hover:opacity-95 transition-all mt-2 disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Upload to Portfolio"}
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 2: PAYMENTS & REFUNDS CONTROL */}
          {activeTab === "payments" && (
            <div className="glass-card p-6 md:p-8 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-6">
              <div className="border-b border-[rgba(229,198,135,0.15)] pb-4 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-playfair text-xl font-bold text-white">Payment & Transaction Audits</h3>
                  <p className="text-xs text-[#F2E7D8]/60 font-light">Verify checkout history, approve pending deposits, and process client refund requests.</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[rgba(229,198,135,0.1)] bg-[#1F1713]/40">
                <table className="w-full text-left text-xs font-inter border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-[#2A1F1A]/80 border-b border-[rgba(229,198,135,0.15)] text-[10px] uppercase font-semibold text-[#E5C687] tracking-wider">
                      <th className="p-4">Transaction Details</th>
                      <th className="p-4">Couple Name</th>
                      <th className="p-4">Invoice / Total</th>
                      <th className="p-4">Gateway Method</th>
                      <th className="p-4">Payment Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(229,198,135,0.06)] text-[#F2E7D8]/80">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#4B3628]/25 transition-all">
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-white font-semibold text-xs">{b.transactionId || "No Payment"}</span>
                            <span className="text-[10px] text-[#F2E7D8]/50">Ref ID: {b.paymentReference || "N/A"}</span>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-white">{b.coupleName}</td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white">₹{b.totalPaid?.toLocaleString()}</span>
                            <span className="text-[9px] text-[#F2E7D8]/50">{b.packageName} Package</span>
                          </div>
                        </td>
                        <td className="p-4">{b.paymentMethod || "Direct booking"}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-bold border ${
                            b.paymentStatus === "Paid"
                              ? "bg-[#4F7C57]/15 border-[#4F7C57]/20 text-[#4F7C57]"
                              : b.paymentStatus === "Partially Paid"
                              ? "bg-[#E5C687]/15 border-[#E5C687]/20 text-[#E5C687]"
                              : "bg-[#C94C4C]/15 border-[#C94C4C]/20 text-[#C94C4C]"
                          }`}>
                            {b.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 text-[10px] uppercase tracking-wider font-bold">
                            {b.paymentStatus === "Pending" && (
                              <button
                                onClick={() => updatePaymentStatus(b.id, "Paid")}
                                className="px-3 py-1.5 rounded bg-[#4F7C57] text-white hover:bg-[#4F7C57]/80 shadow"
                              >
                                Approve Paid
                              </button>
                            )}
                            {b.paymentStatus === "Paid" && (
                              <button
                                onClick={() => {
                                  updatePaymentStatus(b.id, "Refunded");
                                  updateBookingStatus(b.id, "Cancelled");
                                }}
                                className="px-3 py-1.5 rounded border border-[#C94C4C] text-[#C94C4C] hover:bg-[#C94C4C]/10"
                              >
                                Issue Refund
                              </button>
                            )}
                            {b.paymentStatus === "Refunded" && (
                              <span className="text-[#F2E7D8]/40 italic p-1.5 text-[9px] lowercase font-light">refund processed</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: REWARDS CONFIG & CAMPAIGNS */}
          {activeTab === "rewards" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Side: Configs & Adjuster (2/3 width) */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                
                {/* Rewards Configuration panel */}
                <div className="glass-card p-6 md:p-8 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-6">
                  <div className="border-b border-[rgba(229,198,135,0.15)] pb-3">
                    <h4 className="font-playfair text-lg font-bold text-white flex items-center gap-1.5">
                      <Settings className="w-5 h-5 text-[#E5C687]" /> Customize Reward Multipliers
                    </h4>
                    <p className="text-xs text-[#F2E7D8]/60 font-light mt-0.5">Define base reward values allocated on client reservation success.</p>
                  </div>

                  <form onSubmit={handleSaveConfig} className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs font-light items-end">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold text-[#F2E7D8]/60">Silver Credits</label>
                      <input
                        type="number"
                        required
                        value={silverCred}
                        onChange={(e) => setSilverCred(Number(e.target.value))}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] text-center"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold text-[#F2E7D8]/60">Gold Credits</label>
                      <input
                        type="number"
                        required
                        value={goldCred}
                        onChange={(e) => setGoldCred(Number(e.target.value))}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] text-center"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold text-[#F2E7D8]/60">Platinum Credits</label>
                      <input
                        type="number"
                        required
                        value={platCred}
                        onChange={(e) => setPlatCred(Number(e.target.value))}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] text-center"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold text-[#F2E7D8]/60">Signature Credits</label>
                      <input
                        type="number"
                        required
                        value={sigCred}
                        onChange={(e) => setSigCred(Number(e.target.value))}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] text-center"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold text-[#E5C687]">1 Credit Worth (₹)</label>
                      <input
                        type="number"
                        required
                        value={valRupees}
                        onChange={(e) => setValRupees(Number(e.target.value))}
                        className="bg-[#1F1713]/60 border border-[#E5C687]/40 px-3 py-2.5 rounded-xl text-[#E5C687] focus:outline-none focus:border-[#E5C687] text-center font-bold"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-5 flex justify-end gap-3 mt-2">
                      {configSaved && (
                        <span className="text-[#4F7C57] font-semibold text-xs flex items-center gap-1.5">
                          <CheckCircle2 size={14} /> Saved Configs!
                        </span>
                      )}
                      <button
                        type="submit"
                        className="gold-gradient text-[#1F1713] px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] hover:opacity-95 shadow"
                      >
                        Save Configurations
                      </button>
                    </div>
                  </form>
                </div>

                {/* Adjust client credits card */}
                <div className="glass-card p-6 md:p-8 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-4">
                  <div className="border-b border-[rgba(229,198,135,0.15)] pb-3">
                    <h4 className="font-playfair text-lg font-bold text-white flex items-center gap-1.5">
                      <Gift className="w-5 h-5 text-[#E5C687]" /> Adjust Client Reward Credits
                    </h4>
                    <p className="text-xs text-[#F2E7D8]/60 font-light mt-0.5">Manually reward bonus credits or deduct spent points for Ananya Sharma&apos;s active profile.</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-light">
                    <div className="flex items-center gap-6 bg-[#1F1713]/40 p-4 rounded-2xl border border-white/5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[#F2E7D8]/50 text-[9px] uppercase">Active Balance</span>
                        <span className="font-bold text-white text-base">{rewardsBalance} Credits</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[#F2E7D8]/50 text-[9px] uppercase">Lifetime Earned</span>
                        <span className="font-semibold text-[#E5C687]">{rewardsEarned} Earned</span>
                      </div>
                    </div>

                    <div className="flex items-end gap-3 flex-grow max-w-sm">
                      <div className="flex flex-col gap-1.5 flex-grow">
                        <label className="text-[9px] uppercase font-bold text-[#F2E7D8]/70">Amount of Credits</label>
                        <input
                          type="number"
                          required
                          value={manualCreditAmount}
                          onChange={(e) => setManualCreditAmount(Number(e.target.value))}
                          className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2 text-xs rounded-xl text-white text-center"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleAdjustCredits("add")}
                          className="px-3.5 py-2 bg-[#4F7C57] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:opacity-90"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustCredits("deduct")}
                          className="px-3.5 py-2 border border-[#C94C4C] text-[#C94C4C] hover:bg-[#C94C4C]/10 rounded-xl text-[10px] font-bold uppercase tracking-wider"
                        >
                          Deduct
                        </button>
                      </div>
                    </div>
                  </div>

                  {manualSuccess && (
                    <div className="bg-[#4F7C57]/15 border border-[#4F7C57]/30 text-[#4F7C57] p-3 text-center rounded-xl text-xs font-semibold animate-scale-in">
                      Updated user rewards balance successfully!
                    </div>
                  )}
                </div>

              </div>

              {/* Right Side: Create campaigns (1/3 width) */}
              <div className="flex flex-col gap-6">
                
                {/* Create promotional campaign form */}
                <div className="glass-card p-6 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-4">
                  <h4 className="font-playfair text-lg font-bold text-white border-b border-[rgba(229,198,135,0.15)] pb-3">
                    Create Campaign
                  </h4>

                  <form onSubmit={handleAddCampaignSubmit} className="flex flex-col gap-4 text-xs font-light">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                        Campaign Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Festive Season Offer"
                        value={campName}
                        onChange={(e) => setCampName(e.target.value)}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#E5C687]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                          Credit Multiplier
                        </label>
                        <select
                          value={campMult}
                          onChange={(e) => setCampMult(Number(e.target.value))}
                          className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] cursor-pointer"
                        >
                          <option value="1.5">1.5x Credits</option>
                          <option value="2">2.0x (Double)</option>
                          <option value="3">3.0x (Triple)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          required
                          value={campExpiry}
                          onChange={(e) => setCampExpiry(e.target.value)}
                          className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                        Campaign Description
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Offer details..."
                        value={campDesc}
                        onChange={(e) => setCampDesc(e.target.value)}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#E5C687] resize-none"
                      />
                    </div>

                    {campAddedSuccess && (
                      <div className="bg-[#4F7C57]/15 border border-[#4F7C57]/30 text-[#4F7C57] p-3 rounded-xl text-center font-semibold animate-scale-in">
                        Campaign created and activated!
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full gold-gradient text-[#1F1713] py-3 rounded-xl text-xs uppercase tracking-widest font-bold shadow hover:opacity-95 mt-2"
                    >
                      Add Campaign
                    </button>
                  </form>
                </div>

                {/* Campaigns List for Admin to toggle */}
                <div className="glass-card p-5 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687] border-b border-[rgba(229,198,135,0.1)] pb-2">Active Multipliers</span>
                  <div className="flex flex-col gap-3.5">
                    {campaigns.map((c) => (
                      <div key={c.id} className="flex justify-between items-center text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-white">{c.name}</span>
                          <span className="text-[10px] text-[#F2E7D8]/60">{c.multiplier}x multiplier</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleCampaign(c.id)}
                          className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider text-[9px] shadow transition-all ${
                            c.isActive
                              ? "bg-[#4F7C57] text-white hover:bg-[#4F7C57]/80"
                              : "border border-white/20 text-[#F2E7D8]/50 hover:bg-white/5"
                          }`}
                        >
                          {c.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
      
    </div>
  );
}
