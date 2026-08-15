// 1. Importe les 3 affiches spécifiquement
import poster4 from "@/assets/portfolio/4.jpg";
import poster17 from "@/assets/portfolio/17.jpg";
import poster9 from "@/assets/portfolio/9.jpg";

import { motion, useScroll, useTransform, useSpring, useMotionValue, cubicBezier } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: cubicBezier(0.16, 1, 0.3, 1) }
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
      className="relative flex items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-white min-h-[auto] lg:min-h-[92vh]"
    >
      {/* BACKGROUND ELEMENTS */}
      <motion.div
        style={{ y: blobY }}
        className="absolute -top-32 -right-32 w-[350px] sm:w-[500px] lg:w-[600px] h-[350px] sm:h-[500px] lg:h-[600px] rounded-full bg-brand-yellow/25 blur-[90px] md:blur-[120px] pointer-events-none"
      />

      {/* NOISE TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10 w-full">

        {/* TEXT CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.div
            variants={item}
            className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-brand-yellow text-brand-black text-[11px] sm:text-xs font-semibold tracking-wide uppercase"
          >
            Studio Créatif · Lubumbashi, RDC
          </motion.div>

          {/* MAIN TITLE : Balanced for mobile 2-3 lines without overflowing */}
          <motion.h1
            variants={item}
            className="mt-4 sm:mt-6 md:mt-8 font-display text-[42px] sm:text-[68px] md:text-[88px] lg:text-[105px] xl:text-[110px] leading-[0.92] md:leading-[0.85] text-brand-black tracking-tighter uppercase"
          >
            VOTRE VISION,<br />
            <span className="text-brand-yellow italic">NOTRE DESIGN.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-brand-gray max-w-xl leading-relaxed font-body"
          >
            Gbnz Design transforme vos idées en identités visuelles percutantes. Nous créons des marques qui dominent le marché de Kinshasa et d'ailleurs.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            variants={item}
            className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5"
          >
            {/* Bouton Principal - Démarrer un projet */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 md:px-8 md:py-4 rounded-full bg-brand-black text-white text-xs sm:text-sm font-bold uppercase tracking-tighter transition-all text-center"
            >
              <span>Démarrer un projet</span>
              <ArrowRight size={16} className="text-white" />
            </motion.a>

            {/* Bouton Secondaire - Voir nos créations */}
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 md:px-8 md:py-4 rounded-full border-2 border-brand-black text-brand-black text-xs sm:text-sm font-bold uppercase tracking-tighter transition-all text-center"
            >
              <span>Voir nos créations</span>
            </motion.a>
          </motion.div>

          {/* SOCIAL PROOF */}
          <motion.div
            variants={item}
            className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 md:pt-10 border-t border-black/5 flex items-center gap-4 sm:gap-6 md:gap-8"
          >
            <div className="flex -space-x-2.5 sm:-space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <div className="text-xs sm:text-sm font-medium text-brand-gray leading-tight sm:leading-snug">
              <span className="text-brand-black font-bold">+50 clients</span> nous font confiance <br />
              à Lubumbashi & International
            </div>
          </motion.div>
        </motion.div>

        {/* VISUAL CARDS SECTION (Desktop only) */}
        <div className="lg:col-span-5 relative h-[520px] xl:h-[600px] hidden lg:flex items-center justify-center">
          <motion.div
            style={{ x: springX, y: springY }}
            className="relative w-full h-full"
          >
            {[
              { rotate: -12, x: -30, y: 0, delay: 0.4, label: "Affiche 4", image: poster4 },
              { rotate: 6, x: 50, y: -40, delay: 0.6, label: "Affiche 17", image: poster17 },
              { rotate: -2, x: 10, y: 60, delay: 0.8, label: "Affiche 9", image: poster9 },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: c.rotate, x: c.x, y: c.y }}
                transition={{ delay: c.delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: c.y - 20, scale: 1.05, zIndex: 10, transition: { duration: 0.3 } }}
                className="absolute inset-0 m-auto w-72 h-96 rounded-[24px] border border-black/5 p-6 flex flex-col justify-between overflow-hidden group bg-white shadow-xl"
                style={{ zIndex: 3 - i }}
              >
                <img
                  src={c.image}
                  alt={c.label}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10" />

                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                    {c.label}
                  </span>
                </div>

                <div className="relative z-20 flex-grow" />

                <div className="relative z-20 flex items-center justify-between mt-4">
                  <div className="h-1.5 w-12 rounded-full bg-brand-yellow" />
                  <span className="text-[9px] text-white/70 uppercase font-mono tracking-wider">Gbnz Studio</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR (Hidden on small mobile to avoid occupying screen height) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="hidden md:flex absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-30 pointer-events-none"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Scroll</span>
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
