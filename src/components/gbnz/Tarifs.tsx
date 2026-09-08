import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Wallet, 
  MessageCircle, 
  Frame, 
  PenTool,
  PartyPopper,
  Flame,
  Church,
  Calendar,
  Briefcase,
  Building2,
  Building,
  UserCheck
} from "lucide-react";

export interface PricingItem {
  id: string;
  category: "affiches" | "logos";
  name: string;
  subtitle: string;
  price: string;
  numericPrice: number;
  badge?: string;
  highlight?: boolean;
  icon: React.ElementType;
  features: string[];
  whatsappMessage: string;
}

export const affichesPricing: PricingItem[] = [
  {
    id: "culte",
    category: "affiches",
    name: "Affiche Culte",
    subtitle: "Cultes, conférences, croisades, séminaires & veillées",
    price: "25.000 FC",
    numericPrice: 25000,
    badge: "Recommandé",
    highlight: true,
    icon: Church,
    features: [
      "Design professionnel et personnalisé",
      "Jusqu'à 3 personnes sur l'affiche",
      "Plus de 3 personnes sur l'affiche : 35.000 FC",
      "Format haute définition pour réseaux sociaux",
      "Fichier prêt pour impression",
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander une *Affiche Culte* à *25.000 FC*. Si l'affiche contient plus de 3 personnes, le tarif est de *35.000 FC*.",
  },

  {
    id: "anniversaire",
    category: "affiches",
    name: "Affiche Anniversaire",
    subtitle: "Pour célébrer vos anniversaires et moments spéciaux",
    price: "45.000 FC",
    numericPrice: 45000,
    icon: PartyPopper,
    features: [
      "Design personnalisé selon votre thème",
      "Mise en valeur de la photo principale",
      "Composition graphique professionnelle",
      "Format haute définition",
      "Fichier prêt pour impression et réseaux sociaux",
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander une *Affiche Anniversaire* à *45.000 FC*.",
  },

  {
    id: "manif-celebration",
    category: "affiches",
    name: "Manif & Célébration",
    subtitle: "Manifestations, célébrations et événements spéciaux",
    price: "50.000 FC",
    numericPrice: 50000,
    icon: PartyPopper,
    features: [
      "Design professionnel et accrocheur",
      "Mise en valeur des participants et informations",
      "Composition adaptée à votre événement",
      "Format haute définition",
      "Fichier prêt pour impression et réseaux sociaux",
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander une *Affiche Manif & Célébration* à *50.000 FC*.",
  },

  {
    id: "affiche-publicitaire",
    category: "affiches",
    name: "Affiche Publicitaire",
    subtitle: "Pour promouvoir vos produits, services ou activités",
    price: "50.000 FC",
    numericPrice: 50000,
    icon: Briefcase,
    features: [
      "Design publicitaire professionnel",
      "Mise en avant de vos produits ou services",
      "Composition pensée pour attirer l'attention",
      "Format haute définition",
      "Fichier prêt pour impression et réseaux sociaux",
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander une *Affiche Publicitaire* à *50.000 FC*.",
  },
];

export const logosPricing: PricingItem[] = [
  {
    id: "logo-eglise",
    category: "logos",
    name: "Logo Église",
    subtitle: "Identité visuelle pour églises, ministères et communautés",
    price: "45.000 FC",
    numericPrice: 45000,
    icon: Church,
    features: [
      "Création d'un logo professionnel et personnalisé",
      "Symbole adapté à l'identité de votre église",
      "Formats haute définition",
      "Version adaptée aux réseaux sociaux",
      "Fichier prêt pour impression",
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander un *Logo Église* à *45.000 FC*.",
  },

  {
    id: "logo-entreprise",
    category: "logos",
    name: "Logo Entreprise",
    subtitle: "Pour entreprises, commerces, marques et organisations",
    price: "55.000 FC",
    numericPrice: 55000,
    badge: "Best Seller",
    highlight: true,
    icon: Building2,
    features: [
      "Logo professionnel et personnalisé",
      "Création adaptée à votre activité",
      "Formats haute définition",
      "Version adaptée aux supports numériques",
      "Fichier prêt pour impression",
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander un *Logo Entreprise* à *55.000 FC*.",
  },

  {
    id: "logo-personnel",
    category: "logos",
    name: "Logo Personnel",
    subtitle: "Pour particuliers, artistes, créateurs et personal branding",
    price: "65.000 FC",
    numericPrice: 65000,
    icon: UserCheck,
    features: [
      "Logo personnalisé et unique",
      "Design adapté à votre personnalité",
      "Formats haute définition",
      "Utilisable sur les réseaux sociaux",
      "Fichier prêt pour impression",
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander un *Logo Personnel* à *65.000 FC*.",
  },
];

type FilterType = "all" | "affiches" | "logos";

export function Tarifs() {
  const [filter, setFilter] = useState<FilterType>("all");

  const openWhatsApp = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/243976925615?text=${encoded}`, "_blank");
  };

  return (
    <section id="tarifs" className="py-16 sm:py-24 md:py-32 bg-[#F9F9F9] relative overflow-hidden border-t border-black/5">
      {/* Decorative subtle background accents */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-black/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
         
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-brand-black leading-none uppercase tracking-tighter">
            Nos <span className="text-brand-yellow">Tarifs</span>
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 text-brand-gray text-sm sm:text-base md:text-xl font-body max-w-2xl mx-auto leading-relaxed">
            Des tarifs clairs, transparents et sans surprise en Francs Congolais (FC) pour donner vie à vos projets à Lubumbashi et partout en RDC.
          </p>
          <div className="w-10 sm:w-12 h-1 bg-brand-yellow mx-auto mt-4 sm:mt-6 md:mt-8 rounded-full" />
        </motion.div>

        {/* CATEGORY SWITCHER / TABS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 md:mb-20"
        >
          {[
            { id: "all", label: "Toutes les formules", count: "8" },
            { id: "affiches", label: "Affiches", count: "5" },
            { id: "logos", label: "Logos", count: "3" },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as FilterType)}
                className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-brand-black text-white shadow-lg shadow-black/10 scale-105"
                    : "bg-white text-brand-black border border-black/5 hover:border-black/20 hover:bg-neutral-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-brand-yellow text-brand-black"
                      : "bg-neutral-100 text-brand-gray"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* GROUP 1: AFFICHES */}
        {(filter === "all" || filter === "affiches") && (
          <div className="mb-12 sm:mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 pb-3 sm:pb-4 border-b border-black/10"
            >
              <div>
                <div className="flex items-center gap-2 text-brand-yellow mb-1.5 sm:mb-2">
                  <Frame size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/60">
                    Catégorie 01
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-brand-black">
                  Affiches & Posters
                </h3>
              </div>
              <p className="text-brand-gray text-xs sm:text-sm md:text-base font-body max-w-md">
                Designs captivants pour cultes, événements grand public, anniversaires et campagnes commerciales.
              </p>
            </motion.div>

            {/* Affiches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {affichesPricing.map((item, index) => (
                <PricingCard
                  key={item.id}
                  item={item}
                  index={index}
                  onSelect={() => openWhatsApp(item.whatsappMessage)}
                />
              ))}
            </div>
          </div>
        )}

        {/* GROUP 2: LOGOS */}
        {(filter === "all" || filter === "logos") && (
          <div className="mb-10 sm:mb-14 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 pb-3 sm:pb-4 border-b border-black/10"
            >
              <div>
                <div className="flex items-center gap-2 text-brand-yellow mb-1.5 sm:mb-2">
                  <PenTool size={18} className="sm:w-5 sm:h-5" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-black/60">
                    Catégorie 02
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-brand-black">
                  Logos & Identités Visuelles
                </h3>
              </div>
              <p className="text-brand-gray text-xs sm:text-sm md:text-base font-body max-w-md">
                Identités graphiques solides et sur-mesure pour asseoir la réputation de votre église, entreprise ou marque personnelle.
              </p>
            </motion.div>

            {/* Logos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {logosPricing.map((item, index) => (
                <PricingCard
                  key={item.id}
                  item={item}
                  index={index}
                  onSelect={() => openWhatsApp(item.whatsappMessage)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface PricingCardProps {
  item: PricingItem;
  index: number;
  onSelect: () => void;
}

function PricingCard({ item, index, onSelect }: PricingCardProps) {
  const Icon = item.icon;
  const isDark = Boolean(item.highlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative p-6 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl md:rounded-[32px] transition-all duration-500 flex flex-col justify-between ${
        isDark
          ? "bg-brand-black text-white shadow-[0_20px_50px_-15px_rgba(245,196,0,0.2)] border border-brand-yellow/30"
          : "bg-white text-brand-black border border-black/5 shadow-lg shadow-black/[0.02] hover:shadow-xl hover:shadow-black/5"
      }`}
    >
      {/* Popular / Recommended Badge */}
      {item.badge && (
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
              isDark
                ? "bg-brand-yellow text-brand-black"
                : "bg-[#F9F9F9] text-brand-black border border-black/10"
            }`}
          >
            {item.highlight && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-black animate-pulse" />
            )}
            {item.badge}
          </span>
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${
              isDark ? "bg-white/10 text-brand-yellow" : "bg-[#F9F9F9] text-brand-black"
            }`}
          >
            <Icon size={18} className="sm:w-5 sm:h-5" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow">
        <h4 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase mb-1.5 sm:mb-2">
          {item.name}
        </h4>
        <p
          className={`text-xs sm:text-sm font-body mb-4 sm:mb-6 min-h-0 sm:min-h-[38px] leading-relaxed ${
            isDark ? "text-gray-300" : "text-brand-gray"
          }`}
        >
          {item.subtitle}
        </p>

        {/* Price Display */}
        <div className="mb-5 sm:mb-8 pb-4 sm:pb-6 border-b border-black/10">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-display text-3xl sm:text-5xl md:text-6xl tracking-tight ${
                isDark ? "text-brand-yellow" : "text-brand-black"
              }`}
            >
              {item.price}
            </span>
          </div>
          <span
            className={`text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold block mt-1 ${
              isDark ? "text-gray-400" : "text-brand-gray"
            }`}
          >
            Prix forfaitaire net
          </span>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8">
          {item.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
              <div
                className={`mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDark
                    ? "bg-brand-yellow text-brand-black"
                    : "bg-black/5 text-brand-black"
                }`}
              >
                <Check size={10} strokeWidth={3} className="sm:w-3 sm:h-3" />
              </div>
              <span
                className={`leading-snug font-body ${
                  isDark ? "text-gray-200" : "text-brand-black/80"
                }`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3.5 px-5 sm:py-4 sm:px-6 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
          isDark
            ? "bg-brand-yellow text-brand-black hover:bg-white shadow-lg shadow-brand-yellow/20"
            : "bg-brand-black text-white hover:bg-brand-yellow hover:text-brand-black shadow-md shadow-black/10"
        }`}
      >
        <span>Commander cette formule</span>
        <ArrowRight size={14} />
      </motion.button>
    </motion.div>
  );
}
