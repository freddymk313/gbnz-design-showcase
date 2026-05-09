import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  useEffect(() => {
    if (inView) {
      const ctrl = animate(mv, to, {
        duration: 2,
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v) + suffix;
        },
      });
      return () => ctrl.stop();
    }
  }, [inView, to, suffix, mv]);
  return <span ref={ref}>0{suffix}</span>;
}

export function About() {
  const stats = [
    { value: 50, label: "Clients satisfaits" },
    { value: 100, label: "Projets livrés" },
    { value: 3, label: "Années d'expérience" },
  ];

  return (
    <section id="apropos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-yellow">Notre histoire</span>
          <h2 className="mt-3 font-display text-5xl md:text-6xl leading-tight text-brand-black">
            Design Né au Cœur<br />de Kinshasa
          </h2>
          <p className="mt-6 text-brand-gray leading-relaxed text-lg">
            Gbnz Design est une maison créative fondée à Kinshasa, en République Démocratique du Congo. Nous croyons que chaque entreprise mérite une identité visuelle forte, professionnelle et mémorable. Notre mission : donner vie à vos idées avec des designs qui parlent, qui vendent et qui inspirent.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl text-brand-yellow"><Counter to={s.value} /></p>
                <p className="text-sm text-brand-gray mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl bg-brand-black overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-brand-yellow" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-yellow rotate-12" />
            <div className="absolute bottom-10 left-10 w-24 h-1 bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-white text-7xl">GBNZ</div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3"
          >
            <Star className="text-brand-yellow fill-brand-yellow" size={24} />
            <div>
              <p className="font-semibold text-brand-black text-sm">Studio Certifié</p>
              <p className="text-xs text-brand-gray">RDC</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
