'use client';

import { AreaPolygon } from '@/entities/area';
import {
  type AreaMapView,
  Map,
  type SampleMapView,
  SyncCoordsQuery,
} from '@/entities/map';
import { SamplePoint } from '@/entities/sample';
import { CoordsPopup, ShowClickCoords } from '@/features/show-click-coords';
import { memo } from 'react';

import { INITIAL_POSITION, INITIAL_ZOOM } from './constants';

type MapWidgetProps = Readonly<{
  areas: AreaMapView[];
  samples: SampleMapView[];
}>;

const MapWidget = memo(function MapWidget({ areas, samples }: MapWidgetProps) {
  return (
    <Map
      areas={areas}
      renderArea={({ id, polygon }) => (
        <AreaPolygon coords={polygon} id={id} key={id} />
      )}
      renderSample={({ id, point }) => (
        <SamplePoint coords={point} id={id} key={id} />
      )}
      samples={samples}
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
