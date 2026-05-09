import { motion } from "framer-motion";
import { PenTool, Frame, Palette } from "lucide-react";

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
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl text-brand-black">Nos Services</h2>
          <p className="mt-3 text-brand-gray text-lg">Ce que nous créons pour vous</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-2xl border-l-4 transition-shadow hover:shadow-2xl ${
                s.featured
                  ? "bg-brand-black text-white border-brand-yellow"
                  : "bg-white border-transparent hover:border-brand-yellow shadow-md"
              }`}
            >
              {s.featured && (
                <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-brand-yellow text-brand-black text-xs font-bold">
                  Populaire
                </span>
              )}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${s.featured ? "bg-brand-yellow/20" : "bg-brand-yellow/20"}`}>
                <s.icon className="text-brand-yellow" size={28} />
              </div>
              <h3 className="font-display text-3xl mb-3">{s.title}</h3>
              <p className={`leading-relaxed ${s.featured ? "text-white/70" : "text-brand-gray"}`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
