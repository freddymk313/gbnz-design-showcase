import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GbnzLogo } from "./Logo";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <GbnzLogo inverted />

        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-brand-black hover:text-brand-yellow transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="hidden lg:inline-flex items-center px-6 py-3 rounded-full bg-brand-yellow text-brand-black font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
        >
          Prendre RDV
        </motion.a>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-brand-black">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 h-screen w-80 bg-white shadow-2xl pt-24 px-8 flex flex-col gap-6"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-display tracking-wider text-brand-black">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4 px-6 py-3 rounded-full bg-brand-yellow text-brand-black font-semibold text-center">
              Prendre RDV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
