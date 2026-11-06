import { defineField, defineType, defineArrayMember } from 'sanity'

export const pricingItemType = defineType({
  name: 'pricingItem',
  title: 'Tarif',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la formule',
      type: 'string',
      validation: (rule) => rule.required().error('Le nom est obligatoire'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Description courte de la cible (ex: "Cultes, conférences, croisades...")',
      validation: (rule) => rule.required().error('Le sous-titre est obligatoire'),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Affiches & Posters', value: 'affiches' },
          { title: 'Logos & Identités Visuelles', value: 'logos' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('La catégorie est obligatoire'),
    }),
    defineField({
      name: 'price',
      title: 'Prix affiché',
      type: 'string',
      description: 'Prix formaté ex: "25.000 FC"',
      validation: (rule) => rule.required().error('Le prix affiché est obligatoire'),
    }),
    defineField({
      name: 'numericPrice',
      title: 'Prix numérique (FC)',
      type: 'number',
      description: 'Valeur numérique pour le tri et les filtres.',
      validation: (rule) => rule.required().min(0).error('Le prix numérique est obligatoire'),
    }),
    defineField({
      name: 'badge',
      title: 'Badge (optionnel)',
      type: 'string',
      description: 'Ex: "Recommandé", "Best Seller". Laisser vide pour aucun badge.',
    }),
    defineField({
      name: 'highlight',
      title: 'Mettre en avant (carte sombre)',
      type: 'boolean',
      initialValue: false,
      description: 'Si activé, ce tarif s\'affiche avec fond noir et bordure jaune.',
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Nom de l\'icône Lucide : "Church", "PartyPopper", "Briefcase", "Building2", "UserCheck"...',
      validation: (rule) => rule.required().error('L\'icône est obligatoire'),
    }),
    defineField({
      name: 'features',
      title: 'Liste des inclusions',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().error('Au moins une inclusion est requise'),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Message WhatsApp',
      type: 'text',
      rows: 2,
      description: 'Texte pré-rempli envoyé via WhatsApp quand le client clique sur "Commander".',
      validation: (rule) => rule.required().error('Le message WhatsApp est obligatoire'),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
      description: 'Les nombres les plus bas apparaissent en premier dans leur catégorie.',
      validation: (rule) => rule.min(0).integer(),
    }),
  ],
  orderings: [
    {
      title: 'Catégorie puis ordre',
      name: 'categoryThenOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'displayOrder', direction: 'asc' },
      ],
    },
    {
      title: 'Prix croissant',
      name: 'priceAsc',
      by: [{ field: 'numericPrice', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      category: 'category',
      highlight: 'highlight',
    },
    prepare({ title, subtitle, category, highlight }) {
      const cat = category === 'affiches' ? '🖼 Affiche' : category === 'logos' ? '✏️ Logo' : ''
      return {
        title: `${highlight ? '★ ' : ''}${title || 'Tarif sans titre'}`,
        subtitle: `${cat} · ${subtitle || ''}`,
      }
    },
  },
})
