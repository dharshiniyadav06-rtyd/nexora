"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CalculatorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/packages#calculator");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1F1713] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <span className="w-6 h-6 border-2 border-[#E5C687] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#F2E7D8]/60 font-light">Redirecting to Packages & Calculator...</p>
      </div>
    </div>
  );
}
