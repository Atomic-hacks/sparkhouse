"use client";

import { useEffect, useRef, useState } from "react";

export default function Portfolio() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setScrollY] = useState(0);

  // Portfolio projects data
  const projects = [
    {
      id: "skyline-residence",
      title: "SKYLINE RESIDENCE",
      category: "Residential Architecture",
      year: "2024",
      location: "Los Angeles, CA",
      image: "/api/placeholder/600/400",
      description: "Modern luxury living redefined",
    },
    {
      id: "urban-loft",
      title: "URBAN LOFT COMPLEX",
      category: "Mixed-Use Development",
      year: "2024",
      location: "Downtown LA",
      image: "/api/placeholder/600/400",
      description: "Contemporary urban sophistication",
    },
    {
      id: "modern-villa",
      title: "MODERN VILLA ESTATE",
      category: "Luxury Residential",
      year: "2023",
      location: "Beverly Hills, CA",
      image: "/api/placeholder/600/400",
      description: "Timeless elegance meets innovation",
    },
    {
      id: "sustainable-tower",
      title: "SUSTAINABLE TOWER",
      category: "Commercial Architecture",
      year: "2023",
      location: "Century City, CA",
      image: "/api/placeholder/600/400",
      description: "Green architecture for tomorrow",
    },
    {
      id: "coastal-retreat",
      title: "COASTAL RETREAT",
      category: "Residential Design",
      year: "2023",
      location: "Malibu, CA",
      image: "/api/placeholder/600/400",
      description: "Harmonious oceanside living",
    },
  ];

  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced Parallax Video Effect
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
      {/* Video Parallax Section */}
      <section className="relative py-16 sm:py-24 md:py-32 lg:py-48 bg-gradient-to-br from-stone-50 via-white to-green-50/30 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgb(34 197 94 / 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgb(21 128 61 / 0.1) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          {/* Enhanced Section Header */}
          <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
              <div className="space-y-4 sm:space-y-6">
                {/* Decorative accent */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-green-600 to-green-700"></div>
                  <span className="text-sm font-medium text-green-700 tracking-[0.15em] uppercase">
                    Portfolio
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.9] tracking-tight">
                  Our work speaks
                  <br />
                  <span className="text-gray-600">through</span>
                  <br />
                  <span className="font-normal bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                    design excellence.
                  </span>
                </h2>
              </div>

              <div className="max-w-lg space-y-6">
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Each project represents our commitment to architectural
                  innovation, sustainable design, and the enhancement of urban
                  living through thoughtful, purposeful spaces.
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-8 pt-4">
                  <div>
                    <div className="text-2xl font-light text-green-700">
                      50+
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">
                      Projects
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div>
                    <div className="text-2xl font-light text-green-700">
                      15+
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">
                      Awards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Parallax Video Container */}

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
                  <source src="/sky5.mp4" type="video/mp4" />
                </video>

                {/* Refined overlay */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Consultation Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-2xl md:px-8 px-2">
                    <h3
                      className="text-2xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight"
                      style={{
                        fontWeight: "200",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Elegant Interiors, Exceptional Living
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
                      Expert craftsmanship and interior design tailored to your
                      lifestyle.
                    </p>

                    <button className="group relative px-6 py-2 md:px-10 md:py-4 bg-transparent border border-white/30 text-white font-light text-base md:text-lg hover:border-white transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></div>
                      <span
                        className="relative z-10 group-hover:text-green-900 transition-colors duration-700 uppercase tracking-wide"
                        style={{
                          fontWeight: "300",
                          letterSpacing: "0.1em",
                        }}
                      >
                        Get In Touch
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Enhanced Portfolio Projects Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-50 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-50 to-transparent rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          {/* Enhanced Section Title */}
          <div className="mb-16 sm:mb-20 md:mb-24">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
              <div className="flex items-center space-x-6 sm:space-x-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-green-600 to-green-700 transform -translate-y-1/2"></div>
                  <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-green-600 to-green-700 transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">
                  Portfolio
                </h2>
              </div>
              <div className="text-left sm:text-right space-y-2">
                <span className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light">
                  / {projects.length}
                </span>
                <p className="text-sm text-green-600 font-medium tracking-wide uppercase">
                  Featured Projects
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Projects List */}
          <div className="space-y-0">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative border-t border-gray-100 hover:border-green-200 transition-all duration-500"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <a
                  href={`/portfolio/${project.id}`}
                  className="block py-6 sm:py-8 md:py-12 transition-all duration-500 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-transparent group-hover:pl-4 sm:group-hover:pl-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                    {/* Enhanced Project Number */}
                    <div className="sm:col-span-1 flex items-center">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs sm:text-sm font-medium text-gray-400 tracking-[0.2em] group-hover:text-green-600 transition-colors duration-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="w-6 h-px bg-gray-200 group-hover:bg-green-300 transition-colors duration-300 hidden sm:block"></div>
                      </div>
                    </div>

                    {/* Enhanced Project Title */}
                    <div className="sm:col-span-4 space-y-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900 group-hover:text-green-700 transition-all duration-300 tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-light hidden sm:block">
                        {project.description}
                      </p>
                    </div>

                    {/* Enhanced Project Category */}
                    <div className="sm:col-span-3 flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                          {project.category}
                        </p>
                        <p className="text-xs sm:text-sm text-green-600 font-medium tracking-wide uppercase">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Project Year */}
                    <div className="sm:col-span-2 flex items-center">
                      <div className="text-right sm:text-left">
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-light">
                          {project.year}
                        </p>
                        <div className="w-8 h-px bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1"></div>
                      </div>
                    </div>

                    {/* Enhanced Arrow */}
                    <div className="sm:col-span-2 flex items-center justify-start sm:justify-end">
                      <div className="flex items-center space-x-3 sm:space-x-4 opacity-30 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-green-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-green-600 flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-green-600 group-hover:text-white"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Enhanced Hover Image with better mobile handling */}
                {hoveredProject === project.id && window.innerWidth > 768 && (
                  <div
                    className="fixed pointer-events-none z-50"
                    style={{
                      left: `${mousePosition.x + 20}px`,
                      top: `${mousePosition.y - 150}px`,
                      transform: "translate(0, 0)",
                    }}
                  >
                    <div className="relative w-80 h-52 rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20 animate-fade-in">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-black/20"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium tracking-wide">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced View All Projects Link */}
          <div className="mt-16 sm:mt-20 md:mt-24 text-center">
            <a
              href="/portfolio"
              className="inline-flex items-center space-x-4 sm:space-x-6 group relative"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 group-hover:text-green-700 transition-colors duration-300 tracking-wide">
                View All Projects
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-green-600 to-green-700 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-8 md:grid-cols-12 gap-8">
              {Array.from({ length: 96 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-emerald-600 rounded-full"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          {/* Section Header */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center space-x-8 mb-8">
              <div className="w-8 h-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-600 transform -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 w-px h-full bg-emerald-600 transform -translate-x-1/2"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black">
                What Our Clients Say
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-base md:text-lg text-black/70 leading-relaxed">
                See what our clients have to say about their experience with our
                architectural excellence and commitment to transforming spaces
                into extraordinary environments.
              </p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Testimonial 1 */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 md:p-10 shadow-sm border border-emerald-100/50 hover:shadow-lg hover:border-emerald-200/50 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-6">
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    className="text-emerald-600"
                  >
                    <path
                      d="M0 24V12C0 5.4 5.4 0 12 0v4C7.6 4 4 7.6 4 12v2h6v10H0zm18 0V12c0-6.6 5.4-12 12-12v4c-4.4 0-8 3.6-8 8v2h6v10H18z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <blockquote className="text-base md:text-lg text-black/80 leading-relaxed mb-8 font-light">
                  &quot;SparkHouse Limited delivered our dream home on time and
                  within budget, exceeding our expectations. We highly recommend
                  them for top-notch construction services.&quot;
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">SD</span>
                  </div>
                  <div>
                    <div className="font-medium text-black">
                      Sarah and John D.
                    </div>
                    <div className="text-sm text-black/60">Homeowners</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group md:transform md:translate-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 md:p-10 shadow-sm border border-emerald-100/50 hover:shadow-lg hover:border-emerald-200/50 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-6">
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    className="text-emerald-600"
                  >
                    <path
                      d="M0 24V12C0 5.4 5.4 0 12 0v4C7.6 4 4 7.6 4 12v2h6v10H0zm18 0V12c0-6.6 5.4-12 12-12v4c-4.4 0-8 3.6-8 8v2h6v10H18z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <blockquote className="text-base md:text-lg text-black/80 leading-relaxed mb-8 font-light">
                  &quot;SparkHouse Limited transformed our office into a modern
                  workspace. Their attention to detail was exceptional. Thank
                  you for an exceptional job!&quot;
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">ES</span>
                  </div>
                  <div>
                    <div className="font-medium text-black">Emily S.</div>
                    <div className="text-sm text-black/60">CEO</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group md:col-span-2 lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 md:p-10 shadow-sm border border-emerald-100/50 hover:shadow-lg hover:border-emerald-200/50 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-6">
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    className="text-emerald-600"
                  >
                    <path
                      d="M0 24V12C0 5.4 5.4 0 12 0v4C7.6 4 4 7.6 4 12v2h6v10H0zm18 0V12c0-6.6 5.4-12 12-12v4c-4.4 0-8 3.6-8 8v2h6v10H18z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <blockquote className="text-base md:text-lg text-black/80 leading-relaxed mb-8 font-light">
                  &quot;SparkHouse Limited&apos;s expertise and dedication kept
                  our project on track and within budget. We highly recommend
                  them for project management needs.&quot;
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">MT</span>
                  </div>
                  <div>
                    <div className="font-medium text-black">Michael T.</div>
                    <div className="text-sm text-black/60">
                      Project Investor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 md:mt-24 text-center">
            <div className="inline-flex items-center space-x-4 group cursor-pointer">
              <span className="text-lg md:text-xl font-light text-black group-hover:text-emerald-700 transition-colors duration-300">
                Start Your Project Today
              </span>
              <div className="w-8 h-px bg-emerald-600 group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
