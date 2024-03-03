import { SampleLoader } from '@/entities/sample';
import { SampleCard } from '@/widgets/sample-card';

type SamplePageProps = Readonly<{
  params: Record<'id', string>;
}>;

export async function SamplePage({ params }: SamplePageProps) {
  const { id } = params;

  return (
    <SampleLoader id={+id}>
      {(sample) => <SampleCard sample={sample} />}
    </SampleLoader>
  );
}
