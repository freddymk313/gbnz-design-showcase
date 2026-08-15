import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Check, Instagram, Facebook, ArrowRight } from "lucide-react";

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
    // 1. Construire le message WhatsApp formaté
    const message = `*Nouveau Brief Projet - Gbnz Design*%0A` +
                    `---------------------------------%0A` +
                    `*Client :* ${data.prenom} ${data.nom}%0A` +
                    `*Email :* ${data.email}%0A` +
                    `*WhatsApp :* ${data.whatsapp}%0A%0A` +
                    `*Service :* ${data.service}%0A` +
                    `*Budget :* ${data.budget}%0A` +
                    `*Date souhaitée :* ${data.date}%0A%0A` +
                    `*Description :*%0A${encodeURIComponent(data.description)}`;

    // 2. Créer l'URL WhatsApp avec le numéro de Gloire
    const whatsappUrl = `https://wa.me/243976925615?text=${message}`;

    // 3. Ouvrir l'URL dans un nouvel onglet
    window.open(whatsappUrl, '_blank');

    // 4. Mettre à jour l'état de l'interface
    console.log("Form submission (sent to WhatsApp):", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-brand-black text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-yellow/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-start relative z-10">
        
        {/* LEFT COLUMN: BRAND INFO (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-8 sm:w-10 h-[2px] bg-brand-yellow" />
              <span className="text-brand-yellow font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">Briefing</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl leading-[0.92] sm:leading-[0.88] md:leading-[0.85] text-white tracking-tighter uppercase">
              Créons <br /> <span className="text-brand-yellow italic">Ensemble.</span>
            </h2>
            
            <p className="mt-4 sm:mt-6 md:mt-8 text-white/60 text-base sm:text-lg font-body leading-relaxed max-w-md">
              Réservez une consultation gratuite. Parlez-nous de vos objectifs et recevez une proposition de design sur mesure sous 24 heures.
            </p>

            {/* Contact Info Rows */}
            <div className="mt-8 sm:mt-10 md:mt-12 space-y-4 sm:space-y-6 border-l border-white/10 pl-4 sm:pl-6">
              <a href="mailto:kabowddoxa4@gmail.com" className="group flex items-center gap-3.5 text-white/80 hover:text-brand-yellow transition-colors font-body text-sm sm:text-base break-all">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                  <Mail size={16} className="sm:w-4 sm:h-4" />
                </div>
                kabowddoxa4@gmail.com
              </a>
              <a href="tel:+243976925615" className="group flex items-center gap-3.5 text-white/80 hover:text-brand-yellow transition-colors font-body text-sm sm:text-base">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                  <Phone size={16} className="sm:w-4 sm:h-4" />
                </div>
                +243 976 925 615 <span className="text-[11px] sm:text-xs text-white/40">(Gloire Banza)</span>
              </a>
              <div className="flex items-center gap-3.5 text-white/60 font-body text-sm sm:text-base">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-brand-yellow">
                  <MapPin size={16} className="sm:w-4 sm:h-4" />
                </div>
                Lubumbashi, RDC
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-8 sm:mt-12 md:mt-16">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 sm:mb-4 font-body">Suivez le studio</p>
            <div className="flex gap-2.5 sm:gap-3">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a 
                  key={label} 
                  href={href} 
                  aria-label={label} 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow hover:scale-105 transition-all duration-300"
                >
                  <Icon size={16} className="sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: PREMIUM FORM CARD (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-white text-brand-black rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden w-full border border-white/5"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-16 sm:py-24 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-brand-yellow flex items-center justify-center shadow-lg shadow-brand-yellow/20"
                >
                  <Check size={32} className="text-brand-black sm:w-10 sm:h-10" strokeWidth={3} />
                </motion.div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-8 uppercase tracking-tight">Message Transmis !</h3>
                <p className="text-brand-gray mt-2 sm:mt-3 font-body max-w-xs text-xs sm:text-sm md:text-base">
                  Merci pour votre confiance. Votre brief est en cours d'envoi via WhatsApp. Nous reviendrons vers vous sous 24h.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-5"
                initial={{ opacity: 1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                  <Field label="Prénom" error={errors.prenom?.message}>
                    <input {...register("prenom")} className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                  <Field label="Nom" error={errors.nom?.message}>
                    <input {...register("nom")} className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                  <Field label="Email professionnel" error={errors.email?.message}>
                    <input type="email" {...register("email")} className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                  <Field label="Numéro WhatsApp" error={errors.whatsapp?.message}>
                    <input {...register("whatsapp")} placeholder="+243..." className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300" />
                  </Field>
                </div>

                <Field label="Type de service requis" error={errors.service?.message}>
                  <select {...register("service")} className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 appearance-none cursor-pointer">
                    <option value="">Sélectionner un service...</option>
                    <option value="Logo">Création de Logo</option>
                    <option value="Affiche">Design d'Affiches</option>
                    <option value="Identité complète">Identité Visuelle Complète</option>
                    <option value="Autre">Autre projet créatif</option>
                  </select>
                </Field>

                <Field label="Description de votre projet" error={errors.description?.message}>
                  <textarea {...register("description")} rows={3} placeholder="Parlez-nous de vos valeurs, vos délais, votre cible..." className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 resize-none" />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                  <Field label="Budget estimé" error={errors.budget?.message}>
                    <select {...register("budget")} className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 cursor-pointer">
                      <option value="">Sélectionner...</option>
                      <option value="Moins de 100$">Moins de 100$</option>
                      <option value="100–300$">100$ – 300$</option>
                      <option value="300–1000$">300$ – 1 000$</option>
                      <option value="1000$+$">Plus de 1 000$</option>
                    </select>
                  </Field>
                  <Field label="Date de livraison souhaitée" error={errors.date?.message}>
                    <input type="date" {...register("date")} className="w-full px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#F9F9F9] border border-black/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-body outline-none focus:border-brand-yellow/60 focus:bg-white transition-all duration-300 text-brand-gray" />
                  </Field>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, backgroundColor: "#0D0D0D", color: "#FFFFFF" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-brand-yellow text-brand-black text-xs sm:text-sm font-bold uppercase tracking-tighter transition-all justify-center mt-4 sm:mt-6 shadow-md shadow-brand-yellow/10 duration-300 cursor-pointer"
                >
                  <span>Envoyer via WhatsApp</span>
                  <ArrowRight size={14} />
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
      <label className="block text-[9px] sm:text-[10px] font-bold text-brand-black mb-1 sm:mb-1.5 uppercase tracking-widest font-body opacity-80">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1 font-body font-medium">{error}</p>}
    </div>
  );
}
