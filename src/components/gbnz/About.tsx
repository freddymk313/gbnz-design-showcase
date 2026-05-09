import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star, ShieldCheck, Zap } from "lucide-react";

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  
  useEffect(() => {
    if (inView) {
      const ctrl = animate(mv, to, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v) + suffix;
        },
      });
      return () => ctrl.stop();
    }
  }, [inView, to, suffix, mv]);
  
  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export function About() {
  const stats = [
    { value: 50, label: "Clients satisfaits", icon: <Star size={14} /> },
    { value: 100, label: "Projets livrés", icon: <Zap size={14} /> },
    { value: 3, label: "Années d'expertise", icon: <ShieldCheck size={14} /> },
  ];

  return (
    <section id="apropos" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* TEXT CONTENT - 7 COLUMNS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-brand-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">L'ADN du Studio</span>
            </div>
            
            <h2 className="font-display text-6xl md:text-8xl leading-[0.85] text-brand-black tracking-tighter uppercase">
              L'excellence du Design <br />
              <span className="text-brand-yellow italic">Made in RDC.</span>
            </h2>
            
            <p className="mt-10 text-brand-gray leading-relaxed text-xl font-body max-w-2xl">
              Gbnz Design n'est pas juste un studio, c'est une vision. Basés entre <span className="text-brand-black font-bold">Kinshasa et Lubumbashi</span>, nous fusionnons culture locale et standards internationaux pour transformer chaque marque en une icône visuelle.
            </p>

            <p className="mt-6 text-brand-gray/80 leading-relaxed text-lg font-body max-w-xl">
              Nous croyons que le design est le moteur le plus puissant de la croissance. Notre mission est simple : donner aux entreprises congolaises les armes visuelles pour dominer le marché mondial.
            </p>
            
            {/* STATS BORDERED GRID */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 border-t border-black/5">
              {stats.map((s, i) => (
                <div key={s.label} className={`py-8 ${i !== 0 ? "sm:border-l sm:pl-8 border-black/5" : ""}`}>
                  <div className="flex items-center gap-2 mb-2 text-brand-yellow">
                    {s.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">{s.label}</span>
                  </div>
                  <p className="font-display text-6xl text-brand-black">
                    <Counter to={s.value} />
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* VISUAL COMPOSITION - 5 COLUMNS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[40px] bg-brand-black p-1">
              {/* Decorative elements representing design process */}
              <div className="absolute inset-0 overflow-hidden rounded-[38px]">
                <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-brand-yellow/20 blur-[80px]" />
                <div className="absolute bottom-[5%] left-[5%] w-[40%] h-[40%] rounded-full bg-brand-yellow/10 blur-[60px]" />
                
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              <div className="relative h-full w-full flex flex-col justify-between p-12 z-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white font-display">G</div>
                  <div className="text-right">
                    <p className="text-brand-yellow font-display text-2xl uppercase">Design</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-body font-bold">Process v.2.0</p>
                  </div>
                </div>

                <div className="font-display text-white text-[120px] leading-none tracking-tighter opacity-20">
                  GBNZ
                </div>

                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="w-24 h-1 bg-brand-yellow" />
                    <div className="w-16 h-1 bg-white/20" />
                  </div>
                  <div className="px-4 py-2 bg-white rounded-full text-brand-black text-[10px] font-bold uppercase tracking-tighter">
                    Est. 2021
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-brand-yellow rounded-3xl shadow-2xl p-8 flex flex-col gap-4 border-4 border-white z-20"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-black flex items-center justify-center text-brand-yellow shadow-inner">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <p className="font-display text-2xl text-brand-black leading-none uppercase">Studio<br/>Premium</p>
                <p className="text-[10px] text-brand-black/60 font-bold uppercase tracking-widest mt-2">Certifié RDC</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}