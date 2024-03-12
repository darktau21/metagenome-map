'use client';

import { AreaPolygon } from '@/entities/area';
import {
  type AreaMapView,
  Map,
  type SampleMapView,
  SyncCoordsQuery,
} from '@/entities/map';
import { PhylumIndicator } from '@/entities/metagenome';
import { SamplePoint } from '@/entities/sample';
import { CoordsPopup, ShowClickCoords } from '@/features/show-click-coords';
import { memo } from 'react';

import { INITIAL_POSITION, INITIAL_ZOOM } from './constants';

type MapWidgetProps = Readonly<{
  areas: AreaMapView[];
  maxValue?: null | number;
  minValue?: null | number;
  samples: SampleMapView[];
}>;

const MapWidget = memo(function MapWidget({
  areas,
  maxValue,
  minValue,
  samples,
}: MapWidgetProps) {
  return (
    <Map
      areas={areas}
      renderArea={({ fillColor, id, polygon, value }, i) => (
        <AreaPolygon
          coords={polygon}
          fillColor={fillColor}
          id={id}
          key={i}
          value={value}
        />
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
      {maxValue && (minValue || minValue === 0) ? (
        <PhylumIndicator max={maxValue} min={minValue} />
      ) : null}
    </Map>
  );
});

export default MapWidget;
