import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Check, MessageCircle, Instagram, Facebook } from "lucide-react";

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
    <section id="contact" className="py-24 bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-7xl">Prêt à Collaborer ?</h2>
          <div className="w-24 h-1 bg-brand-yellow mt-4" />
          <p className="mt-6 text-white/70 text-lg leading-relaxed">
            Réservez une consultation gratuite de 30 minutes avec notre équipe créative. Parlez-nous de votre projet et obtenez un devis personnalisé.
          </p>

          <div className="mt-10 space-y-4">
            <a href="mailto:kabowddoxa4@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-brand-yellow transition-colors">
              <Mail size={20} className="text-brand-yellow" /> kabowddoxa4@gmail.com
            </a>
            <a href="tel:+243976925615" className="flex items-center gap-3 text-white/80 hover:text-brand-yellow transition-colors">
              <Phone size={20} className="text-brand-yellow" /> +243 976 925 615 (Gloire Banza)
            </a>
            <div className="flex items-center gap-3 text-white/80">
              <MapPin size={20} className="text-brand-yellow" /> Kinshasa, République Démocratique du Congo
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { Icon: MessageCircle, href: "https://wa.me/243976925615", label: "WhatsApp" },
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Facebook, href: "#", label: "Facebook" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white text-brand-black rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center"
                >
                  <Check size={40} className="text-brand-black" strokeWidth={3} />
                </motion.div>
                <h3 className="font-display text-3xl mt-6">Merci !</h3>
                <p className="text-brand-gray mt-2">Nous vous contactons dans les 24h.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                initial={{ opacity: 1 }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Prénom" error={errors.prenom?.message}>
                    <input {...register("prenom")} className="form-input" />
                  </Field>
                  <Field label="Nom" error={errors.nom?.message}>
                    <input {...register("nom")} className="form-input" />
                  </Field>
                </div>
                <Field label="Email professionnel" error={errors.email?.message}>
                  <input type="email" {...register("email")} className="form-input" />
                </Field>
                <Field label="Numéro WhatsApp" error={errors.whatsapp?.message}>
                  <input {...register("whatsapp")} placeholder="+243..." className="form-input" />
                </Field>
                <Field label="Type de service" error={errors.service?.message}>
                  <select {...register("service")} className="form-input">
                    <option value="">Sélectionner...</option>
                    <option>Logo</option>
                    <option>Affiche</option>
                    <option>Identité complète</option>
                    <option>Autre</option>
                  </select>
                </Field>
                <Field label="Description du projet" error={errors.description?.message}>
                  <textarea {...register("description")} rows={3} className="form-input resize-none" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Budget estimé" error={errors.budget?.message}>
                    <select {...register("budget")} className="form-input">
                      <option value="">...</option>
                      <option>Moins de 100$</option>
                      <option>100–300$</option>
                      <option>300–1000$</option>
                      <option>1000$+</option>
                    </select>
                  </Field>
                  <Field label="Date souhaitée" error={errors.date?.message}>
                    <input type="date" {...register("date")} className="form-input" />
                  </Field>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full bg-brand-yellow text-brand-black font-bold mt-4"
                >
                  Envoyer ma demande →
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1.5px solid #e5e5e5;
          background: #fafafa;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus { border-color: #F5C400; background: white; }
      `}</style>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand-black mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
