'use client';

import type { Map } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { forwardRef } from 'react';
import { MapContainer, type MapContainerProps, TileLayer } from 'react-leaflet';

type UIMapContainerProps = Readonly<
  { tileServerUrl: string } & MapContainerProps
>;

export const UIMapContainer = forwardRef<Map, UIMapContainerProps>(
  function UIMapContainer({ children, tileServerUrl, ...props }, ref) {
    return (
      <MapContainer
        attributionControl={false}
        ref={ref}
        {...props}
        className={'h-dvh'}
      >
        <TileLayer url={tileServerUrl} />
        {children}
      </MapContainer>
    );
  },
);
