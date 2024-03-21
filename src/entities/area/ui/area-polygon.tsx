'use client';

import type { LatLng } from '@/shared/types';

import { Routes } from '@/shared/routes';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';
import { Polygon, Tooltip } from 'react-leaflet';

type AreaPolygonProps = {
  coords: LatLng[];
  fillColor?: string;
  id: number;
  value?: number;
};

export const AreaPolygon = memo(function AreaPolygon({
  coords,
  fillColor,
  id,
  value,
}: AreaPolygonProps) {
  const router = useRouter();
  return (
    <Polygon
      eventHandlers={{
        click: (e) => {
          e.originalEvent.preventDefault();
          console.log(id);
          router.push(`${Routes.AREAS}/${id}`);
        },
      }}
      pathOptions={{
        fillColor: fillColor ?? 'transparent',
        fillOpacity: 0.6,
        stroke: !fillColor,
      }}
      positions={coords}
    >
      {fillColor && (
        <Tooltip
          eventHandlers={{ click: (e) => e.originalEvent.preventDefault() }}
          sticky
        >
          Значение филума: {value ?? 0}
        </Tooltip>
      )}
    </Polygon>
  );
});
