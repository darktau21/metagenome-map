'use client';

import { Map, type AreaMapView } from '@/entities/map';
import { CoordsPopup, ShowClickCoords } from '@/features/show-click-coords';
import { Polygon } from 'react-leaflet';
import { INITIAL_POSITION, INITIAL_ZOOM } from './constants';

type MapWidgetProps = Readonly<{
  areas: AreaMapView[];
}>;

export default function MapWidget({ areas }: MapWidgetProps) {
  return (
    <Map
      zoom={INITIAL_ZOOM}
      position={INITIAL_POSITION}
      areas={areas}
      renderArea={(area) => <Polygon key={area.id} positions={area.polygon} />}
    >
      <ShowClickCoords
        renderPopup={(coords) => <CoordsPopup coords={coords} />}
      />
    </Map>
  );
}
