import type { LeafletMouseEventHandlerFn } from 'leaflet';

import { memo } from 'react';
import { useMapEvents } from 'react-leaflet';

type ClickEventProviderProps = Readonly<{
  handleLeftClick: LeafletMouseEventHandlerFn;
  handleRightClick: LeafletMouseEventHandlerFn;
}>;

export const ClickEventProvider = memo(function ClickEventProvider({
  handleLeftClick,
  handleRightClick,
}: ClickEventProviderProps) {
  useMapEvents({
    click: handleLeftClick,
    contextmenu: handleRightClick,
  });

  return null;
});
