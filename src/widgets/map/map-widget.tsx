'use client';

import { AreaPolygon } from '@/entities/area';
import { type AreaMapView, Map, SyncCoordsQuery } from '@/entities/map';
import { CoordsPopup, ShowClickCoords } from '@/features/show-click-coords';
import { memo } from 'react';

import { INITIAL_POSITION, INITIAL_ZOOM } from './constants';

type MapWidgetProps = Readonly<{
  areas: AreaMapView[];
}>;

const MapWidget = memo(function MapWidget({ areas }: MapWidgetProps) {
  return (
    <Map
      areas={areas}
      renderArea={({ id, polygon }) => (
        <AreaPolygon coords={polygon} id={id} key={id} />
      )}
      zoom={INITIAL_ZOOM}
    >
      <ShowClickCoords
        renderPopup={(coords) => <CoordsPopup coords={coords} />}
      />
      <SyncCoordsQuery initialPosition={INITIAL_POSITION} />
    </Map>
  );
});

export default MapWidget;
