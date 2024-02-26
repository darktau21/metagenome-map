import { ClickEventProvider } from '@/entities/map';
import type { LatLng } from '@/shared/types';
import type { LeafletMouseEventHandlerFn } from 'leaflet';
import { useCallback, useState, type ReactNode } from 'react';

type ShowClickCoordsProps = Readonly<{
  renderPopup: (coords: LatLng) => ReactNode;
}>;

export function ShowClickCoords({ renderPopup }: ShowClickCoordsProps) {
  const [coords, setCoords] = useState<LatLng | null>(null);

  const handleRightClick = useCallback<LeafletMouseEventHandlerFn>(
    ({ latlng }) => setCoords([latlng.lat, latlng.lng]),
    [],
  );

  const handleLeftClick = useCallback<LeafletMouseEventHandlerFn>(() => {
    if (coords) {
      setCoords(null);
    }
  }, [coords]);

  return (
    <>
      <ClickEventProvider
        handleRightClick={handleRightClick}
        handleLeftClick={handleLeftClick}
      />
      {coords ? renderPopup(coords) : null}
    </>
  );
}
