/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Background blur effect when scrolled
      setIsScrolled(currentScrollY > 50);

      // Parallax effect for menu background
      if (parallaxRef.current && isMenuOpen) {
        const parallaxY = currentScrollY * 0.5;
        parallaxRef.current.style.transform = `translateY(${parallaxY}px)`;
      }

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
  }, [isMenuOpen]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMenuOpen) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    if (isMenuOpen) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About Company", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "What We Have Done", href: "/projects" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out py-2 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-white/90 backdrop-blur-2xl " : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 lg:h-24">
            {/* Enhanced Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="group flex items-center space-x-2 sm:space-x-3"
              >
                {/* Geometric Logo */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                  <div className="w-full h-full bg-emerald-500 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white rounded-md transform rotate-45 group-hover:rotate-0 transition-transform duration-500"></div>
                  </div>
                  <div className="absolute inset-0 bg-emerald-500 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide transition-colors duration-300 ${
                      isScrolled ? "text-emerald-600" : "text-white"
                    }`}
                    style={{
                      fontWeight: "700",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Spark House
                  </span>
                  <span
                    className={`text-xs sm:text-xs md:text-sm font-light tracking-wider transition-colors duration-300 ${
                      isScrolled ? "text-emerald-500/70" : "text-white/70"
                    }`}
                    style={{
                      fontWeight: "300",
                      letterSpacing: "0.15em",
                    }}
                  >
                    LIMITED
                  </span>
                </div>
              </a>
            </div>

            {/* Enhanced Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`group relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full transition-all duration-500 ${
                isMenuOpen
                  ? "bg-emerald-500 shadow-2xl shadow-emerald-500/50 scale-110"
                  : isScrolled
                  ? "bg-emerald-50 hover:bg-emerald-100 shadow-lg"
                  : "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              }`}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col space-y-1 sm:space-y-1.5">
                <div
                  className={`w-5 sm:w-6 h-0.5 transition-all duration-500 origin-center ${
                    isMenuOpen
                      ? "bg-white rotate-45 translate-y-1.5 sm:translate-y-2 scale-110"
                      : isScrolled
                      ? "bg-emerald-600 group-hover:scale-110"
                      : "bg-white group-hover:scale-110"
                  }`}
                ></div>
                <div
                  className={`w-5 sm:w-6 h-0.5 transition-all duration-500 ${
                    isMenuOpen
                      ? "bg-white opacity-0 scale-0"
                      : isScrolled
                      ? "bg-emerald-600 group-hover:scale-110 opacity-100"
                      : "bg-white group-hover:scale-110 opacity-100"
                  }`}
                ></div>
                <div
                  className={`w-5 sm:w-6 h-0.5 transition-all duration-500 origin-center ${
                    isMenuOpen
                      ? "bg-white -rotate-45 -translate-y-1.5 sm:-translate-y-2 scale-110"
                      : isScrolled
                      ? "bg-emerald-600 group-hover:scale-110"
                      : "bg-white group-hover:scale-110"
                  }`}
                ></div>
              </div>

              <span
                className={`absolute -bottom-5 sm:-bottom-6 text-xs font-light transition-all duration-300 ${
                  isMenuOpen
                    ? "opacity-0 translate-y-2"
                    : isScrolled
                    ? "opacity-60 text-emerald-600"
                    : "opacity-60 text-white"
                }`}
                style={{
                  letterSpacing: "0.1em",
                }}
              >
                MENU
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Immersive Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-1000 ease-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Dynamic Background with Parallax */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 scale-110"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${
              mousePosition.y * 0.5
            }px) scale(1.1)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated Parallax Background Elements */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.3}px, ${
                mousePosition.y * 0.3
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-white rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
              transform: `translate(${mousePosition.x * -0.2}px, ${
                mousePosition.y * -0.2
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
          <div
            className="absolute top-3/4 left-3/4 w-48 sm:w-64 h-48 sm:h-64 bg-white rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "2s",
              transform: `translate(${mousePosition.x * 0.4}px, ${
                mousePosition.y * 0.4
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
        </div>

        {/* Menu Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-20">
          <div className="text-center space-y-6 sm:space-y-8 md:space-y-12 w-full max-w-4xl">
            {/* Welcome Text */}
            <div
              className={`transition-all duration-1000 ${
                isMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white/80 mb-4 sm:mb-6 md:mb-8 px-4"
                style={{
                  fontWeight: "300",
                  letterSpacing: "0.05em",
                }}
              >
                Where innovation meets excellence
              </h2>
            </div>

            {/* Enhanced Menu Items - Responsive Sizing */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {menuItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`transition-all duration-1000 ${
                    isMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 300}ms` }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group relative inline-block w-full"
                  >
                    <div className="relative overflow-hidden py-2 sm:py-3 md:py-4 ">
                      <span
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-light text-white hover:text-emerald-100 transition-all duration-700 hover:translate-x-4 sm:hover:translate-x-6 md:hover:translate-x-8 block transform hover:scale-105"
                        style={{
                          fontWeight: "200",
                          letterSpacing: "-0.01em",
                          transform: `translate(${mousePosition.x * 0.1}px, ${
                            mousePosition.y * 0.05
                          }px)`,
                        }}
                      >
                        {item.name}
                      </span>

                      {/* Enhanced animated underline */}
                      <div className="absolute bottom-1 sm:bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-white/0 via-white/60 to-white/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-lg"></div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Enhanced Contact Info - Mobile Optimized */}
            <div
              className={`pt-8 sm:pt-12 md:pt-16 lg:pt-20 space-y-6 sm:space-y-8 transition-all duration-1000 ${
                isMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${menuItems.length * 150 + 600}ms` }}
            >
              {/* Elegant divider */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/20 rounded-full"></div>
                <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-white/30"></div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-12 max-w-2xl mx-auto px-4">
                <div className="space-y-3 text-center md:text-left">
                  <h3
                    className="text-xs sm:text-sm font-light text-white/60 tracking-widest"
                    style={{
                      letterSpacing: "0.2em",
                    }}
                  >
                    CONTACT INFO
                  </h3>
                  <div className="space-y-2">
                    <p
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-2 transform break-all"
                      style={{
                        fontWeight: "300",
                      }}
                    >
                      info@sparkhouselimited.ng
                    </p>
                    <p
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-2 transform"
                      style={{
                        fontWeight: "300",
                      }}
                    >
                      08088035933
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-center md:text-left">
                  <h3
                    className="text-xs sm:text-sm font-light text-white/60 tracking-widest"
                    style={{
                      letterSpacing: "0.2em",
                    }}
                  >
                    LOCATION
                  </h3>
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed"
                    style={{
                      fontWeight: "300",
                      lineHeight: "1.6",
                    }}
                  >
                    No.5 Plus Uchendu Street,
                    <br />
                    NTA Road, Port Harcourt
                  </p>
                </div>
              </div>

              {/* Social Links - Mobile Optimized */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 pt-6 sm:pt-8 px-4">
                {["Facebook", "LinkedIn", "Instagram"].map((social, index) => (
                  <a
                    key={social}
                    href="#"
                    className={`group text-xs sm:text-sm md:text-base text-white/50 hover:text-white transition-all duration-500 hover:translate-y-[-4px] hover:scale-110 ${
                      isMenuOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      fontWeight: "300",
                      letterSpacing: "0.1em",
                      transitionDelay: `${
                        menuItems.length * 150 + 800 + index * 100
                      }ms`,
                    }}
                  >
                    <span className="relative">
                      {social.toUpperCase()}
                      <div className="absolute -bottom-1 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Background Text with Parallax */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) translate(${
              mousePosition.x * 0.1
            }px, ${mousePosition.y * 0.1}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className={`text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[24rem] xl:text-[30rem] 2xl:text-[40rem] font-black text-white/[0.02] sm:text-white/[0.03] leading-none select-none transition-all duration-1500 ${
              isMenuOpen
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 rotate-20"
            }`}
            style={{
              fontWeight: "900",
              letterSpacing: "-0.08em",
              whiteSpace: "nowrap",
            }}
          >
            SPARK HOUSE
          </div>
        </div>
      </div>
    </>
  );
}
