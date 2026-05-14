// src/app/blog/[slug]/page.tsx

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPayload } from 'payload';
import config from '@payload-config';

import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  });

  const post = result.docs[0];

  if (!post) {
    notFound();
  }

  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null;

  const paragraphs =
    post.content?.root?.children
      ?.filter((node: any) => node.type === 'paragraph')
      ?.map((paragraph: any) => paragraph.children?.map((child: any) => child.text).join(''))
      ?.filter(Boolean) || [];

  return (
    <Box
      component="article"
      sx={{
        maxWidth: 860,
        mx: 'auto',
      }}
    >
      {image?.url && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            height: {
              xs: 200,
              sm: 250,
              md: 300,
            },
            mb: 5,
            overflow: 'hidden',
          }}
        >
          <Image
            src={image.url}
            alt={image.alt || post.title}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
      )}

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        {post.categories?.map((category: any) => {
          if (typeof category !== 'object') return null;

          return (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Chip
                label={category.title}
                size="small"
                color="primary"
                variant="outlined"
                clickable
              />
            </Link>
          );
        })}
      </Stack>

      <Typography
        variant="h1"
        sx={{
          mb: 2,
        }}
      >
        {post.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          '& p': {
            mb: 3,
            fontSize: 18,
            lineHeight: 1.8,
            color: 'text.primary',
          },
        }}
      >
        {paragraphs.map((text: string, index: number) => (
          <Typography key={index} component="p">
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
