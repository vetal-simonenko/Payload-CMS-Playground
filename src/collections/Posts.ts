import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',

  lockDocuments: false,

  admin: {
    group: 'Content',
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
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,

      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',

      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'excerpt',
      label: 'Short Description',
      type: 'textarea',
      maxLength: 200,

      admin: {
        description: 'Short text for post cards and SEO preview.',
        position: 'sidebar',
      },
    },

    {
      name: 'content',
      type: 'richText',
    },
  ],
};
