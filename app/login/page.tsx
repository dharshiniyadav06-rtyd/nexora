"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { Camera, Mail, Lock, Eye, EyeOff, Sparkles, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"Customer" | "Admin">("Customer");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (role === "Admin") {
      setLoading(true);
      fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(d => { throw new Error(d.error || 'Invalid credentials') });
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setSuccess(true);
        login(email, "Admin");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "Failed to log in.");
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        login(email, role);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }, 1500);
    }
  };

  const handleGuestLogin = () => {
    login("guest@lenscraft.com", "Customer");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1F1713] font-poppins text-white selection:bg-[#E5C687] selection:text-[#1F1713]">
      
      {/* Left Screen - Cinematic Banner (60% Desktop) */}
      <div className="hidden md:flex md:w-3/5 bg-cover bg-center relative items-center justify-center p-12 overflow-hidden"
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200')` }}>
        {/* Luxury Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1713]/90 via-black/40 to-black/30" />
        
        {/* Quote Context */}
        <div className="relative z-10 text-white max-w-lg text-center flex flex-col items-center gap-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-8 h-8 text-[#E5C687]" />
            <span className="font-playfair text-2xl tracking-[0.2em] font-semibold uppercase text-[#E5C687]">
              LensCraft
            </span>
          </div>
          
          <h2 className="font-cormorant text-4xl lg:text-5xl italic font-light leading-relaxed text-[#F2E7D8]">
            &ldquo;Every Love Story Deserves To Be Remembered Forever.&rdquo;
          </h2>
          
          <div className="w-16 h-[1px] bg-[#E5C687]" />
          
          <p className="text-xs uppercase tracking-[0.2em] text-[#E5C687] font-bold">
            Premium Wedding Photography & Films
          </p>
        </div>
      </div>

      {/* Right Screen - Glassmorphism Login Card (40% Desktop) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-16 relative bg-[#1F1713]">
        {/* Mobile Header Banner */}
        <div className="md:hidden absolute inset-x-0 top-0 h-40 bg-cover bg-center"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800')` }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
            <Camera className="w-6 h-6 text-[#E5C687]" />
            <h1 className="font-playfair tracking-[0.2em] text-lg font-semibold uppercase text-[#E5C687]">LENSCRAFT</h1>
          </div>
        </div>

        <div className="w-full max-w-md glass-card border border-[rgba(229,198,135,0.15)] shadow-2xl rounded-cards p-8 md:p-10 backdrop-blur-md relative mt-28 md:mt-0 animate-scale-in">
          <div className="flex flex-col gap-2 mb-8">
            <h3 className="font-playfair text-2xl font-bold tracking-wide text-white">
              Welcome to the Studio
            </h3>
            <p className="text-xs text-[#F2E7D8]/80">
              Enter your credentials to access your luxury client portfolio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Role Select tab */}
            <div className="flex border border-[rgba(229,198,135,0.2)] rounded-xl p-1 bg-[#1F1713]/80">
              <button
                type="button"
                onClick={() => setRole("Customer")}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                  role === "Customer" ? "gold-gradient text-[#1F1713] font-bold shadow-sm" : "text-[#F2E7D8]/60 hover:text-white"
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setRole("Admin")}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                  role === "Admin" ? "gold-gradient text-[#1F1713] font-bold shadow-sm" : "text-[#F2E7D8]/60 hover:text-white"
                }`}
              >
                Studio Admin
              </button>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-[#F2E7D8]/60 font-semibold">
                Email Address
              </label>
              <div className="flex items-center border border-[rgba(229,198,135,0.2)] rounded-xl px-3 bg-[#1F1713]/60 focus-within:border-[#E5C687] transition-all">
                <Mail className="w-4 h-4 text-[#F2E7D8]/50 mr-2" />
                <input
                  type="email"
                  placeholder="ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3.5 text-xs bg-transparent focus:outline-none text-white placeholder-white/20"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-wider text-[#F2E7D8]/60 font-semibold">
                  Password
                </label>
                <span className="text-[10px] text-[#E5C687] hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="flex items-center border border-[rgba(229,198,135,0.2)] rounded-xl px-3 bg-[#1F1713]/60 focus-within:border-[#E5C687] transition-all">
                <Lock className="w-4 h-4 text-[#F2E7D8]/50 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3.5 text-xs bg-transparent focus:outline-none text-white placeholder-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#F2E7D8]/50 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-3.5 h-3.5 rounded border-[rgba(229,198,135,0.3)] bg-[#1F1713] accent-[#E5C687] cursor-pointer"
              />
              <label htmlFor="remember" className="text-[10px] text-[#F2E7D8]/65 cursor-pointer select-none">
                Remember this device for 30 days
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#C94C4C]/10 border border-[#C94C4C]/25 text-[#C94C4C] text-xs px-3 py-2 rounded-lg font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="gold-gradient text-[#1F1713] py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-[0_4px_15px_rgba(229,198,135,0.3)] hover:opacity-95 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#1F1713] border-t-transparent rounded-full animate-spin" />
              ) : success ? (
                <span className="flex items-center gap-1 font-bold">
                  <CheckCircle className="w-4 h-4 text-[#1F1713]" /> Authenticated
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-bold">
                  Access Studio <Sparkles className="w-3.5 h-3.5 text-[#1F1713]" />
                </span>
              )}
            </button>
          </form>

          {/* Guest login & Switch */}
          <div className="mt-8 flex flex-col items-center gap-4 text-xs text-[#F2E7D8]/60 border-t border-[rgba(229,198,135,0.15)] pt-6">
            <button
              onClick={handleGuestLogin}
              className="text-[#E5C687] hover:text-[#D4AF37] font-bold tracking-wider uppercase text-[10.5px] transition-colors"
            >
              Continue as Guest
            </button>
            <p className="text-[9px] text-center text-[#F2E7D8]/50 leading-relaxed">
              By accessing LensCraft, you agree to our Terms of Service and Privacy Policy. All images are copyrighted with watermark protections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
