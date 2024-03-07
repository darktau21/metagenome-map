import { PhylumSearchInput } from '@/features/select-metagenome-map';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

export function MapMenu() {
  return (
    <div className="px-2 flex flex-col items-stretch">
      <Suspense fallback={<Skeleton height={'2rem'} />}>
        <PhylumSearchInput />
      </Suspense>
    </div>
  );
}
