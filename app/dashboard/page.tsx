"use client";

import React, { useState } from "react";
import { useApp, Booking, Referral } from "@/context/AppContext";
import { User, Calendar, Image as ImageIcon, Heart, Settings, CheckCircle2, Circle, Clock, Camera, FolderPlus, Plus, X, Award, Gift, Share2, Clipboard, Receipt, Download, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const {
    bookings,
    favorites,
    inspirationCollections,
    createCollection,
    rewardsBalance,
    rewardsEarned,
    rewardsRedeemed,
    referrals,
    referralCode,
    campaigns,
    addReferral,
    isLoggedIn,
    login,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<"bookings" | "wishlist" | "collections" | "rewards">("bookings");
  
  // Moodboard Creation Form State
  const [newCollName, setNewCollName] = useState("");
  const [showAddColl, setShowAddColl] = useState(false);

  // Receipt Modal State
  const [activeReceipt, setActiveReceipt] = useState<Booking | null>(null);

  // Referral Invite Form State
  const [refFriendName, setRefFriendName] = useState("");
  const [refFriendEmail, setRefFriendEmail] = useState("");
  const [showRefCopied, setShowRefCopied] = useState(false);

  // Auto login if not logged in to show customer state (or allow toggle)
  React.useEffect(() => {
    if (!isLoggedIn) {
      login("ananya@example.com", "Customer");
    }
  }, [isLoggedIn, login]);

  // Define steps for booking progress
  const statusSteps = [
    { label: "Deposit & Contract", desc: "Lock in studio schedules", key: "deposit" },
    { label: "Style Consultation", desc: "Align event sequences", key: "style" },
    { label: "Photo Shoot", desc: "Covering the ceremony", key: "shoot" },
    { label: "Culling & Selection", desc: "Picking best shots", key: "culling" },
    { label: "High Retouching", desc: "Color grading prints", key: "retouching" },
    { label: "Album Delivery", desc: "Shipping hardcopies", key: "delivery" }
  ];

  const getStepIndex = (status: string) => {
    if (status === "Pending Approval") return 0;
    if (status === "Awaiting Deposit") return 1;
    if (status === "Confirmed") return 2;
    if (status === "Editing In Progress") return 4;
    if (status === "Completed") return 6;
    return 3;
  };

  const handleCreateCollectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollName.trim()) {
      createCollection(newCollName.trim());
      setNewCollName("");
      setShowAddColl(false);
    }
  };

  const handleInviteReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (refFriendName && refFriendEmail) {
      addReferral(refFriendName, refFriendEmail);
      setRefFriendName("");
      setRefFriendEmail("");
      alert(`Invitation sent to ${refFriendName}!`);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://lenscraft.studio/signup?ref=${referralCode}`);
    setShowRefCopied(true);
    setTimeout(() => setShowRefCopied(false), 2000);
  };

  const handleDownloadReceipt = () => {
    if (activeReceipt) {
      alert(`Downloading receipt for booking ${activeReceipt.id}...\nSaved as LensCraft_Receipt_${activeReceipt.id}.pdf`);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12 font-poppins selection:bg-[#E5C687] selection:text-[#1F1713]">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10 border-b border-[rgba(229,198,135,0.15)] pb-8 text-white">
        <div className="flex flex-col gap-2">
          <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">
            Client Portal
          </span>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold">
            Welcome back, {user?.name || "Ananya"}
          </h1>
          <p className="text-xs md:text-sm text-[#F2E7D8]/80 leading-relaxed font-light font-inter">
            Manage your photoshoot schedules, download digital receipts, review rewards balance, or invite your friends.
          </p>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-4 bg-[#2A1F1A] border border-[rgba(229,198,135,0.15)] p-4 rounded-xl shadow-2xl shrink-0">
          <div className="w-12 h-12 gold-gradient text-[#1F1713] rounded-full flex items-center justify-center font-playfair text-xl font-extrabold shadow-md">
            {user?.name?.[0] || "A"}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">{user?.name || "Ananya Sharma"}</span>
            <span className="text-[10px] text-[#F2E7D8]/60">Premium Customer</span>
          </div>
        </div>
      </div>

      {/* Dashboard Sub Tabs */}
      <div className="flex flex-col gap-8 text-white">
        <div className="flex border-b border-[rgba(229,198,135,0.15)] overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`py-3 px-4 sm:px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "bookings"
                ? "border-[#E5C687] text-[#E5C687]"
                : "border-transparent text-[#F2E7D8]/60 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" /> Bookings
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`py-3 px-4 sm:px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "rewards"
                ? "border-[#E5C687] text-[#E5C687]"
                : "border-transparent text-[#F2E7D8]/60 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" /> Rewards & Referrals
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`py-3 px-4 sm:px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "wishlist"
                ? "border-[#E5C687] text-[#E5C687]"
                : "border-transparent text-[#F2E7D8]/60 hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4" /> Liked ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`py-3 px-4 sm:px-6 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "collections"
                ? "border-[#E5C687] text-[#E5C687]"
                : "border-transparent text-[#F2E7D8]/60 hover:text-white"
            }`}
          >
            <FolderPlus className="w-4 h-4" /> Mood Boards
          </button>
        </div>

        {/* Tab contents */}
        <div className="min-h-[400px]">
          
          {/* TAB 1: BOOKING TRACKER WITH DIGITAL RECEIPTS */}
          {activeTab === "bookings" && (
            <div className="flex flex-col gap-10">
              {bookings.length > 0 ? (
                bookings.map((booking) => {
                  const activeStepIdx = getStepIndex(booking.status);
                  
                  // Color codes for payments status
                  const paymentStatusColors = {
                    Pending: "text-[#C94C4C] bg-[#C94C4C]/10 border-[#C94C4C]/20",
                    "Partially Paid": "text-[#E5C687] bg-[#E5C687]/10 border-[#E5C687]/20",
                    Paid: "text-[#4F7C57] bg-[#4F7C57]/10 border-[#4F7C57]/20",
                    Refunded: "text-[#F2E7D8]/50 bg-white/5 border-white/10"
                  };

                  return (
                    <div
                      key={booking.id}
                      className="glass-card p-6 md:p-8 rounded-cards flex flex-col gap-8 border border-[rgba(229,198,135,0.15)] shadow-2xl"
                    >
                      {/* Booking card header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[rgba(229,198,135,0.15)] pb-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2E7D8]/50">
                            Booking Reference
                          </span>
                          <h3 className="font-playfair text-xl font-bold text-white">
                            {booking.coupleName}&apos;s {booking.eventType} ({booking.id})
                          </h3>
                        </div>

                        <div className="flex flex-wrap md:items-end gap-2.5">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[#1F1713] bg-[#E5C687] px-3 py-1 rounded-full shadow-sm">
                            {booking.status}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-bold border px-3 py-1 rounded-full ${paymentStatusColors[booking.paymentStatus] || "text-[#F2E7D8]"}`}>
                            Payment: {booking.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Transaction Summary Panel & Receipt CTA */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#1F1713]/40 p-4 rounded-2xl border border-[rgba(229,198,135,0.06)] text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[#F2E7D8]/50 text-[9px] uppercase">Transaction ID</span>
                          <span className="font-mono text-white">{booking.transactionId || "N/A"}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[#F2E7D8]/50 text-[9px] uppercase">Amount Paid</span>
                          <span className="font-semibold text-white">₹{booking.totalPaid?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[#F2E7D8]/50 text-[9px] uppercase">Rewards Earned</span>
                          <span className="font-semibold text-[#E5C687] flex items-center gap-1">
                            <Sparkles size={12} className="text-[#E5C687]" /> +{booking.creditsEarned} Credits
                          </span>
                        </div>
                        <div className="flex items-center md:justify-end">
                          {booking.transactionId ? (
                            <button
                              type="button"
                              onClick={() => setActiveReceipt(booking)}
                              className="px-4 py-2.5 rounded-xl border border-[rgba(229,198,135,0.3)] hover:bg-[#4B3628]/45 text-[#E5C687] text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                            >
                              <Receipt size={13} /> View Digital Receipt
                            </button>
                          ) : (
                            <Link
                              href="/calendar"
                              className="px-4 py-2.5 rounded-xl gold-gradient text-[#1F1713] text-[10px] font-bold uppercase tracking-wider transition-all"
                            >
                              Pay Deposit Now
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Post-Production Vertical/Horizontal Timeline */}
                      <div className="flex flex-col gap-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#E5C687]">
                          Post-Production Flow
                        </span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative mt-4">
                          {statusSteps.map((step, idx) => {
                            const isCompleted = idx < activeStepIdx;
                            const isCurrent = idx === activeStepIdx;
                            
                            return (
                              <div key={idx} className="flex md:flex-col gap-4 items-start text-xs relative">
                                {/* Connector line (Desktop) */}
                                {idx < 5 && (
                                  <div className="hidden md:block absolute left-6.5 top-3.5 w-full h-[1.5px] bg-[rgba(229,198,135,0.15)] -z-10" />
                                )}

                                {/* Dot Indicator */}
                                <div className="z-10 shrink-0">
                                  {isCompleted ? (
                                    <div className="w-7 h-7 bg-[#4F7C57] text-white rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(79,124,87,0.5)]">
                                      <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                  ) : isCurrent ? (
                                    <div className="w-7 h-7 bg-[#E5C687] text-[#1F1713] rounded-full flex items-center justify-center animate-pulse shadow-[0_0_12px_rgba(229,198,135,0.6)]">
                                      <Clock className="w-4 h-4 text-[#1F1713]" />
                                    </div>
                                  ) : (
                                    <div className="w-7 h-7 bg-[#2A1F1A] text-[#F2E7D8]/30 rounded-full flex items-center justify-center border border-[rgba(229,198,135,0.15)]">
                                      <Circle className="w-4 h-4 text-[#F2E7D8]/10" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-col gap-0.5">
                                  <span
                                    className={`font-semibold ${
                                      isCurrent ? "text-[#E5C687]" : "text-white"
                                    }`}
                                  >
                                    {step.label}
                                  </span>
                                  <span className="text-[10px] text-[#F2E7D8]/60 leading-relaxed font-light">
                                    {step.desc}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4 glass-card rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl">
                  <div className="bg-[#4B3628] p-4 rounded-full text-[#E5C687]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-white">No Active Bookings</h3>
                  <p className="text-xs text-[#F2E7D8]/70 max-w-xs leading-relaxed font-light">
                    You haven&apos;t scheduled any wedding photography consultations yet. Head over to our calendar to lock in a slot.
                  </p>
                  <Link
                    href="/calendar"
                    className="mt-2 gold-gradient text-[#1F1713] px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-md hover:opacity-95"
                  >
                    Check Availability
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LENSCRAFT LOYALTY REWARDS SYSTEM & REFERRALS */}
          {activeTab === "rewards" && (
            <div className="flex flex-col gap-8">
              
              {/* Rewards Balance Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Balance Progress Circle Card */}
                <div className="glass-card p-6 rounded-cards border border-[#E5C687]/30 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[180px]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#E5C687]/10 via-transparent to-transparent opacity-80" />
                  
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#E5C687] flex items-center gap-1.5">
                      <Gift size={13} /> Current Balance
                    </span>
                    <h3 className="font-playfair text-4xl font-extrabold text-white mt-1">
                      {rewardsBalance} <span className="text-xs font-light text-[#F2E7D8]/50 uppercase tracking-widest">credits</span>
                    </h3>
                    <p className="text-[10px] text-[#F2E7D8]/60 mt-1 font-light leading-relaxed">
                      Equivalent to <span className="font-semibold text-white">₹{(rewardsBalance * 10).toLocaleString()}</span> package discount or add-on upgrades.
                    </p>
                  </div>

                  {/* Progress gauge visual */}
                  <div className="relative z-10 w-full h-1.5 bg-[#1F1713] rounded-full overflow-hidden mt-4">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C687] rounded-full shadow-[0_0_8px_rgba(229,198,135,0.6)]"
                      style={{ width: `${Math.min(100, (rewardsBalance / 1000) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Total Credits Earned Card */}
                <div className="glass-card p-6 rounded-cards border border-[rgba(229,198,135,0.1)] shadow-2xl flex flex-col justify-between min-h-[180px]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#F2E7D8]/60 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#E5C687]" /> Credits Accumulated
                    </span>
                    <h3 className="font-playfair text-3xl font-bold text-white mt-1">
                      {rewardsEarned} <span className="text-[10px] font-light text-[#F2E7D8]/50 uppercase tracking-widest">total</span>
                    </h3>
                    <p className="text-[10px] text-[#F2E7D8]/60 leading-relaxed font-light mt-1">
                      Your lifetime accumulated credits earned from bookings, referrals, and custom milestones.
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] border-t border-[rgba(229,198,135,0.15)] pt-3 text-[#F2E7D8]/40">
                    <span>Bronze status active</span>
                    <span className="text-[#E5C687]">Level 2</span>
                  </div>
                </div>

                {/* Credits Redeemed Card */}
                <div className="glass-card p-6 rounded-cards border border-[rgba(229,198,135,0.1)] shadow-2xl flex flex-col justify-between min-h-[180px]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#F2E7D8]/60 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#4F7C57]" /> Credits Redeemed
                    </span>
                    <h3 className="font-playfair text-3xl font-bold text-white mt-1">
                      {rewardsRedeemed} <span className="text-[10px] font-light text-[#F2E7D8]/50 uppercase tracking-widest">redeemed</span>
                    </h3>
                    <p className="text-[10px] text-[#F2E7D8]/60 leading-relaxed font-light mt-1">
                      Credits used on past invoice checkouts, custom album bindings, and canvas framing upgrades.
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] border-t border-[rgba(229,198,135,0.15)] pt-3 text-[#F2E7D8]/40">
                    <span>Last redeemed July 2026</span>
                  </div>
                </div>

              </div>

              {/* Referral Invite Panel & Promo Cards Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Invite friends Referral Card */}
                <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 border-b border-[rgba(229,198,135,0.15)] pb-3">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#E5C687]">Referral Program</span>
                    <h4 className="font-playfair text-lg font-bold text-white">Invite Friends & Earn Credits</h4>
                    <p className="text-xs text-[#F2E7D8]/60 font-light">Share the LensCraft experience. When a referred friend books a consultation slot, they receive ₹1,000 off, and you receive 150 bonus credits!</p>
                  </div>

                  {/* Copy code bar */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#F2E7D8]/60">Your Referral Code</span>
                    <div className="flex bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] rounded-xl p-1.5 items-center justify-between">
                      <span className="font-mono text-xs text-[#E5C687] pl-3 font-bold">{referralCode}</span>
                      <button
                        onClick={copyReferralLink}
                        className="gold-gradient text-[#1F1713] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow hover:opacity-90"
                      >
                        {showRefCopied ? "Copied!" : (
                          <>
                            <Clipboard size={12} /> Copy link
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Form to submit name and email */}
                  <form onSubmit={handleInviteReferral} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-light items-end">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold text-[#F2E7D8]/70">Friend&apos;s Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Karthik Raja"
                        value={refFriendName}
                        onChange={(e) => setRefFriendName(e.target.value)}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#E5C687] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold text-[#F2E7D8]/70">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="karthik@example.com"
                        value={refFriendEmail}
                        onChange={(e) => setRefFriendEmail(e.target.value)}
                        className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#E5C687] transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="gold-gradient text-[#1F1713] py-2.5 rounded-xl font-bold uppercase tracking-wider text-[10px] hover:opacity-95 shadow"
                    >
                      Send Invitation
                    </button>
                  </form>

                  {/* Invite History table */}
                  <div className="flex flex-col gap-3.5 border-t border-[rgba(229,198,135,0.15)] pt-6">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#F2E7D8]/70">Referral History</span>
                    <div className="overflow-x-auto rounded-xl border border-[rgba(229,198,135,0.1)] bg-[#1F1713]/40">
                      <table className="w-full text-left text-[11px] font-inter border-collapse min-w-[450px]">
                        <thead>
                          <tr className="bg-[#2A1F1A]/80 border-b border-[rgba(229,198,135,0.15)] text-[9px] uppercase font-semibold text-[#E5C687] tracking-wider">
                            <th className="p-3">Friend</th>
                            <th className="p-3">Email Address</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Credits Earned</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(229,198,135,0.06)] text-[#F2E7D8]/80">
                          {referrals.map((ref) => (
                            <tr key={ref.id} className="hover:bg-[#4B3628]/25 transition-colors">
                              <td className="p-3 font-semibold text-white">{ref.friendName}</td>
                              <td className="p-3">{ref.email}</td>
                              <td className="p-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold border ${
                                  ref.status === "Completed"
                                    ? "bg-[#4F7C57]/15 border-[#4F7C57]/20 text-[#4F7C57]"
                                    : "bg-white/5 border-white/10 text-[#F2E7D8]/50"
                                }`}>
                                  {ref.status}
                                </span>
                              </td>
                              <td className="p-3 font-semibold text-[#E5C687]">{ref.creditsEarned > 0 ? `+${ref.creditsEarned}` : "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Promotional Reward Campaigns & offers cards */}
                <div className="flex flex-col gap-6">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#E5C687] border-b border-[rgba(229,198,135,0.15)] pb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#E5C687]" /> Active Offers
                  </h4>

                  <div className="flex flex-col gap-4">
                    {/* Double credits festive campaign */}
                    {campaigns.map((camp) => (
                      <div
                        key={camp.id}
                        className={`glass-card p-5 rounded-2xl border flex flex-col gap-2 relative overflow-hidden ${
                          camp.isActive ? "border-[#E5C687]/40 shadow-lg" : "border-white/5 opacity-70"
                        }`}
                      >
                        {camp.isActive && (
                          <span className="absolute top-2 right-2 bg-[#4F7C57]/15 text-[#4F7C57] border border-[#4F7C57]/20 text-[8px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                            Active
                          </span>
                        )}
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">{camp.name}</span>
                        <p className="text-[11px] text-[#F2E7D8]/75 leading-relaxed font-light">{camp.description}</p>
                        <span className="text-[9px] text-[#F2E7D8]/40 mt-1">Expiry: {camp.expiry}</span>
                      </div>
                    ))}

                    {/* Standard reward offer references */}
                    <div className="glass-card p-5 rounded-2xl border border-white/5 opacity-80 flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">Birthday month bonus</span>
                      <p className="text-[11px] text-[#F2E7D8]/75 leading-relaxed font-light">Receive 100 extra bonus credits on any photoshoot bookings placed during your birthday month.</p>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border border-white/5 opacity-80 flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">Anniversary booking discount</span>
                      <p className="text-[11px] text-[#F2E7D8]/75 leading-relaxed font-light">Submit anniversary shoots to receive a complimentary custom Canvas frame set.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: LIKED PINS */}
          {activeTab === "wishlist" && (
            <div>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {favorites.map((favId, idx) => (
                    <div
                      key={idx}
                      className="glass-card border border-[rgba(229,198,135,0.15)] rounded-cards overflow-hidden shadow-2xl relative group animate-scale-in"
                    >
                      <div className="h-44 relative bg-black flex items-center justify-center overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=300"
                          alt="Liked Pin"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#1F1713]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] text-[#E5C687] uppercase tracking-widest font-semibold bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-1.5 rounded-sm">
                            Image ID: {favId}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center text-xs">
                        <span className="font-semibold text-white">Bridal Portrait</span>
                        <Link href="/portfolio" className="text-[10px] text-[#E5C687] hover:underline font-bold uppercase">
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4 glass-card rounded-cards border border-[rgba(229,198,135,0.15)] shadow-2xl">
                  <div className="bg-[#4B3628] p-4 rounded-full text-[#E5C687]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-white">Inspiration Board is Empty</h3>
                  <p className="text-xs text-[#F2E7D8]/70 max-w-xs leading-relaxed font-light">
                    Browse our portfolios and tap the heart icon on any image to save your favorite concepts.
                  </p>
                  <Link
                    href="/portfolio"
                    className="mt-2 gold-gradient text-[#1F1713] px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-md hover:opacity-95"
                  >
                    Browse Portfolios
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MOOD BOARDS */}
          {activeTab === "collections" && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-playfair text-xl font-bold text-white">
                    Custom Mood Boards
                  </h3>
                  <p className="text-xs text-[#F2E7D8]/60 font-light">
                    Organize your poses, layouts, and color themes into specialized collections.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddColl(!showAddColl)}
                  className="gold-gradient text-[#1F1713] px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold shadow-md hover:opacity-95 flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4 text-[#1F1713]" /> Create Board
                </button>
              </div>

              {/* Add Collection form dialog drawer */}
              {showAddColl && (
                <form
                  onSubmit={handleCreateCollectionSubmit}
                  className="bg-[#2A1F1A] border border-[rgba(229,198,135,0.2)] p-5 rounded-xl flex gap-3 items-end max-w-md animate-scale-in"
                >
                  <div className="flex flex-col gap-1.5 flex-grow">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Mood Board Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. South Indian Saree Poses"
                      value={newCollName}
                      onChange={(e) => setNewCollName(e.target.value)}
                      className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2 text-xs rounded-lg text-white placeholder-white/25 focus:outline-none focus:border-[#E5C687] transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="gold-gradient text-[#1F1713] px-4 py-2 rounded-lg text-xs font-bold uppercase shadow-sm hover:opacity-95"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddColl(false)}
                    className="border border-[rgba(229,198,135,0.3)] hover:bg-[#4B3628]/45 text-[#E5C687] px-4 py-2 rounded-lg text-xs font-semibold uppercase transition-all"
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* Moodboard Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.keys(inspirationCollections).map((name, idx) => {
                  const pinnedCount = inspirationCollections[name]?.length || 0;
                  return (
                    <div
                      key={idx}
                      className="glass-card p-6 rounded-cards flex flex-col justify-between gap-4 group hover:border-[#E5C687] transition-colors border border-[rgba(229,198,135,0.1)] shadow-2xl"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687]">
                          Collection Board
                        </span>
                        <h4 className="font-playfair text-base font-bold text-white">
                          {name}
                        </h4>
                        <p className="text-xs text-[#F2E7D8]/60 font-light">
                          {pinnedCount} pins saved
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[rgba(229,198,135,0.15)] flex justify-between items-center text-xs">
                        <Link href="/portfolio" className="text-[#E5C687] hover:underline font-bold uppercase text-[10px]">
                          Add Pins +
                        </Link>
                        <span className="text-[10px] text-[#F2E7D8]/50 uppercase">
                          Active board
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* DIGITAL RECEIPT MODAL OVERLAY */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-[#1F1713]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="glass-card border border-[#E5C687]/30 shadow-2xl rounded-3xl p-6 md:p-8 max-w-md w-full relative my-8 animate-scale-in text-white font-poppins">
            <button
              onClick={() => setActiveReceipt(null)}
              className="absolute top-4 right-4 text-[#F2E7D8]/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-col items-center text-center gap-2 border-b border-[rgba(229,198,135,0.15)] pb-5 mb-5">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <Camera size={18} className="text-[#1F1713]" />
              </div>
              <h3 className="font-playfair text-xl font-bold">LensCraft Studio</h3>
              <p className="text-[9px] uppercase tracking-widest text-[#E5C687]">Chennai · Tamil Nadu</p>
            </div>

            {/* Receipt Parameters */}
            <div className="flex flex-col gap-3 text-xs font-light font-inter">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E5C687] mb-1">
                Receipt Details
              </span>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Booking ID:</span>
                <span className="font-mono text-white font-semibold">{activeReceipt.id}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Customer Name:</span>
                <span className="font-semibold text-white">{activeReceipt.coupleName}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Photography Package:</span>
                <span className="font-semibold text-[#E5C687]">{activeReceipt.packageName}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Booking Date:</span>
                <span className="font-semibold text-white">{activeReceipt.date}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Amount Paid:</span>
                <span className="font-semibold text-white">₹{activeReceipt.totalPaid?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Payment Method:</span>
                <span className="font-semibold text-white">{activeReceipt.paymentMethod || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Transaction ID:</span>
                <span className="font-mono text-white text-[11px]">{activeReceipt.transactionId || "N/A"}</span>
              </div>
              
              <div className="text-[10px] text-[#F2E7D8]/40 text-center leading-relaxed mt-4 bg-[#1F1713]/40 p-3 rounded-xl border border-[rgba(229,198,135,0.05)]">
                Anna Nagar East, Chennai, Tamil Nadu — 600 102<br />
                hello@lenscraft.studio | +91 98400 12345
              </div>
            </div>

            {/* Download Receipt Actions */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="flex-grow py-3 rounded-xl border border-[rgba(229,198,135,0.3)] hover:bg-[#4B3628]/45 text-[#E5C687] text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Download Receipt
              </button>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="px-6 py-3 rounded-xl gold-gradient text-[#1F1713] text-xs font-bold hover:opacity-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
