"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Sparkles, X, ShieldCheck, CreditCard, Wallet, QrCode, ArrowRight, Download, CheckCircle2 } from "lucide-react";

// Simulated date slot data generator
const getSlotDetails = (dateStr: string) => {
  const hash = dateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const dayNum = parseInt(dateStr.split("-")[2], 10) || 1;
  
  if (dayNum % 7 === 0) {
    return { status: "Holiday", team: "Studio Closed", responseTime: "N/A", slots: [] };
  }
  
  if (hash % 3 === 0) {
    return {
      status: "Booked",
      team: "All Crews Allocated",
      responseTime: "N/A",
      slots: []
    };
  }
  
  if (hash % 5 === 0) {
    return {
      status: "Limited",
      team: "Bronze Crew (Lead + 1 Candid)",
      responseTime: "Under 15 mins",
      slots: ["10:00 AM - 02:00 PM"]
    };
  }
  
  return {
    status: "Available",
    team: "Elite Gold Crew (2 Candid + 1 Traditional)",
    responseTime: "Instant Confirmation",
    slots: ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM", "06:30 PM - 10:30 PM"]
  };
};

const TODAY_STR = "2026-07-20";

export default function CalendarPage() {
  const router = useRouter();
  const {
    addBookingWithPayment,
    isLoggedIn,
    user,
    rewardsBalance,
    redeemCredits,
    rewardConfig
  } = useApp();

  const [currentMonth, setCurrentMonth] = useState(6); // July (0-indexed 6)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState("2026-07-22");
  const [selectedSlot, setSelectedSlot] = useState("09:00 AM - 01:00 PM");

  // Client Details Form State
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [packageName, setPackageName] = useState("Gold");

  // Checkout Modal State
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Additional Services selected in Checkout
  const [calcDrone, setCalcDrone] = useState(false);
  const [calcPreWedding, setCalcPreWedding] = useState(false);
  const [calcExpress, setCalcExpress] = useState(false);

  // Rewards redemption choice
  const [redeemCreditsApplied, setRedeemCreditsApplied] = useState(0);

  // Payment choice
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Generated Details on success
  const [bookingId, setBookingId] = useState("");
  const [txnId, setTxnId] = useState("");
  const [refId, setRefId] = useState("");
  const [finalCalculatedTotal, setFinalCalculatedTotal] = useState(0);

  // Confetti Particle state
  const [confetti, setConfetti] = useState<{ id: number; left: string; color: string; delay: string; size: string; duration: string; rotate: string }[]>([]);

  const activeSlot = getSlotDetails(selectedDate);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    const colors = ["#E5C687", "#D4AF37", "#C68A7A", "#A97142", "#4B3628", "#3A271C"];
    const pieces = Array.from({ length: 80 }).map((_, i) => {
      const size = Math.random() * 8 + 6;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 0.8}s`,
        size: `${size}px`,
        duration: `${Math.random() * 2 + 2}s`,
        rotate: `${Math.random() * 360}deg`
      };
    });
    setConfetti(pieces);
  };

  const handleOpenCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) return;
    
    // Auto populate details from user session if logged in
    if (isLoggedIn && user) {
      if (!email) setEmail(user.email);
    }
    
    setShowCheckout(true);
  };

  // Live calculation of receipt items
  const basePrices: { [key: string]: number } = {
    Silver: 120000,
    Gold: 220000,
    Platinum: 350000,
    Signature: 500000
  };

  const basePrice = basePrices[packageName] || 220000;
  const droneCost = calcDrone ? 15000 : 0;
  const preWeddingCost = calcPreWedding ? 25000 : 0;
  const expressCost = calcExpress ? 15000 : 0;

  const subtotalBeforeRedemption = basePrice + droneCost + preWeddingCost + expressCost;
  const discountAmount = redeemCreditsApplied * (rewardConfig?.creditValueInRupees || 10);
  const subtotal = Math.max(0, subtotalBeforeRedemption - discountAmount);
  const gstTax = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gstTax;

  // Process Booking with payment checkout
  const handleProcessPayment = () => {
    setIsProcessing(true);
    
    // Simulate gateway handshakes
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckout(false);

      const generatedBId = `LC-${Math.floor(1000 + Math.random() * 9000)}`;
      const generatedTxn = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const generatedRef = `REF-${paymentMethod}-${Math.floor(100000 + Math.random() * 900000)}`;

      setBookingId(generatedBId);
      setTxnId(generatedTxn);
      setRefId(generatedRef);
      setFinalCalculatedTotal(totalAmount);

      // Determine credits to earn based on package
      let creditsEarned = 350;
      if (packageName === "Silver") creditsEarned = 200;
      else if (packageName === "Gold") creditsEarned = 350;
      else if (packageName === "Platinum") creditsEarned = 500;
      else if (packageName === "Signature") creditsEarned = 750;

      // Add to global state
      addBookingWithPayment({
        id: generatedBId,
        coupleName: clientName,
        email: email || "client@example.com",
        phone,
        eventType,
        date: selectedDate,
        venue: "Taj Connemara, Chennai",
        guestCount: 250,
        coverageHours: packageName === "Silver" ? 6 : 12,
        packageName,
        price: `₹${totalAmount.toLocaleString()}`,
        status: "Confirmed",
        paymentStatus: "Paid",
        addOns: [
          ...(calcDrone ? ["Drone Coverage"] : []),
          ...(calcPreWedding ? ["Pre-Wedding Shoot"] : []),
          ...(calcExpress ? ["Express Delivery"] : []),
          selectedSlot
        ],
        creditsEarned,
        creditsRedeemed: redeemCreditsApplied,
        transactionId: generatedTxn,
        paymentMethod: paymentMethod,
        paymentReference: generatedRef,
        totalPaid: totalAmount
      });

      // Deduct redeemed credits from context
      if (redeemCreditsApplied > 0) {
        redeemCredits(redeemCreditsApplied);
      }

      setShowSuccess(true);
      triggerConfetti();
    }, 2000);
  };

  const handleDownloadReceipt = () => {
    // Simulated PDF receipt generation alert
    alert(`Downloading receipt for booking ${bookingId}...\nSaved as LensCraft_Receipt_${bookingId}.pdf`);
  };

  const resetForm = () => {
    setShowSuccess(false);
    setClientName("");
    setPhone("");
    setEmail("");
    setCalcDrone(false);
    setCalcPreWedding(false);
    setCalcExpress(false);
    setRedeemCreditsApplied(0);
    setConfetti([]);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Generate calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Sunday=0, Monday=1...
  
  // Shift index so Monday is first
  const emptyCells = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const calendarGrid: (number | null)[] = [];
  for (let i = 0; i < emptyCells; i++) {
    calendarGrid.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarGrid.push(i);
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDateStr = (day: number) => {
    const y = currentYear;
    const m = currentMonth + 1;
    const d = day;
    return `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
  };

  const isPastDate = (dateStr: string) => {
    return dateStr < TODAY_STR;
  };

  // Pre-select default time slot when selectedDate changes
  useEffect(() => {
    const slotDetails = getSlotDetails(selectedDate);
    if (slotDetails.slots.length > 0) {
      setSelectedSlot(slotDetails.slots[0]);
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12 font-poppins selection:bg-[#E5C687] selection:text-[#1F1713] relative">
      
      {/* Confetti Particles */}
      {showSuccess && confetti.map((p) => (
        <span
          key={p.id}
          className="confetti-piece animate-confetti"
          style={{
            left: p.left,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate})`,
            top: "-10px",
          }}
        />
      ))}

      {/* Header */}
      <div className="flex flex-col gap-3 mt-10 text-center md:text-left">
        <span className="text-xs tracking-[0.2em] font-semibold text-[#E5C687] uppercase">
          Studio Bookings
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight text-white">
          Availability Calendar
        </h1>
        <p className="max-w-2xl text-sm text-[#F2E7D8]/80 leading-relaxed font-light font-inter">
          Select available dates directly from our color-coded calendar. We disable past dates and fully booked slots to save your time. Match with your preferred photographer team instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle - Interactive Month Grid (2/3 width) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-cards flex flex-col gap-6 border border-[rgba(229,198,135,0.15)] shadow-2xl">
          <div className="flex justify-between items-center border-b border-[rgba(229,198,135,0.15)] pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={prevMonth}
                className="w-9 h-9 rounded-xl bg-[#4B3628] border border-[rgba(229,198,135,0.2)] flex items-center justify-center text-[#E5C687] hover:bg-[#E5C687] hover:text-[#1F1713] transition-all duration-300"
              >
                <ChevronLeft size={16} />
              </button>
              <h3 className="font-playfair text-xl font-bold text-white min-w-[150px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button
                onClick={nextMonth}
                className="w-9 h-9 rounded-xl bg-[#4B3628] border border-[rgba(229,198,135,0.2)] flex items-center justify-center text-[#E5C687] hover:bg-[#E5C687] hover:text-[#1F1713] transition-all duration-300"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <span className="text-[10px] text-[#E5C687] uppercase tracking-widest font-semibold bg-[#E5C687]/10 px-3 py-1 rounded-full border border-[rgba(229,198,135,0.2)]">
              Live Studio Slots
            </span>
          </div>

          {/* Color Indicators Legend */}
          <div className="flex flex-wrap gap-5 text-xs font-light text-[#F2E7D8]/80 bg-[#1F1713]/40 p-4 rounded-xl border border-[rgba(229,198,135,0.05)]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#4F7C57] border border-[#4F7C57]/50 shadow-[0_0_8px_rgba(79,124,87,0.4)]" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#E5C687] border border-[#E5C687]/50 shadow-[0_0_8px_rgba(229,198,135,0.4)]" />
              <span>Limited Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#C94C4C] border border-[#C94C4C]/50 shadow-[0_0_8px_rgba(201,76,76,0.4)]" />
              <span>Fully Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#F2E7D8]/30 border border-transparent" />
              <span>Holiday / Closed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-transparent border border-[#F2E7D8]/30 opacity-40" />
              <span>Past Dates</span>
            </div>
          </div>

          {/* Monthly Calendar Grid Layout */}
          <div className="flex flex-col gap-3 mt-2">
            {/* Days header */}
            <div className="grid grid-cols-7 text-center text-[10px] uppercase font-bold tracking-wider text-[#E5C687] border-b border-[rgba(229,198,135,0.15)] pb-3">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-2.5 text-center text-xs font-semibold select-none">
              {calendarGrid.map((day, idx) => {
                if (day === null) {
                  return <div key={idx} className="aspect-square" />;
                }

                const dateStr = getDateStr(day);
                const slot = getSlotDetails(dateStr);
                const isSelected = selectedDate === dateStr;
                const isPast = isPastDate(dateStr);
                
                let statusBg = "border-[rgba(229,198,135,0.15)] hover:border-[#E5C687] text-white";
                let dotColor = "bg-[#4F7C57]";
                let isUnavailable = false;

                if (slot.status === "Limited") {
                  dotColor = "bg-[#E5C687]";
                } else if (slot.status === "Booked") {
                  dotColor = "bg-[#C94C4C]";
                  isUnavailable = true;
                } else if (slot.status === "Holiday") {
                  dotColor = "bg-[#F2E7D8]/40";
                  statusBg = "bg-[#4B3628]/20 border-transparent text-[#F2E7D8]/30 cursor-not-allowed";
                  isUnavailable = true;
                }

                if (isPast) {
                  statusBg = "border-transparent text-white/20 cursor-not-allowed opacity-40";
                }

                const isDisabled = isPast || isUnavailable;

                return (
                  <button
                    key={idx}
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedDate(dateStr);
                      }
                    }}
                    className={`aspect-square flex flex-col items-center justify-between p-2 rounded-xl border transition-all ${
                      isSelected
                        ? "border-[#E5C687] bg-[#4B3628]/80 scale-105 shadow-[0_0_15px_rgba(229,198,135,0.25)] text-[#E5C687]"
                        : statusBg
                    }`}
                  >
                    <span className="font-medium text-xs sm:text-sm">{day}</span>
                    {!isPast && slot.status !== "Holiday" && (
                      <span className={`w-2 h-2 rounded-full ${dotColor} ${slot.status === 'Limited' ? 'animate-pulse' : ''}`} />
                    )}
                    {slot.status === "Holiday" && !isPast && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2E7D8]/20" />
                    )}
                    {isPast && (
                      <span className="w-1 h-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Selected Date Details & Booking Form */}
        <div className="flex flex-col gap-6">
          
          {/* Selected Date Details Card */}
          <div className="glass-card p-6 rounded-cards flex flex-col gap-4 border border-[rgba(229,198,135,0.15)] shadow-2xl">
            <h4 className="font-playfair text-base font-bold text-white border-b border-[rgba(229,198,135,0.15)] pb-3 uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#E5C687]" /> Date Information
            </h4>
            
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.08)] pb-2">
                <span className="text-[#F2E7D8]/65">Selected Date</span>
                <span className="font-semibold text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.08)] pb-2">
                <span className="text-[#F2E7D8]/65">Availability Status</span>
                <span
                  className={`font-semibold uppercase tracking-wider text-[10px] ${
                    activeSlot.status === "Available"
                      ? "text-[#4F7C57]"
                      : activeSlot.status === "Limited"
                      ? "text-[#E5C687] animate-pulse"
                      : "text-[#C94C4C]"
                  }`}
                >
                  {activeSlot.status === "Available"
                    ? "Photographer Available"
                    : activeSlot.status === "Limited"
                    ? "Limited Slots Left"
                    : activeSlot.status === "Holiday"
                    ? "Studio Holiday"
                    : "Fully Booked"}
                </span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.08)] pb-2">
                <span className="text-[#F2E7D8]/65">Photographer Crew</span>
                <span className="font-semibold text-[#E5C687] text-[11px] text-right italic max-w-[180px] truncate">
                  {activeSlot.team}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F2E7D8]/65">Est. Response Time</span>
                <span className="font-semibold text-white text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#E5C687]" /> {activeSlot.responseTime}
                </span>
              </div>
            </div>

            {/* Time Slot Picker for Booking */}
            {activeSlot.status !== "Holiday" && activeSlot.status !== "Booked" && (
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[#E5C687]">
                  Select Available Time Slot
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {activeSlot.slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSlot(s)}
                      className={`px-3 py-2.5 rounded-lg border text-xs text-left transition-all ${
                        selectedSlot === s
                          ? "border-[#E5C687] bg-[#4B3628] text-[#E5C687] font-semibold"
                          : "border-[rgba(229,198,135,0.15)] bg-[#1F1713]/40 text-[#F2E7D8]/70 hover:border-[#E5C687]/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Consultation Enquiry Form */}
          {activeSlot.status !== "Holiday" && activeSlot.status !== "Booked" && (
            <div className="glass-card p-6 rounded-cards flex flex-col gap-4 border border-[rgba(229,198,135,0.15)] shadow-2xl">
              <h4 className="font-playfair text-base font-bold text-white border-b border-[rgba(229,198,135,0.15)] pb-3 uppercase tracking-wider">
                Book Consultation
              </h4>

              <form onSubmit={handleOpenCheckout} className="flex flex-col gap-4 text-xs font-light">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E5C687] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E5C687] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1F1713]/60 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E5C687] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all cursor-pointer"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Reception">Reception</option>
                      <option value="Haldi">Mehendi/Haldi</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687]">
                      Package
                    </label>
                    <select
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className="bg-[#1F1713]/80 border border-[rgba(229,198,135,0.2)] px-3 py-2.5 rounded-xl text-white focus:outline-none focus:border-[#E5C687] transition-all cursor-pointer"
                    >
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Signature">Signature</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold gold-gradient text-[#1F1713] hover:opacity-95 hover:scale-[1.02] shadow-[0_4px_15px_rgba(229,198,135,0.3)] transition-all duration-300 mt-2"
                >
                  Request Consultation
                </button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* ONLINE CHECKOUT OVERLAY MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-[#1F1713]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="glass-card border border-[#E5C687]/30 shadow-2xl rounded-3xl p-6 md:p-8 max-w-2xl w-full relative my-8 animate-scale-in text-white">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-[#F2E7D8]/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-1 border-b border-[rgba(229,198,135,0.15)] pb-4 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E5C687]" /> Secure Booking Checkout
              </span>
              <h3 className="font-playfair text-2xl font-bold">Review & Pay Deposit</h3>
              <p className="text-xs text-[#F2E7D8]/60 font-light mt-0.5">Please review your booking summary and select a payment gateway method.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Summary Details */}
              <div className="flex flex-col gap-4 bg-[#1F1713]/40 p-5 rounded-2xl border border-[rgba(229,198,135,0.08)]">
                <h4 className="text-xs uppercase font-bold text-[#E5C687] tracking-wider border-b border-[rgba(229,198,135,0.1)] pb-2">
                  Booking Summary
                </h4>
                <div className="flex flex-col gap-2.5 text-xs font-light">
                  <div className="flex justify-between">
                    <span className="opacity-60">Package:</span>
                    <span className="font-semibold text-white">{packageName} Tier</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Booking Date:</span>
                    <span className="font-semibold text-white">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Time Slot:</span>
                    <span className="font-semibold text-white">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between border-b border-[rgba(229,198,135,0.1)] pb-2">
                    <span className="opacity-60">Event Type:</span>
                    <span className="font-semibold text-white">{eventType}</span>
                  </div>

                  {/* Additional Addon services inside checkout */}
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687] mt-1.5">
                    Customize Add-ons
                  </span>
                  <div className="flex flex-col gap-2 text-[11px] text-[#F2E7D8]/90">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={calcDrone}
                        onChange={(e) => setCalcDrone(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-[rgba(229,198,135,0.2)] bg-[#1F1713] accent-[#E5C687] cursor-pointer"
                      />
                      Aerial Drone Coverage (+₹15K)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={calcPreWedding}
                        onChange={(e) => setCalcPreWedding(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-[rgba(229,198,135,0.2)] bg-[#1F1713] accent-[#E5C687] cursor-pointer"
                      />
                      Pre-Wedding Couple Shoot (+₹25K)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={calcExpress}
                        onChange={(e) => setCalcExpress(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-[rgba(229,198,135,0.2)] bg-[#1F1713] accent-[#E5C687] cursor-pointer"
                      />
                      Express 10-Day Delivery (+₹15K)
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Methods & Rewards Redemption */}
              <div className="flex flex-col gap-5">
                {/* Rewards Redemption Block */}
                <div className="bg-[#4B3628]/35 border border-[rgba(229,198,135,0.15)] p-4 rounded-2xl flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C687] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5C687]" /> LensCraft Rewards
                  </span>
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#F2E7D8]/65">Available Credits:</span>
                        <span className="font-bold text-[#E5C687]">{rewardsBalance} Credits</span>
                      </div>
                      {rewardsBalance >= 100 ? (
                        <div className="flex flex-col gap-1.5 mt-1">
                          <span className="text-[9px] text-[#F2E7D8]/50">Choose credits to redeem:</span>
                          <div className="flex gap-2">
                            {[100, 200, 350].map((c) => {
                              if (c > rewardsBalance) return null;
                              return (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => setRedeemCreditsApplied(redeemCreditsApplied === c ? 0 : c)}
                                  className={`flex-1 py-1 px-2 rounded text-[10px] font-semibold border transition-all ${
                                    redeemCreditsApplied === c
                                      ? "bg-[#E5C687] text-[#1F1713] border-[#E5C687]"
                                      : "border-[rgba(229,198,135,0.3)] text-[#E5C687] hover:bg-[#4B3628]"
                                  }`}
                                >
                                  {c} (Save ₹{c * 10})
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[10px] text-[#F2E7D8]/50 italic">Earn 200+ credits upon successful booking completion.</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-[10px] text-[#F2E7D8]/60 leading-relaxed font-light">
                      Log in to redeem accumulated rewards credits for package discounts or album upgrades.
                    </p>
                  )}
                </div>

                {/* Payment Gateway selectors */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2E7D8]/70">
                    Select Payment Gateway Method
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("UPI")}
                      className={`px-3 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                        paymentMethod === "UPI"
                          ? "border-[#E5C687] bg-[#4B3628] text-[#E5C687]"
                          : "border-[rgba(229,198,135,0.15)] bg-[#1F1713]/40 text-[#F2E7D8]/60 hover:border-[#E5C687]/40"
                      }`}
                    >
                      <QrCode size={14} /> UPI (GPay/PhonePe)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Card")}
                      className={`px-3 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                        paymentMethod === "Card"
                          ? "border-[#E5C687] bg-[#4B3628] text-[#E5C687]"
                          : "border-[rgba(229,198,135,0.15)] bg-[#1F1713]/40 text-[#F2E7D8]/60 hover:border-[#E5C687]/40"
                      }`}
                    >
                      <CreditCard size={14} /> Credit / Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Banking")}
                      className={`px-3 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                        paymentMethod === "Banking"
                          ? "border-[#E5C687] bg-[#4B3628] text-[#E5C687]"
                          : "border-[rgba(229,198,135,0.15)] bg-[#1F1713]/40 text-[#F2E7D8]/60 hover:border-[#E5C687]/40"
                      }`}
                    >
                      <Wallet size={14} /> Net Banking
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Wallet")}
                      className={`px-3 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                        paymentMethod === "Wallet"
                          ? "border-[#E5C687] bg-[#4B3628] text-[#E5C687]"
                          : "border-[rgba(229,198,135,0.15)] bg-[#1F1713]/40 text-[#F2E7D8]/60 hover:border-[#E5C687]/40"
                      }`}
                    >
                      <Wallet size={14} /> Wallets (Paytm)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Calculations breakdown invoice list */}
            <div className="w-full bg-[#1F1713]/60 p-5 border border-[rgba(229,198,135,0.12)] rounded-2xl text-xs font-light flex flex-col gap-2 mt-6 font-inter">
              <div className="flex justify-between">
                <span className="opacity-70">Base Package Fee ({packageName}):</span>
                <span className="font-semibold text-white">₹{basePrice.toLocaleString()}</span>
              </div>
              {(calcDrone || calcPreWedding || calcExpress) && (
                <div className="flex justify-between">
                  <span className="opacity-70">Add-on Custom Services:</span>
                  <span className="font-semibold text-white">₹{(droneCost + preWeddingCost + expressCost).toLocaleString()}</span>
                </div>
              )}
              {redeemCreditsApplied > 0 && (
                <div className="flex justify-between text-[#4F7C57]">
                  <span className="opacity-70">Loyalty Credits Discount ({redeemCreditsApplied} Redeemed):</span>
                  <span className="font-semibold">-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="opacity-70">Subtotal:</span>
                <span className="font-semibold text-white">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.1)] pb-2">
                <span className="opacity-70">GST (18% applicable):</span>
                <span className="font-semibold text-white">₹{gstTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-1">
                <span className="text-[#E5C687]">Grand Total Amount:</span>
                <span className="text-white">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-[#F2E7D8]/50">
                <ShieldCheck className="w-4 h-4 text-[#4F7C57]" /> PCI-DSS Compliant Gateway · SSL Secure
              </div>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleProcessPayment}
                className="w-full sm:w-auto gold-gradient text-[#1F1713] px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-[0_4px_15px_rgba(229,198,135,0.4)] flex items-center justify-center gap-2 hover:opacity-95"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#1F1713] border-t-transparent rounded-full animate-spin" />
                    Authorizing Gateway...
                  </>
                ) : (
                  <>
                    Pay & Request Booking <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FINAL SUCCESS SCREEN & DIGITAL RECEIPT */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-[#1F1713]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="glass-card border border-[#E5C687]/30 shadow-2xl rounded-3xl p-6 md:p-8 max-w-md w-full relative my-8 animate-scale-in text-center text-white">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-[#F2E7D8]/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Premium success badge check animation */}
            <div className="relative mb-4 inline-block">
              <div className="absolute inset-0 bg-[#4F7C57]/20 rounded-full blur-xl animate-pulse" />
              <div className="bg-[#1F1713] border-2 border-[#4F7C57] p-3 rounded-full text-[#4F7C57] relative z-10 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>

            <h3 className="font-playfair text-2xl font-bold text-white">Payment Confirmed!</h3>
            <p className="text-xs text-[#F2E7D8]/80 leading-relaxed font-light font-inter mt-1.5">
              Your transaction was successfully authorized. We have allocated the booking slot for <span className="font-bold text-[#E5C687]">{selectedDate}</span>.
            </p>

            {/* DIGITAL RECEIPT CARD */}
            <div className="w-full bg-[#1F1713]/60 p-5 border border-[rgba(229,198,135,0.15)] rounded-2xl text-xs font-light text-left flex flex-col gap-2 mt-6 font-inter">
              <span className="text-[9px] uppercase tracking-wider font-bold text-[#E5C687] border-b border-[rgba(229,198,135,0.1)] pb-1.5">
                Digital Receipt
              </span>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Booking ID:</span>
                <span className="font-mono text-white font-semibold">{bookingId}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Customer Name:</span>
                <span className="font-semibold text-white">{clientName}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Package Tier:</span>
                <span className="font-semibold text-[#E5C687]">{packageName}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Booking Date:</span>
                <span className="font-semibold text-white">{selectedDate}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Amount Paid:</span>
                <span className="font-semibold text-white">₹{finalCalculatedTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Payment Method:</span>
                <span className="font-semibold text-white">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(229,198,135,0.06)] pb-1.5">
                <span className="text-[#F2E7D8]/60">Transaction ID:</span>
                <span className="font-mono text-white text-[11px]">{txnId}</span>
              </div>
              <div className="flex justify-between text-[10px] text-[#F2E7D8]/40 pt-1">
                <span>Studio:</span>
                <span>LensCraft Studio, Chennai, TN</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="flex-1 py-3 rounded-xl border border-[rgba(229,198,135,0.3)] hover:bg-[#4B3628]/45 text-[#E5C687] text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Download Receipt
              </button>
              <button
                type="button"
                onClick={() => { setShowSuccess(false); router.push("/dashboard"); }}
                className="flex-1 py-3 rounded-xl gold-gradient text-[#1F1713] text-xs font-bold hover:opacity-95 shadow-md"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
