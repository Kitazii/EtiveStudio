import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface NavigationProps {
  scrollSpy: string;
  forceScrolledState?: boolean;
}

export function Navigation({ scrollSpy, forceScrolledState = false }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrolledNav, setShowScrolledNav] = useState(false);
  const [location, navigate] = useLocation();

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#brands", label: "Trusted Brands" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "/stills", label: "Stills", isRoute: true },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    if (forceScrolledState) {
      setIsScrolled(true);
      setShowScrolledNav(true);
      return;
    }
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 50;

      if (shouldBeScrolled && !isScrolled) {
        setIsScrolled(true);
        // Small delay to create the slide-down effect
        setTimeout(() => setShowScrolledNav(true), 100);
      } else if (!shouldBeScrolled && isScrolled) {
        setShowScrolledNav(false);
        setTimeout(() => setIsScrolled(false), 200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, forceScrolledState]);

  const handleNavigation = (href: string, isRoute: boolean) => {
    if (isRoute) {
      if (location === href) {
        // If already on the route, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to the route and scroll to top
        navigate(href);
        // Small delay to ensure page loads before scrolling
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } else {
      // If we're not on home page, go to home first
      if (location !== "/") {
        navigate("/");
        // Small delay to allow page to load before scrolling
        setTimeout(() => scrollToSection(href), 100);
      } else {
        scrollToSection(href);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Transparent Navigation (Hero Section) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/attached_assets/ETIVE_high_resolution_white_1751551440326.PNG"
                alt="Etive Studio"
                className="h-6 w-auto mt-3"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href, !!item.isRoute)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    (item.isRoute && location === item.href) || 
                    (!item.isRoute && scrollSpy === item.href.substring(1))
                      ? "text-red-500 border-b-2 border-red-500"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-red-400"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-sm border-t border-gray-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    scrollSpy === item.href.substring(1)
                      ? "text-red-400"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* White Navigation (Scrolled State) */}
      <nav
        className={`fixed left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ${
          isScrolled
            ? showScrolledNav
              ? "top-0 opacity-100 transform translate-y-0"
              : "top-0 opacity-0 transform -translate-y-full"
            : "top-0 opacity-0 pointer-events-none transform -translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/attached_assets/ETIVE_black_red_transparent_1751556670379.PNG"
                alt="Etive Studio"
                className="h-6 w-auto mt-3"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href, !!item.isRoute)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    (item.isRoute && location === item.href) || 
                    (!item.isRoute && scrollSpy === item.href.substring(1))
                      ? "text-brand-red border-b-2 border-brand-red"
                      : "text-brand-black hover:text-brand-red"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-brand-black hover:text-brand-red"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href, !!item.isRoute)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    (item.isRoute && location === item.href) || 
                    (!item.isRoute && scrollSpy === item.href.substring(1))
                      ? "text-brand-red"
                      : "text-brand-black hover:text-brand-red"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
