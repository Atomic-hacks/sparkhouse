"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const sparkHouseParallaxRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      footerObserver.disconnect();
    };
  }, []);

  // Dramatic SPARK HOUSE parallax effect with top-to-center drop
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const viewportHeight = window.innerHeight;

      if (sparkHouseParallaxRef.current) {
        const rect = sparkHouseParallaxRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;

        // Start the effect much earlier for more dramatic entrance
        const startPoint = elementTop - viewportHeight * 1.5;
        const endPoint = elementTop + elementHeight * 0.5;

        if (scrolled >= startPoint && scrolled <= endPoint) {
          const progress = (scrolled - startPoint) / (endPoint - startPoint);
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
          const easedProgress = easeOutCubic(
            Math.max(0, Math.min(1, progress))
          );

          // Dramatic drop from top: starts at -400px, ends at 0px
          const translateY = -400 + easedProgress * 400;
          // Scale grows as it drops
          const scale = 0.7 + easedProgress * 0.4;
          // Opacity fades in dramatically
          const opacity = easedProgress * 0.25;
          // Add rotation for extra drama
          const rotate = (1 - easedProgress) * 5;

          sparkHouseParallaxRef.current.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
          sparkHouseParallaxRef.current.style.opacity = opacity.toString();
        } else if (scrolled < startPoint) {
          // Before the effect starts, keep it hidden at the top
          sparkHouseParallaxRef.current.style.transform = `translateY(-400px) scale(0.7) rotate(5deg)`;
          sparkHouseParallaxRef.current.style.opacity = "0";
        }
      }
    };

    let rafId: number;
    const throttledHandler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledHandler, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer className="relative bg-green-700 text-white overflow-hidden min-h-screen">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-600/20 via-emerald-800 to-emerald-600 pointer-events-none"></div>
      {/* Dramatic Parallax Background Text */}
      <div
        ref={sparkHouseParallaxRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{
          transformOrigin: "center center",
          transform:
            "translateY(-800px) translateZ(-400px) scale(0.5) rotate(5deg)",
          opacity: 0,
        }}
      >
        <div className="text-center">
          <div
            className="text-[10rem] md:text-[20rem]  font-black text-white/[0.3] leading-tight"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "900",
              letterSpacing: "-0.08em",
              whiteSpace: "nowrap",
              textShadow: "0 0 100px rgba(255,255,255,0.1)",
            }}
          >
            SPARK
          </div>
          <div
            className="text-[10rem] md:text-[20rem]  font-black text-white/[0.3] leading-tight -mt-16 md:-mt-24 lg:-mt-32 xl:-mt-40"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "900",
              letterSpacing: "-0.08em",
              whiteSpace: "nowrap",
              textShadow: "0 0 100px rgba(255,255,255,0.1)",
            }}
          >
            HOUSE
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div
          className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-32 lg:py-40 relative z-20"
          style={{ minHeight: "80vh" }}
        >
          <div
            ref={footerRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
          >
            {/* Left Side - Welcome Message */}
            <div className="lg:col-span-4">
              <div
                className={`space-y-8 transition-all duration-1500 ${
                  isFooterVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <img src="/logo.jpg" alt="logo" className="w-14 md:w-20" />
                  <span
                    className="text-2xl font-bold text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    Spark House Limited
                  </span>
                </div>

                <p
                  className="text-lg text-white/90 leading-relaxed"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "400",
                    lineHeight: "1.6",
                  }}
                >
                  Welcome to Spark House Limited, where innovation meets
                  excellence in construction and project management.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { name: "Facebook", icon: "f" },
                    { name: "Twitter", icon: "t" },
                    { name: "Google", icon: "G" },
                    { name: "LinkedIn", icon: "in" },
                  ].map((social, index) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`w-10 h-10 bg-white/10 hover:bg-white hover:text-emerald-500 flex items-center justify-center rounded transition-all duration-300 ${
                        isFooterVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${300 + index * 100}ms`,
                      }}
                    >
                      <span className="text-sm font-bold">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle - Our Company */}
            <div className="lg:col-span-3">
              <div
                className={`space-y-6 transition-all duration-1500 delay-200 ${
                  isFooterVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
              >
                <h3
                  className="text-2xl font-bold text-white"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Our Company
                </h3>
                <div className="space-y-4">
                  {[
                    "Who We Are",
                    "About Company",
                    "Services We Provide",
                    "What We Have Done",
                  ].map((link, index) => (
                    <a
                      key={link}
                      href="#"
                      className={`block text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 ${
                        isFooterVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "400",
                        transitionDelay: `${400 + index * 50}ms`,
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <div
                className={`space-y-6 transition-all duration-1500 delay-300 ${
                  isFooterVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
              >
                <h3
                  className="text-2xl font-bold text-white"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Our Services
                </h3>
                <div className="space-y-4">
                  {[
                    "Architecture",
                    "Exterior Design",
                    "Landscape Design",
                    "Site Planning",
                  ].map((service, index) => (
                    <a
                      key={service}
                      href="#"
                      className={`block text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 ${
                        isFooterVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "400",
                        transitionDelay: `${500 + index * 50}ms`,
                      }}
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-3">
              <div
                className={`space-y-6 transition-all duration-1500 delay-400 ${
                  isFooterVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
              >
                <h3
                  className="text-2xl font-bold text-white"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p
                      className="text-white/90 leading-relaxed"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "400",
                        lineHeight: "1.6",
                      }}
                    >
                      No.5 Plus Uchendu Street, NTA Road, Port Harcourt
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-white/90 hover:text-white transition-colors duration-300 cursor-pointer"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      08088035933
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-white/90 hover:text-white transition-colors duration-300 cursor-pointer"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      info@sparkhouselimited.ng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20">
          <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-6">
            <div
              className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-all duration-1500 delay-600 ${
                isFooterVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <span
                  className="text-sm text-white/80"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Copyright © 2025 Spark House Limited
                </span>
              </div>

              <div>
                <span
                  className="text-sm text-white/80"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Powered by Spark House Limited
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
