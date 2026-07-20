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

  // Load initial simulated data
  useEffect(() => {
    setBookings([
      {
        id: "LC-1024",
        coupleName: "Ananya & Rahul",
        email: "ananya@example.com",
        phone: "+91 98400 12345",
        eventType: "Wedding",
        date: "2026-08-15",
        venue: "Taj Lake Palace, Udaipur",
        guestCount: 350,
        coverageHours: 12,
        packageName: "Platinum",
        price: "₹3,50,000",
        status: "Editing In Progress",
        paymentStatus: "Paid",
        addOns: ["Drone Coverage", "Live Streaming"],
        creditsEarned: 500,
        creditsRedeemed: 200,
        transactionId: "TXN-98218201",
        paymentMethod: "Credit Card",
        paymentReference: "REF-CC-829102",
        totalPaid: 350000
      },
      {
        id: "LC-1025",
        coupleName: "Meera & Vikram",
        email: "meera.v@example.com",
        phone: "+91 99887 76655",
        eventType: "Engagement",
        date: "2026-09-22",
        venue: "Leela Palace, Bengaluru",
        guestCount: 150,
        coverageHours: 6,
        packageName: "Gold",
        price: "₹1,80,000",
        status: "Confirmed",
        paymentStatus: "Partially Paid",
        addOns: ["Pre-Wedding Shoot"],
        creditsEarned: 350,
        creditsRedeemed: 0,
        transactionId: "TXN-71928120",
        paymentMethod: "UPI (GPay)",
        paymentReference: "REF-UPI-018274",
        totalPaid: 90000
      }
    ]);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addBooking = (bookingData: Omit<Booking, "id" | "status" | "paymentStatus" | "creditsEarned" | "creditsRedeemed" | "totalPaid">) => {
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

    const priceNum = parseInt(bookingData.price.replace(/[^0-9]/g, ""), 10) || 0;

    const newBooking: Booking = {
      ...bookingData,
      id: `LC-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Pending Approval",
      paymentStatus: "Pending",
      creditsEarned: creditsEarnedVal,
      creditsRedeemed: 0,
      totalPaid: 0
    };
    setBookings((prev) => [newBooking, ...prev]);

    // Automatically add credits when completed, but let's log the earnings projection
    setRewardsEarned((prev) => prev + creditsEarnedVal);
    setRewardsBalance((prev) => prev + creditsEarnedVal);
  };

  const addBookingWithPayment = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    
    // Add reward credits to client profile balance on successful checkout
    setRewardsEarned((prev) => prev + newBooking.creditsEarned);
    setRewardsBalance((prev) => prev + newBooking.creditsEarned - newBooking.creditsRedeemed);
    setRewardsRedeemed((prev) => prev + newBooking.creditsRedeemed);
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, status } : booking))
    );
  };

  const updatePaymentStatus = (id: string, paymentStatus: Booking["paymentStatus"]) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === id ? { ...booking, paymentStatus } : booking))
    );
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
