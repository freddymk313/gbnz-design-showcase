import { motion } from "framer-motion";
// import { GbnzLogo } from "./Logo";
import GbnzLogo from "../../assets/logo-test.png";
import { ArrowRight, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-brand-black pt-24 pb-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* GRILLE PRINCIPALE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LOGO & DESCRIPTION (5 Colonnes) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Suppression de "inverted" pour que le logo s'affiche correctement sur fond blanc */}
            {/* <GbnzLogo className="w-24 h-auto" /> */}
            <a href="#accueil" className="relative z-50 flex items-center group">
          <motion.img 
            src={GbnzLogo} 
            alt="GBNZ Logo" 
            // animate={{ height: scrolled ? 56 : 58 }}
            className="w-auto object-contain transition-all -ml-2 h-28 duration-500"
          />
        </a>

            <p className="text-brand-gray text-lg font-body leading-relaxed max-w-sm">
              Gbnz Design · Créer. Inspirer. Marquer.
              <br />
              Studio créatif basé en République Démocratique du Congo.
            </p>
          </div>

          {/* NAVIGATION (3 Colonnes) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-3xl md:text-4xl uppercase text-brand-yellow tracking-tight mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 font-body text-base">
              {["Accueil", "Services", "Portfolio", "À propos", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(" ", "").replace("à", "a")}`}
                    className="text-brand-gray hover:text-brand-yellow transition-colors duration-200 block py-0.5"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER (4 Colonnes) */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-3xl md:text-4xl uppercase text-brand-yellow tracking-tight mb-6">
              Newsletter
            </h4>
            <p className="text-base text-brand-gray mb-6 font-body leading-relaxed">
              Recevez nos dernières créations et conseils pour propulser votre marque.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-5 py-3.5 bg-[#F9F9F9] *border border-black/5 rounded-2xl text-sm font-body text-brand-black placeholder:text-black/30 outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#E2B500" }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-full bg-brand-yellow text-brand-black font-bold flex items-center justify-center transition-colors duration-300"
              >
                <ArrowRight size={18} />
              </motion.button>
            </form>
          </div>
        </div>

        {/* LIGNE DE COPYRIGHT & BAS DE PAGE */}
        <div className="mt-24 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-gray/60 font-body">
          <p>© {currentYear} Gbnz Design. Tous droits réservés.</p>
          <div className="flex items-center gap-1.5">
            Conçu par 
            {/* <Sparkles size={14} className="text-brand-yellow" /> */}
            {" "}
            <a
              href="https://nordevagency.vercel.app/"
              target="_blank"
              className="hover:text-brand-yellow transition-colors"
            >
              Nordev Agency
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
