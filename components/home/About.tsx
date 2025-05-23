"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoContainerRef.current || !videoRef.current) return;

      const rect = videoContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate when element enters and exits viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Start effect when element is about to enter viewport
      const startPoint = windowHeight;
      const endPoint = -elementHeight;

      // Calculate scroll progress (0 to 1)
      const totalDistance = startPoint - endPoint;
      const currentProgress = startPoint - elementTop;
      const scrollProgress = Math.max(
        0,
        Math.min(1, currentProgress / totalDistance)
      );

      // Smooth easing function
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(scrollProgress);

      // Simple scale effect - starts smaller and scales to normal size
      const minScale = 1;
      const maxScale = 1.3;
      const scaleValue = minScale + (maxScale - minScale) * easedProgress;

      // Subtle parallax movement
      const parallaxOffset = (scrollProgress - 0.5) * 20;

      // Apply transformations
      if (videoRef.current) {
        videoRef.current.style.transform = `
          translateY(${parallaxOffset}px) 
          scale(${scaleValue})
        `;
        videoRef.current.style.transition = "transform 0.1s ease-out";
      }
    };

    // Throttled scroll handler for smooth performance
    let rafId: number;
    const throttledHandler = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledHandler, { passive: true });

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandler);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      {/* Main Welcome Section */}
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-white flex items-center justify-center py-20 px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side - Text Content */}
            <div
              className={`space-y-8 transition-all duration-1500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <div className="space-y-6">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight"
                  style={{
                    fontWeight: "200",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Welcome to SparkHouse Limited
                </h1>

                <div className="w-16 h-px bg-gradient-to-r from-green-600 via-green-600/60 to-transparent"></div>

                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-light text-black/80 leading-tight"
                  style={{
                    fontWeight: "300",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Where We Build Your Visions
                </h2>
              </div>

              <div className="max-w-lg">
                <p
                  className="text-base md:text-lg text-black/60 leading-relaxed"
                  style={{
                    fontWeight: "300",
                    lineHeight: "1.6",
                    letterSpacing: "0.005em",
                  }}
                >
                  Established over a decade ago, Sparkhouse Designs &
                  Construction has been a cornerstone of innovative
                  architectural solutions. In 2017, we formalized our operations
                  as a corporate organization in Nigeria, while maintaining our
                  core ethos of delivering timeless structures and support
                  services within the AEC industry.
                </p>
              </div>

              <div className="pt-8">
                <div className="space-y-4">
                  <h3
                    className="text-lg font-light text-black"
                    style={{
                      fontWeight: "300",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    📋 Book A Consultation today
                  </h3>
                  <button className="group relative px-8 py-3 bg-transparent border border-green-600/30 text-green-600 font-light text-base hover:border-green-600 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></div>
                    <span
                      className="relative z-10 group-hover:text-white transition-colors duration-700"
                      style={{
                        fontWeight: "300",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Book Now
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div
              className={`transition-all duration-1500 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <div className="relative">
                <img
                  src="/api/placeholder/600/400"
                  alt="Architectural plans and tools"
                  className="w-full h-auto shadow-lg"
                  style={{
                    aspectRatio: "3/2",
                    objectFit: "cover",
                  }}
                />
                {/* Refined accent border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-green-600/20 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section with Consultation Content Inside */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            ref={videoContainerRef}
            className="relative w-full aspect-video overflow-hidden"
            style={{
              aspectRatio: "16/9",
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{
                transformOrigin: "center center",
              }}
            >
              <source src="/sky4.mp4" type="video/mp4" />
            </video>

            {/* Refined overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Consultation Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl md:px-8 px-2">
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-light  mb-3 md:mb-6 leading-tight"
                  style={{
                    fontWeight: "200",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Get Your Free Consultation
                </h3>

                <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-4 md:mb-8"></div>

                <p
                  className="text-base md:text-lg lg:text-xl mb-4 md:mb-8 leading-relaxed text-white/80"
                  style={{
                    fontWeight: "300",
                    lineHeight: "1.6",
                    letterSpacing: "0.005em",
                  }}
                >
                  Unlock the potential of your next project with a complimentary
                  consultation from SparkHouse Limited. Our expert team is ready
                  to listen to your ideas, provide insights, and tailor
                  solutions to your needs.
                </p>

                <button className="group relative px-4 py-2 md:px-10 md:py-4 bg-transparent border border-white/30 text-white font-light text-base md:text-lg hover:border-white transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></div>
                  <span
                    className="relative z-10 group-hover:text-green-900 transition-colors duration-700 uppercase tracking-wide"
                    style={{
                      fontWeight: "300",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Book an Appointment
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
