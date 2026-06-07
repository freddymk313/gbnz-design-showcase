import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, X, Download } from "lucide-react";

// 1. Importation dynamique (inchangé)
const imagesGlob = import.meta.glob('@/assets/portfolio/*.jpg', { eager: true, import: 'default' });

const sortedImages = Object.entries(imagesGlob)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/\/(\d+)\.jpg$/)?.[1] || "0", 10);
    const numB = parseInt(pathB.match(/\/(\d+)\.jpg$/)?.[1] || "0", 10);
    return numA - numB;
  })
  .map(([_, url]) => url as string);

type Cat = "Tout" | "Logos" | "Affiches" | "Identité Visuelle";
const cats: Cat[] = ["Tout", "Logos", "Affiches", "Identité Visuelle"];

// 2. Données de projet modifiées : j'ai retiré la propriété 'aspect' fixe
const projectData = [
  { title: "Gbnz Design", label: "Logo — Studio Créatif", cat: "Logos" as Cat, bg: "bg-brand-black", showLogo: true },
  { title: "Festival Lumière", label: "Affiche — Événement 2024", cat: "Affiches" as Cat, bg: "bg-brand-yellow" },
  { title: "Maison Kivu", label: "Identité — Restaurant", cat: "Identité Visuelle" as Cat, bg: "bg-neutral-200" },
  { title: "Tech Congo", label: "Logo — Startup", cat: "Logos" as Cat, bg: "bg-brand-black" },
  { title: "Mode Kin", label: "Affiche — Défilé", cat: "Affiches" as Cat, bg: "bg-brand-yellow" },
  { title: "Banque Élite", label: "Identité — Charte", cat: "Identité Visuelle" as Cat, bg: "bg-neutral-200" },
];

const projects = projectData.map((data, index) => ({
  ...data,
  image: sortedImages[index] || sortedImages[0]
}));

type Project = typeof projects[0];

export function Portfolio() {
  const [active, setActive] = useState<Cat>("Tout");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => active === "Tout" || p.cat === active);

  // Bloquer le scroll du site quand la modale est ouverte
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-32 bg-[#F8F8F8] relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header (inchangé) */}
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

        {/* Filtres de Catégories (inchangé) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="relative px-5 md:px-6 py-2 text-brand-black text-xs font-bold uppercase tracking-tighter transition-colors"
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

        {/* Masonry Grid : CORRIGÉ pour afficher les images ENTIÈREMENT */}
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
                onClick={() => setSelectedProject(p)}
                // CORRECTION : J'ai retiré p.aspect d'ici. Le conteneur s'adapte à l'image.
                className={`group relative break-inside-avoid rounded-[32px] overflow-hidden ${p.bg} cursor-pointer border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                {/* L'image : CORRIGÉ. Elle occupe toute la largeur et définit sa propre hauteur. Pas de crop. */}
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    // CORRECTION : Plus de absolute inset-0, h-full, object-cover. Juste w-full et h-auto.
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                {/* Logo spécifique si activé et pas d'image - CORRECTION : J'ajoute aspect-square ici pour donner une forme par défaut si pas d'image */}
                {p.showLogo && !p.image && (
                  <div className="flex items-center justify-center p-12 aspect-square">
                    {/* <GbnzLogo className="w-full h-auto opacity-80 group-hover:scale-110 transition-transform duration-700" /> */}
                  </div>
                )}

                {/* Overlay au Hover - Toujours absolu par dessus l'image naturellement dimensionnée */}
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

        {/* Call to Action Final (inchangé) */}
        <div className="text-center mt-20">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-4 px-8 md:px-10 py-5 rounded-full bg-brand-black text-white text-sm font-bold uppercase tracking-tighter shadow-xl hover:shadow-brand-yellow/10 transition-all"
          >
            Démarrer un projet avec nous
            <ArrowRight size={18} className="text-brand-yellow group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* --- MODALE D'AFFICHAGE DU PROJET : CORRIGÉE pour aucune coupure --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-brand-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              // J'utilise max-w-7xl ici pour que les affiches très larges ne dépassent pas trop horizontalement
              className="relative flex flex-col items-center max-w-7xl w-full"
            >
              {/* Bouton Fermer */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white/50 hover:text-brand-yellow transition-colors p-2"
              >
                <X size={32} />
              </button>

              {/* L'image en grand : CORRIGÉ pour aucune coupure */}
              <div className="w-full flex justify-center">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  // CORRECTION : h-auto pour conserver le ratio, max-h-[85vh] pour tenir dans l'écran, 
                  // et object-contain pour garantir qu'elle n'est JAMAIS coupée.
                  className="w-auto h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Informations et bouton de téléchargement */}
              <div className="mt-4 flex flex-col items-center text-center">
                {/* <h3 className="text-white font-display text-3xl md:text-5xl uppercase tracking-tight mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-brand-yellow text-sm font-bold uppercase tracking-[0.2em] mb-6">
                  {selectedProject.label}
                </p> */}

                <a
                  href={selectedProject.image}
                  download={`${selectedProject.title.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-yellow text-brand-black font-bold text-sm uppercase tracking-tighter shadow-xl hover:bg-white transition-all"
                >
                  <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                  Télécharger l'affiche
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}