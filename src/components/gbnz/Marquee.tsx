import { motion } from "framer-motion";

const items = [
  "Logo Design", "Identité Visuelle", "Affiches Événementielles", "Branding",
  "Direction Artistique", "Flyers", "Bannières", "Charte Graphique",
];

export function Marquee() {
  const row = [...items, ...items, ...items];

  return (
    <div className="relative py-6 sm:py-8 md:py-10 bg-white overflow-hidden border-y border-black/5">
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30,
          ease: "linear" 
        }}
        className="flex gap-8 sm:gap-12 md:gap-16 whitespace-nowrap items-center"
      >
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-8 sm:gap-12 md:gap-16">
            <span className="font-display text-xl sm:text-2xl md:text-4xl uppercase text-brand-black tracking-tighter opacity-90 hover:text-brand-yellow transition-colors duration-500 cursor-default">
              {t}
            </span>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 bg-brand-yellow flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
