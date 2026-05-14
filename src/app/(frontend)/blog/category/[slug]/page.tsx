import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getPayload } from 'payload';
import config from '@payload-config';

import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const categoryResult = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const category = categoryResult.docs[0];

  if (!category) {
    notFound();
  }

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,

    where: {
      categories: {
        contains: category.id,
      },
    },

    sort: '-createdAt',
  });

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          mt: 3,
          mb: 3,
        }}
      >
        {category.title}
      </Typography>

      <Grid container spacing={4}>
        {posts.docs.map((post) => {
          const image = typeof post.featuredImage === 'object' ? post.featuredImage : null;

          return (
            <Grid
              key={post.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {image?.url && (
                  <CardMedia
                    sx={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                    }}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || post.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </CardMedia>
                )}

                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {post.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {post.excerpt}
                  </Typography>

                  <Stack direction="row">
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      <Button variant="contained">Read More</Button>
                    </Link>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
