import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GbnzLogo } from "./Logo";

type Cat = "Tout" | "Logos" | "Affiches" | "Identité Visuelle";
const cats: Cat[] = ["Tout", "Logos", "Affiches", "Identité Visuelle"];

const projects = [
  { title: "Gbnz Design", label: "Logo — Studio Créatif", cat: "Logos", bg: "bg-brand-black", aspect: "aspect-square", showLogo: true },
  { title: "Festival Lumière", label: "Affiche — Événement 2024", cat: "Affiches", bg: "bg-brand-yellow", aspect: "aspect-[3/4]" },
  { title: "Maison Kivu", label: "Identité — Restaurant", cat: "Identité Visuelle", bg: "bg-neutral-200", aspect: "aspect-square" },
  { title: "Tech Congo", label: "Logo — Startup", cat: "Logos", bg: "bg-brand-black", aspect: "aspect-[4/3]" },
  { title: "Mode Kin", label: "Affiche — Défilé", cat: "Affiches", bg: "bg-brand-yellow", aspect: "aspect-square" },
  { title: "Banque Élite", label: "Identité — Charte", cat: "Identité Visuelle", bg: "bg-neutral-200", aspect: "aspect-[3/4]" },
];

export function Portfolio() {
  const [active, setActive] = useState<Cat>("Tout");
  const filtered = projects.filter((p) => active === "Tout" || p.cat === active);

  return (
    <section id="portfolio" className="py-24 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-5xl md:text-7xl text-brand-black">Nos Réalisations</h2>
          <p className="mt-3 text-brand-gray text-lg">Une sélection de nos projets récents</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="relative px-5 py-2 text-sm font-medium rounded-full"
            >
              {active === c && (
                <motion.span
                  layoutId="tab-active"
                  className="absolute inset-0 bg-brand-black rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${active === c ? "text-white" : "text-brand-black"}`}>{c}</span>
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover="hover"
                className={`group relative break-inside-avoid rounded-2xl overflow-hidden ${p.bg} ${p.aspect} cursor-pointer shadow-md`}
              >
                {p.showLogo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GbnzLogo />
                  </div>
                )}
                <motion.div
                  variants={{ hover: { scale: 1.03 } }}
                  className="absolute inset-0"
                />
                <motion.div
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-6"
                >
                  <p className="font-display text-2xl">{p.title}</p>
                  <p className="text-sm text-white/70 mt-1">{p.label}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-brand-yellow font-semibold">
                    Voir le projet <ArrowRight size={16} />
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-black text-white font-semibold"
          >
            Voir tout le portfolio <ArrowRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
