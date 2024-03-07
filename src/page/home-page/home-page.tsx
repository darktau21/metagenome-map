import { AreaCoordsLoader } from '@/entities/area';
import { SamplesCoordsLoader } from '@/entities/sample';
import { UIMapSkeleton } from '@/shared/ui';
import { MapWidget } from '@/widgets/map';
import { Suspense } from 'react';

type HomePageProps = Readonly<{ searchParams: Record<'phylum', string> }>;

export function HomePage({ searchParams }: HomePageProps) {
  const { phylum } = searchParams;
  return (
    <Suspense fallback={<UIMapSkeleton />}>
      <AreaCoordsLoader phylumId={+phylum}>
        {(areas) => (
          <SamplesCoordsLoader>
            {(samples) => <MapWidget areas={areas} samples={samples} />}
          </SamplesCoordsLoader>
        )}
      </AreaCoordsLoader>
    </Suspense>
  );
}
