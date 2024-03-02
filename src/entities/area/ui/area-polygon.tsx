'use client';

import type { LatLng } from '@/shared/types';

import { useRouter } from 'next/navigation';
import { Polygon } from 'react-leaflet';

type AreaPolygonProps = {
  coords: LatLng[];
  id: number;
};

export function AreaPolygon({ coords, id }: AreaPolygonProps) {
  const router = useRouter();

  return (
    <Polygon
      eventHandlers={{
        click: (event) => {
          console.log(id);
          router.push(`/areas/${id}`);
        },
      }}
      positions={coords}
    />
  );
}
