'use client';

import type { LatLng } from '@/shared/types';

import { Routes } from '@/shared/routes';
import { useRouter } from 'next/navigation';
import { Polygon, Tooltip } from 'react-leaflet';

type AreaPolygonProps = {
  coords: LatLng[];
  fillColor?: string;
  id: number;
  value?: number;
};

export function AreaPolygon({
  coords,
  fillColor,
  id,
  value,
}: AreaPolygonProps) {
  const router = useRouter();
  return (
    <Polygon
      eventHandlers={{
        click: () => {
          router.push(`${Routes.AREAS}/${id}`);
        },
      }}
      pathOptions={{
        fill: Boolean(fillColor),
        fillColor,
        fillOpacity: 0.6,
        stroke: !fillColor,
      }}
      positions={coords}
    >
      {fillColor && <Tooltip sticky>Значение филума: {value ?? 0}</Tooltip>}
    </Polygon>
  );
}
