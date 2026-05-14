import { Hero } from '../components/Hero';

export async function LandingPage({ page }: any) {
  return (
    <>
      <h1>{page.title}</h1>
      <p>This is Landing page template 123</p>
      <Hero blocks={page.layout} />
    </>
  );
}
