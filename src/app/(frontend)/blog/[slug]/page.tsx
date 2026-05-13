// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';

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
  });

  const post = result.docs[0];

  if (!post) {
    notFound();
  }

  const paragraphs =
    post.content?.root?.children
      ?.filter((node: any) => node.type === 'paragraph')
      ?.map((paragraph: any) => paragraph.children?.map((child: any) => child.text).join('')) || [];

  return (
    <div className="container mx-auto py-10">
      <article className="max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

        <p className="mb-4 text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div className="mb-8 flex gap-2">
          {post.categories?.map((category: any) => (
            <span key={category.id} className="rounded bg-gray-200 px-3 py-1 text-sm">
              {category.title}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          {paragraphs.map((text: string, index: number) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
