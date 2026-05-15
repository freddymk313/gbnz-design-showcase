import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

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
    { value: 50, label: "Clients partenaires" },
    { value: 100, label: "Projets d'impact livrés" },
    { value: 3, label: "Ans de création pure" },
  ];

  return (
    <section id="apropos" className="py-32 bg-white tracking-tight">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* LAYOUT ASYMÉTRIQUE PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* BLOC DE GAUCHE : LE MANIFESTE TYPOGRAPHIQUE (7 Colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow block">
                Notre Histoire
              </span>
              <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-black leading-[0.85] uppercase tracking-tighter">
                CONCEVOIR <br />
                POUR <span className="text-brand-yellow italic">MARQUER.</span>
              </h2>
            </div>

            <div className="space-y-6 text-brand-gray text-lg md:text-xl font-body leading-relaxed max-w-xl">
              <p className="text-brand-black font-medium text-xl md:text-2xl leading-snug">
                Gbnz Design est un studio créatif né au cœur de la République Démocratique du Congo, forgé par la passion de l'impact visuel.
              </p>
              <p>
                De Kinshasa à Lubumbashi, nous brisons les codes traditionnels pour offrir aux marques une identité unique, capable de s'imposer sur le marché. Nous croyons en un design épuré, stratégique et sans fioritures.
              </p>
            </div>

            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 font-bold uppercase text-xs tracking-widest text-brand-black *border-b-2 border-brand-yellow pb-2 hover:text-brand-yellow transition-colors group"
              >
                Discuter avec le studio 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* BLOC DE DROITE : LES STATS TYPOGRAPHIQUES PURES (5 Colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-12 lg:pt-20 w-full"
          >
            {stats.map((s) => (
              <div 
                key={s.label} 
                className="flex items-baseline gap-6 border-b border-black/10 pb-6 last:border-0"
              >
                <span className="font-display text-7xl md:text-8xl text-brand-black leading-none min-w-[140px] block">
                  <Counter to={s.value} />
                </span>
                <p className="text-xs md:text-sm uppercase tracking-wider text-brand-gray font-bold max-w-[180px] leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}