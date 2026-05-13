import type { Field, GlobalConfig } from 'payload';

const navItemFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    required: true,
    admin: {
      allowCreate: false,
    },
  },
];

export const Header: GlobalConfig = {
  slug: 'header',

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Logo',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                ...navItemFields,
                {
                  name: 'children',
                  type: 'array',
                  fields: navItemFields,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
