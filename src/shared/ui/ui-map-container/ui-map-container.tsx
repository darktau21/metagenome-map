'use client';

import type { Map } from 'leaflet';

import clsx from 'clsx';
import 'leaflet/dist/leaflet.css';
import { forwardRef, useState } from 'react';
import { MapContainer, type MapContainerProps, TileLayer } from 'react-leaflet';

type UIMapContainerProps = Readonly<
  { tileServerUrl: string } & MapContainerProps
>;

const UIMapContainer = forwardRef<Map, UIMapContainerProps>(
  function UIMapContainer(
    { children, className, tileServerUrl, ...props },
    ref,
  ) {
    return (
      <MapContainer
        attributionControl={false}
        className={clsx(className, 'min-h-full h-full col-span-full')}
        ref={ref}
        {...props}
      >
        <TileLayer url={tileServerUrl} />
        {children}
      </MapContainer>
    );
  },
);

export default UIMapContainer;
