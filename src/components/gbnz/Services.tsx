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
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Ton alignement centré préféré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-6xl md:text-8xl text-brand-black leading-none uppercase tracking-tighter">
            Nos <span className="text-brand-yellow">Services</span>
          </h2>
          <p className="mt-6 text-brand-gray text-xl font-body max-w-xl mx-auto">
            Ce que nous créons pour vous
          </p>
          <div className="w-12 h-1 bg-brand-yellow mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* Grille des services */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12 }}
              className={`group relative p-10 rounded-[32px] transition-all duration-500 h-full flex flex-col ${
                s.featured
                  ? "bg-brand-black text-white shadow-[0_30px_60px_-15px_rgba(245,196,0,0.15)]"
                  : "bg-[#F9F9F9] border border-black/5 hover:bg-white hover:shadow-2xl hover:shadow-black/5"
              }`}
            >
              {/* Badge Populaire */}
              {s.featured && (
                <div className="absolute top-8 right-8 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-yellow text-brand-black text-[10px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-black animate-pulse" />
                  Populaire
                </div>
              )}

              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                s.featured ? "bg-white/10" : "bg-white shadow-sm"
              }`}>
                <s.icon className="text-brand-yellow" size={32} />
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="font-display text-4xl mb-4 tracking-tight uppercase">{s.title}</h3>
                <p className={`text-base leading-relaxed mb-8 ${s.featured ? "text-gray-400" : "text-brand-gray"}`}>
                  {s.desc}
                </p>
              </div>

              {/* Footer Interactif */}
              <div className="mt-8 flex items-center justify-between">
                <div className={`h-[1px] transition-all duration-500 group-hover:w-16 w-8 ${s.featured ? "bg-brand-yellow" : "bg-brand-black"}`} />
                <div className={`p-3 rounded-full border transition-all duration-300 ${
                  s.featured 
                    ? "border-white/10 group-hover:bg-brand-yellow group-hover:text-brand-black" 
                    : "border-black/5 group-hover:bg-brand-black group-hover:text-white"
                }`}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}