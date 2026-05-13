import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: false,
  access: {
    read: () => true,
  },
  folders: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
};
