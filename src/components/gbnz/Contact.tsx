import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Check, MessageCircle, Instagram, Facebook, ArrowRight } from "lucide-react";

const schema = z.object({
  prenom: z.string().trim().min(2, "Prénom requis"),
  nom: z.string().trim().min(2, "Nom requis"),
  email: z.string().trim().email("Email invalide").max(255),
  whatsapp: z.string().trim().min(8, "Numéro requis").max(20),
  service: z.string().min(1, "Sélectionnez un service"),
  description: z.string().trim().min(10, "Décrivez votre projet (min 10 caractères)").max(1000),
  budget: z.string().min(1, "Sélectionnez un budget"),
  date: z.string().min(1, "Date requise"),
});
type FormData = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submission:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-32 bg-brand-black text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* LEFT COLUMN: BRAND INFO (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[2px] bg-brand-yellow" />
              <span className="text-brand-yellow font-bold text-xs uppercase tracking-[0.3em]">Briefing</span>
            </div>
            
            <h2 className="font-display text-6xl md:text-8xl leading-[0.85] text-white tracking-tighter uppercase">
              Créons <br /> <span className="text-brand-yellow italic">Ensemble.</span>
            </h2>
            
            <p className="mt-8 text-white/60 text-lg font-body leading-relaxed max-w-md">
              Réservez une consultation gratuite. Parlez-nous de vos objectifs et recevez une proposition de design sur mesure sous 24 heures.
            </p>

            {/* Contact Info Rows */}
            <div className="mt-12 space-y-6 border-l border-white/10 pl-6">
              <a href="mailto:kabowddoxa4@gmail.com" className="group flex items-center gap-4 text-white/80 hover:text-brand-yellow transition-colors font-body text-base">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                  <Mail size={18} />
                </div>
                kabowddoxa4@gmail.com
              </a>
              <a href="tel:+243976925615" className="group flex items-center gap-4 text-white/80 hover:text-brand-yellow transition-colors font-body text-base">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                  <Phone size={18} />
                </div>
                +243 976 925 615 <span className="text-xs text-white/40">(Gloire Banza)</span>
              </a>
              <div className="flex items-center gap-4 text-white/60 font-body text-base">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-yellow">
                  <MapPin size={18} />
                </div>
                Kinshasa & Lubumbashi, RDC
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-16">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 font-body">Suivez le studio</p>
            <div className="flex gap-3">
              {[
                { Icon: MessageCircle, href: "https://wa.me/243976925615", label: "WhatsApp" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a 
                  key={label} 
                  href={href} 
                  aria-label={label} 
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow hover:scale-105 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: PREMIUM FORM CARD (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-white text-brand-black rounded-[32px] p-10 md:p-12 shadow-2xl relative overflow-hidden w-full border border-white/5"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-brand-yellow flex items-center justify-center shadow-lg shadow-brand-yellow/20"
                >
                  <Check size={44} className="text-brand-black" strokeWidth={3} />
                </motion.div>
                <h3 className="font-display text-4xl mt-8 uppercase tracking-tight">Message Reçu !</h3>
                <p className="text-brand-gray mt-3 font-body max-w-xs text-base">
                  Merci pour votre confiance. Notre équipe analyse votre brief et revient vers vous sous 24h.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                initial={{ opacity: 1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Prénom" error={errors.prenom?.message}>
                    <input {...register("prenom")} className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                  <Field label="Nom" error={errors.nom?.message}>
                    <input {...register("nom")} className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Email professionnel" error={errors.email?.message}>
                    <input type="email" {...register("email")} className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                  <Field label="Numéro WhatsApp" error={errors.whatsapp?.message}>
                    <input {...register("whatsapp")} placeholder="+243..." className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                </div>

                <Field label="Type de service requis" error={errors.service?.message}>
                  <select {...register("service")} className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 appearance-none cursor-pointer">
                    <option value="">Sélectionner un service...</option>
                    <option value="Logo">Création de Logo</option>
                    <option value="Affiche">Design d'Affiches</option>
                    <option value="Identité complète">Identité Visuelle Complète</option>
                    <option value="Autre">Autre projet créatif</option>
                  </select>
                </Field>

                <Field label="Description de votre projet" error={errors.description?.message}>
                  <textarea {...register("description")} rows={4} placeholder="Parlez-nous de vos valeurs, vos délais, votre cible..." className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 resize-none" />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Budget estimé" error={errors.budget?.message}>
                    <select {...register("budget")} className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 cursor-pointer">
                      <option value="">Sélectionner...</option>
                      <option value="Moins de 100$">Moins de 100$</option>
                      <option value="100–300$">100$ – 300$</option>
                      <option value="300–1000$">300$ – 1 000$</option>
                      <option value="1000$+$">Plus de 1 000$</option>
                    </select>
                  </Field>
                  <Field label="Date de livraison souhaitée" error={errors.date?.message}>
                    <input type="date" {...register("date")} className="w-full px-4 py-3.5 bg-[#F9F9F9] border border-black/5 rounded-2xl text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 text-brand-gray" />
                  </Field>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, backgroundColor: "#E2B500" }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 rounded-2xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-brand-yellow/10 mt-6 transition-colors duration-300"
                >
                  Envoyer le brief du projet <ArrowRight size={14} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col items-start">
      <label className="block text-[10px] font-bold text-brand-black mb-2 uppercase tracking-widest font-body opacity-80">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1 font-body font-medium">{error}</p>}
    </div>
  );
}