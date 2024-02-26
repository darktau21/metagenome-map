import type { LatLng } from '@/shared/types';

import { type Marker as TMarker, divIcon } from 'leaflet';
import { type PropsWithChildren, type ReactNode, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';

type IconProps = Readonly<{
  className?: string;
  component: ReactNode;
  iconAnchor?: [x: number, y: number];
  iconSize: [width: number, height: number];
  popupAnchor?: [x: number, y: number];
  tooltipAnchor?: [x: number, y: number];
}>;

type PointProps = Readonly<{
  icon: IconProps;
  popupContent?: ReactNode;
  position: LatLng;
}>;

export function Point({ icon, popupContent, position }: PointProps) {
  const markerRef = useRef<TMarker>(null);
  const handleOpen = () => {
    markerRef.current?.openPopup();
  };
  const handleClose = () => {
    markerRef.current?.remove();
    console.log(markerRef);
  };

  return (
    <Marker
      eventHandlers={
        popupContent
          ? {
              add: handleOpen,
              popupclose: handleClose,
            }
          : {}
      }
      icon={divIcon({
        ...icon,
        html: renderToStaticMarkup(icon.component),
      })}
      position={position}
      ref={markerRef}
    >
      {popupContent ? <Popup autoClose>{popupContent}</Popup> : null}
    </Marker>
  );
}
