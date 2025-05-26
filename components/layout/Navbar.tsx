/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Compact Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="group flex items-center space-x-2 sm:space-x-3"
              >
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl sm:rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 flex items-center justify-center shadow-2xl shadow-emerald-500/25">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-7 lg:h-7 bg-white rounded-md lg:rounded-lg transform rotate-45 group-hover:rotate-0 transition-transform duration-700"></div>
                  </div>
                  <div className="absolute inset-0 bg-emerald-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700"></div>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm sm:text-lg lg:text-2xl font-bold tracking-tight transition-colors duration-500 ${
                      isScrolled ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Spark House
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-light tracking-wider transition-colors duration-500 ${
                      isScrolled ? "text-emerald-600" : "text-white/80"
                    }`}
                  >
                    LIMITED
                  </span>
                </div>
              </a>
            </div>

            {/* Compact Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`group relative overflow-hidden px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-4 rounded-full transition-all duration-700 ease-out ${
                isMenuOpen
                  ? "bg-emerald-500 shadow-2xl shadow-emerald-500/30 scale-105"
                  : isScrolled
                  ? "bg-white hover:bg-gray-50 shadow-xl shadow-black/10 border border-gray-100"
                  : "bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20"
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex flex-col space-y-1">
                  <div
                    className={`w-4 h-0.5 sm:w-5 sm:h-0.5 rounded-full transition-all duration-500 ${
                      isMenuOpen
                        ? "bg-white rotate-45 translate-y-1.5"
                        : isScrolled
                        ? "bg-gray-700"
                        : "bg-white"
                    }`}
                  ></div>
                  <div
                    className={`w-4 h-0.5 sm:w-5 sm:h-0.5 rounded-full transition-all duration-500 ${
                      isMenuOpen
                        ? "bg-white opacity-0"
                        : isScrolled
                        ? "bg-gray-700 opacity-100"
                        : "bg-white opacity-100"
                    }`}
                  ></div>
                  <div
                    className={`w-4 h-0.5 sm:w-5 sm:h-0.5 rounded-full transition-all duration-500 ${
                      isMenuOpen
                        ? "bg-white -rotate-45 -translate-y-1.5"
                        : isScrolled
                        ? "bg-gray-700"
                        : "bg-white"
                    }`}
                  ></div>
                </div>
                <span
                  className={`text-xs sm:text-sm font-medium tracking-wide transition-all duration-500 ${
                    isMenuOpen
                      ? "text-white"
                      : isScrolled
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                >
                  {isMenuOpen ? "CLOSE" : "MENU"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile-Optimized Full Screen Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-1000 ease-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Glassmorphism Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-green-900/85 to-emerald-950/95"></div>
          <div className="absolute inset-0 backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800/10 via-transparent to-green-700/15"></div>
        </div>

        {/* Geometric Accents - Adjusted for Mobile */}
        <div className="absolute inset-0 overflow-hidden opacity-8">
          <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-green-400/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Mobile-First Menu Layout */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Compact Header */}
          <div className="flex-shrink-0 pt-20 pb-4 sm:pt-24 sm:pb-6 lg:pt-32 lg:pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
              <div
                className={`transition-all duration-1200 ease-out ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <h1 className="text-lg sm:text-xl lg:text-3xl xl:text-4xl font-light text-white/90 tracking-wide mb-2">
                  Where Innovation
                </h1>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-extralight text-emerald-200 tracking-wider">
                  Meets Excellence
                </p>
              </div>
            </div>
          </div>

          {/* Main Content - Stacked Layout for Mobile */}
          <div className="flex-1 flex items-start sm:items-center min-h-0 overflow-y-auto">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start lg:items-center">
                {/* Navigation Menu - Full Width on Mobile */}
                <div className="w-full lg:col-span-7 order-1">
                  <nav className="space-y-2 sm:space-y-3 lg:space-y-6">
                    {menuItems.map((item, index) => (
                      <div
                        key={item.name}
                        className={`transition-all duration-1000 ease-out ${
                          isMenuOpen
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-20"
                        }`}
                        style={{ transitionDelay: `${index * 150 + 400}ms` }}
                      >
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group block py-2 sm:py-3 lg:py-4 border-b border-emerald-200/10 hover:border-emerald-200/30 transition-all duration-500"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              {/* Mobile Icons */}
                              <div className="lg:hidden w-5 h-5 flex items-center justify-center">
                                {item.name === "Home" && (
                                  <svg
                                    className="w-4 h-4 text-emerald-200/70 group-hover:text-emerald-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                  </svg>
                                )}
                                {item.name === "About" && (
                                  <svg
                                    className="w-4 h-4 text-emerald-200/70 group-hover:text-emerald-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                )}
                                {item.name === "Services" && (
                                  <svg
                                    className="w-4 h-4 text-emerald-200/70 group-hover:text-emerald-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                )}
                                {item.name === "Projects" && (
                                  <svg
                                    className="w-4 h-4 text-emerald-200/70 group-hover:text-emerald-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                  </svg>
                                )}
                                {item.name === "Contact" && (
                                  <svg
                                    className="w-4 h-4 text-emerald-200/70 group-hover:text-emerald-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light text-white group-hover:text-emerald-200 transition-all duration-500 group-hover:translate-x-2">
                                {item.name}
                              </span>
                            </div>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full border border-emerald-300/30 group-hover:border-emerald-200 group-hover:bg-emerald-200/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
                              <svg
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-emerald-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Contact & Info Section - Compact for Mobile */}
                <div className="w-full lg:col-span-5 order-2 mt-4 lg:mt-0">
                  <div
                    className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-1200 ease-out ${
                      isMenuOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-20"
                    }`}
                    style={{ transitionDelay: "800ms" }}
                  >
                    {/* Contact Information */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-px sm:w-12 sm:h-px bg-gradient-to-r from-emerald-300/60 to-transparent"></div>
                        <h3 className="text-xs sm:text-sm font-medium text-emerald-100/70 tracking-widest uppercase">
                          Contact
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="group cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <span className="text-base">📧</span>
                            <div>
                              <p className="text-xs text-emerald-200/60 tracking-wide uppercase">
                                Email
                              </p>
                              <p className="text-sm sm:text-base lg:text-lg text-white group-hover:text-emerald-200 transition-colors duration-300">
                                info@sparkhouselimited.ng
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <span className="text-base">📱</span>
                            <div>
                              <p className="text-xs text-emerald-200/60 tracking-wide uppercase">
                                Phone
                              </p>
                              <p className="text-sm sm:text-base lg:text-lg text-white group-hover:text-emerald-200 transition-colors duration-300">
                                08088035933
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-px sm:w-12 sm:h-px bg-gradient-to-r from-green-300/60 to-transparent"></div>
                        <h3 className="text-xs sm:text-sm font-medium text-emerald-100/70 tracking-widest uppercase">
                          Location
                        </h3>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-base mt-0.5">📍</span>
                        <div className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
                          <p>No.5 Plus Uchendu Street,</p>
                          <p>NTA Road, Port Harcourt</p>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-px sm:w-12 sm:h-px bg-gradient-to-r from-emerald-400/60 to-transparent"></div>
                        <h3 className="text-xs sm:text-sm font-medium text-emerald-100/70 tracking-widest uppercase">
                          Follow
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { name: "Facebook", icon: "📘" },
                          { name: "LinkedIn", icon: "💼" },
                          { name: "Instagram", icon: "📷" },
                        ].map((social, index) => (
                          <a
                            key={social.name}
                            href="#"
                            className={`flex items-center space-x-1 text-xs sm:text-sm text-emerald-200/70 hover:text-white transition-all duration-500 hover:scale-110 ${
                              isMenuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }`}
                            style={{
                              transitionDelay: `${1200 + index * 100}ms`,
                            }}
                          >
                            <span>{social.icon}</span>
                            <span className="hidden sm:inline">
                              {social.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Footer */}
          <div className="flex-shrink-0 py-4 sm:py-6 lg:py-8">
            <div
              className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center transition-all duration-1000 ease-out ${
                isMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="text-2xl sm:text-4xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black text-white/[0.03] tracking-tighter leading-none select-none">
                SPARK HOUSE
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
