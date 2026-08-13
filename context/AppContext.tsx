"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Booking {
  id: string;
  coupleName: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  venue: string;
  guestCount: number;
  coverageHours: number;
  packageName: string;
  price: string;
  status: "Pending Approval" | "Awaiting Deposit" | "Confirmed" | "Editing In Progress" | "Completed" | "Cancelled";
  paymentStatus: "Pending" | "Partially Paid" | "Paid" | "Refunded";
  addOns: string[];
  creditsEarned: number;
  creditsRedeemed: number;
  transactionId?: string;
  paymentMethod?: string;
  paymentReference?: string;
  totalPaid: number;
}

export interface User {
  name: string;
  email: string;
  role: "Customer" | "Admin";
}

export interface Referral {
  id: string;
  friendName: string;
  email: string;
  date: string;
  status: "Invited" | "Completed";
  creditsEarned: number;
}

export interface RewardCampaign {
  id: string;
  name: string;
  multiplier: number; // e.g. 2 for double credits
  description: string;
  isActive: boolean;
  expiry: string;
}

export interface RewardConfig {
  silverCredits: number;
  goldCredits: number;
  platinumCredits: number;
  signatureCredits: number;
  creditValueInRupees: number; // e.g. 1 credit = ₹10
}

interface AppContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "status" | "paymentStatus" | "creditsEarned" | "creditsRedeemed" | "totalPaid">) => void;
  addBookingWithPayment: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  updatePaymentStatus: (id: string, paymentStatus: Booking["paymentStatus"]) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  user: User | null;
  login: (email: string, role?: "Customer" | "Admin") => void;
  logout: () => void;
  inspirationCollections: { [key: string]: string[] };
  createCollection: (name: string) => void;
  saveToCollection: (collectionName: string, imageId: string) => void;
  // Rewards & Referrals state
  rewardsBalance: number;
  rewardsEarned: number;
  rewardsRedeemed: number;
  referrals: Referral[];
  referralCode: string;
  rewardConfig: RewardConfig;
  campaigns: RewardCampaign[];
  updateRewardConfig: (config: Partial<RewardConfig>) => void;
  addCampaign: (campaign: Omit<RewardCampaign, "id">) => void;
  toggleCampaign: (id: string) => void;
  redeemCredits: (amount: number) => void;
  earnCredits: (amount: number) => void;
  addReferral: (friendName: string, email: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inspirationCollections, setInspirationCollections] = useState<{ [key: string]: string[] }>({
    "Dream Wedding": [],
    "Pose Ideas": [],
  });

  // Rewards & Referrals state
  const [rewardsBalance, setRewardsBalance] = useState<number>(350); // Initial welcome credits + some booking activity
  const [rewardsEarned, setRewardsEarned] = useState<number>(550);
  const [rewardsRedeemed, setRewardsRedeemed] = useState<number>(200);
  const [referrals, setReferrals] = useState<Referral[]>([
    { id: "REF-101", friendName: "Karthik Raja", email: "karthik.r@example.com", date: "2026-06-10", status: "Completed", creditsEarned: 150 },
    { id: "REF-102", friendName: "Sandhya Sen", email: "sandhya@example.com", date: "2026-07-02", status: "Invited", creditsEarned: 0 }
  ]);
  const [referralCode, setReferralCode] = useState<string>("ANANYA500");

  const [rewardConfig, setRewardConfig] = useState<RewardConfig>({
    silverCredits: 200,
    goldCredits: 350,
    platinumCredits: 500,
    signatureCredits: 750,
    creditValueInRupees: 10 // 1 credit = ₹10
  });

  const [campaigns, setCampaigns] = useState<RewardCampaign[]>([
    { id: "CAMP-1", name: "Margazhi Festival double credits", multiplier: 2, description: "Earn double credits on all bookings made in December & January.", isActive: true, expiry: "2026-12-31" },
    { id: "CAMP-2", name: "Early Booking Bonus", multiplier: 1.5, description: "Book 6 months in advance to receive 1.5x credits.", isActive: false, expiry: "2026-09-30" }
  ]);

  // Synchronize bookings with SQLite API
  useEffect(() => {
    const fetchBookings = async () => {
      if (!isLoggedIn || !user) {
        setBookings([]);
        return;
      }
      try {
        const url = user.role === 'Admin' ? '/api/bookings' : `/api/bookings?email=${encodeURIComponent(user.email)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const mappedBookings: Booking[] = data.map((b: any) => {
            let notesObj: any = {};
            try {
              notesObj = JSON.parse(b.notes || '{}');
            } catch (e) {
              console.error('Failed to parse booking notes JSON:', e);
            }
            
            return {
              id: b.id,
              coupleName: b.customer_name,
              email: b.customer_email,
              phone: b.customer_phone,
              eventType: b.event_type,
              date: b.booking_date,
              venue: b.location,
              packageName: b.package_id ? b.package_id.replace('pkg-', '').replace(/^\w/, (c: string) => c.toUpperCase()) : 'Custom',
              price: b.total_amount,
              status: b.booking_status,
              paymentStatus: b.payment_status,
              guestCount: notesObj.guestCount || 0,
              coverageHours: notesObj.coverageHours || 0,
              addOns: notesObj.addOns || [],
              creditsEarned: notesObj.creditsEarned || 0,
              creditsRedeemed: notesObj.creditsRedeemed || 0,
              totalPaid: notesObj.totalPaid || 0,
              transactionId: notesObj.transactionId || '',
              paymentMethod: notesObj.paymentMethod || '',
              paymentReference: notesObj.paymentReference || ''
            };
          });
          setBookings(mappedBookings);
        }
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };
    fetchBookings();
  }, [isLoggedIn, user]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addBooking = async (bookingData: Omit<Booking, "id" | "status" | "paymentStatus" | "creditsEarned" | "creditsRedeemed" | "totalPaid">) => {
    // Determine reward credit earnings based on config and active campaigns
    let baseCredits = 350;
    if (bookingData.packageName === "Silver") baseCredits = rewardConfig.silverCredits;
    else if (bookingData.packageName === "Gold") baseCredits = rewardConfig.goldCredits;
    else if (bookingData.packageName === "Platinum") baseCredits = rewardConfig.platinumCredits;
    else if (bookingData.packageName === "Signature") baseCredits = rewardConfig.signatureCredits;

    const activeMultiplier = campaigns
      .filter((c) => c.isActive)
      .reduce((max, c) => (c.multiplier > max ? c.multiplier : max), 1);

    const creditsEarnedVal = baseCredits * activeMultiplier;

    const newBooking: Booking = {
      ...bookingData,
      id: `LC-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Pending Approval",
      paymentStatus: "Pending",
      creditsEarned: creditsEarnedVal,
      creditsRedeemed: 0,
      totalPaid: 0
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (res.ok) {
        setBookings((prev) => [newBooking, ...prev]);
        setRewardsEarned((prev) => prev + creditsEarnedVal);
        setRewardsBalance((prev) => prev + creditsEarnedVal);
      }
    } catch (error) {
      console.error('Failed to create booking in DB:', error);
    }
  };

  const addBookingWithPayment = async (newBooking: Booking) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (res.ok) {
        setBookings((prev) => [newBooking, ...prev]);
        setRewardsEarned((prev) => prev + newBooking.creditsEarned);
        setRewardsBalance((prev) => prev + newBooking.creditsEarned - newBooking.creditsRedeemed);
        setRewardsRedeemed((prev) => prev + newBooking.creditsRedeemed);
      }
    } catch (error) {
      console.error('Failed to create booking with payment in DB:', error);
    }
  };

  const updateBookingStatus = async (id: string, status: Booking["status"]) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((booking) => (booking.id === id ? { ...booking, status } : booking))
        );
      }
    } catch (error) {
      console.error('Failed to update booking status in DB:', error);
    }
  };

  const updatePaymentStatus = async (id: string, paymentStatus: Booking["paymentStatus"]) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus })
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((booking) => (booking.id === id ? { ...booking, paymentStatus } : booking))
        );
      }
    } catch (error) {
      console.error('Failed to update payment status in DB:', error);
    }
  };

  const login = (email: string, role: "Customer" | "Admin" = "Customer") => {
    setIsLoggedIn(true);
    setUser({
      name: role === "Admin" ? "Super Admin" : "Ananya Sharma",
      email,
      role,
    });
    // Set customized referral code for the user
    if (role !== "Admin") {
      setReferralCode(email.split("@")[0].toUpperCase() + Math.floor(100 + Math.random() * 900));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const createCollection = (name: string) => {
    if (!inspirationCollections[name]) {
      setInspirationCollections((prev) => ({
        ...prev,
        [name]: [],
      }));
    }
  };

  const saveToCollection = (collectionName: string, imageId: string) => {
    setInspirationCollections((prev) => {
      const current = prev[collectionName] || [];
      if (!current.includes(imageId)) {
        return {
          ...prev,
          [collectionName]: [...current, imageId],
        };
      }
      return prev;
    });
  };

  const updateRewardConfig = (config: Partial<RewardConfig>) => {
    setRewardConfig((prev) => ({ ...prev, ...config }));
  };

  const addCampaign = (campaign: Omit<RewardCampaign, "id">) => {
    const newCamp: RewardCampaign = {
      ...campaign,
      id: `CAMP-${Math.floor(10 + Math.random() * 90)}`
    };
    setCampaigns((prev) => [...prev, newCamp]);
  };

  const toggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const redeemCredits = (amount: number) => {
    setRewardsBalance((prev) => Math.max(0, prev - amount));
    setRewardsRedeemed((prev) => prev + amount);
  };

  const earnCredits = (amount: number) => {
    setRewardsEarned((prev) => prev + amount);
    setRewardsBalance((prev) => prev + amount);
  };

  const addReferral = (friendName: string, email: string) => {
    const newRef: Referral = {
      id: `REF-${Math.floor(100 + Math.random() * 900)}`,
      friendName,
      email,
      date: new Date().toISOString().split("T")[0],
      status: "Invited",
      creditsEarned: 0
    };
    setReferrals((prev) => [...prev, newRef]);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        bookings,
        addBooking,
        addBookingWithPayment,
        updateBookingStatus,
        updatePaymentStatus,
        isLoggedIn,
        setIsLoggedIn,
        user,
        login,
        logout,
        inspirationCollections,
        createCollection,
        saveToCollection,
        // Rewards & Referrals values
        rewardsBalance,
        rewardsEarned,
        rewardsRedeemed,
        referrals,
        referralCode,
        rewardConfig,
        campaigns,
        updateRewardConfig,
        addCampaign,
        toggleCampaign,
        redeemCredits,
        earnCredits,
        addReferral
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
