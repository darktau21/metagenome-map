import type { LatLng } from '@/shared/types';
import { divIcon, type Marker as TMarker } from 'leaflet';
import { useRef, type PropsWithChildren, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';

type IconProps = Readonly<{
  component: ReactNode;
  iconSize: [width: number, height: number];
  className?: string;
  iconAnchor?: [x: number, y: number];
  tooltipAnchor?: [x: number, y: number];
  popupAnchor?: [x: number, y: number];
}>;

type PointProps = Readonly<{
  icon: IconProps;
  position: LatLng;
  popupContent?: ReactNode;
}>;

export function Point({ icon, position, popupContent }: PointProps) {
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
      ref={markerRef}
      position={position}
      icon={divIcon({
        ...icon,
        html: renderToStaticMarkup(icon.component),
      })}
      eventHandlers={
        popupContent
          ? {
              add: handleOpen,
              popupclose: handleClose,
            }
          : {}
      }
    >
      {popupContent ? <Popup autoClose>{popupContent}</Popup> : null}
    </Marker>
  );
}
