import { getSample } from '@/entities/sample';

type SamplePageProps = Readonly<{
  params: Record<'id', string>;
}>;

export async function SamplePage({ params }: SamplePageProps) {
  const { id } = params;
  const sample = await getSample(+id);
  return <div>test</div>;
}
