import { AreaCoordsLoader } from '@/entities/area';
import { SamplesCoordsLoader } from '@/entities/sample';
import { UIMapSkeleton } from '@/shared/ui';
import { MapWidget } from '@/widgets/map';
import { Suspense } from 'react';

export function HomePage() {
  return (
    <Suspense fallback={<UIMapSkeleton />}>
      <AreaCoordsLoader>
        {(areas) => (
          <SamplesCoordsLoader>
            {(samples) => <MapWidget areas={areas} samples={samples} />}
          </SamplesCoordsLoader>
        )}
      </AreaCoordsLoader>
    </Suspense>
  );
}
