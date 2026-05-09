import { motion } from "framer-motion";

const items = [
  "Logo Design", "Identité Visuelle", "Affiches Événementielles", "Branding",
  "Direction Artistique", "Flyers", "Bannières", "Charte Graphique",
];

export function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y-2 border-brand-yellow py-6 bg-white overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {row.map((t, i) => (
          <span key={i} className="font-display text-2xl uppercase text-brand-black flex items-center gap-10">
            {t}
            <span className="w-2 h-2 rounded-full bg-brand-yellow inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
