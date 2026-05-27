import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import GbnzLogo from "../../assets/logo-test.png";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom ease-out expo
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white backdrop-blur-xl *border-b border-black/5 py-6 *shadow-sm" 
          : "bg-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <a href="#accueil" className="relative *z-50 flex items-center group">
          <motion.img 
            src={GbnzLogo} 
            alt="GBNZ Logo" 
            animate={{ height: scrolled ? 60 : 65 }}
            className="w-auto object-contain transition-all duration-500 group-hover:scale-105"
          />
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              // MODIFIÉ ICI: Styles CSS du texte du lien pour correspondre au texte du bouton
              className="relative text-sm font-bold uppercase tracking-tighter text-brand-black transition-colors duration-300 py-2"
            >
              {link.label}
              {/* Animated Underline */}
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
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden lg:flex items-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: "#0D0D0D", color: "#FFFFFF" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-yellow text-brand-black font-bold text-sm uppercase tracking-tighter transition-all *shadow-[0_4px_14px_0_rgba(245,196,0,0.39)]"
          >
            Prendre RDV
            <ArrowRight size={14} />
          </motion.a>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden relative z-50 p-2 text-brand-black"
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
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
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white shadow-[-20px_0_80px_rgba(0,0,0,0.1)] pt-32 px-10 flex flex-col gap-8 lg:hidden"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Navigation</span>
              <div className="flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-display uppercase tracking-tight text-brand-black hover:text-brand-yellow transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }}
                className="mt-auto mb-10"
              >
                <p className="text-gray-400 text-sm mb-4">Gbnz Design Studio — RDC</p>
                <div className="flex gap-4">
                    {/* Liens réseaux sociaux icônes ici */}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}