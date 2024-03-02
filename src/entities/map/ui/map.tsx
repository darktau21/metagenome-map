import type { LatLng } from '@/shared/types';

import { UIMapContainer } from '@/shared/ui';
import { type PropsWithChildren, type ReactNode } from 'react';

import type { AreaMapView } from '../types';

import { TILE_SERVER_URL } from '../constants';

type MapProps = Readonly<
  PropsWithChildren<{
    areas: AreaMapView[];
    position?: LatLng;
    renderArea: (area: AreaMapView, index?: number) => ReactNode;
    zoom?: number;
  }>
>;

export function Map({
  areas,
  children,
  position = [0, 0],
  renderArea: renderAreas,
  zoom = 10,
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
