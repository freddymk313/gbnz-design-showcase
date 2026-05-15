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
        duration: 2,
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
    { value: 50, label: "Clients satisfaits" },
    { value: 100, label: "Projets livrés" },
    { value: 3, label: "Ans d'expertise" },
  ];

  return (
    <section id="apropos" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TITRE CENTRÉ — Strictement identique à la section Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-6xl md:text-8xl text-brand-black leading-none uppercase tracking-tighter">
            Notre <span className="text-brand-yellow">Histoire</span>
          </h2>
          <p className="mt-6 text-brand-gray text-xl font-body max-w-xl mx-auto">
            Propulser les marques vers de nouveaux sommets
          </p>
          <div className="w-12 h-1 bg-brand-yellow mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* BLOC CONTENU ASYMÉTRIQUE ÉPURÉ */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* TEXTE MANIFESTE (7 Colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-brand-gray text-lg md:text-xl font-body leading-relaxed"
          >
            <p>
              <strong className="text-brand-black font-bold text-2xl block mb-4 font-display tracking-tight uppercase">
                Un studio de design né en République Démocratique du Congo.
              </strong>
              Gbnz Design est une maison créative bâtie sur une conviction simple : chaque entreprise mérite une identité visuelle forte, mémorable et taillée pour l'excellence.
            </p>
            <p>
              De Kinshasa à Lubumbashi, nous accompagnons les entrepreneurs et les institutions ambitieuses en traduisant leur vision en outils de communication percutants — du logo sur mesure aux campagnes d'affichage d'envergure.
            </p>
            
            <div className="pt-6">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 font-bold uppercase text-xs tracking-widest text-brand-black border-b-2 border-brand-yellow pb-2 hover:text-brand-yellow transition-colors group"
              >
                Travailler avec le studio 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* STATS & BLOC MINI (5 Colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8 w-full"
          >
            {/* Le bloc de stats épuré */}
            <div className="bg-[#F9F9F9] border border-black/5 rounded-[32px] p-10 grid grid-cols-3 gap-4 text-center">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col justify-center">
                  <p className="font-display text-4xl md:text-5xl text-brand-black tracking-tight">
                    <Counter to={s.value} />
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-brand-gray font-bold mt-2 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Carte Noire Signature — Fait écho à la carte "Affiches" des Services */}
            <div className="bg-brand-black text-white rounded-[32px] p-10 flex flex-col justify-between h-52 shadow-xl shadow-black/5 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-yellow">
                Positionnement
              </span>
              <p className="font-display text-3xl uppercase tracking-tight leading-none mt-4 text-white">
                Standards Internationaux.<br />
                Ancrage Local.
              </p>
              <div className="w-12 h-[2px] bg-brand-yellow mt-6" />
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}