import { Index } from '@/components';

export function DefaultPage({ page }: any) {
  return (
    <main>
      <h1>{page.title}</h1>
      <p>This is Default page template</p>
      <Index blocks={page.layout} />
    </main>
  );
}
