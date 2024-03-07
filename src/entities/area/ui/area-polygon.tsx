'use client';

import type { LatLng } from '@/shared/types';

import { Routes } from '@/shared/routes';
import { useRouter } from 'next/navigation';
import { Polygon } from 'react-leaflet';

type AreaPolygonProps = {
  coords: LatLng[];
  fillColor?: string;
  id: number;
};

export function AreaPolygon({ coords, fillColor, id }: AreaPolygonProps) {
  const router = useRouter();
  console.log(fillColor);
  return (
    <Polygon
      eventHandlers={{
        click: () => {
          router.push(`${Routes.AREAS}/${id}`);
        },
      }}
      pathOptions={{ fill: Boolean(fillColor), fillColor, fillOpacity: 0.6 }}
      positions={coords}
    />
  );
}
