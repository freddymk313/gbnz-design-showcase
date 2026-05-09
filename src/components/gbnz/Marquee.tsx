import { motion } from "framer-motion";

const items = [
  "Logo Design", "Identité Visuelle", "Affiches Événementielles", "Branding",
  "Direction Artistique", "Flyers", "Bannières", "Charte Graphique",
];

export function Marquee() {
  // On triple les items pour garantir un défilement infini sans saut visuel
  const row = [...items, ...items, ...items];

  return (
    <div className="relative py-10 bg-white overflow-hidden border-y border-black/5">
      {/* Masque de transparence pour adoucir les bords gauche et droit */}
      {/* <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-white" /> */}

      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30, // Plus lent = plus luxueux
          ease: "linear" 
        }}
        className="flex gap-16 whitespace-nowrap items-center"
      >
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-display text-2xl md:text-4xl uppercase text-brand-black tracking-tighter opacity-90 hover:text-brand-yellow transition-colors duration-500 cursor-default">
              {t}
            </span>
            {/* Le point séparateur devient un élément design : un losange ou un cercle jaune précis */}
            <div className="w-3 h-3 rotate-45 bg-brand-yellow" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}