import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'studioName',
      title: 'Nom du studio',
      type: 'string',
      initialValue: 'Gbnz Design',
      validation: (rule) => rule.required().error('Le nom du studio est obligatoire'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline Hero',
      type: 'string',
      description: 'Accroche principale affichée dans le Hero.',
      initialValue: 'VOTRE VISION, NOTRE DESIGN.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre Hero',
      type: 'text',
      rows: 2,
      initialValue:
        "Gbnz Design transforme vos idées en identités visuelles percutantes. Nous créons des marques qui dominent le marché de Kinshasa et d'ailleurs.",
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'string',
      initialValue: 'Studio Créatif · Lubumbashi, RDC',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Numéro WhatsApp',
      type: 'string',
      description: 'Sans espaces ni symboles, ex: 243976925615',
      initialValue: '243976925615',
    }),
    defineField({
      name: 'email',
      title: 'Email de contact',
      type: 'string',
      initialValue: 'kabowddoxa4@gmail.com',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Lien Instagram',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Lien Facebook',
      type: 'url',
    }),
    // ---- SECTION À PROPOS ----
    defineField({
      name: 'aboutTitle',
      title: 'Titre section À Propos',
      type: 'string',
      initialValue: 'CONCEVOIR POUR MARQUER.',
    }),
    defineField({
      name: 'aboutText1',
      title: 'Paragraphe 1 — À Propos',
      type: 'text',
      rows: 3,
      initialValue:
        "Gbnz Design est un studio créatif né au cœur de la République Démocratique du Congo, forgé par la passion de l'impact visuel.",
    }),
    defineField({
      name: 'aboutText2',
      title: 'Paragraphe 2 — À Propos',
      type: 'text',
      rows: 3,
      initialValue:
        'De Kinshasa à Lubumbashi, nous brisons les codes traditionnels pour offrir aux marques une identité unique, capable de s\'imposer sur le marché. Nous croyons en un design épuré, stratégique et sans fioritures.',
    }),
    defineField({
      name: 'statClients',
      title: 'Stat : Nombre de clients',
      type: 'number',
      initialValue: 50,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'statProjects',
      title: 'Stat : Projets livrés',
      type: 'number',
      initialValue: 100,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'statYears',
      title: 'Stat : Années d\'expérience',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'heroClientCount',
      title: 'Compteur de clients (Hero)',
      type: 'string',
      initialValue: '+50 clients',
      description: 'Texte affiché dans la preuve sociale du Hero.',
    }),
  ],
  preview: {
    select: { title: 'studioName' },
    prepare({ title }) {
      return { title: title || 'Paramètres du site' }
    },
  },
})
