import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const token = process.env.SANITY_AUTH_TOKEN || process.argv[2];

if (!token) {
  console.log('='.repeat(70));
  console.log('⚠️  SANITY WRITE TOKEN MANQUANT');
  console.log('='.repeat(70));
  console.log('Pour injecter automatiquement toutes les données dans Sanity CMS :');
  console.log('');
  console.log('1. Rendez-vous sur https://manage.sanity.io/');
  console.log('2. Sélectionnez votre projet "vx28qj46"');
  console.log('3. Allez dans "API" > "Tokens" > "Add API token"');
  console.log('4. Nommez-le "Migration Seed" avec les permissions "Editor" (Write)');
  console.log('5. Copiez le token généré et relancez la commande :');
  console.log('');
  console.log('   node scripts/seed-sanity.mjs VOTRE_TOKEN_ICI');
  console.log('='.repeat(70));
  process.exit(1);
}

const client = createClient({
  projectId: 'vx28qj46',
  dataset: 'production',
  apiVersion: '2026-11-05',
  token: token,
  useCdn: false,
});

// 1. SITE SETTINGS
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

// 2. SERVICES
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

// 3. TARIFS
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

// 4. METADONNÉES DES 40 PROJETS
const projectMetadata = [
  { title: "Gbnz Design Studio", label: "Logo & Emblème — Identité Officielle", cat: "Logos" },
  { title: "Festival Lumière Lubumbashi", label: "Affiche Officielle — Événement Culturel", cat: "Affiches", hero: true, heroOrder: 1 },
  { title: "Maison Kivu Restaurant", label: "Identité Complète — Gastronomie & Lounge", cat: "Identité Visuelle" },
  { title: "Tech Congo Hub", label: "Logo & Branding — Incubateur Startup", cat: "Logos" },
  { title: "Fashion Week Kinshasa", label: "Affiche & Programme — Défilé Haute Couture", cat: "Affiches", hero: true, heroOrder: 2 },
  { title: "Banque Élite RDC", label: "Charte Graphique — Institution Financière", cat: "Identité Visuelle" },
  { title: "Culte d'Action de Grâce", label: "Affiche Église — Célébration Annuelle", cat: "Affiches" },
  { title: "Afro Beat Explosion", label: "Affiche Concert Live — Lubumbashi Arena", cat: "Affiches", hero: true, heroOrder: 3 },
  { title: "Katanga Copper Mining", label: "Logo Institutionnel — Secteur Minier", cat: "Logos" },
  { title: "Café de la Poste", label: "Identité de Marque — Packaging & Menu", cat: "Identité Visuelle" },
  { title: "Soirée Gala & Charité", label: "Affiche & Invitations — Célébration", cat: "Affiches" },
  { title: "Dr. Mukendi Clinic", label: "Logo Médical & Signalétique", cat: "Logos" },
  { title: "Conférence Leadership 2025", label: "Affiche Événementielle & Roll-up", cat: "Affiches" },
  { title: "Savonnerie du Kasaï", label: "Identité Visuelle & Étiquettes Produits", cat: "Identité Visuelle" },
  { title: "Grand Séminaire de la Foi", label: "Affiche Église — Grand Rassemblement", cat: "Affiches" },
  { title: "Afriq Logistics", label: "Logo & Habillage Flotte Véhicules", cat: "Logos" },
  { title: "Summer Vibes Festival", label: "Affiche & Supports Promotionnels", cat: "Affiches" },
  { title: "Boutique Lualaba Luxe", label: "Identité & Packaging Prêt-à-Porter", cat: "Identité Visuelle" },
];

async function seed() {
  console.log('🚀 Démarrage de la migration Sanity CMS...');

  // Étape 1 : Paramètres du site
  console.log('📦 Envoi des paramètres du site (siteSettings)...');
  await client.createOrReplace(siteSettingsDoc);
  console.log('✅ siteSettings créé avec succès.');

  // Étape 2 : Services
  console.log('📦 Envoi des services...');
  for (const s of servicesDocs) {
    await client.createOrReplace(s);
    console.log(`  ✓ Service créé : ${s.title}`);
  }

  // Étape 3 : Tarifs
  console.log('📦 Envoi des formules tarifaires...');
  for (const p of pricingDocs) {
    await client.createOrReplace(p);
    console.log(`  ✓ Tarif créé : ${p.name} (${p.price})`);
  }

  // Étape 4 : Téléversement des 40 images du Portfolio et création des documents
  console.log('📦 Téléversement des 40 projets & images du portfolio...');
  const portfolioDir = path.join(rootDir, 'src', 'assets', 'portfolio');

  if (fs.existsSync(portfolioDir)) {
    const files = fs
      .readdirSync(portfolioDir)
      .filter((f) => f.endsWith('.jpg') || f.endsWith('.png'))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, '') || '0', 10);
        const numB = parseInt(b.replace(/\D/g, '') || '0', 10);
        return numA - numB;
      });

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const filePath = path.join(portfolioDir, fileName);
      const meta = projectMetadata[i % projectMetadata.length];
      const docId = `poster-${i + 1}`;

      try {
        console.log(`  [${i + 1}/${files.length}] Upload de ${fileName} (${meta.title})...`);
        const imageAsset = await client.assets.upload('image', fs.createReadStream(filePath), {
          filename: fileName,
        });

        const posterDoc = {
          _id: docId,
          _type: 'poster',
          title: meta.title,
          category: meta.cat,
          description: meta.label,
          altText: `${meta.title} - GBNZ Design`,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id,
            },
          },
          showInHero: Boolean(meta.hero),
          heroOrder: meta.heroOrder ?? i,
          displayOrder: i + 1,
          publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
        };

        await client.createOrReplace(posterDoc);
        console.log(`     ✓ Document Sanity créé : ${posterDoc.title}`);
      } catch (err) {
        console.error(`     ❌ Erreur sur ${fileName}:`, err.message);
      }
    }
  }

  console.log('');
  console.log('🎉 Migration terminée avec succès !');
  console.log('Toutes les données ont été créées dans Sanity CMS (dataset: production).');
}

seed().catch((err) => {
  console.error('❌ Erreur critique lors de la migration :', err);
  process.exit(1);
});

