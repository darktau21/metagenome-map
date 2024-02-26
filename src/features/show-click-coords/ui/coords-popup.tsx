import type { LatLng } from '@/shared/types';

import formatcoords from 'formatcoords';
import { Popup } from 'react-leaflet';

type CoordsPopupProps = Readonly<{
  coords: LatLng;
}>;

export function CoordsPopup({ coords }: CoordsPopupProps) {
  return (
    <Popup position={coords}>
      <h2 className="text-lg font-normal text-gray-500">Координаты</h2>
      <div className="text-base font-bold">
        {formatcoords(...coords).format()}
      </div>
      <div className="text-base font-bold">
        <div className="flex gap-2">
          <span className="font-thin text-gray-500">Широта:</span>
          {coords[0]}
        </div>
        <div className="flex gap-2">
          <span className="font-thin text-gray-500">Долгота:</span>
          {coords[1]}
        </div>
      </div>
    </Popup>
  );
}
