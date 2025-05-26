"use client";

import { useEffect, useRef } from "react";
import { VideoParallax } from "../ui/VideoParallax";
import { motion, useScroll } from "framer-motion";

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error: Error) => {
        console.error("Video play failed:", error);
      });
    }
  }, []);

  const { scrollY } = useScroll();

  return (
    <>
      {/* Main Welcome Section */}
      <section className="relative min-h-screen bg-white flex items-center justify-center py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8 transition-all duration-1500 ">
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
            <motion.div className="transition-all duration-1500 delay-300 ">
              <div className="relative">
                <img
                  src="/house1.jpg"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section with Consultation Content Inside */}
      <section className=" sticky top-40 overflow-hidden">
        <VideoParallax
          scrollY={scrollY}
          title="Your Title"
          description="Your description"
          mediaItems={[
            {
              type: "video",
              src: "/sky4.mp4",
              alt: "sky4",
            },
          ]}
          className="bg-white "
        />
      </section>
    </>
  );
}
