'use client';

import type { LatLng } from '@/shared/types';

import { Routes } from '@/shared/routes';
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
        click: () => {
          router.push(`${Routes.AREAS}/${id}`);
        },
      }}
      positions={coords}
    />
  );
}
