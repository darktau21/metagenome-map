import { UIMapContainer } from '@/shared/ui';
import { type LatLngLiteral } from 'leaflet';

import { TILE_SERVER_URL } from '../constants';
import type { AreaMapView } from '../types';
import type { PropsWithChildren, ReactNode } from 'react';
import type { LatLng } from '@/shared/types';

type MapProps = Readonly<
  PropsWithChildren<{
    position?: LatLng;
    zoom?: number;
    areas: AreaMapView[];
    renderArea: (area: AreaMapView, index?: number) => ReactNode;
  }>
>;

export function Map({
  position = [0, 0],
  zoom = 10,
  children,
  areas,
  renderArea: renderAreas,
}: MapProps) {
  return (
    <UIMapContainer
      center={position}
      tileServerUrl={TILE_SERVER_URL}
      zoom={zoom}
    >
      {areas.map(renderAreas)}
      {children}
    </UIMapContainer>
  );
}
