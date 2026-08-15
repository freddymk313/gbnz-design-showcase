import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cats, allProjects, type Cat, type ProjectItem } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { MobileSwipeDeck } from "./MobileSwipeDeck";

export function Portfolio() {
  const [active, setActive] = useState<Cat>("Tout");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Filtre les projets selon l'onglet actif et limite à 6 éléments maximum pour l'aperçu
  const filtered = allProjects
    .filter((p) => active === "Tout" || p.cat === active)
    .slice(0, 6);

  const handleCategoryChange = (c: Cat) => {
    setActive(c);
  };

  return (
    <section id="portfolio" className="py-16 sm:py-24 md:py-32 bg-[#F8F8F8] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-brand-black leading-none uppercase tracking-tighter">
            Nos <span className="text-brand-yellow">Réalisations</span>
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 text-brand-gray text-base sm:text-lg md:text-xl font-body max-w-xl mx-auto italic">
            "Le design est l'ambassadeur silencieux de votre marque."
          </p>
          <div className="w-10 sm:w-12 h-1 bg-brand-yellow mx-auto mt-4 sm:mt-6 md:mt-8 rounded-full" />
        </motion.div>

        {/* Filtres de Catégories (scrollable proprement sur mobile, centré sur desktop) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16 px-2 sm:px-0 -mx-2 sm:mx-0 py-1">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => handleCategoryChange(c)}
              className="relative shrink-0 px-4 py-1.5 sm:px-6 sm:py-2 text-brand-black text-[11px] sm:text-xs font-bold uppercase tracking-tighter transition-colors cursor-pointer whitespace-nowrap"
            >
              {active === c && (
                <motion.span
                  layoutId="portfolio-tab"
                  className="absolute inset-0 bg-brand-yellow rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  active === c ? "text-brand-black" : "text-brand-gray hover:text-brand-black"
                }`}
              >
                {c}
              </span>
            </button>
          ))}
        </div>

        {/* CAROUSEL HORIZONTAL SWIPABLE FAÇON TINDER SUR MOBILE (< 768px) */}
        <div className="block md:hidden mb-4">
          <MobileSwipeDeck
            projects={filtered}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        </div>

        {/* GRILLE MASONRY SUR DESKTOP (>= 768px) */}
        <div className="hidden md:block columns-2 lg:columns-3 gap-5 sm:gap-6 md:gap-8 space-y-5 sm:space-y-6 md:space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* BOUTON VOIR PLUS — Style identique au bouton PRENDRE RDV */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-10 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto text-center"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 md:px-9 md:py-4.5 rounded-full bg-brand-yellow text-brand-black font-bold text-xs sm:text-sm uppercase tracking-tighter hover:bg-brand-black hover:text-white transition-all duration-300 group cursor-pointer w-full sm:w-auto"
            >
              <span>Voir plus de réalisations ({allProjects.length})</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* MODALE D'AFFICHAGE DU PROJET */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

