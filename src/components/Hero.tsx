import { HeroBlockComponent } from './Hero/Hero';

const blockComponents = {
  hero: HeroBlockComponent,
};

type Props = {
  blocks: any[];
};

export function Hero({ blocks }: Props) {
  return (
    <>
      {blocks?.map((block, index) => {
        const Block = blockComponents[block.blockType as keyof typeof blockComponents];

        if (!Block) return null;

        return <Block key={index} {...block} />;
      })}
    </>
  );
}
