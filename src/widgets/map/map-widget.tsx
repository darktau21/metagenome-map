'use client';

import { type AreaMapView, Map } from '@/entities/map';
import { CoordsPopup, ShowClickCoords } from '@/features/show-click-coords';
import { Polygon } from 'react-leaflet';

import { INITIAL_POSITION, INITIAL_ZOOM } from './constants';

type MapWidgetProps = Readonly<{
  areas: AreaMapView[];
}>;

export default function MapWidget({ areas }: MapWidgetProps) {
  return (
    <Map
      areas={areas}
      position={INITIAL_POSITION}
      renderArea={(area) => <Polygon key={area.id} positions={area.polygon} />}
      zoom={INITIAL_ZOOM}
    >
      <ShowClickCoords
        renderPopup={(coords) => <CoordsPopup coords={coords} />}
      />
    </Map>
  );
}
