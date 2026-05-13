import { HeroBlockComponent } from './hero/Hero';

const blockComponents = {
  hero: HeroBlockComponent,
};

type Props = {
  blocks: any[];
};

export function Index({ blocks }: Props) {
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
