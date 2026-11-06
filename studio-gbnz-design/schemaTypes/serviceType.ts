import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du service',
      type: 'string',
      validation: (rule) => rule.required().error('Le titre est obligatoire'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().error('La description est obligatoire'),
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Nom de l\'icône Lucide : "PenTool", "Frame", "Palette", "Sparkles"...',
      validation: (rule) => rule.required().error('L\'icône est obligatoire'),
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant (carte sombre)',
      type: 'boolean',
      initialValue: false,
      description: 'Si activé, ce service s\'affiche avec le fond noir et le badge "Populaire".',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      featured: 'featured',
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: title || 'Service sans titre',
        subtitle: `${featured ? '★ En avant · ' : ''}${subtitle || ''}`,
      }
    },
  },
})
