/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, ArrowUpRight } from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  sectionId?: string;
};

type ProjectHighlight = {
  id: number;
  image: string;
  type: string;
  name: string;
  location: string;
  commissioned: string;
  completed: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  const menuItems: MenuItem[] = useMemo(
    () => [
      { name: "Home", href: "/", sectionId: "home" },
      { name: "About", href: "/about", sectionId: "about" },
      { name: "Services", href: "/services", sectionId: "services" },
      { name: "Projects", href: "/projects", sectionId: "projects" },
      { name: "Contact", href: "/contact", sectionId: "contact" },
    ],
    []
  );

  const projectHighlights: ProjectHighlight[] = [
    {
      id: 1,
      image: "/house10.jpg",
      type: "Residential",
      name: "Private Duplex",
      location: "Port Harcourt, Nigeria",
      commissioned: "2021",
      completed: "2023",
    },
    {
      id: 2,
      image: "/house6.jpg",
      type: "Commercial",
      name: "Eko Suites",
      location: "Lagos, Nigeria",
      commissioned: "2019",
      completed: "2022",
    },
    {
      id: 3,
      image: "/house11.jpg",
      type: "Hospitality",
      name: "Bayfront Residences",
      location: "Bayelsa, Nigeria",
      commissioned: "2020",
      completed: "2024",
    },
  ];

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme: "light" | "dark" = prefersDark.matches
      ? "dark"
      : "light";
    setTheme(systemTheme);
    setMounted(true);

    const handleSchemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    prefersDark.addEventListener("change", handleSchemeChange);

    return () => prefersDark.removeEventListener("change", handleSchemeChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (pathname !== "/") {
      setActiveItem(
        menuItems.find((item) => item.href === pathname)?.name ?? ""
      );
      return;
    }

    const sectionElements = menuItems
      .map((item) => item.sectionId)
      .filter(Boolean)
      .map((id) =>
        document.querySelector<HTMLElement>(`[data-nav-section="${id}"]`)
      )
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sectionElements.length) {
      setActiveItem("Home");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target) {
          const activeSectionId =
            visibleEntry.target.getAttribute("data-nav-section") ?? "";
          const foundItem = menuItems.find(
            (item) => item.sectionId === activeSectionId
          );
          if (foundItem) {
            setActiveItem(foundItem.name);
          }
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [menuItems, pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-neutral-600/25 backdrop-blur-xl shadow-lg shadow-green-500/5 border-b border-green-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="group flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-600/20 to-green-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src="/logo.jpg"
                    alt="logo"
                    className="relative w-12 h-12 rounded-full border border-green-500/20 group-hover:border-green-500/40 transition-all duration-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-xl lg:text-2xl font-light tracking-tight transition-colors duration-500 ${
                      isScrolled ? "text-green-700" : "text-white"
                    }`}
                  >
                    SPARKHOUSE
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => {
                const isProjectsItem = item.name === "Projects";
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={
                      isProjectsItem ? () => setIsProjectsOpen(true) : undefined
                    }
                    onMouseLeave={
                      isProjectsItem
                        ? () => setIsProjectsOpen(false)
                        : undefined
                    }
                  >
                    <a
                      href={item.href}
                      className={`text-base font-light tracking-wide transition-colors ${
                        isScrolled
                          ? "text-gray-700 hover:text-emerald-600"
                          : "text-white/90 hover:text-white"
                      } ${activeItem === item.name ? "text-emerald-600" : ""}`}
                    >
                      {item.name}
                    </a>
                    {isProjectsItem && isProjectsOpen && (
                      <div className="absolute left-0 top-full z-50 mt-3 w-[520px] border border-emerald-100 bg-white/95 shadow-lg">
                        <div className="flex items-center justify-between border-b border-emerald-100 px-5 py-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
                              Featured Projects
                            </p>
                            <p className="text-sm text-emerald-900/80">
                              Recent highlights from our portfolio
                            </p>
                          </div>
                          <a
                            href="/projects"
                            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            View All
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </a>
                        </div>
                        <ul className="divide-y divide-emerald-100">
                          {projectHighlights.map((project) => (
                            <li key={project.id}>
                              <a
                                href="/projects"
                                className="flex items-center gap-4 px-5 py-4 text-emerald-900 transition-colors hover:bg-emerald-50"
                              >
                                <div className="h-16 w-24 overflow-hidden border border-emerald-100 bg-emerald-50">
                                  <img
                                    src={project.image}
                                    alt={project.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-semibold">
                                    {project.name}
                                  </p>
                                  <p className="text-xs text-emerald-700/80">
                                    {project.location}
                                  </p>
                                  <p className="text-[11px] text-emerald-600/70">
                                    Commissioned {project.commissioned} •
                                    Completed {project.completed}
                                  </p>
                                </div>
                                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
              <a
                href="/contact#consultation"
                className="inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
              >
                Book Consultation
              </a>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`inline-flex h-10 w-10 items-center justify-center border border-emerald-500/30 transition-colors ${
                  isScrolled
                    ? "bg-white text-emerald-600 hover:bg-emerald-50"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden relative p-3 transition-colors ${
                isScrolled
                  ? "text-emerald-600 hover:bg-emerald-50"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <div className="flex flex-col space-y-1.5 w-6">
                <div
                  className={`h-0.5 w-full rounded-full transition-all duration-500 ${
                    isMenuOpen
                      ? "rotate-45 translate-y-2"
                      : "rotate-0 translate-y-0"
                  } ${isScrolled ? "bg-green-600" : "bg-white"}`}
                ></div>
                <div
                  className={`h-0.5 w-full rounded-full transition-all duration-500 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  } ${isScrolled ? "bg-green-600" : "bg-white"}`}
                ></div>
                <div
                  className={`h-0.5 w-full rounded-full transition-all duration-500 ${
                    isMenuOpen
                      ? "-rotate-45 -translate-y-2"
                      : "rotate-0 translate-y-0"
                  } ${isScrolled ? "bg-green-600" : "bg-white"}`}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-700 ease-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/95 via-green-700/95 to-green-800/95 backdrop-blur-xl"></div>

        {/* Floating geometric elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div className="w-16 h-16 border border-white/30 transform rotate-45"></div>
            </div>
          ))}
        </div>

        {/* Menu Content - Fixed for mobile viewport */}
        <div className="relative z-10 h-full overflow-y-auto">
          <div className="flex flex-col min-h-full px-6 py-20">
            {/* Menu Items */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-6">
                {menuItems.map((item, index) => (
                  <div
                    key={item.name}
                    className={`transition-all duration-700 ease-out ${
                      isMenuOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block border-b border-white/10 py-3 text-xl font-light text-white transition-colors hover:text-emerald-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
                <a
                  href="/contact#consultation"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-white/20 bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
                >
                  Book Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-5 w-5" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div
              className={`mt-12 pt-6 border-t border-white/10 transition-all duration-700 ease-out ${
                isMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-px bg-gradient-to-r from-white/40 to-transparent"></div>
                  <span className="text-sm font-medium text-white/70 tracking-wider uppercase">
                    Get in Touch
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-white/90 font-light text-sm">
                    info@sparkhouselimited.ng
                  </p>
                  <p className="text-white/90 font-light text-sm">
                    09042131257
                  </p>
                  <p className="text-white/80 font-light text-sm leading-relaxed">
                    15KM East-West Road,
                    <br />
                    Off Obiri-Ikwerre Flyover,
                    <br />
                    Port Harcourt, Nigeria
                  </p>
                  <p className="text-white/80 font-light text-sm">
                    Mon–Fri: 9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
