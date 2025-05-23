"use client";

import { useEffect, useRef, useState } from "react";

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesListRef = useRef<HTMLDivElement>(null);
  const parallaxContainer1Ref = useRef<HTMLDivElement>(null);
  const parallaxContainer2Ref = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isProcessVisible, setIsProcessVisible] = useState(false);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const processObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProcessVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (servicesListRef.current)
      servicesObserver.observe(servicesListRef.current);
    if (processRef.current) processObserver.observe(processRef.current);

    return () => {
      heroObserver.disconnect();
      servicesObserver.disconnect();
      processObserver.disconnect();
    };
  }, []);

  // Continuous parallax effect for multiple sections
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const viewportHeight = window.innerHeight;

      // First parallax section
      if (parallaxContainer1Ref.current) {
        const rect1 = parallaxContainer1Ref.current.getBoundingClientRect();
        const elementTop1 = rect1.top + scrolled;
        const elementHeight1 = rect1.height;

        // Extended range for continuous effect
        const startPoint1 = elementTop1 - viewportHeight * 1.5;
        const endPoint1 = elementTop1 + elementHeight1 + viewportHeight;

        if (scrolled >= startPoint1 && scrolled <= endPoint1) {
          const progress1 =
            (scrolled - startPoint1) / (endPoint1 - startPoint1);
          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const easedProgress1 = easeInOutCubic(
            Math.max(0, Math.min(1, progress1))
          );

          // Continuous movement throughout scroll
          const translateY1 = (easedProgress1 - 0.5) * -120;
          const scale1 = 0.92 + Math.sin(easedProgress1 * Math.PI) * 0.15;
          const opacity1 = 0.4 + Math.sin(easedProgress1 * Math.PI) * 0.6;

          parallaxContainer1Ref.current.style.transform = `translateY(${translateY1}px) scale(${scale1})`;
          parallaxContainer1Ref.current.style.opacity = opacity1.toString();

          // Layer children with different speeds
          const children1 = parallaxContainer1Ref.current.children;
          Array.from(children1).forEach((child, index) => {
            const childOffset =
              translateY1 +
              Math.sin((easedProgress1 + index * 0.2) * Math.PI) * 30;
            const childRotate = Math.sin(easedProgress1 * Math.PI * 2) * 2;
            (
              child as HTMLElement
            ).style.transform = `translateY(${childOffset}px) rotate(${childRotate}deg)`;
          });
        }
      }

      // Second parallax section with different behavior
      if (parallaxContainer2Ref.current) {
        const rect2 = parallaxContainer2Ref.current.getBoundingClientRect();
        const elementTop2 = rect2.top + scrolled;
        const elementHeight2 = rect2.height;

        const startPoint2 = elementTop2 - viewportHeight * 1.2;
        const endPoint2 = elementTop2 + elementHeight2 + viewportHeight * 0.8;

        if (scrolled >= startPoint2 && scrolled <= endPoint2) {
          const progress2 =
            (scrolled - startPoint2) / (endPoint2 - startPoint2);
          const easeOutExpo = (t: number) =>
            t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const easedProgress2 = easeOutExpo(
            Math.max(0, Math.min(1, progress2))
          );

          // Different movement pattern
          const translateY2 = Math.sin(easedProgress2 * Math.PI * 1.5) * -80;
          const scale2 = 0.96 + easedProgress2 * 0.08;
          const skew = Math.sin(easedProgress2 * Math.PI) * 1.5;

          parallaxContainer2Ref.current.style.transform = `translateY(${translateY2}px) scale(${scale2}) skewY(${skew}deg)`;
          parallaxContainer2Ref.current.style.opacity = (
            0.3 +
            easedProgress2 * 0.7
          ).toString();
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

  const services = [
    {
      title: "Building Renovation Services",
      description:
        "Exterior/interior remodeling, landscape remodeling, and comprehensive project management to transform your spaces.",
      number: "01",
      subServices: [
        "Exterior/Interior Remodeling",
        "Landscape Remodeling",
        "Project Management",
      ],
    },
    {
      title: "Consulting Services",
      description:
        "Expert guidance from government approvals to facility management, supporting your project at every stage.",
      number: "02",
      subServices: [
        "Government Approval/Permits",
        "Project Support Services",
        "Facility Management",
        "Real Estate Development/Management",
        "Training Services",
      ],
    },
    {
      title: "Project Documentary",
      description:
        "Comprehensive documentation and showcase services including our signature 'Flip My Crib' program.",
      number: "03",
      subServices: ["Flip My Crib"],
    },
    {
      title: "Building Construction Services",
      description:
        "Full-scale construction solutions with dedicated project management and contracting expertise.",
      number: "04",
      subServices: ["Project Management", "Project Contracting"],
    },
  ];

  const processSteps = [
    {
      phase: "Discovery",
      description: "Understanding vision, context, and aspirations",
    },
    {
      phase: "Conceptual Design",
      description: "Translating ideas into architectural poetry",
    },
    {
      phase: "Development",
      description: "Refining every detail with precision and care",
    },
    {
      phase: "Realization",
      description: "Bringing dreams to life with masterful execution",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-white flex items-center justify-center py-20 px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-12">
            <div
              className={`transition-all duration-1500 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <h1
                className="text-7xl md:text-9xl lg:text-[12rem] font-light text-black leading-none mb-12"
                style={{
                  fontWeight: "100",
                  letterSpacing: "-0.06em",
                }}
              >
                Our Services
              </h1>
            </div>

            <div
              className={`transition-all duration-1500 delay-400 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <div className="w-48 h-px bg-gradient-to-r from-transparent via-green-600/40 to-transparent mx-auto mb-12"></div>
              <p
                className="text-xl md:text-3xl lg:text-4xl text-black/70 max-w-5xl mx-auto leading-relaxed"
                style={{
                  fontWeight: "200",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.3",
                }}
              >
                Our mission is simple: to ignite the spark of inspiration
                <br />
                and functionality in every project we undertake, leading the way
                <br />
                and reshaping the narrative of architectural brilliance.
              </p>
            </div>

            <div
              className={`pt-20 transition-all duration-1500 delay-800 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-16 rotate-12"
              }`}
            >
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto relative overflow-hidden group">
                <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-full"></div>
                <div className="w-6 h-6 bg-white group-hover:bg-green-600 rounded-full relative z-10 transition-colors duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Parallax Section */}
      <section className="relative py-40 md:py-56 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div
            ref={parallaxContainer1Ref}
            className="text-center space-y-20"
            style={{ transformOrigin: "center center" }}
          >
            <div className="space-y-12">
              <h2
                className="text-6xl md:text-8xl lg:text-9xl font-light text-black leading-none"
                style={{
                  fontWeight: "100",
                  letterSpacing: "-0.04em",
                }}
              >
                Philosophy
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <p
                className="text-xl md:text-2xl lg:text-3xl text-black/60 leading-relaxed"
                style={{
                  fontWeight: "300",
                  lineHeight: "1.5",
                  letterSpacing: "-0.01em",
                }}
              >
                Every project begins with understanding the essence of space and
                the souls who inhabit it. Architecture should transcend the
                temporal, creating environments that resonate across
                generations.
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-600 scale-0 group-hover:scale-100 transition-transform duration-1000 ease-out rounded-full"></div>
                <div className="w-12 h-12 bg-green-600 group-hover:bg-white rounded-full relative z-10 transition-colors duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section
        ref={servicesListRef}
        className="relative py-24 md:py-40 bg-white"
      >
        <div className="max-w-8xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="space-y-20 md:space-y-32">
            {services.map((service, index) => (
              <div
                key={service.number}
                className={`transition-all duration-1200 ${
                  isServicesVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 250}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start group">
                  {/* Number */}
                  <div className="lg:col-span-2">
                    <span
                      className="text-8xl md:text-9xl lg:text-[10rem] font-light text-green-100 group-hover:text-green-200 transition-colors duration-700"
                      style={{
                        fontWeight: "100",
                        letterSpacing: "-0.08em",
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Content */}
                  <div className="lg:col-span-9 space-y-6">
                    <h3
                      className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight group-hover:translate-x-2 transition-transform duration-500"
                      style={{
                        fontWeight: "200",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-lg md:text-xl text-black/60 leading-relaxed group-hover:text-black/80 transition-colors duration-500 max-w-4xl"
                      style={{
                        fontWeight: "300",
                        lineHeight: "1.6",
                        letterSpacing: "0.005em",
                      }}
                    >
                      {service.description}
                    </p>

                    {/* Sub-services */}
                    <div className="pt-4">
                      <div className="flex flex-wrap gap-3">
                        {service.subServices.map((subService, subIndex) => (
                          <span
                            key={subIndex}
                            className="px-6 py-4 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100 hover:bg-green-100 transition-colors duration-300"
                            style={{
                              fontWeight: "400",
                            }}
                          >
                            {subService}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Arrow */}
                  <div className="lg:col-span-1 flex justify-center lg:justify-end">
                    <div className="w-16 h-16 flex items-center justify-center  group/arrow transition-all duration-500 cursor-pointer relative overflow-hidden">
                      {/* Default Arrow (top-right) */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute group-hover/arrow:opacity-0 group-hover/arrow:rotate-45 group-hover/arrow:scale-75 transition-all duration-500 stroke-green-600 group-hover/arrow:stroke-white"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* Hover Arrow (bottom-left) */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute opacity-0 -rotate-45 scale-75 group-hover/arrow:opacity-100 group-hover/arrow:rotate-0 group-hover/arrow:scale-100 transition-all duration-500 stroke-white"
                      >
                        <path
                          d="M17 7L7 17M7 17H17M7 17V7"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enhanced Divider */}
                {index < services.length - 1 && (
                  <div className="mt-20 md:mt-32">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-green-200/60 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Parallax Section */}
      <section className="relative py-40 md:py-56 bg-green-50/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
          <div
            ref={parallaxContainer2Ref}
            className="text-center space-y-16"
            style={{ transformOrigin: "center center" }}
          >
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-light text-black/80 leading-tight"
              style={{
                fontWeight: "200",
                letterSpacing: "-0.03em",
              }}
            >
              Crafting spaces that
              <br />
              inspire and endure
            </h2>

            <div className="max-w-3xl mx-auto">
              <p
                className="text-lg md:text-xl text-black/50 leading-relaxed"
                style={{
                  fontWeight: "300",
                  lineHeight: "1.7",
                }}
              >
                Through meticulous attention to detail and an unwavering
                commitment to excellence, we create architectural narratives
                that speak to the human experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        ref={processRef}
        className="relative py-24 md:py-40 bg-green-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            {/* Left Side - Title */}
            <div
              className={`transition-all duration-1200 ${
                isProcessVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-12"
                style={{
                  fontWeight: "200",
                  letterSpacing: "-0.03em",
                }}
              >
                Our
                <br />
                Process
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-green-400/60 to-transparent"></div>
            </div>

            {/* Right Side - Process Steps */}
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div
                  key={step.phase}
                  className={`transition-all duration-1200 group ${
                    isProcessVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  }`}
                  style={{ transitionDelay: `${300 + index * 200}ms` }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-8">
                      <div className="w-3 h-3 bg-green-400 rounded-full group-hover:bg-white group-hover:scale-150 transition-all duration-500"></div>
                      <h3
                        className="text-3xl md:text-4xl font-light group-hover:translate-x-2 transition-transform duration-500"
                        style={{
                          fontWeight: "200",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {step.phase}
                      </h3>
                    </div>
                    <p
                      className="text-lg md:text-xl text-white/60 leading-relaxed ml-11 group-hover:text-white/80 transition-colors duration-500"
                      style={{
                        fontWeight: "300",
                        lineHeight: "1.6",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
