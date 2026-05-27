import posterImage from "@/assets/poster.jpg";

import { motion, useScroll, useTransform, useSpring, useMotionValue, cubicBezier } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: cubicBezier(0.16, 1, 0.3, 1) } 
  },
};

export function Hero() {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, 150]);
  
  // Mouse movement for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 25;
    const moveY = (clientY - window.innerHeight / 2) / 25;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  return (
    <section 
      id="accueil" 
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-white"
    >
      {/* BACKGROUND ELEMENTS */}
      <motion.div
        style={{ y: blobY }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-yellow/30 blur-[120px] pointer-events-none"
      />
      
      {/* NOISE TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* TEXT CONTENT */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="lg:col-span-7"
        >
          <motion.div variants={item} 
          className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow text-brand-black text-xs font-semibold tracking-wide uppercase"
          >
            Studio Créatif · Lubumbashi, RDC
          </motion.div>

          <motion.h1 
            variants={item} 
            className="mt-8 font-display text-[60px] sm:text-[90px] lg:text-[110px] leading-[0.85] text-brand-black tracking-tighter"
          >
            VOTRE VISION,<br />
            <span className="text-brand-yellow italic">NOTRE DESIGN.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-8 text-xl text-brand-gray max-w-xl leading-relaxed font-body">
            Gbnz Design transforme vos idées en identités visuelles percutantes. Nous créons des marques qui dominent le marché de Kinshasa et d'ailleurs.
          </motion.p>

          {/* <motion.div variants={item} className="mt-10 flex flex-wrap gap-5">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-brand-black text-white font-bold uppercase text-xs tracking-widest shadow-2xl shadow-black/20 transition-all"
            >
              Démarrer un projet <ArrowRight size={18} className="text-white" />
            </motion.a>
            
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-5 rounded-full border-2 border-brand-black text-brand-black font-bold uppercase text-xs tracking-widest transition-all"
            >
              Voir nos créations
            </motion.a>
          </motion.div> */}

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-5">
  {/* Bouton Principal - Démarrer un projet */}
  <motion.a
    href="#contact"
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-black text-white text-sm font-bold uppercase tracking-tighter shadow-2xl shadow-black/20 transition-all"
  >
    Démarrer un projet <ArrowRight size={18} className="text-white" />
  </motion.a>
  
  {/* Bouton Secondaire - Voir nos créations */}
  <motion.a
    href="#portfolio"
    whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-brand-black text-brand-black text-sm font-bold uppercase tracking-tighter transition-all"
  >
    Voir nos créations
  </motion.a>
</motion.div>

          {/* SOCIAL PROOF */}
          <motion.div variants={item} className="mt-12 pt-10 border-t border-black/5 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <div className="text-sm font-medium text-brand-gray">
              <span className="text-brand-black font-bold">+50 clients</span> nous font confiance <br/>
              à Lubumbashi & International
            </div>
          </motion.div>
        </motion.div>

        {/* VISUAL CARDS SECTION */}
        <div className="lg:col-span-5 relative h-[600px] hidden lg:flex items-center justify-center">
          <motion.div 
            style={{ x: springX, y: springY }}
            className="relative w-full h-full"
          >
            {[
              { rotate: -12, x: -30, y: 0, delay: 0.4, label: "Logo Design" },
              { rotate: 6, x: 50, y: -40, delay: 0.6, label: "Branding" },
              { rotate: -2, x: 10, y: 60, delay: 0.8, label: "Affiches" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: c.rotate, x: c.x, y: c.y }}
                transition={{ delay: c.delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: c.y - 20, scale: 1.05, transition: { duration: 0.3 } }}
                // Modifié: w-72 h-96 (plus gros), shadow supprimé, border ajouté pour la clarté si bg blanc
                className="absolute inset-0 m-auto w-72 h-96 rounded-[24px] border border-black/5 p-6 flex flex-col justify-between overflow-hidden group bg-white"
                style={{ zIndex: 3 - i }}
              >
                {/* 1. L'image importée en tâche de fond de la carte */}
                <img 
                  src={posterImage} 
                  alt={c.label} 
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />

                {/* 2. Overlay clair et discret pour garder le texte lisible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10" />

                {/* 3. Contenu (Forcé en blanc et z-20 pour passer devant l'image) */}
                <div className="relative z-20 flex justify-between items-start">
                    {/* <GbnzLogo inverted={true} className="w-12" /> */}
                    {/* Modifié: text-black pour la clarté */}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                        {c.label}
                    </span>
                </div>

                {/* Petit spacer pour pousser le footer de la carte vers le bas */}
                <div className="relative z-20 flex-grow" />

                <div className="relative z-20 flex items-center justify-between mt-4">
                  {/* Modifié: bg-brand-black pour la clarté */}
                  <div className="h-1.5 w-12 rounded-full bg-brand-yellow" />
                  {/* Modifié: text-black pour la clarté */}
                  <span className="text-[9px] text-white/70 uppercase font-mono tracking-wider">Gbnz Studio</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Scroll</span>
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}