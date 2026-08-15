import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle, SlidersHorizontal, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/gbnz/Navbar";
import { Footer } from "@/components/gbnz/Footer";
import { ProjectCard } from "@/components/gbnz/ProjectCard";
import { ProjectModal } from "@/components/gbnz/ProjectModal";
import { cats, allProjects, type Cat, type ProjectItem } from "@/data/portfolioData";

export function PortfolioPage() {
  const [active, setActive] = useState<Cat>("Tout");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Filtrage complet de tous les projets
  const filteredProjects = allProjects.filter(
    (p) => active === "Tout" || p.cat === active
  );

  const getCategoryCount = (c: Cat) => {
    if (c === "Tout") return allProjects.length;
    return allProjects.filter((p) => p.cat === c).length;
  };

  return (
    <main className="bg-[#F8F8F8] text-brand-black min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HEADER SECTION DE LA PAGE PORTFOLIO */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 bg-white border-b border-black/5 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] md:blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-black/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Breadcrumb / Return Home */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-gray hover:text-brand-yellow transition-colors group cursor-pointer"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Retour à l'accueil</span>
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >

              <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-brand-black leading-none uppercase tracking-tighter">
                Toutes nos <span className="text-brand-yellow">Réalisations</span>
              </h1>
              <p className="mt-3 sm:mt-6 text-brand-gray text-sm sm:text-lg md:text-xl font-body leading-relaxed max-w-2xl">
                Explorez l'intégralité de nos travaux : logos distinctifs, affiches à fort impact et identités visuelles complètes pour entreprises, églises et événements.
              </p>
            </motion.div>

            {/* Quick Stats Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#F9F9F9] *border border-black/5 self-start lg:self-end"
            >
              <div>
                <span className="font-display text-2xl sm:text-4xl text-brand-black block leading-none">
                  {allProjects.length}
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-bold text-brand-gray tracking-wider">
                  Projets répertoriés
                </span>
              </div>
              <div className="w-[1px] h-8 sm:h-10 bg-black/10" />
              <div>
                <span className="font-display text-2xl sm:text-4xl text-brand-yellow block leading-none">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs uppercase font-bold text-brand-gray tracking-wider">
                  Sur-Mesure
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION GALERIE & FILTRES */}
      <section className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-6">

        {/* FILTRES INTERACTIFS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-16 pb-4 sm:pb-6 border-b border-black/10">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-brand-gray">
            <SlidersHorizontal size={15} className="text-brand-yellow" />
            <span>Filtrer par catégorie :</span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar max-w-full py-1 px-1">
            {cats.map((c) => {
              const count = getCategoryCount(c);
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative shrink-0 whitespace-nowrap px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${isActive
                      ? "bg-brand-black text-white shadow-lg shadow-black/10 scale-105"
                      : "bg-white text-brand-black border border-black/5 hover:border-black/20 hover:bg-neutral-50"
                    }`}
                >
                  <span>{c}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full ${isActive
                        ? "bg-brand-yellow text-brand-black"
                        : "bg-neutral-100 text-brand-gray"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MASONRY GRID COMPLÈTE */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 md:gap-8 space-y-5 sm:space-y-6 md:space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* BANNIÈRE D'APPEL À L'ACTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-24 md:mt-32 p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl md:rounded-[32px] bg-brand-black text-white relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-10 border border-white/10"
        >
          {/* Halo lumineux subtil (5% d'opacité pour éviter l'effet tache IA) */}
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-xl text-left">
            {/* Tagline avec la ligne jaune signature de la section Contact */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-8 sm:w-10 h-[2px] bg-brand-yellow" />
              <span className="text-brand-yellow font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                Prêt à sublimer votre image ?
              </span>
            </div>

            {/* Titre éditorial avec mise en valeur en italique */}
            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white leading-[0.92] sm:leading-[0.88]">
              Vous avez un <br />
              <span className="text-brand-yellow italic">projet en tête ?</span>
            </h3>

            {/* Texte secondaire épuré (opacity-60) */}
            <p className="mt-4 text-white/60 font-body text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
              Discutons de vos besoins graphiques dès aujourd'hui. Devis rapide et accompagnement personnalisé à Lubumbashi et à distance.
            </p>
          </div>

          {/* Boutons minimalistes (sans ombres fluorescentes) */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto flex-shrink-0">
            <motion.a
              href="https://wa.me/243976925615?text=Bonjour%20Gbnz%20Design%2C%20j'ai%20vu%20vos%20r%C3%A9alisations%20et%20je%20souhaite%20lancer%20un%20projet."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brand-yellow text-brand-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/#tarifs"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-brand-black transition-all duration-300 cursor-pointer w-full sm:w-auto"
              >
                <span>Consulter les tarifs</span>
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MODALE D'AFFICHAGE DU PROJET */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer />
    </main>
  );
}
