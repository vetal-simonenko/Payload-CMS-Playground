import type { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
  slug: 'footer',

  fields: [
    {
      name: 'copyright',
      type: 'text',
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
};
