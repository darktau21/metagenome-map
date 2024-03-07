import { AreaCoordsLoader } from '@/entities/area';
import { SamplesCoordsLoader } from '@/entities/sample';
import { parsePhylum } from '@/features/select-metagenome-map';
import { UIMapSkeleton } from '@/shared/ui';
import { MapWidget } from '@/widgets/map';
import { Suspense } from 'react';

type HomePageProps = Readonly<{ searchParams: Record<'phylum', string> }>;

export function HomePage({ searchParams }: HomePageProps) {
  const { phylum } = parsePhylum.parse(searchParams);

  return (
    <Suspense fallback={<UIMapSkeleton />} key={phylum}>
      <AreaCoordsLoader phylumId={phylum}>
        {(areas) => (
          <SamplesCoordsLoader>
            {(samples) => <MapWidget areas={areas} samples={samples} />}
          </SamplesCoordsLoader>
        )}
      </AreaCoordsLoader>
    </Suspense>
  );
}
