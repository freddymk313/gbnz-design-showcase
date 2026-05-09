import { motion } from "framer-motion";
import { GbnzLogo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <GbnzLogo />
          <p className="mt-4 text-white/60 text-sm leading-relaxed">
            Gbnz Design · Créer. Inspirer. Marquer.<br />Studio créatif basé à Kinshasa, RDC.
          </p>
        </div>
        <div>
          <h4 className="font-display text-xl mb-4 text-brand-yellow">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {["Accueil", "Services", "Portfolio", "À propos", "Contact"].map((l) => (
              <li key={l}><a href="#" className="hover:text-brand-yellow transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl mb-4 text-brand-yellow">Newsletter</h4>
          <p className="text-sm text-white/60 mb-3">Recevez nos dernières créations et conseils.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input type="email" placeholder="Votre email" className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand-yellow" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="px-5 py-2.5 rounded-full bg-brand-yellow text-brand-black font-semibold text-sm">
              S'abonner
            </motion.button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/50">
        © 2025 Gbnz Design. Tous droits réservés. · Conçu avec <span className="text-brand-yellow">❤</span> à Kinshasa
      </div>
    </footer>
  );
}
