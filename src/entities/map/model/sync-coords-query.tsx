import type { LatLng } from '@/shared/types';
import type { LatLngExpression } from 'leaflet';

import { parseAsFloat, useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type SyncCoordsQueryProps = {
  initialPosition: LatLng;
};

export function SyncCoordsQuery({ initialPosition }: SyncCoordsQueryProps) {
  const map = useMap();
  const [coords, setCoords] = useQueryStates({
    lat: parseAsFloat.withDefault(initialPosition[0]),
    lng: parseAsFloat.withDefault(initialPosition[1]),
  });

  useEffect(() => {
    map.setView(coords as LatLngExpression);
  }, []);

  useEffect(() => {
    const handleMove = () => {
      const position = map.getCenter();

      setCoords(position);
    };

    map.on('move', handleMove);

    return () => void map.off('move', handleMove);
  }, [map, setCoords]);

  return null;
}
