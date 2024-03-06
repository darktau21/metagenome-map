'use client';

import type { LatLng } from '@/shared/types';

import { Routes } from '@/shared/routes';
import { UIMarker } from '@/shared/ui';
import { divIcon } from 'leaflet';
import { useRouter } from 'next/navigation';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker } from 'react-leaflet';

type SamplePointProps = Readonly<{
  coords: LatLng;
  id: number;
}>;

export function SamplePoint({ coords, id }: SamplePointProps) {
  const router = useRouter();

  return (
    <Marker
      eventHandlers={{
        click: () => {
          router.push(`${Routes.SAMPLES}/${id}`);
        },
      }}
      icon={divIcon({
        className: 'bg-transparent border-none',
        html: renderToStaticMarkup(<UIMarker />),
        iconAnchor: [17, 35],
        iconSize: [36, 36],
      })}
      position={coords}
    />
  );
}
