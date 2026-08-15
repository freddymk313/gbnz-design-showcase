import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import GbnzLogo from "../../assets/logo-test.png";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getHref = (target: string) => {
    if (target === "portfolio") return "/portfolio";
    return isHomePage ? `#${target}` : `/#${target}`;
  };

  const navItems = [
    { label: "Accueil", target: "accueil", isRoute: false },
    { label: "Services", target: "services", isRoute: false },
    { label: "Tarifs", target: "tarifs", isRoute: false },
    { label: "Portfolio", target: "portfolio", isRoute: true },
    { label: "À propos", target: "apropos", isRoute: false },
    { label: "Contact", target: "contact", isRoute: false },
  ];

  return (
    <footer className="bg-white text-brand-black pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* GRILLE PRINCIPALE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* LOGO & DESCRIPTION (5 Colonnes) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <Link to="/" className="relative flex items-center group inline-block">
              <motion.img
                src={GbnzLogo}
                alt="GBNZ Logo"
                className="w-auto object-contain transition-all -ml-2 h-16 sm:h-20 md:h-28 duration-500 group-hover:scale-105"
              />
            </Link>

            <p className="text-brand-gray text-sm sm:text-base md:text-lg font-body leading-relaxed max-w-sm">
              Gbnz Design · Créer. Inspirer. Marquer.
              <br />
              Studio créatif basé à Lubumbashi, République Démocratique du Congo.
            </p>
          </div>

          {/* NAVIGATION (3 Colonnes) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-brand-yellow tracking-tight mb-4 sm:mb-6">
              Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-3 font-body text-sm sm:text-base">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.isRoute ? (
                    <Link
                      to="/portfolio"
                      className="text-brand-gray hover:text-brand-yellow transition-colors duration-200 block py-0.5"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={getHref(item.target)}
                      className="text-brand-gray hover:text-brand-yellow transition-colors duration-200 block py-0.5"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER (4 Colonnes) */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-brand-yellow tracking-tight mb-4 sm:mb-6">
              Newsletter
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-brand-gray mb-4 sm:mb-6 font-body leading-relaxed">
              Recevez nos dernières créations et conseils pour propulser votre marque.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body text-brand-black placeholder:text-black/30 outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, backgroundColor: "#E2B500" }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-brand-yellow text-brand-black font-bold flex items-center justify-center transition-colors duration-300 cursor-pointer text-xs sm:text-sm"
              >
                <ArrowRight size={16} />
              </motion.button>
            </form>
          </div>
        </div>

        {/* LIGNE DE COPYRIGHT & BAS DE PAGE */}
        <div className="mt-12 sm:mt-16 md:mt-24 pt-6 sm:pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-brand-gray/60 font-body">
          <p>© {currentYear} Gbnz Design. Tous droits réservés.</p>
          <div className="flex items-center gap-1.5">
            Conçu par{" "}
            <a
              href="https://nordevagency.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-yellow transition-colors font-medium"
            >
              Nordev Agency
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
