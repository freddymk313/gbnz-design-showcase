import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const siteSettingsDoc = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  studioName: 'Gbnz Design',
  tagline: 'VOTRE VISION, NOTRE DESIGN.',
  heroSubtitle:
    "Gbnz Design transforme vos idées en identités visuelles percutantes. Nous créons des marques qui dominent le marché de Kinshasa et d'ailleurs.",
  location: 'Studio Créatif · Lubumbashi, RDC',
  whatsappNumber: '243976925615',
  email: 'kabowddoxa4@gmail.com',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  aboutTitle: 'CONCEVOIR POUR MARQUER.',
  aboutText1:
    "Gbnz Design est un studio créatif né au cœur de la République Démocratique du Congo, forgé par la passion de l'impact visuel.",
  aboutText2:
    "De Kinshasa à Lubumbashi, nous brisons les codes traditionnels pour offrir aux marques une identité unique, capable de s'imposer sur le marché. Nous croyons en un design épuré, stratégique et sans fioritures.",
  statClients: 50,
  statProjects: 100,
  statYears: 3,
  heroClientCount: '+50 clients',
};

const servicesDocs = [
  {
    _id: 'service-logo',
    _type: 'service',
    title: 'Création de Logo',
    description:
      "Nous concevons des logos uniques qui capturent l'essence de votre marque et vous démarquent de la concurrence.",
    icon: 'PenTool',
    featured: false,
    displayOrder: 1,
  },
  {
    _id: 'service-affiches',
    _type: 'service',
    title: "Design d'Affiches",
    description:
      'Des affiches événementielles, promotionnelles ou corporatives conçues avec impact et créativité maximale.',
    icon: 'Frame',
    featured: true,
    displayOrder: 2,
  },
  {
    _id: 'service-identite',
    _type: 'service',
    title: 'Identité Visuelle',
    description:
      'Charte graphique complète : couleurs, typographies, templates et guide de marque pour une cohérence parfaite.',
    icon: 'Palette',
    featured: false,
    displayOrder: 3,
  },
];

const pricingDocs = [
  {
    _id: 'pricing-culte',
    _type: 'pricingItem',
    name: 'Affiche Culte',
    subtitle: 'Cultes, conférences, croisades, séminaires & veillées',
    category: 'affiches',
    price: '25.000 FC',
    numericPrice: 25000,
    badge: 'Recommandé',
    highlight: true,
    icon: 'Church',
    features: [
      'Design professionnel et personnalisé',
      "Jusqu'à 3 personnes sur l'affiche",
      "Plus de 3 personnes sur l'affiche : 35.000 FC",
      'Format haute définition pour réseaux sociaux',
      'Fichier prêt pour impression',
    ],
    whatsappMessage:
      "Bonjour Gbnz Design, je souhaite commander une *Affiche Culte* à *25.000 FC*. Si l'affiche contient plus de 3 personnes, le tarif est de *35.000 FC*.",
    displayOrder: 1,
  },
  {
    _id: 'pricing-anniversaire',
    _type: 'pricingItem',
    name: 'Affiche Anniversaire',
    subtitle: 'Pour célébrer vos anniversaires et moments spéciaux',
    category: 'affiches',
    price: '45.000 FC',
    numericPrice: 45000,
    icon: 'PartyPopper',
    features: [
      'Design personnalisé selon votre thème',
      'Mise en valeur de la photo principale',
      'Composition graphique professionnelle',
      'Format haute définition',
      'Fichier prêt pour impression et réseaux sociaux',
    ],
    whatsappMessage:
      'Bonjour Gbnz Design, je souhaite commander une *Affiche Anniversaire* à *45.000 FC*.',
    displayOrder: 2,
  },
  {
    _id: 'pricing-manif-celebration',
    _type: 'pricingItem',
    name: 'Manif & Célébration',
    subtitle: 'Manifestations, célébrations et événements spéciaux',
    category: 'affiches',
    price: '50.000 FC',
    numericPrice: 50000,
    icon: 'PartyPopper',
    features: [
      'Design professionnel et accrocheur',
      'Mise en valeur des participants et informations',
      'Composition adaptée à votre événement',
      'Format haute définition',
      'Fichier prêt pour impression et réseaux sociaux',
    ],
    whatsappMessage:
      'Bonjour Gbnz Design, je souhaite commander une *Affiche Manif & Célébration* à *50.000 FC*.',
    displayOrder: 3,
  },
  {
    _id: 'pricing-affiche-publicitaire',
    _type: 'pricingItem',
    name: 'Affiche Publicitaire',
    subtitle: 'Pour promouvoir vos produits, services ou activités',
    category: 'affiches',
    price: '50.000 FC',
    numericPrice: 50000,
    icon: 'Briefcase',
    features: [
      'Design publicitaire professionnel',
      'Mise en avant de vos produits ou services',
      "Composition pensée pour attirer l'attention",
      'Format haute définition',
      'Fichier prêt pour impression et réseaux sociaux',
    ],
    whatsappMessage:
      'Bonjour Gbnz Design, je souhaite commander une *Affiche Publicitaire* à *50.000 FC*.',
    displayOrder: 4,
  },
  {
    _id: 'pricing-logo-eglise',
    _type: 'pricingItem',
    name: 'Logo Église',
    subtitle: 'Identité visuelle pour églises, ministères et communautés',
    category: 'logos',
    price: '45.000 FC',
    numericPrice: 45000,
    icon: 'Church',
    features: [
      "Création d'un logo professionnel et personnalisé",
      "Symbole adapté à l'identité de votre église",
      'Formats haute définition',
      'Version adaptée aux réseaux sociaux',
      'Fichier prêt pour impression',
    ],
    whatsappMessage:
      'Bonjour Gbnz Design, je souhaite commander un *Logo Église* à *45.000 FC*.',
    displayOrder: 1,
  },
  {
    _id: 'pricing-logo-entreprise',
    _type: 'pricingItem',
    name: 'Logo Entreprise',
    subtitle: 'Pour entreprises, commerces, marques et organisations',
    category: 'logos',
    price: '55.000 FC',
    numericPrice: 55000,
    badge: 'Best Seller',
    highlight: true,
    icon: 'Building2',
    features: [
      'Logo professionnel et personnalisé',
      'Création adaptée à votre activité',
      'Formats haute définition',
      'Version adaptée aux supports numériques',
      'Fichier prêt pour impression',
    ],
    whatsappMessage:
      'Bonjour Gbnz Design, je souhaite commander un *Logo Entreprise* à *55.000 FC*.',
    displayOrder: 2,
  },
  {
    _id: 'pricing-logo-personnel',
    _type: 'pricingItem',
    name: 'Logo Personnel',
    subtitle: 'Pour particuliers, artistes, créateurs et personal branding',
    category: 'logos',
    price: '65.000 FC',
    numericPrice: 65000,
    icon: 'UserCheck',
    features: [
      'Logo personnalisé et unique',
      'Design adapté à votre personnalité',
      'Formats haute définition',
      'Utilisable sur les réseaux sociaux',
      'Fichier prêt pour impression',
    ],
    whatsappMessage:
      'Bonjour Gbnz Design, je souhaite commander un *Logo Personnel* à *65.000 FC*.',
    displayOrder: 3,
  },
];

const allDocs = [siteSettingsDoc, ...servicesDocs, ...pricingDocs];
const ndjsonContent = allDocs.map((doc) => JSON.stringify(doc)).join('\n');
const outputPath = path.join(rootDir, 'sanity-content.ndjson');

fs.writeFileSync(outputPath, ndjsonContent, 'utf-8');
console.log(`✅ Fichier NDJSON généré avec succès : ${outputPath} (${allDocs.length} documents)`);

