import { Hero } from '../components/Hero';

export function DefaultPage({ page }: any) {
  return (
    <main>
      <h1>{page.title}</h1>
      <p>This is Default page template</p>
      <Hero blocks={page.layout} />
    </main>
  );
}
