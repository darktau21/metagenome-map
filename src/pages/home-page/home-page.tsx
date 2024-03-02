import { AreaCoordsLoader } from '@/entities/area';
import { MapWidget } from '@/widgets/map';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

export function HomePage() {
  return (
    <Suspense
      fallback={
        <Skeleton
          baseColor="#e2e2e2"
          borderRadius={0}
          className="block w-full h-full"
          containerClassName="block w-full h-full col-span-full"
        />
      }
    >
      <AreaCoordsLoader>
        {(areas) => <MapWidget areas={areas} />}
      </AreaCoordsLoader>
    </Suspense>
  );
}
