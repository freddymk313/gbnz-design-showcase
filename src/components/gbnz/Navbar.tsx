import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import GbnzLogo from "../../assets/logo-test.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const getHref = (target: string) => {
    if (target === "portfolio") {
      return "/portfolio";
    }
    return isHomePage ? `#${target}` : `/#${target}`;
  };

  const navLinks = [
    { label: "Accueil", target: "accueil", isRoute: false },
    { label: "Services", target: "services", isRoute: false },
    { label: "Tarifs", target: "tarifs", isRoute: false },
    { label: "Portfolio", target: "portfolio", isRoute: true },
    { label: "À propos", target: "apropos", isRoute: false },
    { label: "Contact", target: "contact", isRoute: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-black/5 py-3 md:py-4 shadow-sm"
          : "bg-white py-4 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO AREA */}
        <Link
          to="/"
          className="relative flex items-center group cursor-pointer"
        >
          <motion.img
            src={GbnzLogo}
            alt="GBNZ Logo"
            className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
              scrolled ? "h-11 sm:h-12 md:h-14" : "h-12 sm:h-14 md:h-16"
            }`}
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isPortfolioActive = !isHomePage && link.target === "portfolio";
            
            if (link.isRoute) {
              return (
                <Link
                  key={link.label}
                  to="/portfolio"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative text-sm font-bold uppercase tracking-tighter transition-colors duration-300 py-2 cursor-pointer ${
                    isPortfolioActive ? "text-brand-yellow" : "text-brand-black hover:text-brand-yellow"
                  }`}
                >
                  {link.label}
                  {(hoveredLink === link.label || isPortfolioActive) && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              );
            }

            return (
              <a
                key={link.label}
                href={getHref(link.target)}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative text-sm font-bold uppercase tracking-tighter text-brand-black hover:text-brand-yellow transition-colors duration-300 py-2 cursor-pointer"
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden lg:flex items-center">
          <motion.a
            href={getHref("contact")}
            whileHover={{ scale: 1.05, backgroundColor: "#0D0D0D", color: "#FFFFFF" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-yellow text-brand-black font-bold text-sm uppercase tracking-tighter transition-all cursor-pointer shadow-[0_4px_14px_0_rgba(245,196,0,0.39)]"
          >
            Prendre RDV
            <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-50 p-1.5 text-brand-black cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white shadow-[-20px_0_80px_rgba(0,0,0,0.15)] pt-24 px-8 flex flex-col justify-between lg:hidden z-50 overflow-y-auto"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold block mb-6">
                  Navigation
                </span>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, i) => {
                    if (link.isRoute) {
                      return (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <Link
                            to="/portfolio"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-display uppercase tracking-tight text-brand-black hover:text-brand-yellow transition-colors block py-1"
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.a
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        href={getHref(link.target)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-display uppercase tracking-tight text-brand-black hover:text-brand-yellow transition-colors block py-1"
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8 pt-6 border-t border-black/5"
              >
                <a
                  href={getHref("contact")}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-brand-yellow text-brand-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mb-4"
                >
                  <span>Prendre RDV</span>
                  <ArrowRight size={14} />
                </a>
                <p className="text-gray-400 text-[11px] text-center">Gbnz Design Studio — Lubumbashi, RDC</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
