import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
// import { GbnzLogo } from "./Logo";
import posterImage from "@/assets/poster.jpg"; // Ajustez le chemin relatif selon où se trouve ce composant

type Cat = "Tout" | "Logos" | "Affiches" | "Identité Visuelle";
const cats: Cat[] = ["Tout", "Logos", "Affiches", "Identité Visuelle"];

const projects = [
  { 
    title: "Gbnz Design", 
    label: "Logo — Studio Créatif", 
    cat: "Logos", 
    bg: "bg-brand-black", 
    aspect: "aspect-square", 
    showLogo: true,
    image: posterImage
  },
  { 
    title: "Festival Lumière", 
    label: "Affiche — Événement 2024", 
    cat: "Affiches", 
    bg: "bg-brand-yellow", 
    aspect: "aspect-[3/4]",
    image: posterImage
  },
  { 
    title: "Maison Kivu", 
    label: "Identité — Restaurant", 
    cat: "Identité Visuelle", 
    bg: "bg-neutral-200", 
    aspect: "aspect-square",
    image: posterImage
  },
  { 
    title: "Tech Congo", 
    label: "Logo — Startup", 
    cat: "Logos", 
    bg: "bg-brand-black", 
    aspect: "aspect-[4/3]",
    image: posterImage
  },
  { 
    title: "Mode Kin", 
    label: "Affiche — Défilé", 
    cat: "Affiches", 
    bg: "bg-brand-yellow", 
    aspect: "aspect-square",
    image: posterImage
  },
  { 
    title: "Banque Élite", 
    label: "Identité — Charte", 
    cat: "Identité Visuelle", 
    bg: "bg-neutral-200", 
    aspect: "aspect-[3/4]",
    image: posterImage
  },
];

export function Portfolio() {
  const [active, setActive] = useState<Cat>("Tout");
  const filtered = projects.filter((p) => active === "Tout" || p.cat === active);

  return (
    <section id="portfolio" className="py-32 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Aligné avec ton style Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-6xl md:text-8xl text-brand-black leading-none uppercase tracking-tighter">
            Nos <span className="text-brand-yellow">Réalisations</span>
          </h2>
          <p className="mt-6 text-brand-gray text-xl font-body max-w-xl mx-auto italic">
            "Le design est l'ambassadeur silencieux de votre marque."
          </p>
        </motion.div>

        {/* Filtres de Catégories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="relative px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              {active === c && (
                <motion.span
                  layoutId="portfolio-tab"
                  className="absolute inset-0 bg-brand-yellow rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-300 ${active === c ? "text-brand-black" : "text-brand-gray hover:text-brand-black"}`}>
                {c}
              </span>
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative break-inside-avoid rounded-[32px] overflow-hidden ${p.bg} ${p.aspect} cursor-pointer border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                {/* Image de fond du projet */}
                {p.image && (
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                {/* Logo Gbnz spécifique (si activé et pas d'image, ou superposé) */}
                {p.showLogo && !p.image && (
                  <div className="absolute inset-0 flex items-center justify-center p-12 z-10">
                    {/* <GbnzLogo className="w-full h-auto opacity-80 group-hover:scale-110 transition-transform duration-700" /> */}
                  </div>
                )}

                {/* Overlay au Hover - Ajout de z-20 pour passer au dessus de l'image */}
                <motion.div
                  className="absolute inset-0 bg-brand-black/70 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 z-20"
                >
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-brand-yellow text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                      {p.cat}
                    </span>
                    <h3 className="text-white font-display text-4xl mb-2 uppercase tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-white/60 text-sm font-body mb-6">
                      {p.label}
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-tighter">
                      <span>Découvrir</span>
                      <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black">
                        <Plus size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action Final */}
        <div className="text-center mt-20">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-brand-black text-white font-bold uppercase text-xs tracking-widest shadow-xl hover:shadow-brand-yellow/10 transition-all"
          >
            Démarrer un projet avec nous
            <ArrowRight size={18} className="text-brand-yellow group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}