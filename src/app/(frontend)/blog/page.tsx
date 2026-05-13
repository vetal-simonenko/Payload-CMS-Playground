// src/app/blog/page.tsx
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@payload-config';

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
    }),
  ]);

  const page = pageResult.docs[0];

  return (
    <>
      <h1>{page?.title}</h1>

      {posts.docs.map((post) => (
        <article key={post.id}>
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
        </article>
      ))}
    </>
  );
}
