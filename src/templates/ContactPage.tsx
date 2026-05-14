import { Hero } from '../components/Hero';

export function ContactPage({ page }: any) {
  return (
    <main>
      <h1>{page.title}</h1>
      <p>This is Contact page template</p>
      <Hero blocks={page.layout} />
    </main>
  );
}
