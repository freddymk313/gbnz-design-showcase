import { motion } from "framer-motion";
import { PenTool, Frame, Palette, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Création de Logo",
    desc: "Nous concevons des logos uniques qui capturent l'essence de votre marque et vous démarquent de la concurrence.",
    featured: false,
  },
  {
    icon: Frame,
    title: "Design d'Affiches",
    desc: "Des affiches événementielles, promotionnelles ou corporatives conçues avec impact et créativité maximale.",
    featured: true,
  },
  {
    icon: Palette,
    title: "Identité Visuelle",
    desc: "Charte graphique complète : couleurs, typographies, templates et guide de marque pour une cohérence parfaite.",
    featured: false,
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
        
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-brand-black leading-none uppercase tracking-tighter">
            Nos <span className="text-brand-yellow">Services</span>
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 text-brand-gray text-base sm:text-lg md:text-xl font-body max-w-xl mx-auto">
            Ce que nous créons pour vous
          </p>
          <div className="w-10 sm:w-12 h-1 bg-brand-yellow mx-auto mt-4 sm:mt-6 md:mt-8 rounded-full" />
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className={`group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[32px] transition-all duration-500 h-full flex flex-col ${
                s.featured
                  ? "bg-brand-black text-white shadow-[0_20px_50px_-15px_rgba(245,196,0,0.2)]"
                  : "bg-[#F9F9F9] border border-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/5"
              }`}
            >
              {/* Badge Populaire */}
              {s.featured && (
                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 md:top-8 md:right-8 flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-brand-yellow text-brand-black text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-black animate-pulse" />
                  Populaire
                </div>
              )}

              {/* Icon Container */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 md:mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                s.featured ? "bg-white/10" : "bg-white shadow-sm"
              }`}>
                <s.icon className="text-brand-yellow w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 tracking-tight uppercase">
                  {s.title}
                </h3>
                <p className={`text-xs sm:text-sm md:text-base leading-relaxed mb-6 md:mb-8 ${s.featured ? "text-gray-400" : "text-brand-gray"}`}>
                  {s.desc}
                </p>
              </div>

              {/* Footer Interactif */}
              <div className="mt-4 sm:mt-6 md:mt-8 flex items-center justify-between pt-4 border-t border-black/5">
                <div className={`h-[1px] transition-all duration-500 group-hover:w-16 w-8 ${s.featured ? "bg-brand-yellow" : "bg-brand-black"}`} />
                <div className={`p-2.5 sm:p-3 rounded-full border transition-all duration-300 ${
                  s.featured 
                    ? "border-white/10 group-hover:bg-brand-yellow group-hover:text-brand-black" 
                    : "border-black/5 group-hover:bg-brand-black group-hover:text-white"
                }`}>
                  <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
