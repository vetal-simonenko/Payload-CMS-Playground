import { Index } from '@/components';

export function ContactPage({ page }: any) {
  return (
    <main>
      <h1>{page.title}</h1>
      <p>This is Contact page template</p>
      <Index blocks={page.layout} />
    </main>
  );
}
