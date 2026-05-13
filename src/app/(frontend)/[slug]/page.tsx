import config from '@payload-config';
import { getPayload } from 'payload';

import { DefaultPage } from '@/templates/DefaultPage';
import { LandingPage } from '@/templates/LandingPage';
import { ContactPage } from '@/templates/ContactPage';

const templates = {
  default: DefaultPage,
  landing: LandingPage,
  contact: ContactPage,
};

async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    return <div>Not found</div>;
  }

  const Template = templates[page.template as keyof typeof templates] || DefaultPage;

  return <Template page={page} />;
}
