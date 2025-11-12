"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const FloatingConsultationCta = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 220);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="/contact#consultation"
      className={`fixed bottom-20 left-6 z-40 inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-xl transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      Book Consultation Now
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
};

export default FloatingConsultationCta;
