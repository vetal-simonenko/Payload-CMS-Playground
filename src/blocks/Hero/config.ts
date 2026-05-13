import type { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',

  labels: {
    singular: 'Hero',
    plural: 'Hero Blocks',
  },

  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },

    {
      name: 'description',
      type: 'textarea',
    },
  ],
};
