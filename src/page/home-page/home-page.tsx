import { AreaCoordsLoader } from '@/entities/area';
import { MinMaxPhylumLoader } from '@/entities/metagenome';
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
            {(samples) => (
              <MinMaxPhylumLoader phylumId={phylum}>
                {({ maxValue, minValue }) => (
                  <MapWidget
                    areas={areas}
                    maxValue={maxValue}
                    minValue={minValue}
                    samples={samples}
                  />
                )}
              </MinMaxPhylumLoader>
            )}
          </SamplesCoordsLoader>
        )}
      </AreaCoordsLoader>
    </Suspense>
  );
}
