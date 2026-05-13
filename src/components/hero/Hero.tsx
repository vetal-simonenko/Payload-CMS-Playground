type Props = {
  heading: string;
  description?: string;
};

export function HeroBlockComponent({ heading, description }: Props) {
  return (
    <section>
      <h2>{heading}</h2>

      {description && <p>{description}</p>}
    </section>
  );
}
