// collections/Pages.ts

import type { CollectionConfig } from 'payload';
import { HeroBlock } from '@/blocks/Hero/config';

export const Pages: CollectionConfig = {
  slug: 'pages',
  lockDocuments: false,
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,

      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },

    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Form',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.template === 'contact',
      },
    },

    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'default',

      admin: {
        position: 'sidebar',
      },

      options: [
        {
          label: 'Default',
          value: 'default',
        },

        {
          label: 'Landing',
          value: 'landing',
        },

        {
          label: 'Contact',
          value: 'contact',
        },
      ],
    },

    {
      name: 'layout',
      type: 'blocks',

      blocks: [HeroBlock],
    },
  ],
};
