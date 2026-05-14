// src/app/blog/page.tsx

import Link from 'next/link';
import Image from 'next/image';

import { getPayload } from 'payload';
import config from '@payload-config';

import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';

export default async function BlogPage() {
  const payload = await getPayload({ config });

  const [pageResult, posts] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'blog',
        },
      },
      limit: 1,
    }),

    payload.find({
      collection: 'posts',
      limit: 10,
      sort: '-createdAt',
      depth: 1,
    }),
  ]);

  const page = pageResult.docs[0];

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          mt: 3,
          mb: 3,
          fontWeight: 700,
        }}
      >
        {page?.title}
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
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
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

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {post.title}
                  </Typography>

                  {post.excerpt && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        flexGrow: 1,
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                  )}

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
