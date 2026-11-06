import { defineField, defineType } from 'sanity'

export const posterType = defineType({
  name: 'poster',
  title: 'Affiche (Poster)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Titre de l'affiche",
      type: 'string',
      validation: (rule) => rule.required().error("Le titre de l'affiche est obligatoire"),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Affiches', value: 'Affiches' },
          { title: 'Logos', value: 'Logos' },
          { title: 'Identité Visuelle', value: 'Identité Visuelle' },
        ],
        layout: 'radio',
      },
      initialValue: 'Affiches',
      validation: (rule) => rule.required().error('La catégorie est requise'),
    }),
    defineField({
      name: 'image',
      title: "Image de l'affiche",
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error("L'image de l'affiche est obligatoire"),
      description: 'Formats acceptés : JPG, JPEG, PNG, WebP avec recadrage et point focal personnalisables.',
    }),
    defineField({
      name: 'altText',
      title: 'Texte alternatif (Accessibilité & SEO)',
      type: 'string',
      description: "Description textuelle pour l'accessibilité et les moteurs de recherche.",
      validation: (rule) => rule.required().error("Le texte alternatif est requis pour l'accessibilité"),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      description: 'Courte description du projet ou contexte de création (optionnel).',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('La date de publication est requise'),
    }),
    defineField({
      name: 'showInHero',
      title: "Mettre en avant dans le Hero (Page d'accueil)",
      type: 'boolean',
      description: 'Si coché, cette affiche peut apparaître parmi les 3 affiches flottantes du Hero.',
      initialValue: false,
    }),
    defineField({
      name: 'heroOrder',
      title: 'Ordre dans le Hero',
      type: 'number',
      description: "Position dans le Hero (les nombres les plus bas s'affichent en premier).",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'displayOrder',
      title: "Ordre d'affichage dans la galerie",
      type: 'number',
      description: "Ordre d'affichage dans la galerie (les nombres les plus bas apparaissent en premier).",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage (Croissant)",
      name: 'displayOrderAsc',
      by: [
        { field: 'displayOrder', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
    {
      title: 'Date de publication (Plus récent)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Ordre Hero (Croissant)',
      name: 'heroOrderAsc',
      by: [{ field: 'heroOrder', direction: 'asc' }],
    },
    {
      title: 'Titre (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      showInHero: 'showInHero',
      heroOrder: 'heroOrder',
    },
    prepare(selection) {
      const { title, subtitle, media, showInHero, heroOrder } = selection;
      const heroTag = showInHero ? `★ Hero #${heroOrder ?? 0} · ` : '';
      return {
        title: title || 'Sans titre',
        subtitle: `${heroTag}${subtitle || 'Affiche GBNZ Design'}`,
        media,
      };
    },
  },
})
