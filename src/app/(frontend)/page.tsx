import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
    depth: 2,
  });

  const page = result.docs[0];

  if (!page) {
    return notFound();
  }

  return (
    <>
      <h1>{page.title}</h1>
      <h2>{page.layout?.[0].heading}</h2>
      <h2>{page.layout?.[0].description}</h2>
    </>
  );
}
